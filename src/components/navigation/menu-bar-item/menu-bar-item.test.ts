import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './menu-bar-item.ts';

describe('nldd-menu-bar-item', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
		// Clean up any popover menus appended to document.body
		document.querySelectorAll('nldd-menu').forEach(m => m.remove());
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-menu-bar-item text="Test"></nldd-menu-bar-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
		expect(el).toBeInstanceOf(customElements.get('nldd-menu-bar-item'));
	});

	it('renders text from attribute', async () => {
		el = await fixture('<nldd-menu-bar-item text="Hello"></nldd-menu-bar-item>');
		await waitForUpdate(el);
		const content = el.shadowRoot!.querySelector('.menu-bar-item__text');
		expect(content!.textContent!.trim()).toBe('Hello');
	});

	it('does not set current on click', async () => {
		el = await fixture('<nldd-menu-bar-item text="Test"></nldd-menu-bar-item>');
		await waitForUpdate(el);
		el.click();
		await waitForUpdate(el);
		expect(el.hasAttribute('current')).toBe(false);
	});

	it('creates popover menu lazily on first click when expandable', async () => {
		el = await fixture(`
			<nldd-menu-bar-item text="NL" expandable>
				<nldd-menu-item text="Nederlands"></nldd-menu-item>
				<nldd-menu-item text="English"></nldd-menu-item>
			</nldd-menu-bar-item>
		`);
		await waitForUpdate(el);
		// Menu is not created until first click (lazy creation)
		expect(document.querySelector('nldd-menu')).toBeNull();
		el.click();
		await waitForUpdate(el);
		expect(document.querySelector('nldd-menu')).not.toBeNull();
	});

	it('removes popover menu on disconnect', async () => {
		el = await fixture(`
			<nldd-menu-bar-item text="NL" expandable>
				<nldd-menu-item text="Nederlands"></nldd-menu-item>
			</nldd-menu-bar-item>
		`);
		await waitForUpdate(el);
		el.click();
		await waitForUpdate(el);
		expect(document.querySelector('nldd-menu')).not.toBeNull();
		cleanup(el);
		expect(document.querySelector('nldd-menu')).toBeNull();
		// Prevent afterEach double-cleanup
		el = null as any;
	});

	it('removes popover menu when expandable is removed', async () => {
		el = await fixture(`
			<nldd-menu-bar-item text="NL" expandable>
				<nldd-menu-item text="Nederlands"></nldd-menu-item>
			</nldd-menu-bar-item>
		`);
		await waitForUpdate(el);
		el.click();
		await waitForUpdate(el);
		expect(document.querySelector('nldd-menu')).not.toBeNull();
		el.removeAttribute('expandable');
		await waitForUpdate(el);
		expect(document.querySelector('nldd-menu')).toBeNull();
	});

	it('does not fire select when expandable with menu items', async () => {
		el = await fixture(`
			<nldd-menu-bar-item text="NL" expandable>
				<nldd-menu-item text="Nederlands"></nldd-menu-item>
			</nldd-menu-bar-item>
		`);
		await waitForUpdate(el);
		let fired = false;
		el.addEventListener('select', () => { fired = true; });
		el.click();
		await waitForUpdate(el);
		expect(fired).toBe(false);
	});

	it('renders as link when href is set', async () => {
		el = await fixture('<nldd-menu-bar-item text="Home" href="/home"></nldd-menu-bar-item>');
		await waitForUpdate(el);
		const link = el.shadowRoot!.querySelector('a.menu-bar-item');
		expect(link).not.toBeNull();
		expect(link!.getAttribute('href')).toBe('/home');
	});

	it('renders as button when no href', async () => {
		el = await fixture('<nldd-menu-bar-item text="Action"></nldd-menu-bar-item>');
		await waitForUpdate(el);
		const button = el.shadowRoot!.querySelector('button.menu-bar-item');
		expect(button).not.toBeNull();
	});

	it('renders icon when icon attribute is set', async () => {
		el = await fixture('<nldd-menu-bar-item text="Search" icon="magnifier"></nldd-menu-bar-item>');
		await waitForUpdate(el);
		const icon = el.shadowRoot!.querySelector('.menu-bar-item__icon');
		expect(icon).not.toBeNull();
	});

	it('renders disclosure icon when expandable', async () => {
		el = await fixture('<nldd-menu-bar-item text="More" expandable></nldd-menu-bar-item>');
		await waitForUpdate(el);
		const disclosure = el.shadowRoot!.querySelector('.menu-bar-item__disclosure-icon');
		expect(disclosure).not.toBeNull();
	});

	it('dispatches select event on button click', async () => {
		el = await fixture('<nldd-menu-bar-item text="Home"></nldd-menu-bar-item>');
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
		el = await fixture('<nldd-menu-bar-item text="Home" disabled></nldd-menu-bar-item>');
		await waitForUpdate(el);
		let fired = false;
		el.addEventListener('select', () => { fired = true; });
		el.click();
		await waitForUpdate(el);
		expect(fired).toBe(false);
	});

	it('delegates focus to inner button', async () => {
		el = await fixture('<nldd-menu-bar-item text="Home"></nldd-menu-bar-item>');
		await waitForUpdate(el);
		el.focus();
		const button = el.shadowRoot!.querySelector('button');
		expect(el.shadowRoot!.activeElement).toBe(button);
	});

	it('reflects content-priority attribute', async () => {
		el = await fixture('<nldd-menu-bar-item text="Zoeken" icon="magnifier" content-priority="icon"></nldd-menu-bar-item>');
		await waitForUpdate(el);
		expect(el.getAttribute('content-priority')).toBe('icon');
	});

	it('reflects compact attribute', async () => {
		el = await fixture('<nldd-menu-bar-item text="Zoeken" icon="magnifier" compact></nldd-menu-bar-item>');
		await waitForUpdate(el);
		expect(el.hasAttribute('compact')).toBe(true);
	});

	it('sets aria-label when content-priority="icon" and compact', async () => {
		el = await fixture('<nldd-menu-bar-item text="Zoeken" icon="magnifier" content-priority="icon" compact></nldd-menu-bar-item>');
		await waitForUpdate(el);
		const button = el.shadowRoot!.querySelector('button');
		expect(button!.getAttribute('aria-label')).toBe('Zoeken');
	});

	it('does not set aria-label when content-priority="icon" without compact', async () => {
		el = await fixture('<nldd-menu-bar-item text="Zoeken" icon="magnifier" content-priority="icon"></nldd-menu-bar-item>');
		await waitForUpdate(el);
		const button = el.shadowRoot!.querySelector('button');
		expect(button!.hasAttribute('aria-label')).toBe(false);
	});
});

describe('nldd-menu-bar-item – URL sanitization', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('does not render link for javascript: href', async () => {
		el = await fixture('<nldd-menu-bar-item text="Link" href="javascript:alert(1)"></nldd-menu-bar-item>');
		await waitForUpdate(el);
		const link = el.shadowRoot!.querySelector('a');
		expect(link).toBeNull();
		const button = el.shadowRoot!.querySelector('button');
		expect(button).not.toBeNull();
	});

	it('renders link for valid href', async () => {
		el = await fixture('<nldd-menu-bar-item text="Link" href="/page"></nldd-menu-bar-item>');
		await waitForUpdate(el);
		const link = el.shadowRoot!.querySelector('a');
		expect(link).not.toBeNull();
		expect(link!.getAttribute('href')).toBe('/page');
	});
});
