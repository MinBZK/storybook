import { html, TemplateResult, nothing } from 'lit';
import type { RRHorizontalSplitView } from './rr-horizontal-split-view.js';
import '../split-view-divider/rr-split-view-divider.ts';

export function horizontalSplitViewTemplate(component: RRHorizontalSplitView): TemplateResult {
	return html`
		<div class="horizontal-split-view">
			${component.showSidebar ? html`
				<div class="horizontal-split-view__sidebar">
					<slot name="sidebar"></slot>
				</div>
				<rr-split-view-divider
					orientation="vertical"
					data-index="0"
				></rr-split-view-divider>
			` : nothing}
			<div class="horizontal-split-view__main">
				<slot name="main"></slot>
			</div>
			${component.showInspector ? html`
				<rr-split-view-divider
					orientation="vertical"
					data-index="1"
				></rr-split-view-divider>
				<div class="horizontal-split-view__inspector">
					<slot name="inspector"></slot>
				</div>
			` : nothing}
		</div>
	`;
}
