import { html } from 'lit';
import type { RRIconCell } from './rr-icon-cell.ts';

export function template(this: RRIconCell) {
	return html`
		<slot></slot>
	`;
}
