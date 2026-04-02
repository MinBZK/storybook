import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './ndd-title-bar.ts';

describe('ndd-title-bar', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-title-bar></ndd-title-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults to size 3', async () => {
		el = await fixture('<ndd-title-bar></ndd-title-bar>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('3');
	});

	it('reflects size attribute', async () => {
		el = await fixture('<ndd-title-bar size="1"></ndd-title-bar>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('1');
	});

	it('renders slotted title content', async () => {
		el = await fixture('<ndd-title-bar><h1>Paginatitel</h1></ndd-title-bar>');
		await waitForUpdate(el);
		expect(el.querySelector('h1')?.textContent?.trim()).toBe('Paginatitel');
		expect(el.shadowRoot!.querySelector('slot:not([name])')!.assignedElements().length).toBeGreaterThan(0);
	});

	it('renders slotted overline content', async () => {
		el = await fixture('<ndd-title-bar><p slot="overline">Overline</p></ndd-title-bar>');
		await waitForUpdate(el);
		expect(el.querySelector('[slot="overline"]')?.textContent?.trim()).toBe('Overline');
		expect(el.shadowRoot!.querySelector('slot[name="overline"]')!.assignedElements().length).toBeGreaterThan(0);
	});

	it('renders slotted subtitle content', async () => {
		el = await fixture('<ndd-title-bar><p slot="subtitle">Ondertitel</p></ndd-title-bar>');
		await waitForUpdate(el);
		expect(el.querySelector('[slot="subtitle"]')?.textContent?.trim()).toBe('Ondertitel');
		expect(el.shadowRoot!.querySelector('slot[name="subtitle"]')!.assignedElements().length).toBeGreaterThan(0);
	});

	it('renders slotted actions', async () => {
		el = await fixture('<ndd-title-bar><button slot="actions">Actie</button></ndd-title-bar>');
		await waitForUpdate(el);
		expect(el.querySelector('[slot="actions"]')?.textContent?.trim()).toBe('Actie');
		expect(el.shadowRoot!.querySelector('slot[name="actions"]')!.assignedElements().length).toBeGreaterThan(0);
	});
});
