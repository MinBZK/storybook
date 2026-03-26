import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-app-view.ts';

describe('rr-app-view', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-app-view></rr-app-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders the app-view container', async () => {
		el = await fixture('<rr-app-view></rr-app-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.app-view')).not.toBeNull();
	});

	it('renders slotted content', async () => {
		el = await fixture('<rr-app-view><div id="child"></div></rr-app-view>');
		await waitForUpdate(el);
		expect(el.querySelector('#child')).not.toBeNull();
	});
});
