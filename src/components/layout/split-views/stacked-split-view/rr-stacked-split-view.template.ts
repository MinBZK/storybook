import { html, TemplateResult, nothing } from 'lit';
import type { RRStackedSplitView } from './rr-stacked-split-view.js';
import '../split-view-divider/rr-split-view-divider.ts';

export function stackedSplitViewTemplate(component: RRStackedSplitView): TemplateResult {
	const panes = Array.from({ length: component.panes }, (_, i) => i + 1);

	return html`
		<div class="stacked-split-view">
			${panes.map((n, i) => html`
				${i > 0 ? html`
					<rr-split-view-divider
						orientation="horizontal"
						data-index=${i}
						role="separator"
						aria-orientation="horizontal"
					></rr-split-view-divider>
				` : nothing}
				<div class="stacked-split-view__pane" style="--_pane-flex: 1;">
					<slot name="pane-${n}"></slot>
				</div>
			`)}
		</div>
	`;
}
