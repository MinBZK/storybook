import { html, nothing } from 'lit';
import type { NLDDTimelineTrackCell } from './timeline-track-cell.js';

export function timelineTrackCellTemplate(this: NLDDTimelineTrackCell) {
	if (this.step === 'none') {
		return html`
			<div class="timeline-track-cell">
				<div class="timeline-track-cell__line-full"></div>
			</div>
		`;
	}

	const showTopLine = this.child === 'between' || this.child === 'last';
	const showBottomLine = this.child === 'between' || this.child === 'first';

	return html`
		<div class="timeline-track-cell">
			${showTopLine ? html`<div class="timeline-track-cell__line-top"></div>` : nothing}
			<div class="timeline-track-cell__dot"></div>
			${showBottomLine ? html`<div class="timeline-track-cell__line-bottom"></div>` : nothing}
		</div>
	`;
}
