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
		// No default attribute pollution; stack comes from the .container default style.
		expect(el.hasAttribute('layout')).toBe(false);
		// :host is just a padding wrapper now (block); layout lives on .container.
		expect(getComputedStyle(el).display).toBe('block');
		const inner = el.shadowRoot!.querySelector('.container') as HTMLElement;
		expect(getComputedStyle(inner).display).toBe('flex');
		expect(getComputedStyle(inner).flexDirection).toBe('column');
	});

	it('layout=row sets flex-direction: row on the inner', async () => {
		el = await fixture('<nldd-container layout="row"></nldd-container>');
		await waitForUpdate(el);
		const inner = el.shadowRoot!.querySelector('.container') as HTMLElement;
		expect(getComputedStyle(inner).flexDirection).toBe('row');
		expect(getComputedStyle(inner).flexWrap).toBe('nowrap');
	});

	it('layout=wrap sets row-reverse-style + flex-wrap on the inner', async () => {
		el = await fixture('<nldd-container layout="wrap"></nldd-container>');
		await waitForUpdate(el);
		const inner = el.shadowRoot!.querySelector('.container') as HTMLElement;
		expect(getComputedStyle(inner).flexDirection).toBe('row');
		expect(getComputedStyle(inner).flexWrap).toBe('wrap');
	});

	it('layout=grid switches the inner to display: grid', async () => {
		el = await fixture('<nldd-container layout="grid"></nldd-container>');
		await waitForUpdate(el);
		const inner = el.shadowRoot!.querySelector('.container') as HTMLElement;
		expect(getComputedStyle(inner).display).toBe('grid');
	});

	it('layout=columns keeps the inner as block (multicol)', async () => {
		el = await fixture('<nldd-container layout="columns"></nldd-container>');
		await waitForUpdate(el);
		const inner = el.shadowRoot!.querySelector('.container') as HTMLElement;
		expect(getComputedStyle(inner).display).toBe('block');
		expect(el.getAttribute('layout')).toBe('columns');
	});

	it('layout=lanes uses native grid lanes where supported, multicol fallback otherwise', async () => {
		el = await fixture('<nldd-container layout="lanes"><div>a</div></nldd-container>');
		await waitForUpdate(el);
		const inner = el.shadowRoot!.querySelector('.container') as HTMLElement;
		// native CSS grid lanes where supported, CSS multicol (block) fallback otherwise.
		expect(['block', 'grid-lanes']).toContain(getComputedStyle(inner).display);
		expect(el.getAttribute('layout')).toBe('lanes');
		// slotted children avoid breaking across columns (both branches).
		const child = el.querySelector('div') as HTMLElement;
		expect(getComputedStyle(child).breakInside).toBe('avoid');
	});

	it('column-count="4" sets the --_column-count var on the inner', async () => {
		el = await fixture('<nldd-container layout="grid" column-count="4"></nldd-container>');
		await waitForUpdate(el);
		const inner = el.shadowRoot!.querySelector('.container') as HTMLElement;
		expect(getComputedStyle(inner).getPropertyValue('--_column-count').trim()).toBe('4');
		expect(getComputedStyle(inner).getPropertyValue('--_track-min').trim()).toBe('0');
	});

	it('reflects column-count + per-viewport variants as integer attributes', async () => {
		el = await fixture('<nldd-container column-count="4" sm-column-count="1" md-column-count="2" lg-column-count="4"></nldd-container>');
		await waitForUpdate(el);
		expect(el.getAttribute('column-count')).toBe('4');
		expect(el.getAttribute('sm-column-count')).toBe('1');
		expect(el.getAttribute('md-column-count')).toBe('2');
		expect(el.getAttribute('lg-column-count')).toBe('4');
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

	it('maps grid vertical-alignment to align-items (per-cell), not justify-content', async () => {
		el = await fixture('<nldd-container layout="grid" vertical-alignment="center"></nldd-container>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_align-items')).toBe('center');
		expect(el.style.getPropertyValue('--_justify-content')).toBe('');
	});

	it('maps grid horizontal-alignment to both justify-items and justify-content', async () => {
		el = await fixture('<nldd-container layout="grid" horizontal-alignment="center"></nldd-container>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_justify-items')).toBe('center');
		expect(el.style.getPropertyValue('--_justify-content')).toBe('center');
	});

	it('bridges order attr on a slotted child to --_slot-order inline custom prop', async () => {
		el = await fixture('<nldd-container layout="row"><div order="3"></div></nldd-container>');
		await waitForUpdate(el);
		const child = el.querySelector('div') as HTMLElement;
		expect(child.style.getPropertyValue('--_slot-order')).toBe('3');
	});

	it('bridges sm-order / md-order / lg-order independently', async () => {
		el = await fixture('<nldd-container layout="row"><div order="1" sm-order="5" md-order="2" lg-order="9"></div></nldd-container>');
		await waitForUpdate(el);
		const child = el.querySelector('div') as HTMLElement;
		expect(child.style.getPropertyValue('--_slot-order')).toBe('1');
		expect(child.style.getPropertyValue('--_slot-sm-order')).toBe('5');
		expect(child.style.getPropertyValue('--_slot-md-order')).toBe('2');
		expect(child.style.getPropertyValue('--_slot-lg-order')).toBe('9');
	});

	it('accepts negative order values', async () => {
		el = await fixture('<nldd-container layout="row"><div order="-1"></div></nldd-container>');
		await waitForUpdate(el);
		const child = el.querySelector('div') as HTMLElement;
		expect(child.style.getPropertyValue('--_slot-order')).toBe('-1');
	});

	it('removes the inline custom prop when the order attribute is cleared', async () => {
		el = await fixture('<nldd-container layout="row"><div order="3"></div></nldd-container>');
		await waitForUpdate(el);
		const child = el.querySelector('div') as HTMLElement;
		child.removeAttribute('order');
		await new Promise(r => requestAnimationFrame(() => r(null)));
		expect(child.style.getPropertyValue('--_slot-order')).toBe('');
	});

	it('accepts 0 as padding value', async () => {
		el = await fixture('<nldd-container padding="0"></nldd-container>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_padding-top')).toBe('0');
	});
});
