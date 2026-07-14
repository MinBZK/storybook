/**
 * NLDD Design System Avatar Component (Lit + TypeScript)
 *
 * Toont één persoon of organisatie als een compacte, ronde (persoon) of
 * afgeronde (organisatie) representatie. De inhoud volgt een vaste
 * terugvalketen: een afbeelding wanneer `src` laadt, anders de initialen
 * (uit `initials` of afgeleid uit `name`), en anders een terugval-icoon.
 *
 * `type` bepaalt zowel de vorm als het terugval-icoon: `person` geeft een
 * cirkel met een person-icoon, `organization` een afgeronde vierkant met een
 * building-icoon. De vorm hoort dus bij de betekenis en is niet los
 * instelbaar. Overschrijf het terugval-icoon desgewenst met `icon`.
 *
 * Zonder `size` schaalt de avatar mee met zijn container (net als `nldd-icon`);
 * een vaste maat (dezelfde spacer-uitgelijnde schaal, 16 tot en met 96) is de
 * uitzondering. De initialen en het icoon schalen mee.
 *
 * Toegankelijkheid: het host-element draagt de betekenis. Met een `name`
 * (en zonder `decorative`) krijgt het `role="img"` met de naam als label.
 * Staat de naam al als tekst ernaast (bijvoorbeeld in een byline), zet dan
 * `decorative` zodat de avatar voor hulpsoftware verborgen blijft. Een dode
 * `src` valt automatisch terug op de initialen of het icoon, nooit op een
 * gebroken-afbeelding-icoon.
 *
 * @element nldd-avatar
 *
 * @attr {string} src         - Afbeeldingsbron; valt bij een laadfout terug op initialen/icoon
 * @attr {string} srcset      - Responsive source set voor de afbeelding (het component zet zelf `sizes`)
 * @attr {string} name        - Naam van de persoon/organisatie; levert de afgeleide initialen en het toegankelijke label
 * @attr {string} initials    - Expliciete initialen, max 3 tekens (overschrijft de afleiding uit `name`; ook voor organisatie-acroniemen)
 * @attr {string} type        - `person` (cirkel, person-icoon) of `organization` (afgerond, building-icoon); standaard `person`
 * @attr {string} icon        - Overschrijft het type-afhankelijke terugval-icoon
 * @attr {string} size        - Vaste maat in px (spacer-uitgelijnd: 16, 20, 24, 28, 32, 40, 44, 48, 56, 64, 80, 96). Leeg = schaal mee met de container (net als nldd-icon); de initialen en het icoon schalen mee
 * @attr {string} color         - `default` (neutrale vulling) of `inherit` (vulling in de content-kleur: de `--context-content-color`-channel, of `currentColor` als die niet gezet is; tekst in de contrastkleur, zodat de avatar een icoon in bijvoorbeeld een knop kan vervangen); standaard `default`
 * @attr {boolean} icon-aligned - Krimpt de zichtbare schijf naar 5/6 van de host, gecentreerd, zodat de avatar optisch uitlijnt met een icoon op hetzelfde grid (een icoon-glyph heeft ingebouwde marge)
 * @attr {boolean} decorative   - Verbergt de avatar voor hulpsoftware (gebruik wanneer de naam er al als tekst naast staat)
 *
 * @example
 * ```html
 * <nldd-avatar name="Bart van de Biezen"></nldd-avatar>
 * <nldd-avatar name="Jan Jansen" src="/avatars/jan.jpg" size="48"></nldd-avatar>
 * <nldd-avatar type="organization" name="Kamer van Koophandel" initials="KvK"></nldd-avatar>
 * <nldd-avatar name="Bart van de Biezen" color="inherit"></nldd-avatar>
 * ```
 */
import { LitElement, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { reflectNonDefault } from '../../../utilities/reflect-non-default.js';
import { avatarStyles } from './avatar.styles.js';
import { avatarTemplate } from './avatar.template.js';
import '../icon/icon.js';

export type AvatarType = 'person' | 'organization';

export type AvatarColor = 'default' | 'inherit';

/** Empty = scale to the container (like nldd-icon); the rest pin a fixed px size. */
export type AvatarSize =
	'' | '16' | '20' | '24' | '28' | '32' | '40' | '44' | '48' | '56' | '64' | '80' | '96';

@customElement('nldd-avatar')
export class NLDDAvatar extends LitElement {
	static override styles = avatarStyles;

	@property({ type: String })
	src = '';

	@property({ type: String })
	srcset = '';

	@property({ type: String })
	name = '';

	@property({ type: String })
	initials = '';

	@property({ type: String })
	icon = '';

	@property({ reflect: true, converter: reflectNonDefault<AvatarType>('person') })
	type: AvatarType = 'person';

	@property({ reflect: true, converter: reflectNonDefault<AvatarColor>('default') })
	color: AvatarColor = 'default';

	@property({ reflect: true, converter: reflectNonDefault<AvatarSize>('') })
	size: AvatarSize = '';

	@property({ type: Boolean, reflect: true, attribute: 'icon-aligned' })
	iconAligned = false;

	@property({ type: Boolean, reflect: true })
	decorative = false;

	/** Set when the image errors, so the template falls through to the next
	 *  content step. Not private: the template module reads it. */
	@state()
	_imageFailed = false;

	/** Initials shown when there is no image: an explicit `initials` wins,
	 *  otherwise the first letter of the first and last word of `name`. */
	get resolvedInitials(): string {
		if (this.initials) return this.initials.slice(0, 3);
		const words = this.name.trim().split(/\s+/).filter(Boolean);
		if (words.length === 0) return '';
		const first = words[0].charAt(0);
		const last = words.length > 1 ? words[words.length - 1].charAt(0) : '';
		return (first + last).toUpperCase();
	}

	/** Fallback icon when there is neither image nor initials. */
	get resolvedIcon(): string {
		if (this.icon) return this.icon;
		return this.type === 'organization' ? 'building' : 'person';
	}

	_onImageError = (): void => {
		this._imageFailed = true;
	};

	override willUpdate(changed: PropertyValues<this>): void {
		if (changed.has('src')) this._imageFailed = false;
	}

	override updated(): void {
		const labelled = !this.decorative && this.name !== '';
		if (labelled) {
			this.setAttribute('role', 'img');
			this.setAttribute('aria-label', this.name);
			this.removeAttribute('aria-hidden');
		}
		else {
			this.setAttribute('aria-hidden', 'true');
			this.removeAttribute('role');
			this.removeAttribute('aria-label');
		}
	}

	override render() {
		return avatarTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-avatar': NLDDAvatar;
	}
}
