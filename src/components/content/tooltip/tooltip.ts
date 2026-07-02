/**
 * Nederlandse Digitale Dienst Tooltip Component (Lit + TypeScript)
 *
 * Wrapper component dat een tooltip toont bij hover of focus op het child element.
 * Gebruikt `display: contents` zodat het de layout van het child niet beïnvloedt.
 *
 * @element nldd-tooltip
 * @attr {string}  text      - Tooltip tekst
 * @attr {boolean} open      - Forceer de tooltip zichtbaar, ongeacht hover/focus. Gebruik voor programmatische feedback (bv. "Gekopieerd"). Reset naar false om hover-gedrag te herstellen.
 * @attr {string}  placement - Positie: 'top' | 'bottom' | 'left' | 'right' (standaard: 'bottom'; op touch devices automatisch 'top')
 * @attr {string}  timing    - Wanneer de tooltip verschijnt op hover:
 *                              'instant'  — direct, zonder show-delay.
 *                              'default'  — na de standaard show-delay (700ms).
 *                              'never'    — tooltip wordt nooit getoond;
 *                                            hover/focus events worden
 *                                            genegeerd, aria-describedby
 *                                            wordt onderdrukt en een al
 *                                            zichtbare tooltip verdwijnt.
 *                              Hide-delay en touch suppression blijven onder
 *                              alle waarden van kracht. Focus-trigger is
 *                              altijd instant.
 *
 * @slot - Het element waarop de tooltip wordt getoond
 *
 * @fires nldd-tooltip-dismiss - Wanneer een gebruiker Escape drukt terwijl
 *   `open=true` is. De consumer beheert dan de open-lifecycle (wij kunnen
 *   `open` niet eenzijdig wissen), dus dit event geeft de consumer de kans
 *   om `open` terug naar `false` te zetten. WCAG 1.4.13: persistent hover-/
 *   focus-overlays moeten dismissible zijn zonder focus te verplaatsen.
 *
 * @note Rendert via de native Popover API (`popover="manual"`) in de top
 * layer. Daardoor escape de tooltip alle ancestor stacking contexts en
 * `overflow: hidden` clipping — geen z-index gevechten meer met overlay-
 * containers, panes of transform-containers. Positionering blijft via
 * Floating UI met `strategy: 'fixed'`.
 *
 * @note aria-describedby werkt alleen wanneer het trigger element in de light DOM staat.
 * Bij web components als trigger (met eigen shadow DOM) is de koppeling een bekende
 * limitatie van shadow DOM + ARIA. Voor nldd-icon-button is dit niet relevant omdat
 * aria-label al op de interne button staat. Tooltip tekst op icon-button mag daarom
 * geen informatie bevatten die niet al in aria-label zit.
 *
 * @note Bij disabled triggers (bijv. disabled nldd-icon-button) wordt de tooltip niet
 * getoond omdat disabled buttons geen mouseenter/focusin events afvuren en display:
 * contents geen eigen layout box heeft om events op te vangen.
 */

