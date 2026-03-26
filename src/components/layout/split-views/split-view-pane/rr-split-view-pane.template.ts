import { html, TemplateResult } from 'lit';
import type { RRSplitViewPane } from './rr-split-view-pane.js';

export function splitViewPaneTemplate(_component: RRSplitViewPane): TemplateResult {
	return html`
		<div class="split-view-pane">
			<slot></slot>
		</div>
	`;
}
