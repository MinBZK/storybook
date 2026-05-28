import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import type { NLDDPagination } from './pagination.js';
import './pagination.js';

function getPageLabels(el: NLDDPagination): (string | '…')[] {
	const allItems = el.shadowRoot!.querySelectorAll(
		'.pagination__page-button, .pagination__ellipsis'
	);

	return Array.from(allItems).map(item => {
		if (item.classList.contains('pagination__ellipsis')) return '…';
		return item.querySelector('.pagination__page-button-text')!.textContent!.trim();
	});
}

describe('nldd-pagination', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-pagination></nldd-pagination>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});
});

describe('nldd-pagination – visible page algorithm', () => {
	let el: NLDDPagination;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('shows all pages when total <= 7', async () => {
		el = await fixture<NLDDPagination>('<nldd-pagination current="3" total="5"></nldd-pagination>');
		await waitForUpdate(el);
		expect(getPageLabels(el)).toEqual(['1', '2', '3', '4', '5']);
	});

	it('shows exactly 7 when total = 7', async () => {
		el = await fixture<NLDDPagination>('<nldd-pagination current="4" total="7"></nldd-pagination>');
		await waitForUpdate(el);
		expect(getPageLabels(el)).toEqual(['1', '2', '3', '4', '5', '6', '7']);
	});

	it('near start: shows first 4 + ellipsis + last 2', async () => {
		el = await fixture<NLDDPagination>('<nldd-pagination current="2" total="10"></nldd-pagination>');
		await waitForUpdate(el);
		expect(getPageLabels(el)).toEqual(['1', '2', '3', '4', '…', '9', '10']);
	});

	it('page 4 transition: shows first 5 + ellipsis + last 1', async () => {
		el = await fixture<NLDDPagination>('<nldd-pagination current="4" total="10"></nldd-pagination>');
		await waitForUpdate(el);
		expect(getPageLabels(el)).toEqual(['1', '2', '3', '4', '5', '…', '10']);
	});

	it('near end: shows first 1 + ellipsis + last 5', async () => {
		el = await fixture<NLDDPagination>('<nldd-pagination current="9" total="10"></nldd-pagination>');
		await waitForUpdate(el);
		expect(getPageLabels(el)).toEqual(['1', '…', '6', '7', '8', '9', '10']);
	});

	it('middle: shows first + ellipsis + 3 around current + ellipsis + last', async () => {
		el = await fixture<NLDDPagination>('<nldd-pagination current="6" total="10"></nldd-pagination>');
		await waitForUpdate(el);
		expect(getPageLabels(el)).toEqual(['1', '…', '5', '6', '7', '…', '10']);
	});
});

describe('nldd-pagination – navigation', () => {
	let el: NLDDPagination;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('dispatches page-change on page button click', async () => {
		el = await fixture<NLDDPagination>('<nldd-pagination current="1" total="5"></nldd-pagination>');
		await waitForUpdate(el);

		let detail: any;
		el.addEventListener('page-change', ((e: CustomEvent) => {
			detail = e.detail;
		}) as EventListener);

		const pageButtons = el.shadowRoot!.querySelectorAll('.pagination__page-button');
		(pageButtons[2] as HTMLElement).click();
		await waitForUpdate(el);

		expect(detail).toBeDefined();
		expect(detail.page).toBe(3);
		expect(el.current).toBe(3);
	});

	it('previous button navigates to previous page', async () => {
		el = await fixture<NLDDPagination>('<nldd-pagination current="3" total="5"></nldd-pagination>');
		await waitForUpdate(el);

		let detail: any;
		el.addEventListener('page-change', ((e: CustomEvent) => {
			detail = e.detail;
		}) as EventListener);

		const prevBtn = el.shadowRoot!.querySelector('nldd-icon-button') as HTMLElement;
		prevBtn.click();
		await waitForUpdate(el);

		expect(detail.page).toBe(2);
	});

	it('next button navigates to next page', async () => {
		el = await fixture<NLDDPagination>('<nldd-pagination current="3" total="5"></nldd-pagination>');
		await waitForUpdate(el);

		let detail: any;
		el.addEventListener('page-change', ((e: CustomEvent) => {
			detail = e.detail;
		}) as EventListener);

		const navButtons = el.shadowRoot!.querySelectorAll('nldd-icon-button');
		(navButtons[1] as HTMLElement).click();
		await waitForUpdate(el);

		expect(detail.page).toBe(4);
	});

	it('previous button is disabled on first page', async () => {
		el = await fixture<NLDDPagination>('<nldd-pagination current="1" total="5"></nldd-pagination>');
		await waitForUpdate(el);

		const prevBtn = el.shadowRoot!.querySelector('nldd-icon-button') as HTMLElement;
		expect(prevBtn.hasAttribute('disabled')).toBe(true);
	});

	it('next button is disabled on last page', async () => {
		el = await fixture<NLDDPagination>('<nldd-pagination current="5" total="5"></nldd-pagination>');
		await waitForUpdate(el);

		const navButtons = el.shadowRoot!.querySelectorAll('nldd-icon-button');
		expect((navButtons[1] as HTMLElement).hasAttribute('disabled')).toBe(true);
	});

	it('marks current page button as active', async () => {
		el = await fixture<NLDDPagination>('<nldd-pagination current="3" total="5"></nldd-pagination>');
		await waitForUpdate(el);

		const activeBtn = el.shadowRoot!.querySelector('.pagination__page-button.is-current');
		expect(activeBtn).not.toBeNull();
		expect(activeBtn!.querySelector('.pagination__page-button-text')!.textContent!.trim()).toBe('3');
		expect(activeBtn!.getAttribute('aria-current')).toBe('page');
	});

	it('does not dispatch page-change when clicking current page', async () => {
		el = await fixture<NLDDPagination>('<nldd-pagination current="2" total="5"></nldd-pagination>');
		await waitForUpdate(el);

		let changeFired = false;
		el.addEventListener('page-change', () => { changeFired = true; });

		const pageButtons = el.shadowRoot!.querySelectorAll('.pagination__page-button');
		(pageButtons[1] as HTMLElement).click();
		await waitForUpdate(el);

		expect(changeFired).toBe(false);
	});
});

