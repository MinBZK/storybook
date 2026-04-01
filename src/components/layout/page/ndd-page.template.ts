import { html, TemplateResult } from 'lit';
import type { NDDPage } from './ndd-page.js';

export function pageTemplate(component: NDDPage): TemplateResult {
	return html`
		<header class="page__header ${component._scrolled ? 'is-scrolled' : ''}">
			<slot name="header"></slot>
		</header>
		<main class="page__main">
			<slot></slot>
		</main>
		<footer class="page__footer">
			<slot name="footer"></slot>
		</footer>
	`;
}
