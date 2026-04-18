import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './spacer-cell.ts';

describe('nldd-spacer-cell', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-spacer-cell></nldd-spacer-cell>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults to size 16', async () => {
		el = await fixture('<nldd-spacer-cell></nldd-spacer-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('16');
	});

	it('reflects size attribute', async () => {
		el = await fixture('<nldd-spacer-cell size="24"></nldd-spacer-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('24');
	});
});
