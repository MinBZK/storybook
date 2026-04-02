/* eslint-disable lit-a11y/click-events-have-key-events -- native dialog handles keyboard via @cancel */
import { html, TemplateResult, nothing } from 'lit';
import type { NDDNavigationSplitView } from './ndd-navigation-split-view.js';
import '../split-view-divider/ndd-split-view-divider.ts';

export function navigationSplitViewTemplate(component: NDDNavigationSplitView): TemplateResult {
	return html`
		<div class="navigation-split-view">
			${component._showSidebar ? html`
				<div class="navigation-split-view__sidebar-pane">
					<slot name="sidebar"></slot>
				</div>
				<ndd-split-view-divider orientation="vertical"></ndd-split-view-divider>
			` : nothing}
			${component._showSecondarySidebar ? html`
				<div class="navigation-split-view__secondary-sidebar-pane">
					<slot name="secondary-sidebar"></slot>
				</div>
				<ndd-split-view-divider orientation="vertical"></ndd-split-view-divider>
			` : nothing}
			${component._showMain ? html`
				<div class="navigation-split-view__main-pane">
					<slot name="main"></slot>
				</div>
			` : nothing}
			${component._showInspector ? html`
				<ndd-split-view-divider orientation="vertical"></ndd-split-view-divider>
				<div class="navigation-split-view__inspector-pane">
					<slot name="inspector"></slot>
				</div>
			` : component.inspectorAutoHidden || component.inspectorAsSheet ? html`
				<dialog class="navigation-split-view__inspector-sheet"
					aria-label=${component.inspectorAccessibleLabel}
					aria-modal="true"
					@click=${component._handleInspectorSheetClick}
					@cancel=${component._handleInspectorSheetCancel}
				>
					<div class="navigation-split-view__inspector-sheet-body">
						<slot name="inspector"></slot>
					</div>
				</dialog>
			` : nothing}
			${component.sidebarAsSheet ? html`
				<dialog class="navigation-split-view__sidebar-sheet"
					aria-label=${component.sidebarAccessibleLabel}
					aria-modal="true"
					@click=${component._handleSidebarSheetClick}
					@cancel=${component._handleSidebarSheetCancel}
				>
					<div class="navigation-split-view__sidebar-sheet-body">
						${component._hasSecondarySidebar && component._paneHasContent('secondary-sidebar') ? html`
							<slot name="secondary-sidebar"></slot>
						` : html`
							<slot name="sidebar"></slot>
						`}
					</div>
				</dialog>
			` : nothing}
		</div>
	`;
}
