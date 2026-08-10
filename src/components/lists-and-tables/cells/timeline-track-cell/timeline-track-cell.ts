/**
 * Nederlandse Digitale Dienst Timeline Track Cell Component (Lit + TypeScript)
 *
 * A cell component for displaying timeline track indicators in lists.
 * Shows a vertical line with a dot indicating timeline position and state.
 * The row's block padding belongs to the cell itself (via
 * `--context-cell-padding-block`), so the line spans the cell's own box edge to
 * edge and consecutive steps connect without gaps.
 *
 * By default the cell is a bare track: a line with a dot per row, for a timeline
 * of events. With `variant="step"` the dot grows big enough for a number or an
 * icon and you have a list of steps under each other, the vertical counterpart
 * of `nldd-step-indicator`. The size belongs to the variant rather than to the
 * content: every dot in a list is the same size, or the track would jump.
 *
 * @element nldd-timeline-track-cell
 * @attr {'past' | 'current' | 'future' | 'none'} status - Status of this step (default 'past'); the same values as `nldd-step-indicator-item`. `none` draws the line only, without a dot
 * @attr {'dot' | 'step'} variant - What this row is: a `dot` (default) on a timeline of events, a 16px dot, or a `step` in a list of steps, a 24px dot with room for a number or an icon
 * @attr {boolean} minor - This row belongs under the previous one: a smaller dot in the same lane, so the track runs straight on and nothing indents. The dot stays empty (a number or an icon would not fit, and would make the row a step of its own); carry the hierarchy in the row itself instead, with an `nldd-text-cell` rather than an `nldd-title-cell` for example
 * @attr {'down' | 'up'} direction - The direction the timeline moves forward in: `down` (default) puts the past above, `up` below. Only the current step has half a track, so this only has an effect there
 * @attr {'first' | 'between' | 'last' | 'only'} position - Place in the series (default 'between'): decides whether the line continues above the dot, below it, or on both sides. `only` is the single row in the series and gets a line on neither side: a track of one dot leads nowhere
 * @attr {string} text - Number or short text in the dot
 * @attr {string} icon - Icon name in the dot; wins over `text`
 *
 * @slot - Custom content in the dot (an alternative to `text` and `icon`)
 */
import { LitElement, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { reflectNonDefault } from '../../../../utilities/reflect-non-default.js';
import { VisibilityMixin } from '../../../../utilities/visibility-mixin.js';
import { timelineTrackCellStyles } from './timeline-track-cell.styles.js';
import { timelineTrackCellTemplate } from './timeline-track-cell.template.js';
import '../../../content/icon/icon.js';

type Status = 'past' | 'current' | 'future' | 'none';
type Variant = 'dot' | 'step';
type Direction = 'down' | 'up';
type Position = 'first' | 'between' | 'last' | 'only';

@customElement('nldd-timeline-track-cell')
export class NLDDTimelineTrackCell extends VisibilityMixin(LitElement, 'cells-container') {
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

	override updated(changed: PropertyValues): void {
		super.updated(changed);
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
