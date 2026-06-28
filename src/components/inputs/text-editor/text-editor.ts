/**
 * Nederlandse Digitale Dienst Text Editor Component (Lit + TypeScript)
 *
 * A hybrid markdown editor built on CodeMirror 6 (via NLDDCodeMirrorElement):
 * the document stays plain markdown text, but formatting is shown inline (bold
 * is bold, headings are larger, links are coloured) while the syntax markers
 * stay visible, only dimmed — the iA Writer / Kirby approach. No WYSIWYG tree,
 * so the data stays portable.
 *
 * Default `variant="simple"` is bare (no frame, no focus ring) for use inside
 * a composition (e.g. a message field) that owns its chrome and focus; the
 * caret is a prominent accent. `variant="box"` adds a framed surface + focus
 * ring. `font` is `sans` (default, best for prose) or `mono`.
 *
 * Headless: there is no built-in toolbar. A consumer drives formatting via the
 * command methods (toggleBold/toggleItalic/toggleInlineCode/toggleStrikethrough/
 * toggleHeading/toggleBulletList/toggleQuote/toggleLink/runCommand), reads the
 * active formats with getState(), listens to the nldd-text-editor-state event
 * to render toggle states, and forwards padding clicks with focusFromPoint().
 * Cmd/Ctrl+B/I/E/K are bound out of the box. Commands keep focus on the editor.
 *
 * @element nldd-text-editor
 *
 * @attr {string} value            - Editor content (markdown)
 * @attr {string} placeholder      - Placeholder text shown while empty
 * @attr {string} input-id         - Sets the id on the editable element. Set automatically by nldd-form-field.
 * @attr {boolean} disabled        - Disabled state
 * @attr {string} name             - Field name for form submission
 * @attr {boolean} readonly        - Readonly state (focusable and selectable, not editable)
 * @attr {boolean} required        - Required state
 * @attr {boolean} wrap            - Wrap long lines (default true; prose wraps)
 * @attr {number} rows             - Minimum visible rows (the floor in every resize mode). Default: 6.
 * @attr {string} resize           - 'none' (fixed) | 'vertical' (default) | 'auto' (grow)
 * @attr {string} variant          - 'simple' (default, bare) | 'box' (framed surface)
 * @attr {string} font             - 'sans' (default) | 'mono'
 * @attr {string} accessible-label - Accessible label forwarded to the editor. Set automatically by nldd-form-field.
 *
 * @fires input                  - When the content changes (detail: { value })
 * @fires change                 - When the content is committed on blur (detail: { value })
 * @fires nldd-text-editor-state - When the selection or content changes (detail: TextEditorState), for toolbar toggle state
 */
