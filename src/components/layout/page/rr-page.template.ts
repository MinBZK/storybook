import { html, TemplateResult } from 'lit';
import type { RRPage } from './rr-page.js';

export function pageTemplate(component: RRPage): TemplateResult {
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
