import { html } from 'lit';
import type { NLDDButtonGroup } from './button-group.ts';

export function template(this: NLDDButtonGroup) {
	return html`
	<div class="button-group">
		<slot @slotchange=${this.handleSlotChange}></slot>
	</div>
	`;
}
