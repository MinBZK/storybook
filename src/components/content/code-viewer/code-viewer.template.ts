import { html, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { NLDDCodeViewer } from './code-viewer.js';

export function codeViewerTemplate(component: NLDDCodeViewer): TemplateResult {
	// `language` is interpolated into a class name. Lit's tagged template
	// literal escapes attribute values, so a malicious string can't break
	// out of the attribute — but it can still produce a wonky class name.
	// We accept that since `language` is a developer-set identifier, not
	// user-supplied content.
	//
	// `unsafeHTML(_highlightedHtml)` injects the Prism output verbatim.
	// Prism escapes HTML entities in its input (`<` → `&lt;`) before
	// wrapping tokens in spans, so the only HTML in the output is the
	// span scaffolding Prism itself emits. Safe by construction.
	return html`<pre class="code-viewer"><slot @slotchange=${component._onSlotChange}></slot>${
		component.language && component._highlightedHtml
			? html`<code class="code__highlighted language-${component.language}">${unsafeHTML(component._highlightedHtml)}</code>`
			: ''
	}</pre>`;
}
