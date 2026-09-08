import { describe, it, expect } from 'vitest';
import { EditorState } from '@codemirror/state';
import { ensureSyntaxTree } from '@codemirror/language';
import { markdown } from '@codemirror/lang-markdown';
import { mentionQueryAt } from './text-editor.mentions.js';

/** A parsed state with the caret where `|` sits in the fixture. */
function at(fixture: string): { state: EditorState; pos: number } {
	const pos = fixture.indexOf('|');
	const doc = fixture.slice(0, pos) + fixture.slice(pos + 1);
	const state = EditorState.create({ doc, extensions: [markdown()] });
	// The editor parses incrementally; a unit test has to ask for the whole tree
	// so the code guard sees the nodes it will see at runtime.
	ensureSyntaxTree(state, doc.length, 5000);
	return { state, pos };
}

describe('mention trigger', () => {
	it('opent aan het begin van een regel', () => {
		const { state, pos } = at('@sam|');
		expect(mentionQueryAt(state, pos)).toEqual({ from: 0, to: 4, query: 'sam' });
	});

	it('opent na een spatie', () => {
		const { state, pos } = at('stuur naar @sam|');
		expect(mentionQueryAt(state, pos)).toEqual({ from: 11, to: 15, query: 'sam' });
	});

	it('opent aan het begin van een volgende regel', () => {
		const { state, pos } = at('hallo\n@sam|');
		expect(mentionQueryAt(state, pos)?.query).toBe('sam');
	});

	it('opent op een kale @, zodat de lijst verschijnt zodra je hem typt', () => {
		const { state, pos } = at('stuur naar @|');
		expect(mentionQueryAt(state, pos)).toEqual({ from: 11, to: 12, query: '' });
	});

	// #199: an @ inside a word is a character, not a trigger. An e-mail address
	// is the case that bit: the list opened as soon as the domain matched a name.
	it('opent niet middenin een woord', () => {
		const { state, pos } = at('stuur naar piet@sam|');
		expect(mentionQueryAt(state, pos)).toBeNull();
	});

	it('opent niet in een e-mailadres met een punt', () => {
		const { state, pos } = at('mail piet@sam.nl|');
		expect(mentionQueryAt(state, pos)).toBeNull();
	});

	it('opent niet in inline code', () => {
		const { state, pos } = at('gebruik `@sam|` hier');
		expect(mentionQueryAt(state, pos)).toBeNull();
	});

	it('opent niet in een fenced code block', () => {
		const { state, pos } = at('```\n@sam|\n```');
		expect(mentionQueryAt(state, pos)).toBeNull();
	});

	it('opent niet in een ingesprongen code block', () => {
		const { state, pos } = at('tekst\n\n    @sam|');
		expect(mentionQueryAt(state, pos)).toBeNull();
	});

	it('kijkt alleen naar de tekst vóór de caret', () => {
		const { state, pos } = at('stuur naar @sa|m');
		expect(mentionQueryAt(state, pos)).toEqual({ from: 11, to: 14, query: 'sa' });
	});
});
