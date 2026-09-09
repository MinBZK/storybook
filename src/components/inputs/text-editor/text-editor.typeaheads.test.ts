import { describe, it, expect, afterEach } from 'vitest';
import type { EditorView } from '@codemirror/view';
import { acceptCompletion, completionStatus, moveCompletionSelection, startCompletion } from '@codemirror/autocomplete';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './text-editor.js';
import type { Typeahead, TypeaheadCandidate, MentionSource } from './text-editor.js';

/* The typeahead lists a consumer adds next to the @-mention (#200, #204): their
 * trigger, what a choice writes, the avatar or icon on a row, the event, and
 * insertAtCursor(). */

type El = HTMLElement & {
	value: string;
	readonly: boolean;
	updateComplete: Promise<unknown>;
	shadowRoot: ShadowRoot;
	view: EditorView;
	mentionSource?: MentionSource;
	typeaheads: Typeahead[];
	insertAtCursor(text: string): void;
};

const people: TypeaheadCandidate[] = [
	{ id: '1', label: 'Anouk', detail: 'Beleid', avatar: {} },
	{ id: '2', label: 'Antoine', detail: 'Data', avatar: { type: 'organization' } },
];
const channels: TypeaheadCandidate[] = [
	{ id: 'algemeen', label: 'algemeen', icon: 'tag' },
	{ id: 'alles', label: 'alles', icon: 'tag' },
];
const emoji: TypeaheadCandidate[] = [{ id: 'smile', label: 'smile:', symbol: '😄' }];

function byLabel(items: TypeaheadCandidate[]): (query: string) => TypeaheadCandidate[] {
	return (query) => items.filter((item) => item.label.toLowerCase().startsWith(query.toLowerCase()));
}

async function make(value: string, typeaheads: Typeahead[], mentionSource?: MentionSource): Promise<El> {
	const el = await fixture<El>('<nldd-text-editor accessible-label="t"></nldd-text-editor>');
	el.value = value;
	el.typeaheads = typeaheads;
	if (mentionSource) el.mentionSource = mentionSource;
	await el.updateComplete;
	await waitForUpdate(el);
	el.view.dispatch({ selection: { anchor: el.view.state.doc.length } });
	return el;
}

/** Opens the list for the query before the caret and waits for its rows, plus
 *  the moment CodeMirror wants a list to be open before it accepts a choice
 *  (its `interactionDelay`, 75ms). */
async function openList(el: El): Promise<HTMLElement[]> {
	startCompletion(el.view);
	for (let i = 0; i < 40; i++) {
		const rows = Array.from(el.shadowRoot.querySelectorAll<HTMLElement>('.cm-tooltip-autocomplete li'));
		if (completionStatus(el.view.state) === 'active' && rows.length) {
			await new Promise((resolve) => setTimeout(resolve, 100));
			return rows;
		}
		await new Promise((resolve) => setTimeout(resolve, 25));
	}
	throw new Error('the typeahead list did not open');
}

function labels(rows: HTMLElement[]): string[] {
	return rows.map((row) => row.querySelector('.cm-completionLabel')?.textContent ?? '');
}

