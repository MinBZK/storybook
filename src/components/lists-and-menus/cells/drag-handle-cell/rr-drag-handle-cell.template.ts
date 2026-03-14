import { html, svg } from 'lit';
import type { RRDragHandleCell } from './rr-drag-handle-cell.ts';

const gripMd = svg`
	<svg class="drag-handle-cell__control-grip"
		width="10"
		height="22"
		viewBox="0 0 10 22"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle cx="2" cy="2"  r="2" fill="currentColor"/>
		<circle cx="8" cy="2"  r="2" fill="currentColor"/>
		<circle cx="2" cy="8"  r="2" fill="currentColor"/>
		<circle cx="8" cy="8"  r="2" fill="currentColor"/>
		<circle cx="2" cy="14" r="2" fill="currentColor"/>
		<circle cx="8" cy="14" r="2" fill="currentColor"/>
		<circle cx="2" cy="20" r="2" fill="currentColor"/>
		<circle cx="8" cy="20" r="2" fill="currentColor"/>
	</svg>
`;

const gripSm = svg`
	<svg class="drag-handle-cell__control-grip"
		width="10"
		height="16"
		viewBox="0 0 10 16"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle cx="2" cy="2"  r="2" fill="currentColor"/>
		<circle cx="8" cy="2"  r="2" fill="currentColor"/>
		<circle cx="2" cy="8"  r="2" fill="currentColor"/>
		<circle cx="8" cy="8"  r="2" fill="currentColor"/>
		<circle cx="2" cy="14" r="2" fill="currentColor"/>
		<circle cx="8" cy="14" r="2" fill="currentColor"/>
	</svg>
`;

export function template(this: RRDragHandleCell) {
	const label = this.pressed
		? this._t('components.drag-handle-cell.label-pressed-text')
		: this._t('components.drag-handle-cell.label-text');

	return html`
		<div class="drag-handle-cell__control"
			role="button"
			aria-label=${label}
			aria-pressed=${this.pressed}
		>
			${this.size === 'sm' ? gripSm : gripMd}
		</div>
	`;
}
