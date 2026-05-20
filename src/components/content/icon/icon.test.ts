import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './icon.js';

describe('nldd-icon', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-icon></nldd-icon>');
		await waitForUpdate(el);

		expect(el.shadowRoot).not.toBeNull();
	});
});
