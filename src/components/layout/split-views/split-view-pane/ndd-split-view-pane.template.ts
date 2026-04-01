import { html, TemplateResult } from 'lit';
import type { NDDSplitViewPane } from './ndd-split-view-pane.js';

export function splitViewPaneTemplate(_component: NDDSplitViewPane): TemplateResult {
	return html`
		<div class="split-view-pane">
			<slot></slot>
		</div>
	`;
}
