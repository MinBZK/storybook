import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './spacer.js';

describe('nldd-spacer', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-spacer></nldd-spacer>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('reflects size attribute', async () => {
		el = await fixture('<nldd-spacer size="32"></nldd-spacer>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('32');
	});

	it('reflects direction attribute', async () => {
		el = await fixture('<nldd-spacer direction="horizontal"></nldd-spacer>');
		await waitForUpdate(el);
		expect(el.getAttribute('direction')).toBe('horizontal');
	});
});
