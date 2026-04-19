import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './divider.js';

describe('nldd-divider', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-divider></nldd-divider>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders an hr element in the shadow DOM', async () => {
		el = await fixture('<nldd-divider></nldd-divider>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('hr')).not.toBeNull();
	});
});
