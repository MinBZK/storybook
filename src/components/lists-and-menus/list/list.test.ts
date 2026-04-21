import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './list.js';
import '../list-item/list-item.js';

describe('nldd-list', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-list></nldd-list>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults to simple variant', async () => {
		el = await fixture('<nldd-list></nldd-list>');
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('simple');
	});

	it('reflects variant attribute', async () => {
		el = await fixture('<nldd-list variant="box"></nldd-list>');
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('box');
	});

	it('renders header slot', async () => {
		el = await fixture(`
			<nldd-list>
				<span slot="header">Header content</span>
			</nldd-list>
		`);
		await waitForUpdate(el);
		const header = el.querySelector('[slot="header"]');
		expect(header?.textContent).toBe('Header content');
	});

	it('reflects no-dividers attribute', async () => {
		el = await fixture('<nldd-list no-dividers></nldd-list>');
		await waitForUpdate(el);
		expect(el.hasAttribute('no-dividers')).toBe(true);
	});

	it('sets --context-list-divider-display when no-dividers is set', async () => {
		el = await fixture('<nldd-list no-dividers></nldd-list>');
		await waitForUpdate(el);
		expect(getComputedStyle(el).getPropertyValue('--context-list-divider-display').trim()).toBe('none');
	});

	it('renders footer slot', async () => {
		el = await fixture(`
			<nldd-list>
				<span slot="footer">Footer content</span>
			</nldd-list>
		`);
		await waitForUpdate(el);
		const footer = el.querySelector('[slot="footer"]');
		expect(footer?.textContent).toBe('Footer content');
	});


	// — Drag: keyboard (direct arrow-reorder) ——————————————————————————————

	it('ArrowDown on a drag handle fires nldd-reorder with the target index', async () => {
		el = await fixture(`
			<nldd-list reorderable>
				<nldd-list-item><span reorderable-only tabindex="0">handle</span></nldd-list-item>
				<nldd-list-item><span reorderable-only tabindex="0">handle</span></nldd-list-item>
				<nldd-list-item><span reorderable-only tabindex="0">handle</span></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(el);

		const handle = el.querySelectorAll('[reorderable-only]')[0] as HTMLElement;

		let reorderDetail: { fromIndex: number; toIndex: number } | null = null;
		el.addEventListener('nldd-reorder', (e: Event) => {
			reorderDetail = (e as CustomEvent).detail;
		});

		handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true }));
		await waitForUpdate(el);

		expect(reorderDetail).not.toBeNull();
		expect(reorderDetail!.fromIndex).toBe(0);
		expect(reorderDetail!.toIndex).toBe(1);
	});

	it('ArrowUp on the first item is a no-op', async () => {
		el = await fixture(`
			<nldd-list reorderable>
				<nldd-list-item><span reorderable-only tabindex="0">handle</span></nldd-list-item>
				<nldd-list-item><span reorderable-only tabindex="0">handle</span></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(el);

		const handle = el.querySelectorAll('[reorderable-only]')[0] as HTMLElement;
		let fired = false;
		el.addEventListener('nldd-reorder', () => { fired = true; });

		handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, composed: true }));
		await waitForUpdate(el);
		expect(fired).toBe(false);
	});

	it('ArrowDown on the last item is a no-op', async () => {
		el = await fixture(`
			<nldd-list reorderable>
				<nldd-list-item><span reorderable-only tabindex="0">handle</span></nldd-list-item>
				<nldd-list-item><span reorderable-only tabindex="0">handle</span></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(el);

		const handles = el.querySelectorAll('[reorderable-only]');
		const lastHandle = handles[handles.length - 1] as HTMLElement;
		let fired = false;
		el.addEventListener('nldd-reorder', () => { fired = true; });

		lastHandle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true }));
		await waitForUpdate(el);
		expect(fired).toBe(false);
	});

	it('does nothing when the keydown path has no drag handle', async () => {
		el = await fixture(`
			<nldd-list reorderable>
				<nldd-list-item><span tabindex="0">no handle</span></nldd-list-item>
				<nldd-list-item><span tabindex="0">no handle</span></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(el);

		const span = el.querySelectorAll('span[tabindex]')[0] as HTMLElement;
		let fired = false;
		el.addEventListener('nldd-reorder', () => { fired = true; });

		span.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true }));
		await waitForUpdate(el);
		expect(fired).toBe(false);
	});


	// — Drag: pointer ————————————————————————————————————————————————————————

	it('fires nldd-reorder with correct indices after pointer drag', async () => {
		el = await fixture(`
			<nldd-list reorderable>
				<nldd-list-item><span reorderable-only>handle</span></nldd-list-item>
				<nldd-list-item><span reorderable-only>handle</span></nldd-list-item>
				<nldd-list-item><span reorderable-only>handle</span></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(el);

		const handle = el.querySelectorAll('[reorderable-only]')[0] as HTMLElement;

		let reorderDetail: { fromIndex: number; toIndex: number } | null = null;
		el.addEventListener('nldd-reorder', (e: Event) => {
			reorderDetail = (e as CustomEvent).detail;
		});

		handle.dispatchEvent(new PointerEvent('pointerdown', { clientY: 10, pointerId: 1, bubbles: true, composed: true }));
		await waitForUpdate(el);

		el.dispatchEvent(new PointerEvent('pointermove', { clientY: 100, pointerId: 1, bubbles: true, composed: true }));
		await waitForUpdate(el);

		el.dispatchEvent(new PointerEvent('pointerup', { pointerId: 1, bubbles: true, composed: true }));
		await waitForUpdate(el);

		expect(reorderDetail).not.toBeNull();
		expect(reorderDetail!.fromIndex).toBe(0);
	});

	it('pointer cancel cleans up is-dragging class and removes placeholder', async () => {
		el = await fixture(`
			<nldd-list reorderable>
				<nldd-list-item><span reorderable-only>handle</span></nldd-list-item>
				<nldd-list-item><span reorderable-only>handle</span></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(el);

		const handle = el.querySelectorAll('[reorderable-only]')[0] as HTMLElement;
		const firstItem = el.querySelectorAll('nldd-list-item')[0];

		handle.dispatchEvent(new PointerEvent('pointerdown', { clientY: 10, pointerId: 1, bubbles: true, composed: true }));
		await waitForUpdate(el);

		expect(firstItem.classList.contains('is-dragging')).toBe(true);

		el.dispatchEvent(new PointerEvent('pointercancel', { pointerId: 1, bubbles: true, composed: true }));
		await waitForUpdate(el);

		expect(firstItem.classList.contains('is-dragging')).toBe(false);
		expect(el.querySelector('.nldd-list-drag-placeholder')).toBeNull();
	});
});
