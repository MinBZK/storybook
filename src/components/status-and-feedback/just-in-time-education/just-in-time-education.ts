/**
 * Nederlandse Digitale Dienst Just in Time Education Component (Lit + TypeScript)
 *
 * Een guided-discovery coach-mark. Plaats een control (bijv. nldd-search-field)
 * in de default slot; zolang `active` is gezet tilt het component een callout
 * (titel + supporting text + dismiss) in de top layer via de Popover API
 * (`popover="manual"`), geankerd aan het control met Floating UI. Geen backdrop,
 * non-modaal: de achtergrond blijft interactief. Het control zelf blijft op zijn
 * plek in de flow staan.
 *
 * Met `dismissable` beheert het component het sluiten en vuurt het nldd-close:
 *  - de gebruiker voert de geadviseerde interactie uit op het control -> close{completed}
 *  - de dismiss-knop -> close{dismissed}
 *  - een klik/toets BUITEN de coach-mark -> close{ignored}
 * Zonder `dismissable` sluit niets vanzelf (geen knop, geen buiten- of slot-klik);
 * dan bepaalt de consumer het sluiten zelf via `active` of `complete()`. `complete()`
 * werkt altijd en sluit met close{completed} (bijv. pas bij een echte zoekopdracht).
 *
 * @element nldd-just-in-time-education
 * @attr {boolean} active          - Toon de coach-mark. App-gestuurd; standaard false.
 * @attr {string}  text            - Titel van de callout.
 * @attr {string}  supporting-text - Ondersteunende tekst onder de titel.
 * @attr {string}  placement       - 'auto' | 'top' | 'bottom' | 'left' | 'right' (standaard 'auto').
 * @attr {boolean} dismissable     - Toon de dismiss-knop en sta sluiten toe via 1 klik/toets buiten de coach-mark. Standaard false: dan beheert de consumer het sluiten zelf.
 * @attr {string}  arrow-length    - Pijllengte en dus de afstand tussen card en control, als CSS-lengte (bijv. \`333px\`, \`30vh\`). Leeg = DS-standaard; onder 40px wordt geklemd.
 * @attr {boolean} no-arrow        - Verberg de pijl; de card staat dan dicht tegen het control.
 *
 * @cssprop [--components-just-in-time-education-arrow-length] - Onderliggende token voor de pijllengte; doorgaans via het \`arrow-length\`-attribuut gezet, maar ook direct themebaar via CSS.
 *
 * @slot - Het control waar de coach-mark naar wijst (blijft in de normale flow).
 *
 * @fires nldd-close - Wanneer de coach-mark sluit. detail: { reason: 'completed' | 'dismissed' | 'ignored' }.
 *
 * @note Rendert via de native Popover API (`popover="manual"`) in de top layer,
 * dus het escapet ancestor stacking contexts en `overflow: hidden` clipping.
 * Positionering via Floating UI met `strategy: 'fixed'` + `autoUpdate`. De kant
 * wordt bepaald door de beschikbare ruimte (horizontaal de viewport, verticaal
 * het hele document) bij openen en bij window-resize; scrollen laat de kant vast
 * en verschuift de callout alleen mee met het control.
 */

