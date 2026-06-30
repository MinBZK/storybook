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
 * toggleHeading/toggleBulletList/toggleQuote/toggleLink/runCommand to toggle, and
 * setHeading/setList for picker-style "set" semantics), reads the active formats
 * with getState(), listens to the nldd-text-editor-state event to render toggle
 * states, and forwards padding clicks with focusFromPoint(). Cmd/Ctrl+B/I/E/K are
 * bound out of the box. Commands keep focus on the editor. An @-mention typeahead
 * (mentionSource) collapses to an atomic chip, and a W3C-style annotation overlay
 * (annotations) marks ranges with a dashed underline, light tint and a count badge
 * without touching the underlying text.
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
 * @prop {MentionSource} mentionSource - Consumer-supplied @-mention candidate source (property only). Without it, @-typeahead is inert.
 * @attr {boolean} annotatable - Enable the annotation overlay (off by default). Annotations only render when this is set.
 * @prop {Annotation[]} annotations - Consumer-supplied annotation overlay (property only). Anchored by offset and mapped through edits; the text stays clean. Requires `annotatable`.
 *
 * @fires input                    - When the content changes (detail: { value })
 * @fires change                   - When the content is committed on blur (detail: { value })
 * @fires nldd-text-editor-state   - When the selection or content changes (detail: TextEditorState), for toolbar toggle state
 * @fires nldd-text-editor-mention - When an @-mention is inserted (detail: MentionInsertedDetail with id, label, from, to)
 */
