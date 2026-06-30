import { EditorView, ViewPlugin, Decoration, WidgetType } from '@codemirror/view';
import { StateEffect, StateField, type Extension } from '@codemirror/state';

/* Drag-to-move for selected text. The editor lives in a shadow DOM, where the
 * browser refuses to start a native drag of the selection (the document-level
 * selection is collapsed for shadow-tree selections), so the native HTML5 path
 * never fires. This reimplements it with pointer tracking: mousedown on the
 * selection → past a small threshold it becomes a drag → a drop cursor shows
 * where it will land → mouseup moves the text there. */

const setDropPos = StateEffect.define<number | null>();

class DropCursorWidget extends WidgetType {
	eq(): boolean {
		return true;
	}

	toDOM(): HTMLElement {
		const el = document.createElement('span');
		el.className = 'cm-drag-drop-cursor';
		return el;
	}
}
const dropWidget = Decoration.widget({ widget: new DropCursorWidget(), side: 1 });

// Holds the live drop position during a drag and draws the drop cursor there.
const dropPosField = StateField.define<number | null>({
	create: () => null,
	update(value, tr) {
		for (const effect of tr.effects) if (effect.is(setDropPos)) return effect.value;
		return value === null ? null : tr.changes.mapPos(value);
	},
	provide: (field) =>
		EditorView.decorations.from(field, (pos) =>
			pos === null ? Decoration.none : Decoration.set([dropWidget.range(pos)]),
		),
});

interface DragState {
	startX: number;
	startY: number;
	from: number;
	to: number;
	dragging: boolean;
}

class DragMove {
	private state: DragState | null = null;

	constructor(private readonly view: EditorView) {}

	start(event: MouseEvent): boolean {
		if (event.button !== 0 || event.shiftKey || event.altKey || event.metaKey || event.ctrlKey) return false;
		if (this.view.state.readOnly) return false;
		// Mentions own their own click (select-on-click); don't hijack it as a drag.
		if ((event.target as HTMLElement | null)?.closest?.('.cm-md-mention-chip')) return false;
		const sel = this.view.state.selection.main;
		if (sel.empty) return false;
		const pos = this.view.posAtCoords({ x: event.clientX, y: event.clientY });
		if (pos === null || pos < sel.from || pos > sel.to) return false; // not on the selection
		this.state = { startX: event.clientX, startY: event.clientY, from: sel.from, to: sel.to, dragging: false };
		window.addEventListener('mousemove', this.onMove, true);
		window.addEventListener('mouseup', this.onUp, true);
		event.preventDefault(); // we own this press; CM shouldn't start a new selection
		return true;
	}

	private onMove = (event: MouseEvent): void => {
		const st = this.state;
		if (!st) return;
		if (!st.dragging) {
			if (Math.abs(event.clientX - st.startX) + Math.abs(event.clientY - st.startY) < 4) return;
			st.dragging = true;
			this.view.scrollDOM.style.cursor = 'grabbing';
		}
		const pos = this.view.posAtCoords({ x: event.clientX, y: event.clientY });
		// No drop cursor while hovering inside the dragged range (a no-op target).
		const drop = pos === null || (pos >= st.from && pos <= st.to) ? null : pos;
		this.view.dispatch({ effects: setDropPos.of(drop) });
	};

	private onUp = (event: MouseEvent): void => {
		window.removeEventListener('mousemove', this.onMove, true);
		window.removeEventListener('mouseup', this.onUp, true);
		this.view.scrollDOM.style.cursor = '';
		const st = this.state;
		this.state = null;
		this.view.dispatch({ effects: setDropPos.of(null) });
		if (!st) return;
		const pos = this.view.posAtCoords({ x: event.clientX, y: event.clientY });
		if (!st.dragging) {
			// A plain click on the selection collapses the caret there.
			if (pos !== null) this.view.dispatch({ selection: { anchor: pos } });
			this.view.focus();
			return;
		}
		if (pos !== null && (pos < st.from || pos > st.to)) {
			const text = this.view.state.sliceDoc(st.from, st.to);
			const insertAt = pos > st.to ? pos - (st.to - st.from) : pos;
			this.view.dispatch({
				changes: [{ from: st.from, to: st.to }, { from: pos, insert: text }],
				selection: { anchor: insertAt, head: insertAt + text.length },
			});
		}
		this.view.focus();
	};

	destroy(): void {
		window.removeEventListener('mousemove', this.onMove, true);
		window.removeEventListener('mouseup', this.onUp, true);
	}
}

const dragMovePlugin = ViewPlugin.fromClass(DragMove, {
	eventHandlers: {
		mousedown(this: DragMove, event: MouseEvent) {
			return this.start(event);
		},
	},
});

/** Drag selected text to move it (shadow-DOM-safe; native DnD won't start here). */
export const dragToMove: Extension = [dropPosField, dragMovePlugin];
