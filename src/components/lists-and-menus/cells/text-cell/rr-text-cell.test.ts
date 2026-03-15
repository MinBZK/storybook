import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './rr-text-cell.ts';

describe('rr-text-cell', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-text-cell></rr-text-cell>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults to md size', async () => {
		el = await fixture('<rr-text-cell></rr-text-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('md');
	});

	it('reflects size attribute', async () => {
		el = await fixture('<rr-text-cell size="sm"></rr-text-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('sm');
	});

	it('defaults to default color', async () => {
		el = await fixture('<rr-text-cell></rr-text-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('color')).toBe('default');
	});

	it('reflects color attribute', async () => {
		el = await fixture('<rr-text-cell color="secondary"></rr-text-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('color')).toBe('secondary');
	});

	it('defaults to stretch width', async () => {
		el = await fixture('<rr-text-cell></rr-text-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('width')).toBe('stretch');
	});

	it('reflects width attribute', async () => {
		el = await fixture('<rr-text-cell width="fit-content"></rr-text-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('width')).toBe('fit-content');
	});

	it('sets inline width style for numeric width', async () => {
		el = await fixture('<rr-text-cell width="120"></rr-text-cell>');
		await waitForUpdate(el);
		expect(el.style.width).toBe('120px');
	});

	it('sets --_min-width custom property', async () => {
		el = await fixture('<rr-text-cell min-width="80"></rr-text-cell>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_min-width')).toBe('80px');
	});

	it('sets --_max-width custom property', async () => {
		el = await fixture('<rr-text-cell max-width="200"></rr-text-cell>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_max-width')).toBe('200px');
	});

	it('sets --_min-height custom property', async () => {
		el = await fixture('<rr-text-cell min-height="44"></rr-text-cell>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_min-height')).toBe('44px');
	});

	it('defaults to left horizontal alignment', async () => {
		el = await fixture('<rr-text-cell></rr-text-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('horizontal-alignment')).toBe('left');
	});

	it('reflects horizontal-alignment attribute', async () => {
		el = await fixture('<rr-text-cell horizontal-alignment="right"></rr-text-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('horizontal-alignment')).toBe('right');
	});

	it('defaults to center vertical alignment', async () => {
		el = await fixture('<rr-text-cell></rr-text-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('vertical-alignment')).toBe('center');
	});

	it('reflects vertical-alignment top', async () => {
		el = await fixture('<rr-text-cell vertical-alignment="top"></rr-text-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('vertical-alignment')).toBe('top');
	});

	it('reflects vertical-alignment bottom', async () => {
		el = await fixture('<rr-text-cell vertical-alignment="bottom"></rr-text-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('vertical-alignment')).toBe('bottom');
	});

	it('renders slotted text content', async () => {
		el = await fixture('<rr-text-cell><p slot="text">Hallo</p></rr-text-cell>');
		await waitForUpdate(el);
		const p = el.querySelector('[slot="text"]');
		expect(p?.textContent?.trim()).toBe('Hallo');
	});

	it('renders slotted overline content', async () => {
		el = await fixture('<rr-text-cell><p slot="overline">Overline</p></rr-text-cell>');
		await waitForUpdate(el);
		const p = el.querySelector('[slot="overline"]');
		expect(p?.textContent?.trim()).toBe('Overline');
	});

	it('renders slotted supporting-text content', async () => {
		el = await fixture('<rr-text-cell><p slot="supporting-text">Supporting</p></rr-text-cell>');
		await waitForUpdate(el);
		const p = el.querySelector('[slot="supporting-text"]');
		expect(p?.textContent?.trim()).toBe('Supporting');
	});

	it('defaults selected to false', async () => {
		el = await fixture('<rr-text-cell></rr-text-cell>');
		await waitForUpdate(el);
		expect(el.hasAttribute('selected')).toBe(false);
	});

	it('reflects selected attribute', async () => {
		el = await fixture('<rr-text-cell selected></rr-text-cell>');
		await waitForUpdate(el);
		expect(el.hasAttribute('selected')).toBe(true);
	});
});
