import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './keyboard-shortcut.js';

describe('nldd-keyboard-shortcut', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-keyboard-shortcut></nldd-keyboard-shortcut>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('uses an outer <kbd> container', async () => {
		el = await fixture('<nldd-keyboard-shortcut keys="Cmd+K"></nldd-keyboard-shortcut>');
		await waitForUpdate(el);
		const container = el.shadowRoot!.querySelector('.keyboard-shortcut')!;
		expect(container.tagName).toBe('KBD');
	});

	it('renders one inner kbd per key', async () => {
		el = await fixture('<nldd-keyboard-shortcut keys="Cmd+Shift+K"></nldd-keyboard-shortcut>');
		await waitForUpdate(el);
		const keys = el.shadowRoot!.querySelectorAll('.keyboard-shortcut__key');
		expect(keys.length).toBe(3);
		expect(keys[0].textContent).toBe('Cmd');
		expect(keys[1].textContent).toBe('Shift');
		expect(keys[2].textContent).toBe('K');
	});

	it('wraps all keys in a single container', async () => {
		el = await fixture('<nldd-keyboard-shortcut keys="Cmd+K"></nldd-keyboard-shortcut>');
		await waitForUpdate(el);
		const containers = el.shadowRoot!.querySelectorAll('.keyboard-shortcut');
		expect(containers.length).toBe(1);
		expect(containers[0].querySelectorAll('.keyboard-shortcut__key').length).toBe(2);
	});

	it('renders a "+" separator between keys', async () => {
		el = await fixture('<nldd-keyboard-shortcut keys="Cmd+Shift+K"></nldd-keyboard-shortcut>');
		await waitForUpdate(el);
		const separators = el.shadowRoot!.querySelectorAll('.keyboard-shortcut__separator');
		expect(separators.length).toBe(2);
		separators.forEach(s => expect(s.textContent).toBe('+'));
	});

	it('treats "+++" as separator + literal + key + separator', async () => {
		el = await fixture('<nldd-keyboard-shortcut keys="Ctrl+++a"></nldd-keyboard-shortcut>');
		await waitForUpdate(el);
		const keys = el.shadowRoot!.querySelectorAll('.keyboard-shortcut__key');
		expect(keys.length).toBe(3);
		expect(keys[0].textContent).toBe('Ctrl');
		expect(keys[1].textContent).toBe('+');
		expect(keys[2].textContent).toBe('a');
	});

	it('renders slot content when keys is empty', async () => {
		el = await fixture('<nldd-keyboard-shortcut><kbd>F</kbd></nldd-keyboard-shortcut>');
		await waitForUpdate(el);
		const slot = el.shadowRoot!.querySelector('slot');
		expect(slot).not.toBeNull();
	});
});
