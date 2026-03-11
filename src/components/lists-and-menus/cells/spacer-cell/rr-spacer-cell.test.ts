import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './rr-spacer-cell.ts';

describe('rr-spacer-cell', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-spacer-cell></rr-spacer-cell>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults to size 16', async () => {
		el = await fixture('<rr-spacer-cell></rr-spacer-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('16');
	});

	it('reflects size attribute', async () => {
		el = await fixture('<rr-spacer-cell size="24"></rr-spacer-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('24');
	});
});
