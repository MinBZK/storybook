import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './ndd-spacer.ts';

describe('ndd-spacer', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-spacer></ndd-spacer>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('reflects size attribute', async () => {
		el = await fixture('<ndd-spacer size="32"></ndd-spacer>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('32');
	});

	it('reflects direction attribute', async () => {
		el = await fixture('<ndd-spacer direction="horizontal"></ndd-spacer>');
		await waitForUpdate(el);
		expect(el.getAttribute('direction')).toBe('horizontal');
	});
});
