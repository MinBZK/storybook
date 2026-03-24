import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './rr-vertical-split-view.ts';

describe('rr-vertical-split-view', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-vertical-split-view></rr-vertical-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('always renders main pane', async () => {
		el = await fixture('<rr-vertical-split-view></rr-vertical-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.vertical-split-view__main')).not.toBeNull();
	});

	it('does not render header when slot is empty', async () => {
		el = await fixture('<rr-vertical-split-view></rr-vertical-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.vertical-split-view__header')).toBeNull();
	});

	it('does not render footer when slot is empty', async () => {
		el = await fixture('<rr-vertical-split-view></rr-vertical-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.vertical-split-view__footer')).toBeNull();
	});

	it('renders header when content is slotted', async () => {
		el = await fixture(`
			<rr-vertical-split-view>
				<div slot="header">Header</div>
			</rr-vertical-split-view>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.vertical-split-view__header')).not.toBeNull();
	});

	it('renders footer when content is slotted', async () => {
		el = await fixture(`
			<rr-vertical-split-view>
				<div slot="footer">Footer</div>
			</rr-vertical-split-view>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.vertical-split-view__footer')).not.toBeNull();
	});

	it('renders dividers only when header and footer are present', async () => {
		el = await fixture(`
			<rr-vertical-split-view>
				<div slot="header">Header</div>
				<div slot="footer">Footer</div>
			</rr-vertical-split-view>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('rr-split-view-divider').length).toBe(2);
	});

	it('renders no dividers when header and footer are absent', async () => {
		el = await fixture('<rr-vertical-split-view></rr-vertical-split-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('rr-split-view-divider').length).toBe(0);
	});
});
