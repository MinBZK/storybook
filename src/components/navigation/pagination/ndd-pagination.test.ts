import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { NDDPagination } from './ndd-pagination.ts';
import './ndd-pagination.ts';

function getPageLabels(el: NDDPagination): (string | '…')[] {
	const allItems = el.shadowRoot!.querySelectorAll(
		'.pagination__page-button, .pagination__ellipsis'
	);

	return Array.from(allItems).map(item => {
		if (item.classList.contains('pagination__ellipsis')) return '…';
		return item.querySelector('.pagination__page-button-text')!.textContent!.trim();
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
		el = await fixture<NDDPagination>('<ndd-pagination current="3" total="5"></ndd-pagination>');
		await waitForUpdate(el);
		expect(getPageLabels(el)).toEqual(['1', '2', '3', '4', '5']);
	});

	it('shows exactly 7 when total = 7', async () => {
		el = await fixture<NDDPagination>('<ndd-pagination current="4" total="7"></ndd-pagination>');
		await waitForUpdate(el);
		expect(getPageLabels(el)).toEqual(['1', '2', '3', '4', '5', '6', '7']);
	});

	it('near start: shows first 4 + ellipsis + last 2', async () => {
		el = await fixture<NDDPagination>('<ndd-pagination current="2" total="10"></ndd-pagination>');
		await waitForUpdate(el);
		expect(getPageLabels(el)).toEqual(['1', '2', '3', '4', '…', '9', '10']);
	});

	it('page 4 transition: shows first 5 + ellipsis + last 1', async () => {
		el = await fixture<NDDPagination>('<ndd-pagination current="4" total="10"></ndd-pagination>');
		await waitForUpdate(el);
		expect(getPageLabels(el)).toEqual(['1', '2', '3', '4', '5', '…', '10']);
	});

	it('near end: shows first 1 + ellipsis + last 5', async () => {
		el = await fixture<NDDPagination>('<ndd-pagination current="9" total="10"></ndd-pagination>');
		await waitForUpdate(el);
		expect(getPageLabels(el)).toEqual(['1', '…', '6', '7', '8', '9', '10']);
	});

	it('middle: shows first + ellipsis + 3 around current + ellipsis + last', async () => {
		el = await fixture<NDDPagination>('<ndd-pagination current="6" total="10"></ndd-pagination>');
		await waitForUpdate(el);
		expect(getPageLabels(el)).toEqual(['1', '…', '5', '6', '7', '…', '10']);
	});
});

describe('ndd-pagination – navigation', () => {
	let el: NDDPagination;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('dispatches page-change on page button click', async () => {
		el = await fixture<NDDPagination>('<ndd-pagination current="1" total="5"></ndd-pagination>');
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
		el = await fixture<NDDPagination>('<ndd-pagination current="3" total="5"></ndd-pagination>');
		await waitForUpdate(el);

		let detail: any;
		el.addEventListener('page-change', ((e: CustomEvent) => {
			detail = e.detail;
		}) as EventListener);

		const prevBtn = el.shadowRoot!.querySelector('ndd-icon-button') as HTMLElement;
		prevBtn.click();
		await waitForUpdate(el);

		expect(detail.page).toBe(2);
	});

	it('next button navigates to next page', async () => {
		el = await fixture<NDDPagination>('<ndd-pagination current="3" total="5"></ndd-pagination>');
		await waitForUpdate(el);

		let detail: any;
		el.addEventListener('page-change', ((e: CustomEvent) => {
			detail = e.detail;
		}) as EventListener);

		const navButtons = el.shadowRoot!.querySelectorAll('ndd-icon-button');
		(navButtons[1] as HTMLElement).click();
		await waitForUpdate(el);

		expect(detail.page).toBe(4);
	});

	it('previous button is disabled on first page', async () => {
		el = await fixture<NDDPagination>('<ndd-pagination current="1" total="5"></ndd-pagination>');
		await waitForUpdate(el);

		const prevBtn = el.shadowRoot!.querySelector('ndd-icon-button') as HTMLElement;
		expect(prevBtn.hasAttribute('disabled')).toBe(true);
	});

	it('next button is disabled on last page', async () => {
		el = await fixture<NDDPagination>('<ndd-pagination current="5" total="5"></ndd-pagination>');
		await waitForUpdate(el);

		const navButtons = el.shadowRoot!.querySelectorAll('ndd-icon-button');
		expect((navButtons[1] as HTMLElement).hasAttribute('disabled')).toBe(true);
	});

	it('marks current page button as active', async () => {
		el = await fixture<NDDPagination>('<ndd-pagination current="3" total="5"></ndd-pagination>');
		await waitForUpdate(el);

		const activeBtn = el.shadowRoot!.querySelector('.pagination__page-button.is-current');
		expect(activeBtn).not.toBeNull();
		expect(activeBtn!.querySelector('.pagination__page-button-text')!.textContent!.trim()).toBe('3');
		expect(activeBtn!.getAttribute('aria-current')).toBe('page');
	});

	it('does not dispatch page-change when clicking current page', async () => {
		el = await fixture<NDDPagination>('<ndd-pagination current="2" total="5"></ndd-pagination>');
		await waitForUpdate(el);

		let changeFired = false;
		el.addEventListener('page-change', () => { changeFired = true; });

		const pageButtons = el.shadowRoot!.querySelectorAll('.pagination__page-button');
		(pageButtons[1] as HTMLElement).click();
		await waitForUpdate(el);

		expect(changeFired).toBe(false);
	});
});

describe('ndd-pagination – keyboard navigation', () => {
	let el: NDDPagination;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('ArrowRight calls focus on next page button', async () => {
		el = await fixture<NDDPagination>('<ndd-pagination current="1" total="5"></ndd-pagination>');
		await waitForUpdate(el);

		const buttons = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.pagination__page-button');
		const focusSpy = vi.spyOn(buttons[1], 'focus');
		buttons[0].focus();
		buttons[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, composed: true }));

		expect(focusSpy).toHaveBeenCalled();
	});

	it('ArrowLeft wraps focus to last page button', async () => {
		el = await fixture<NDDPagination>('<ndd-pagination current="1" total="5"></ndd-pagination>');
		await waitForUpdate(el);

		const buttons = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.pagination__page-button');
		const focusSpy = vi.spyOn(buttons[buttons.length - 1], 'focus');
		buttons[0].focus();
		buttons[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, composed: true }));

		expect(focusSpy).toHaveBeenCalled();
	});

	it('Home calls focus on first page button', async () => {
		el = await fixture<NDDPagination>('<ndd-pagination current="3" total="5"></ndd-pagination>');
		await waitForUpdate(el);

		const buttons = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.pagination__page-button');
		const focusSpy = vi.spyOn(buttons[0], 'focus');
		buttons[2].focus();
		buttons[2].dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true, composed: true }));

		expect(focusSpy).toHaveBeenCalled();
	});

	it('End calls focus on last page button', async () => {
		el = await fixture<NDDPagination>('<ndd-pagination current="1" total="5"></ndd-pagination>');
		await waitForUpdate(el);

		const buttons = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.pagination__page-button');
		const focusSpy = vi.spyOn(buttons[buttons.length - 1], 'focus');
		buttons[0].focus();
		buttons[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true, composed: true }));

		expect(focusSpy).toHaveBeenCalled();
	});
});
