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

	it('renders one kbd per key', async () => {
		el = await fixture('<nldd-keyboard-shortcut keys="Cmd+Shift+K"></nldd-keyboard-shortcut>');
		await waitForUpdate(el);
		const kbds = el.shadowRoot!.querySelectorAll('kbd');
		expect(kbds.length).toBe(3);
		expect(kbds[0].textContent).toBe('Cmd');
		expect(kbds[1].textContent).toBe('Shift');
		expect(kbds[2].textContent).toBe('K');
	});

	it('wraps all keys in a single container', async () => {
		el = await fixture('<nldd-keyboard-shortcut keys="Cmd+K"></nldd-keyboard-shortcut>');
		await waitForUpdate(el);
		const containers = el.shadowRoot!.querySelectorAll('.keyboard-shortcut');
		expect(containers.length).toBe(1);
		expect(containers[0].querySelectorAll('kbd').length).toBe(2);
	});

	it('renders a "+" separator between keys', async () => {
		el = await fixture('<nldd-keyboard-shortcut keys="Cmd+Shift+K"></nldd-keyboard-shortcut>');
		await waitForUpdate(el);
		const separators = el.shadowRoot!.querySelectorAll('.keyboard-shortcut__separator');
		expect(separators.length).toBe(2);
		separators.forEach(s => expect(s.textContent).toBe('+'));
	});

	it('renders slot content when keys is empty', async () => {
		el = await fixture('<nldd-keyboard-shortcut><kbd>F</kbd></nldd-keyboard-shortcut>');
		await waitForUpdate(el);
		const slot = el.shadowRoot!.querySelector('slot');
		expect(slot).not.toBeNull();
	});
});