import { LitElement, type PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import {
	EditorView,
	keymap,
	drawSelection,
	dropCursor,
	placeholder as cmPlaceholder,
} from '@codemirror/view';
import { Compartment, EditorState, type Extension } from '@codemirror/state';
import { defaultKeymap, history, historyKeymap, indentMore, indentLess } from '@codemirror/commands';
import { NLDDCodeMirrorElement } from '../../../utilities/codemirror/codemirror-element.js';
import { nlddCodeMirrorTheme } from '../../../utilities/codemirror/theme.js';
import { markdownEditing, mentionRangeAt, mentionRangeEndingAt, mentionRangeStartingAt } from './text-editor.markdown.js';
import { mentions, type MentionSource, type MentionInsertedDetail } from './text-editor.mentions.js';
import { annotations as annotationExtension, setAnnotations, type Annotation } from './text-editor.annotations.js';
import { dragToMove } from './text-editor.drag.js';
import {
	toggleInlineWrap,
	toggleHeading as cmToggleHeading,
	setHeading as cmSetHeading,
	toggleBulletList as cmToggleBulletList,
	setList as cmSetList,
	toggleQuote as cmToggleQuote,
	toggleLink as cmToggleLink,
	toggleCodeBlock as cmToggleCodeBlock,
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
export type { MentionCandidate, MentionSource, MentionInsertedDetail } from './text-editor.mentions.js';
export type { Annotation } from './text-editor.annotations.js';

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

	/** Consumer-supplied @-mention source: called with the text typed after `@`
	 *  and returns (a promise of) candidates. Property only (set via JS); without
	 *  it, @-typeahead is inert. */
	@property({ attribute: false })
	mentionSource?: MentionSource;

	/** Whether the annotation overlay is enabled. Off by default; set the
	 *  `annotatable` attribute to turn it on (so the comment affordance and the
	 *  overlay only appear when the consumer opts in). */
	@property({ type: Boolean, reflect: true })
	annotatable = false;

	/** Consumer-supplied annotations (W3C-style overlay). Property only (set via
	 *  JS). Render only when `annotatable` is on. The text stays clean; these
	 *  render as a light tint and a count badge, anchored by offset and mapped
	 *  through edits. */
	@property({ attribute: false })
	annotations: Annotation[] = [];

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
			mentions(() => this.mentionSource, (detail) => this._emitMention(detail)),
			annotationExtension,
			history(),
			drawSelection(),
			dropCursor(),
			dragToMove,
			keymap.of([
				{ key: 'Mod-b', run: (view) => { toggleInlineWrap(view, '**', 'StrongEmphasis'); return true; } },
				{ key: 'Mod-i', run: (view) => { toggleInlineWrap(view, '*', 'Emphasis'); return true; } },
				{ key: 'Mod-e', run: (view) => { toggleInlineWrap(view, '`', 'InlineCode'); return true; } },
				{ key: 'Mod-k', run: (view) => { cmToggleLink(view); return true; } },
				// A mention deletes in two steps: the first Backspace/Delete next to it
				// selects the whole token, the second removes it.
				{ key: 'Backspace', run: (view) => this._selectMentionBeforeDelete(view, -1) },
				{ key: 'Delete', run: (view) => this._selectMentionBeforeDelete(view, 1) },
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
		// Clicking a mention selects the whole token (capture, to beat CM's own
		// caret placement).
		this.view?.contentDOM.addEventListener('pointerdown', this._onMentionPointerDown, true);
		this._syncAnnotations();
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
			if (changed.has('annotations') || changed.has('annotatable')) {
				this._syncAnnotations();
			}
		}
		this._checkAccessibleLabel();
	}

	private _syncAnnotations(): void {
		// Annotations only render when the consumer opts in via `annotatable`.
		this.view?.dispatch({ effects: setAnnotations.of(this.annotatable ? this.annotations : []) });
	}

	// Two-step mention deletion: select the token on the first key, remove on the
	// second. dir -1 = Backspace (token ends at the caret), +1 = Delete (starts).
	private _selectMentionBeforeDelete(view: EditorView, dir: -1 | 1): boolean {
		const sel = view.state.selection.main;
		// A non-empty selection (e.g. an already-selected mention) → let the default
		// command delete it.
		if (!sel.empty) return false;
		const range =
			dir < 0 ? mentionRangeEndingAt(view.state, sel.head) : mentionRangeStartingAt(view.state, sel.head);
		if (!range) return false; // not next to a mention → normal backspace/delete
		view.dispatch({ selection: { anchor: range.from, head: range.to } });
		return true;
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

	/** Set the block to a heading level (0 = paragraph) without toggling — for a
	 *  picker where choosing a level always applies it. */
	setHeading(level: HeadingLevel): void {
		if (this.view) cmSetHeading(this.view, level);
	}

	toggleBulletList(): void {
		if (this.view) cmToggleBulletList(this.view);
	}

	/** Set the list type, replacing any existing list ('none' strips it) — for an
	 *  exclusive list picker. */
	setList(type: 'none' | 'bullet' | 'ordered'): void {
		if (this.view) cmSetList(this.view, type);
	}

	toggleQuote(): void {
		if (this.view) cmToggleQuote(this.view);
	}

	toggleLink(href = ''): void {
		if (this.view) cmToggleLink(this.view, href);
	}

	toggleCodeBlock(): void {
		if (this.view) cmToggleCodeBlock(this.view);
	}

	/** Nest the selected list item(s) one level deeper. Only acts inside a list —
	 *  indenting a plain paragraph would turn it into an indented code block. */
	indent(): void {
		if (!this.view) return;
		const active = this.getState().active;
		if (active.bulletList || active.orderedList) {
			indentMore(this.view);
			this.view.focus();
		}
	}

	/** Decrease the leading indentation of the selected lines. */
	outdent(): void {
		if (this.view) {
			indentLess(this.view);
			this.view.focus();
		}
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

	private _emitMention(detail: MentionInsertedDetail): void {
		this.dispatchEvent(new CustomEvent('nldd-text-editor-mention', {
			detail,
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

	private _onMentionPointerDown = (event: PointerEvent): void => {
		const chip = (event.target as HTMLElement | null)?.closest?.('.cm-md-mention-chip');
		if (!chip || !this.view) return;
		const range = mentionRangeAt(this.view.state, this.view.posAtDOM(chip));
		if (!range) return;
		event.preventDefault();
		event.stopPropagation();
		this.view.dispatch({ selection: { anchor: range.from, head: range.to } });
		this.view.focus();
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
