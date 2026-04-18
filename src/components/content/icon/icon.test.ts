import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './icon.ts';

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
