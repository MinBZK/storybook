import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './ndd-page.ts';

describe('ndd-page', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-page></ndd-page>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('reflects sticky-header attribute', async () => {
		el = await fixture('<ndd-page sticky-header></ndd-page>');
		await waitForUpdate(el);
		expect(el.hasAttribute('sticky-header')).toBe(true);
	});

	it('reflects sticky-footer attribute', async () => {
		el = await fixture('<ndd-page sticky-footer></ndd-page>');
		await waitForUpdate(el);
		expect(el.hasAttribute('sticky-footer')).toBe(true);
	});

	it('reflects tinted attribute', async () => {
		el = await fixture('<ndd-page background="tinted"></ndd-page>');
		await waitForUpdate(el);
		expect(el.getAttribute('background')).toBe('tinted');
	});
});
