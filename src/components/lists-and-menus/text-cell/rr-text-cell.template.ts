import { html } from 'lit';
import type { RRTextCell } from './rr-text-cell.js';

export function template(this: RRTextCell) {
	return html`
		<slot name="overline"></slot>
		<slot name="text"></slot>
		<slot></slot>
		<slot name="supporting-text"></slot>
	`;
}
