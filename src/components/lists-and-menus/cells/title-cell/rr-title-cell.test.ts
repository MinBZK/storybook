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
		expect(el.style.getPropertyValue('--_width')).toBe('120px');
	});

	it('sets --_min-width custom property', async () => {
		el = await fixture('<rr-title-cell min-width="80"></rr-title-cell>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_min-width')).toBe('80px');
	});

	it('sets --_max-width custom property', async () => {
		el = await fixture('<rr-title-cell max-width="300"></rr-title-cell>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_max-width')).toBe('300px');
	});

	it('sets --_min-height custom property', async () => {
		el = await fixture('<rr-title-cell min-height="44"></rr-title-cell>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_min-height')).toBe('44px');
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

	it('renders text attribute content', async () => {
		el = await fixture('<rr-title-cell text="My title"></rr-title-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('text')).toBe('My title');
	});

	it('renders overline attribute content', async () => {
		el = await fixture('<rr-title-cell overline="Overline"></rr-title-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('overline')).toBe('Overline');
	});

	it('renders supporting-text attribute content', async () => {
		el = await fixture('<rr-title-cell supporting-text="Supporting"></rr-title-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('supporting-text')).toBe('Supporting');
	});

	it('renders a <p> by default (no heading-level)', async () => {
		el = await fixture('<rr-title-cell text="Title"></rr-title-cell>');
		await waitForUpdate(el);
		const title = el.shadowRoot!.querySelector('.title-cell__title');
		expect(title).not.toBeNull();
		expect(title!.tagName.toLowerCase()).toBe('p');
	});

	it('renders an <h2> when heading-level="2"', async () => {
		el = await fixture('<rr-title-cell text="Title" heading-level="2"></rr-title-cell>');
		await waitForUpdate(el);
		const title = el.shadowRoot!.querySelector('.title-cell__title');
		expect(title).not.toBeNull();
		expect(title!.tagName.toLowerCase()).toBe('h2');
	});
});
