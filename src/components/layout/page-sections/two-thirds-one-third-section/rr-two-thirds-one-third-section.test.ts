import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './rr-two-thirds-one-third-section.ts';

describe('rr-two-thirds-one-third-section', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-two-thirds-one-third-section></rr-two-thirds-one-third-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a section element in the shadow DOM', async () => {
		el = await fixture('<rr-two-thirds-one-third-section></rr-two-thirds-one-third-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('section')).not.toBeNull();
	});

	it('renders aside and main columns', async () => {
		el = await fixture('<rr-two-thirds-one-third-section></rr-two-thirds-one-third-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.two-thirds-one-third-section__left-column')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('.two-thirds-one-third-section__right-column')).not.toBeNull();
	});
});
