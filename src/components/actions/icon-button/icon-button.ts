/**
 * Nederlandse Digitale Dienst Icon Button Component (Lit + TypeScript)
 *
 * @element nldd-icon-button
 * @attr {string}  variant           - Button variant: 'accent-filled' | 'accent-transparent' | 'neutral-tinted' | 'neutral-transparent' | 'critical-tinted' | 'critical-transparent' | 'primary' | 'secondary' | 'destructive'
 * @attr {string}  size              - Button size: 'xs' | 'sm' | 'md' | 'lg' (default: 'md')
 * @attr {boolean} disabled          - Disabled state
 * @attr {string}  type              - Button type for form submission: 'button' | 'submit' | 'reset' (ignored when href is set)
 * @attr {boolean} expandable        - Whether the button opens a menu or popover and shows chevron next to the icon
 * @attr {boolean} expanded          - Whether the popover/menu controlled by this button is currently open. Forwarded as aria-expanded on the inner button; toggles the is-expanded visual state.
 * @attr {string}  popup-type        - Type of popup container this button opens: 'menu' | 'listbox' | 'dialog' | 'tree' | 'grid'. Sets aria-haspopup on the inner button and forces aria-expanded to always be present (true/false) so screen readers know the popup state.
 * @attr {string}  width             - Width mode: 'full' (stretches to container) or any CSS length (e.g. '240px')
 * @attr {string}  text              - Button text, used as aria-label and shown below the icon in lg size
 * @attr {string}  icon              - Icon name for the nldd-icon element
 * @attr {string}  accessible-label  - Accessible label for screen readers. Overrides text as aria-label
 *                                     and title tooltip. Use when the visible text alone lacks context for screen
 *                                     readers (e.g. text "Toon", accessible-label "Toon wachtwoord").
 *                                     The text is still shown visually in lg size regardless.
 * @attr {string}  tooltip-timing    - Forwarded to the inner nldd-tooltip's `timing`:
 *                                     'default' (700 ms show-delay), 'instant', or 'never'
 *                                     (suppress the visual tooltip; screen readers still get the
 *                                     aria-label). Use 'never' when the surrounding context
 *                                     already explains the button (e.g. spin buttons in
 *                                     nldd-number-field, the chevron in nldd-split-button).
 * @attr {string}  href              - When set, renders an <a> element instead of <button>
 * @attr {string}  target            - Link target (e.g. '_blank'); only used when href is set
 * @attr {string}  rel               - Link rel attribute; defaults to 'noopener noreferrer' when target is '_blank'
 * @attr {string}  popovertarget     - ID of a popover element to toggle; forwarded to the inner <button>
 *
 * @slot icon - Slot for a custom icon (e.g. custom SVG). Only used when icon attribute is not set.
 *
 * @example
 * ```html
 * <nldd-icon-button text="Download" icon="download"></nldd-icon-button>
 * ```
 *
 * @fires click - When button is clicked (not fired when disabled)
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { iconButtonStyles } from './icon-button.styles.js';
import { template } from './icon-button.template.js';
import './../../content/icon/icon.js';

export type Size = 'xs' | 'sm' | 'md' | 'lg';
export type Variant =
	| 'primary'
	| 'secondary'
	| 'destructive'
	| 'accent-filled'
	| 'accent-transparent'
	| 'neutral-tinted'
	| 'neutral-transparent'
	| 'critical-tinted'
	| 'critical-transparent';
export type ButtonType = 'button' | 'submit' | 'reset';
export type PopupType = 'menu' | 'listbox' | 'dialog' | 'tree' | 'grid';

@customElement('nldd-icon-button')
export class NLDDIconButton extends LitElement {
	static override styles = iconButtonStyles;

	@property({ type: String, reflect: true })
	variant: Variant = 'neutral-tinted';

	@property({ type: String, reflect: true })
	size: Size = 'md';

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: String, reflect: true })
	type: ButtonType = 'button';

	@property({ type: Boolean, reflect: true, attribute: 'expandable' })
	expandable = false;

	@property({ type: Boolean, reflect: true })
	expanded = false;

	/**
	 * Type of popup container this button opens. Sets `aria-haspopup` on the
	 * inner button and forces `aria-expanded` to always be present (true/false)
	 * so screen readers can announce both the popup type and its current state.
	 */
	@property({ type: String, reflect: true, attribute: 'popup-type' })
	popupType?: PopupType;

	/** Width mode: 'full' (stretch to container) or any CSS length. */
	@property({ type: String, reflect: true })
	width = '';

	@property({ type: String })
	popovertarget: string | undefined = undefined;

	/** Button text, used as aria-label and shown below the icon in lg size. */
	@property({ type: String })
	text = '';

	/** Icon name for the nldd-icon element. When not set, the icon slot is used. */
	@property({ type: String })
	icon = '';

	/** Accessible label for screen readers. Overrides text as aria-label and title tooltip.
	 *  The text is still shown visually in lg size regardless. */
	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	/** Forwarded to the inner nldd-tooltip's `timing`. Use `'never'` to
	 * suppress the visual tooltip; aria-label still describes the button. */
	@property({ type: String, reflect: true, attribute: 'tooltip-timing' })
	tooltipTiming: 'default' | 'instant' | 'never' = 'default';

	/** When set, renders an <a> element instead of <button>. */
	@property({ type: String, reflect: true })
	href: string | undefined = undefined;

	/** Link target (e.g. '_blank'). Only used when href is set. */
	@property({ type: String })
	target: string | undefined = undefined;

	/**
	 * Link rel attribute. Only used when href is set.
	 * Defaults to 'noopener noreferrer' when target is '_blank' and rel is not explicitly set.
	 */
	@property({ type: String })
	rel: string | undefined = undefined;

	/** Whether an icon is present via attribute or slot. */
	private get _hasIcon(): boolean {
		if (this.icon) return true;
		const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="icon"]');
		return (slot?.assignedElements().length ?? 0) > 0;
	}

	private _warnedA11y = false;

	override updated(changedProperties: Map<string, unknown>): void {
		if (changedProperties.has('width')) {
			const w = this.width;
			// 'full' switches host to block + 100% via CSS attribute selector.
			// A valid CSS length is applied as inline style.width on the host.
			// In either case the inner button stretches via --_width, so
			// a custom width on the host translates to a wide button instead
			// of leaving the size-based square. Invalid values do nothing.
			const isFull = w === 'full';
			const isValidLength = !!w && !isFull && CSS.supports('width', w);
			this.style.width = isValidLength ? w : '';
			if (isFull || isValidLength) {
				this.style.setProperty('--_width', '100%');
			} else {
				this.style.removeProperty('--_width');
			}
		}
		const inaccessible = this._hasIcon && !this.text && !this.accessibleLabel;
		if (import.meta.env?.DEV && inaccessible && !this._warnedA11y) {
			this._warnedA11y = true;
			console.warn('<nldd-icon-button>: icon is set without text or accessible-label. This produces an inaccessible button (WCAG SC 4.1.2). Add a text or accessible-label attribute.');
		} else if (!inaccessible) {
			this._warnedA11y = false;
		}
	}

	/** Resolves the effective rel value for link rendering. */
	_resolvedRel(): string {
		if (this.rel) return this.rel;
		if (this.target === '_blank') return 'noopener noreferrer';
		return '';
	}

	protected _handleClick(e: MouseEvent): void {
		if (this.disabled) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}
	}

	/**
	 * Delegates focus to the inner `<button>` (or `<a>` when `href` is set), so
	 * consumers can call `iconButtonEl.focus()` without reaching into shadow DOM.
	 */
	override focus(options?: FocusOptions): void {
		this.shadowRoot?.querySelector<HTMLElement>('.icon-button')?.focus(options);
	}

	override render() {
		return template.call(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-icon-button': NLDDIconButton;
	}
}
