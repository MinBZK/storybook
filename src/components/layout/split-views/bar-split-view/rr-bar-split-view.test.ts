import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './rr-bar-split-view.ts';

describe('rr-bar-split-view', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-bar-split-view></rr-bar-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('always renders main pane', async () => {
		el = await fixture('<rr-bar-split-view></rr-bar-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.bar-split-view__main')).not.toBeNull();
	});

	it('does not render primary bar when slot is empty', async () => {
		el = await fixture('<rr-bar-split-view></rr-bar-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.bar-split-view__primary-bar')).toBeNull();
	});

	it('does not render secondary bar when slot is empty', async () => {
		el = await fixture('<rr-bar-split-view></rr-bar-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.bar-split-view__secondary-bar')).toBeNull();
	});

	it('renders primary bar when content is slotted', async () => {
		el = await fixture(`
			<rr-bar-split-view>
				<div slot="primary-bar">Primary</div>
			</rr-bar-split-view>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.bar-split-view__primary-bar')).not.toBeNull();
	});

	it('renders secondary bar when content is slotted', async () => {
		el = await fixture(`
			<rr-bar-split-view>
				<div slot="secondary-bar">Secondary</div>
			</rr-bar-split-view>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.bar-split-view__secondary-bar')).not.toBeNull();
	});

	it('renders dividers only when bars are present', async () => {
		el = await fixture(`
			<rr-bar-split-view>
				<div slot="primary-bar">Primary</div>
				<div slot="secondary-bar">Secondary</div>
			</rr-bar-split-view>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('rr-split-view-divider').length).toBe(2);
	});

	it('renders no dividers when bars are absent', async () => {
		el = await fixture('<rr-bar-split-view></rr-bar-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('rr-split-view-divider').length).toBe(0);
	});
});
