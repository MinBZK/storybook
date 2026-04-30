/**
 * Nederlandse Digitale Dienst Button Component (Lit + TypeScript)
 *
 * @element nldd-button
 * @attr {string} variant - Button variant: 'primary' | 'secondary' | 'destructive' | 'accent-filled' | 'accent-outlined' | 'accent-transparent' | 'neutral-tinted' | 'neutral-transparent' | 'critical-tinted'
 * @attr {string} size - Button size: 'xs' | 'sm' | 'md' (default: 'md')
 * @attr {boolean} disabled - Disabled state
 * @attr {string} type - Button type for form submission: 'button' | 'submit' | 'reset' (ignored when href is set)
 * @attr {boolean} expandable - Whether the button has a icon to indicate it opens a menu or popover
 * @attr {boolean} full-width - Whether the button stretches to fill its container width
 * @attr {string} text - Button text
 * @attr {string} start-icon - Icon name for the start icon (before text)
 * @attr {string} end-icon - Icon name for the end icon (after text)
 * @attr {string} accessible-label - Accessible label for the button, overrides text for screen readers
 * @attr {string} href - When set, renders an <a> element instead of <button>
 * @attr {string} target - Link target (e.g. '_blank'); only used when href is set
 * @attr {string} rel - Link rel attribute; defaults to 'noopener noreferrer' when target is '_blank'
 *
 * @slot start-icon - Slot for a custom start icon (e.g. custom SVG). Only used when start-icon attribute is not set.
 * @slot end-icon - Slot for a custom end icon (e.g. custom SVG). Only used when end-icon attribute is not set.
 *
 * @fires click - When button is clicked (not fired when disabled)
 */

import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { buttonStyles } from './button.styles.js';
import { template } from './button.template.js';
import './../../content/icon/icon.js';

type Variant =
	| 'primary'
	| 'secondary'
	| 'destructive'
	| 'accent-filled'
	| 'accent-outlined'
	| 'accent-transparent'
	| 'neutral-tinted'
	| 'neutral-transparent'
	| 'critical-tinted';
type Size = 'xs' | 'sm' | 'md';
type ButtonType = 'button' | 'submit' | 'reset';

@customElement('nldd-button')
export class NLDDButton extends LitElement {
	static override styles = buttonStyles;

	@property({ type: String, reflect: true })
	variant: Variant = 'neutral-tinted';

	@property({ type: String, reflect: true })
	size: Size = 'md';

	@property({ type: Boolean, reflect: true, attribute: 'full-width' })
	fullWidth = false;

	@property({ type: Boolean, reflect: true, attribute: 'expandable' })
	expandable = false;

	@property({ type: String, reflect: true })
	type: ButtonType = 'button';

	@property({ type: String })
	popovertarget: string | undefined = undefined;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	/** Button text. */
	@property({ type: String })
	text = '';

	/** Icon name for the start icon (before text). When not set, the start-icon slot is used. */
	@property({ type: String, attribute: 'start-icon' })
	startIcon = '';

	/** Icon name for the end icon (after text). When not set, the end-icon slot is used. */
	@property({ type: String, attribute: 'end-icon' })
	endIcon = '';

	/** Accessible label forwarded to the inner <button> or <a>. Use when visible text alone lacks context. */
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

	private _warnedA11y = false;

	override updated(): void {
		const isEmpty = !this.text && !this.accessibleLabel;
		if (import.meta.env?.DEV && isEmpty && !this._warnedA11y) {
			this._warnedA11y = true;
			console.warn('<nldd-button>: button has no text or accessible-label. This produces an inaccessible button (WCAG SC 4.1.2).');
		} else if (!isEmpty) {
			this._warnedA11y = false;
		}
	}

	private _handleClick(e: MouseEvent): void {
		if (this.disabled) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}
	}

	/** Resolves the effective rel value for link rendering. */
	_resolvedRel(): string {
		if (this.rel) return this.rel;
		if (this.target === '_blank') return 'noopener noreferrer';
		return '';
	}

	override render() {
		return template.call(this, {
			handleClick: this._handleClick.bind(this),
		});
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-button': NLDDButton;
	}
}
