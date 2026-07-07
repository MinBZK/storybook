import { LitElement } from 'lit';
import { EditorView } from '@codemirror/view';
import { EditorState, type Compartment, type Extension } from '@codemirror/state';

/**
 * Shared base for design-system editors built on CodeMirror 6
 * (nldd-code-editor, nldd-code-viewer, nldd-text-editor).
 *
 * It owns the EditorView lifecycle, mounts the view inside the component's
 * shadow root (so CodeMirror's generated styles and selection stay scoped),
 * and offers small helpers for document and compartment updates. Subclasses
 * provide the parent element and the extension set; everything component
 * specific (form association, public attributes, events) lives there.
 */
export abstract class NLDDCodeMirrorElement extends LitElement {
	protected view?: EditorView;

	/** True once the view has been mounted at least once — drives re-mount on reconnect. */
	private _hasMounted = false;

	/** Document captured on disconnect so a re-mount restores the live content. */
	private _preservedDoc?: string;

	/** The shadow-DOM element the EditorView mounts into. */
	protected abstract getEditorParent(): HTMLElement | null | undefined;

	/** The full extension set for the initial EditorState. */
	protected abstract buildExtensions(): Extension[];

	/** Current document text, or '' before the view exists. */
	protected get doc(): string {
		return this.view ? this.view.state.doc.toString() : '';
	}

	protected mountEditor(initialDoc: string): void {
		const parent = this.getEditorParent();
		if (!parent || this.view) return;
		this.view = new EditorView({
			state: EditorState.create({ doc: initialDoc, extensions: this.buildExtensions() }),
			parent,
			// Mount in the shadow root so getSelection()/focus stay scoped and
			// CodeMirror's StyleModule injects into this root, not the document.
			root: this.shadowRoot ?? undefined,
		});
		this._hasMounted = true;
	}

	/**
	 * Per-mount setup hook, called right after the view is created — on the
	 * initial mount (from the subclass `firstUpdated`) and on every re-mount
	 * after a detach/reattach. Subclasses (re)attach observers, DOM listeners
	 * and language grammars here so they survive being moved in the DOM.
	 * Default: no-op.
	 */
	protected onEditorMounted(): void {}

	protected destroyEditor(): void {
		this.view?.destroy();
		this.view = undefined;
	}

	/** Replace the whole document (used by the `value` property setter). */
	protected setDoc(text: string): void {
		const view = this.view;
		if (!view || view.state.doc.toString() === text) return;
		view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: text } });
	}

	/** Swap a single compartment at runtime (language, readonly, wrap, …). */
	protected reconfigure(compartment: Compartment, extension: Extension): void {
		this.view?.dispatch({ effects: compartment.reconfigure(extension) });
	}

	/**
	 * Focus the editor itself, not the host. delegatesFocus handles a click or tab
	 * into the host, but a programmatic host.focus() is routed straight to
	 * CodeMirror here, whose contenteditable delegatesFocus does not reliably
	 * target.
	 */
	override focus(): void {
		this.view?.focus();
	}

	/**
	 * Focus the editor and place the caret on the line nearest a viewport point.
	 * Lets a wrapping composition forward clicks from its own padding —
	 * `editor.focusFromPoint(event.clientX, event.clientY)` — so a layout
	 * container can own the surrounding space without the editor knowing about
	 * it. No-op on a non-editable view.
	 */
	focusFromPoint(x: number, y: number): void {
		const view = this.view;
		if (!view) return;
		const pos = view.posAtCoords({ x, y }, false) ?? view.state.doc.length;
		view.dispatch({ selection: { anchor: pos } });
		view.focus();
	}

	override connectedCallback(): void {
		super.connectedCallback();
		// A detach/reattach — Vue <KeepAlive>, a moved subtree, a <details> toggle —
		// runs disconnectedCallback (which destroyed the view) without re-running
		// Lit's one-shot firstUpdated. Rebuild the view from the preserved document
		// so the editor comes back populated instead of blank until a page reload.
		if (this._hasMounted && !this.view) {
			this.mountEditor(this._preservedDoc ?? '');
			if (this.view) this.onEditorMounted();
		}
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		// Capture the live document before the view is torn down so a later
		// re-mount (see connectedCallback) restores exactly what was on screen.
		if (this.view) this._preservedDoc = this.doc;
		this.destroyEditor();
	}
}
