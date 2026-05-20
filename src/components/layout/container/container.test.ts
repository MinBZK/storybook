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

	it('defaults direction to column', async () => {
		el = await fixture('<nldd-container></nldd-container>');
		await waitForUpdate(el);
		expect(el.getAttribute('direction')).toBe('column');
	});

	it('reflects direction=row', async () => {
		el = await fixture('<nldd-container direction="row"></nldd-container>');
		await waitForUpdate(el);
		expect(el.getAttribute('direction')).toBe('row');
	});

	it('reflects wrap', async () => {
		el = await fixture('<nldd-container wrap></nldd-container>');
		await waitForUpdate(el);
		expect(el.hasAttribute('wrap')).toBe(true);
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

	it('maps horizontal-alignment to justify-content for row direction', async () => {
		el = await fixture('<nldd-container direction="row" horizontal-alignment="center"></nldd-container>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_justify-content')).toBe('center');
		expect(el.style.getPropertyValue('--_align-items')).toBe('');
	});

	it('maps horizontal-alignment to align-items for column direction', async () => {
		el = await fixture('<nldd-container direction="column" horizontal-alignment="right"></nldd-container>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_align-items')).toBe('flex-end');
		expect(el.style.getPropertyValue('--_justify-content')).toBe('');
	});

	it('maps vertical-alignment to align-items for row direction', async () => {
		el = await fixture('<nldd-container direction="row" vertical-alignment="bottom"></nldd-container>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_align-items')).toBe('flex-end');
	});

	it('accepts 0 as padding value', async () => {
		el = await fixture('<nldd-container padding="0"></nldd-container>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_padding-top')).toBe('0');
	});
});
