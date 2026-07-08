/**
 * Nederlandse Digitale Dienst Timeline Track Cell Component (Lit + TypeScript)
 *
 * A cell component for displaying timeline track indicators in lists.
 * Shows a vertical line with a dot indicating timeline position and state.
 * The line extends into the surrounding list-item's block padding via the
 * `--context-list-item-padding-block` cascade so consecutive steps connect
 * without gaps.
 *
 * @element nldd-timeline-track-cell
 * @attr {'past' | 'future' | 'none'} step - Timeline step state (default: 'past')
 * @attr {'first' | 'between' | 'last'} child - Position in timeline (default: 'between')
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { reflectNonDefault } from '../../../../utilities/reflect-non-default.js';
import { timelineTrackCellStyles } from './timeline-track-cell.styles.js';
import { timelineTrackCellTemplate } from './timeline-track-cell.template.js';

type Step = 'past' | 'future' | 'none';
type Child = 'first' | 'between' | 'last';

@customElement('nldd-timeline-track-cell')
export class NLDDTimelineTrackCell extends LitElement {
	static override styles = timelineTrackCellStyles;

	@property({ reflect: true, converter: reflectNonDefault<Step>('past') })
	step: Step = 'past';

	@property({ reflect: true, converter: reflectNonDefault<Child>('between') })
	child: Child = 'between';

	override render() {
		return timelineTrackCellTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-timeline-track-cell': NLDDTimelineTrackCell;
	}
}
