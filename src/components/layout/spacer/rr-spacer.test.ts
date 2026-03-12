import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-spacer.ts';

describe('rr-spacer', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-spacer></rr-spacer>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('reflects size attribute', async () => {
		el = await fixture('<rr-spacer size="32"></rr-spacer>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('32');
	});

	it('reflects direction attribute', async () => {
		el = await fixture('<rr-spacer direction="horizontal"></rr-spacer>');
		await waitForUpdate(el);
		expect(el.getAttribute('direction')).toBe('horizontal');
	});
});
