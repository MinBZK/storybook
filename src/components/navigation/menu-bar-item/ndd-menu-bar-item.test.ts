import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './ndd-menu-bar-item.ts';

describe('ndd-menu-bar-item', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
		// Clean up any popover menus appended to document.body
		document.querySelectorAll('ndd-menu').forEach(m => m.remove());
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-menu-bar-item text="Test"></ndd-menu-bar-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
		expect(el).toBeInstanceOf(customElements.get('ndd-menu-bar-item'));
	});

	it('renders text from attribute', async () => {
		el = await fixture('<ndd-menu-bar-item text="Hello"></ndd-menu-bar-item>');
		await waitForUpdate(el);
		const content = el.shadowRoot!.querySelector('.menu-bar-item__text');
		expect(content!.textContent!.trim()).toBe('Hello');
	});

	it('does not set current on click', async () => {
		el = await fixture('<ndd-menu-bar-item text="Test"></ndd-menu-bar-item>');
		await waitForUpdate(el);
		el.click();
		await waitForUpdate(el);
		expect(el.hasAttribute('current')).toBe(false);
	});

	it('creates popover menu when expandable with menu items', async () => {
		el = await fixture(`
			<ndd-menu-bar-item text="NL" expandable>
				<ndd-menu-item text="Nederlands"></ndd-menu-item>
				<ndd-menu-item text="English"></ndd-menu-item>
			</ndd-menu-bar-item>
		`);
		await waitForUpdate(el);
		const menu = document.querySelector('ndd-menu');
		expect(menu).not.toBeNull();
	});

	it('does not fire select when expandable with menu items', async () => {
		el = await fixture(`
			<ndd-menu-bar-item text="NL" expandable>
				<ndd-menu-item text="Nederlands"></ndd-menu-item>
			</ndd-menu-bar-item>
		`);
		await waitForUpdate(el);
		let fired = false;
		el.addEventListener('select', () => { fired = true; });
		el.click();
		await waitForUpdate(el);
		expect(fired).toBe(false);
	});

	it('renders as link when href is set', async () => {
		el = await fixture('<ndd-menu-bar-item text="Home" href="/home"></ndd-menu-bar-item>');
		await waitForUpdate(el);
		const link = el.shadowRoot!.querySelector('a.menu-bar-item');
		expect(link).not.toBeNull();
		expect(link!.getAttribute('href')).toBe('/home');
	});

	it('renders as button when no href', async () => {
		el = await fixture('<ndd-menu-bar-item text="Action"></ndd-menu-bar-item>');
		await waitForUpdate(el);
		const button = el.shadowRoot!.querySelector('button.menu-bar-item');
		expect(button).not.toBeNull();
	});

	it('renders icon when icon attribute is set', async () => {
		el = await fixture('<ndd-menu-bar-item text="Search" icon="magnifier"></ndd-menu-bar-item>');
		await waitForUpdate(el);
		const icon = el.shadowRoot!.querySelector('.menu-bar-item__icon');
		expect(icon).not.toBeNull();
	});

	it('renders disclosure icon when expandable', async () => {
		el = await fixture('<ndd-menu-bar-item text="More" expandable></ndd-menu-bar-item>');
		await waitForUpdate(el);
		const disclosure = el.shadowRoot!.querySelector('.menu-bar-item__disclosure-icon');
		expect(disclosure).not.toBeNull();
	});

	it('dispatches select event on button click', async () => {
		el = await fixture('<ndd-menu-bar-item text="Home"></ndd-menu-bar-item>');
		await waitForUpdate(el);
		let detail: any;
		el.addEventListener('select', ((e: CustomEvent) => {
			detail = e.detail;
		}) as EventListener);
		el.click();
		await waitForUpdate(el);
		expect(detail).toBeDefined();
		expect(detail.item).toBe(el);
	});

	it('does not dispatch select when disabled', async () => {
		el = await fixture('<ndd-menu-bar-item text="Home" disabled></ndd-menu-bar-item>');
		await waitForUpdate(el);
		let fired = false;
		el.addEventListener('select', () => { fired = true; });
		el.click();
		await waitForUpdate(el);
		expect(fired).toBe(false);
	});

	it('delegates focus to inner button', async () => {
		el = await fixture('<ndd-menu-bar-item text="Home"></ndd-menu-bar-item>');
		await waitForUpdate(el);
		el.focus();
		const button = el.shadowRoot!.querySelector('button');
		expect(el.shadowRoot!.activeElement).toBe(button);
	});

	it('reflects content-priority attribute', async () => {
		el = await fixture('<ndd-menu-bar-item text="Zoeken" icon="magnifier" content-priority="icon"></ndd-menu-bar-item>');
		await waitForUpdate(el);
		expect(el.getAttribute('content-priority')).toBe('icon');
	});

	it('reflects compact attribute', async () => {
		el = await fixture('<ndd-menu-bar-item text="Zoeken" icon="magnifier" compact></ndd-menu-bar-item>');
		await waitForUpdate(el);
		expect(el.hasAttribute('compact')).toBe(true);
	});

	it('sets aria-label when content-priority="icon" and compact', async () => {
		el = await fixture('<ndd-menu-bar-item text="Zoeken" icon="magnifier" content-priority="icon" compact></ndd-menu-bar-item>');
		await waitForUpdate(el);
		const button = el.shadowRoot!.querySelector('button');
		expect(button!.getAttribute('aria-label')).toBe('Zoeken');
	});

	it('does not set aria-label when content-priority="icon" without compact', async () => {
		el = await fixture('<ndd-menu-bar-item text="Zoeken" icon="magnifier" content-priority="icon"></ndd-menu-bar-item>');
		await waitForUpdate(el);
		const button = el.shadowRoot!.querySelector('button');
		expect(button!.hasAttribute('aria-label')).toBe(false);
	});
});

