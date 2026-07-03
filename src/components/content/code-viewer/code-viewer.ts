/**
 * Nederlandse Digitale Dienst Code Viewer Component (Lit + TypeScript)
 *
 * A read-only block of code/text built on a non-editable CodeMirror 6 view.
 * Visually pairs with nldd-code-editor (same engine, same token palette).
 *
 * Whitespace is preserved; long lines scroll horizontally by default. Set
 * `wrap` to break long lines onto the next visual line.
 *
 * ## Syntax highlighting
 * Set `language` to one of the supported grammars (yaml, json, javascript,
 * typescript, css, html, xml, bash, markdown, rust, gherkin, toml, sql,
 * python) to highlight the content. Without `language` the content renders
 * plain. Grammars are loaded lazily on first use, so a page that never sets
 * `language` ships zero grammar code.
 *
 * ### Theming
 * Token colors are the `--components-code-viewer-token-*` custom properties
 * (shared with the editor via the CodeMirror highlight style). Override them
 * per-instance to swap the theme.
 *
 * @element nldd-code-viewer
 *
 * @attr {'simple'|'box'} variant - Visual style. `box` (default) is a framed
 *   card with rounded corners, padding, fill, and a 1px border ring. `simple`
 *   drops the entire frame — use when embedding inside a parent surface.
 * @attr {'tinted'|'base'} background - Surface fill when `variant="box"`.
 * @attr {string} language - Grammar to highlight with. Empty disables highlighting.
 * @attr {boolean} no-copy - Hide the copy-to-clipboard button (shown by default).
 * @attr {boolean} wrap - Wrap long lines instead of horizontal scroll
 *
 * @slot - Default slot for the code/text content (also the copy source)
 */
import { customElement, property, state } from 'lit/decorators.js';
import { reflectNonDefault } from '../../../utilities/reflect-non-default.js';
import { EditorView } from '@codemirror/view';
import { Compartment, EditorState, type Extension } from '@codemirror/state';
import { NLDDCodeMirrorElement } from '../../../utilities/codemirror/codemirror-element.js';
import { nlddCodeMirrorTheme } from '../../../utilities/codemirror/theme.js';
import { loadLanguage } from '../../../utilities/codemirror/languages.js';
import { codeViewerStyles } from './code-viewer.styles.js';
import { codeViewerTemplate } from './code-viewer.template.js';
import { nlddCodeViewerTranslations } from './code-viewer.i18n.js';
import type { NLDDCodeViewerTranslations } from './code-viewer.i18n.js';
import { onColorSchemeChange, forceScrollLayerRepaint } from '../../../utilities/color-scheme-repaint.js';
import '../../actions/icon-button/icon-button.js';
import '../tooltip/tooltip.js';

export type CodeViewerCopyState = 'idle' | 'success' | 'failure';

const COPY_FEEDBACK_DURATION_MS = 2000;

@customElement('nldd-code-viewer')
export class NLDDCodeViewer extends NLDDCodeMirrorElement {
	static override styles = codeViewerStyles;

	/** Visual style. `box` (default) is a framed card; `simple` drops the frame. */
	@property({ reflect: true, converter: reflectNonDefault<'simple' | 'box'>('box') })
	variant: 'simple' | 'box' = 'box';

	/** Surface fill when `variant="box"`. */
	@property({ reflect: true, converter: reflectNonDefault<'tinted' | 'base'>('tinted') })
	background: 'tinted' | 'base' = 'tinted';

	@property({ reflect: true, converter: reflectNonDefault<string>('') })
	language = '';

	/** Hide the copy-to-clipboard button (shown by default). */
	@property({ type: Boolean, reflect: true, attribute: 'no-copy' })
	noCopy = false;

	@property({ type: Boolean, reflect: true })
	wrap = false;

	/** Override one or more translation keys. Unspecified keys fall back to Dutch. */
	@property({ type: Object })
	translations: Partial<NLDDCodeViewerTranslations> = {};

	@state()
	_isScrollable = false;

	@state()
	_copyState: CodeViewerCopyState = 'idle';

	private _languageCompartment = new Compartment();
	private _wrapCompartment = new Compartment();
	private _languagePending: Promise<void> = Promise.resolve();
	private _unsubscribeScheme?: () => void;
	private _resizeObserver?: ResizeObserver;
	private _copyResetTimer?: ReturnType<typeof setTimeout>;

