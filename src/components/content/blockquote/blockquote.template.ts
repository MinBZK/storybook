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
			<footer class="blockquote__attribution"
				?hidden=${!component._hasAttribution}
			>
				<slot name="attribution"
					@slotchange=${component._handleAttributionSlotChange}
				></slot>
			</footer>
		</blockquote>
	`;
}
