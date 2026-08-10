import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './box.js';

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
	it('keeps the critical variant on the attribute the styles select on', async () => {
		el = await fixture('<nldd-box variant="critical"></nldd-box>');
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('critical');
	});
	it('drops the variant attribute again when set back to the default', async () => {
		el = await fixture('<nldd-box variant="critical"></nldd-box>');
		await waitForUpdate(el);
		(el as HTMLElement & { variant: string }).variant = 'tinted';
		await waitForUpdate(el);
		expect(el.hasAttribute('variant')).toBe(false);
	});

	it('keeps base on the attribute, since the styles select on it', async () => {
		el = await fixture('<nldd-box variant="base"></nldd-box>');
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('base');
	});
});
