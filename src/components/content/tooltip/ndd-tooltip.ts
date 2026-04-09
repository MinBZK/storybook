/**
 * Nederlandse Digitale Dienst Tooltip Component (Lit + TypeScript)
 *
 * Wrapper component dat een tooltip toont bij hover of focus op het child element.
 * Gebruikt `display: contents` zodat het de layout van het child niet beïnvloedt.
 *
 * @element ndd-tooltip
 * @attr {string} text - Tooltip tekst
 * @attr {string} placement - Positie: 'top' | 'bottom' | 'left' | 'right' (standaard: 'top')
 *
 * @slot - Het element waarop de tooltip wordt getoond
 *
 * @note Gebruikt position: fixed + floating-ui strategy: 'fixed'. Positionering kan
 * breken wanneer een voorouder-element transform, filter of will-change heeft.
 *
 * @note aria-describedby werkt alleen wanneer het trigger element in de light DOM staat.
 * Bij web components als trigger (met eigen shadow DOM) is de koppeling een bekende
 * limitatie van shadow DOM + ARIA. Voor ndd-icon-button is dit niet relevant omdat
 * aria-label al op de interne button staat. Tooltip tekst op icon-button mag daarom
 * geen informatie bevatten die niet al in aria-label zit.
 *
 * @note Bij disabled triggers (bijv. disabled ndd-icon-button) wordt de tooltip niet
 * getoond omdat disabled buttons geen mouseenter/focusin events afvuren en display:
 * contents geen eigen layout box heeft om events op te vangen.
 */

import { LitElement } from 'lit';
import type { PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { computePosition, flip, shift, offset } from '@floating-ui/dom';
import { tooltipStyles } from './ndd-tooltip.styles.ts';
import { tooltipTemplate } from './ndd-tooltip.template.ts';

type Placement = 'top' | 'bottom' | 'left' | 'right';

let tooltipCounter = 0;

@customElement('ndd-tooltip')
export class NDDTooltip extends LitElement {
	static override styles = tooltipStyles;

	@property({ type: String, reflect: true })
	text = '';

	@property({ type: String, reflect: true })
	placement: Placement = 'top';

	@state()
	_visible = false;

	private _tooltipId = `ndd-tooltip-${++tooltipCounter}`;
	private _hideTimeout: ReturnType<typeof setTimeout> | null = null;
	private _descriptionEl: HTMLSpanElement | null = null;
	private _currentTrigger: Element | null = null;
	private _boundSlotChange = () => this._syncAriaDescribedBy();

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
		if (changed.has('_visible') && this._visible) {
			this._updatePosition();
		}
		if (changed.has('text')) {
			this._syncAriaDescribedBy();
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

		if (this.text) {
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
		if (!this.text) return;
		if (this._hideTimeout) {
			clearTimeout(this._hideTimeout);
			this._hideTimeout = null;
		}
		this._visible = true;
	}

	_handleTriggerLeave(): void {
		if (this._hideTimeout) {
			clearTimeout(this._hideTimeout);
		}
		const hideDelay = parseInt(getComputedStyle(this).getPropertyValue('--_hide-delay'), 10);
		this._hideTimeout = setTimeout(() => {
			this._visible = false;
			this._hideTimeout = null;
		}, hideDelay);
	}

	_handleFocusOut(e: FocusEvent): void {
		const slot = this.shadowRoot?.querySelector('slot');
		const assigned = slot?.assignedElements({ flatten: true }) ?? [];
		const stillInside = assigned.some(el => el.contains(e.relatedTarget as Node));
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
		if (e.key === 'Escape' && this._visible) {
			this._visible = false;
		}
	};

	private async _updatePosition(): Promise<void> {
		const trigger = this._getTriggerElement();
		const tooltip = this._getTooltipElement();
		if (!trigger || !tooltip) return;

		const styles = getComputedStyle(this);
		const { x, y } = await computePosition(trigger, tooltip, {
			placement: this.placement,
			strategy: 'fixed',
			middleware: [
				offset(parseInt(styles.getPropertyValue('--_offset'), 10)),
				flip(),
				shift({ padding: parseInt(styles.getPropertyValue('--_shift-padding'), 10) }),
			],
		});

		tooltip.style.left = `${x}px`;
		tooltip.style.top = `${y}px`;
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener('keydown', this._handleKeyDown);
		this.shadowRoot?.querySelector('slot')?.removeEventListener('slotchange', this._boundSlotChange);
		if (this._hideTimeout) {
			clearTimeout(this._hideTimeout);
			this._hideTimeout = null;
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
		'ndd-tooltip': NDDTooltip;
	}
}
