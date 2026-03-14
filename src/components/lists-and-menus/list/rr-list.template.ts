import { html } from 'lit';

export const template = () => html`
	<div class="list__body">
		<div class="list__header">
			<slot name="header"></slot>
		</div>
		<div class="list__items"
			role="list"
		>
			<slot></slot>
		</div>
		<div class="list__footer">
			<slot name="footer"></slot>
		</div>
	</div>
	<div class="list__announcer"
		aria-live="assertive"
		aria-atomic="true"
	></div>
`;