describe('nldd-text-editor typeaheads', () => {
	let el: El;
	afterEach(() => cleanup(el));

	it('writes what insert returns, and reports the choice with clean offsets', async () => {
		el = await make('hoi :sm', [{ trigger: ':', source: byLabel(emoji), insert: (c) => c.symbol ?? '' }]);
		let detail: unknown;
		el.addEventListener('nldd-text-editor-typeahead', ((event: CustomEvent) => { detail = event.detail; }) as EventListener);
		const rows = await openList(el);
		// The shortcode as Mattermost and Slack show it, the emoji itself in front.
		expect(labels(rows)).toEqual([':smile:']);
		expect(rows[0].querySelector('.cm-nldd-symbol')?.textContent).toBe('😄');
		expect(rows[0].classList.contains('cm-nldd-row-avatar')).toBe(false);
		acceptCompletion(el.view);
		await waitForUpdate(el);
		expect(el.value).toBe('hoi 😄');
		expect(el.view.state.selection.main.head).toBe(6);
		expect(detail).toEqual({ trigger: ':', candidate: emoji[0], from: 4, to: 6 });
	});

	it('writes the trigger, the label and a space when there is no insert', async () => {
		el = await make('zie #alg', [{ trigger: '#', source: byLabel(channels) }]);
		await openList(el);
		acceptCompletion(el.view);
		await waitForUpdate(el);
		expect(el.value).toBe('zie #algemeen ');
		// With the closing colon in the label that is the shortcode those systems render.
		el.view.dispatch({ changes: { from: 0, to: el.view.state.doc.length, insert: 'hoi :sm' }, selection: { anchor: 7 } });
		el.typeaheads = [{ trigger: ':', source: byLabel(emoji) }];
		await openList(el);
		acceptCompletion(el.view);
		await waitForUpdate(el);
		expect(el.value).toBe('hoi :smile: ');
	});

	it('puts an avatar or an icon in front of a row, the avatar on a row of two lines', async () => {
		el = await make('#al', [{ trigger: '#', source: byLabel(channels) }], byLabel(people));
		const channelRows = await openList(el);
		const icon = channelRows[0].querySelector('nldd-icon');
		expect(icon?.getAttribute('name')).toBe('tag');
		// The size of an nldd-menu item's icon.
		expect(icon?.getAttribute('size')).toBe('20');
		expect(channelRows[0].classList.contains('cm-nldd-row-avatar')).toBe(false);
		el.view.dispatch({ changes: { from: 0, to: 3, insert: '@an' }, selection: { anchor: 3 } });
		const personRows = await openList(el);
		const avatars = personRows.map((row) => row.querySelector('nldd-avatar'));
		expect(avatars[0]?.getAttribute('name')).toBe('Anouk');
		expect(avatars[0]?.getAttribute('size')).toBe('32');
		expect(avatars[0]?.hasAttribute('decorative')).toBe(true);
		expect(avatars[1]?.getAttribute('type')).toBe('organization');
		expect(personRows[0].classList.contains('cm-nldd-row-avatar')).toBe(true);
		// The label and the detail stack: the detail sits under the label, not beside it.
		const label = personRows[0].querySelector('.cm-completionLabel')!.getBoundingClientRect();
		const detail = personRows[0].querySelector('.cm-completionDetail')!.getBoundingClientRect();
		expect(detail.top).toBeGreaterThanOrEqual(label.bottom - 1);
		expect(Math.abs(detail.left - label.left)).toBeLessThan(1);
	});

	it('merges lists on one trigger, in the order they were given', async () => {
		el = await make('#al', [
			{ trigger: '#', source: byLabel(channels) },
			{ trigger: '#', source: () => [{ id: 'x', label: 'alarm' }] },
		]);
		const rows = await openList(el);
		expect(labels(rows)).toEqual(['#algemeen', '#alles', '#alarm']);
	});

	it('keeps the built-in mention: the token, and the mention event', async () => {
		el = await make('@an', [{ trigger: ':', source: byLabel(emoji) }], byLabel(people));
		let detail: unknown;
		let other = false;
		el.addEventListener('nldd-text-editor-mention', ((event: CustomEvent) => { detail = event.detail; }) as EventListener);
		el.addEventListener('nldd-text-editor-typeahead', () => { other = true; });
		await openList(el);
		moveCompletionSelection(true)(el.view);
		acceptCompletion(el.view);
		await waitForUpdate(el);
		expect(el.value).toBe('[@Antoine](user:2) ');
		expect(detail).toEqual({ id: '2', label: 'Antoine', from: 0, to: '[@Antoine](user:2)'.length });
		expect(other).toBe(false);
	});

	it('a plain @ list of your own writes what you say, next to the built-in one', async () => {
		el = await make('@an', [{ trigger: '@', source: () => [{ id: 'anouk.dv', label: 'Anouk de Vries' }], insert: (c) => `@${c.id} ` }]);
		const rows = await openList(el);
		expect(labels(rows)).toEqual(['@Anouk de Vries']);
		acceptCompletion(el.view);
		await waitForUpdate(el);
		expect(el.value).toBe('@anouk.dv ');
	});

	it('insertAtCursor replaces the selection and leaves the caret after the text', async () => {
		el = await make('een woord', []);
		el.view.dispatch({ selection: { anchor: 4, head: 9 } });
		el.insertAtCursor('zin');
		await waitForUpdate(el);
		expect(el.value).toBe('een zin');
		expect(el.view.state.selection.main.head).toBe(7);
		expect(el.view.hasFocus).toBe(true);
	});

	it('insertAtCursor does nothing on a read-only editor', async () => {
		el = await make('een woord', []);
		el.readonly = true;
		await el.updateComplete;
		el.insertAtCursor('zin');
		await waitForUpdate(el);
		expect(el.value).toBe('een woord');
	});
});
