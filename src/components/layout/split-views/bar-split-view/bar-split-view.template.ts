import { html, TemplateResult, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { NLDDBarSplitView } from './bar-split-view.js';
import '../split-view-divider/split-view-divider.js';

export function barSplitViewTemplate(component: NLDDBarSplitView): TemplateResult {
	const sorted = component._getSortedChildren();
	const isSm = component._currentBreakpoint === 'sm';

	return html`
		<div class="bar-split-view">
			${sorted.map((el, index) => {
				const isMain = el.slot === 'main';
				const isLast = index === sorted.length - 1;

				// Inline position is only applied to bars on sm viewports
				const barStyles = !isMain && isSm
					? component._smTopBars.has(el)
						? { top: `${component._smOffsets.get(el) ?? 0}px` }
						: { bottom: `${component._smOffsets.get(el) ?? 0}px` }
					: {};

				return html`
					<div class=${classMap({ 'bar-split-view__main': isMain, 'bar-split-view__bar': !isMain })}
						style=${styleMap(barStyles)}>
						<slot name=${el.slot}></slot>
					</div>
					${!isSm && !isLast ? html`
						<div class="bar-split-view__divider">
							<nldd-split-view-divider orientation="horizontal"></nldd-split-view-divider>
						</div>
					` : nothing}
				`;
			})}
			${!sorted.some(el => el.slot === 'main') ? html`
				<div class="bar-split-view__main">
					<slot name="main"></slot>
				</div>
			` : nothing}
		</div>
	`;
}
