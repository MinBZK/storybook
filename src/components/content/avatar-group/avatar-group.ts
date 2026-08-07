/**
 * NLDD Design System Avatar Group Component (Lit + TypeScript)
 *
 * Toont meerdere avatars als één groep: ze overlappen elkaar en elke avatar
 * krijgt een ring in de vlakkleur, zodat ze bij overlap gescheiden blijven.
 * De ring gebruikt dezelfde mechaniek als de badge, dus op een gekleurde
 * ondergrond geef je de kleur mee via `--context-parent-background-color`.
 *
 * Avatars slot je als `nldd-avatar` of als `img`. Zet `decorative` (of bij een
 * `img` een lege `alt`) wanneer de namen al als tekst naast de groep staan;
 * geef anders elke avatar een naam, want de groep zelf beschrijft niemand.
 *
 * De maat geldt voor de hele groep: de avatars krijgen hem opgelegd, ook een
 * geslotte `img`. Zo blijft de rij op één lijn, ongeacht wat een consument
 * meegeeft.
 *
 * @element nldd-avatar-group
 *
 * @attr {string} size - Diameter van elke avatar in px (spacer-uitgelijnd: 16, 20, 24, 28, 32, 40, 44, 48, 56, 64, 80, 96); standaard 40
 * @attr {string} overlap - Hoeveel elke avatar over zijn voorganger valt: `sm` (subtiel), `md` (standaard) of `none` (op een rij, met ruimte ertussen)
 * @attr {string} accessible-label - Beschrijft de groep als geheel (bijv. "Redactie"); zonder label is de groep zelf geen landmark en spreken de avatars voor zich
 *
 * @slot - Eén of meer avatars (`nldd-avatar` of `img`)
 */

import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { reflectNonDefault } from '../../../utilities/reflect-non-default.js';
import { avatarGroupStyles } from './avatar-group.styles.js';
import { avatarGroupTemplate } from './avatar-group.template.js';
import '../avatar/avatar.js';

type Overlap = 'none' | 'sm' | 'md';

@customElement('nldd-avatar-group')
export class NLDDAvatarGroup extends LitElement {
	static override styles = avatarGroupStyles;

	@property({ type: String, reflect: true })
	size = '40';

	@property({ reflect: true, converter: reflectNonDefault<Overlap>('md') })
	overlap: Overlap = 'md';

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	override render() {
		return avatarGroupTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-avatar-group': NLDDAvatarGroup;
	}
}
