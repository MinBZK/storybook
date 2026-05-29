/**
 * Nederlandse Digitale Dienst Code Viewer Component (Lit + TypeScript)
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
 * typescript, css, html, xml, bash, markdown, rust, gherkin, toml, sql,
 * python) to highlight the slot content
 * with Prism. Without `language` the slot content is rendered raw, no
 * highlighting applied. Grammars are loaded lazily on first use, so a
 * page that never sets `language` ships zero grammar code.
 *
 * ### Theming
 * Token colors are exposed as `--components-code-viewer-token-*` custom
 * properties on the host. Override them per-instance to swap the theme:
 *
 * ```css
 * nldd-code-viewer {
 *   --components-code-viewer-token-keyword-color: var(--my-purple);
 *   --components-code-viewer-token-string-color: var(--my-green);
 * }
 * ```
 *
 * @element nldd-code-viewer
 *
 * @attr {string} language - Grammar to highlight with (yaml, json, javascript, typescript, css, html, xml, bash, markdown, rust, gherkin, toml, sql, python). Empty disables highlighting.
 * @attr {boolean} wrap - Wrap long lines instead of horizontal scroll
 * @attr {boolean} no-box - Drop the rounded container, padding, background, and border ring. Use when embedding inside a parent that supplies its own surface.
 * @attr {string} background - 'tinted' (default), 'base', or 'transparent'. Only applies when the box is on. Use 'base' for a code block on a tinted parent; 'transparent' for a frame with no fill (border ring still shown).
 * @attr {boolean} no-copy - Hide the copy-to-clipboard button (shown by default).
 *
 * @slot - Default slot for the code/text content
 */
import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import Prism from 'prismjs';
import { codeViewerStyles } from './code-viewer.styles.js';
import { codeViewerTemplate } from './code-viewer.template.js';
import { nlddCodeViewerTranslations } from './code-viewer.i18n.js';
import type { NLDDCodeViewerTranslations } from './code-viewer.i18n.js';
import { onColorSchemeChange, forceScrollLayerRepaint } from '../../../utilities/color-scheme-repaint.js';
import '../../actions/icon-button/icon-button.js';
import '../tooltip/tooltip.js';

export type CodeViewerCopyState = 'idle' | 'success' | 'failure';

const COPY_FEEDBACK_DURATION_MS = 2000;

/* Map our public language names to Prism grammar loaders. `html` and `xml`
 * share the markup grammar (covers html/xml/svg). Static `import()` calls let
 * the bundler emit one chunk per file, so consumers only download
 * grammars they actually render. */
const GRAMMAR_LOADERS: Record<string, () => Promise<unknown>> = {
	yaml: () => import('prismjs/components/prism-yaml.js'),
	json: () => import('prismjs/components/prism-json.js'),
	javascript: () => import('prismjs/components/prism-javascript.js'),
	typescript: () => import('prismjs/components/prism-typescript.js'),
	css: () => import('prismjs/components/prism-css.js'),
	html: () => import('prismjs/components/prism-markup.js'),
	xml: () => import('prismjs/components/prism-markup.js'),
	bash: () => import('prismjs/components/prism-bash.js'),
	markdown: () => import('prismjs/components/prism-markdown.js'),
	rust: () => import('prismjs/components/prism-rust.js'),
	gherkin: () => import('prismjs/components/prism-gherkin.js'),
	toml: () => import('prismjs/components/prism-toml.js'),
	sql: () => import('prismjs/components/prism-sql.js'),
	python: () => import('prismjs/components/prism-python.js'),
};

const grammarLoads = new Map<string, Promise<unknown>>();

function loadGrammar(language: string): Promise<unknown> | undefined {
	const loader = GRAMMAR_LOADERS[language];
	if (!loader) return undefined;
	let pending = grammarLoads.get(language);
	if (!pending) {
		// Drop the cache entry on failure so a subsequent attempt can retry
		// the import (e.g. transient chunk-load failure on a flaky network).
		pending = loader().catch((err) => {
			grammarLoads.delete(language);
			throw err;
		});
		grammarLoads.set(language, pending);
	}
	return pending;
}

@customElement('nldd-code-viewer')
export class NLDDCodeViewer extends LitElement {
	static override styles = codeViewerStyles;

	@property({ type: String, reflect: true })
	language = '';

	@property({ type: Boolean, reflect: true })
	wrap = false;

