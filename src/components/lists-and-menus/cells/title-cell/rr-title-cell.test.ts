import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './rr-title-cell.ts';

describe('rr-title-cell', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-title-cell></rr-title-cell>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults to size 5', async () => {
		el = await fixture('<rr-title-cell></rr-title-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('5');
	});

	it('reflects size attribute', async () => {
		el = await fixture('<rr-title-cell size="2"></rr-title-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('2');
	});

	it('defaults to default color', async () => {
		el = await fixture('<rr-title-cell></rr-title-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('color')).toBe('default');
	});

	it('reflects color attribute', async () => {
		el = await fixture('<rr-title-cell color="inherit"></rr-title-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('color')).toBe('inherit');
	});

	it('defaults to stretch width', async () => {
		el = await fixture('<rr-title-cell></rr-title-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('width')).toBe('stretch');
	});

	it('reflects width attribute', async () => {
		el = await fixture('<rr-title-cell width="fit-content"></rr-title-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('width')).toBe('fit-content');
	});

	it('sets inline width style for numeric width', async () => {
		el = await fixture('<rr-title-cell width="120"></rr-title-cell>');
		await waitForUpdate(el);
		expect(el.style.width).toBe('120px');
	});

	it('sets inline min-width style', async () => {
		el = await fixture('<rr-title-cell min-width="80"></rr-title-cell>');
		await waitForUpdate(el);
		expect(el.style.minWidth).toBe('80px');
	});

	it('sets inline max-width style', async () => {
		el = await fixture('<rr-title-cell max-width="300"></rr-title-cell>');
		await waitForUpdate(el);
		expect(el.style.maxWidth).toBe('300px');
	});

	it('sets inline min-height style', async () => {
		el = await fixture('<rr-title-cell min-height="44"></rr-title-cell>');
		await waitForUpdate(el);
		expect(el.style.minHeight).toBe('44px');
	});

	it('defaults to left horizontal alignment', async () => {
		el = await fixture('<rr-title-cell></rr-title-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('horizontal-alignment')).toBe('left');
	});

	it('reflects horizontal-alignment attribute', async () => {
		el = await fixture('<rr-title-cell horizontal-alignment="right"></rr-title-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('horizontal-alignment')).toBe('right');
	});

	it('defaults to center vertical alignment', async () => {
		el = await fixture('<rr-title-cell></rr-title-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('vertical-alignment')).toBe('center');
	});

	it('reflects vertical-alignment top', async () => {
		el = await fixture('<rr-title-cell vertical-alignment="top"></rr-title-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('vertical-alignment')).toBe('top');
	});

	it('reflects vertical-alignment bottom', async () => {
		el = await fixture('<rr-title-cell vertical-alignment="bottom"></rr-title-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('vertical-alignment')).toBe('bottom');
	});

	it('defaults selected to false', async () => {
		el = await fixture('<rr-title-cell></rr-title-cell>');
		await waitForUpdate(el);
		expect(el.hasAttribute('selected')).toBe(false);
	});

	it('reflects selected attribute', async () => {
		el = await fixture('<rr-title-cell selected></rr-title-cell>');
		await waitForUpdate(el);
		expect(el.hasAttribute('selected')).toBe(true);
	});

	it('renders slotted title content', async () => {
		el = await fixture('<rr-title-cell><h2>My title</h2></rr-title-cell>');
		await waitForUpdate(el);
		expect(el.querySelector('h2')?.textContent?.trim()).toBe('My title');
	});

	it('renders slotted overline content', async () => {
		el = await fixture('<rr-title-cell><p slot="overline">Overline</p></rr-title-cell>');
		await waitForUpdate(el);
		expect(el.querySelector('[slot="overline"]')?.textContent?.trim()).toBe('Overline');
	});

	it('renders slotted subtitle content', async () => {
		el = await fixture('<rr-title-cell><p slot="subtitle">Subtitle</p></rr-title-cell>');
		await waitForUpdate(el);
		expect(el.querySelector('[slot="subtitle"]')?.textContent?.trim()).toBe('Subtitle');
	});
});
