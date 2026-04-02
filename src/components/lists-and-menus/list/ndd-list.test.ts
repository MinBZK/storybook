import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './ndd-list.ts';
import '../list-item/ndd-list-item.ts';

describe('ndd-list', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-list></ndd-list>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults to simple variant', async () => {
		el = await fixture('<ndd-list></ndd-list>');
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('simple');
	});

	it('reflects variant attribute', async () => {
		el = await fixture('<ndd-list variant="box"></ndd-list>');
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('box');
	});

	it('renders header slot', async () => {
		el = await fixture(`
			<ndd-list>
				<span slot="header">Header content</span>
			</ndd-list>
		`);
		await waitForUpdate(el);
		const header = el.querySelector('[slot="header"]');
		expect(header?.textContent).toBe('Header content');
	});

	it('renders footer slot', async () => {
		el = await fixture(`
			<ndd-list>
				<span slot="footer">Footer content</span>
			</ndd-list>
		`);
		await waitForUpdate(el);
		const footer = el.querySelector('[slot="footer"]');
		expect(footer?.textContent).toBe('Footer content');
	});

	// — Drag: keyboard ———————————————————————————————————————————————————————

	it('fires ndd-reorder with correct fromIndex and toIndex after keyboard drop', async () => {
		el = await fixture(`
			<ndd-list reorderable>
				<ndd-list-item><span draggable-only tabindex="0">handle</span></ndd-list-item>
				<ndd-list-item><span draggable-only tabindex="0">handle</span></ndd-list-item>
				<ndd-list-item><span draggable-only tabindex="0">handle</span></ndd-list-item>
			</ndd-list>
		`);
		await waitForUpdate(el);

		const handle = el.querySelectorAll('[draggable-only]')[0] as HTMLElement;

		let reorderDetail: { fromIndex: number; toIndex: number } | null = null;
		el.addEventListener('ndd-reorder', (e: Event) => {
			reorderDetail = (e as CustomEvent).detail;
		});

		handle.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true, composed: true }));
		await waitForUpdate(el);

		handle.dispatchEvent(
			new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true })
		);
		await waitForUpdate(el);

		handle.dispatchEvent(
			new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true })
		);
		await waitForUpdate(el);

		expect(reorderDetail).not.toBeNull();
		expect(reorderDetail!.fromIndex).toBe(0);
		expect(reorderDetail!.toIndex).toBe(1);
	});

	it('does not fire ndd-reorder when item is dropped at its original position', async () => {
		el = await fixture(`
			<ndd-list reorderable>
				<ndd-list-item><span draggable-only tabindex="0">handle</span></ndd-list-item>
				<ndd-list-item><span draggable-only tabindex="0">handle</span></ndd-list-item>
			</ndd-list>
		`);
		await waitForUpdate(el);

		const handle = el.querySelectorAll('[draggable-only]')[0] as HTMLElement;

		let fired = false;
		el.addEventListener('ndd-reorder', () => {
			fired = true;
		});

		handle.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true, composed: true }));
		await waitForUpdate(el);

		handle.dispatchEvent(
			new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true })
		);
		await waitForUpdate(el);

		expect(fired).toBe(false);
	});

	it('ArrowDown and ArrowUp move the placeholder, Enter commits the drop', async () => {
		el = await fixture(`
			<ndd-list reorderable>
				<ndd-list-item><span draggable-only tabindex="0">handle</span></ndd-list-item>
				<ndd-list-item><span draggable-only tabindex="0">handle</span></ndd-list-item>
				<ndd-list-item><span draggable-only tabindex="0">handle</span></ndd-list-item>
			</ndd-list>
		`);
		await waitForUpdate(el);

		const handle = el.querySelectorAll('[draggable-only]')[0] as HTMLElement;

		let reorderDetail: { fromIndex: number; toIndex: number } | null = null;
		el.addEventListener('ndd-reorder', (e: Event) => {
			reorderDetail = (e as CustomEvent).detail;
		});

		handle.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true, composed: true }));
		await waitForUpdate(el);

		handle.dispatchEvent(
			new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true })
		);
		await waitForUpdate(el);
		handle.dispatchEvent(
			new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true })
		);
		await waitForUpdate(el);
		handle.dispatchEvent(
			new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, composed: true })
		);
		await waitForUpdate(el);

		handle.dispatchEvent(
			new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true })
		);
		await waitForUpdate(el);

		// Net effect: 2 down, 1 up = toIndex 1
		expect(reorderDetail!.toIndex).toBe(1);
	});

	it('Escape cancels drag: restores is-dragging class and removes placeholder', async () => {
		el = await fixture(`
			<ndd-list reorderable>
				<ndd-list-item><span draggable-only tabindex="0">handle</span></ndd-list-item>
				<ndd-list-item><span draggable-only tabindex="0">handle</span></ndd-list-item>
			</ndd-list>
		`);
		await waitForUpdate(el);

		const handle = el.querySelectorAll('[draggable-only]')[0] as HTMLElement;
		const firstItem = el.querySelectorAll('ndd-list-item')[0];

		handle.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true, composed: true }));
		await waitForUpdate(el);

		expect(firstItem.classList.contains('is-dragging')).toBe(true);

		handle.dispatchEvent(
			new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true })
		);
		await waitForUpdate(el);

		expect(firstItem.classList.contains('is-dragging')).toBe(false);
		expect(el.querySelector('.ndd-list-drag-placeholder')).toBeNull();
	});

	// — Drag: pointer ————————————————————————————————————————————————————————

	it('fires ndd-reorder with correct indices after pointer drag', async () => {
		el = await fixture(`
			<ndd-list reorderable>
				<ndd-list-item><span draggable-only>handle</span></ndd-list-item>
				<ndd-list-item><span draggable-only>handle</span></ndd-list-item>
				<ndd-list-item><span draggable-only>handle</span></ndd-list-item>
			</ndd-list>
		`);
		await waitForUpdate(el);

		const handle = el.querySelectorAll('[draggable-only]')[0] as HTMLElement;

		let reorderDetail: { fromIndex: number; toIndex: number } | null = null;
		el.addEventListener('ndd-reorder', (e: Event) => {
			reorderDetail = (e as CustomEvent).detail;
		});

		handle.dispatchEvent(
			new PointerEvent('pointerdown', { clientY: 10, pointerId: 1, bubbles: true, composed: true })
		);
		await waitForUpdate(el);

		el.dispatchEvent(
			new PointerEvent('pointermove', { clientY: 100, pointerId: 1, bubbles: true, composed: true })
		);
		await waitForUpdate(el);

		el.dispatchEvent(
			new PointerEvent('pointerup', { pointerId: 1, bubbles: true, composed: true })
		);
		await waitForUpdate(el);

		expect(reorderDetail).not.toBeNull();
		expect(reorderDetail!.fromIndex).toBe(0);
	});

	it('pointer cancel cleans up is-dragging class and removes placeholder', async () => {
		el = await fixture(`
			<ndd-list reorderable>
				<ndd-list-item><span draggable-only>handle</span></ndd-list-item>
				<ndd-list-item><span draggable-only>handle</span></ndd-list-item>
			</ndd-list>
		`);
		await waitForUpdate(el);

		const handle = el.querySelectorAll('[draggable-only]')[0] as HTMLElement;
		const firstItem = el.querySelectorAll('ndd-list-item')[0];

		handle.dispatchEvent(
			new PointerEvent('pointerdown', { clientY: 10, pointerId: 1, bubbles: true, composed: true })
		);
		await waitForUpdate(el);

		expect(firstItem.classList.contains('is-dragging')).toBe(true);

		el.dispatchEvent(
			new PointerEvent('pointercancel', { pointerId: 1, bubbles: true, composed: true })
		);
		await waitForUpdate(el);

		expect(firstItem.classList.contains('is-dragging')).toBe(false);
		expect(el.querySelector('.ndd-list-drag-placeholder')).toBeNull();
	});
});
