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
 * Avatars worden geslot als `<img slot="avatars">`. Zet `alt=""` wanneer
 * de namen al in de tekst staan (decoratief); geef anders een
 * beschrijvende alt-tekst op.
 *
 * @element nldd-byline
 *
 * @attr {string} text            - Naamregel (bijv. "Jan Jansen en Piet Pietersen"); fallback wanneer de text-slot leeg is
 * @attr {string} supporting-text - Ondersteunende tekst onder de naamregel (bijv. rol of datum); fallback wanneer de supporting-text-slot leeg is
 *
 * @slot avatars         - Eén of meer img-elementen; gestyled als ronde, overlappende avatars
 * @slot text            - Naamregel als rijke inhoud (bijv. een link naar het auteursprofiel)
 * @slot supporting-text - Ondersteunende tekst als rijke inhoud (bijv. een time-element)
 */
import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { bylineStyles } from './byline.styles.js';
import { bylineTemplate } from './byline.template.js';

@customElement('nldd-byline')
export class NLDDByline extends LitElement {
	static override styles = bylineStyles;

	@property({ type: String })
	text = '';

	@property({ type: String, attribute: 'supporting-text' })
	supportingText = '';

	@state()
	_hasSlottedAvatars = false;

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
		const has = slot.assignedElements().length > 0;
		if (slot.name === 'avatars') this._hasSlottedAvatars = has;
		else if (slot.name === 'text') this._hasSlottedText = has;
		else if (slot.name === 'supporting-text') this._hasSlottedSupportingText = has;
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
