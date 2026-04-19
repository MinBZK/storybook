import { html, TemplateResult } from 'lit';
import type { NLDDSplitViewPane } from './split-view-pane.js';

export function splitViewPaneTemplate(_component: NLDDSplitViewPane): TemplateResult {
	return html`
		<div class="split-view-pane">
			<slot></slot>
		</div>
	`;
}
