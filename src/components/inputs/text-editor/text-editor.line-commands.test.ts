import { describe, it, expect } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './text-editor.js';

type Api = HTMLElement & {
	value: string;
	updateComplete: Promise<unknown>;
	view: {
		state: { selection: { main: { head: number } } };
		contentDOM: HTMLElement;
		dispatch(spec: unknown): void;
	};
	setList(type: 'none' | 'bullet' | 'ordered'): void;
	toggleBulletList(): void;
	toggleTaskList(): void;
	getState(): { active: { taskList: boolean; bulletList: boolean } };
};

async function withValue(markdown: string): Promise<Api> {
	const el = await fixture<Api>('<nldd-text-editor accessible-label="Tekst"></nldd-text-editor>');
	el.value = markdown;
	await el.updateComplete;
	await waitForUpdate(el);
	return el;
}

/** Cmd on macOS, Ctrl elsewhere: CodeMirror resolves `Mod-` per platform and a
 *  keydown carrying both would read as Ctrl-Meta and match nothing. */
function mod(key: string, code: string): KeyboardEvent {
	const mac = /Mac/.test(navigator.platform);
	return new KeyboardEvent('keydown', { key, code, metaKey: mac, ctrlKey: !mac, bubbles: true, cancelable: true });
}

// #198: the line commands skipped an empty line, dropped an item that had no
// text yet, and left the caret in front of the marker they had just written.
describe('nldd-text-editor line commands', () => {
	it('setList zet een marker op een leeg document, met de caret erachter', async () => {
		const el = await withValue('');
		el.view.dispatch({ selection: { anchor: 0 } });
		el.setList('bullet');
		await waitForUpdate(el);
		expect(el.value).toBe('- ');
		// Typing next must land in the item, not before its marker.
		expect(el.view.state.selection.main.head).toBe(2);
		cleanup(el);
	});

	it('toggleBulletList doet hetzelfde op een leeg document', async () => {
		const el = await withValue('');
		el.view.dispatch({ selection: { anchor: 0 } });
		el.toggleBulletList();
		await waitForUpdate(el);
		expect(el.value).toBe('- ');
		expect(el.view.state.selection.main.head).toBe(2);
		cleanup(el);
	});

	it('een item zonder tekst blijft een item als het lijsttype wisselt', async () => {
		const el = await withValue('- ');
		el.view.dispatch({ selection: { anchor: 2 } });
		el.setList('ordered');
		await waitForUpdate(el);
		expect(el.value).toBe('1. ');
		expect(el.view.state.selection.main.head).toBe(3);
		cleanup(el);
	});

	it('een kale marker zonder spatie telt ook als item', async () => {
		const el = await withValue('-');
		el.view.dispatch({ selection: { anchor: 1 } });
		el.setList('ordered');
		await waitForUpdate(el);
		expect(el.value).toBe('1. ');
		cleanup(el);
	});

	it('de caret schuift mee achter een nieuwe marker op een gevulde regel', async () => {
		const el = await withValue('punt');
		el.view.dispatch({ selection: { anchor: 0 } });
		el.setList('bullet');
		await waitForUpdate(el);
		expect(el.value).toBe('- punt');
		expect(el.view.state.selection.main.head).toBe(2);
		cleanup(el);
	});

	it('een lege regel tussen items blijft leeg', async () => {
		const el = await withValue('een\n\ntwee');
		el.view.dispatch({ selection: { anchor: 0, head: 9 } });
		el.setList('bullet');
		await waitForUpdate(el);
		expect(el.value).toBe('- een\n\n- twee');
		cleanup(el);
	});

	it('Cmd/Ctrl+] maakt van platte tekst geen codeblok', async () => {
		const el = await withValue('tekst');
		el.view.dispatch({ selection: { anchor: 5 } });
		el.view.contentDOM.dispatchEvent(mod(']', 'BracketRight'));
		await waitForUpdate(el);
		// defaultKeymap's indentMore would have written four spaces here, which
		// markdown reads as an indented code block.
		expect(el.value).toBe('tekst');
		cleanup(el);
	});

	it('Cmd/Ctrl+] nest een lijstitem, Cmd/Ctrl+[ haalt het terug', async () => {
		const el = await withValue('- foo\n- bar');
		el.view.dispatch({ selection: { anchor: el.value.indexOf('bar') } });
		el.view.contentDOM.dispatchEvent(mod(']', 'BracketRight'));
		await waitForUpdate(el);
		expect(el.value).toBe('- foo\n  - bar');
		el.view.contentDOM.dispatchEvent(mod('[', 'BracketLeft'));
		await waitForUpdate(el);
		expect(el.value).toBe('- foo\n- bar');
		cleanup(el);
	});

	describe('toggleTaskList', () => {
		it('maakt van platte tekst een taak, en van een taak weer een bullet', async () => {
			const el = await withValue('punt');
			el.view.dispatch({ selection: { anchor: 0 } });
			el.toggleTaskList();
			await waitForUpdate(el);
			expect(el.value).toBe('- [ ] punt');
			expect(el.getState().active.taskList).toBe(true);
			el.toggleTaskList();
			await waitForUpdate(el);
			expect(el.value).toBe('- punt');
			expect(el.getState().active.taskList).toBe(false);
			cleanup(el);
		});

		it('zet een bullet of genummerd item om, met behoud van inspring', async () => {
			const el = await withValue('- een\n  2. twee');
			el.view.dispatch({ selection: { anchor: 0, head: el.value.length } });
			el.toggleTaskList();
			await waitForUpdate(el);
			expect(el.value).toBe('- [ ] een\n  - [ ] twee');
			cleanup(el);
		});

		it('laat een afgevinkte taak staan tot alles taak is, dan pas terug', async () => {
			const el = await withValue('- [x] klaar\n- open');
			el.view.dispatch({ selection: { anchor: 0, head: el.value.length } });
			el.toggleTaskList();
			await waitForUpdate(el);
			expect(el.value).toBe('- [x] klaar\n- [ ] open');
			el.toggleTaskList();
			await waitForUpdate(el);
			expect(el.value).toBe('- klaar\n- open');
			cleanup(el);
		});

		it('werkt op een leeg document', async () => {
			const el = await withValue('');
			el.view.dispatch({ selection: { anchor: 0 } });
			el.toggleTaskList();
			await waitForUpdate(el);
			expect(el.value).toBe('- [ ] ');
			expect(el.view.state.selection.main.head).toBe(6);
			cleanup(el);
		});
	});
});
