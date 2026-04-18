import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import type { NDDButtonBar, BarChild } from './ndd-button-bar.ts';

export function template(this: NDDButtonBar) {
	return html`
		<div class="button-bar" part="bar" role="group">
			${repeat(this._children, c => c.id, c => renderChild.call(this, c))}
		</div>
	`;
}

function renderChild(this: NDDButtonBar, child: BarChild) {
	if (child.type === 'divider') {
		return html`
			<div class="button-bar__divider">
				<div class="button-bar__divider-line"></div>
			</div>
		`;
	}

	return html`<slot name="child-${child.id}"></slot>`;
}
