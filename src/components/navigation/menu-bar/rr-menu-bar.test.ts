import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRMenuBar } from './rr-menu-bar.ts';
import './rr-menu-bar.ts';

function threeItemBar(): string {
	return `
		<rr-menu-bar>
			<rr-menu-bar-item>Home</rr-menu-bar-item>
			<rr-menu-bar-item>About</rr-menu-bar-item>
			<rr-menu-bar-item>Contact</rr-menu-bar-item>
		</rr-menu-bar>
	`;
}

function pressKey(target: Element, key: string) {
	target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, composed: true }));
}

describe('rr-menu-bar', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-menu-bar></rr-menu-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});
});

describe('rr-menu-bar – item selection', () => {
	let el: RRMenuBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('deselects other items when one is selected', async () => {
		el = await fixture<RRMenuBar>(threeItemBar());
		await waitForUpdate(el);

		const items = el.querySelectorAll('rr-menu-bar-item');
		items[0].click();
		await waitForUpdate(el);
		expect(items[0].hasAttribute('selected')).toBe(true);

		items[1].click();
		await waitForUpdate(el);
		expect(items[0].hasAttribute('selected')).toBe(false);
		expect(items[1].hasAttribute('selected')).toBe(true);
	});

	it('dispatches itemselect event on item click', async () => {
		el = await fixture<RRMenuBar>(threeItemBar());
		await waitForUpdate(el);

		let detail: any;
		el.addEventListener('itemselect', ((e: CustomEvent) => {
			detail = e.detail;
		}) as EventListener);

		el.querySelectorAll('rr-menu-bar-item')[1].click();
		await waitForUpdate(el);

		expect(detail).toBeDefined();
		expect(detail.item).toBe(el.querySelectorAll('rr-menu-bar-item')[1]);
	});
});

describe('rr-menu-bar – keyboard navigation', () => {
	let el: RRMenuBar;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	it('ArrowRight calls focus on next item', async () => {
		el = await fixture<RRMenuBar>(threeItemBar());
		await waitForUpdate(el);
		const items = el.querySelectorAll('rr-menu-bar-item');
		const spy = vi.spyOn(items[1] as HTMLElement, 'focus');
		pressKey(items[0], 'ArrowRight');
		expect(spy).toHaveBeenCalled();
	});

	it('ArrowLeft calls focus on previous item', async () => {
		el = await fixture<RRMenuBar>(threeItemBar());
		await waitForUpdate(el);
		const items = el.querySelectorAll('rr-menu-bar-item');
		const spy = vi.spyOn(items[0] as HTMLElement, 'focus');
		pressKey(items[1], 'ArrowLeft');
		expect(spy).toHaveBeenCalled();
	});

	it('ArrowRight wraps from last to first', async () => {
		el = await fixture<RRMenuBar>(threeItemBar());
		await waitForUpdate(el);
		const items = el.querySelectorAll('rr-menu-bar-item');
		const spy = vi.spyOn(items[0] as HTMLElement, 'focus');
		pressKey(items[2], 'ArrowRight');
		expect(spy).toHaveBeenCalled();
	});

	it('ArrowLeft wraps from first to last', async () => {
		el = await fixture<RRMenuBar>(threeItemBar());
		await waitForUpdate(el);
		const items = el.querySelectorAll('rr-menu-bar-item');
		const spy = vi.spyOn(items[2] as HTMLElement, 'focus');
		pressKey(items[0], 'ArrowLeft');
		expect(spy).toHaveBeenCalled();
	});

	it('Home calls focus on first item', async () => {
		el = await fixture<RRMenuBar>(threeItemBar());
		await waitForUpdate(el);
		const items = el.querySelectorAll('rr-menu-bar-item');
		const spy = vi.spyOn(items[0] as HTMLElement, 'focus');
		pressKey(items[2], 'Home');
		expect(spy).toHaveBeenCalled();
	});

	it('End calls focus on last item', async () => {
		el = await fixture<RRMenuBar>(threeItemBar());
		await waitForUpdate(el);
		const items = el.querySelectorAll('rr-menu-bar-item');
		const spy = vi.spyOn(items[2] as HTMLElement, 'focus');
		pressKey(items[0], 'End');
		expect(spy).toHaveBeenCalled();
	});

	it('skips disabled items in navigation', async () => {
		el = await fixture<RRMenuBar>(`
			<rr-menu-bar>
				<rr-menu-bar-item>A</rr-menu-bar-item>
				<rr-menu-bar-item disabled>B</rr-menu-bar-item>
				<rr-menu-bar-item>C</rr-menu-bar-item>
			</rr-menu-bar>
		`);
		await waitForUpdate(el);
		const allItems = el.querySelectorAll('rr-menu-bar-item');
		const spy = vi.spyOn(allItems[2] as HTMLElement, 'focus');
		pressKey(allItems[0], 'ArrowRight');
		expect(spy).toHaveBeenCalled();
	});
});

describe('rr-menu-bar – overflow menu', () => {
	let el: RRMenuBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders overflow button when has-overflow-menu is set', async () => {
		el = await fixture<RRMenuBar>(`
			<rr-menu-bar has-overflow-menu>
				<rr-menu-bar-item>Home</rr-menu-bar-item>
			</rr-menu-bar>
		`);
		await waitForUpdate(el);
		const overflowBtn = el.shadowRoot!.querySelector('.overflow-button');
		expect(overflowBtn).not.toBeNull();
		expect(overflowBtn!.getAttribute('aria-haspopup')).toBe('menu');
		expect(overflowBtn!.getAttribute('aria-expanded')).toBe('false');
	});

	it('does not render overflow button without has-overflow-menu', async () => {
		el = await fixture<RRMenuBar>(threeItemBar());
		await waitForUpdate(el);
		const overflowBtn = el.shadowRoot!.querySelector('.overflow-button');
		expect(overflowBtn).toBeNull();
	});

	it('uses custom overflow-label', async () => {
		el = await fixture<RRMenuBar>(`
			<rr-menu-bar has-overflow-menu overflow-label="More">
				<rr-menu-bar-item>Home</rr-menu-bar-item>
			</rr-menu-bar>
		`);
		await waitForUpdate(el);
		const overflowBtn = el.shadowRoot!.querySelector('.overflow-button');
		expect(overflowBtn!.textContent).toContain('More');
	});

	it('cleans up ResizeObserver on disconnect', async () => {
		el = await fixture<RRMenuBar>(`
			<rr-menu-bar has-overflow-menu>
				<rr-menu-bar-item>Home</rr-menu-bar-item>
			</rr-menu-bar>
		`);
		await waitForUpdate(el);
		el.remove();
		expect((el as any)._resizeObserver).toBeNull();
	});
});
