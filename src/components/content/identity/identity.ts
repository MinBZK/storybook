/**
 * NLDD Design System Identity Component (Lit + TypeScript)
 *
 * Een redactionele regel die auteurs of redacteuren toont: optionele
 * avatar(s), een naamregel en ondersteunende tekst (bijvoorbeeld functie
 * of datum). Alle onderdelen zijn optioneel.
 *
 * De naamregel en ondersteunende tekst kunnen als attribuut of als slot
 * worden aangeleverd. Gebruik de slots voor rijkere inhoud, zoals een
 * `<time datetime="…">` voor machine-leesbare datums of een link naar het
 * auteursprofiel. Geslotte inhoud vervangt het bijbehorende attribuut
 * (het attribuut is de fallback van de slot).
 *
 * Avatars slot je in een `nldd-avatar-group`, ook als het er één is: die
 * groep geeft ze hun maat, laat ze overlappen en tekent de ring in de
 * vlakkleur. Identity maakt die groep niet zelf, want de avatars zijn light
 * DOM van de consument en een groep kan alleen opmaken wat als eigen kind
 * bij hem binnenkomt. Zet de avatars op decoratief (of een `img` op
 * `alt=""`) wanneer de namen al in de tekst staan.
 *
 * Op smalle breedtes (een sm-container, ≤ 640px) met meerdere avatars komt
 * de avatarrij boven de namen te staan, zodat de tekst de volle breedte
 * houdt; met één avatar blijft de identity op één regel.
 *
 * Voor één avatar kun je in plaats van slotten ook `avatar-src` (met
 * optioneel `avatar-srcset`) als attribuut meegeven; de afmetingen liggen
 * vast (40px). Geslotte avatars hebben voorrang op `avatar-src`.
 *
 * @element nldd-identity
 *
 * @attr {string} text - Naamregel (bijv. "Jan Jansen en Piet Pietersen"); fallback wanneer de text-slot leeg is
 * @attr {string} supporting-text - Ondersteunende tekst onder de naamregel (bijv. rol of datum); fallback wanneer de supporting-text-slot leeg is
 * @attr {string} avatar-src - Bron van één avatar (alternatief voor de avatars-slot); genegeerd zodra de avatars-slot gevuld is
 * @attr {string} avatar-srcset - Responsive source set voor de avatar-src-afbeelding
 * @attr {string} avatar-alt - Alt-tekst voor de avatar-src-afbeelding; leeg = decoratief
 *
 * @slot avatars - Een `nldd-avatar-group` met één of meer avatars
 * @slot text - Naamregel als rijke inhoud (bijv. een link naar het auteursprofiel)
 * @slot supporting-text - Ondersteunende tekst als rijke inhoud (bijv. een time-element)
 */
import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { reflectNonDefault } from '../../../utilities/reflect-non-default.js';
import { identityStyles } from './identity.styles.js';
import { identityTemplate } from './identity.template.js';
import '../avatar/avatar.js';
import '../avatar-group/avatar-group.js';

@customElement('nldd-identity')
export class NLDDIdentity extends LitElement {
	static override styles = identityStyles;

	@property({ reflect: true, converter: reflectNonDefault<string>('') })
	text = '';

	@property({ reflect: true, attribute: 'supporting-text', converter: reflectNonDefault<string>('') })
	supportingText = '';

	@property({ type: String, attribute: 'avatar-src' })
	avatarSrc = '';

	@property({ type: String, attribute: 'avatar-srcset' })
	avatarSrcset = '';

	@property({ type: String, attribute: 'avatar-alt' })
	avatarAlt = '';

	@state()
	_hasSlottedAvatars = false;

	/** Number of slotted avatars. Drives the responsive layout: with two or
	 *  more avatars, a small-container identity stacks the avatars above the
	 *  names (see the `data-multiple-avatars` hook in the template/styles).
	 *  A slotted group counts as the avatars it holds, not as one element. */
	@state()
	_avatarCount = 0;

	@state()
	_hasSlottedText = false;

	@state()
	_hasSlottedSupportingText = false;

	/** Tracks slot content so the text / supporting-text attribute fallbacks
	 *  only render when their slot is empty. Bound per slot in the template via
	 *  @slotchange, so Lit owns the listener lifecycle (it survives a
	 *  move-and-reinsert) — no manual connect/disconnect bookkeeping. slotchange
	 *  also fires for the initial assignment, so the first render is covered. */
	_onSlotChange = (e: Event): void => {
		const slot = e.target as HTMLSlotElement;
		const count = slot.assignedElements().length;
		if (slot.name === 'avatars') {
			this._avatarCount = slot.assignedElements()
				.reduce((total, el) => total + (el.localName === 'nldd-avatar-group' ? el.children.length : 1), 0);
			this._hasSlottedAvatars = count > 0;
		}
		else if (slot.name === 'text') this._hasSlottedText = count > 0;
		else if (slot.name === 'supporting-text') this._hasSlottedSupportingText = count > 0;
	};

	override render() {
		return identityTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-identity': NLDDIdentity;
	}
}
