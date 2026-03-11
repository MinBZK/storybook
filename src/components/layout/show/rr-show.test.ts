import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-show.ts';

describe('rr-show', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-show></rr-show>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('reflects above attribute', async () => {
		el = await fixture('<rr-show above="md"></rr-show>');
		await waitForUpdate(el);
		expect(el.getAttribute('above')).toBe('md');
	});

	it('reflects below attribute', async () => {
		el = await fixture('<rr-show below="md"></rr-show>');
		await waitForUpdate(el);
		expect(el.getAttribute('below')).toBe('md');
	});

	it('reflects only attribute', async () => {
		el = await fixture('<rr-show only="md"></rr-show>');
		await waitForUpdate(el);
		expect(el.getAttribute('only')).toBe('md');
	});

	it('defaults query to viewport', async () => {
		el = await fixture('<rr-show></rr-show>');
		await waitForUpdate(el);
		expect(el.getAttribute('query')).toBe('viewport');
	});

	it('reflects query attribute', async () => {
		el = await fixture('<rr-show query="container"></rr-show>');
		await waitForUpdate(el);
		expect(el.getAttribute('query')).toBe('container');
	});
});
