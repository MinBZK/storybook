import { EditorView } from '@codemirror/view';

/** The caret rectangle CodeMirror renders for the plain text just before `dom` (an
 *  inline widget), taken from CodeMirror's own coordsAtPos. A widget's own box would
 *  otherwise make the caret beside it too tall or too short and flip its height with
 *  the cursor's arrival direction; measuring the neighboring text gives the exact
 *  body caret for whatever font and line the widget sits on.
 *
 *  Widgets use this in their `coordsAt` to place a stable, text-height caret at their
 *  edges. */
export function textCaretBox(dom: HTMLElement): { top: number; bottom: number } | null {
	const view = EditorView.findFromDOM(dom);
	if (!view) return null;
	const pos = view.posAtDOM(dom);
	const line = view.state.doc.lineAt(pos);
	// A widget that opens its line has no text before it to measure. Clamping to
	// line.from would ask for the coords of the widget's own position, which sends
	// CodeMirror right back into this coordsAt: the measure loop then never settles
	// and spins a core for as long as the editor lives.
	if (pos <= line.from) return null;
	// coordsAtPos reads layout; when a widget's coordsAt is itself invoked during an
	// update/measure pass, CM forbids that reentrant read and throws. Fall back to the
	// caller's own rect in that case rather than letting the exception escape.
	try {
		const coords = view.coordsAtPos(pos - 1, 1);
		return coords ? { top: coords.top, bottom: coords.bottom } : null;
	} catch {
		return null;
	}
}
