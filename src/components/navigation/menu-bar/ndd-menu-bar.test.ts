import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { NDDMenuBar } from './ndd-menu-bar.ts';
import './ndd-menu-bar.ts';

function threeItemBar(): string {
	return `
		<ndd-menu-bar>
			<ndd-menu-bar-item>Home</ndd-menu-bar-item>
			<ndd-menu-bar-item>About</ndd-menu-bar-item>
			<ndd-menu-bar-item>Contact</ndd-menu-bar-item>
		</ndd-menu-bar>
	`;
}

function pressKey(target: Element, key: string) {
	target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, composed: true }));
}

describe('ndd-menu-bar', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-menu-bar></ndd-menu-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});
});

describe('ndd-menu-bar – item selection', () => {
	let el: NDDMenuBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('deselects other items when one is selected', async () => {
		el = await fixture<NDDMenuBar>(threeItemBar());
		await waitForUpdate(el);

		const items = el.querySelectorAll('ndd-menu-bar-item');
		items[0].click();
		await waitForUpdate(el);
		expect(items[0].hasAttribute('selected')).toBe(true);

		items[1].click();
		await waitForUpdate(el);
		expect(items[0].hasAttribute('selected')).toBe(false);
		expect(items[1].hasAttribute('selected')).toBe(true);
	});

	it('dispatches itemselect event on item click', async () => {
		el = await fixture<NDDMenuBar>(threeItemBar());
		await waitForUpdate(el);

		let detail: any;
		el.addEventListener('itemselect', ((e: CustomEvent) => {
			detail = e.detail;
		}) as EventListener);

		el.querySelectorAll('ndd-menu-bar-item')[1].click();
		await waitForUpdate(el);

		expect(detail).toBeDefined();
		expect(detail.item).toBe(el.querySelectorAll('ndd-menu-bar-item')[1]);
	});
});

describe('ndd-menu-bar – keyboard navigation', () => {
	let el: NDDMenuBar;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	it('ArrowRight calls focus on next item', async () => {
		el = await fixture<NDDMenuBar>(threeItemBar());
		await waitForUpdate(el);
		const items = el.querySelectorAll('ndd-menu-bar-item');
		const spy = vi.spyOn(items[1] as HTMLElement, 'focus');
		pressKey(items[0], 'ArrowRight');
		expect(spy).toHaveBeenCalled();
	});

	it('ArrowLeft calls focus on previous item', async () => {
		el = await fixture<NDDMenuBar>(threeItemBar());
		await waitForUpdate(el);
		const items = el.querySelectorAll('ndd-menu-bar-item');
		const spy = vi.spyOn(items[0] as HTMLElement, 'focus');
		pressKey(items[1], 'ArrowLeft');
		expect(spy).toHaveBeenCalled();
	});

	it('ArrowRight wraps from last to first', async () => {
		el = await fixture<NDDMenuBar>(threeItemBar());
		await waitForUpdate(el);
		const items = el.querySelectorAll('ndd-menu-bar-item');
		const spy = vi.spyOn(items[0] as HTMLElement, 'focus');
		pressKey(items[2], 'ArrowRight');
		expect(spy).toHaveBeenCalled();
	});

	it('ArrowLeft wraps from first to last', async () => {
		el = await fixture<NDDMenuBar>(threeItemBar());
		await waitForUpdate(el);
		const items = el.querySelectorAll('ndd-menu-bar-item');
		const spy = vi.spyOn(items[2] as HTMLElement, 'focus');
		pressKey(items[0], 'ArrowLeft');
		expect(spy).toHaveBeenCalled();
	});

	it('Home calls focus on first item', async () => {
		el = await fixture<NDDMenuBar>(threeItemBar());
		await waitForUpdate(el);
		const items = el.querySelectorAll('ndd-menu-bar-item');
		const spy = vi.spyOn(items[0] as HTMLElement, 'focus');
		pressKey(items[2], 'Home');
		expect(spy).toHaveBeenCalled();
	});

	it('End calls focus on last item', async () => {
		el = await fixture<NDDMenuBar>(threeItemBar());
		await waitForUpdate(el);
		const items = el.querySelectorAll('ndd-menu-bar-item');
		const spy = vi.spyOn(items[2] as HTMLElement, 'focus');
		pressKey(items[0], 'End');
		expect(spy).toHaveBeenCalled();
	});

	it('skips disabled items in navigation', async () => {
		el = await fixture<NDDMenuBar>(`
			<ndd-menu-bar>
				<ndd-menu-bar-item>A</ndd-menu-bar-item>
				<ndd-menu-bar-item disabled>B</ndd-menu-bar-item>
				<ndd-menu-bar-item>C</ndd-menu-bar-item>
			</ndd-menu-bar>
		`);
		await waitForUpdate(el);
		const allItems = el.querySelectorAll('ndd-menu-bar-item');
		const spy = vi.spyOn(allItems[2] as HTMLElement, 'focus');
		pressKey(allItems[0], 'ArrowRight');
		expect(spy).toHaveBeenCalled();
	});
});

describe('ndd-menu-bar – overflow menu', () => {
	let el: NDDMenuBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders overflow button when has-overflow-menu is set', async () => {
		el = await fixture<NDDMenuBar>(`
			<ndd-menu-bar has-overflow-menu>
				<ndd-menu-bar-item>Home</ndd-menu-bar-item>
			</ndd-menu-bar>
		`);
		await waitForUpdate(el);
		const overflowBtn = el.shadowRoot!.querySelector('.overflow-button');
		expect(overflowBtn).not.toBeNull();
		expect(overflowBtn!.getAttribute('aria-haspopup')).toBe('menu');
		expect(overflowBtn!.getAttribute('aria-expanded')).toBe('false');
	});

	it('does not render overflow button without has-overflow-menu', async () => {
		el = await fixture<NDDMenuBar>(threeItemBar());
		await waitForUpdate(el);
		const overflowBtn = el.shadowRoot!.querySelector('.overflow-button');
		expect(overflowBtn).toBeNull();
	});

	it('uses custom overflow-label', async () => {
		el = await fixture<NDDMenuBar>(`
			<ndd-menu-bar has-overflow-menu overflow-label="More">
				<ndd-menu-bar-item>Home</ndd-menu-bar-item>
			</ndd-menu-bar>
		`);
		await waitForUpdate(el);
		const overflowBtn = el.shadowRoot!.querySelector('.overflow-button');
		expect(overflowBtn!.textContent).toContain('More');
	});

	it('cleans up ResizeObserver on disconnect', async () => {
		el = await fixture<NDDMenuBar>(`
			<ndd-menu-bar has-overflow-menu>
				<ndd-menu-bar-item>Home</ndd-menu-bar-item>
			</ndd-menu-bar>
		`);
		await waitForUpdate(el);
		el.remove();
		expect((el as any)._resizeObserver).toBeNull();
	});
});
