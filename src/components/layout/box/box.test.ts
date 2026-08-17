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
	it('keeps the critical background on the attribute the styles select on', async () => {
		el = await fixture('<nldd-box background="critical"></nldd-box>');
		await waitForUpdate(el);
		expect(el.getAttribute('background')).toBe('critical');
	});
	it('drops the background attribute again when set back to the default', async () => {
		el = await fixture('<nldd-box background="critical"></nldd-box>');
		await waitForUpdate(el);
		(el as HTMLElement & { background: string }).background = 'tinted';
		await waitForUpdate(el);
		expect(el.hasAttribute('background')).toBe(false);
	});

	it('keeps base on the attribute, since the styles select on it', async () => {
		el = await fixture('<nldd-box background="base"></nldd-box>');
		await waitForUpdate(el);
		expect(el.getAttribute('background')).toBe('base');
	});
});
