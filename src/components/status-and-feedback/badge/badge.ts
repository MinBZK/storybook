/**
 * Nederlandse Digitale Dienst Badge Component (Lit + TypeScript)
 *
 * Toont de toestand van iets, of hoeveel er van iets is: een status, een aantal
 * ongelezen berichten, een stip die zegt dat er iets nieuws is. Wat er staat
 * bepaalt het systeem, en het verandert zonder dat iemand het aanraakt. Een badge
 * is nooit interactief.
 *
 * Hij toont tekst, een getal en/of een icoon; zonder inhoud verschijnt een stip.
 * Zet hem in een hoek van een ander element (bijvoorbeeld een icoon) of los.
 *
 * Voor een kenmerk dat iemand ergens aan toekent, zoals een categorie, een rol of
 * een keurmerk, gebruik je `nldd-tag`. Voor zelfstandige data waar de gebruiker
 * mee werkt, zoals een gekozen persoon of een actief filter, `nldd-token`.
 *
 * @element nldd-badge
 * @attr {string} size - Grootte: 'sm' | 'md' (default: 'md')
 * @attr {string} color - Semantisch ('critical' | 'accent' | 'neutral' | 'warning' | 'success') of een Rijkskleur ('lintblauw' | 'hemelblauw' | 'oranje' | …). Default: 'critical'
 * @attr {boolean} pulse - Laat een ring uit de badge groeien en vervagen, voor iets dat nu gebeurt (een live-verbinding, een storing). Respecteert `prefers-reduced-motion`.
 * @attr {string} text - Tekst (heeft voorrang op number)
 * @attr {number} number - Numerieke waarde. Wordt beknopt als meer dan max
 * @attr {number} max - Maximum waarde boven welke number wordt getoond als "{max}+" (default: 99)
 * @attr {string} icon - Icoon naam. Icon-only wordt als vierkant gerenderd; met text/number komt het icoon links.
 * @attr {string} accessible-label - Toegankelijk label voor screenreaders. Fallback naar text/number; anders naar i18n default ("Notificatie").
 * @attr {boolean} decorative - Verbergt de badge voor hulpsoftware (gebruik wanneer de tekst ernaast hetzelfde zegt, zoals een stip voor een statuswoord)
 */

import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { reflectNonDefault } from '../../../utilities/reflect-non-default.js';
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

	@property({ reflect: true, converter: reflectNonDefault<Size>('md') })
	size: Size = 'md';

	@property({ reflect: true, converter: reflectNonDefault<Color>('critical') })
	color: Color = 'critical';

	@property({ type: Boolean, reflect: true })
	pulse = false;

	@property({ reflect: true, converter: reflectNonDefault<string>('') })
	text = '';

	@property({ type: Number, reflect: true })
	number: number | undefined = undefined;

	@property({ reflect: true, converter: reflectNonDefault<number>(99) })
	max = 99;

	@property({ type: String })
	icon = '';

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	@property({ type: Boolean, reflect: true })
	decorative = false;

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
		return this._t('components.badge.notification-label');
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