	protected getEditorParent(): HTMLElement | null | undefined {
		return this.shadowRoot?.querySelector('.code-viewer') as HTMLElement | null;
	}

	protected buildExtensions(): Extension[] {
		return [
			nlddCodeMirrorTheme,
			EditorView.editable.of(false),
			EditorState.readOnly.of(true),
			this._wrapCompartment.of(this.wrap ? EditorView.lineWrapping : []),
			this._languageCompartment.of([]),
		];
	}

	override render() {
		return codeViewerTemplate(this);
	}

	override connectedCallback(): void {
		super.connectedCallback();
		/* CodeMirror's scroller caches off-screen tiles; light-dark() colors
		 * don't reliably repaint on a color-scheme flip, so drop the layer on
		 * each scheme change to repaint clean. */
		this._unsubscribeScheme = onColorSchemeChange(() => this._repaint());
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
		this.mountEditor(this._getRawText());
		this.onEditorMounted();
	}

	/* Runs on the initial mount and on every re-mount after a detach/reattach
	 * (e.g. Vue <KeepAlive>), so the scroll observer and language survive the
	 * view being rebuilt. */
	protected override onEditorMounted(): void {
		const scroller = this.view?.scrollDOM;
		if (scroller) {
			this._resizeObserver?.disconnect();
			this._resizeObserver = new ResizeObserver(() => this._updateScrollable());
			this._resizeObserver.observe(scroller);
		}
		if (this.language) this._applyLanguage();
		this._updateScrollable();
	}

	override updated(changed: Map<string, unknown>): void {
		if (!this.view) return;
		if (changed.has('language')) this._applyLanguage();
		if (changed.has('wrap')) {
			this.reconfigure(this._wrapCompartment, this.wrap ? EditorView.lineWrapping : []);
			this._updateScrollable();
		}
	}

	_onSlotChange(): void {
		this.setDoc(this._getRawText());
		this._updateScrollable();
	}

	public _t(key: keyof NLDDCodeViewerTranslations): string {
		return this.translations[key] ?? nlddCodeViewerTranslations[key];
	}

	/* Lazy grammar loading is async; surface the in-flight load through
	 * updateComplete so consumers (and tests) can await el.updateComplete and
	 * see the final highlighted output. */
	override async getUpdateComplete(): Promise<boolean> {
		const result = await super.getUpdateComplete();
		await this._languagePending;
		return result;
	}

	private _applyLanguage(): void {
		this._languagePending = this._runLanguage();
	}

	private async _runLanguage(): Promise<void> {
		const lang = this.language;
		if (!lang) {
			this.reconfigure(this._languageCompartment, []);
			return;
		}
		const pending = loadLanguage(lang);
		if (!pending) {
			this.reconfigure(this._languageCompartment, []);
			return;
		}
		try {
			const support = await pending;
			// The attribute may have changed while the grammar was loading.
			if (this.language === lang) {
				this.reconfigure(this._languageCompartment, support);
				this._updateScrollable();
			}
		} catch {
			this.reconfigure(this._languageCompartment, []);
		}
	}

	/* The horizontally-scrollable region is CodeMirror's scroller. Mark it
	 * focusable + labelled when content overflows so keyboard and screen-reader
	 * users can reach and announce it (WCAG 2.1.1). */
	private _updateScrollable(): void {
		const scroller = this.view?.scrollDOM;
		if (!scroller) return;
		const scrollable = !this.wrap && scroller.scrollWidth > scroller.clientWidth;
		this._isScrollable = scrollable;
		if (scrollable) {
			scroller.setAttribute('tabindex', '0');
			scroller.setAttribute('role', 'region');
			scroller.setAttribute('aria-label', this._t('components.code-viewer.region-label'));
		} else {
			scroller.removeAttribute('tabindex');
			scroller.removeAttribute('role');
			scroller.removeAttribute('aria-label');
		}
	}

	/* Read the raw slot text — what the user would have typed — not the
	 * rendered (tokenised) CodeMirror DOM. Also the document source. */
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

	/** Escape on the open feedback tooltip dismisses it early (WCAG 1.4.13). */
	public _onCopyDismiss(): void {
		clearTimeout(this._copyResetTimer);
		this._copyState = 'idle';
	}

	private _repaint(): void {
		const scroller = this.view?.scrollDOM;
		if (scroller) forceScrollLayerRepaint(scroller);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-code-viewer': NLDDCodeViewer;
	}
}