import { LitElement } from 'lit';
import type { PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { computePosition, autoUpdate, offset, shift } from '@floating-ui/dom';
import { withTranslations } from '../../../utilities/with-translations.js';
import { justInTimeEducationStyles } from './just-in-time-education.styles.js';
import { justInTimeEducationTemplate } from './just-in-time-education.template.js';
import { nlddJustInTimeEducationTranslations } from './just-in-time-education.i18n.js';
import type { NLDDJustInTimeEducationTranslations } from './just-in-time-education.i18n.js';
import '../../actions/icon-button/icon-button.js';

type Placement = 'auto' | 'top' | 'bottom' | 'left' | 'right';
export type JustInTimeEducationCloseReason = 'completed' | 'dismissed' | 'ignored';

let jiteCounter = 0;

@customElement('nldd-just-in-time-education')
export class NLDDJustInTimeEducation extends withTranslations<NLDDJustInTimeEducationTranslations>(LitElement, nlddJustInTimeEducationTranslations) {
	static override styles = justInTimeEducationStyles;

	// Attributes the component owns itself; every OTHER attribute set on the host
	// is forwarded to the slotted control so the wrapper stays transparent to
	// parent-driven attributes (e.g. the `size` an nldd-toolbar pushes onto its
	// direct child). Structural attributes (style/class/id/slot/hidden) and the
	// internal data-arrow-side deliberately stay on the host.
	private static readonly _ownAttributes = new Set([
		'active', 'text', 'supporting-text', 'placement', 'dismissable', 'arrow-length', 'no-arrow',
		'data-arrow-side', 'style', 'class', 'id', 'slot', 'hidden',
	]);

	/** Show the coach-mark. Controlled by the app; defaults to false. */
	@property({ type: Boolean, reflect: true })
	active = false;

	@property({ type: String, reflect: true })
	text = '';

	@property({ type: String, reflect: true, attribute: 'supporting-text' })
	supportingText = '';

	@property({ type: String, reflect: true })
	placement: Placement = 'auto';

	@property({ type: Boolean, reflect: true })
	dismissable = false;

	@property({ type: String, reflect: true, attribute: 'arrow-length' })
	arrowLength = '';

	@property({ type: Boolean, reflect: true, attribute: 'no-arrow' })
	noArrow = false;

	private _cleanupAutoUpdate: (() => void) | null = null;
	private _attachTimeout: ReturnType<typeof setTimeout> | null = null;
	private _attributeObserver: MutationObserver | null = null;
	private _boundDocumentInteraction = (e: Event) => this._handleDocumentInteraction(e);
	private _resolvedSide: 'top' | 'bottom' | 'left' | 'right' | null = null;
	private _lastViewportWidth = 0;
	private _lastViewportHeight = 0;
	_arrowMarkerId = `nldd-jite-arrow-${++jiteCounter}`;

	override updated(changed: PropertyValues): void {
		if (changed.has('arrowLength')) {
			// The arrow-length attribute takes any CSS length and feeds the public
			// --components-* token; the CSS clamps it (min 40) into --_arrow-gap.
			if (this.arrowLength) this.style.setProperty('--components-just-in-time-education-arrow-length', this.arrowLength);
			else this.style.removeProperty('--components-just-in-time-education-arrow-length');
		}
		if (changed.has('active')) {
			if (this.active) this._open();
			else this._closePopover();
		} else if (this.active && (changed.has('placement') || changed.has('text') || changed.has('supportingText') || changed.has('arrowLength') || changed.has('noArrow'))) {
			// Re-place while open when an input that affects the geometry changes;
			// clear the cached side so the placement is decided from scratch.
			this._resolvedSide = null;
			const control = this._getControl();
			const container = this._containerEl;
			if (control && container) this._updatePosition(control, container);
		}
	}

	private get _containerEl(): HTMLElement | null {
		return this.shadowRoot?.querySelector('.just-in-time-education') ?? null;
	}

	private get _cardEl(): HTMLElement | null {
		return this.shadowRoot?.querySelector('.just-in-time-education__main') ?? null;
	}

	private _getControl(): HTMLElement | null {
		const slot = this.shadowRoot?.querySelector('slot');
		const assigned = slot?.assignedElements({ flatten: true });
		return (assigned?.[0] as HTMLElement) ?? null;
	}

	private _getControls(): Element[] {
		const slot = this.shadowRoot?.querySelector('slot');
		return slot?.assignedElements({ flatten: true }) ?? [];
	}

	/** Mirror one host attribute onto the slotted control(s) — or remove it —
	 *  unless the component owns that attribute. */
	private _forwardAttribute(name: string): void {
		if (NLDDJustInTimeEducation._ownAttributes.has(name)) return;
		const present = this.hasAttribute(name);
		const value = this.getAttribute(name) ?? '';
		for (const control of this._getControls()) {
			if (present) control.setAttribute(name, value);
			else control.removeAttribute(name);
		}
	}

	/** Forward every non-owned host attribute to the slotted control(s); run on
	 *  slotchange so a freshly slotted control catches up with what's already set. */
	_handleSlotChange(): void {
		for (const attr of Array.from(this.attributes)) this._forwardAttribute(attr.name);
	}

	private _open(): void {
		const container = this._containerEl;
		if (!container) return;
		if (!container.matches(':popover-open')) container.showPopover();
		this._startPositioning();
		// Outside-click/keystroke dismissal only applies when dismissable. Defer
		// attaching the listeners to the next task so the click or keystroke that
		// opened the coach-mark isn't itself treated as an "outside" action.
		if (!this.dismissable) return;
		if (this._attachTimeout) clearTimeout(this._attachTimeout);
		this._attachTimeout = setTimeout(() => {
			this._attachTimeout = null;
			if (!this.active) return;
			document.addEventListener('click', this._boundDocumentInteraction, true);
			document.addEventListener('keydown', this._boundDocumentInteraction, true);
		}, 0);
	}

	private _closePopover(): void {
		const container = this._containerEl;
		if (container?.matches(':popover-open')) container.hidePopover();
		this._stopPositioning();
		if (this._attachTimeout) {
			clearTimeout(this._attachTimeout);
			this._attachTimeout = null;
		}
		document.removeEventListener('click', this._boundDocumentInteraction, true);
		document.removeEventListener('keydown', this._boundDocumentInteraction, true);
	}

	private _startPositioning(): void {
		const control = this._getControl();
		const container = this._containerEl;
		if (!control || !container) return;
		this._stopPositioning();
		// autoUpdate re-runs on scroll/resize/layout shifts so the container keeps
		// tracking the control. Scrolling only translates the callout; the side is
		// re-decided only when the viewport changes (see _updatePosition).
		this._cleanupAutoUpdate = autoUpdate(control, container, () => this._updatePosition(control, container));
	}

	private _stopPositioning(): void {
		this._cleanupAutoUpdate?.();
		this._cleanupAutoUpdate = null;
		this._resolvedSide = null;
	}

	private async _updatePosition(control: HTMLElement, container: HTMLElement): Promise<void> {
		const styles = getComputedStyle(this);
		const off = parseInt(styles.getPropertyValue('--_offset'), 10);
		const pad = parseInt(styles.getPropertyValue('--_shift-padding'), 10);

		// The side is chosen by available space, not by scrolling: horizontally
		// against the viewport, vertically against the whole document. Re-decide
		// only when the viewport dimensions change (a window resize); on scroll the
		// dimensions are unchanged, so the cached side stays put and the callout
		// merely translates to keep tracking the control.
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;
		if (this._resolvedSide === null || viewportWidth !== this._lastViewportWidth || viewportHeight !== this._lastViewportHeight) {
			this._resolvedSide = this._chooseSide(control);
			this._lastViewportWidth = viewportWidth;
			this._lastViewportHeight = viewportHeight;
		}
		const side = this._resolvedSide;

		// The gap padding only sits on the side facing the control (reflected via
		// data-arrow-side), so it changes the container's size per side. Apply it
		// BEFORE the compute: a padding-only change doesn't trigger autoUpdate's
		// ResizeObserver, so the compute must already use the final size — otherwise
		// switching between a vertical and a horizontal side leaves the position
		// wrong until a manual resize.
		if (this.getAttribute('data-arrow-side') !== side) this.setAttribute('data-arrow-side', side);

		// Shrink the arrow gap as the card nears the document's top/bottom edge:
		// clamp --_available-room to the room left for the gap (distance to the edge
		// minus the card height); the CSS min() lets the gap fall to 0. Set BEFORE
		// the compute so the (smaller) padding is already in place. Left/right
		// placements aren't limited this way.
		const cardHeight = this._cardEl?.getBoundingClientRect().height ?? 0;
		const controlRect = control.getBoundingClientRect();
		let availableRoom = '9999px';
		if (side === 'top') {
			availableRoom = `${Math.max(0, controlRect.top + window.scrollY - cardHeight)}px`;
		} else if (side === 'bottom') {
			availableRoom = `${Math.max(0, document.documentElement.scrollHeight - (controlRect.bottom + window.scrollY) - cardHeight)}px`;
		}
		this.style.setProperty('--_available-room', availableRoom);

		// Top/bottom: shift along the horizontal (main) axis so the card keeps its
		// preferred width near a viewport edge, sliding toward the side with room
		// while the arrow still points at the control's centre. Left/right: no shift
		// — it would push the card off the control vertically (sticking to the
		// viewport) instead of letting it sit beside the control.
		const isVertical = side === 'top' || side === 'bottom';
		const { x, y } = await computePosition(control, container, {
			placement: side,
			strategy: 'fixed',
			middleware: isVertical ? [offset(off), shift({ padding: pad })] : [offset(off)],
		});
		container.style.left = `${x}px`;
		container.style.top = `${y}px`;
		this._updateArrow(control, container, side);
	}

	// Picks the side the callout sits on from the room around the control:
	// horizontally against the viewport edges, vertically against the full
	// document, so scrolling never changes the outcome (only a resize does). A
	// fixed placement is honoured exactly; only 'auto' weighs the room and takes
	// the side with the most of it (ties fall to 'bottom', the conventional spot).
	private _chooseSide(control: HTMLElement): 'top' | 'bottom' | 'left' | 'right' {
		if (this.placement !== 'auto') return this.placement;
		const rect = control.getBoundingClientRect();
		const documentHeight = document.documentElement.scrollHeight;
		const room = {
			top: rect.top + window.scrollY,
			bottom: documentHeight - (rect.bottom + window.scrollY),
			left: rect.left,
			right: window.innerWidth - rect.right,
		};
		let side: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
		for (const candidate of ['top', 'bottom', 'left', 'right'] as const) {
			if (room[candidate] > room[side]) side = candidate;
		}
		return side;
	}

	// Draws a flowing cubic from the card edge to the control edge, inside the
	// transparent (padded) container so it is never clipped. Runs on every
	// reposition (autoUpdate) so the curve re-routes as things move.
	private _updateArrow(control: HTMLElement, container: HTMLElement, placement: string): void {
		const svg = this.shadowRoot?.querySelector<SVGSVGElement>('.just-in-time-education__arrow');
		const path = this.shadowRoot?.querySelector<SVGPathElement>('.just-in-time-education__arrow-path');
		const card = this._cardEl;
		if (!svg || !path || !card) return;

		const containerRect = container.getBoundingClientRect();
		const cardRect = card.getBoundingClientRect();
		const controlRect = control.getBoundingClientRect();
		const cardCenterX = cardRect.left + cardRect.width / 2;
		const cardCenterY = cardRect.top + cardRect.height / 2;
		const controlCenterX = controlRect.left + controlRect.width / 2;
		const controlCenterY = controlRect.top + controlRect.height / 2;
		const side = placement.split('-')[0];

		// S starts on the card edge facing the control. The tip points just shy of
		// the control edge; dir is the direction the arrow travels into the control
		// (perpendicular to that edge).
		const tipGap = 6;
		const arrowLen = 10;
		let sx: number, sy: number, tipX: number, tipY: number, dirX: number, dirY: number;
		if (side === 'top') {
			sx = cardCenterX; sy = cardRect.bottom; tipX = controlCenterX; tipY = controlRect.top - tipGap; dirX = 0; dirY = 1;
		} else if (side === 'bottom') {
			sx = cardCenterX; sy = cardRect.top; tipX = controlCenterX; tipY = controlRect.bottom + tipGap; dirX = 0; dirY = -1;
		} else if (side === 'left') {
			sx = cardRect.right; sy = cardCenterY; tipX = controlRect.left - tipGap; tipY = controlCenterY; dirX = 1; dirY = 0;
		} else {
			sx = cardRect.left; sy = cardCenterY; tipX = controlRect.right + tipGap; tipY = controlCenterY; dirX = -1; dirY = 0;
		}

		// The stroke ends arrowLen short of the tip (along dir), so the dashed line
		// stops at the arrowhead base; the marker (refX=0) fills from there to the
		// tip. Building the curve to this point (not the tip) keeps the end tangent
		// pointing INTO the control, so the arrowhead never flips.
		const ex = tipX - arrowLen * dirX;
		const ey = tipY - arrowLen * dirY;

		// Two cubic segments forming a gentle bow (the "belly"), with tangents
		// perpendicular to both edges and at the midpoint, so the line leaves the
		// card and meets the control at 90 degrees while bowing out in the middle.
		const k = 0.25;
		const dx = ex - sx;
		const dy = ey - sy;
		const vertical = side === 'top' || side === 'bottom';
		const bulge = Math.min(Math.hypot(dx, dy) * 0.18, 9);
		const mx = (sx + ex) / 2 + (vertical ? bulge : 0);
		const my = (sy + ey) / 2 + (vertical ? 0 : bulge);

		let c1x: number, c1y: number, c2x: number, c2y: number;
		let c3x: number, c3y: number, c4x: number, c4y: number;
		if (vertical) {
			c1x = sx; c1y = sy + dy * k; c2x = mx; c2y = my - dy * k;
			c3x = mx; c3y = my + dy * k; c4x = ex; c4y = ey - dy * k;
		} else {
			c1x = sx + dx * k; c1y = sy; c2x = mx - dx * k; c2y = my;
			c3x = mx + dx * k; c3y = my; c4x = ex - dx * k; c4y = ey;
		}

		// Size/place the SVG to the bounding box of the path and the tip.
		const margin = 4;
		const xs = [sx, mx, ex, tipX, c1x, c2x, c3x, c4x];
		const ys = [sy, my, ey, tipY, c1y, c2y, c3y, c4y];
		const minX = Math.min(...xs) - margin;
		const minY = Math.min(...ys) - margin;
		const width = Math.max(...xs) + margin - minX;
		const height = Math.max(...ys) + margin - minY;
		svg.style.left = `${minX - containerRect.left}px`;
		svg.style.top = `${minY - containerRect.top}px`;
		svg.setAttribute('width', `${width}`);
		svg.setAttribute('height', `${height}`);
		svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
		path.setAttribute('d',
			`M ${sx - minX} ${sy - minY}`
			+ ` C ${c1x - minX} ${c1y - minY}, ${c2x - minX} ${c2y - minY}, ${mx - minX} ${my - minY}`
			+ ` C ${c3x - minX} ${c3y - minY}, ${c4x - minX} ${c4y - minY}, ${ex - minX} ${ey - minY}`,
		);
	}

	/** Route 1: the advised interaction on the slotted control (only when
	 *  dismissable; otherwise the consumer drives completion via complete()). */
	_handleAdvisedInteraction(): void {
		if (!this.active || !this.dismissable) return;
		this._close('completed');
	}

	/** Route 2: a click/keystroke outside the coach-mark (only when dismissable). */
	private _handleDocumentInteraction(e: Event): void {
		if (!this.active || !this.dismissable) return;
		// Anything inside the coach-mark (the slotted control or the callout) is
		// not an "outside" action. Interaction on the control is the advised
		// interaction, handled by route 1.
		if (e.composedPath().includes(this)) return;
		this._close('ignored');
	}

	/** Route 3: the dismiss button. */
	_handleDismiss(): void {
		this._close('dismissed');
	}

	/** Programmatically mark the advised interaction as done (success close). */
	complete(): void {
		if (this.active) this._close('completed');
	}

	private _close(reason: JustInTimeEducationCloseReason): void {
		this.active = false; // triggers updated() -> _closePopover()
		this.dispatchEvent(new CustomEvent('nldd-close', {
			detail: { reason },
			bubbles: true,
			composed: true,
		}));
	}

	override connectedCallback(): void {
		super.connectedCallback();
		// The toolbar sets `size` on its direct child (now us) dynamically, AFTER
		// mount, so we observe attribute changes and forward them; slotchange covers
		// the initial set and any control swap.
		if (!this._attributeObserver) {
			this._attributeObserver = new MutationObserver(records => {
				for (const record of records) {
					if (record.attributeName) this._forwardAttribute(record.attributeName);
				}
			});
		}
		this._attributeObserver.observe(this, { attributes: true });
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this._closePopover();
		this._attributeObserver?.disconnect();
	}

	override render() {
		return justInTimeEducationTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-just-in-time-education': NLDDJustInTimeEducation;
	}
}
