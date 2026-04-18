import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './ndd-split-button.ts';

describe('ndd-split-button', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-split-button></ndd-split-button>');
		await waitForUpdate(el);

		expect(el.shadowRoot).not.toBeNull();
	});
});
