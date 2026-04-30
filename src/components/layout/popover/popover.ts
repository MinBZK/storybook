/**
 * Nederlandse Digitale Dienst Popover Component (Lit + TypeScript)
 *
 * Een non-modal floating panel dat is verankerd aan een trigger-element.
 * Gebouwd op de native Popover API (popover="auto") met Floating UI voor
 * positionering. De browser regelt open/toggle/light-dismiss; deze
 * component regelt alleen positionering en focus.
 *
 * Aanbevolen gebruik via popovertarget zodat de browser de toggle regelt:
 *
 *     <nldd-button id="info-trigger" popovertarget="info-popover">Info</nldd-button>
 *     <nldd-popover id="info-popover" anchor="info-trigger" accessible-label="Info">
 *         <nldd-container>
 *             <p>Inhoud van de popover.</p>
 *         </nldd-container>
 *     </nldd-popover>
 *
 * Voor een custom focus-target binnen de popover: zet `autofocus` op het
 * gewenste child-element. Anders krijgt de popover-host zelf focus.
 *
 * @element nldd-popover
 *
 * @attr {string} anchor           - ID van het trigger-element voor positionering
 * @attr {string} placement        - Floating UI placement (default: 'bottom-start')
 * @attr {string} width            - Expliciete width (default: 320px via --components-popover-default-width)
 * @attr {string} accessible-label - (verplicht) Toegankelijke naam (aria-label).
 *                                    Valt terug op de i18n default ('Popover')
 *                                    als niet gezet — geef altijd een unieke,
 *                                    beschrijvende naam.
 * @attr {object} translations       - Override translation keys; unset keys
 *                                    vallen terug op de Nederlandse default.
 *
 * @prop {Element|null} anchorElement - Programmatische anchor (heeft voorrang op anchor attribuut)
 * @prop {boolean} open               - (read-only) Of de popover momenteel open is
 *
 * @slot - Vrije content (bijv. nldd-container met form/info)
 *
 * @fires open  - Wanneer de popover wordt geopend
 * @fires close - Wanneer de popover wordt gesloten
 *
 * @method show()     - Opent de popover
 * @method hide()     - Sluit de popover
 * @method toggle()   - Toggelt de popover
 * @method reposition() - Herberekent de positie t.o.v. anchor
 */

import { LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { computePosition, flip, shift, size, type Placement } from '@floating-ui/dom';
import { popoverStyles } from './popover.styles.js';
import { popoverTemplate } from './popover.template.js';
import { nlddPopoverTranslations, type NLDDPopoverTranslations } from './popover.i18n.js';
import { POPOVER_REOPEN_GUARD_MS } from '../../../utilities/popover-guard.js';
import { isPointerMode } from '../../../utilities/input-modality.js';
import { breakpoints } from '../../../assets/styles/breakpoints.js';

@customElement('nldd-popover')
export class NLDDPopover extends LitElement {
	static override styles = popoverStyles;

	@property({ type: String, reflect: true })
	anchor = '';

	@property({ attribute: false })
	anchorElement: Element | null = null;

	@property({ type: String, reflect: true })
	placement: Placement = 'bottom-start';

	@property({ type: String, reflect: true })
	width: string | undefined;

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	/**
	 * Override one or more translation keys.
	 * Unset keys fall back to the Dutch default.
	 */
	@property({ type: Object })
	translations: Partial<NLDDPopoverTranslations> = {};

	private _isOpen = false;
	private _hasWarnedLabel = false;
	private _previousFocus: HTMLElement | null = null;
	private _closedAt = 0;
	private _smQuery: MediaQueryList | null = null;
	private _previousAnchorEl: Element | null = null;

	get open(): boolean {
		return this._isOpen;
	}

	override connectedCallback(): void {
		super.connectedCallback();
		if (!this.hasAttribute('popover')) this.setAttribute('popover', '');
		if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', '-1');
		if (!this.hasAttribute('role')) this.setAttribute('role', 'dialog');
		this.addEventListener('toggle', this._handleToggle);
		this.addEventListener('keydown', this._handleKeydown);
		document.addEventListener('click', this._handleDocumentClick);
		this._smQuery = window.matchMedia(`(max-width: ${breakpoints.smMax})`);
		this._smQuery.addEventListener('change', this._handleViewportChange);
		// Initialiseer aria-expanded/aria-haspopup op de anchor zodat SR de
		// trigger-knop direct als toggle-control aankondigt — niet pas na de
		// eerste open. Defer naar microtask: anchor (by id) is mogelijk nog
		// niet in de DOM op connectedCallback-tijd. Daarnaast: warn over
		// ontbrekende accessible-label vanuit dezelfde gedeferde tick zodat
		// 'm ook vliegt bij popovertarget-gebruik (waar show() niet wordt
		// aangeroepen door ons component).
		Promise.resolve().then(() => {
			this._updateAnchorAria(false);
			this._warnIfMissingLabel();
		});
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener('toggle', this._handleToggle);
		this.removeEventListener('keydown', this._handleKeydown);
		document.removeEventListener('click', this._handleDocumentClick);
		this._smQuery?.removeEventListener('change', this._handleViewportChange);
		this._smQuery = null;
		this._updateAnchorAria(false);
	}

	override updated(changed: PropertyValues): void {
		// Set width via the CSS variable so media-query overrides (bottom
		// sheet on sm) keep working. Inline `style.width` would beat them.
		if (changed.has('width')) {
			if (this.width) {
				this.style.setProperty('--components-popover-default-width', this.width);
			} else {
				this.style.removeProperty('--components-popover-default-width');
			}
		}
		if (changed.has('accessibleLabel') || changed.has('translations')) {
			this.setAttribute('aria-label', this._resolvedAccessibleLabel);
		}
	}

	// — i18n ——————————————————————————————————————————————————————————————————

	private _t(key: keyof NLDDPopoverTranslations): string {
		return this.translations[key] ?? nlddPopoverTranslations[key];
	}

	get _resolvedAccessibleLabel(): string {
		return this.accessibleLabel || this._t('components.popover.accessible-label');
	}

	// — Public API ————————————————————————————————————————————————————————————

	show(): void {
		this._warnIfMissingLabel();
		const anchorEl = this._getAnchorEl();
		if (!anchorEl) {
			console.warn('<nldd-popover>: anchor element not found. Set anchor=ID or anchorElement before calling show().');
			return;
		}
		(this as HTMLElement).showPopover();
	}

	private _warnIfMissingLabel(): void {
		if (this.accessibleLabel || this._hasWarnedLabel) return;
		this._hasWarnedLabel = true;
		console.warn(`<nldd-popover>: No accessible-label provided. Screen readers will announce this popover as "${this._t('components.popover.accessible-label')}". Set accessible-label to a unique, descriptive name.`);
	}

	hide(): void {
		if (!this._isOpen) return;
		(this as HTMLElement).hidePopover();
	}

	toggle(): void {
		if (this._isOpen) this.hide();
		else this.show();
	}

	/** Herberekent positie t.o.v. anchor. Wordt automatisch aangeroepen bij openen. */
	async reposition(): Promise<void> {
		if (!this._isOpen) return;

		// On sm viewport the popover renders as a bottom sheet via CSS; clear
		// any inline positioning Floating UI may have set previously so the
		// CSS rules take effect.
		if (this._smQuery?.matches) {
			this.style.removeProperty('left');
			this.style.removeProperty('top');
			this.style.removeProperty('--_max-height');
			return;
		}

		const anchorEl = this._getAnchorEl();
		if (!anchorEl) return;

		// No fallback: --semantics-overlays-inset moet bestaan (gevalideerd
		// door CI). parseFloat handelt leading whitespace (die
		// getPropertyValue soms levert) correct af; bij ontbrekende token
		// propagateert NaN zodat de fout zichtbaar is i.p.v. stilletjes
		// een fallback gebruikt te worden.
		const inset = parseFloat(getComputedStyle(this).getPropertyValue('--semantics-overlays-inset'));

		const { x, y } = await computePosition(anchorEl, this, {
			placement: this.placement,
			middleware: [
				flip({ padding: inset }),
				shift({ padding: inset }),
				size({
					padding: inset,
					apply: ({ availableHeight }: { availableHeight: number }) => {
						this.style.setProperty('--_max-height', `${availableHeight}px`);
					},
				}),
			],
		});

		Object.assign(this.style, {
			left: `${x}px`,
			top: `${y}px`,
		});
	}

	// — Anchor ————————————————————————————————————————————————————————————————

	private _getAnchorEl(): Element | null {
		if (this.anchorElement) return this.anchorElement;
		if (this.anchor) return document.getElementById(this.anchor);
		return null;
	}

	private _updateAnchorAria(open: boolean): void {
		const anchorEl = this._getAnchorEl();
		// Anchor changed (e.g. anchorElement property switched, or anchor
		// attribute updated) — strip aria-expanded en eventuele aria-controls
		// van de vorige zodat 'ie niet als toggle blijft hangen voor SR.
		if (this._previousAnchorEl && this._previousAnchorEl !== anchorEl) {
			this._previousAnchorEl.removeAttribute('aria-expanded');
			if (this._previousAnchorEl.getAttribute('aria-controls') === this.id) {
				this._previousAnchorEl.removeAttribute('aria-controls');
			}
		}
		if (!anchorEl) {
			this._previousAnchorEl = null;
			return;
		}
		anchorEl.setAttribute('aria-expanded', open ? 'true' : 'false');
		// aria-haspopup hoort bij de trigger te staan vanaf de eerste render,
		// niet pas na de eerste open. Geen overwrite als de host een eigen
		// waarde heeft (bv. 'menu' i.p.v. 'dialog' voor combinaties).
		if (!anchorEl.hasAttribute('aria-haspopup')) {
			anchorEl.setAttribute('aria-haspopup', 'dialog');
		}
		// aria-controls verbindt de trigger expliciet met het popover-element.
		// ARIA Authoring Practices voor dialog-triggers; verbetert SR-context.
		// Alleen zetten als deze popover een id heeft én de anchor 'm nog niet
		// naar iets anders wijst.
		if (this.id && !anchorEl.hasAttribute('aria-controls')) {
			anchorEl.setAttribute('aria-controls', this.id);
		}
		this._previousAnchorEl = anchorEl;
	}

	// — Event handlers ————————————————————————————————————————————————————————

	private _handleViewportChange = (): void => {
		if (this._isOpen) this.reposition();
	};

	private _handleDocumentClick = (event: MouseEvent): void => {
		const anchorEl = this._getAnchorEl();
		if (!anchorEl) return;
		const path = event.composedPath();
		if (!path.includes(anchorEl)) return;
		// If the anchor uses popovertarget pointing at this popover, the
		// browser's default activation behavior already toggles us. Running
		// our own toggle here would invert the state right after, leaving
		// the popover in the wrong final state.
		const popovertarget = (anchorEl as HTMLElement).getAttribute?.('popovertarget');
		if (popovertarget && this.id && popovertarget === this.id) return;
		if (this._isOpen) {
			(this as HTMLElement).hidePopover();
		} else if (Date.now() - this._closedAt > POPOVER_REOPEN_GUARD_MS) {
			(this as HTMLElement).showPopover();
		}
	};

	private _handleToggle = async (event: Event): Promise<void> => {
		const toggleEvent = event as ToggleEvent;
		this._isOpen = toggleEvent.newState === 'open';

		this._updateAnchorAria(this._isOpen);

		if (toggleEvent.newState !== 'open') {
			this._closedAt = Date.now();
			this._returnFocus();
			this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
			return;
		}

		this._previousFocus = (document.activeElement as HTMLElement | null) ?? this._getAnchorEl() as HTMLElement | null;
		await this.reposition();
		await this.updateComplete;
		this._manageFocus();
		this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true }));
	};

	private _handleKeydown = (event: KeyboardEvent): void => {
		if (event.key !== 'Tab') return;
		const focusables = this._getFocusables();
		// document.activeElement geeft alleen de shadow host terug (bv.
		// nldd-button), niet het interne <button>. Onze focusables-lijst
		// bevat juist het interne element via shadow-walk. Gebruik
		// composedPath()[0] om het daadwerkelijk gefocuste element te
		// krijgen — dat matcht wat _getFocusables retourneert.
		const focused = (event.composedPath()[0] as HTMLElement | null)
			?? (document.activeElement as HTMLElement | null);
		const idx = focused ? focusables.indexOf(focused) : -1;
		const tabsOut = focusables.length === 0
			|| (event.shiftKey ? idx === 0 : idx === focusables.length - 1);
		if (tabsOut) {
			event.preventDefault();
			this.hide();
		}
	};

	// — Focus ————————————————————————————————————————————————————————————————

	private _manageFocus(): void {
		this.classList.toggle('is-pointer-focus', isPointerMode());
		const autofocusEl = this.querySelector<HTMLElement>('[autofocus]');
		if (autofocusEl) {
			autofocusEl.focus();
			return;
		}
		this.focus();
	}

	private _returnFocus(): void {
		const target = this._previousFocus ?? (this._getAnchorEl() as HTMLElement | null);
		this._previousFocus = null;
		target?.focus();
	}

	private _getFocusables(): HTMLElement[] {
		const selector = [
			'a[href]',
			'button:not([disabled])',
			'input:not([disabled])',
			'select:not([disabled])',
			'textarea:not([disabled])',
			'[tabindex]:not([tabindex="-1"])',
			'[contenteditable=""]',
			'[contenteditable="true"]',
			'details > summary:first-of-type',
		].join(',');

		// Walk in document order, descending into shadow roots inline so a
		// custom element's internal <button> verschijnt op de juiste plek
		// tussen omringende light-DOM focusables (eerst shadow content, dan
		// light children — matcht de tab-order voor de meeste use cases).
		// Edge case: een shadow tree met markup vóór een <slot> volgorde
		// raakt niet 100% gespiegeld, maar dat is zeldzaam in popover content.
		//
		// Performance: getClientRects() forceert layout per element. Voor
		// rich popover content met veel focusables is dit O(n) layout-flush.
		// Alleen aangeroepen op Tab-keydown (zeldzaam, niet hot path), en
		// caching zou de visibility-snapshot kunnen verouderen — bewuste
		// trade-off voor correctheid boven micro-perf.
		const result: HTMLElement[] = [];
		const visit = (root: ParentNode): void => {
			for (const child of Array.from(root.children)) {
				const el = child as HTMLElement;
				if (el.matches?.(selector) && !el.hasAttribute('disabled')) {
					// getClientRects().length === 0 catches display:none en
					// visibility:hidden van element of ancestor (inclusief
					// shadow host) — robuuster dan offsetParent in shadow.
					if (el.getClientRects().length > 0) result.push(el);
				}
				if (el.shadowRoot) visit(el.shadowRoot);
				visit(el);
			}
		};
		visit(this);
		return result;
	}

	override render() {
		return popoverTemplate();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-popover': NLDDPopover;
	}
}
