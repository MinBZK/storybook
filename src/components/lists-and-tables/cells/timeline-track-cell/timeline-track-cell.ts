/**
 * Nederlandse Digitale Dienst Timeline Track Cell Component (Lit + TypeScript)
 *
 * A cell component for displaying timeline track indicators in lists.
 * Shows a vertical line with a dot indicating timeline position and state.
 * The row's block padding belongs to the cell itself (via
 * `--context-cell-padding-block`), so the line spans the cell's own box edge to
 * edge and consecutive steps connect without gaps.
 *
 * Standaard is de cel een kaal spoor: een lijn met een stip per rij, voor een
 * tijdlijn van gebeurtenissen. Met `variant="step"` wordt de stip groot genoeg
 * voor een cijfer of icoon en heb je een stappenlijst onder elkaar, de verticale
 * tegenhanger van `nldd-step-indicator`. De maat hoort bij de variant en niet bij
 * de inhoud: elke stip in een lijst is even groot, anders verspringt het spoor.
 *
 * @element nldd-timeline-track-cell
 * @attr {'past' | 'current' | 'future' | 'none'} status - Status van deze stap (standaard 'past'); dezelfde waarden als `nldd-step-indicator-item`. `none` tekent alleen de lijn, zonder stip
 * @attr {'dot' | 'step'} variant - Wat deze rij is: een `dot` (standaard) op een tijdlijn van gebeurtenissen, stip van 16px, of een `step` in een stappenlijst, stip van 24px waar een cijfer of icoon in past
 * @attr {boolean} minor - Deze rij hoort onder de vorige: een kleinere stip in dezelfde baan, dus het spoor loopt recht door en er springt niets in. De stip blijft leeg (een cijfer of icoon past er niet in en zou de rij tot een eigen stap maken); de hiërarchie zet je verder met de rij zelf, bijvoorbeeld een `nldd-text-cell` in plaats van een `nldd-title-cell`
 * @attr {'down' | 'up'} direction - Richting waarin de tijdlijn vooruit loopt: `down` (standaard) zet het verleden boven, `up` eronder. Alleen de huidige stap heeft een half spoor, dus alleen daar heeft dit effect
 * @attr {'first' | 'between' | 'last'} position - Plek in de reeks (standaard 'between'): bepaalt of de lijn boven, onder of aan beide kanten van de stip doorloopt
 * @attr {string} text - Cijfer of korte tekst in de stip
 * @attr {string} icon - Icoonnaam in de stip; wint van `text`
 *
 * @slot - Eigen inhoud in de stip (alternatief voor `text` en `icon`)
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { reflectNonDefault } from '../../../../utilities/reflect-non-default.js';
import { timelineTrackCellStyles } from './timeline-track-cell.styles.js';
import { timelineTrackCellTemplate } from './timeline-track-cell.template.js';
import '../../../content/icon/icon.js';

type Status = 'past' | 'current' | 'future' | 'none';
type Variant = 'dot' | 'step';
type Direction = 'down' | 'up';
type Position = 'first' | 'between' | 'last';

@customElement('nldd-timeline-track-cell')
export class NLDDTimelineTrackCell extends LitElement {
	static override styles = timelineTrackCellStyles;

	@property({ reflect: true, converter: reflectNonDefault<Status>('past') })
	status: Status = 'past';

	@property({ reflect: true, converter: reflectNonDefault<Variant>('dot') })
	variant: Variant = 'dot';

	/** A step below a main step. A meaning, not a measurement: the cell picks the
	 *  size, so the scale can change later without every consumer following. Its
	 *  dot stays empty -- text, icon and slotted content are ignored. */
	@property({ type: Boolean, reflect: true })
	minor = false;

	/** Which way the timeline moves forward. The cell only knows its own step, so
	 *  it cannot tell which neighbor came first: with `up` (newest at the top)
	 *  the traveled half of the track is the one below the marker. Only the
	 *  current step has a half-and-half track, so this is the only row where it
	 *  changes anything. */
	@property({ reflect: true, converter: reflectNonDefault<Direction>('down') })
	direction: Direction = 'down';

	@property({ reflect: true, converter: reflectNonDefault<Position>('between') })
	position: Position = 'between';

	@property({ type: String })
	text = '';

	@property({ type: String })
	icon = '';

	/** Only a step marker has room to read a number in, and a minor row is smaller
	 *  still -- besides, a number would claim it is a step of its own. */
	get showsContent(): boolean {
		return !this.minor && this.variant === 'step';
	}

	private _warnedContent = false;

	override updated(): void {
		if (!import.meta.env?.DEV) return;
		const ignored = !this.showsContent && Boolean(this.text || this.icon);
		if (ignored && !this._warnedContent) {
			this._warnedContent = true;
			console.warn('<nldd-timeline-track-cell>: `text` en `icon` passen alleen in `variant="step"` zonder `minor`; hier worden ze niet getoond.');
		}
		else if (!ignored) {
			this._warnedContent = false;
		}
	}

	override render() {
		return timelineTrackCellTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-timeline-track-cell': NLDDTimelineTrackCell;
	}
}
