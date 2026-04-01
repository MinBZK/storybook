/**
 * RegelRecht Split Button Component (Lit + TypeScript)
 *
 * A split button combines a primary action button with a dropdown trigger.
 * The main button performs the default action, while the icon button opens a menu.
 *
 * @element rr-split-button
 * @attr {string} size - Button size: 'xs' | 'sm' | 'md' (default: 'md')
 * @attr {string} variant - Button variant (default: 'neutral-tinted')
 * @attr {boolean} disabled - Disabled state
 * @attr {string} text - Button text for the primary action
 * @attr {string} start-icon - Icon name for the start icon (before text)
 *
 * @fires action-click - Fired when the main button is clicked
 * @fires menu-click - Fired when the dropdown trigger is clicked
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './rr-split-button.styles.ts';
import { template } from './rr-split-button.template.ts';
import './../button/rr-button.ts';
import './../icon-button/rr-icon-button.ts';

export type Size = 'xs' | 'sm' | 'md';

@customElement('rr-split-button')
export class RRSplitButton extends LitElement {
	static override styles = styles;

	@property({ type: String, reflect: true })
	size: Size = 'md';

	@property({ type: String, reflect: true })
	variant: string = 'neutral-tinted';

	@property({ type: Boolean, reflect: true })
	disabled = false;

	/** Button text for the primary action. */
	@property({ type: String })
	text = '';

	/** Icon name for the start icon (before text) on the primary action button. */
	@property({ type: String, attribute: 'start-icon' })
	startIcon = '';

	_handleActionClick(e: MouseEvent): void {
		if (this.disabled) return;
		e.stopPropagation();
		this.dispatchEvent(new CustomEvent('action-click', { bubbles: true, composed: true }));
	}

	_handleMenuClick(e: MouseEvent): void {
		if (this.disabled) return;
		e.stopPropagation();
		this.dispatchEvent(new CustomEvent('menu-click', { bubbles: true, composed: true }));
	}

	override render() {
		return template.call(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-split-button': RRSplitButton;
	}
}
