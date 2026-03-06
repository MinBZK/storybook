import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-icon-cell.ts';

describe('rr-icon-cell', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-icon-cell></rr-icon-cell>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults to center vertical alignment', async () => {
		el = await fixture('<rr-icon-cell></rr-icon-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('vertical-alignment')).toBe('center');
	});

	it('reflects vertical-alignment attribute', async () => {
		el = await fixture('<rr-icon-cell vertical-alignment="top"></rr-icon-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('vertical-alignment')).toBe('top');
	});

	it('defaults to size 24', async () => {
		el = await fixture('<rr-icon-cell></rr-icon-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('24');
	});

	it('reflects size attribute', async () => {
		el = await fixture('<rr-icon-cell size="32"></rr-icon-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('32');
	});

	it('defaults selected to false', async () => {
		el = await fixture('<rr-icon-cell></rr-icon-cell>');
		await waitForUpdate(el);
		expect(el.hasAttribute('selected')).toBe(false);
	});

	it('reflects selected attribute', async () => {
		el = await fixture('<rr-icon-cell selected></rr-icon-cell>');
		await waitForUpdate(el);
		expect(el.hasAttribute('selected')).toBe(true);
	});
});
