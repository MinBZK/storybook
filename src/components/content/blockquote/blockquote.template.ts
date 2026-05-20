import { html, nothing } from 'lit';
import type { NLDDBlockquote } from './blockquote.js';

export function template(component: NLDDBlockquote) {
	return html`
		<blockquote class="blockquote"
			cite=${component.cite || nothing}
		>
			<div class="blockquote__quote">
				<slot></slot>
			</div>
			<slot class="blockquote__attribution"
				name="attribution"
				?hidden=${!component._hasAttribution}
				@slotchange=${component._handleAttributionSlotChange}
			></slot>
		</blockquote>
	`;
}
