import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './button-group.js';

describe('nldd-button-group', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-button-group></nldd-button-group>');
		await waitForUpdate(el);

		expect(el.shadowRoot).not.toBeNull();
	});
});