	/** Removes the container styling (rounded corners, padding, background). Consumer is expected to wrap in their own container. */
	@property({ type: Boolean, reflect: true, attribute: 'no-box' })
	noBox = false;

	/** Background color when the box is on. 'tinted' is the default; use 'base' on a tinted parent; 'transparent' for a frame with no fill (border ring still shown). */
	@property({ type: String, reflect: true })
	background: 'tinted' | 'base' | 'transparent' = 'tinted';

	/** Hide the copy-to-clipboard button (shown by default). */
	@property({ type: Boolean, reflect: true, attribute: 'no-copy' })
	noCopy = false;

	/** Override one or more translation keys. Unspecified keys fall back to Dutch. */
	@property({ type: Object })
	translations: Partial<NLDDCodeViewerTranslations> = {};

	@state()
	_highlightedHtml = '';

	@state()
	_isScrollable = false;

	@state()
	_copyState: CodeViewerCopyState = 'idle';

	private _highlightPending: Promise<void> = Promise.resolve();
	private _unsubscribeScheme?: () => void;
	private _resizeObserver?: ResizeObserver;
	private _copyResetTimer?: ReturnType<typeof setTimeout>;

	override render() {
		return codeViewerTemplate(this);
	}

	override connectedCallback(): void {
		super.connectedCallback();
		/* The .code-viewer block has overflow-x: auto and tends to scroll wide
		 * content. Browsers cache off-screen tiles for its scroll layer and
		 * don't reliably invalidate them when light-dark() colours flip with
		 * color-scheme, so scroll back after a theme switch shows stale
		 * paint. Drop the layer on each scheme change to repaint clean. */
		this._unsubscribeScheme = onColorSchemeChange(() => this._repaintCodeBlock());
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this._unsubscribeScheme?.();
		this._unsubscribeScheme = undefined;
		this._resizeObserver?.disconnect();
		this._resizeObserver = undefined;
		clearTimeout(this._copyResetTimer);
		this._copyResetTimer = undefined;
	}

	override firstUpdated(): void {
		const pre = this.shadowRoot?.querySelector('.code-viewer') as HTMLElement | null;
		if (!pre) return;
		this._resizeObserver = new ResizeObserver(() => this._updateScrollable(pre));
		this._resizeObserver.observe(pre);
		this._updateScrollable(pre);
	}

	_onSlotChange(e: Event) {
		this._refreshHighlight(e.target as HTMLSlotElement);
	}

	override updated(changed: Map<string, unknown>) {
		if (changed.has('language')) this._refreshHighlight();
		/* Re-evaluate scrollability whenever something other than _isScrollable
		 * itself changes. Content swaps (slot/highlight) and wrap toggles can
		 * change overflow without resizing the pre, so ResizeObserver alone
		 * misses them. */
		if (changed.size > 0 && !(changed.size === 1 && changed.has('_isScrollable'))) {
			const pre = this.shadowRoot?.querySelector('.code-viewer') as HTMLElement | null;
			if (pre) this._updateScrollable(pre);
		}
	}

	public _t(key: keyof NLDDCodeViewerTranslations): string {
		return this.translations[key] ?? nlddCodeViewerTranslations[key];
	}

	private _updateScrollable(pre: HTMLElement): void {
		this._isScrollable = !this.wrap && pre.scrollWidth > pre.clientWidth;
	}

	/* Read the raw, unhighlighted slot text. Prism wraps tokens in spans for
	 * the visual highlight, but the user clicking "copy" wants what they'd
	 * have typed — so go to the assigned light-DOM nodes, not the rendered
	 * shadow content. */
	private _getRawText(): string {
		const slot = this.shadowRoot?.querySelector('slot');
		if (!slot) return '';
		return slot.assignedNodes({ flatten: true })
			.map((n) => n.textContent ?? '')
			.join('');
	}

	public async _onCopyClick(): Promise<void> {
		try {
			await navigator.clipboard.writeText(this._getRawText());
			this._copyState = 'success';
		} catch {
			this._copyState = 'failure';
		}
		clearTimeout(this._copyResetTimer);
		this._copyResetTimer = setTimeout(() => {
			this._copyState = 'idle';
		}, COPY_FEEDBACK_DURATION_MS);
	}

	private _repaintCodeBlock(): void {
		const block = this.shadowRoot?.querySelector('.code-viewer') as HTMLElement | null;
		if (block) forceScrollLayerRepaint(block);
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
		'nldd-code-viewer': NLDDCodeViewer;
	}
}