import { LitElement } from 'lit';
import type { PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { computePosition, flip, shift, offset } from '@floating-ui/dom';
import { tooltipStyles } from './tooltip.styles.js';
import { tooltipTemplate } from './tooltip.template.js';
import { isTouchMode } from '../../../utilities/input-modality.js';

type Placement = 'top' | 'bottom' | 'left' | 'right';
type Timing = 'instant' | 'default' | 'never';

let tooltipCounter = 0;
const coarsePointerQuery = matchMedia('(pointer: coarse)');

// Defaults mirror the values in tooltip.styles.ts. Used as fallback when the
// CSS variable is unset or non-numeric — most often in SSR / early-load
// environments where styles haven't reached the element yet. Without the
// fallback, parseInt('') returns NaN and setTimeout silently coerces it to
// 0ms, so the tooltip would show instantly. Keep these in sync with CSS.
const DEFAULT_SHOW_DELAY_MS = 700;
const DEFAULT_HIDE_DELAY_MS = 50;

@customElement('nldd-tooltip')
export class NLDDTooltip extends LitElement {
	static override styles = tooltipStyles;

	@property({ type: String, reflect: true })
	text = '';

	/** Programmatically force the tooltip visible regardless of hover/focus. */
	@property({ type: Boolean, reflect: true })
	open = false;

	@property({ type: String, reflect: true })
	placement: Placement = 'bottom';

	@property({ type: String, reflect: true })
	timing: Timing = 'default';

	private get _effectivePlacement(): Placement {
		return this.placement;
	}

	@state()
	_visible = false;

	private _tooltipId = `nldd-tooltip-${++tooltipCounter}`;
	private _hideTimeout: ReturnType<typeof setTimeout> | null = null;
	private _showTimeout: ReturnType<typeof setTimeout> | null = null;
	private _descriptionEl: HTMLSpanElement | null = null;
	private _currentTrigger: Element | null = null;
	private _boundSlotChange = () => this._syncAriaDescribedBy();
	private _positionVersion = 0;

	override connectedCallback(): void {
		super.connectedCallback();
		this.addEventListener('keydown', this._handleKeyDown);
		// Re-register slotchange after reconnect (firstUpdated only runs once)
		if (this.hasUpdated) {
			this.shadowRoot?.querySelector('slot')?.addEventListener('slotchange', this._boundSlotChange);
		}
	}

	override firstUpdated(): void {
		this.shadowRoot?.querySelector('slot')?.addEventListener('slotchange', this._boundSlotChange);
	}

	override updated(changed: PropertyValues): void {
		if (changed.has('open')) {
			if (this.open) {
				/* Force-show: cancel any pending hide so the tooltip stays up
				 * even if the cursor left the trigger area. */
				if (this._hideTimeout) {
					clearTimeout(this._hideTimeout);
					this._hideTimeout = null;
				}
				if (this._showTimeout) {
					clearTimeout(this._showTimeout);
					this._showTimeout = null;
				}
				this._visible = true;
			} else if (this._visible) {
				this._visible = false;
			}
		}
		if (changed.has('_visible')) {
			const tooltip = this._getTooltipElement();
			if (tooltip) {
				if (this._visible) {
					if (!tooltip.matches(':popover-open')) {
						// Hold it invisible until Floating UI has placed it, so it fades in at
						// the right spot instead of flashing at the popover's default position.
						tooltip.removeAttribute('positioned');
						tooltip.showPopover();
					}
					this._updatePosition();
				} else if (tooltip.matches(':popover-open')) {
					tooltip.hidePopover();
				}
			}
		}
		if (changed.has('text') || changed.has('timing')) {
			this._syncAriaDescribedBy();
		}
		if (changed.has('text') && this._visible) {
			/* Text changed mid-display (e.g. action feedback like "Gekopieerd").
			 * Re-position so the popover snaps to the new content's box. */
			this._updatePosition();
		}
		if (changed.has('timing') && this.timing === 'never') {
			// Cancel any pending show — without this the timer fires after
			// timing flips to 'never' and re-opens the tooltip.
			if (this._showTimeout) {
				clearTimeout(this._showTimeout);
				this._showTimeout = null;
			}
			if (this._visible) this._visible = false;
		}
	}

	private _syncAriaDescribedBy(): void {
		const trigger = this._getTriggerElement();

		// Clean up previous trigger if it changed
		if (this._currentTrigger && this._currentTrigger !== trigger) {
			this._currentTrigger.removeAttribute('aria-describedby');
		}
		this._currentTrigger = trigger;

		if (!trigger) return;

		// aria-describedby ID refs are scoped to the element's root.
		// Only works for triggers in the light DOM (document scope).
		if (trigger.getRootNode() !== document) {
			return;
		}

		// Suppress the description when timing is 'never' — same intent as
		// hiding the visual popover. Without this, screen readers would still
		// announce the redundant tooltip text (the primary use-case for
		// `timing='never'` is `.timing=${isShort ? 'default' : 'never'}` in
		// document-tab-bar, where the full label is already visible inline).
		if (this.text && this.timing !== 'never') {
			if (!this._descriptionEl) {
				this._descriptionEl = document.createElement('span');
				this._descriptionEl.id = this._tooltipId;
				Object.assign(this._descriptionEl.style, {
					position: 'absolute',
					width: '1px',
					height: '1px',
					overflow: 'hidden',
					clipPath: 'inset(50%)',
					whiteSpace: 'nowrap',
				});
				document.body.appendChild(this._descriptionEl);
			}
			this._descriptionEl.textContent = this.text;
			trigger.setAttribute('aria-describedby', this._tooltipId);
		} else {
			trigger.removeAttribute('aria-describedby');
			this._descriptionEl?.remove();
			this._descriptionEl = null;
		}
	}

	private _getTriggerElement(): Element | null {
		const slot = this.shadowRoot?.querySelector('slot');
		const assigned = slot?.assignedElements({ flatten: true });
		return assigned?.[0] ?? null;
	}

	private _getTooltipElement(): HTMLElement | null {
		return this.shadowRoot?.querySelector('.tooltip') ?? null;
	}

	_handleTriggerEnter(): void {
		if (this.timing === 'never') return;
		if (!this.text) return;
		if (coarsePointerQuery.matches) return;
		if (this._hideTimeout) {
			clearTimeout(this._hideTimeout);
			this._hideTimeout = null;
		}
		// `timing='instant'` skips the hover show-delay. Touch suppression and
		// the hide-delay still apply — only the show timer is bypassed.
		if (this._showTimeout) clearTimeout(this._showTimeout);
		if (this.timing === 'instant') {
			this._showTimeout = null;
			this._visible = true;
			return;
		}
		// Pointer-hover show delay: schedule via JS now that the visibility
		// transition is binary (popover open/closed) and the CSS no longer
		// holds the delay. Read the same `--_show-delay` token so the value
		// stays consumer-tunable from CSS.
		const parsedShow = parseInt(getComputedStyle(this).getPropertyValue('--_show-delay'), 10);
		const showDelay = Number.isFinite(parsedShow) ? parsedShow : DEFAULT_SHOW_DELAY_MS;
		this._showTimeout = setTimeout(() => {
			this._showTimeout = null;
			this._visible = true;
		}, showDelay);
	}

	_handleFocusIn(): void {
		if (this.timing === 'never') return;
		if (!this.text) return;
		// Touch taps can focus elements with explicit `tabindex` (e.g. tab-bar's
		// roving-tabindex pattern on iOS, Android `<button>` focus-on-tap).
		// Suppress the tooltip in that case — it's not a keyboard intent.
		if (isTouchMode()) return;
		if (this._hideTimeout) {
			clearTimeout(this._hideTimeout);
			this._hideTimeout = null;
		}
		// Focus-triggered show: no delay (keyboard intent is explicit).
		if (this._showTimeout) {
			clearTimeout(this._showTimeout);
			this._showTimeout = null;
		}
		this._visible = true;
	}

	_handleTriggerLeave(): void {
		// Cancel a scheduled show — leaving before delay elapsed means no show.
		if (this._showTimeout) {
			clearTimeout(this._showTimeout);
			this._showTimeout = null;
		}
		if (this.open) return; // force-shown — hover-out doesn't dismiss
		if (this._hideTimeout) {
			clearTimeout(this._hideTimeout);
		}
		const parsedHide = parseInt(getComputedStyle(this).getPropertyValue('--_hide-delay'), 10);
		const hideDelay = Number.isFinite(parsedHide) ? parsedHide : DEFAULT_HIDE_DELAY_MS;
		this._hideTimeout = setTimeout(() => {
			this._visible = false;
			this._hideTimeout = null;
		}, hideDelay);
	}

	/** Focus guard checks one shadow root level deep for composite triggers. */
	_handleFocusOut(e: FocusEvent): void {
		const slot = this.shadowRoot?.querySelector('slot');
		const assigned = slot?.assignedElements({ flatten: true }) ?? [];
		const related = e.relatedTarget as Node | null;
		const stillInside = related && assigned.some(el =>
			el.contains(related) || (el as HTMLElement).shadowRoot?.contains(related)
		);
		if (!stillInside) this._handleTriggerLeave();
	}

	_handleTooltipEnter(): void {
		if (this._hideTimeout) {
			clearTimeout(this._hideTimeout);
			this._hideTimeout = null;
		}
	}

	_handleTooltipLeave(): void {
		this._handleTriggerLeave();
	}

	private _handleKeyDown = (e: KeyboardEvent): void => {
		if (e.key !== 'Escape' || !this._visible) return;
		if (this.open) {
			// WCAG 1.4.13 (Content on Hover or Focus): persistent
			// keyboard-triggered overlay content must be dismissible without
			// moving focus. The consumer controls the open lifecycle (e.g.
			// action-feedback timers) so we can't unilaterally set open=false
			// here — but we DO emit nldd-tooltip-dismiss so the consumer can
			// honor the request. preventDefault keeps the keystroke from
			// bubbling to something else (modal close, etc.) when handled.
			this.dispatchEvent(new CustomEvent('nldd-tooltip-dismiss', { bubbles: true, composed: true }));
			e.preventDefault();
			return;
		}
		// Hover/focus-shown tooltips: we own the lifecycle, dismiss directly.
		this._visible = false;
	};

	private async _updatePosition(): Promise<void> {
		/* Multiple position calcs can be queued in the same flow (e.g. the
		 * text-change handler and the _visible handler fire in consecutive
		 * cycles). Each call awaits computePosition, so they may resolve
		 * out of order. Version-stamp every call and bail when a newer one
		 * has started — only the latest gets to write style.left/top. */
		const version = ++this._positionVersion;
		const trigger = this._getTriggerElement();
		const tooltip = this._getTooltipElement();
		// No trigger to anchor to: reveal it anyway so the opacity gate can't strand it.
		if (!trigger || !tooltip) { tooltip?.setAttribute('positioned', ''); return; }

		/* Wait for custom fonts so the first measurement matches the
		 * steady-state width. Without this, on a fresh page load the
		 * tooltip body is measured with the fallback font (wider) and
		 * Floating UI places the popover a few pixels off; once the web
		 * font swaps in, the body shrinks but the position is already
		 * committed. document.fonts.ready resolves immediately when all
		 * fonts are loaded, so this is a no-op after the first show. */
		if (document.fonts?.status !== 'loaded') {
			await document.fonts?.ready;
			if (version !== this._positionVersion) return;
		}

		const styles = getComputedStyle(this);
		const { x, y } = await computePosition(trigger, tooltip, {
			placement: this._effectivePlacement,
			strategy: 'fixed',
			middleware: [
				offset(parseInt(styles.getPropertyValue('--_offset'), 10)),
				flip(),
				shift({ padding: parseInt(styles.getPropertyValue('--_shift-padding'), 10) }),
			],
		});

		if (version !== this._positionVersion) return;
		tooltip.style.left = `${x}px`;
		tooltip.style.top = `${y}px`;
		tooltip.setAttribute('positioned', ''); // placed — let it fade in (see _visible handler)
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener('keydown', this._handleKeyDown);
		this.shadowRoot?.querySelector('slot')?.removeEventListener('slotchange', this._boundSlotChange);
		if (this._hideTimeout) {
			clearTimeout(this._hideTimeout);
			this._hideTimeout = null;
		}
		if (this._showTimeout) {
			clearTimeout(this._showTimeout);
			this._showTimeout = null;
		}
		// Clean up aria-describedby on trigger and remove description span from body
		this._currentTrigger?.removeAttribute('aria-describedby');
		this._currentTrigger = null;
		this._descriptionEl?.remove();
		this._descriptionEl = null;
	}

	override render() {
		return tooltipTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-tooltip': NLDDTooltip;
	}
}
