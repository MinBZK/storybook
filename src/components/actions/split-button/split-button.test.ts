import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './split-button.ts';

describe('nldd-split-button', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-split-button></nldd-split-button>');
		await waitForUpdate(el);

		expect(el.shadowRoot).not.toBeNull();
	});
});
