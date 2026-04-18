import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './ndd-icon-cell.ts';

describe('ndd-icon-cell', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-icon-cell></ndd-icon-cell>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults to center vertical alignment', async () => {
		el = await fixture('<ndd-icon-cell></ndd-icon-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('vertical-alignment')).toBe('center');
	});

	it('reflects vertical-alignment attribute', async () => {
		el = await fixture('<ndd-icon-cell vertical-alignment="top"></ndd-icon-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('vertical-alignment')).toBe('top');
	});

	it('defaults to size 24', async () => {
		el = await fixture('<ndd-icon-cell></ndd-icon-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('24');
	});

	it('reflects size attribute', async () => {
		el = await fixture('<ndd-icon-cell size="32"></ndd-icon-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('32');
	});

});
