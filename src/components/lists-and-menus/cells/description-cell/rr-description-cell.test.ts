import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './rr-description-cell.ts';

describe('rr-description-cell', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-description-cell></rr-description-cell>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults to stretch width', async () => {
		el = await fixture('<rr-description-cell></rr-description-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('width')).toBe('stretch');
	});

	it('reflects width attribute', async () => {
		el = await fixture('<rr-description-cell width="fit-content"></rr-description-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('width')).toBe('fit-content');
	});

	it('sets inline width style for numeric width', async () => {
		el = await fixture('<rr-description-cell width="200"></rr-description-cell>');
		await waitForUpdate(el);
		expect(el.style.width).toBe('200px');
	});

	it('sets --_min-width custom property', async () => {
		el = await fixture('<rr-description-cell min-width="80"></rr-description-cell>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_min-width')).toBe('80px');
	});

	it('sets --_max-width custom property', async () => {
		el = await fixture('<rr-description-cell max-width="300"></rr-description-cell>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_max-width')).toBe('300px');
	});

	it('sets --_min-height custom property', async () => {
		el = await fixture('<rr-description-cell min-height="44"></rr-description-cell>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_min-height')).toBe('44px');
	});

	it('defaults to center vertical alignment', async () => {
		el = await fixture('<rr-description-cell></rr-description-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('vertical-alignment')).toBe('center');
	});

	it('reflects vertical-alignment top', async () => {
		el = await fixture('<rr-description-cell vertical-alignment="top"></rr-description-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('vertical-alignment')).toBe('top');
	});

	it('reflects vertical-alignment bottom', async () => {
		el = await fixture('<rr-description-cell vertical-alignment="bottom"></rr-description-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('vertical-alignment')).toBe('bottom');
	});

	it('defaults selected to false', async () => {
		el = await fixture('<rr-description-cell></rr-description-cell>');
		await waitForUpdate(el);
		expect(el.hasAttribute('selected')).toBe(false);
	});

	it('reflects selected attribute', async () => {
		el = await fixture('<rr-description-cell selected></rr-description-cell>');
		await waitForUpdate(el);
		expect(el.hasAttribute('selected')).toBe(true);
	});

	it('renders slotted title content', async () => {
		el = await fixture('<rr-description-cell><p slot="title">Label</p></rr-description-cell>');
		await waitForUpdate(el);
		expect(el.querySelector('[slot="title"]')?.textContent?.trim()).toBe('Label');
	});

	it('renders slotted description content', async () => {
		el = await fixture('<rr-description-cell><p slot="description">Description</p></rr-description-cell>');
		await waitForUpdate(el);
		expect(el.querySelector('[slot="description"]')?.textContent?.trim()).toBe('Description');
	});
});
