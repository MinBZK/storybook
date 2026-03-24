import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import type { RRSplitViewPane } from './rr-split-view-pane.js';
import './rr-split-view-pane.ts';

describe('rr-split-view-pane', () => {
	let el: RRSplitViewPane;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-split-view-pane></rr-split-view-pane>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders the pane container', async () => {
		el = await fixture('<rr-split-view-pane></rr-split-view-pane>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.split-view-pane')).not.toBeNull();
	});

	it('defaults has-content to false', async () => {
		el = await fixture('<rr-split-view-pane></rr-split-view-pane>');
		await waitForUpdate(el);
		expect(el.hasContent).toBe(false);
	});

	it('reflects has-content attribute', async () => {
		el = await fixture('<rr-split-view-pane has-content></rr-split-view-pane>');
		await waitForUpdate(el);
		expect(el.hasContent).toBe(true);
		expect(el.hasAttribute('has-content')).toBe(true);
	});

	it('defaults hide-back to false', async () => {
		el = await fixture('<rr-split-view-pane></rr-split-view-pane>');
		await waitForUpdate(el);
		expect(el.hideBack).toBe(false);
	});

	it('reflects hide-back attribute', async () => {
		el = await fixture('<rr-split-view-pane></rr-split-view-pane>');
		el.hideBack = true;
		await waitForUpdate(el);
		expect(el.hasAttribute('hide-back')).toBe(true);
	});

	it('renders slotted content', async () => {
		el = await fixture('<rr-split-view-pane><div id="child"></div></rr-split-view-pane>');
		await waitForUpdate(el);
		expect(el.querySelector('#child')).not.toBeNull();
	});
});
