import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { NDDMenuBar } from './ndd-menu-bar.ts';
import './ndd-menu-bar.ts';

describe('ndd-menu-bar', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
		document.querySelectorAll('ndd-menu').forEach(m => m.remove());
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-menu-bar></ndd-menu-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
		expect(el).toBeInstanceOf(customElements.get('ndd-menu-bar'));
	});

	it('renders slotted menu-bar-items', async () => {
		el = await fixture(`
			<ndd-menu-bar>
				<ndd-menu-bar-item text="Home"></ndd-menu-bar-item>
				<ndd-menu-bar-item text="About"></ndd-menu-bar-item>
			</ndd-menu-bar>
		`);
		await waitForUpdate(el);
		const items = el.querySelectorAll('ndd-menu-bar-item');
		expect(items.length).toBe(2);
	});

	it('renders nav landmark', async () => {
		el = await fixture('<ndd-menu-bar accessible-label="Hoofdnavigatie"></ndd-menu-bar>');
		await waitForUpdate(el);
		const nav = el.shadowRoot!.querySelector('nav');
		expect(nav).not.toBeNull();
		expect(nav!.getAttribute('aria-label')).toBe('Hoofdnavigatie');
	});

	it('renders nav without aria-label when accessible-label is empty', async () => {
		el = await fixture('<ndd-menu-bar></ndd-menu-bar>');
		await waitForUpdate(el);
		const nav = el.shadowRoot!.querySelector('nav');
		expect(nav).not.toBeNull();
		expect(nav!.hasAttribute('aria-label')).toBe(false);
	});

	it('renders overflow button in shadow DOM', async () => {
		el = await fixture('<ndd-menu-bar></ndd-menu-bar>');
		await waitForUpdate(el);
		const overflowButton = el.shadowRoot!.querySelector('.menu-bar__overflow-button');
		expect(overflowButton).not.toBeNull();
	});

	it('uses default Dutch translation for overflow text', async () => {
		el = await fixture('<ndd-menu-bar></ndd-menu-bar>');
		await waitForUpdate(el);
		const overflowItem = el.shadowRoot!.querySelector('.menu-bar__overflow-button ndd-menu-bar-item');
		expect(overflowItem!.getAttribute('text')).toBe('Meer opties');
	});

	it('accepts custom overflow-text attribute', async () => {
		el = await fixture('<ndd-menu-bar overflow-text="More"></ndd-menu-bar>');
		await waitForUpdate(el);
		const overflowItem = el.shadowRoot!.querySelector('.menu-bar__overflow-button ndd-menu-bar-item');
		expect(overflowItem!.getAttribute('text')).toBe('More');
	});

	it('accepts custom translations', async () => {
		el = await fixture('<ndd-menu-bar></ndd-menu-bar>');
		(el as NDDMenuBar).translations = {
			'components.menu-bar.overflow-action': 'More options',
		};
		await waitForUpdate(el);
		const overflowItem = el.shadowRoot!.querySelector('.menu-bar__overflow-button ndd-menu-bar-item');
		expect(overflowItem!.getAttribute('text')).toBe('More options');
	});
});

describe('ndd-menu-bar – compact propagation', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
		document.querySelectorAll('ndd-menu').forEach(m => m.remove());
	});

	it('propagates compact attribute to slotted items', async () => {
		el = await fixture(`
			<ndd-menu-bar compact>
				<ndd-menu-bar-item text="Home"></ndd-menu-bar-item>
				<ndd-menu-bar-item text="About"></ndd-menu-bar-item>
			</ndd-menu-bar>
		`);
		await waitForUpdate(el);
		const items = el.querySelectorAll('ndd-menu-bar-item');
		expect(items[0].hasAttribute('compact')).toBe(true);
		expect(items[1].hasAttribute('compact')).toBe(true);
	});

	it('removes compact attribute from items when compact is removed', async () => {
		el = await fixture(`
			<ndd-menu-bar compact>
				<ndd-menu-bar-item text="Home"></ndd-menu-bar-item>
			</ndd-menu-bar>
		`);
		await waitForUpdate(el);
		expect(el.querySelector('ndd-menu-bar-item')!.hasAttribute('compact')).toBe(true);

		(el as NDDMenuBar).compact = false;
		await waitForUpdate(el);
		expect(el.querySelector('ndd-menu-bar-item')!.hasAttribute('compact')).toBe(false);
	});
});

describe('ndd-menu-bar – overflow detection', () => {
	// TODO: E2E tests nodig — JSDOM mist layout support (offsetWidth, clientWidth).
	it.todo('verbergt items achter overflow button bij smalle breedte');
	it.todo('toont overflow menu bij klik op overflow button');
	it.todo('synchroniseert overflow menu items met verborgen items');
});
