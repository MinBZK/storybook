import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.js';
import type { NLDDSplitViewPane } from './split-view-pane.js';
import './split-view-pane.js';

describe('nldd-split-view-pane', () => {
	let el: NLDDSplitViewPane;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-split-view-pane></nldd-split-view-pane>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders the pane container', async () => {
		el = await fixture('<nldd-split-view-pane></nldd-split-view-pane>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.split-view-pane')).not.toBeNull();
	});

	it('defaults has-content to false', async () => {
		el = await fixture('<nldd-split-view-pane></nldd-split-view-pane>');
		await waitForUpdate(el);
		expect(el.hasContent).toBe(false);
	});

	it('reflects has-content attribute', async () => {
		el = await fixture('<nldd-split-view-pane has-content></nldd-split-view-pane>');
		await waitForUpdate(el);
		expect(el.hasContent).toBe(true);
		expect(el.hasAttribute('has-content')).toBe(true);
	});

	it('defaults hide-back to false', async () => {
		el = await fixture('<nldd-split-view-pane></nldd-split-view-pane>');
		await waitForUpdate(el);
		expect(el.hideBack).toBe(false);
	});

	it('reflects hide-back attribute', async () => {
		el = await fixture('<nldd-split-view-pane></nldd-split-view-pane>');
		el.hideBack = true;
		await waitForUpdate(el);
		expect(el.hasAttribute('hide-back')).toBe(true);
	});

	it('renders slotted content', async () => {
		el = await fixture('<nldd-split-view-pane><div id="child"></div></nldd-split-view-pane>');
		await waitForUpdate(el);
		expect(el.querySelector('#child')).not.toBeNull();
	});
});
