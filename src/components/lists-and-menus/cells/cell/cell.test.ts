import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.js';
import './cell.ts';

describe('nldd-cell', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-cell></nldd-cell>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults to fit-content width', async () => {
		el = await fixture('<nldd-cell></nldd-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('width')).toBe('fit-content');
	});

	it('reflects width attribute', async () => {
		el = await fixture('<nldd-cell width="stretch"></nldd-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('width')).toBe('stretch');
	});

	it('sets inline width style for numeric width', async () => {
		el = await fixture('<nldd-cell width="120"></nldd-cell>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_width')).toBe('120px');
	});

	it('sets --_min-width custom property', async () => {
		el = await fixture('<nldd-cell min-width="80"></nldd-cell>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_min-width')).toBe('80px');
	});

	it('sets --_max-width custom property', async () => {
		el = await fixture('<nldd-cell max-width="200"></nldd-cell>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_max-width')).toBe('200px');
	});

	it('sets --_min-height custom property', async () => {
		el = await fixture('<nldd-cell min-height="44"></nldd-cell>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_min-height')).toBe('44px');
	});

	it('defaults to center vertical alignment', async () => {
		el = await fixture('<nldd-cell></nldd-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('vertical-alignment')).toBe('center');
	});

	it('reflects vertical-alignment top', async () => {
		el = await fixture('<nldd-cell vertical-alignment="top"></nldd-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('vertical-alignment')).toBe('top');
	});

	it('reflects vertical-alignment bottom', async () => {
		el = await fixture('<nldd-cell vertical-alignment="bottom"></nldd-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('vertical-alignment')).toBe('bottom');
	});
});
