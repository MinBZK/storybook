import { html, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import '../../actions/icon-button/rr-icon-button.js';
import '../../content/icon/rr-icon.js';

// # Types
export type ToolbarChild =
	| { type: 'divider'; id: number }
	| { type: 'title-group'; title: string; subtitle: string; align: string; minWidth: string; id: number }
	| { type: 'item'; element: Element; label: string; id: number; priority: number; overflowItems: Element[]; minWidth: string; width: string; isFluid: boolean }
	| { type: 'other'; element: Element; id: number };

// # Helpers
function isDividerVisible(index: number, children: ToolbarChild[], overflowIds: Set<number>): boolean {
	const hasVisibleBefore = children.slice(0, index).some(c =>
		(c.type === 'item' && !overflowIds.has(c.id)) || c.type === 'title-group'
	);
	const hasVisibleAfter = children.slice(index + 1).some(c =>
		(c.type === 'item' && !overflowIds.has(c.id)) || c.type === 'title-group'
	);
	return hasVisibleBefore && hasVisibleAfter;
}

function isSoloFluid(allChildren: ToolbarChild[], overflowIds: Set<number>, id: number): boolean {
	const visibleItems = allChildren.filter(c =>
		!overflowIds.has(c.id) && (c.type === 'item' || c.type === 'title-group')
	);
	return visibleItems.length === 1 && visibleItems[0].id === id;
}

function resolveWidth(width: string): string {
	if (!width) return '';
	if (width.endsWith('%')) {
		const ratio = parseFloat(width) / 100;
		return `calc(var(--rr-toolbar-width) * ${ratio})`;
	}
	return width;
}

function renderChildren(
	children: ToolbarChild[],
	allChildren: ToolbarChild[],
	overflowIds: Set<number>,
) {
	return children.map((child, index) => {
		if (child.type === 'divider') {
			const visible = isDividerVisible(index, children, overflowIds);
			return visible ? html`
				<div class="toolbar__divider" role="separator" aria-orientation="vertical">
					<div class="toolbar__divider-line"></div>
				</div>
			` : nothing;
		}
		if (child.type === 'title-group') {
			const alignClass = child.align === 'center'
				? 'toolbar__title-group--center-text-align'
				: 'toolbar__title-group--left-text-align';
			const solo = isSoloFluid(allChildren, overflowIds, child.id);
			return html`
				<div
					class="toolbar__title-group ${alignClass} ${solo ? 'is-solo-fluid' : ''}"
					data-child-id=${child.id}
					style=${styleMap({ '--_title-group-min-width': child.minWidth })}
				>
					${child.title ? html`<p class="toolbar__title">${child.title}</p>` : nothing}
					${child.subtitle ? html`<p class="toolbar__subtitle">${child.subtitle}</p>` : nothing}
				</div>
			`;
		}
		if (child.type === 'item') {
			const isOverflowed = overflowIds.has(child.id);
			const soloFluid = !isOverflowed && child.isFluid && isSoloFluid(allChildren, overflowIds, child.id);
			const cssVars: Record<string, string> = {};
			if (soloFluid) {
				// No vars needed — is-solo-fluid uses flex-grow: 1 to fill all space
			} else if (child.isFluid) {
				if (child.minWidth) cssVars['--_item-min-width'] = child.minWidth;
				if (child.width) cssVars['--_item-width'] = resolveWidth(child.width);
			}
			const classes = [
				'toolbar__item',
				soloFluid ? 'is-solo-fluid' : child.isFluid ? 'is-fluid' : '',
				isOverflowed ? 'is-hidden' : '',
			].filter(Boolean).join(' ');
			return html`
				<div
					class=${classes}
					data-child-id=${child.id}
					aria-hidden=${isOverflowed ? 'true' : nothing}
					style=${styleMap(cssVars)}
				>
					<div class="toolbar__item-content">
						<slot name="child-${child.id}"></slot>
					</div>
					${child.label ? html`<span class="toolbar__item-label">${child.label}</span>` : nothing}
				</div>
			`;
		}
		return html`<slot name="child-${child.id}"></slot>`;
	});
}

// # Template
export function template(
	startChildren: ToolbarChild[],
	centerChildren: ToolbarChild[],
	endChildren: ToolbarChild[],
	overflowIds: Set<number>,
	size: string,
	hasCenterChildren: boolean,
	leftSpacerZero: boolean,
	rightSpacerZero: boolean,
	isSoloFluidItem: boolean,
	hasOverflow: boolean,
) {
	const allChildren = [...startChildren, ...centerChildren, ...endChildren];

	return html`
		<div class="toolbar__items" role="toolbar">
			${renderChildren(startChildren, allChildren, overflowIds)}
			${hasCenterChildren ? html`
				${leftSpacerZero ? nothing : html`<div class="toolbar__left-spacer"></div>`}
				${renderChildren(centerChildren, allChildren, overflowIds)}
				${rightSpacerZero ? nothing : html`<div class="toolbar__right-spacer"></div>`}
			` : isSoloFluidItem ? nothing : html`
				<div class="toolbar__flexible-spacer"></div>
			`}
			${renderChildren(endChildren, allChildren, overflowIds)}
		</div>
		<div class="toolbar__overflow-button ${hasOverflow ? '' : 'is-hidden'}">
			<rr-icon-button size=${size}>
				<rr-icon name="ellipsis"></rr-icon>
				Meer
			</rr-icon-button>
			<span class="toolbar__item-label">Meer</span>
		</div>
	`;
}
