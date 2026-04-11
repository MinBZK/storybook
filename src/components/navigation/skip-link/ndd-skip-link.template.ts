import { html } from 'lit';
import type { NDDSkipLink } from './ndd-skip-link.js';

export function template(component: NDDSkipLink) {
	return html`
		<div class="skip-link">
			${component.href ? html`
				<a class="skip-link__control"
					href=${component.href}
				>
					${component._text}
				</a>
			` : html`
				<button class="skip-link__control"
					type="button"
					@click=${component._handleClick}
				>
					${component._text}
				</button>
			`}
		</div>
		<slot></slot>
	`;
}
