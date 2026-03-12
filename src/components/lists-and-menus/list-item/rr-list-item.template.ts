import { html } from 'lit';

export const template = (showStart: boolean, showEnd: boolean) => html`
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
