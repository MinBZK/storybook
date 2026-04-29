import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './form.js';

describe('nldd-form', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('rendert zonder fouten', async () => {
		el = await fixture('<nldd-form></nldd-form>');
		await waitForUpdate(el);
		expect(el.querySelector('form')).not.toBeNull();
	});

	it('verplaatst children in het inner form element', async () => {
		el = await fixture(`
			<nldd-form>
				<input type="text" name="email">
				<button type="submit">Send</button>
			</nldd-form>
		`);
		await waitForUpdate(el);
		const form = el.querySelector('form')!;
		expect(form.querySelector('input[name="email"]')).not.toBeNull();
		expect(form.querySelector('button[type="submit"]')).not.toBeNull();
	});

	it('forwardt name attribuut naar form', async () => {
		el = await fixture('<nldd-form name="login"></nldd-form>');
		await waitForUpdate(el);
		expect(el.querySelector('form')!.getAttribute('name')).toBe('login');
	});

	it('forwardt novalidate attribuut', async () => {
		el = await fixture('<nldd-form novalidate></nldd-form>');
		await waitForUpdate(el);
		expect(el.querySelector('form')!.hasAttribute('novalidate')).toBe(true);
	});

	it('forwardt method en action', async () => {
		el = await fixture('<nldd-form method="post" action="/login"></nldd-form>');
		await waitForUpdate(el);
		const form = el.querySelector('form')!;
		expect(form.getAttribute('method')).toBe('post');
		expect(form.getAttribute('action')).toBe('/login');
	});

	it('exposeert het inner form via .form getter', async () => {
		el = await fixture('<nldd-form></nldd-form>');
		await waitForUpdate(el);
		const form = (el as any).form;
		expect(form).toBeInstanceOf(HTMLFormElement);
	});

	it('verplaatst dynamisch toegevoegde children naar het form', async () => {
		el = await fixture('<nldd-form></nldd-form>');
		await waitForUpdate(el);

		const input = document.createElement('input');
		input.name = 'late';
		el.appendChild(input);

		// MutationObserver runs async — wait a microtask
		await new Promise(resolve => setTimeout(resolve, 0));

		const form = el.querySelector('form')!;
		expect(form.querySelector('input[name="late"]')).not.toBeNull();
	});
});
