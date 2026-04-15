import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { NDDWindow } from './ndd-window.ts';
import './ndd-window.ts';

describe('ndd-window', () => {
	let el: NDDWindow;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('rendert zonder fouten', async () => {
		el = await fixture<NDDWindow>('<ndd-window></ndd-window>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('bevat een dialog element', async () => {
		el = await fixture<NDDWindow>('<ndd-window></ndd-window>');
		await waitForUpdate(el);
		const dialog = el.shadowRoot!.querySelector('dialog');
		expect(dialog).not.toBeNull();
	});

	// Note: showModal() focus trap, backdrop and Escape are native browser features
	// not fully exercised in the test runner — verify in browser-based tests
	it('opent modaal met show() als standaard', async () => {
		el = await fixture<NDDWindow>('<ndd-window></ndd-window>');
		await waitForUpdate(el);
		el.show();
		const dialog = el.shadowRoot!.querySelector('dialog') as HTMLDialogElement;
		expect(dialog.open).toBe(true);
	});

	it('opent niet-modaal met show() als modeless is ingesteld', async () => {
		el = await fixture<NDDWindow>('<ndd-window modeless></ndd-window>');
		await waitForUpdate(el);
		el.show();
		const dialog = el.shadowRoot!.querySelector('dialog') as HTMLDialogElement;
		expect(dialog.open).toBe(true);
	});

	it('sluit met hide()', async () => {
		el = await fixture<NDDWindow>('<ndd-window modeless></ndd-window>');
		await waitForUpdate(el);
		el.show();
		el.hide();
		const dialog = el.shadowRoot!.querySelector('dialog') as HTMLDialogElement;
		expect(dialog.open).toBe(false);
	});

	it('stuurt open event bij show()', async () => {
		el = await fixture<NDDWindow>('<ndd-window modeless></ndd-window>');
		await waitForUpdate(el);
		let fired = false;
		el.addEventListener('open', () => { fired = true; });
		el.show();
		expect(fired).toBe(true);
	});

	it('stuurt close event bij hide()', async () => {
		el = await fixture<NDDWindow>('<ndd-window modeless></ndd-window>');
		await waitForUpdate(el);
		el.show();
		let fired = false;
		el.addEventListener('close', () => { fired = true; });
		el.hide();
		expect(fired).toBe(true);
	});

	it('stelt aria-label in', async () => {
		el = await fixture<NDDWindow>('<ndd-window accessible-label="Instellingen"></ndd-window>');
		await waitForUpdate(el);
		const dialog = el.shadowRoot!.querySelector('dialog') as HTMLDialogElement;
		expect(dialog.getAttribute('aria-label')).toBe('Instellingen');
	});

	it('detecteert drag handle en zet has-drag-handle attribuut', async () => {
		el = await fixture<NDDWindow>('<ndd-window><div window-drag-handle>Handle</div></ndd-window>');
		await waitForUpdate(el);
		expect(el.hasAttribute('has-drag-handle')).toBe(true);
	});

	it('heeft geen has-drag-handle attribuut zonder drag handle', async () => {
		el = await fixture<NDDWindow>('<ndd-window><div>Content</div></ndd-window>');
		await waitForUpdate(el);
		expect(el.hasAttribute('has-drag-handle')).toBe(false);
	});
});
