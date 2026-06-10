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
	_hasAvatars = false;

	@state()
	_hasSlottedText = false;

	@state()
	_hasSlottedSupportingText = false;

	/** Stored slot-change listener references so disconnectedCallback can
	 *  remove them; kept symmetric with addEventListener like nldd-banner. */
	private _slotListeners: Array<[HTMLSlotElement, () => void]> = [];

	/** Re-runs every connectedCallback (i.e. also after a move-and-reinsert),
	 *  unlike firstUpdated which is one-shot. */
	private _attachSlotListeners(): void {
		const track = (name: string, apply: (hasContent: boolean) => void): void => {
			const slot = this.shadowRoot?.querySelector<HTMLSlotElement>(`slot[name="${name}"]`);
			if (!slot) return;
			const sync = () => { apply(slot.assignedElements().length > 0); };
			slot.addEventListener('slotchange', sync);
			this._slotListeners.push([slot, sync]);
			sync();
		};
		track('avatars', (has) => { this._hasAvatars = has; });
		track('text', (has) => { this._hasSlottedText = has; });
		track('supporting-text', (has) => { this._hasSlottedSupportingText = has; });
	}

	override firstUpdated(): void {
		this._attachSlotListeners();
	}

	override connectedCallback(): void {
		super.connectedCallback();
		// Re-attach when reconnecting after a previous disconnect; firstUpdated
		// doesn't fire again. Guard on listener presence so we don't run twice
		// on the very first connect.
		if (this.shadowRoot && this._slotListeners.length === 0) {
			this._attachSlotListeners();
		}
	}

	override disconnectedCallback(): void {
		for (const [slot, sync] of this._slotListeners) {
			slot.removeEventListener('slotchange', sync);
		}
		this._slotListeners = [];
		super.disconnectedCallback();
	}

	override render() {
		return bylineTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-byline': NLDDByline;
	}
}
