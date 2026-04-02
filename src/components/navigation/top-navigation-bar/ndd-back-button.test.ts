import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './ndd-back-button.ts';

describe('ndd-back-button', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-back-button></ndd-back-button>');
		await waitForUpdate(el);

		expect(el.shadowRoot).not.toBeNull();
	});
});
