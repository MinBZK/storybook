/**
 * Nederlandse Digitale Dienst Badge Component (Lit + TypeScript)
 *
 * Een notificatie-indicator, vaak voor ongelezen aantallen of statusdots. Kan tekst,
 * een getal en/of een icoon tonen. Zonder inhoud verschijnt automatisch een stip.
 * Gebruik in een hoek van een ander element (bijv. een icon) of standalone.
 *
 * @element nldd-badge
 * @attr {string} color - Semantisch ('critical' | 'accent' | 'neutral' | 'warning' | 'success') of een Rijkskleur ('lintblauw' | 'hemelblauw' | 'oranje' | …). Default: 'critical'
 * @attr {string} size - Grootte: 'sm' | 'md' (default: 'md')
 * @attr {string} text - Tekst (heeft voorrang op number)
 * @attr {number} number - Numerieke waarde. Wordt beknopt als meer dan max
 * @attr {number} max - Maximum waarde boven welke number wordt getoond als "{max}+" (default: 99)
 * @attr {string} icon - Icoon naam. Icon-only wordt als vierkant gerenderd; met text/number komt het icoon links.
 * @attr {string} accessible-label - Toegankelijk label voor screenreaders. Fallback naar text/number; anders naar i18n default ("Notificatie").
 */

import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { badgeStyles } from './badge.styles.js';
import { template } from './badge.template.js';
import { withTranslations } from '../../../utilities/with-translations.js';
import { nlddBadgeTranslations } from './badge.i18n.js';
import './../../content/icon/icon.js';

type Color =
| 'critical' | 'accent' | 'neutral' | 'warning' | 'success'
	| 'lintblauw' | 'donkerblauw' | 'hemelblauw' | 'lichtblauw'
	| 'paars' | 'violet'
	| 'robijnrood' | 'roze' | 'rood' | 'oranje'
	| 'donkergeel' | 'geel'
	| 'donkerbruin' | 'bruin'
	| 'donkergroen' | 'groen' | 'mosgroen' | 'mintgroen';
type Size = 'sm' | 'md';

@customElement('nldd-badge')
export class NLDDBadge extends withTranslations(LitElement, nlddBadgeTranslations) {
	static override styles = badgeStyles;

	@property({ type: String, reflect: true })
	color: Color = 'critical';

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

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

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

	get _ariaLabel(): string {
		if (this.accessibleLabel) return this.accessibleLabel;
		if (this._hasText) return this._displayValue;
		return this._t('components.badge.notification-text');
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
