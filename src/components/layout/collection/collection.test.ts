import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './collection.js';

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

	it('renders scroll navigation when horizontal content overflows', async () => {
		el = await fixture(`
			<nldd-collection layout="horizontal-scroll" style="width: 200px;">
				<div style="width: 300px; flex-shrink: 0;">Item 1</div>
				<div style="width: 300px; flex-shrink: 0;">Item 2</div>
				<div style="width: 300px; flex-shrink: 0;">Item 3</div>
			</nldd-collection>
		`);
		await waitForUpdate(el);
		await waitForUpdate(el); // wait for ResizeObserver/scroll-listener to settle
		expect(el.shadowRoot!.querySelectorAll('nldd-icon-button').length).toBe(2);
		expect(el.hasAttribute('scrollable')).toBe(true);
	});

	it('hides the scroll navigation when horizontal content fits', async () => {
		el = await fixture(`
			<nldd-collection layout="horizontal-scroll" style="width: 1000px;">
				<div style="width: 100px;">Item 1</div>
			</nldd-collection>
		`);
		await waitForUpdate(el);
		await waitForUpdate(el); // wait for ResizeObserver/scroll-listener to settle
		expect(el.shadowRoot!.querySelectorAll('nldd-icon-button').length).toBe(0);
		expect(el.shadowRoot!.querySelector('.collection__footer')!.hasAttribute('hidden')).toBe(true);
		expect(el.hasAttribute('scrollable')).toBe(false);
	});

	it('updates overflow state when items are added at runtime (no resize needed)', async () => {
		el = await fixture(`
			<nldd-collection layout="horizontal-scroll" style="width: 200px;">
				<div style="width: 100px; flex-shrink: 0;">Item 1</div>
			</nldd-collection>
		`);
		await waitForUpdate(el);
		await waitForUpdate(el); // wait for ResizeObserver/scroll-listener to settle
		expect(el.hasAttribute('scrollable')).toBe(false);
		for (let i = 0; i < 3; i++) {
			const item = document.createElement('div');
			item.style.cssText = 'width: 300px; flex-shrink: 0;';
			item.textContent = 'Extra';
			el.appendChild(item);
		}
		await waitForUpdate(el);
		await waitForUpdate(el); // wait for ResizeObserver/scroll-listener to settle
		expect(el.hasAttribute('scrollable')).toBe(true);
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

	it('horizontal-scroll items get tabindex=0 when content overflows', async () => {
		el = await fixture(`
			<nldd-collection layout="horizontal-scroll" style="width: 200px;">
				<div style="width: 300px; flex-shrink: 0;">Item 1</div>
				<div style="width: 300px; flex-shrink: 0;">Item 2</div>
				<div style="width: 300px; flex-shrink: 0;">Item 3</div>
			</nldd-collection>
		`);
		await waitForUpdate(el);
		await waitForUpdate(el); // wait for ResizeObserver/scroll-listener to settle
		const itemsEl = el.shadowRoot!.querySelector<HTMLElement>('.collection__items')!;
		expect(itemsEl.getAttribute('tabindex')).toBe('0');
		expect(itemsEl.getAttribute('aria-label')).toBe('Collectie');
	});

	it('horizontal-scroll items skip tabindex when content fits', async () => {
		el = await fixture(`
			<nldd-collection layout="horizontal-scroll" style="width: 1000px;">
				<div style="width: 100px;">Item 1</div>
			</nldd-collection>
		`);
		await waitForUpdate(el);
		await waitForUpdate(el); // wait for ResizeObserver/scroll-listener to settle
		const itemsEl = el.shadowRoot!.querySelector<HTMLElement>('.collection__items')!;
		expect(itemsEl.hasAttribute('tabindex')).toBe(false);
	});

	it('grid layout never gets tabindex regardless of overflow', async () => {
		el = await fixture(`
			<nldd-collection layout="grid">
				<div>Item 1</div>
			</nldd-collection>
		`);
		await waitForUpdate(el);
		const itemsEl = el.shadowRoot!.querySelector<HTMLElement>('.collection__items')!;
		expect(itemsEl.hasAttribute('tabindex')).toBe(false);
	});
});
