import { Annotation, EditorSelection, Prec, type Extension } from '@codemirror/state';
import { EditorView, RectangleMarker, getDrawSelectionConfig, keymap, layer, type Command } from '@codemirror/view';
import { bareUrlEndsAt } from './text-editor.links.js';

/* The caret, drawn on a side that does not depend on how it got there.
 *
 * CodeMirror draws a cursor at `coordsAtPos(head, assoc)`, and `assoc` records
 * the direction the caret arrived from: from the left it measures the right edge
 * of the glyph before the position, from the right the left edge of the glyph
 * after it. For upright text those edges coincide. For italics they do not, since
 * a slanted glyph overhangs its own advance, and Safari rounds each edge to a
 * whole pixel on top of that. Arrow left and arrow right onto the same position
 * then land the caret a pixel apart, which reads as a caret that will not stay
 * put.
 *
 * At a widget (a link badge) or a line wrap the two sides are genuinely
 * different places and the direction must decide. So the rule is not "always
 * one side" but "one side, unless the sides are far enough apart to mean
 * something". And a widget on one document position is made to feel like a
 * character of its own: the arrow keys step from one side of it to the other,
 * Backspace and Delete step over it rather than eating past it, and typing
 * keeps the caret on the side the text went. */

/** Below this the two edges of one position are the same place drawn twice, and
 *  only glyph overhang and pixel rounding tell them apart. A widget is a full
 *  icon wide and a line wrap is a line away, so neither comes near it. */
const GLYPH_NOISE_PX = 2;

/** The side to draw the caret on when the selection does not say (assoc 0),
 *  taken from what the last transaction did. Typing and a backward delete leave
 *  the caret at the end of what was just edited, so on the side that text is:
 *  the left. Typing the last letter of a URL must leave the caret against the
 *  URL, not past the open-link badge. A forward delete leaves it where the
 *  removed text began: the right. Kept here rather than on the selection, since
 *  an edit's transaction carries no direction. */
const sideHint = new WeakMap<EditorView, -1 | 1>();

/** The side a step-over asks for. Carried as an annotation, since the assoc
 *  on the dispatched cursor does not survive the transaction: a later filter
 *  rebuilds the selection without it. */
const caretSide = Annotation.define<-1 | 1>();

function edges(view: EditorView, head: number): { before: { left: number; top: number }; after: { left: number; top: number } } | null {
	const before = view.coordsAtPos(head, -1);
	const after = view.coordsAtPos(head, 1);
	return before && after ? { before, after } : null;
}

/** Whether `head` has a place on either side of a widget: the two sides are on
 *  one line and clearly apart. A line wrap puts them on different lines. */
export function sidesApart(view: EditorView, head: number): boolean {
	const e = edges(view, head);
	return e !== null && Math.abs(e.before.top - e.after.top) < 1 && Math.abs(e.before.left - e.after.left) > GLYPH_NOISE_PX;
}

/** The side the caret is drawn on at `head`: 1 unless the two sides are
 *  genuinely apart and the arrival direction, or the last edit, says "before". */
export function drawnAssoc(view: EditorView, head: number, assoc: number): -1 | 1 {
	const e = edges(view, head);
	if (e && Math.abs(e.before.top - e.after.top) < 1 && Math.abs(e.before.left - e.after.left) <= GLYPH_NOISE_PX) return 1;
	if (assoc) return assoc < 0 ? -1 : 1;
	return sideHint.get(view) ?? 1;
}

/** Puts the caret on `side` of the link badge it stands at, without moving it in
 *  the document. Nothing to do (so the key falls through to its usual command)
 *  when there is no badge with two sides here, or the caret is on that side
 *  already. Only the badge of a bare URL qualifies: a mention token or an
 *  annotation badge keeps its own Backspace and arrow behavior. */
function stepOver(side: -1 | 1): Command {
	return (view) => {
		const { main } = view.state.selection;
		if (!main.empty || !bareUrlEndsAt(view.state, main.head) || !sidesApart(view, main.head)) return false;
		if (drawnAssoc(view, main.head, main.assoc) === side) return false;
		view.dispatch({ selection: EditorSelection.cursor(main.head, side), annotations: caretSide.of(side), userEvent: 'select' });
		return true;
	};
}

const stepOverKeymap = Prec.high(keymap.of([
	{ key: 'ArrowLeft', run: stepOver(-1) },
	{ key: 'ArrowRight', run: stepOver(1) },
	{ key: 'Backspace', run: stepOver(-1) },
	{ key: 'Delete', run: stepOver(1) },
]));

const cursorLayer = layer({
	above: true,
	class: 'cm-nldd-cursorLayer',
	markers(view) {
		const { state } = view;
		const conf = getDrawSelectionConfig(state);
		const out: RectangleMarker[] = [];
		for (const r of state.selection.ranges) {
			if (!r.empty && !conf.drawRangeCursor) continue;
			const prim = r === state.selection.main;
			const className = prim ? 'cm-cursor cm-cursor-primary' : 'cm-cursor cm-cursor-secondary';
			const cursor = EditorSelection.cursor(r.head, drawnAssoc(view, r.head, r.assoc));
			out.push(...RectangleMarker.forRange(view, className, cursor));
		}
		return out;
	},
	update(update, dom) {
		if (update.docChanged || update.selectionSet) {
			let hint: -1 | 1 | null = null;
			for (const tr of update.transactions) {
				const asked = tr.annotation(caretSide);
				if (asked) hint = asked;
				else if (tr.isUserEvent('input') || tr.isUserEvent('delete.backward')) hint = -1;
				else if (tr.isUserEvent('delete.forward')) hint = 1;
				else if (tr.selection) hint = null;
			}
			if (hint) sideHint.set(update.view, hint);
			else sideHint.delete(update.view);
		}
		// Restart the blink on a selection change, the way CodeMirror's own layer
		// does, by flipping between its two identical keyframe sets.
		if (update.transactions.some((tr) => tr.selection)) {
			dom.style.animationName = dom.style.animationName === 'cm-blink' ? 'cm-blink2' : 'cm-blink';
		}
		return update.docChanged || update.selectionSet;
	},
	mount(dom, view) {
		dom.style.animationDuration = `${getDrawSelectionConfig(view.state).cursorBlinkRate}ms`;
	},
});

/** drawSelection() keeps drawing its own cursors in `.cm-cursorLayer`; this
 *  layer takes over the drawing and that one is hidden. Its selection layer,
 *  blink keyframes and native-caret suppression stay in force. The rules below
 *  mirror what CodeMirror's theme gives its own cursor layer. */
const theme = EditorView.theme({
	'.cm-cursorLayer': { display: 'none' },
	'.cm-nldd-cursorLayer': { pointerEvents: 'none' },
	'&.cm-focused > .cm-scroller > .cm-nldd-cursorLayer': { animation: 'steps(1) cm-blink 1.2s infinite' },
	'&.cm-focused > .cm-scroller > .cm-nldd-cursorLayer .cm-cursor': { display: 'block' },
});

export const stableCursor: Extension = [cursorLayer, stepOverKeymap, theme];
