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
 * Set `language` to one of the supported grammars (yaml, json, javascript,
 * typescript, css, html, bash, markdown) to highlight the slot content
 * with Prism. Without `language` the slot content is rendered raw, no
 * highlighting applied. Grammars are loaded lazily on first use, so a
 * page that never sets `language` ships zero grammar code.
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
import { codeStyles } from './code.styles.js';
import { codeTemplate } from './code.template.js';

/* Map our public language names to Prism grammar loaders. `html` shares
 * the markup grammar (covers html/xml/svg). Static `import()` calls let
 * the bundler emit one chunk per file, so consumers only download
 * grammars they actually render. */
const GRAMMAR_LOADERS: Record<string, () => Promise<unknown>> = {
	yaml: () => import('prismjs/components/prism-yaml.js'),
	json: () => import('prismjs/components/prism-json.js'),
	javascript: () => import('prismjs/components/prism-javascript.js'),
	typescript: () => import('prismjs/components/prism-typescript.js'),
	css: () => import('prismjs/components/prism-css.js'),
	html: () => import('prismjs/components/prism-markup.js'),
	bash: () => import('prismjs/components/prism-bash.js'),
	markdown: () => import('prismjs/components/prism-markdown.js'),
};

const grammarLoads = new Map<string, Promise<unknown>>();

function loadGrammar(language: string): Promise<unknown> | undefined {
	const loader = GRAMMAR_LOADERS[language];
	if (!loader) return undefined;
	let pending = grammarLoads.get(language);
	if (!pending) {
		pending = loader();
		grammarLoads.set(language, pending);
	}
	return pending;
}

@customElement('nldd-code')
export class NLDDCode extends LitElement {
	static override styles = codeStyles;

	@property({ type: String, reflect: true })
	language = '';

	@property({ type: Boolean, reflect: true })
	wrap = false;

	@state()
	_highlightedHtml = '';

	private _highlightPending: Promise<void> = Promise.resolve();

	override render() {
		return codeTemplate(this);
	}

	_onSlotChange(e: Event) {
		this._refreshHighlight(e.target as HTMLSlotElement);
	}

	override updated(changed: Map<string, unknown>) {
		if (changed.has('language')) this._refreshHighlight();
	}

	/* Lazy grammar loading is async; surface the in-flight highlight
	 * through updateComplete so consumers (and tests) can `await
	 * el.updateComplete` and see the final highlighted output. */
	override async getUpdateComplete(): Promise<boolean> {
		const result = await super.getUpdateComplete();
		await this._highlightPending;
		return result;
	}

	private _refreshHighlight(slot?: HTMLSlotElement) {
		this._highlightPending = this._runHighlight(slot);
	}

	private async _runHighlight(slot?: HTMLSlotElement) {
		if (!this.language) {
			this._highlightedHtml = '';
			return;
		}
		const language = this.language;
		if (!Prism.languages[language]) {
			const pending = loadGrammar(language);
			if (!pending) {
				this._highlightedHtml = '';
				return;
			}
			await pending;
			if (this.language !== language) return;
		}
		const grammar = Prism.languages[language];
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
		this._highlightedHtml = Prism.highlight(text, grammar, language);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-code': NLDDCode;
	}
}
