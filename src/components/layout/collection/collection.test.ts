import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './collection.ts';

describe('nldd-collection', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-collection></nldd-collection>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults to grid layout', async () => {
		el = await fixture('<nldd-collection></nldd-collection>');
		await waitForUpdate(el);
		expect(el.getAttribute('layout')).toBe('grid');
	});

	it('renders load-more button when show-load-more is set on grid layout', async () => {
		el = await fixture(`
			<nldd-collection layout="grid" show-load-more max-items="2">
				<div>Item 1</div>
				<div>Item 2</div>
				<div>Item 3</div>
			</nldd-collection>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('nldd-button')).not.toBeNull();
	});

	it('does not render load-more button on horizontal-scroll layout', async () => {
		el = await fixture(`
			<nldd-collection layout="horizontal-scroll" show-load-more>
				<div>Item 1</div>
				<div>Item 2</div>
				<div>Item 3</div>
			</nldd-collection>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('nldd-button')).toBeNull();
	});

	it('renders scroll navigation on horizontal-scroll layout', async () => {
		el = await fixture('<nldd-collection layout="horizontal-scroll"></nldd-collection>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('nldd-icon-button').length).toBe(2);
	});

	it('fires load-more event when button is clicked', async () => {
		el = await fixture(`
			<nldd-collection layout="grid" show-load-more max-items="2">
				<div>Item 1</div>
				<div>Item 2</div>
				<div>Item 3</div>
			</nldd-collection>
		`);
		await waitForUpdate(el);
		await waitForUpdate(el); // wait for slotchange to trigger re-render
		let fired = false;
		el.addEventListener('load-more', () => { fired = true; });
		el.shadowRoot!.querySelector('nldd-button')!.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
		expect(fired).toBe(true);
	});
});
