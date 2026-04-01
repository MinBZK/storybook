/**
 * Nederlandse Digitale Dienst Split Button Component (Lit + TypeScript)
 *
 * A split button combines a primary action button with a dropdown trigger.
 * The main button performs the default action, while the icon button opens a menu.
 *
 * @element ndd-split-button
 * @attr {string} size - Button size: 'xs' | 'sm' | 'md' (default: 'md')
 * @attr {string} variant - Button variant (default: 'neutral-tinted')
 * @attr {boolean} disabled - Disabled state
 * @attr {string} text - Button text for the primary action
 * @attr {string} start-icon - Icon name for the start icon (before text)
 * @attr {object} translations - Translations; unset keys fall back to Dutch
 *
 * @fires action-click - Fired when the main button is clicked
 * @fires menu-click - Fired when the dropdown trigger is clicked
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './ndd-split-button.styles.ts';
import { template } from './ndd-split-button.template.ts';
import { nddSplitButtonTranslations } from './ndd-split-button.i18n.ts';
import type { NDDSplitButtonTranslations } from './ndd-split-button.i18n.ts';
import './../button/ndd-button.ts';
import './../icon-button/ndd-icon-button.ts';

export type Size = 'xs' | 'sm' | 'md';

@customElement('ndd-split-button')
export class NDDSplitButton extends LitElement {
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

	@property({ type: Object })
	translations: Partial<NDDSplitButtonTranslations> = {};

	// — i18n —————————————————————————————————————————————————————————————————

	public _t(key: keyof NDDSplitButtonTranslations): string {
		return this.translations[key] ?? nddSplitButtonTranslations[key];
	}

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
		'ndd-split-button': NDDSplitButton;
	}
}
