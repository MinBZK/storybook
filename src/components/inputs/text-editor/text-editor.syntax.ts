import { syntaxTree } from '@codemirror/language';
import type { EditorState } from '@codemirror/state';
import type { SyntaxNode } from '@lezer/common';

/* One question the editor asks the markdown tree everywhere: what is the caret
 * standing in? Is it a link, a code block, an emphasis, a mention. The answer is
 * always the same walk, from the innermost node at the position outward to the
 * root, and it used to be written out at every call site. */

/** The innermost node at `pos` that `match` accepts, looking outward from there.
 *  `side` decides which node a position between two of them belongs to: -1 the
 *  one that ends there, 1 the one that starts there. Null when none matches. */
export function enclosingNode(
	state: EditorState,
	pos: number,
	side: -1 | 0 | 1,
	match: (node: SyntaxNode) => boolean,
): SyntaxNode | null {
	for (let node: SyntaxNode | null = syntaxTree(state).resolveInner(pos, side); node; node = node.parent) {
		if (match(node)) return node;
	}
	return null;
}

/** `enclosingNode` for the common case: a node that goes by one of these names. */
export function enclosingNamed(
	state: EditorState,
	pos: number,
	side: -1 | 0 | 1,
	names: string | ReadonlySet<string>,
): SyntaxNode | null {
	return enclosingNode(state, pos, side, typeof names === 'string' ? (node) => node.name === names : (node) => names.has(node.name));
}
