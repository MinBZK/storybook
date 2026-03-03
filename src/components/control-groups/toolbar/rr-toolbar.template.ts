import { html, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import '../../actions/icon-button/rr-icon-button.js';
import '../../content/icon/rr-icon.js';

// # Types

export type ToolbarChild =
	| { type: 'divider'; id: number }
	| { type: 'title-group'; title: string; subtitle: string; align: string; id: number }
	| { type: 'item'; element: Element; label: string; id: number; priority: number; overflowItems: Element[] }
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

function renderChildren(children: ToolbarChild[], overflowIds: Set<number>) {
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
			return html`
				<div class="toolbar__title-group ${alignClass}"
					data-child-id=${child.id}
				>
					${child.title ? html`<p class="toolbar__title">${child.title}</p>` : nothing}
					${child.subtitle ? html`<p class="toolbar__subtitle">${child.subtitle}</p>` : nothing}
				</div>
			`;
		}

		if (child.type === 'item') {
			const isOverflowed = overflowIds.has(child.id);
			return html`
				<div class="toolbar__item ${isOverflowed ? 'is-hidden' : ''}"
					data-child-id=${child.id}
					aria-hidden=${isOverflowed ? 'true' : nothing}
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
	leftSpacerWidth: number,
	rightSpacerWidth: number,
) {
	const hasCenterChildren = centerChildren.length > 0;
	const hasOverflow = overflowIds.size > 0;

	return html`
		<div class="toolbar" role="toolbar">
			<div class="toolbar__start-area">
				${renderChildren(startChildren, overflowIds)}
			</div>
			${hasCenterChildren ? html`
				<div class="toolbar__left-spacer"
					style=${styleMap({ width: `${leftSpacerWidth}px`, minWidth: `${leftSpacerWidth}px` })}
				></div>
				<div class="toolbar__center-area">
					${renderChildren(centerChildren, overflowIds)}
				</div>
				<div class="toolbar__right-spacer"
					style=${styleMap({ width: `${rightSpacerWidth}px`, minWidth: `${rightSpacerWidth}px` })}
				></div>
			` : nothing}
			<div class="toolbar__end-area">
				${renderChildren(endChildren, overflowIds)}
				${hasOverflow ? html`
					<div class="toolbar__more-button">
						<rr-icon-button size=${size}>
							<rr-icon name="ellipsis"></rr-icon>
							Meer
						</rr-icon-button>
					</div>
				` : nothing}
			</div>
		</div>
		<div class="toolbar__more-button-sizer" aria-hidden="true">
			<rr-icon-button size=${size}>
				<rr-icon name="ellipsis"></rr-icon>
				Meer
			</rr-icon-button>
		</div>
	`;
}
