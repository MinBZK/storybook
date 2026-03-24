import { html, TemplateResult, nothing } from 'lit';
import type { RRHorizontalSplitView } from './rr-horizontal-split-view.js';
import '../split-view-divider/rr-split-view-divider.ts';

export function horizontalSplitViewTemplate(component: RRHorizontalSplitView): TemplateResult {
	return html`
		<div class="horizontal-split-view">
			${component._showSidebar ? html`
				<div class="horizontal-split-view__sidebar-pane">
					<slot name="sidebar"></slot>
				</div>
				<rr-split-view-divider orientation="vertical"></rr-split-view-divider>
			` : nothing}
			${component._showSecondarySidebar ? html`
				<div class="horizontal-split-view__secondary-sidebar-pane">
					<slot name="secondary-sidebar"></slot>
				</div>
				<rr-split-view-divider orientation="vertical"></rr-split-view-divider>
			` : component._effectiveLevels === 3 ? html`<slot name="secondary-sidebar" style="display:none"></slot>` : nothing}
			${component._showMain ? html`
				<div class="horizontal-split-view__main-pane">
					<slot name="main"></slot>
				</div>
			` : nothing}
			${component._showInspector ? html`
				<rr-split-view-divider orientation="vertical"></rr-split-view-divider>
				<div class="horizontal-split-view__inspector-pane">
					<slot name="inspector"></slot>
				</div>
			` : component.inspectorAutoHidden || component.inspectorAsSheet ? html`
				<dialog class="horizontal-split-view__inspector-sheet"
					@click=${component._handleInspectorSheetClick}
					@cancel=${component._handleInspectorSheetCancel}
				>
					<div class="horizontal-split-view__inspector-sheet-body">
						<slot name="inspector"></slot>
					</div>
				</dialog>
			` : nothing}
		</div>
	`;
}
