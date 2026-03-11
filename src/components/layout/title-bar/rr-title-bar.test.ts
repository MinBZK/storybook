import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-title-bar.ts';

describe('rr-title-bar', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-title-bar></rr-title-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders an h1 by default', async () => {
		el = await fixture('<rr-title-bar></rr-title-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('h1')).not.toBeNull();
	});

	it('renders the correct heading level', async () => {
		el = await fixture('<rr-title-bar level="3"></rr-title-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('h3')).not.toBeNull();
	});

	it('does not render overline when not set', async () => {
		el = await fixture('<rr-title-bar></rr-title-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.title-bar__overline')).toBeNull();
	});

	it('renders overline when set', async () => {
		el = await fixture('<rr-title-bar overline="Hoofdstuk 1"></rr-title-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.title-bar__overline')).not.toBeNull();
	});

	it('does not render subtitle when not set', async () => {
		el = await fixture('<rr-title-bar></rr-title-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.title-bar__subtitle')).toBeNull();
	});

	it('renders subtitle when set', async () => {
		el = await fixture('<rr-title-bar subtitle="Ondertitel"></rr-title-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.title-bar__subtitle')).not.toBeNull();
	});
});
