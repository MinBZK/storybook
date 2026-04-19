import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './title.ts';

describe('nldd-title', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-title></nldd-title>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults to size 3', async () => {
		el = await fixture('<nldd-title></nldd-title>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('3');
	});

	it('reflects size attribute', async () => {
		el = await fixture('<nldd-title size="1"></nldd-title>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('1');
	});

	it('renders slotted title content', async () => {
		el = await fixture('<nldd-title><h1>Paginatitel</h1></nldd-title>');
		await waitForUpdate(el);
		expect(el.querySelector('h1')?.textContent?.trim()).toBe('Paginatitel');
		expect(el.shadowRoot!.querySelector('slot:not([name])')!.assignedElements().length).toBeGreaterThan(0);
	});

	it('renders slotted overline content', async () => {
		el = await fixture('<nldd-title><p slot="overline">Overline</p></nldd-title>');
		await waitForUpdate(el);
		expect(el.querySelector('[slot="overline"]')?.textContent?.trim()).toBe('Overline');
		expect(el.shadowRoot!.querySelector('slot[name="overline"]')!.assignedElements().length).toBeGreaterThan(0);
	});

	it('renders slotted subtitle content', async () => {
		el = await fixture('<nldd-title><p slot="subtitle">Ondertitel</p></nldd-title>');
		await waitForUpdate(el);
		expect(el.querySelector('[slot="subtitle"]')?.textContent?.trim()).toBe('Ondertitel');
		expect(el.shadowRoot!.querySelector('slot[name="subtitle"]')!.assignedElements().length).toBeGreaterThan(0);
	});

	it('renders slotted actions', async () => {
		el = await fixture('<nldd-title><button slot="actions">Actie</button></nldd-title>');
		await waitForUpdate(el);
		expect(el.querySelector('[slot="actions"]')?.textContent?.trim()).toBe('Actie');
		expect(el.shadowRoot!.querySelector('slot[name="actions"]')!.assignedElements().length).toBeGreaterThan(0);
	});
});
