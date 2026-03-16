import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';

const areas = (showStart: boolean, showEnd: boolean) => html`
	<div class="list-item__indicator"></div>
	<div class=${classMap({ 'list-item__start-area': true, 'is-visible': showStart })}>
		<slot name="start">
			<rr-spacer-cell size="12"></rr-spacer-cell>
		</slot>
	</div>
	<div class="list-item__main-area">
		<slot></slot>
		<div class="list-item__divider"></div>
	</div>
	<div class=${classMap({ 'list-item__end-area': true, 'is-visible': showEnd })}>
		<slot name="end">
			<rr-spacer-cell size="12"></rr-spacer-cell>
		</slot>
	</div>
`;

export const template = (
	type: string | undefined,
	href: string | undefined,
	showStart: boolean,
	showEnd: boolean,
) => {
	if (type === 'link') {
		return html`<div class="list-item">
			<a class="list-item__action"
				href=${ifDefined(href)}
			>${areas(showStart, showEnd)}</a>
		</div>`;
	}
	if (type === 'button') {
		return html`<div class="list-item">
			<button class="list-item__action"
				type="button"
			>${areas(showStart, showEnd)}</button>
		</div>`;
	}
	return html`<div class="list-item">${areas(showStart, showEnd)}</div>`;
};
