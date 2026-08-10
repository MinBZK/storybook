/**
 * Nederlandse Digitale Dienst Badge Component (Lit + TypeScript)
 *
 * Shows the state of something, or how much of it there is: a status, a number
 * of unread messages, a dot saying something is new. What it says is decided by
 * the system, and it changes without anyone touching it. A badge is never
 * interactive.
 *
 * It shows text, a number and/or an icon; with no content it becomes a dot. Put
 * it in a corner of another element (an icon, for instance) or on its own.
 *
 * For a property someone assigns to something, such as a category, a role or a
 * certification, use `nldd-tag`. For standalone data the user works with, such
 * as a chosen person or an active filter, use `nldd-token`.
 *
 * @element nldd-badge
 * @attr {string} size - Size: 'sm' | 'md' (default: 'md')
 * @attr {string} color - Semantic ('critical' | 'accent' | 'neutral' | 'warning' | 'success') or a Rijkshuisstijl color ('lintblauw' | 'hemelblauw' | 'oranje' | …). Default: 'critical'
 * @attr {boolean} pulse - Grows a ring out of the badge and fades it, for something happening right now (a live connection, an outage). Respects `prefers-reduced-motion`.
 * @attr {string} text - Text (takes precedence over number)
 * @attr {number} number - Numeric value. Shortened when it is over max
 * @attr {number} max - Value above which number is shown as "{max}+" (default: 99)
 * @attr {string} icon - Icon name. Icon-only renders as a square; with text or number the icon goes on the left.
 * @attr {string} accessible-label - Accessible label for screen readers. Falls back to text/number; otherwise to the i18n default ("Notificatie").
 * @attr {boolean} decorative - Hides the badge from assistive software (use when the text beside it says the same, such as a dot next to a status word)
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
