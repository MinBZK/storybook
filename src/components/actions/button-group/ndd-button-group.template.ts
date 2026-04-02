import { html } from 'lit';
import type { NDDButtonGroup } from './ndd-button-group.ts';

export function template(this: NDDButtonGroup) {
	return html`
	<div class="button-group">
		<slot @slotchange=${this.handleSlotChange}></slot>
	</div>
	`;
}
