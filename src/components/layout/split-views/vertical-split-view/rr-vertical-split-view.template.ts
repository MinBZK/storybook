import { html, TemplateResult, nothing } from 'lit';
import type { RRVerticalSplitView } from './rr-vertical-split-view.js';
import '../split-view-divider/rr-split-view-divider.ts';

export function verticalSplitViewTemplate(component: RRVerticalSplitView): TemplateResult {
	return html`
		<div class="vertical-split-view">
			${component.showHeader ? html`
				<div class="vertical-split-view__header">
					<slot name="header"></slot>
				</div>
				<rr-split-view-divider
					orientation="horizontal"
					data-index="0"
				></rr-split-view-divider>
			` : nothing}
			<div class="vertical-split-view__main">
				<slot name="main"></slot>
			</div>
			${component.showFooter ? html`
				<rr-split-view-divider
					orientation="horizontal"
					data-index="1"
				></rr-split-view-divider>
				<div class="vertical-split-view__footer">
					<slot name="footer"></slot>
				</div>
			` : nothing}
		</div>
	`;
}
