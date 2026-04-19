import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.js';
import './icon-cell.js';

describe('nldd-icon-cell', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-icon-cell></nldd-icon-cell>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults to center vertical alignment', async () => {
		el = await fixture('<nldd-icon-cell></nldd-icon-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('vertical-alignment')).toBe('center');
	});

	it('reflects vertical-alignment attribute', async () => {
		el = await fixture('<nldd-icon-cell vertical-alignment="top"></nldd-icon-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('vertical-alignment')).toBe('top');
	});

	it('defaults to size 24', async () => {
		el = await fixture('<nldd-icon-cell></nldd-icon-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('24');
	});

	it('reflects size attribute', async () => {
		el = await fixture('<nldd-icon-cell size="32"></nldd-icon-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('32');
	});

});
