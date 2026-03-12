import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-title-bar.ts';

describe('rr-title-bar', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-title-bar></rr-title-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults to size 3', async () => {
		el = await fixture('<rr-title-bar></rr-title-bar>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('3');
	});

	it('reflects size attribute', async () => {
		el = await fixture('<rr-title-bar size="1"></rr-title-bar>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('1');
	});

	it('renders slotted title content', async () => {
		el = await fixture('<rr-title-bar><h1>Paginatitel</h1></rr-title-bar>');
		await waitForUpdate(el);
		expect(el.querySelector('h1')?.textContent?.trim()).toBe('Paginatitel');
	});

	it('renders slotted overline content', async () => {
		el = await fixture('<rr-title-bar><p slot="overline">Overline</p></rr-title-bar>');
		await waitForUpdate(el);
		expect(el.querySelector('[slot="overline"]')?.textContent?.trim()).toBe('Overline');
	});

	it('renders slotted subtitle content', async () => {
		el = await fixture('<rr-title-bar><p slot="subtitle">Ondertitel</p></rr-title-bar>');
		await waitForUpdate(el);
		expect(el.querySelector('[slot="subtitle"]')?.textContent?.trim()).toBe('Ondertitel');
	});

	it('renders slotted actions', async () => {
		el = await fixture('<rr-title-bar><button slot="actions">Actie</button></rr-title-bar>');
		await waitForUpdate(el);
		expect(el.querySelector('[slot="actions"]')?.textContent?.trim()).toBe('Actie');
	});
});
