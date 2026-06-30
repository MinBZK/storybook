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
	private ghost: HTMLElement | null = null;

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
			// Default cursor (no grab handle) plus a translucent copy of the text.
			this.view.scrollDOM.style.cursor = 'default';
			this.showGhost(st.from, st.to);
		}
		this.moveGhost(event.clientX, event.clientY);
		// No drop cursor when outside the editor (the drop would be undone) or while
		// hovering inside the dragged range (a no-op target).
		const pos = this.isInside(event.clientX, event.clientY)
			? this.view.posAtCoords({ x: event.clientX, y: event.clientY })
			: null;
		const drop = pos === null || (pos >= st.from && pos <= st.to) ? null : pos;
		this.view.dispatch({ effects: setDropPos.of(drop) });
	};

	private onUp = (event: MouseEvent): void => {
		window.removeEventListener('mousemove', this.onMove, true);
		window.removeEventListener('mouseup', this.onUp, true);
		this.view.scrollDOM.style.cursor = '';
		this.clearGhost();
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
		if (this.isInside(event.clientX, event.clientY) && pos !== null && (pos < st.from || pos > st.to)) {
			const text = this.view.state.sliceDoc(st.from, st.to);
			const insertAt = pos > st.to ? pos - (st.to - st.from) : pos;
			this.view.dispatch({
				changes: [{ from: st.from, to: st.to }, { from: pos, insert: text }],
				selection: { anchor: insertAt, head: insertAt + text.length },
			});
		} else {
			// Dropped outside the editor (or back onto the selection): leave the text
			// where it was and keep it selected — effectively undoing the drag.
			this.view.dispatch({ selection: { anchor: st.from, head: st.to } });
		}
		this.view.focus();
	};

	private isInside(x: number, y: number): boolean {
		const r = this.view.scrollDOM.getBoundingClientRect();
		return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
	}

	// A translucent copy of the dragged text that follows the pointer.
	private showGhost(from: number, to: number): void {
		const ghost = document.createElement('div');
		ghost.className = 'cm-drag-ghost';
		// Show a mention as plain @Name — drop the markdown link wrapper and user id.
		ghost.textContent = this.view.state.sliceDoc(from, to).replace(/\[(@[^\]]*)\]\(user:[^)]*\)/g, '$1');
		this.view.dom.appendChild(ghost);
		this.ghost = ghost;
	}

	private moveGhost(x: number, y: number): void {
		if (this.ghost) {
			this.ghost.style.left = `${x + 12}px`;
			this.ghost.style.top = `${y + 12}px`;
		}
	}

	private clearGhost(): void {
		this.ghost?.remove();
		this.ghost = null;
	}

	destroy(): void {
		window.removeEventListener('mousemove', this.onMove, true);
		window.removeEventListener('mouseup', this.onUp, true);
		this.clearGhost();
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
