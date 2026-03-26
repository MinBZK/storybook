/**
 * RegelRecht Icon Button Component (Lit + TypeScript)
 *
 * @element rr-icon-button
 * @attr {string}  variant           - Button variant: 'accent-filled' | 'accent-outlined' | 'accent-transparent' | 'neutral-tinted' | 'neutral-transparent' | 'danger-tinted' | 'primary' | 'secondary' | 'destructive'
 * @attr {string}  size              - Button size: 'xs' | 'sm' | 'md' | 'lg' (default: 'md')
 * @attr {boolean} disabled          - Disabled state
 * @attr {string}  type              - Button type for form submission: 'button' | 'submit' | 'reset' (ignored when href is set)
 * @attr {boolean} is-expandable     - Whether the button opens a menu or popover and shows chevron next to the icon
 * @attr {string}  accessible-label  - Accessible label for screen readers. Overrides the slot text as aria-label
 *                                     and title tooltip. Use when the visible text alone lacks context for screen
 *                                     readers (e.g. text "Toon", accessible-label "Toon wachtwoord").
 *                                     The slot text is still shown visually in lg size regardless.
 * @attr {string}  href              - When set, renders an <a> element instead of <button>
 * @attr {string}  target            - Link target (e.g. '_blank'); only used when href is set
 * @attr {string}  rel               - Link rel attribute; defaults to 'noopener noreferrer' when target is '_blank'
 *
 * @slot - Place an rr-icon and a text label. The text is used as aria-label and shown below the icon in lg size.
 *
 * @example
 * ```html
 * <rr-icon-button>
 *   <rr-icon name="download"></rr-icon>
 *   Download
 * </rr-icon-button>
 * ```
 *
 * @fires click - When button is clicked (not fired when disabled)
 */
import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
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

	@property({ type: Boolean, reflect: true, attribute: 'is-expandable' })
	isExpandable = false;

	@property({ type: String, reflect: true, attribute: 'popovertarget' })
	popovertarget = '';

	/** Accessible label for screen readers. Overrides slot text as aria-label and title tooltip.
	 *  The slot text is still shown visually in lg size regardless. */
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

	@state()
	_text = '';

	private _observer: MutationObserver | null = null;

	override connectedCallback(): void {
		super.connectedCallback();
		this._observer = new MutationObserver(() => this._detectSlots());
		this._observer.observe(this, { childList: true, characterData: true, subtree: true });
		this._detectSlots();
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this._observer?.disconnect();
		this._observer = null;
	}

	private _detectSlots(): void {
		const icon = Array.from(this.children)
			.find(el => el.tagName.toLowerCase() === 'rr-icon');
		if (icon) {
			icon.setAttribute('slot', '__icon');
		}
		this._text = Array.from(this.childNodes)
			.filter(n => n.nodeType === Node.TEXT_NODE)
			.map(n => n.textContent?.trim())
			.filter(Boolean)
			.join(' ');
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
