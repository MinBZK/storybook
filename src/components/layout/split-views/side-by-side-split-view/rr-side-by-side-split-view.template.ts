import { html, TemplateResult, nothing } from 'lit';
import type { RRSideBySideSplitView } from './rr-side-by-side-split-view.js';
import '../split-view-divider/rr-split-view-divider.ts';

export function sideBySideSplitViewTemplate(component: RRSideBySideSplitView): TemplateResult {
	const panes = Array.from({ length: component.panes }, (_, i) => i + 1);

	return html`
		<div class="side-by-side-split-view">
			${panes.map((n, i) => html`
				${i > 0 ? html`
					<rr-split-view-divider
						orientation="vertical"
						data-index=${i}
						role="separator"
						aria-orientation="vertical"
					></rr-split-view-divider>
				` : nothing}
				<div class="side-by-side-split-view__pane">
					<slot name="pane-${n}"></slot>
				</div>
			`)}
		</div>
	`;
}
