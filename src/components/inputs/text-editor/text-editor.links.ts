import { showTooltip, type Tooltip } from '@codemirror/view';
import { StateField, type EditorState } from '@codemirror/state';
import { syntaxTree } from '@codemirror/language';
import type { SyntaxNode } from '@lezer/common';
import { MENTION_HREF_PREFIX } from './text-editor.mentions.js';
import '../../content/icon/icon.js';

/* When the caret sits in a real (non-mention) link, float a small panel under it
 * with the destination and a button to open it in a new tab — so a link can be
 * followed without leaving the editor, and its href is visible at a glance. */

function realLinkInfo(state: EditorState, pos: number): { from: number; href: string } | null {
	for (let node: SyntaxNode | null = syntaxTree(state).resolveInner(pos, 1); node; node = node.parent) {
		if (node.name !== 'Link') continue;
		let url: SyntaxNode | null = null;
		for (let child = node.firstChild; child; child = child.nextSibling) {
			if (child.name === 'URL') { url = child; break; }
		}
		const href = url ? state.sliceDoc(url.from, url.to) : '';
		if (href.startsWith(MENTION_HREF_PREFIX)) return null; // mentions own their click
		return { from: node.from, href };
	}
	return null;
}

function linkTooltip(state: EditorState): Tooltip | null {
	const info = realLinkInfo(state, state.selection.main.head);
	if (!info || !info.href) return null; // only once there's an actual URL to open
	return {
		pos: info.from,
		above: false,
		create: () => {
			const dom = document.createElement('div');
			dom.className = 'cm-link-tooltip';
			const open = document.createElement('a');
			open.className = 'cm-link-tooltip-open';
			open.href = info.href;
			open.target = '_blank';
			open.rel = 'noopener noreferrer';
			const label = document.createElement('span');
			label.className = 'cm-link-tooltip-url';
			label.textContent = info.href;
			const icon = document.createElement('nldd-icon');
			icon.setAttribute('name', 'external-link');
			icon.setAttribute('aria-hidden', 'true');
			open.append(label, icon);
			// The editor steals mousedown to place the caret; keep the click ours.
			open.addEventListener('mousedown', (event) => event.preventDefault());
			dom.append(open);
			return { dom };
		},
	};
}

/** Shows an "open link" panel under the caret whenever it's inside a real link. */
export const linkOpenTooltip = StateField.define<Tooltip | null>({
	create: linkTooltip,
	update: (value, tr) =>
		tr.docChanged || !tr.startState.selection.eq(tr.state.selection) ? linkTooltip(tr.state) : value,
	provide: (field) => showTooltip.from(field),
});
