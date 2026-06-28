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
	}

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

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.destroyEditor();
	}
}
