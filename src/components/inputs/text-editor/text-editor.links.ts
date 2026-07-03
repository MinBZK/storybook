import {
	Decoration,
	ViewPlugin,
	WidgetType,
	type DecorationSet,
	type EditorView,
	type ViewUpdate,
} from '@codemirror/view';
import { RangeSetBuilder, type EditorState } from '@codemirror/state';
import { syntaxTree } from '@codemirror/language';
import type { SyntaxNode } from '@lezer/common';
import { MENTION_HREF_PREFIX } from './text-editor.mentions.js';
import { textCaretBox } from './text-editor.caret.js';
import '../../content/icon/icon.js';

/* Render a small "open in new tab" badge right after every real (non-mention)
 * link, so a link can be followed without leaving the editor — directly clickable,
 * no need to place the caret first. Mentions own their own click, so they're skipped. */

class LinkOpenWidget extends WidgetType {
	constructor(readonly href: string) {
		super();
	}

	eq(other: LinkOpenWidget): boolean {
		return other.href === this.href;
	}

	toDOM(): HTMLElement {
		const anchor = document.createElement('a');
		anchor.className = 'cm-link-badge';
		anchor.href = this.href;
		anchor.target = '_blank';
		anchor.rel = 'noopener noreferrer';
		anchor.setAttribute('aria-label', `Open link in nieuw tabblad: ${this.href}`);
		const icon = document.createElement('nldd-icon');
		icon.setAttribute('name', 'external-link');
		icon.setAttribute('aria-hidden', 'true');
		anchor.append(icon);
		// The editor steals mousedown to place the caret; keep the click ours.
		anchor.addEventListener('mousedown', (event) => event.preventDefault());
		return anchor;
	}

	ignoreEvent(): boolean {
		return true; // let the anchor handle its own click
	}

	/** Keep the caret at the badge's right edge text-height, not the badge's own box
	 *  height (which is taller and would flip with the cursor's arrival direction). */
	coordsAt(dom: HTMLElement): { left: number; right: number; top: number; bottom: number } | null {
		const badge = dom.getBoundingClientRect();
		const box = textCaretBox(dom) ?? { top: badge.top, bottom: badge.bottom };
		const x = badge.right + parseFloat(getComputedStyle(dom).marginRight);
		return { left: x, right: x, top: box.top, bottom: box.bottom };
	}
}

/** The link's destination, or null for a mention or a link without a URL. */
function hrefOf(state: EditorState, link: SyntaxNode): string | null {
	for (let child = link.firstChild; child; child = child.nextSibling) {
		if (child.name !== 'URL') continue;
		const href = state.sliceDoc(child.from, child.to);
		return href && !href.startsWith(MENTION_HREF_PREFIX) ? href : null;
	}
	return null;
}

function buildBadges(view: EditorView): DecorationSet {
	const builder = new RangeSetBuilder<Decoration>();
	const tree = syntaxTree(view.state);
	for (const { from, to } of view.visibleRanges) {
		tree.iterate({
			from,
			to,
			enter: (node) => {
				if (node.name !== 'Link') return;
				const href = hrefOf(view.state, node.node);
				// side -1 draws the badge before the caret, so the caret at the link end
				// sits to the RIGHT of the badge — text typed there lands after it, not
				// wedged between the link and the badge.
				if (href) builder.add(node.to, node.to, Decoration.widget({ widget: new LinkOpenWidget(href), side: -1 }));
			},
		});
	}
	return builder.finish();
}

/** Adds an "open link" badge after every real link in the viewport. */
export const linkOpenBadge = ViewPlugin.fromClass(
	class {
		decorations: DecorationSet;

		constructor(view: EditorView) {
			this.decorations = buildBadges(view);
		}

		update(update: ViewUpdate): void {
			if (update.docChanged || update.viewportChanged) this.decorations = buildBadges(update.view);
		}
	},
	{ decorations: (plugin) => plugin.decorations }
);
