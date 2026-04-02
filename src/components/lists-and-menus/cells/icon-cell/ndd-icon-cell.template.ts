import { html } from 'lit';
import type { NDDIconCell } from './ndd-icon-cell.ts';

export function template(this: NDDIconCell) {
	return html` <slot></slot> `;
}
