import { html, TemplateResult, nothing } from 'lit';
import type { NDDSideBySideSplitView } from './ndd-side-by-side-split-view.js';
import '../split-view-divider/ndd-split-view-divider.ts';

export function sideBySideSplitViewTemplate(component: NDDSideBySideSplitView): TemplateResult {
	// Render slots for all panes but only show the ones that fit
	const panes = Array.from({ length: component.panes }, (_, i) => i + 1);

	return html`
		<div class="side-by-side-split-view">
			${panes.map(
				(n, i) => html`
					${i > 0 && i < component._visiblePanes
						? html` <ndd-split-view-divider orientation="vertical"></ndd-split-view-divider> `
						: nothing}
					<div class="side-by-side-split-view__pane" ?hidden=${i >= component._visiblePanes}>
						<slot name="pane-${n}"></slot>
					</div>
				`
			)}
		</div>
	`;
}
