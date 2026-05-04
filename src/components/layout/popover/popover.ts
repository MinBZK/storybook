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
 * @attr {string}  anchor          - ID van het trigger-element voor positionering
 * @attr {string}  placement       - Floating UI placement (default: 'bottom-start')
 * @attr {string}  width           - Expliciete width (default: 320px via --components-popover-default-width)
 * @attr {string}  top             - CSS top-positie. Wanneer gezet (alleen of
 *                                    samen met andere edge-attrs of `centered`)
 *                                    wordt Floating UI's anchor-positionering
 *                                    overgeslagen — de popover staat dan vrij
 *                                    op het scherm. De `anchor` blijft wel
 *                                    nodig voor ARIA-koppeling op de trigger.
 *                                    Geen effect op sm (bottom-sheet wint).
 * @attr {string}  left            - CSS left-positie. Zie `top` voor semantiek.
 * @attr {string}  right           - CSS right-positie. Zie `top` voor semantiek.
 * @attr {string}  bottom          - CSS bottom-positie. Zie `top` voor semantiek.
 * @attr {boolean} centered        - Centreert beide assen op de viewport. Per
 *                                    as overrideable: `centered top="0"` =
 *                                    horizontaal gecentreerd, top-aligned.
 *                                    Mirrort CSS `place-items: center` met
 *                                    `align-items`/`justify-items` overrides.
 * @attr {boolean} sm-full-height  - Op sm-viewport (waar de popover als
 *                                    bottom-sheet rendert) de volledige
 *                                    beschikbare hoogte vullen i.p.v. te
 *                                    krimpen naar content. Geen effect op
 *                                    md+ (anchored modus). Opt-in voor
 *                                    content-heavy use cases zoals zoek-
 *                                    resultaten of lange detail-views; volgt
 *                                    Apple/Material conventie van content-
 *                                    sized als default.
 * @attr {string} accessible-label - (verplicht) Toegankelijke naam (aria-label).
 *                                    Valt terug op de i18n default ('Popover')
 *                                    als niet gezet — geef altijd een unieke,
 *                                    beschrijvende naam.
 * @attr {string} role             - ARIA role (default: 'dialog'). Voor
 *                                    informationele content (tooltip-callout,
 *                                    rich-text help-panel) zonder dialog-
 *                                    interactie-pattern: zet `role="region"`.
 *                                    Voor menu-style triggers: `role="menu"` +
 *                                    `aria-haspopup="menu"` op de anchor.
 *                                    De popover overschrijft een expliciet
 *                                    gezette role nooit.
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
import { computePosition, flip, shift, size, autoUpdate, type Placement } from '@floating-ui/dom';
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

	// Default `undefined` (not '') so Lit doesn't reflect an empty value:
	// `<nldd-popover>` would otherwise carry `top="" left="" right="" bottom=""`
	// in the DOM, which is noisy and could trip `[top]` attribute selectors in
	// consumer stylesheets. The hasOverride checks treat both as falsy.
	@property({ type: String, reflect: true })
	top: string | undefined = undefined;

	@property({ type: String, reflect: true })
	left: string | undefined = undefined;

	@property({ type: String, reflect: true })
	right: string | undefined = undefined;

	@property({ type: String, reflect: true })
	bottom: string | undefined = undefined;

	@property({ type: Boolean, reflect: true })
	centered = false;

	@property({ type: Boolean, reflect: true, attribute: 'sm-full-height' })
	smFullHeight = false;

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
	/** Cleanup-functie van Floating UI's autoUpdate, alleen actief tijdens open. */
	private _cleanupAutoUpdate: (() => void) | null = null;
	private _smQuery: MediaQueryList | null = null;
	private _wasOnSm = false;
	private _previousAnchorEl: Element | null = null;

	get open(): boolean {
		return this._isOpen;
	}

	override connectedCallback(): void {
		super.connectedCallback();
		this.style.containerType = 'inline-size';
		this.style.containerName = 'layout-area';
		if (!this.hasAttribute('popover')) this.setAttribute('popover', '');
		if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', '-1');
		if (!this.hasAttribute('role')) this.setAttribute('role', 'dialog');
		this.addEventListener('toggle', this._handleToggle);
		this.addEventListener('keydown', this._handleKeydown);
		document.addEventListener('click', this._handleDocumentClick);
		this._smQuery = window.matchMedia(`(max-width: ${breakpoints.smMax})`);
		this._wasOnSm = this._smQuery.matches;
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
		// Stop autoUpdate-listeners als popover verwijderd wordt terwijl 'ie
		// nog open is — voorkomt memory-leak en dangling listeners.
		this._cleanupAutoUpdate?.();
		this._cleanupAutoUpdate = null;
		// Strip ALL aria-* van de anchor — niet alleen aria-expanded. In SPA
		// flows (v-if, conditional render) kan de popover verdwijnen terwijl
		// de anchor blijft bestaan. Een achtergebleven aria-controls naar een
		// niet-bestaand element is een WCAG 4.1.2 fout (Name, Role, Value).
		const anchorEl = this._getAnchorEl();
		if (anchorEl) {
			anchorEl.removeAttribute('aria-expanded');
			anchorEl.removeAttribute('aria-haspopup');
			if (this.id && anchorEl.getAttribute('aria-controls') === this.id) {
				anchorEl.removeAttribute('aria-controls');
			}
		}
		this._previousAnchorEl = null;
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
		// Anchor change at runtime: strip aria-* van de oude trigger en zet
		// 'm op de nieuwe. Zonder dit blijft de oude trigger met stale
		// aria-expanded / aria-controls hangen voor SR.
		if (changed.has('anchor') || changed.has('anchorElement')) {
			this._updateAnchorAria(this._isOpen);
		}
		// Position-override changes at runtime: re-apply or clear inline edges
		// + transform zodat de popover meebewegt met dynamische waardes.
		if (
			changed.has('top') || changed.has('left')
			|| changed.has('right') || changed.has('bottom')
			|| changed.has('centered')
		) {
			if (!this.top && !this.centered) this.style.removeProperty('top');
			if (!this.left && !this.centered) this.style.removeProperty('left');
			if (!this.right) this.style.removeProperty('right');
			if (!this.bottom) this.style.removeProperty('bottom');
			if (this._isOpen) this.reposition();
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
			if (import.meta.env?.DEV) console.warn('<nldd-popover>: anchor element not found. Set anchor=ID or anchorElement before calling show().');
			return;
		}
		(this as HTMLElement).showPopover();
	}

	private _warnIfMissingLabel(): void {
		// Dev-only — productieconsoles van end-users blijven schoon.
		if (!import.meta.env?.DEV) return;
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

	/**
	 * Restore the inline transition after a breakpoint-suppressed tick. Force
	 * a layout flush first (`void offsetHeight`) so the just-applied position
	 * styles commit before transitions resume — otherwise the cleared
	 * `transition: ''` would re-enable animations on those exact properties
	 * and you'd still see the slide we were trying to suppress.
	 */
	private _restoreTransition(): void {
		void this.offsetHeight;
		this.style.transition = '';
	}

	/** Herberekent positie t.o.v. anchor. Wordt automatisch aangeroepen bij openen. */
	async reposition(): Promise<void> {
		if (!this._isOpen) return;

		// Suppress transitions when crossing the sm/md breakpoint. Without
		// this, the bottom-sheet's `transition: transform ...` rule animates
		// the swap between the centered-md `translate(-50%, 0)` transform
		// and the sm `translateY(...)` bottom-sheet transform — producing
		// a visible left/right slide on resize. We only suppress on the
		// crossing tick; user-driven open/close on sm continues to animate.
		// Each path below calls _restoreTransition() before returning.
		const isSm = this._smQuery?.matches ?? false;
		const crossedBreakpoint = isSm !== this._wasOnSm;
		this._wasOnSm = isSm;
		if (crossedBreakpoint) this.style.transition = 'none';

		// On sm viewport the popover renders as a bottom sheet via CSS; clear
		// any inline positioning Floating UI may have set previously so the
		// CSS rules take effect.
		if (isSm) {
			this.style.removeProperty('top');
			this.style.removeProperty('left');
			this.style.removeProperty('right');
			this.style.removeProperty('bottom');
			this.style.removeProperty('transform');
			this.style.removeProperty('--_max-height');
			if (crossedBreakpoint) this._restoreTransition();
			return;
		}

		// Position-override: skip Floating UI and place the popover at the
		// consumer-specified coordinates. Anchor blijft nodig voor ARIA maar
		// niet voor positionering — denk aan een vrij geplaatste search-popover
		// die bovenaan-gecentreerd hoort, niet onder z'n trigger.
		//
		// `centered` centreert beide assen (left/top: 50%; transform: translate
		// -50% per as). Een expliciete edge-attr (top/left/right/bottom)
		// overschrijft die as, dus `centered top="0"` = horizontaal gecentreerd
		// + top-aligned. Mirrort CSS `place-items: center` met overrides.
		const hasOverride = this.top || this.left || this.right || this.bottom || this.centered;
		if (hasOverride) {
			const yCenter = this.centered && !this.top && !this.bottom;
			const xCenter = this.centered && !this.left && !this.right;

			if (this.top) this.style.setProperty('top', this.top);
			else if (yCenter) this.style.setProperty('top', '50%');
			if (this.bottom) this.style.setProperty('bottom', this.bottom);

			if (this.left) this.style.setProperty('left', this.left);
			else if (xCenter) this.style.setProperty('left', '50%');
			if (this.right) this.style.setProperty('right', this.right);

			if (xCenter || yCenter) {
				this.style.setProperty('transform',
					`translate(${xCenter ? '-50%' : '0'}, ${yCenter ? '-50%' : '0'})`);
			} else {
				this.style.removeProperty('transform');
			}
			if (crossedBreakpoint) this._restoreTransition();
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

		if (crossedBreakpoint) this._restoreTransition();
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
		const popovertarget = anchorEl.getAttribute('popovertarget');
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
			// Stop scroll/resize tracking — niet meer nodig wanneer dicht.
			this._cleanupAutoUpdate?.();
			this._cleanupAutoUpdate = null;
			this._closedAt = Date.now();
			this._returnFocus();
			this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
			return;
		}

		this._previousFocus = (document.activeElement as HTMLElement | null) ?? this._getAnchorEl() as HTMLElement | null;
		await this.reposition();
		// Start scroll/resize/layout-change tracking. Floating UI's autoUpdate
		// luistert naar ancestor scroll, window resize, en ResizeObserver op
		// de anchor — dekt window-resize binnen viewport-breakpoint, dynamic
		// content shifts, en popovers in scrollable containers (niet alleen
		// document scroll). Op sm-viewport (bottom sheet, position: fixed)
		// is reposition() een no-op dus geen werk.
		const anchorEl = this._getAnchorEl();
		if (anchorEl) {
			this._cleanupAutoUpdate = autoUpdate(anchorEl, this, () => this.reposition());
		}
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
