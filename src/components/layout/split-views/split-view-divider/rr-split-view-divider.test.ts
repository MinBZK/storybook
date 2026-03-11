import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './rr-split-view-divider.ts';

describe('rr-split-view-divider', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-split-view-divider></rr-split-view-divider>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults to vertical orientation', async () => {
		el = await fixture('<rr-split-view-divider></rr-split-view-divider>');
		await waitForUpdate(el);
		expect(el.getAttribute('orientation')).toBe('vertical');
	});

	it('does not render drag handle by default', async () => {
		el = await fixture('<rr-split-view-divider></rr-split-view-divider>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.split-view-divider__drag-handle')).toBeNull();
	});

	it('renders drag handle when has-drag-handle is set', async () => {
		el = await fixture('<rr-split-view-divider has-drag-handle></rr-split-view-divider>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.split-view-divider__drag-handle')).not.toBeNull();
	});
});
