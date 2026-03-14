import { html } from 'lit';

const areas = (showStart: boolean, showEnd: boolean) => html`
	<div class="list-item__indicator"></div>
	<div class="list-item__start-area ${showStart ? 'is-visible' : ''}">
		<slot name="start">
			<rr-spacer-cell size="12"></rr-spacer-cell>
		</slot>
	</div>
	<div class="list-item__main-area">
		<slot></slot>
		<div class="list-item__divider"></div>
	</div>
	<div class="list-item__end-area ${showEnd ? 'is-visible' : ''}">
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
		return html`<a class="list-item"
			href=${href ?? ''}
		>${areas(showStart, showEnd)}</a>`;
	}
	if (type === 'button') {
		return html`<button class="list-item"
			type="button"
		>${areas(showStart, showEnd)}</button>`;
	}
	return html`<div class="list-item"
		role="listitem"
	>${areas(showStart, showEnd)}</div>`;
};
