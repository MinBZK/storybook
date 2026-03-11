import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-container.ts';

describe('rr-container', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-container></rr-container>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('reflects padding attribute', async () => {
		el = await fixture('<rr-container padding="16"></rr-container>');
		await waitForUpdate(el);
		expect(el.getAttribute('padding')).toBe('16');
	});

	it('reflects padding-inline attribute', async () => {
		el = await fixture('<rr-container padding-inline="24"></rr-container>');
		await waitForUpdate(el);
		expect(el.getAttribute('padding-inline')).toBe('24');
	});

	it('reflects padding-block attribute', async () => {
		el = await fixture('<rr-container padding-block="24"></rr-container>');
		await waitForUpdate(el);
		expect(el.getAttribute('padding-block')).toBe('24');
	});

	it('reflects padding-top attribute', async () => {
		el = await fixture('<rr-container padding-top="8"></rr-container>');
		await waitForUpdate(el);
		expect(el.getAttribute('padding-top')).toBe('8');
	});

	it('reflects padding-right attribute', async () => {
		el = await fixture('<rr-container padding-right="8"></rr-container>');
		await waitForUpdate(el);
		expect(el.getAttribute('padding-right')).toBe('8');
	});

	it('reflects padding-bottom attribute', async () => {
		el = await fixture('<rr-container padding-bottom="8"></rr-container>');
		await waitForUpdate(el);
		expect(el.getAttribute('padding-bottom')).toBe('8');
	});

	it('reflects padding-left attribute', async () => {
		el = await fixture('<rr-container padding-left="8"></rr-container>');
		await waitForUpdate(el);
		expect(el.getAttribute('padding-left')).toBe('8');
	});

	it('accepts none as padding value', async () => {
		el = await fixture('<rr-container padding="none"></rr-container>');
		await waitForUpdate(el);
		expect(el.getAttribute('padding')).toBe('none');
	});
});
