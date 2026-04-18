import { html, TemplateResult, nothing } from 'lit';
import type { NLDDSideBySideSplitView } from './side-by-side-split-view.js';
import '../split-view-divider/split-view-divider.ts';

export function sideBySideSplitViewTemplate(component: NLDDSideBySideSplitView): TemplateResult {
	// Render slots for all panes but only show the ones that fit
	const panes = Array.from({ length: component.panes }, (_, i) => i + 1);

	return html`
		<div class="side-by-side-split-view">
			${panes.map((n, i) => html`
				${i > 0 && i < component._visiblePanes ? html`
					<nldd-split-view-divider orientation="vertical"></nldd-split-view-divider>
				` : nothing}
				<div
					class="side-by-side-split-view__pane"
					?hidden=${i >= component._visiblePanes}
				>
					<slot name="pane-${n}"></slot>
				</div>
			`)}
		</div>
	`;
}
