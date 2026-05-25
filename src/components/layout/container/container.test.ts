import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './container.js';

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

	it('does not reflect a layout attribute by default (stack is the implicit default)', async () => {
		el = await fixture('<nldd-container></nldd-container>');
		await waitForUpdate(el);
		// No default attribute pollution; stack comes from the :host default style.
		expect(el.hasAttribute('layout')).toBe(false);
		expect(getComputedStyle(el).display).toBe('flex');
		expect(getComputedStyle(el).flexDirection).toBe('column');
	});

	it('layout=row sets flex-direction: row', async () => {
		el = await fixture('<nldd-container layout="row"></nldd-container>');
		await waitForUpdate(el);
		expect(getComputedStyle(el).flexDirection).toBe('row');
		expect(getComputedStyle(el).flexWrap).toBe('nowrap');
	});

	it('layout=wrap sets flex-direction: row + flex-wrap: wrap', async () => {
		el = await fixture('<nldd-container layout="wrap"></nldd-container>');
		await waitForUpdate(el);
		expect(getComputedStyle(el).flexDirection).toBe('row');
		expect(getComputedStyle(el).flexWrap).toBe('wrap');
	});

	it('layout=grid switches to display: grid', async () => {
		el = await fixture('<nldd-container layout="grid"></nldd-container>');
		await waitForUpdate(el);
		expect(getComputedStyle(el).display).toBe('grid');
	});

	it('layout=columns switches to display: block with column-width', async () => {
		el = await fixture('<nldd-container layout="columns"></nldd-container>');
		await waitForUpdate(el);
		expect(getComputedStyle(el).display).toBe('block');
		expect(getComputedStyle(el).columnWidth).toBe('280px');
	});

	it('writes --_padding-* longhands from padding attr', async () => {
		el = await fixture('<nldd-container padding="16"></nldd-container>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_padding-top')).toBe('var(--primitives-space-16)');
		expect(el.style.getPropertyValue('--_padding-right')).toBe('var(--primitives-space-16)');
		expect(el.style.getPropertyValue('--_padding-bottom')).toBe('var(--primitives-space-16)');
		expect(el.style.getPropertyValue('--_padding-left')).toBe('var(--primitives-space-16)');
	});

	it('per-side padding overrides axis and all', async () => {
		el = await fixture('<nldd-container padding="16" padding-block="8" padding-top="32"></nldd-container>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_padding-top')).toBe('var(--primitives-space-32)');
		expect(el.style.getPropertyValue('--_padding-bottom')).toBe('var(--primitives-space-8)');
		expect(el.style.getPropertyValue('--_padding-right')).toBe('var(--primitives-space-16)');
		expect(el.style.getPropertyValue('--_padding-left')).toBe('var(--primitives-space-16)');
	});

	it('writes scoped --_sm-padding-* from sm-padding attr', async () => {
		el = await fixture('<nldd-container sm-padding="8"></nldd-container>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_sm-padding-top')).toBe('var(--primitives-space-8)');
		expect(el.style.getPropertyValue('--_sm-padding-left')).toBe('var(--primitives-space-8)');
	});

	it('writes --_gap from gap attr', async () => {
		el = await fixture('<nldd-container gap="12"></nldd-container>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_gap')).toBe('var(--primitives-space-12)');
	});

	it('writes responsive --_sm-gap', async () => {
		el = await fixture('<nldd-container sm-gap="4"></nldd-container>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_sm-gap')).toBe('var(--primitives-space-4)');
	});

	it('maps horizontal-alignment to justify-content for layout=row', async () => {
		el = await fixture('<nldd-container layout="row" horizontal-alignment="center"></nldd-container>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_justify-content')).toBe('center');
		expect(el.style.getPropertyValue('--_align-items')).toBe('');
	});

	it('maps horizontal-alignment to align-items for layout=stack (default)', async () => {
		el = await fixture('<nldd-container horizontal-alignment="right"></nldd-container>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_align-items')).toBe('flex-end');
		expect(el.style.getPropertyValue('--_justify-content')).toBe('');
	});

	it('maps vertical-alignment to align-items for layout=row', async () => {
		el = await fixture('<nldd-container layout="row" vertical-alignment="bottom"></nldd-container>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_align-items')).toBe('flex-end');
	});

	it('treats layout=wrap like layout=row for alignment-axis mapping', async () => {
		el = await fixture('<nldd-container layout="wrap" horizontal-alignment="center"></nldd-container>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_justify-content')).toBe('center');
	});

	it('accepts 0 as padding value', async () => {
		el = await fixture('<nldd-container padding="0"></nldd-container>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_padding-top')).toBe('0');
	});
});
