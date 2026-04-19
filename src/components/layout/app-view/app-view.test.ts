import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import type { NLDDAppView } from './app-view.js';
import './app-view.ts';

describe('nldd-app-view', () => {
	let el: NLDDAppView;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-app-view></nldd-app-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders the app-view container', async () => {
		el = await fixture('<nldd-app-view></nldd-app-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.app-view')).not.toBeNull();
	});

	it('renders slotted content', async () => {
		el = await fixture('<nldd-app-view><div id="child"></div></nldd-app-view>');
		await waitForUpdate(el);
		expect(el.querySelector('#child')).not.toBeNull();
	});

	it('defaults background to "default"', async () => {
		el = await fixture('<nldd-app-view></nldd-app-view>');
		await waitForUpdate(el);
		expect(el.getAttribute('background')).toBe('default');
	});

	it('reflects background="tinted" attribute', async () => {
		el = await fixture('<nldd-app-view background="tinted"></nldd-app-view>');
		await waitForUpdate(el);
		expect(el.getAttribute('background')).toBe('tinted');
	});

	it('setting background property reflects to attribute', async () => {
		el = await fixture('<nldd-app-view></nldd-app-view>');
		await waitForUpdate(el);
		el.background = 'tinted';
		await waitForUpdate(el);
		expect(el.getAttribute('background')).toBe('tinted');
	});
});
