import { html, nothing, type TemplateResult } from 'lit';
import type { NLDDTimelineTrackCell } from './timeline-track-cell.js';

export function timelineTrackCellTemplate(component: NLDDTimelineTrackCell): TemplateResult {
	if (component.step === 'none') {
		return html`
			<div class="timeline-track-cell">
				<div class="timeline-track-cell__line-full"></div>
			</div>
		`;
	}

	const showTopLine = component.child === 'between' || component.child === 'last';
	const showBottomLine = component.child === 'between' || component.child === 'first';

	return html`
		<div class="timeline-track-cell">
			${showTopLine ? html`<div class="timeline-track-cell__line-top"></div>` : nothing}
			<div class="timeline-track-cell__dot"></div>
			${showBottomLine ? html`<div class="timeline-track-cell__line-bottom"></div>` : nothing}
		</div>
	`;
}