describe('nldd-pagination – href-pattern', () => {
	let el: NLDDPagination;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders anchor elements when href-pattern is set', async () => {
		el = await fixture<NLDDPagination>('<nldd-pagination current="2" total="5" href-pattern="/page/{page}"></nldd-pagination>');
		await waitForUpdate(el);

		const anchors = el.shadowRoot!.querySelectorAll('a.pagination__page-button');
		expect(anchors.length).toBeGreaterThan(0);
		expect(anchors[0].getAttribute('href')).toBe('/page/1');
	});

	it('renders no buttons when href-pattern is set', async () => {
		el = await fixture<NLDDPagination>('<nldd-pagination current="2" total="5" href-pattern="/page/{page}"></nldd-pagination>');
		await waitForUpdate(el);

		const buttons = el.shadowRoot!.querySelectorAll('button.pagination__page-button');
		expect(buttons.length).toBe(0);
	});

	it('omits href on anchors when disabled', async () => {
		el = await fixture<NLDDPagination>('<nldd-pagination current="2" total="5" href-pattern="/page/{page}" disabled></nldd-pagination>');
		await waitForUpdate(el);

		const anchors = el.shadowRoot!.querySelectorAll('a.pagination__page-button');
		for (const anchor of anchors) {
			expect(anchor.hasAttribute('href')).toBe(false);
			expect(anchor.getAttribute('aria-disabled')).toBe('true');
		}
	});

	it('dispatches page-change with href in detail', async () => {
		el = await fixture<NLDDPagination>('<nldd-pagination current="1" total="5" href-pattern="/page/{page}"></nldd-pagination>');
		await waitForUpdate(el);

		let detail: any;
		el.addEventListener('page-change', ((e: CustomEvent) => {
			e.preventDefault();
			detail = e.detail;
		}) as EventListener);

		const anchors = el.shadowRoot!.querySelectorAll('a.pagination__page-button');
		(anchors[2] as HTMLElement).click();
		await waitForUpdate(el);

		expect(detail).toBeDefined();
		expect(detail.page).toBe(3);
		expect(detail.href).toBe('/page/3');
	});

	it('updates current after anchor click', async () => {
		el = await fixture<NLDDPagination>('<nldd-pagination current="1" total="5" href-pattern="/page/{page}"></nldd-pagination>');
		await waitForUpdate(el);

		el.addEventListener('page-change', ((e: CustomEvent) => {
			e.preventDefault();
		}) as EventListener);

		const anchors = el.shadowRoot!.querySelectorAll('a.pagination__page-button');
		(anchors[2] as HTMLElement).click();
		await waitForUpdate(el);

		expect(el.current).toBe(3);
	});
});

describe('nldd-pagination – translations', () => {
	let el: NLDDPagination;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('uses default Dutch labels', async () => {
		el = await fixture<NLDDPagination>('<nldd-pagination current="1" total="5"></nldd-pagination>');
		await waitForUpdate(el);

		const nav = el.shadowRoot!.querySelector('nav');
		expect(nav!.getAttribute('aria-label')).toBe('Paginering');
	});

	it('overrides translations via property', async () => {
		el = await fixture<NLDDPagination>('<nldd-pagination current="1" total="5"></nldd-pagination>');
		el.translations = { 'components.pagination.accessibility-label': 'Pagination' };
		await waitForUpdate(el);

		const nav = el.shadowRoot!.querySelector('nav');
		expect(nav!.getAttribute('aria-label')).toBe('Pagination');
	});
});

describe('nldd-pagination – select expanded state', () => {
	let el: NLDDPagination;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('sets the select-expanded attribute when the picker opens', async () => {
		el = await fixture<NLDDPagination>('<nldd-pagination current="1" total="5"></nldd-pagination>');
		await waitForUpdate(el);

		el._handleSelectToggle(Object.assign(new Event('toggle'), { newState: 'open' }));
		expect(el.hasAttribute('select-expanded')).toBe(true);
	});

	it('removes the select-expanded attribute when the picker closes', async () => {
		el = await fixture<NLDDPagination>('<nldd-pagination current="1" total="5"></nldd-pagination>');
		await waitForUpdate(el);

		el._handleSelectToggle(Object.assign(new Event('toggle'), { newState: 'open' }));
		expect(el.hasAttribute('select-expanded')).toBe(true);

		el._handleSelectToggle(Object.assign(new Event('toggle'), { newState: 'closed' }));
		expect(el.hasAttribute('select-expanded')).toBe(false);
	});

	it('clears the select-expanded attribute on blur', async () => {
		el = await fixture<NLDDPagination>('<nldd-pagination current="1" total="5"></nldd-pagination>');
		await waitForUpdate(el);

		el._handleSelectToggle(Object.assign(new Event('toggle'), { newState: 'open' }));
		expect(el.hasAttribute('select-expanded')).toBe(true);

		el._handleSelectBlur();
		expect(el.hasAttribute('select-expanded')).toBe(false);
	});
});
