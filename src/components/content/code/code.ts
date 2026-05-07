/**
 * Nederlandse Digitale Dienst Code Component (Lit + TypeScript)
 *
 * A block of monospaced text for code, traces, output dumps, etc.
 * Renders a styled `<pre>` with the design-system's monospace family,
 * tinted background and standard content color.
 *
 * Whitespace is preserved (`white-space: pre`); long lines scroll
 * horizontally by default. Set `wrap` to break long lines onto the
 * next visual line — useful for prose-like content (YAML strings,
 * formatted output) where horizontal scrolling is more disruptive
 * than wrapping.
 *
 * ## Syntax highlighting
 * Set `language` to one of the bundled grammars (yaml, json, javascript,
 * typescript, css, html, bash, markdown) to highlight the slot content
 * with Prism. Without `language` the slot content is rendered raw, no
 * highlighting applied.
 *
 * ### Theming
 * Token colors are exposed as `--components-code-token-*` custom
 * properties on the host. Override them per-instance to swap the theme:
 *
 * ```css
 * nldd-code {
 *   --components-code-token-keyword-color: var(--my-purple);
 *   --components-code-token-string-color: var(--my-green);
 * }
 * ```
 *
 * @element nldd-code
 *
 * @attr {string} language - Grammar to highlight with (yaml, json, javascript, typescript, css, html, bash, markdown). Empty disables highlighting.
 * @attr {boolean} wrap - Wrap long lines instead of horizontal scroll
 *
 * @slot - Default slot for the code/text content
 */
import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import Prism from 'prismjs';
import 'prismjs/components/prism-yaml.js';
import 'prismjs/components/prism-json.js';
import 'prismjs/components/prism-javascript.js';
import 'prismjs/components/prism-typescript.js';
import 'prismjs/components/prism-css.js';
import 'prismjs/components/prism-markup.js'; // covers html/xml/svg
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-markdown.js';
import { codeStyles } from './code.styles.js';
import { codeTemplate } from './code.template.js';

@customElement('nldd-code')
export class NLDDCode extends LitElement {
	static override styles = codeStyles;

	@property({ type: String, reflect: true })
	language = '';

	@property({ type: Boolean, reflect: true })
	wrap = false;

	@state()
	_highlightedHtml = '';

	override render() {
		return codeTemplate(this);
	}

	_onSlotChange(e: Event) {
		this._refreshHighlight(e.target as HTMLSlotElement);
	}

	override updated(changed: Map<string, unknown>) {
		if (changed.has('language')) this._refreshHighlight();
	}

	private _refreshHighlight(slot?: HTMLSlotElement) {
		if (!this.language) {
			this._highlightedHtml = '';
			return;
		}
		const grammar = Prism.languages[this.language];
		if (!grammar) {
			this._highlightedHtml = '';
			return;
		}
		const target = slot ?? this.shadowRoot?.querySelector('slot');
		if (!target) return;
		const text = target
			.assignedNodes({ flatten: true })
			.map((n) => n.textContent ?? '')
			.join('');
		this._highlightedHtml = Prism.highlight(text, grammar, this.language);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-code': NLDDCode;
	}
}
