import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './box.ts';

describe('nldd-box', () => {
	let el: HTMLElement;
	afterEach(() => {
		if (el) cleanup(el);
	});
	it('renders without error', async () => {
		el = await fixture('<nldd-box></nldd-box>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});
	it('renders a div element in the shadow DOM', async () => {
		el = await fixture('<nldd-box></nldd-box>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('div')).not.toBeNull();
	});
});
