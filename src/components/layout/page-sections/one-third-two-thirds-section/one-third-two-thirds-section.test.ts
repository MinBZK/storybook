import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './one-third-two-thirds-section.ts';

describe('nldd-one-third-two-thirds-section', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-one-third-two-thirds-section></nldd-one-third-two-thirds-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a section element in the shadow DOM', async () => {
		el = await fixture('<nldd-one-third-two-thirds-section></nldd-one-third-two-thirds-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('section')).not.toBeNull();
	});

	it('renders aside and main columns', async () => {
		el = await fixture('<nldd-one-third-two-thirds-section></nldd-one-third-two-thirds-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.one-third-two-thirds-section__left-column')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('.one-third-two-thirds-section__right-column')).not.toBeNull();
	});

});
