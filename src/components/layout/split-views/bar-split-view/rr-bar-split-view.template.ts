import { html, TemplateResult, nothing } from 'lit';
import type { RRBarSplitView } from './rr-bar-split-view.js';
import '../split-view-divider/rr-split-view-divider.ts';

export function barSplitViewTemplate(component: RRBarSplitView): TemplateResult {
	return html`
		<div class="bar-split-view">
			${component._hasPrimaryBar ? html`
				<div class="bar-split-view__primary-bar">
					<slot name="primary-bar"></slot>
				</div>
				<div class="bar-split-view__primary-bar-divider">
					<rr-split-view-divider orientation="horizontal"></rr-split-view-divider>
				</div>
			` : nothing}
			<div class="bar-split-view__main">
				<slot name="main"></slot>
			</div>
			${component._hasSecondaryBar ? html`
				<div class="bar-split-view__secondary-bar-divider">
					<rr-split-view-divider orientation="horizontal"></rr-split-view-divider>
				</div>
				<div class="bar-split-view__secondary-bar">
					<slot name="secondary-bar"></slot>
				</div>
			` : nothing}
		</div>
	`;
}
