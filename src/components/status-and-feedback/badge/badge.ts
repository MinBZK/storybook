/**
 * Nederlandse Digitale Dienst Badge Component (Lit + TypeScript)
 *
 * Een notificatie-indicator, vaak voor ongelezen aantallen of statusdots. Kan tekst,
 * een getal en/of een icoon tonen. Zonder inhoud verschijnt automatisch een stip.
 * Gebruik in een hoek van een ander element (bijv. een icon) of standalone.
 *
 * @element nldd-badge
 * @attr {string} variant - 'rood' | 'accent' | 'neutral' | 'warning' | 'success' (default: 'rood')
 * @attr {string} size - Grootte: 'sm' | 'md' (default: 'md')
 * @attr {string} text - Tekst (heeft voorrang op number)
 * @attr {number} number - Numerieke waarde. Wordt beknopt als meer dan max
 * @attr {number} max - Maximum waarde boven welke number wordt getoond als "{max}+" (default: 99)
 * @attr {string} icon - Icoon naam. Icon-only wordt als vierkant gerenderd; met text/number komt het icoon links.
 */

import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { badgeStyles } from './badge.styles.js';
import { template } from './badge.template.js';
import './../../content/icon/icon.js';

type Variant = 'rood' | 'accent' | 'neutral' | 'warning' | 'success';
type Size = 'sm' | 'md';

@customElement('nldd-badge')
export class NLDDBadge extends LitElement {
	static override styles = badgeStyles;

	@property({ type: String, reflect: true })
	variant: Variant = 'rood';

	@property({ type: String, reflect: true })
	size: Size = 'md';

	@property({ type: String })
	text = '';

	@property({ type: Number, reflect: true })
	number: number | undefined = undefined;

	@property({ type: Number, reflect: true })
	max = 99;

	@property({ type: String })
	icon = '';

	get _hasText(): boolean {
		return !!this.text || typeof this.number === 'number';
	}

	get _isDot(): boolean {
		return !this._hasText && !this.icon;
	}

	get _isIconOnly(): boolean {
		return !!this.icon && !this._hasText;
	}

	get _displayValue(): string {
		if (this.text) return this.text;
		if (typeof this.number === 'number') {
			return this.number > this.max ? `${this.max}+` : String(this.number);
		}
		return '';
	}

	override render() {
		return template(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-badge': NLDDBadge;
	}
}
