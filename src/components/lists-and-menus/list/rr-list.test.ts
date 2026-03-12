import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-list.ts';

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
});
