/**
 * NLDD Design System Byline Component (Lit + TypeScript)
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
 * Bij meerdere redacteuren overlappen de avatars elkaar subtiel; elke
 * avatar krijgt een ring in de surface-kleur (zelfde mechaniek als badge)
 * zodat ze visueel gescheiden blijven. Op een gekleurde ondergrond kan de
 * ringkleur meegegeven worden via `--context-parent-background-color`.
 *
 * Op smalle breedtes (een sm-container, ≤ 640px) met meerdere avatars komt
 * de avatarrij boven de namen te staan, zodat de tekst de volle breedte
 * houdt; met één avatar blijft de byline op één regel.
 *
 * Avatars worden geslot als `<img slot="avatars">`. Zet `alt=""` wanneer
 * de namen al in de tekst staan (decoratief); geef anders een
 * beschrijvende alt-tekst op.
 *
 * Voor één avatar kun je in plaats van slotten ook `avatar-src` (met
 * optioneel `avatar-srcset`) als attribuut meegeven; de afmetingen liggen
 * vast (40px), dus `sizes` zet het component zelf. Meerdere avatars gaan
 * altijd via de slot, en geslotte avatars hebben voorrang op `avatar-src`.
 *
 * @element nldd-byline
 *
 * @attr {string} text - Naamregel (bijv. "Jan Jansen en Piet Pietersen"); fallback wanneer de text-slot leeg is
 * @attr {string} supporting-text - Ondersteunende tekst onder de naamregel (bijv. rol of datum); fallback wanneer de supporting-text-slot leeg is
 * @attr {string} avatar-src - Bron van één avatar (alternatief voor de avatars-slot); genegeerd zodra de avatars-slot gevuld is
 * @attr {string} avatar-srcset - Responsive source set voor de avatar-src-afbeelding
 * @attr {string} avatar-alt - Alt-tekst voor de avatar-src-afbeelding; leeg = decoratief
 *
 * @slot avatars - Eén of meer img-elementen; gestyled als ronde, overlappende avatars
 * @slot text - Naamregel als rijke inhoud (bijv. een link naar het auteursprofiel)
 * @slot supporting-text - Ondersteunende tekst als rijke inhoud (bijv. een time-element)
 */
import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { reflectNonDefault } from '../../../utilities/reflect-non-default.js';
import { bylineStyles } from './byline.styles.js';
import { bylineTemplate } from './byline.template.js';
import '../avatar/avatar.js';

@customElement('nldd-byline')
export class NLDDByline extends LitElement {
	static override styles = bylineStyles;

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
	 *  more avatars, a small-container byline stacks the avatars above the
	 *  names (see the `data-multiple-avatars` hook in the template/styles). */
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
			this._avatarCount = count;
			this._hasSlottedAvatars = count > 0;
		}
		else if (slot.name === 'text') this._hasSlottedText = count > 0;
		else if (slot.name === 'supporting-text') this._hasSlottedSupportingText = count > 0;
	};

	override render() {
		return bylineTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-byline': NLDDByline;
	}
}
