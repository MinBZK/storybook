import {
	autocompletion,
	type Completion,
	type CompletionContext,
	type CompletionResult,
} from '@codemirror/autocomplete';
import { EditorView } from '@codemirror/view';
import type { Extension } from '@codemirror/state';

/* @-mention typeahead. The editor is headless and does not know any users, so
 * the consumer supplies candidates through a source callback. Selecting one
 * inserts a markdown-compatible token that degrades to a plain link outside the
 * editor; the chip rendering lives in the markdown decoration layer. */

export interface MentionCandidate {
	/** Stable id stored in the token (`user:<id>`). */
	id: string;
	/** Display name shown after the @ and in the suggestion list. */
	label: string;
	/** Optional secondary text shown on the right of the suggestion (role, e-mail). */
	detail?: string;
}

export type MentionSource = (query: string) => MentionCandidate[] | Promise<MentionCandidate[]>;

export interface MentionInsertedDetail {
	id: string;
	label: string;
	from: number;
	to: number;
}

/** Href prefix that marks a markdown link as a mention. */
export const MENTION_HREF_PREFIX = 'user:';

/** The markdown-compatible token stored for a mention (degrades to a plain link). */
export function mentionToken(candidate: MentionCandidate): string {
	return `[@${candidate.label}](${MENTION_HREF_PREFIX}${candidate.id})`;
}

function completionSource(
	getSource: () => MentionSource | undefined,
	onInsert: (detail: MentionInsertedDetail) => void,
) {
	return async (context: CompletionContext): Promise<CompletionResult | null> => {
		const match = context.matchBefore(/@[\w.\-]*/);
		if (!match || (match.from === match.to && !context.explicit)) return null;
		const source = getSource();
		if (!source) return null;
		const candidates = await source(match.text.slice(1));
		if (!candidates?.length) return null;
		return {
			from: match.from,
			// The consumer's source already filtered against the query.
			filter: false,
			options: candidates.map((candidate): Completion => ({
				label: `@${candidate.label}`,
				detail: candidate.detail,
				apply: (view, _completion, from, to) => {
					const token = mentionToken(candidate);
					view.dispatch({
						changes: { from, to, insert: `${token} ` },
						selection: { anchor: from + token.length + 1 },
					});
					onInsert({ id: candidate.id, label: candidate.label, from, to: from + token.length });
				},
			})),
		};
	};
}

// The suggestion popup styled to match nldd-menu.
const popupTheme = EditorView.theme({
	'.cm-tooltip.cm-tooltip-autocomplete': {
		border: '1px solid var(--semantics-surfaces-tinted-border-color)',
		// No radius on the menu itself, like nldd-menu (overlays-corner-radius).
		borderRadius: 'var(--semantics-overlays-corner-radius)',
		backgroundColor: 'var(--semantics-surfaces-base-background-color)',
		boxShadow: 'var(--components-menu-box-shadow)',
	},
	// Match CM's own specificity (.cm-tooltip.cm-tooltip-autocomplete) so the
	// body font wins over its monospace default — names read better in sans.
	'.cm-tooltip.cm-tooltip-autocomplete > ul': {
		fontFamily: 'var(--primitives-font-family-body)',
		fontSize: 'var(--primitives-font-size-90)',
		maxHeight: '14em',
		// A small inset around the items, like nldd-menu.
		margin: '0',
		padding: 'var(--primitives-space-8)',
	},
	'.cm-tooltip-autocomplete > ul > li': {
		display: 'flex',
		alignItems: 'center',
		gap: 'var(--primitives-space-8)',
		// At least control size sm tall; bumped to md on touch (below).
		minHeight: 'var(--semantics-controls-sm-min-size)',
		boxSizing: 'border-box',
		padding: 'var(--primitives-space-4) var(--primitives-space-8)',
		borderRadius: 'var(--semantics-controls-sm-corner-radius)',
		color: 'var(--semantics-content-color)',
	},
	'.cm-tooltip-autocomplete > ul > li[aria-selected]': {
		backgroundColor: 'var(--components-menu-item-is-highlighted-background-color)',
		color: 'var(--components-menu-item-is-highlighted-content-color)',
	},
	'.cm-completionDetail': {
		marginLeft: 'auto',
		color: 'var(--semantics-content-secondary-color)',
		fontStyle: 'normal',
	},
	'.cm-tooltip-autocomplete > ul > li[aria-selected] .cm-completionDetail': {
		color: 'inherit',
	},
	// Larger touch targets on coarse pointers (control size md height).
	'@media (pointer: coarse)': {
		'.cm-tooltip-autocomplete > ul > li': {
			minHeight: 'var(--semantics-controls-md-min-size)',
		},
	},
});

/**
 * @-mention typeahead. `getSource` is called with the text typed after `@` and
 * returns (a promise of) candidates; selecting one inserts the token and calls
 * `onInsert`. Without a source it is inert.
 */
export function mentions(
	getSource: () => MentionSource | undefined,
	onInsert: (detail: MentionInsertedDetail) => void,
): Extension {
	return [
		autocompletion({ override: [completionSource(getSource, onInsert)], icons: false }),
		popupTheme,
	];
}