import { LitElement, type PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import {
	EditorView,
	keymap,
	drawSelection,
	placeholder as cmPlaceholder,
} from '@codemirror/view';
import { Compartment, EditorState, type Extension } from '@codemirror/state';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { NLDDCodeMirrorElement } from '../../../utilities/codemirror/codemirror-element.js';
import { nlddCodeMirrorTheme } from '../../../utilities/codemirror/theme.js';
import { markdownEditing } from './text-editor.markdown.js';
import {
	toggleInlineWrap,
	toggleHeading as cmToggleHeading,
	toggleBulletList as cmToggleBulletList,
	toggleQuote as cmToggleQuote,
	toggleLink as cmToggleLink,
	readActiveFormats,
	EMPTY_FORMATS,
	type HeadingLevel,
	type TextEditorState,
} from './text-editor.commands.js';
import { textEditorStyles } from './text-editor.styles.js';
import { textEditorTemplate } from './text-editor.template.js';

export type ResizeMode = 'none' | 'vertical' | 'auto';
export type TextEditorVariant = 'box' | 'simple';
export type TextEditorFont = 'sans' | 'mono';
export type { HeadingLevel, TextEditorState, TextEditorActiveFormats } from './text-editor.commands.js';

@customElement('nldd-text-editor')
export class NLDDTextEditor extends NLDDCodeMirrorElement {
	static formAssociated = true;

	static override shadowRootOptions = {
		...LitElement.shadowRootOptions,
		delegatesFocus: true,
	};

	static override styles = textEditorStyles;

	private _internals = this.attachInternals();
	private _initialValue = '';
	private _valueAtFocus = '';
	private _accessibleLabelWarned = false;

	@property({ type: String })
	value = '';

	@property({ type: String, attribute: 'input-id' })
	inputId = '';

	@property({ type: String })
	placeholder = '';

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: String, reflect: true })
	name = '';

	@property({ type: Boolean, reflect: true })
	readonly = false;

	@property({ type: Boolean, reflect: true })
	required = false;

	@property({ type: Boolean, reflect: true })
	wrap = true;

	@property({ type: Number })
	rows = 6;

	@property({ type: String, reflect: true })
	resize: ResizeMode = 'vertical';

	@property({ type: String, reflect: true })
	variant: TextEditorVariant = 'simple';

	@property({ type: String, reflect: true })
	font: TextEditorFont = 'sans';

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	@query('.text-editor')
	private _container!: HTMLElement;

	private _editableCompartment = new Compartment();
	private _wrapCompartment = new Compartment();
	private _placeholderCompartment = new Compartment();
	private _attrsCompartment = new Compartment();

	protected getEditorParent(): HTMLElement | null | undefined {
		return this._container;
	}

	protected buildExtensions(): Extension[] {
		return [
			nlddCodeMirrorTheme,
			markdownEditing,
			history(),
			drawSelection(),
			keymap.of([
				{ key: 'Mod-b', run: (view) => { toggleInlineWrap(view, '**', 'StrongEmphasis'); return true; } },
				{ key: 'Mod-i', run: (view) => { toggleInlineWrap(view, '*', 'Emphasis'); return true; } },
				{ key: 'Mod-e', run: (view) => { toggleInlineWrap(view, '`', 'InlineCode'); return true; } },
				{ key: 'Mod-k', run: (view) => { cmToggleLink(view); return true; } },
				...defaultKeymap,
				...historyKeymap,
			]),
			this._placeholderCompartment.of(this._placeholderExtension()),
			this._wrapCompartment.of(this.wrap ? EditorView.lineWrapping : []),
			this._editableCompartment.of(this._editableExtension()),
			this._attrsCompartment.of(this._attrsExtension()),
			EditorView.updateListener.of((u) => {
				if (u.docChanged) this._onDocChanged();
				if (u.docChanged || u.selectionSet) this._emitState();
			}),
			EditorView.domEventHandlers({
				focus: () => {
					this._valueAtFocus = this.value;
				},
				blur: () => {
					if (this.value !== this._valueAtFocus) this._emitChange();
				},
			}),
		];
	}

	private _editableExtension(): Extension {
		const editable = !this.disabled;
		const readOnly = this.disabled || this.readonly;
		return [EditorView.editable.of(editable), EditorState.readOnly.of(readOnly)];
	}

	private _placeholderExtension(): Extension {
		return this.placeholder ? cmPlaceholder(this.placeholder) : [];
	}

	private _attrsExtension(): Extension {
		const attrs: Record<string, string> = {};
		if (this.accessibleLabel) attrs['aria-label'] = this.accessibleLabel;
		if (this.inputId) attrs['id'] = this.inputId;
		return EditorView.contentAttributes.of(attrs);
	}

	override firstUpdated(): void {
		this._initialValue = this.value;
		this.style.setProperty('--_rows', String(this.rows));
		this.mountEditor(this.value);
		// A press on the scroller's own padding (outside .cm-content) doesn't
		// place a caret; forward it to the nearest line.
		this.view?.scrollDOM.addEventListener('pointerdown', this._onScrollerPointerDown);
		this._internals.setFormValue(this.value);
		this._checkAccessibleLabel();
	}

	override updated(changed: PropertyValues): void {
		if (changed.has('rows')) {
			this.style.setProperty('--_rows', String(this.rows));
		}
		if (this.view) {
			if (changed.has('value')) {
				this.setDoc(this.value);
				this._internals.setFormValue(this.value);
			}
			if (changed.has('disabled') || changed.has('readonly')) {
				this.reconfigure(this._editableCompartment, this._editableExtension());
			}
			if (changed.has('wrap')) {
				this.reconfigure(this._wrapCompartment, this.wrap ? EditorView.lineWrapping : []);
			}
			if (changed.has('placeholder')) {
				this.reconfigure(this._placeholderCompartment, this._placeholderExtension());
			}
			if (changed.has('accessibleLabel') || changed.has('inputId')) {
				this.reconfigure(this._attrsCompartment, this._attrsExtension());
			}
		}
		this._checkAccessibleLabel();
	}


	/* # Headless command API */

	toggleBold(): void {
		if (this.view) toggleInlineWrap(this.view, '**', 'StrongEmphasis');
	}

	toggleItalic(): void {
		if (this.view) toggleInlineWrap(this.view, '*', 'Emphasis');
	}

	toggleInlineCode(): void {
		if (this.view) toggleInlineWrap(this.view, '`', 'InlineCode');
	}

	toggleStrikethrough(): void {
		if (this.view) toggleInlineWrap(this.view, '~~', 'Strikethrough');
	}

	toggleHeading(level: HeadingLevel): void {
		if (this.view) cmToggleHeading(this.view, level);
	}

	toggleBulletList(): void {
		if (this.view) cmToggleBulletList(this.view);
	}

	toggleQuote(): void {
		if (this.view) cmToggleQuote(this.view);
	}

	toggleLink(href = ''): void {
		if (this.view) cmToggleLink(this.view, href);
	}

	/** Escape hatch: run a command by name (bold, italic, inlineCode,
	 *  strikethrough, bulletList, quote, heading [payload: level], link
	 *  [payload: href]). */
	runCommand(name: string, payload?: unknown): void {
		switch (name) {
			case 'bold': this.toggleBold(); break;
			case 'italic': this.toggleItalic(); break;
			case 'inlineCode': this.toggleInlineCode(); break;
			case 'strikethrough': this.toggleStrikethrough(); break;
			case 'bulletList': this.toggleBulletList(); break;
			case 'quote': this.toggleQuote(); break;
			case 'heading': this.toggleHeading((typeof payload === 'number' ? payload : 1) as HeadingLevel); break;
			case 'link': this.toggleLink(typeof payload === 'string' ? payload : ''); break;
		}
	}

	/** The formats active at the current selection (drives a toolbar's state). */
	getState(): TextEditorState {
		return {
			active: this.view ? readActiveFormats(this.view) : { ...EMPTY_FORMATS },
			empty: this.view ? this.view.state.selection.main.empty : true,
		};
	}

	private _emitState(): void {
		this.dispatchEvent(new CustomEvent('nldd-text-editor-state', {
			detail: this.getState(),
			bubbles: true,
			composed: true,
		}));
	}


	/* # Internals */

	private _onScrollerPointerDown = (event: PointerEvent): void => {
		if (event.target !== this.view?.scrollDOM) return;
		this.focusFromPoint(event.clientX, event.clientY);
		event.preventDefault();
	};

	private _onDocChanged(): void {
		const text = this.doc;
		if (text === this.value) return;
		this.value = text;
		this._internals.setFormValue(text);
		this.dispatchEvent(new CustomEvent('input', {
			detail: { value: text },
			bubbles: true,
			composed: true,
		}));
	}

	private _emitChange(): void {
		this.dispatchEvent(new CustomEvent('change', {
			detail: { value: this.value },
			bubbles: true,
			composed: true,
		}));
	}

	private _checkAccessibleLabel(): void {
		if (this._accessibleLabelWarned) return;
		if (this.accessibleLabel || this.inputId) return;
		this._accessibleLabelWarned = true;
		console.warn('<nldd-text-editor>: No accessible-label or input-id provided. Use nldd-form-field for labeled usage, or set accessible-label for screen reader accessibility (WCAG SC 4.1.2).');
	}

	formResetCallback(): void {
		this.value = this._initialValue;
	}

	formDisabledCallback(disabled: boolean): void {
		this.disabled = disabled;
	}

	formStateRestoreCallback(state: File | string | FormData | null): void {
		if (typeof state === 'string') this.value = state;
	}

	override render() {
		return textEditorTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-text-editor': NLDDTextEditor;
	}
}
