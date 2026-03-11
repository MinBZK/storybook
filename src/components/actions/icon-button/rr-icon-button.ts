/**
 * RegelRecht Icon Button Component (Lit + TypeScript)
 *
 * @element rr-icon-button
 * @attr {string} variant - Button variant: 'accent-filled' | 'accent-outlined' | 'accent-transparent' | 'neutral-tinted' | 'neutral-transparent' | 'danger-tinted' | 'primary' | 'secondary' | 'destructive'
 * @attr {string} size - Button size: 'xs' | 'sm' | 'md' | 'lg' (default: 'md')
 * @attr {boolean} disabled - Disabled state
 * @attr {string} type - Button type for form submission: 'button' | 'submit' | 'reset'
 * @attr {boolean} is-expandable - Whether the button opens a menu or popover and shows chevron next to the icon.
 *
 * @slot - Place an rr-icon and optionally a text label. Text is used as aria-label and shown below the icon in lg size.
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

	@state()
	_title = '';

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

		this._title = Array.from(this.childNodes)
			.filter(n => n.nodeType === Node.TEXT_NODE)
			.map(n => n.textContent?.trim())
			.filter(Boolean)
			.join(' ');
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
