/**
 * Nederlandse Digitale Dienst Split Button Component (Lit + TypeScript)
 *
 * A split button combines a primary action button with a dropdown trigger.
 * The main button performs the default action, while the icon button opens a menu.
 *
 * @element nldd-split-button
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
import { styles } from './split-button.styles.ts';
import { template } from './split-button.template.ts';
import { nlddSplitButtonTranslations } from './split-button.i18n.ts';
import type { NLDDSplitButtonTranslations } from './split-button.i18n.ts';
import './../button/button.ts';
import './../icon-button/icon-button.ts';

export type Size = 'xs' | 'sm' | 'md';

@customElement('nldd-split-button')
export class NLDDSplitButton extends LitElement {
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
	translations: Partial<NLDDSplitButtonTranslations> = {};

	// — i18n —————————————————————————————————————————————————————————————————

	public _t(key: keyof NLDDSplitButtonTranslations): string {
		return this.translations[key] ?? nlddSplitButtonTranslations[key];
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
		'nldd-split-button': NLDDSplitButton;
	}
}
