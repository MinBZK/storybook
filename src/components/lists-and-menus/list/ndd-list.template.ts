import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

export const template = (itemsLabel: string, hasHeader: boolean) => html`
	<div class="list__body">
		<div class="list__header">
			<slot name="header"></slot>
		</div>
		<div class="list__items"
			role="list"
			aria-label=${ifDefined(hasHeader ? undefined : itemsLabel)}
		>
			<slot></slot>
		</div>
		<div class="list__footer">
			<slot name="footer"></slot>
		</div>
	</div>
	<div class="list__polite-announcer"
		role="status"
		aria-live="polite"
		aria-atomic="true"
	></div>
	<div class="list__assertive-announcer"
		role="alert"
		aria-live="assertive"
		aria-atomic="true"
	></div>
`;
