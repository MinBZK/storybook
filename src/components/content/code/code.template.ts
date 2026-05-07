import { html, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { NLDDCode } from './code.js';

export function codeTemplate(component: NLDDCode): TemplateResult {
	return html`<pre class="code"><slot @slotchange=${component._onSlotChange}></slot>${
		component.language && component._highlightedHtml
			? html`<code class="code__highlighted language-${component.language}">${unsafeHTML(component._highlightedHtml)}</code>`
			: ''
	}</pre>`;
}
