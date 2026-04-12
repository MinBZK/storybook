import { html } from 'lit';
import type { NDDSkipLink } from './ndd-skip-link.js';
import { sanitizeUrl } from '../../../utilities/sanitize-url.js';

export function template(component: NDDSkipLink) {
	const safeHref = sanitizeUrl(component.href);

	return html`
		<div class="skip-link">
			${safeHref ? html`
				<a class="skip-link__control"
					href=${safeHref}
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
