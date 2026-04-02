import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './ndd-icon.ts';

describe('ndd-icon', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-icon></ndd-icon>');
		await waitForUpdate(el);

		expect(el.shadowRoot).not.toBeNull();
	});
});
