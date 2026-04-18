import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import type { NDDSplitViewPane } from './ndd-split-view-pane.js';
import './ndd-split-view-pane.ts';

describe('ndd-split-view-pane', () => {
	let el: NDDSplitViewPane;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-split-view-pane></ndd-split-view-pane>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders the pane container', async () => {
		el = await fixture('<ndd-split-view-pane></ndd-split-view-pane>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.split-view-pane')).not.toBeNull();
	});

	it('defaults has-content to false', async () => {
		el = await fixture('<ndd-split-view-pane></ndd-split-view-pane>');
		await waitForUpdate(el);
		expect(el.hasContent).toBe(false);
	});

	it('reflects has-content attribute', async () => {
		el = await fixture('<ndd-split-view-pane has-content></ndd-split-view-pane>');
		await waitForUpdate(el);
		expect(el.hasContent).toBe(true);
		expect(el.hasAttribute('has-content')).toBe(true);
	});

	it('defaults hide-back to false', async () => {
		el = await fixture('<ndd-split-view-pane></ndd-split-view-pane>');
		await waitForUpdate(el);
		expect(el.hideBack).toBe(false);
	});

	it('reflects hide-back attribute', async () => {
		el = await fixture('<ndd-split-view-pane></ndd-split-view-pane>');
		el.hideBack = true;
		await waitForUpdate(el);
		expect(el.hasAttribute('hide-back')).toBe(true);
	});

	it('renders slotted content', async () => {
		el = await fixture('<ndd-split-view-pane><div id="child"></div></ndd-split-view-pane>');
		await waitForUpdate(el);
		expect(el.querySelector('#child')).not.toBeNull();
	});
});
