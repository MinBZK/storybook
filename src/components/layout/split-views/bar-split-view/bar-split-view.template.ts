import { html, TemplateResult, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import type { NLDDBarSplitView } from './bar-split-view.js';
import '../split-view-divider/split-view-divider.js';

export function barSplitViewTemplate(component: NLDDBarSplitView): TemplateResult {
	const sorted = component._getSortedChildren();
	// Render sequence: the sorted bars and main, plus an appended main slot when
	// the consumer didn't provide one, so a main area is always present.
	const blocks = sorted.map(el => ({ slot: el.slot, isMain: el.slot === 'main' }));
	if (!blocks.some(block => block.isMain)) blocks.push({ slot: 'main', isMain: true });

	// Bars above main are top bars (sticky to the top in root-scroll mode); bars
	// below main are bottom bars. Marked so the root-scroll rules + offset
	// bookkeeping (see bar-split-view.ts) know which side each bar sticks to.
	const mainIndex = blocks.findIndex(block => block.isMain);

	return html`
		<div class="bar-split-view">
			${blocks.map((block, index) => {
				const next = blocks[index + 1];
				// A divider sits only on a seam where the main pane meets an
				// adjacent bar — never between two stacked bars. With a single
				// main that is at most two seams (one above, one below main), at
				// every breakpoint. Consumers never manage dividers themselves.
				const showDivider = next ? block.isMain !== next.isMain : false;

				return html`
					<div class=${classMap({
						'bar-split-view__main': block.isMain,
						'bar-split-view__bar': !block.isMain,
						'bar-split-view__bar--top': !block.isMain && index < mainIndex,
						'bar-split-view__bar--bottom': !block.isMain && index > mainIndex,
					})}>
						<slot name=${block.slot}></slot>
					</div>
					${showDivider ? html`
						<div class="bar-split-view__divider">
							<nldd-split-view-divider orientation="horizontal"></nldd-split-view-divider>
						</div>
					` : nothing}
				`;
			})}
		</div>
	`;
}
