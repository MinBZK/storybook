import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './container.ts';

describe('nldd-container', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-container></nldd-container>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('reflects padding attribute', async () => {
		el = await fixture('<nldd-container padding="16"></nldd-container>');
		await waitForUpdate(el);
		expect(el.getAttribute('padding')).toBe('16');
	});
	it('reflects padding-inline attribute', async () => {
		el = await fixture('<nldd-container padding-inline="16"></nldd-container>');
		await waitForUpdate(el);
		expect(el.getAttribute('padding-inline')).toBe('16');
	});
	it('reflects padding-block attribute', async () => {
		el = await fixture('<nldd-container padding-block="16"></nldd-container>');
		await waitForUpdate(el);
		expect(el.getAttribute('padding-block')).toBe('16');
	});
	it('reflects padding-top attribute', async () => {
		el = await fixture('<nldd-container padding-top="16"></nldd-container>');
		await waitForUpdate(el);
		expect(el.getAttribute('padding-top')).toBe('16');
	});
	it('reflects padding-right attribute', async () => {
		el = await fixture('<nldd-container padding-right="16"></nldd-container>');
		await waitForUpdate(el);
		expect(el.getAttribute('padding-right')).toBe('16');
	});
	it('reflects padding-bottom attribute', async () => {
		el = await fixture('<nldd-container padding-bottom="16"></nldd-container>');
		await waitForUpdate(el);
		expect(el.getAttribute('padding-bottom')).toBe('16');
	});
	it('reflects padding-left attribute', async () => {
		el = await fixture('<nldd-container padding-left="16"></nldd-container>');
		await waitForUpdate(el);
		expect(el.getAttribute('padding-left')).toBe('16');
	});
	it('reflects sm-padding attribute', async () => {
		el = await fixture('<nldd-container sm-padding="24"></nldd-container>');
		await waitForUpdate(el);
		expect(el.getAttribute('sm-padding')).toBe('24');
	});
	it('reflects md-padding attribute', async () => {
		el = await fixture('<nldd-container md-padding="24"></nldd-container>');
		await waitForUpdate(el);
		expect(el.getAttribute('md-padding')).toBe('24');
	});
	it('reflects lg-padding attribute', async () => {
		el = await fixture('<nldd-container lg-padding="24"></nldd-container>');
		await waitForUpdate(el);
		expect(el.getAttribute('lg-padding')).toBe('24');
	});
	it('reflects layout-area-sm-padding attribute', async () => {
		el = await fixture('<nldd-container layout-area-sm-padding="24"></nldd-container>');
		await waitForUpdate(el);
		expect(el.getAttribute('layout-area-sm-padding')).toBe('24');
	});
	it('reflects layout-area-md-padding attribute', async () => {
		el = await fixture('<nldd-container layout-area-md-padding="24"></nldd-container>');
		await waitForUpdate(el);
		expect(el.getAttribute('layout-area-md-padding')).toBe('24');
	});
	it('reflects layout-area-lg-padding attribute', async () => {
		el = await fixture('<nldd-container layout-area-lg-padding="24"></nldd-container>');
		await waitForUpdate(el);
		expect(el.getAttribute('layout-area-lg-padding')).toBe('24');
	});
	it('accepts none as padding value', async () => {
		el = await fixture('<nldd-container padding="0"></nldd-container>');
		await waitForUpdate(el);
		expect(el.getAttribute('padding')).toBe('0');
	});
});
