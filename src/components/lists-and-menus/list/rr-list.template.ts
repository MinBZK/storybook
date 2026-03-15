import { html } from 'lit';

export const template = (itemsLabel: string) => html`
	<div class="list__body">
		<div class="list__header">
			<slot name="header"></slot>
		</div>
		<div class="list__items"
			role="list"
			aria-label=${itemsLabel}
		>
			<slot></slot>
		</div>
		<div class="list__footer">
			<slot name="footer"></slot>
		</div>
	</div>
	<div class="list__announcer"
		role="status"
		aria-live="polite"
		aria-atomic="true"
	></div>
`;
