/**
 * RegelRecht Icon Button Component (Lit + TypeScript)
 *
 * @element rr-icon-button
 * @attr {string}  variant           - Button variant: 'accent-filled' | 'accent-outlined' | 'accent-transparent' | 'neutral-tinted' | 'neutral-transparent' | 'danger-tinted' | 'primary' | 'secondary' | 'destructive'
 * @attr {string}  size              - Button size: 'xs' | 'sm' | 'md' | 'lg' (default: 'md')
 * @attr {boolean} disabled          - Disabled state
 * @attr {string}  type              - Button type for form submission: 'button' | 'submit' | 'reset' (ignored when href is set)
 * @attr {boolean} expandable        - Whether the button opens a menu or popover and shows chevron next to the icon
 * @attr {string}  text              - Button text, used as aria-label and shown below the icon in lg size
 * @attr {string}  icon              - Icon name for the rr-icon element
 * @attr {string}  accessible-label  - Accessible label for screen readers. Overrides text as aria-label
 *                                     and title tooltip. Use when the visible text alone lacks context for screen
 *                                     readers (e.g. text "Toon", accessible-label "Toon wachtwoord").
 *                                     The text is still shown visually in lg size regardless.
 * @attr {string}  href              - When set, renders an <a> element instead of <button>
 * @attr {string}  target            - Link target (e.g. '_blank'); only used when href is set
 * @attr {string}  rel               - Link rel attribute; defaults to 'noopener noreferrer' when target is '_blank'
 * @attr {string}  popovertarget     - ID of a popover element to toggle; forwarded to the inner <button>
 *
 * @slot icon - Slot for a custom icon (e.g. custom SVG). Only used when icon attribute is not set.
 *
 * @example
 * ```html
 * <rr-icon-button text="Download" icon="download"></rr-icon-button>
 * ```
 *
 * @fires click - When button is clicked (not fired when disabled)
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './rr-icon-button.styles.ts';
import { template } from './rr-icon-button.template.ts';
import './../../content/icon/rr-icon.ts';

export type Size = 'xs' | 'sm' | 'md' | 'lg';
export type Variant =
	| 'primary'
	| 'secondary'
	| 'destructive'
	| 'accent-filled'
	| 'accent-outlined'
	| 'accent-transparent'
	| 'neutral-tinted'
	| 'neutral-transparent'
	| 'danger-tinted';
export type ButtonType = 'button' | 'submit' | 'reset';

@customElement('rr-icon-button')
export class RRIconButton extends LitElement {
	static override styles = styles;

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

	@property({ type: String })
	popovertarget: string | undefined = undefined;

	/** Button text, used as aria-label and shown below the icon in lg size. */
	@property({ type: String })
	text = '';

	/** Icon name for the rr-icon element. When not set, the icon slot is used. */
	@property({ type: String })
	icon = '';

	/** Accessible label for screen readers. Overrides text as aria-label and title tooltip.
	 *  The text is still shown visually in lg size regardless. */
	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

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

	override updated(): void {
		if (this.icon && !this.text && !this.accessibleLabel) {
			console.warn('<rr-icon-button>: icon is set without text or accessible-label. This produces an inaccessible button (WCAG SC 4.1.2). Add a text or accessible-label attribute.');
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

	override render() {
		return template.call(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-icon-button': RRIconButton;
	}
}
