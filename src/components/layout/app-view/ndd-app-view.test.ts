import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { NDDAppView } from './ndd-app-view.ts';
import './ndd-app-view.ts';

describe('ndd-app-view', () => {
	let el: NDDAppView;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-app-view></ndd-app-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders the app-view container', async () => {
		el = await fixture('<ndd-app-view></ndd-app-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.app-view')).not.toBeNull();
	});

	it('renders slotted content', async () => {
		el = await fixture('<ndd-app-view><div id="child"></div></ndd-app-view>');
		await waitForUpdate(el);
		expect(el.querySelector('#child')).not.toBeNull();
	});

	it('defaults background to "default"', async () => {
		el = await fixture('<ndd-app-view></ndd-app-view>');
		await waitForUpdate(el);
		expect(el.getAttribute('background')).toBe('default');
	});

	it('reflects background="tinted" attribute', async () => {
		el = await fixture('<ndd-app-view background="tinted"></ndd-app-view>');
		await waitForUpdate(el);
		expect(el.getAttribute('background')).toBe('tinted');
	});

	it('setting background property reflects to attribute', async () => {
		el = await fixture('<ndd-app-view></ndd-app-view>');
		await waitForUpdate(el);
		el.background = 'tinted';
		await waitForUpdate(el);
		expect(el.getAttribute('background')).toBe('tinted');
	});
});
