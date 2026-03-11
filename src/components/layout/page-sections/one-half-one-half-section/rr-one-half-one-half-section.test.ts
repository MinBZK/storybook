import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './rr-one-half-one-half-section.ts';

describe('rr-one-half-one-half-section', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-one-half-one-half-section></rr-one-half-one-half-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a section element in the shadow DOM', async () => {
		el = await fixture('<rr-one-half-one-half-section></rr-one-half-one-half-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('section')).not.toBeNull();
	});

	it('renders main and aside columns', async () => {
		el = await fixture('<rr-one-half-one-half-section></rr-one-half-one-half-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.section__main')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('.section__aside')).not.toBeNull();
	});
});
