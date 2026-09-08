import { EditorSelection, type Extension } from '@codemirror/state';
import { EditorView, RectangleMarker, getDrawSelectionConfig, layer } from '@codemirror/view';

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
 * At a widget (a link badge, an annotation count) or a line wrap the two sides
 * are genuinely different places and the direction must decide. So the rule is
 * not "always one side" but "one side, unless the sides are far enough apart to
 * mean something". */

/** Below this the two edges of one position are the same place drawn twice, and
 *  only glyph overhang and pixel rounding tell them apart. A widget is a full
 *  icon wide and a line wrap is a line away, so neither comes near it. */
const GLYPH_NOISE_PX = 2;

/** Whether the last update was a backward delete. A backward delete leaves the
 *  caret with no arrival direction, which would draw it after a widget that
 *  sits at the position. But it just removed the character before the caret,
 *  so that is the side being edited: deleting the last letter of a URL should
 *  leave the caret against the URL, not past the open-link badge. Kept here
 *  rather than on the selection, because a later transaction filter (the one
 *  that keeps the caret out of atomic ranges) rebuilds the selection without
 *  its assoc. */
const afterBackwardDelete = new WeakMap<EditorView, boolean>();

/** The side the caret is drawn on at `head`: 1 unless the two sides are
 *  genuinely apart and either the arrival direction or a backward delete says
 *  "before". */
export function drawnAssoc(view: EditorView, head: number, assoc: number): -1 | 1 {
	const before = view.coordsAtPos(head, -1);
	const after = view.coordsAtPos(head, 1);
	if (before && after && Math.abs(before.top - after.top) < 1 && Math.abs(before.left - after.left) <= GLYPH_NOISE_PX) return 1;
	if (assoc < 0) return -1;
	if (assoc === 0 && afterBackwardDelete.get(view)) return -1;
	return 1;
}

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
			afterBackwardDelete.set(update.view, update.transactions.some((tr) => tr.isUserEvent('delete.backward')));
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

export const stableCursor: Extension = [cursorLayer, theme];
