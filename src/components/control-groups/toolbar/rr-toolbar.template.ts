import { html, nothing } from 'lit';

// # Types

export type ToolbarChild =
	| { type: 'divider'; id: number }
	| { type: 'title-group'; title: string; subtitle: string; align: string; id: number }
	| { type: 'item'; element: Element; label: string; id: number }
	| { type: 'other'; element: Element; id: number };

function renderChild(child: ToolbarChild) {
	if (child.type === 'divider') {
		return html`
			<div class="toolbar__divider" role="separator" aria-orientation="vertical">
				<div class="toolbar__divider-line"></div>
			</div>
		`;
	}

	if (child.type === 'title-group') {
		const alignClass = child.align === 'center'
			? 'toolbar__title-group--center'
			: 'toolbar__title-group--left';

		return html`
			<div class="toolbar__title-group ${alignClass}">
				${child.title ? html`<p class="toolbar__title">${child.title}</p>` : nothing}
				${child.subtitle ? html`<p class="toolbar__subtitle">${child.subtitle}</p>` : nothing}
			</div>
		`;
	}

	if (child.type === 'item') {
		return html`
			<div class="toolbar__item">
				<div class="toolbar__item-content">
					<slot name="child-${child.id}"></slot>
				</div>
				${child.label ? html`<span class="toolbar__item-label">${child.label}</span>` : nothing}
			</div>
		`;
	}

	// other
	return html`<slot name="child-${child.id}"></slot>`;
}

export function template(
	startChildren: ToolbarChild[],
	centerChildren: ToolbarChild[],
	endChildren: ToolbarChild[],
) {
	return html`
		<div class="toolbar" part="toolbar" role="toolbar">
			<div class="toolbar__area toolbar__area--start" part="start">
				${startChildren.map(renderChild)}
			</div>
			<div class="toolbar__area toolbar__area--center" part="center">
				${centerChildren.map(renderChild)}
			</div>
			<div class="toolbar__area toolbar__area--end" part="end">
				${endChildren.map(renderChild)}
			</div>
		</div>
	`;
}
