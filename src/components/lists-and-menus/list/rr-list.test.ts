import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-list.ts';
import '../list-item/rr-list-item.ts';

describe('rr-list', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-list></rr-list>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults to simple variant', async () => {
		el = await fixture('<rr-list></rr-list>');
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('simple');
	});

	it('reflects variant attribute', async () => {
		el = await fixture('<rr-list variant="box"></rr-list>');
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('box');
	});

	it('renders header slot', async () => {
		el = await fixture(`
			<rr-list>
				<span slot="header">Header content</span>
			</rr-list>
		`);
		await waitForUpdate(el);
		const header = el.querySelector('[slot="header"]');
		expect(header?.textContent).toBe('Header content');
	});

	it('renders footer slot', async () => {
		el = await fixture(`
			<rr-list>
				<span slot="footer">Footer content</span>
			</rr-list>
		`);
		await waitForUpdate(el);
		const footer = el.querySelector('[slot="footer"]');
		expect(footer?.textContent).toBe('Footer content');
	});


	// — Drag: reorder ————————————————————————————————————————————————————————

	it('fires rr-reorder with correct fromIndex and toIndex after keyboard drop', async () => {
		el = await fixture(`
			<rr-list draggable>
				<rr-list-item><span draggable-only tabindex="0">handle</span></rr-list-item>
				<rr-list-item><span draggable-only tabindex="0">handle</span></rr-list-item>
				<rr-list-item><span draggable-only tabindex="0">handle</span></rr-list-item>
			</rr-list>
		`);
		await waitForUpdate(el);

		const handle = el.querySelectorAll('[draggable-only]')[0] as HTMLElement;

		let reorderDetail: { fromIndex: number; toIndex: number } | null = null;
		el.addEventListener('rr-reorder', (e: Event) => {
			reorderDetail = (e as CustomEvent).detail;
		});

		// Space: start drag on first item
		handle.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true, composed: true }));
		await waitForUpdate(el);

		// ArrowDown: move placeholder to index 1
		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
		await waitForUpdate(el);

		// Enter: drop
		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
		await waitForUpdate(el);

		expect(reorderDetail).not.toBeNull();
		expect(reorderDetail!.fromIndex).toBe(0);
		expect(reorderDetail!.toIndex).toBe(1);
	});

	it('does not fire rr-reorder when item is dropped at its original position', async () => {
		el = await fixture(`
			<rr-list draggable>
				<rr-list-item><span draggable-only tabindex="0">handle</span></rr-list-item>
				<rr-list-item><span draggable-only tabindex="0">handle</span></rr-list-item>
			</rr-list>
		`);
		await waitForUpdate(el);

		const handle = el.querySelectorAll('[draggable-only]')[0] as HTMLElement;

		let fired = false;
		el.addEventListener('rr-reorder', () => { fired = true; });

		// Space: start drag
		handle.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true, composed: true }));
		await waitForUpdate(el);

		// Enter: drop immediately without moving
		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
		await waitForUpdate(el);

		expect(fired).toBe(false);
	});

	it('ArrowDown and ArrowUp move the placeholder, Enter commits the drop', async () => {
		el = await fixture(`
			<rr-list draggable>
				<rr-list-item><span draggable-only tabindex="0">handle</span></rr-list-item>
				<rr-list-item><span draggable-only tabindex="0">handle</span></rr-list-item>
				<rr-list-item><span draggable-only tabindex="0">handle</span></rr-list-item>
			</rr-list>
		`);
		await waitForUpdate(el);

		const handle = el.querySelectorAll('[draggable-only]')[0] as HTMLElement;

		let reorderDetail: { fromIndex: number; toIndex: number } | null = null;
		el.addEventListener('rr-reorder', (e: Event) => {
			reorderDetail = (e as CustomEvent).detail;
		});

		handle.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true, composed: true }));
		await waitForUpdate(el);

		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
		await waitForUpdate(el);
		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
		await waitForUpdate(el);
		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
		await waitForUpdate(el);

		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
		await waitForUpdate(el);

		// Net effect: 2 down, 1 up = toIndex 1
		expect(reorderDetail!.toIndex).toBe(1);
	});

	it('Escape cancels drag: restores is-dragging class and removes placeholder', async () => {
		el = await fixture(`
			<rr-list draggable>
				<rr-list-item><span draggable-only tabindex="0">handle</span></rr-list-item>
				<rr-list-item><span draggable-only tabindex="0">handle</span></rr-list-item>
			</rr-list>
		`);
		await waitForUpdate(el);

		const handle = el.querySelectorAll('[draggable-only]')[0] as HTMLElement;
		const firstItem = el.querySelectorAll('rr-list-item')[0];

		handle.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true, composed: true }));
		await waitForUpdate(el);

		expect(firstItem.classList.contains('is-dragging')).toBe(true);

		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
		await waitForUpdate(el);

		expect(firstItem.classList.contains('is-dragging')).toBe(false);
		expect(el.querySelector('.rr-list-drag-placeholder')).toBeNull();
	});
});
