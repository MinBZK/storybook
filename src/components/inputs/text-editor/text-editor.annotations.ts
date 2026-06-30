import { Decoration, type DecorationSet, EditorView, WidgetType } from '@codemirror/view';
import { StateEffect, StateField, type Extension, type Range } from '@codemirror/state';

/* W3C-style annotation overlay. Annotations live outside the markdown (the text
 * stays clean); the consumer supplies them and the component renders them as a
 * dashed underline + light tint with a count badge. Anchored by character
 * offsets, mapped through edits, with the quote kept for re-anchoring (later). */

export interface Annotation {
	/** Stable id, owned by the consumer. */
	id: string;
	/** Character offset range in the document (W3C TextPositionSelector). */
	start: number;
	end: number;
	/** The quoted text, kept for re-anchoring after edits (TextQuoteSelector). */
	quote?: string;
}

interface Anchored {
	id: string;
	from: number;
	to: number;
}

/** Replace the editor's annotation set. */
export const setAnnotations = StateEffect.define<readonly Annotation[]>();

function anchorAll(list: readonly Annotation[], docLength: number): Anchored[] {
	return list
		.map((annotation) => ({
			id: annotation.id,
			from: Math.max(0, Math.min(annotation.start, docLength)),
			to: Math.max(0, Math.min(annotation.end, docLength)),
		}))
		.filter((anchored) => anchored.to > anchored.from);
}

const annotationField = StateField.define<Anchored[]>({
	create: () => [],
	update: (value, tr) => {
		for (const effect of tr.effects) {
			if (effect.is(setAnnotations)) return anchorAll(effect.value, tr.state.doc.length);
		}
		if (tr.docChanged) {
			// Map the anchors so the annotation doesn't grow when typing at either
			// boundary: from sticks right (assoc 1), to sticks left (assoc -1).
			// Typing just after the badge then lands outside the annotation.
			return value
				.map((anchored) => ({
					id: anchored.id,
					from: tr.changes.mapPos(anchored.from, 1),
					to: tr.changes.mapPos(anchored.to, -1),
				}))
				.filter((anchored) => anchored.to > anchored.from);
		}
		return value;
	},
});

// Annotations on the same text merge into one underline + one count badge.
interface Group {
	from: number;
	to: number;
	ids: string[];
}

function groupOverlapping(anchored: Anchored[]): Group[] {
	const groups: Group[] = [];
	for (const annotation of [...anchored].sort((a, b) => a.from - b.from || a.to - b.to)) {
		const last = groups[groups.length - 1];
		if (last && annotation.from <= last.to) {
			last.to = Math.max(last.to, annotation.to);
			last.ids.push(annotation.id);
		} else {
			groups.push({ from: annotation.from, to: annotation.to, ids: [annotation.id] });
		}
	}
	return groups;
}

class AnnotationBadge extends WidgetType {
	constructor(readonly ids: string[]) {
		super();
	}

	eq(other: AnnotationBadge): boolean {
		return other.ids.length === this.ids.length && other.ids.every((id, index) => id === this.ids[index]);
	}

	toDOM(): HTMLElement {
		// The nub sits inside the body tint (placed at the range end, side -1) so it
		// inherits the same yellow and wraps with the text — one cohesive block, like
		// the @ icon inside a mention chip.
		const badge = document.createElement('button');
		badge.className = 'cm-annotation-badge';
		badge.type = 'button';
		badge.dataset.annotations = this.ids.join(' ');
		// The count, always shown (1 for a single annotation, 2+ for a merged group).
		badge.textContent = String(this.ids.length);
		badge.setAttribute('aria-label', `${this.ids.length} annotatie${this.ids.length > 1 ? 's' : ''}`);
		return badge;
	}
}

// inclusiveEnd lets the nub widget (placed at the range end) nest *inside* this
// mark span, so it shares the tint and wraps together with the text.
const annotationMark = Decoration.mark({ class: 'cm-annotation', inclusiveEnd: true });
// When the whole annotation is selected, darken the base mark itself (including
// the nub it contains) — one uniform block, no detached right side.
const annotationFullSelectedMark = Decoration.mark({ class: 'cm-annotation cm-annotation-selected', inclusiveEnd: true });
// drawSelection paints the selection behind the text, so it's hidden under the
// tint; this darker-yellow mark renders a *partial* selected slice on top (it's
// a smaller range than the base, so it always nests inside and shows).
const annotationSelectedMark = Decoration.mark({ class: 'cm-annotation-selected' });

function buildAnnotationDecorations(
	anchored: Anchored[],
	sel: { from: number; to: number; empty: boolean },
): DecorationSet {
	const ranges: Range<Decoration>[] = [];
	for (const group of groupOverlapping(anchored)) {
		const fullySelected = !sel.empty && sel.from <= group.from && sel.to >= group.to;
		ranges.push((fullySelected ? annotationFullSelectedMark : annotationMark).range(group.from, group.to));
		// A partial selection darkens just the selected slice.
		if (!fullySelected && !sel.empty) {
			const from = Math.max(group.from, sel.from);
			const to = Math.min(group.to, sel.to);
			if (to > from) ranges.push(annotationSelectedMark.range(from, to));
		}
		// Nub at the end, inside the mark (side -1) so it shares the tint and wraps
		// with the text (operators like diff +/- would instead go at the start).
		ranges.push(Decoration.widget({ widget: new AnnotationBadge(group.ids), side: -1 }).range(group.to));
	}
	return Decoration.set(ranges, true);
}

// A field (not a computed facet) so it can also react to selection changes,
// which drive the darker-yellow selected slice.
const annotationDecorations = StateField.define<DecorationSet>({
	create: (state) => buildAnnotationDecorations(state.field(annotationField), state.selection.main),
	update: (value, tr) => {
		if (
			tr.docChanged ||
			!tr.startState.selection.eq(tr.state.selection) ||
			tr.effects.some((effect) => effect.is(setAnnotations))
		) {
			return buildAnnotationDecorations(tr.state.field(annotationField), tr.state.selection.main);
		}
		return value;
	},
	provide: (field) => EditorView.decorations.from(field),
});

/** The annotation overlay: anchoring + dashed-underline/tint/badge rendering. */
export const annotations: Extension = [annotationField, annotationDecorations];
