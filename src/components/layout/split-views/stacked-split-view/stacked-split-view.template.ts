import { html, TemplateResult, nothing } from 'lit';
import type { NLDDStackedSplitView } from './stacked-split-view.js';
import '../split-view-divider/split-view-divider.js';

export function stackedSplitViewTemplate(component: NLDDStackedSplitView): TemplateResult {
	// Render slots for all panes but only show the ones that fit
	const panes = Array.from({ length: component.panes }, (_, i) => i + 1);

	return html`
		<div class="stacked-split-view">
			${panes.map((n, i) => html`
				${i > 0 && i < component._visiblePanes ? html`
					<nldd-split-view-divider orientation="horizontal"></nldd-split-view-divider>
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
