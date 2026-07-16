/**
 * Nederlandse Digitale Dienst Split Button Component (Lit + TypeScript)
 *
 * A split button combines a primary action button with a dropdown trigger.
 * The main button performs the default action, while the icon button opens a
 * menu or popover.
 *
 * Provide the dropdown by slotting an `nldd-menu` (with its `nldd-menu-item` /
 * `nldd-menu-divider` children) or an `nldd-popover` directly:
 *
 * ```html
 * <nldd-split-button text="Opslaan">
 *   <nldd-menu>
 *     <nldd-menu-item text="Opslaan als…"></nldd-menu-item>
 *   </nldd-menu>
 * </nldd-split-button>
 * ```
 *
 * The slotted overlay stays in the light DOM — no item-moving — so consumers
 * keep their references and the full overlay API. The split-button anchors it
 * to the chevron and opens it on click. When no overlay is slotted, the chevron
 * dispatches `menu-click` and the consumer manages their own popover.
 *
 * @element nldd-split-button
 * @attr {string} size - Button size: 'xs' | 'sm' | 'md' | 'lg' (default: 'md')
 * @attr {string} variant - Button variant (default: 'neutral-tinted')
 * @attr {boolean} disabled - Disabled state
 * @attr {string} width - Width mode: 'full' (stretches to container) or any CSS length; the main action button fills the available space
 * @attr {string} text - Button text for the primary action
 * @attr {string} icon - Icon name shown before the text on the primary action button
 * @attr {object} translations - Translations; unset keys fall back to Dutch
 *
 * @slot - A single `nldd-menu` or `nldd-popover` that the chevron opens.
 *
 * @fires action-click - Fired when the main button is clicked
 * @fires menu-click - Fired when the dropdown trigger is clicked and no overlay is slotted
 */
import { LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { reflectNonDefault } from '../../../utilities/reflect-non-default.js';
import { splitButtonStyles } from './split-button.styles.js';
import { template } from './split-button.template.js';
import { nlddSplitButtonTranslations } from './split-button.i18n.js';
import type { NLDDSplitButtonTranslations } from './split-button.i18n.js';
import './../button/button.js';
import './../icon-button/icon-button.js';
import '../../actions/menu/menu.js';
import type { NLDDMenu } from '../../actions/menu/menu.js';
import type { NLDDPopover } from '../../layout/popover/popover.js';

/** A floating overlay the split-button chevron anchors and toggles. */
type Overlay = (NLDDMenu | NLDDPopover) & { anchorElement: Element | null };

export type Size = 'xs' | 'sm' | 'md' | 'lg';

@customElement('nldd-split-button')
export class NLDDSplitButton extends LitElement {
	static override styles = splitButtonStyles;

	@property({ reflect: true, converter: reflectNonDefault<Size>('md') })
	size: Size = 'md';

	@property({ reflect: true, converter: reflectNonDefault<string>('neutral-tinted') })
	variant: string = 'neutral-tinted';

	@property({ type: Boolean, reflect: true })
	disabled = false;

	/** Width mode: 'full' (stretch to container) or any CSS length. The main action button fills the available space. */
	@property({ reflect: true, converter: reflectNonDefault<string>('') })
	width = '';

	/** Button text for the primary action. */
	@property({ reflect: true, converter: reflectNonDefault<string>('') })
	text = '';

	/** Icon name shown before the text on the primary action button. */
	@property({ type: String })
	icon = '';

	@property({ type: Object })
	translations: Partial<NLDDSplitButtonTranslations> = {};

	// Wrapper div around the inner `nldd-icon-button`. The pointerdown listener
	// attaches here because pointerdown bubbles up from the nested icon-button.
	@query('.split-button__popup-button')
	private _popupButtonWrapper?: HTMLDivElement;

	@state()
	_menuIsOpen = false;

	/** The consumer-slotted overlay (`nldd-menu` / `nldd-popover`), or null when
	 * none is provided. */
	private _overlay: Overlay | null = null;
	private _overlayWasOpenOnPointerdown = false;

	// — i18n —————————————————————————————————————————————————————————————————

	public _t(key: keyof NLDDSplitButtonTranslations): string {
		return this.translations[key] ?? nlddSplitButtonTranslations[key];
	}

	// — Lifecycle ————————————————————————————————————————————————————————————

	override firstUpdated(): void {
		// Capture open-state BEFORE the browser's light-dismiss fires on
		// pointerdown. The click handler uses this snapshot to decide: was the
		// popover open? → user clicked to close (no-op, light-dismiss already
		// closed it). Was it closed? → open it. Pointerdown fires for mouse,
		// touch and pen — `mousedown` alone would skip touch on mobile, where
		// no mousedown precedes the synthetic click.
		this._popupButtonWrapper?.addEventListener('pointerdown', () => {
			this._overlayWasOpenOnPointerdown = this._overlay?.matches(':popover-open') ?? false;
		});

		// If the overlay was slotted declaratively, _handleSlotChange may have run
		// before @query resolved _popupButtonWrapper and couldn't anchor it. The
		// wrapper exists now — anchor an overlay that's still waiting for it.
		if (this._overlay && this._popupButtonWrapper) {
			this._overlay.anchorElement = this._popupButtonWrapper;
		}
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this._overlay?.removeEventListener('toggle', this._handleMenuToggle);
	}

	/**
	 * Wires the slotted `nldd-menu` / `nldd-popover` to the chevron: anchors it
	 * to the popup button and tracks its open state. Re-runs whenever the slotted
	 * content changes (overlay added, removed or replaced).
	 */
	_handleSlotChange(event: Event): void {
		const slot = event.target as HTMLSlotElement;
		const overlay =
			(slot.assignedElements().find((el) => el.matches('nldd-menu, nldd-popover')) as Overlay | undefined) ?? null;
		if (overlay === this._overlay) return;
		this._overlay?.removeEventListener('toggle', this._handleMenuToggle);
		// Release the previous overlay: left anchored, a removed overlay keeps
		// positioning against this button's chevron, and the pair can never be
		// collected.
		if (this._overlay) this._overlay.anchorElement = null;
		this._overlay = overlay;
		this._menuIsOpen = false;
		if (overlay) {
			if (this._popupButtonWrapper) overlay.anchorElement = this._popupButtonWrapper;
			overlay.addEventListener('toggle', this._handleMenuToggle);
		}
	}

	private _handleMenuToggle = (event: Event): void => {
		this._menuIsOpen = (event as ToggleEvent).newState === 'open';
	};

	_handleActionClick(e: MouseEvent): void {
		if (this.disabled) return;
		e.stopPropagation();
		this.dispatchEvent(new CustomEvent('action-click', { bubbles: true, composed: true }));
	}

	_handleMenuClick(e: MouseEvent): void {
		if (this.disabled) return;
		e.stopPropagation();
		if (this._overlay) {
			// Only a pointer-driven click (detail > 0) has a preceding pointerdown;
			// a keyboard click must ignore the snapshot, which would otherwise be
			// left over from an earlier gesture that ended without a click (drag
			// off the button, touch scroll) and swallow the activation.
			const wasOpen = e.detail > 0 && this._overlayWasOpenOnPointerdown;
			this._overlayWasOpenOnPointerdown = false;
			if (wasOpen) return; // light-dismiss already closed it
			if (!this._overlay.matches(':popover-open')) this._overlay.showPopover();
			return;
		}
		this.dispatchEvent(new CustomEvent('menu-click', { bubbles: true, composed: true }));
	}

	// willUpdate (not updated) so the host width is resolved before the first
	// render rather than one frame after it — otherwise an explicit width
	// briefly flashes at the auto default.
	override willUpdate(changedProperties: Map<string, unknown>): void {
		if (changedProperties.has('width')) {
			// 'full' switches the host to block + 100% via CSS; a valid CSS length
			// is applied inline. Either way --_width drives the inner layout so the
			// split-button stretches and the main button fills the free space.
			const w = this.width;
			const isFull = w === 'full';
			const isValidLength = !!w && !isFull && CSS.supports('width', w);
			this.style.width = isValidLength ? w : '';
			if (isFull || isValidLength) {
				this.style.setProperty('--_width', '100%');
			} else {
				this.style.removeProperty('--_width');
			}
		}
	}

	override render() {
		return template.call(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-split-button': NLDDSplitButton;
	}
}
