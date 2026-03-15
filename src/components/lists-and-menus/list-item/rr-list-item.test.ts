import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-list-item.ts';
import '../list/rr-list.ts';

describe('rr-list-item', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-list-item></rr-list-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults to md size', async () => {
		el = await fixture('<rr-list-item></rr-list-item>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('md');
	});

	it('reflects selected attribute', async () => {
		el = await fixture('<rr-list-item selected></rr-list-item>');
		await waitForUpdate(el);
		expect(el.hasAttribute('selected')).toBe(true);
	});

	it('renders a div by default', async () => {
		el = await fixture('<rr-list-item></rr-list-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('div.list-item')).not.toBeNull();
	});

	it('renders a button when type="button"', async () => {
		el = await fixture('<rr-list-item type="button"></rr-list-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('button.list-item')).not.toBeNull();
	});

	it('renders an anchor when type="link"', async () => {
		el = await fixture('<rr-list-item type="link" href="/test"></rr-list-item>');
		await waitForUpdate(el);
		const anchor = el.shadowRoot!.querySelector('a.list-item');
		expect(anchor).not.toBeNull();
		expect(anchor?.getAttribute('href')).toBe('/test');
	});

	it('sets is-boxed class when inside a box list', async () => {
		const wrapper = await fixture(`
			<rr-list variant="box">
				<rr-list-item></rr-list-item>
			</rr-list>
		`);
		await waitForUpdate(wrapper);
		el = wrapper.querySelector('rr-list-item')!;
		expect(el.classList.contains('is-boxed')).toBe(true);
	});

	it('does not set is-boxed class when inside a simple list', async () => {
		const wrapper = await fixture(`
			<rr-list variant="simple">
				<rr-list-item></rr-list-item>
			</rr-list>
		`);
		await waitForUpdate(wrapper);
		el = wrapper.querySelector('rr-list-item')!;
		expect(el.classList.contains('is-boxed')).toBe(false);
	});

	it('shows end area when end slot is filled, start area stays hidden', async () => {
		const wrapper = await fixture(`
			<rr-list variant="simple">
				<rr-list-item>
					<span slot="end">›</span>
				</rr-list-item>
			</rr-list>
		`);
		await waitForUpdate(wrapper);
		el = wrapper.querySelector('rr-list-item')!;
		const startArea = el.shadowRoot!.querySelector('.list-item__start-area');
		const endArea = el.shadowRoot!.querySelector('.list-item__end-area');
		expect(startArea?.classList.contains('is-visible')).toBe(false);
		expect(endArea?.classList.contains('is-visible')).toBe(true);
	});


	// — Selected propagation ————————————————————————————————————————————————

	it('propagates selected attribute to slotted elements when selected', async () => {
		const wrapper = await fixture(`
			<rr-list variant="simple">
				<rr-list-item selected>
					<rr-text-cell><p slot="text">Item</p></rr-text-cell>
				</rr-list-item>
			</rr-list>
		`);
		await waitForUpdate(wrapper);
		el = wrapper.querySelector('rr-list-item')!;
		const cell = el.querySelector('rr-text-cell');
		expect(cell?.hasAttribute('selected')).toBe(true);
	});

	it('removes selected attribute from slotted elements when deselected', async () => {
		const wrapper = await fixture(`
			<rr-list variant="simple">
				<rr-list-item selected>
					<rr-text-cell><p slot="text">Item</p></rr-text-cell>
				</rr-list-item>
			</rr-list>
		`);
		await waitForUpdate(wrapper);
		el = wrapper.querySelector('rr-list-item')!;
		el.removeAttribute('selected');
		await waitForUpdate(el);
		const cell = el.querySelector('rr-text-cell');
		expect(cell?.hasAttribute('selected')).toBe(false);
	});
});
