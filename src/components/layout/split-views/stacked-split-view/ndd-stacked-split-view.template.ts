import { html, TemplateResult, nothing } from 'lit';
import type { NDDStackedSplitView } from './ndd-stacked-split-view.js';
import '../split-view-divider/ndd-split-view-divider.ts';

export function stackedSplitViewTemplate(component: NDDStackedSplitView): TemplateResult {
	// Render slots for all panes but only show the ones that fit
	const panes = Array.from({ length: component.panes }, (_, i) => i + 1);

	return html`
		<div class="stacked-split-view">
			${panes.map((n, i) => html`
				${i > 0 && i < component._visiblePanes ? html`
					<ndd-split-view-divider orientation="horizontal"></ndd-split-view-divider>
				` : nothing}
				<div
					class="stacked-split-view__pane"
					?hidden=${i >= component._visiblePanes}
				>
					<slot name="pane-${n}"></slot>
				</div>
			`)}
		</div>
	`;
}
