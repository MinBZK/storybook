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
		// The default (grid) is kept out of the DOM; the property is the source of truth.
		expect((el as unknown as { layout: string }).layout).toBe('grid');
		expect(el.hasAttribute('layout')).toBe(false);
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

	it('the gap attribute overrides the default gap via an inline --_gap', async () => {
		el = await fixture('<nldd-collection gap="8px"><div>Item 1</div></nldd-collection>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_gap')).toBe('8px');
		// Clearing it restores the responsive default (no inline override).
		(el as HTMLElement & { gap?: string }).gap = '';
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_gap')).toBe('');
	});

	// The arrows used to step by a fixed item + gap. From the end of the strip,
	// which is not a whole number of items, that remainder never went away and
	// every item stayed clipped. They snap to item edges now.
	const scrollFixture = `
		<div style="width: 300px;">
			<nldd-collection layout="horizontal-scroll" item-width="200px" style="--_gap: 24px;">
				<div style="width: 200px; height: 40px;"></div>
				<div style="width: 200px; height: 40px;"></div>
				<div style="width: 200px; height: 40px;"></div>
			</nldd-collection>
		</div>
	`;

	// Item start positions in scroll coordinates, the same thing _scrollBy aims at.
	function itemStarts(collection: HTMLElement): number[] {
		const items = collection.shadowRoot!.querySelector('.collection__items') as HTMLElement;
		const slot = items.querySelector('slot') as HTMLSlotElement;
		const left = items.getBoundingClientRect().left;
		return slot.assignedElements().map(item =>
			Math.round(item.getBoundingClientRect().left - left + items.scrollLeft),
		);
	}

	it('springt met de pijl naar de volgende itemgrens', async () => {
		el = await fixture(scrollFixture);
		const collection = el.querySelector('nldd-collection') as HTMLElement;
		await waitForUpdate(collection);
		const items = collection.shadowRoot!.querySelector('.collection__items') as HTMLElement;
		expect(items.scrollWidth).toBeGreaterThan(items.clientWidth);
		const starts = itemStarts(collection);
		let target: number | undefined;
		items.scrollTo = ((options: ScrollToOptions) => { target = options.left; }) as typeof items.scrollTo;
		(collection as unknown as { _scrollBy(d: 1 | -1): void })._scrollBy(1);
		expect(target).toBe(starts[1]);
	});

	it('landt terug op een itemgrens vanaf een positie die daar niet op ligt', async () => {
		el = await fixture(scrollFixture);
		const collection = el.querySelector('nldd-collection') as HTMLElement;
		await waitForUpdate(collection);
		const items = collection.shadowRoot!.querySelector('.collection__items') as HTMLElement;
		const starts = itemStarts(collection);
		// Halverwege het tweede item, zoals na een scroll die op het einde stopte.
		// Smooth scrolling zou de toewijzing animeren en mandatory snapping zou
		// hem meteen terugtrekken naar een grens, dus allebei even uit: dit is
		// juist de stand waar de browser (Safari) na een programmatische scroll
		// in de praktijk wel in belandt.
		items.style.scrollBehavior = 'auto';
		items.style.scrollSnapType = 'none';
		items.scrollLeft = starts[1] + 30;
		expect(items.scrollLeft).toBeGreaterThan(starts[1]);
		let target: number | undefined;
		items.scrollTo = ((options: ScrollToOptions) => { target = options.left; }) as typeof items.scrollTo;
		(collection as unknown as { _scrollBy(d: 1 | -1): void })._scrollBy(-1);
		expect(target).toBe(starts[1]);
	});

	// Een disabled knop kan geen focus houden: de browser laat hem naar de body
	// vallen en de volgende Tab begint weer bovenaan de pagina.
	it('verlegt de focus naar de andere pijl als de gefocuste pijl uitvalt', async () => {
		el = await fixture(scrollFixture);
		const collection = el.querySelector('nldd-collection') as HTMLElement;
		await waitForUpdate(collection);
		const items = collection.shadowRoot!.querySelector('.collection__items') as HTMLElement;
		const [previous, next] = collection.shadowRoot!.querySelectorAll<HTMLElement>('nldd-icon-button');

		next.focus();
		expect(collection.shadowRoot!.activeElement).toBe(next);

		// Naar het einde scrollen zet de next-knop uit.
		items.style.scrollBehavior = 'auto';
		items.scrollLeft = items.scrollWidth;
		items.dispatchEvent(new Event('scroll'));
		await waitForUpdate(collection);
		await (collection as unknown as { updateComplete: Promise<unknown> }).updateComplete;

		expect((next as HTMLElement & { disabled: boolean }).disabled).toBe(true);
		expect(collection.shadowRoot!.activeElement).toBe(previous);
	});
});
