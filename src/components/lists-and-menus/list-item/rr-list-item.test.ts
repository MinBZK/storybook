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

	it('sets show-gutters when inside a box list', async () => {
		const wrapper = await fixture(`
			<rr-list variant="box">
				<rr-list-item></rr-list-item>
			</rr-list>
		`);
		await waitForUpdate(wrapper);
		el = wrapper.querySelector('rr-list-item')!;
		expect(el.hasAttribute('show-gutters')).toBe(true);
	});

	it('does not set show-gutters when inside a simple list', async () => {
		const wrapper = await fixture(`
			<rr-list variant="simple">
				<rr-list-item></rr-list-item>
			</rr-list>
		`);
		await waitForUpdate(wrapper);
		el = wrapper.querySelector('rr-list-item')!;
		expect(el.hasAttribute('show-gutters')).toBe(false);
	});

	it('sets has-end when end slot is filled, but not has-start', async () => {
		const wrapper = await fixture(`
			<rr-list variant="simple">
				<rr-list-item>
					<span slot="end">›</span>
				</rr-list-item>
			</rr-list>
		`);
		await waitForUpdate(wrapper);
		el = wrapper.querySelector('rr-list-item')!;
		expect(el.hasAttribute('has-end')).toBe(true);
		expect(el.hasAttribute('has-start')).toBe(false);
	});
});
