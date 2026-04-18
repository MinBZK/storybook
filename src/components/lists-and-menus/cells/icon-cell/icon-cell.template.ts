import { html } from 'lit';
import type { NLDDIconCell } from './icon-cell.ts';

export function template(this: NLDDIconCell) {
	return html`
		<slot></slot>
	`;
}
