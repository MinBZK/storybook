import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { NDDPagination } from './ndd-pagination.ts';
import './ndd-pagination.ts';

function getPageLabels(el: NDDPagination): (string | '...')[] {
	// Collect all page buttons and ellipses in DOM order
	const allItems = el.shadowRoot!.querySelectorAll(
		'.pagination__button:not(.pagination__button--nav)'
	);

	return Array.from(allItems).map(btn => {
		if (btn.classList.contains('pagination__button--ellipsis')) return '...';
		return btn.querySelector('.pagination__button-label')!.textContent!.trim();
	});
}

describe('ndd-pagination', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-pagination></ndd-pagination>');
		await waitForUpdate(el);

		expect(el.shadowRoot).not.toBeNull();
	});
});

describe('ndd-pagination – visible page algorithm', () => {
	let el: NDDPagination;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('shows all pages when total <= 7', async () => {
		el = await fixture<NDDPagination>('<ndd-pagination current-page="3" total-pages="5"></ndd-pagination>');
		await waitForUpdate(el);

		const labels = getPageLabels(el);
		expect(labels).toEqual(['1', '2', '3', '4', '5']);
	});

	it('shows exactly 7 when total = 7', async () => {
		el = await fixture<NDDPagination>('<ndd-pagination current-page="4" total-pages="7"></ndd-pagination>');
		await waitForUpdate(el);

		const labels = getPageLabels(el);
		expect(labels).toEqual(['1', '2', '3', '4', '5', '6', '7']);
	});

	it('near start: shows first 4 + ellipsis + last 2', async () => {
		el = await fixture<NDDPagination>('<ndd-pagination current-page="2" total-pages="10"></ndd-pagination>');
		await waitForUpdate(el);

		const labels = getPageLabels(el);
		expect(labels).toEqual(['1', '2', '3', '4', '...', '9', '10']);
	});

	it('page 4 transition: shows first 5 + ellipsis + last 1', async () => {
		el = await fixture<NDDPagination>('<ndd-pagination current-page="4" total-pages="10"></ndd-pagination>');
		await waitForUpdate(el);

		const labels = getPageLabels(el);
		expect(labels).toEqual(['1', '2', '3', '4', '5', '...', '10']);
	});

	it('near end: shows first 1 + ellipsis + last 5', async () => {
		el = await fixture<NDDPagination>('<ndd-pagination current-page="9" total-pages="10"></ndd-pagination>');
		await waitForUpdate(el);

		const labels = getPageLabels(el);
		expect(labels).toEqual(['1', '...', '6', '7', '8', '9', '10']);
	});

	it('middle: shows first + ellipsis + 3 around current + ellipsis + last', async () => {
		el = await fixture<NDDPagination>('<ndd-pagination current-page="6" total-pages="10"></ndd-pagination>');
		await waitForUpdate(el);

		const labels = getPageLabels(el);
		expect(labels).toEqual(['1', '...', '5', '6', '7', '...', '10']);
	});
});

describe('ndd-pagination – navigation', () => {
	let el: NDDPagination;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('dispatches page-change on page button click', async () => {
		el = await fixture<NDDPagination>('<ndd-pagination current-page="1" total-pages="5"></ndd-pagination>');
		await waitForUpdate(el);

		let detail: any;
		el.addEventListener('page-change', ((e: CustomEvent) => {
			detail = e.detail;
		}) as EventListener);

		// Click page 3 button
		const pageButtons = el.shadowRoot!.querySelectorAll(
			'.pagination__button:not(.pagination__button--nav):not(.pagination__button--ellipsis)'
		);
		(pageButtons[2] as HTMLElement).click();
		await waitForUpdate(el);

		expect(detail).toBeDefined();
		expect(detail.page).toBe(3);
		expect(el.currentPage).toBe(3);
	});

	it('previous button navigates to previous page', async () => {
		el = await fixture<NDDPagination>('<ndd-pagination current-page="3" total-pages="5"></ndd-pagination>');
		await waitForUpdate(el);

		let detail: any;
		el.addEventListener('page-change', ((e: CustomEvent) => {
			detail = e.detail;
		}) as EventListener);

		const prevBtn = el.shadowRoot!.querySelector('.pagination__button--nav') as HTMLElement;
		prevBtn.click();
		await waitForUpdate(el);

		expect(detail.page).toBe(2);
	});

	it('next button navigates to next page', async () => {
		el = await fixture<NDDPagination>('<ndd-pagination current-page="3" total-pages="5"></ndd-pagination>');
		await waitForUpdate(el);

		let detail: any;
		el.addEventListener('page-change', ((e: CustomEvent) => {
			detail = e.detail;
		}) as EventListener);

		const navButtons = el.shadowRoot!.querySelectorAll('.pagination__button--nav');
		(navButtons[1] as HTMLElement).click();
		await waitForUpdate(el);

		expect(detail.page).toBe(4);
	});

	it('previous button is disabled on first page', async () => {
		el = await fixture<NDDPagination>('<ndd-pagination current-page="1" total-pages="5"></ndd-pagination>');
		await waitForUpdate(el);

		const prevBtn = el.shadowRoot!.querySelector('.pagination__button--nav') as HTMLButtonElement;
		expect(prevBtn.disabled).toBe(true);
	});

	it('next button is disabled on last page', async () => {
		el = await fixture<NDDPagination>('<ndd-pagination current-page="5" total-pages="5"></ndd-pagination>');
		await waitForUpdate(el);

		const navButtons = el.shadowRoot!.querySelectorAll('.pagination__button--nav');
		expect((navButtons[1] as HTMLButtonElement).disabled).toBe(true);
	});

	it('marks current page button as active', async () => {
		el = await fixture<NDDPagination>('<ndd-pagination current-page="3" total-pages="5"></ndd-pagination>');
		await waitForUpdate(el);

		const activeBtn = el.shadowRoot!.querySelector('.pagination__button--active');
		expect(activeBtn).not.toBeNull();
		expect(activeBtn!.querySelector('.pagination__button-label')!.textContent!.trim()).toBe('3');
		expect(activeBtn!.getAttribute('aria-current')).toBe('page');
	});

	it('does not dispatch page-change when clicking current page', async () => {
		el = await fixture<NDDPagination>('<ndd-pagination current-page="2" total-pages="5"></ndd-pagination>');
		await waitForUpdate(el);

		let changeFired = false;
		el.addEventListener('page-change', () => { changeFired = true; });

		const pageButtons = el.shadowRoot!.querySelectorAll(
			'.pagination__button:not(.pagination__button--nav):not(.pagination__button--ellipsis)'
		);
		// Click page 2 (already current)
		(pageButtons[1] as HTMLElement).click();
		await waitForUpdate(el);

		expect(changeFired).toBe(false);
	});
});
