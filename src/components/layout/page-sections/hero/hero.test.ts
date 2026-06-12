import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.js';
import './hero.js';

const MEDIA = '<img slot="media" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 4 3\'%3E%3Crect width=\'4\' height=\'3\'/%3E%3C/svg%3E" alt="">';

describe('nldd-hero', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('rendert zonder fouten', async () => {
		el = await fixture('<nldd-hero></nldd-hero>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults to main-position="bottom-left" and main-width="1/2"', async () => {
		el = await fixture('<nldd-hero></nldd-hero>');
		await waitForUpdate(el);
		expect(el.getAttribute('main-position')).toBe('bottom-left');
		expect(el.getAttribute('main-width')).toBe('1/2');
		expect(el.getAttribute('main-background')).toBe('accent');
	});


	/* ============================================================
	   Corner mapping (curated lookup from the rijkshuisstijl)
	   ============================================================ */

	it.each([
		['bottom-left', 'top-right', 'top-right'],
		['bottom-right', 'bottom-left', 'top-left'],
		['top-left', 'top-right', 'bottom-right'],
		['top-right', 'top-left', 'bottom-left'],
	])('main-position="%s" resolves media corner "%s" and main corner "%s"', async (position, mediaCorner, mainCorner) => {
		el = await fixture(`<nldd-hero main-position="${position}">${MEDIA}</nldd-hero>`);
		await waitForUpdate(el);
		expect(el.getAttribute('data-media-corner')).toBe(mediaCorner);
		expect(el.getAttribute('data-main-corner')).toBe(mainCorner);
	});

	it.each([
		['left', 'top-right'],
		['right', 'top-left'],
	])('full-height main-position="%s" resolves media corner "%s" and a cornerless panel', async (position, mediaCorner) => {
		el = await fixture(`<nldd-hero main-position="${position}">${MEDIA}</nldd-hero>`);
		await waitForUpdate(el);
		expect(el.getAttribute('data-media-corner')).toBe(mediaCorner);
		expect(el.getAttribute('data-main-corner')).toBe('none');
	});

	it('main-width="full" makes the panel cornerless', async () => {
		el = await fixture(`<nldd-hero main-width="full">${MEDIA}</nldd-hero>`);
		await waitForUpdate(el);
		expect(el.getAttribute('data-main-corner')).toBe('none');
	});

	it('media-corner overrides the automatic media corner', async () => {
		el = await fixture(`<nldd-hero media-corner="bottom-right">${MEDIA}</nldd-hero>`);
		await waitForUpdate(el);
		expect(el.getAttribute('data-media-corner')).toBe('bottom-right');
	});


	/* ============================================================
	   Media slot
	   ============================================================ */

	it('hides the media area and marks the host without media', async () => {
		el = await fixture('<nldd-hero></nldd-hero>');
		await waitForUpdate(el);
		expect(el.hasAttribute('data-has-media')).toBe(false);
		expect(el.shadowRoot!.querySelector('.hero__media')!.hasAttribute('hidden')).toBe(true);
		expect(el.getAttribute('data-main-corner')).toBe('none');
	});

	it('shows the media area and the panel corner with slotted media', async () => {
		el = await fixture(`<nldd-hero>${MEDIA}</nldd-hero>`);
		await waitForUpdate(el);
		expect(el.hasAttribute('data-has-media')).toBe(true);
		expect(el.shadowRoot!.querySelector('.hero__media')!.hasAttribute('hidden')).toBe(false);
		expect(el.getAttribute('data-main-corner')).toBe('top-right');
	});

	it('updates when media is added at runtime', async () => {
		el = await fixture('<nldd-hero></nldd-hero>');
		await waitForUpdate(el);
		const img = document.createElement('img');
		img.setAttribute('slot', 'media');
		img.setAttribute('src', 'data:,');
		img.setAttribute('alt', '');
		el.appendChild(img);
		await waitForUpdate(el);
		expect(el.hasAttribute('data-has-media')).toBe(true);
	});

	it('removes data-has-media when the slotted media is removed', async () => {
		el = await fixture(`<nldd-hero>${MEDIA}</nldd-hero>`);
		await waitForUpdate(el);
		expect(el.hasAttribute('data-has-media')).toBe(true);
		el.querySelector('img[slot="media"]')!.remove();
		await waitForUpdate(el);
		expect(el.hasAttribute('data-has-media')).toBe(false);
		expect(el.getAttribute('data-main-corner')).toBe('none');
	});


	/* ============================================================
	   Width (max-width) inline style
	   ============================================================ */

	it('width="full" sets no --_max-width inline style', async () => {
		el = await fixture('<nldd-hero width="full"></nldd-hero>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_max-width')).toBe('');
	});

	it('a CSS-length width feeds --_max-width inline', async () => {
		el = await fixture('<nldd-hero width="600px"></nldd-hero>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_max-width')).toBe('600px');
	});

	it('an invalid width sets no --_max-width', async () => {
		el = await fixture('<nldd-hero width="not-a-length"></nldd-hero>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_max-width')).toBe('');
	});

	it.each(['clamp(300px, 50%, 600px)', 'min(600px, 100%)', 'max(320px, 40vw)'])(
		'accepts the CSS math function width "%s"', async (value) => {
			el = await fixture(`<nldd-hero width="${value}"></nldd-hero>`);
			await waitForUpdate(el);
			expect(el.style.getPropertyValue('--_max-width')).not.toBe('');
		});
});
