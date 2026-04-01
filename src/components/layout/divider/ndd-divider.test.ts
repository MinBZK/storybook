import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './ndd-divider.ts';

describe('ndd-divider', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-divider></ndd-divider>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders an hr element in the shadow DOM', async () => {
		el = await fixture('<ndd-divider></ndd-divider>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('hr')).not.toBeNull();
	});
});