describe('ndd-menu-bar-item – _sanitizeUrl', () => {
	let el: any;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('allows valid relative URLs', async () => {
		el = await fixture('<ndd-menu-bar-item text="Link" href="/page"></ndd-menu-bar-item>');
		await waitForUpdate(el);
		expect(el._sanitizeUrl('/page')).toBe('/page');
	});

	it('allows valid https URLs', async () => {
		el = await fixture('<ndd-menu-bar-item text="Link"></ndd-menu-bar-item>');
		await waitForUpdate(el);
		expect(el._sanitizeUrl('https://example.com')).toBe('https://example.com');
	});

	it('blocks javascript: URLs', async () => {
		el = await fixture('<ndd-menu-bar-item text="Link"></ndd-menu-bar-item>');
		await waitForUpdate(el);
		expect(el._sanitizeUrl('javascript:alert(1)')).toBeNull();
	});

	it('blocks data: URLs', async () => {
		el = await fixture('<ndd-menu-bar-item text="Link"></ndd-menu-bar-item>');
		await waitForUpdate(el);
		expect(el._sanitizeUrl('data:text/html,<script>alert(1)</script>')).toBeNull();
	});

	it('blocks vbscript: URLs', async () => {
		el = await fixture('<ndd-menu-bar-item text="Link"></ndd-menu-bar-item>');
		await waitForUpdate(el);
		expect(el._sanitizeUrl('vbscript:MsgBox("XSS")')).toBeNull();
	});

	it('blocks uppercase javascript: URLs', async () => {
		el = await fixture('<ndd-menu-bar-item text="Link"></ndd-menu-bar-item>');
		await waitForUpdate(el);
		expect(el._sanitizeUrl('JAVASCRIPT:alert(1)')).toBeNull();
	});

	it('blocks mixed case JavaScript: URLs', async () => {
		el = await fixture('<ndd-menu-bar-item text="Link"></ndd-menu-bar-item>');
		await waitForUpdate(el);
		expect(el._sanitizeUrl('JavaScript:alert(1)')).toBeNull();
	});

	it('blocks whitespace-prefixed javascript: URLs', async () => {
		el = await fixture('<ndd-menu-bar-item text="Link"></ndd-menu-bar-item>');
		await waitForUpdate(el);
		expect(el._sanitizeUrl('  javascript:alert(1)')).toBeNull();
	});

	it('blocks non-breaking-space-prefixed javascript: URLs', async () => {
		el = await fixture('<ndd-menu-bar-item text="Link"></ndd-menu-bar-item>');
		await waitForUpdate(el);
		expect(el._sanitizeUrl('\u00A0javascript:alert(1)')).toBeNull();
	});

	it('blocks zero-width-space-prefixed javascript: URLs', async () => {
		el = await fixture('<ndd-menu-bar-item text="Link"></ndd-menu-bar-item>');
		await waitForUpdate(el);
		expect(el._sanitizeUrl('\u200Bjavascript:alert(1)')).toBeNull();
	});

	it('returns null for empty input', async () => {
		el = await fixture('<ndd-menu-bar-item text="Link"></ndd-menu-bar-item>');
		await waitForUpdate(el);
		expect(el._sanitizeUrl('')).toBeNull();
		expect(el._sanitizeUrl(null)).toBeNull();
	});
});
