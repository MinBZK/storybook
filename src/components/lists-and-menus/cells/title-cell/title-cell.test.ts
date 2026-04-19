import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.js';
import './title-cell.ts';

describe('nldd-title-cell', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-title-cell></nldd-title-cell>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults to size 5', async () => {
		el = await fixture('<nldd-title-cell></nldd-title-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('5');
	});

	it('reflects size attribute', async () => {
		el = await fixture('<nldd-title-cell size="2"></nldd-title-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('2');
	});

	it('defaults to default color', async () => {
		el = await fixture('<nldd-title-cell></nldd-title-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('color')).toBe('default');
	});

	it('reflects color attribute', async () => {
		el = await fixture('<nldd-title-cell color="inherit"></nldd-title-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('color')).toBe('inherit');
	});

	it('defaults to stretch width', async () => {
		el = await fixture('<nldd-title-cell></nldd-title-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('width')).toBe('stretch');
	});

	it('reflects width attribute', async () => {
		el = await fixture('<nldd-title-cell width="fit-content"></nldd-title-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('width')).toBe('fit-content');
	});

	it('sets inline width style for numeric width', async () => {
		el = await fixture('<nldd-title-cell width="120"></nldd-title-cell>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_width')).toBe('120px');
	});

	it('sets --_min-width custom property', async () => {
		el = await fixture('<nldd-title-cell min-width="80"></nldd-title-cell>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_min-width')).toBe('80px');
	});

	it('sets --_max-width custom property', async () => {
		el = await fixture('<nldd-title-cell max-width="300"></nldd-title-cell>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_max-width')).toBe('300px');
	});

	it('sets --_min-height custom property', async () => {
		el = await fixture('<nldd-title-cell min-height="44"></nldd-title-cell>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_min-height')).toBe('44px');
	});

	it('defaults to left horizontal alignment', async () => {
		el = await fixture('<nldd-title-cell></nldd-title-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('horizontal-alignment')).toBe('left');
	});

	it('reflects horizontal-alignment attribute', async () => {
		el = await fixture('<nldd-title-cell horizontal-alignment="right"></nldd-title-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('horizontal-alignment')).toBe('right');
	});

	it('defaults to center vertical alignment', async () => {
		el = await fixture('<nldd-title-cell></nldd-title-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('vertical-alignment')).toBe('center');
	});

	it('reflects vertical-alignment top', async () => {
		el = await fixture('<nldd-title-cell vertical-alignment="top"></nldd-title-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('vertical-alignment')).toBe('top');
	});

	it('reflects vertical-alignment bottom', async () => {
		el = await fixture('<nldd-title-cell vertical-alignment="bottom"></nldd-title-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('vertical-alignment')).toBe('bottom');
	});

	it('renders text in shadow DOM', async () => {
		el = await fixture('<nldd-title-cell text="My title"></nldd-title-cell>');
		await waitForUpdate(el);
		const title = el.shadowRoot!.querySelector('.title-cell__title');
		expect(title).not.toBeNull();
		expect(title!.textContent?.trim()).toBe('My title');
	});

	it('renders overline in shadow DOM', async () => {
		el = await fixture('<nldd-title-cell overline="Overline"></nldd-title-cell>');
		await waitForUpdate(el);
		const p = el.shadowRoot!.querySelector('.title-cell__overline');
		expect(p).not.toBeNull();
		expect(p!.textContent?.trim()).toBe('Overline');
	});

	it('renders supporting-text in shadow DOM', async () => {
		el = await fixture('<nldd-title-cell supporting-text="Supporting"></nldd-title-cell>');
		await waitForUpdate(el);
		const p = el.shadowRoot!.querySelector('.title-cell__supporting-text');
		expect(p).not.toBeNull();
		expect(p!.textContent?.trim()).toBe('Supporting');
	});

	it('does not render title element when text is empty', async () => {
		el = await fixture('<nldd-title-cell></nldd-title-cell>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.title-cell__title')).toBeNull();
	});

	it('renders a <p> by default (no heading-level)', async () => {
		el = await fixture('<nldd-title-cell text="Title"></nldd-title-cell>');
		await waitForUpdate(el);
		const title = el.shadowRoot!.querySelector('.title-cell__title');
		expect(title).not.toBeNull();
		expect(title!.tagName.toLowerCase()).toBe('p');
	});

	it('renders an <h1> when heading-level="1"', async () => {
		el = await fixture('<nldd-title-cell text="Title" heading-level="1"></nldd-title-cell>');
		await waitForUpdate(el);
		const title = el.shadowRoot!.querySelector('.title-cell__title');
		expect(title!.tagName.toLowerCase()).toBe('h1');
	});

	it('renders an <h2> when heading-level="2"', async () => {
		el = await fixture('<nldd-title-cell text="Title" heading-level="2"></nldd-title-cell>');
		await waitForUpdate(el);
		const title = el.shadowRoot!.querySelector('.title-cell__title');
		expect(title!.tagName.toLowerCase()).toBe('h2');
	});

	it('renders an <h6> when heading-level="6"', async () => {
		el = await fixture('<nldd-title-cell text="Title" heading-level="6"></nldd-title-cell>');
		await waitForUpdate(el);
		const title = el.shadowRoot!.querySelector('.title-cell__title');
		expect(title!.tagName.toLowerCase()).toBe('h6');
	});

	it('falls back to <p> when heading-level="0"', async () => {
		el = await fixture('<nldd-title-cell text="Title" heading-level="0"></nldd-title-cell>');
		await waitForUpdate(el);
		const title = el.shadowRoot!.querySelector('.title-cell__title');
		expect(title!.tagName.toLowerCase()).toBe('p');
	});

	it('falls back to <p> when heading-level="7"', async () => {
		el = await fixture('<nldd-title-cell text="Title" heading-level="7"></nldd-title-cell>');
		await waitForUpdate(el);
		const title = el.shadowRoot!.querySelector('.title-cell__title');
		expect(title!.tagName.toLowerCase()).toBe('p');
	});
});
