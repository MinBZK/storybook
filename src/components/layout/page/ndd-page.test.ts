import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './ndd-page.ts';

describe('ndd-page', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-page></ndd-page>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('reflects sticky-header attribute', async () => {
		el = await fixture('<ndd-page sticky-header></ndd-page>');
		await waitForUpdate(el);
		expect(el.hasAttribute('sticky-header')).toBe(true);
	});

	it('reflects sticky-footer attribute', async () => {
		el = await fixture('<ndd-page sticky-footer></ndd-page>');
		await waitForUpdate(el);
		expect(el.hasAttribute('sticky-footer')).toBe(true);
	});

	it('reflects tinted attribute', async () => {
		el = await fixture('<ndd-page background="tinted"></ndd-page>');
		await waitForUpdate(el);
		expect(el.getAttribute('background')).toBe('tinted');
	});

	it('renders a page__scroll wrapper', async () => {
		el = await fixture('<ndd-page></ndd-page>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.page__scroll')).not.toBeNull();
	});

	it('sets paddingTop on scroll wrapper when sticky-header is set', async () => {
		el = await fixture('<ndd-page sticky-header><div slot="header" style="height: 48px;">Header</div></ndd-page>');
		await waitForUpdate(el);
		// ResizeObserver fires asynchronously — wait for it to settle
		await new Promise(r => setTimeout(r, 100));
		const scroll = el.shadowRoot!.querySelector('.page__scroll') as HTMLElement;
		expect(scroll.style.paddingTop).not.toBe('');
	});

});
