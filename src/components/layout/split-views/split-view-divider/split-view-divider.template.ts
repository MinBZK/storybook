import { html, TemplateResult, nothing } from 'lit';
import type { NLDDSplitViewDivider } from './split-view-divider.js';

export function splitViewDividerTemplate(component: NLDDSplitViewDivider): TemplateResult {
	return html`
		<div
			class="split-view-divider"
			role="separator"
			aria-orientation=${component.orientation}
		>
			${component.hasDragHandle
				? html`<div class="split-view-divider__drag-handle"></div>`
				: nothing}
		</div>
	`;
}
