import { html } from 'lit';
import type { RRButtonGroup } from './rr-button-group.ts';

export function template(this: RRButtonGroup) {
	return html`
	<div class="button-group">
		<slot @slotchange=${this.handleSlotChange}></slot>
	</div>
	`;
}
