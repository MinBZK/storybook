import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import type { NLDDMenuBar } from './menu-bar.js';
import './menu-bar.js';

describe('nldd-menu-bar', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
		document.querySelectorAll('nldd-menu').forEach(m => m.remove());
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-menu-bar></nldd-menu-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
		expect(el).toBeInstanceOf(customElements.get('nldd-menu-bar'));
	});

	it('renders slotted menu-bar-items', async () => {
		el = await fixture(`
			<nldd-menu-bar>
				<nldd-menu-bar-item text="Home"></nldd-menu-bar-item>
				<nldd-menu-bar-item text="About"></nldd-menu-bar-item>
			</nldd-menu-bar>
		`);
		await waitForUpdate(el);
		const items = el.querySelectorAll('nldd-menu-bar-item');
		expect(items.length).toBe(2);
	});

	it('renders nav landmark', async () => {
		el = await fixture('<nldd-menu-bar accessible-label="Hoofdnavigatie"></nldd-menu-bar>');
		await waitForUpdate(el);
		const nav = el.shadowRoot!.querySelector('nav');
		expect(nav).not.toBeNull();
		expect(nav!.getAttribute('aria-label')).toBe('Hoofdnavigatie');
	});

	it('renders nav without aria-label when accessible-label is empty', async () => {
		el = await fixture('<nldd-menu-bar></nldd-menu-bar>');
		await waitForUpdate(el);
		const nav = el.shadowRoot!.querySelector('nav');
		expect(nav).not.toBeNull();
		expect(nav!.hasAttribute('aria-label')).toBe(false);
	});

	it('renders overflow button in shadow DOM', async () => {
		el = await fixture('<nldd-menu-bar></nldd-menu-bar>');
		await waitForUpdate(el);
		const overflowButton = el.shadowRoot!.querySelector('.menu-bar__overflow-button');
		expect(overflowButton).not.toBeNull();
	});

	it('uses default Dutch translation for overflow text', async () => {
		el = await fixture('<nldd-menu-bar></nldd-menu-bar>');
		await waitForUpdate(el);
		const overflowItem = el.shadowRoot!.querySelector('.menu-bar__overflow-button nldd-menu-bar-item');
		expect(overflowItem!.getAttribute('text')).toBe('Meer opties');
	});

	it('accepts custom overflow-text attribute', async () => {
		el = await fixture('<nldd-menu-bar overflow-text="More"></nldd-menu-bar>');
		await waitForUpdate(el);
		const overflowItem = el.shadowRoot!.querySelector('.menu-bar__overflow-button nldd-menu-bar-item');
		expect(overflowItem!.getAttribute('text')).toBe('More');
	});

	it('accepts custom translations', async () => {
		el = await fixture('<nldd-menu-bar></nldd-menu-bar>');
		(el as NLDDMenuBar).translations = {
			'components.menu-bar.overflow-action': 'More options',
		};
		await waitForUpdate(el);
		const overflowItem = el.shadowRoot!.querySelector('.menu-bar__overflow-button nldd-menu-bar-item');
		expect(overflowItem!.getAttribute('text')).toBe('More options');
	});
});

describe('nldd-menu-bar – compact propagation', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
		document.querySelectorAll('nldd-menu').forEach(m => m.remove());
	});

	it('propagates compact attribute to slotted items', async () => {
		el = await fixture(`
			<nldd-menu-bar compact>
				<nldd-menu-bar-item text="Home"></nldd-menu-bar-item>
				<nldd-menu-bar-item text="About"></nldd-menu-bar-item>
			</nldd-menu-bar>
		`);
		await waitForUpdate(el);
		const items = el.querySelectorAll('nldd-menu-bar-item');
		expect(items[0].hasAttribute('compact')).toBe(true);
		expect(items[1].hasAttribute('compact')).toBe(true);
	});

	it('removes compact attribute from items when compact is removed', async () => {
		el = await fixture(`
			<nldd-menu-bar compact>
				<nldd-menu-bar-item text="Home"></nldd-menu-bar-item>
			</nldd-menu-bar>
		`);
		await waitForUpdate(el);
		expect(el.querySelector('nldd-menu-bar-item')!.hasAttribute('compact')).toBe(true);

		(el as NLDDMenuBar).compact = false;
		await waitForUpdate(el);
		expect(el.querySelector('nldd-menu-bar-item')!.hasAttribute('compact')).toBe(false);
	});
});

describe('nldd-menu-bar – overflow detection', () => {
	// Visual regression via Storybook stories: Menu Bar > NarrowContainer, ManyItems.
	// Zie ook Top Navigation Bar > ManyGlobalItems en SmallViewport.
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
		document.querySelectorAll('nldd-menu').forEach(m => m.remove());
		vi.restoreAllMocks();
	});

	it('hides items that overflow and shows overflow button', async () => {
		el = await fixture(`
			<nldd-menu-bar>
				<nldd-menu-bar-item text="Home"></nldd-menu-bar-item>
				<nldd-menu-bar-item text="About"></nldd-menu-bar-item>
				<nldd-menu-bar-item text="Contact"></nldd-menu-bar-item>
			</nldd-menu-bar>
		`);
		await waitForUpdate(el);

		// Mock layout: container 200px, each item 100px, overflow button 44px
		vi.spyOn(el, 'clientWidth', 'get').mockReturnValue(200);
		const items = el.querySelectorAll('nldd-menu-bar-item');
		items.forEach(item => {
			vi.spyOn(item, 'offsetWidth', 'get').mockReturnValue(100);
		});
		const overflowButton = el.shadowRoot!.querySelector('.menu-bar__overflow-button') as HTMLElement;
		vi.spyOn(overflowButton, 'offsetWidth', 'get').mockReturnValue(44);

		// Call _updateOverflow directly to bypass RAF timing
		(el as any)._updateOverflow();

		// First item fits (100 < 200-44=156), second doesn't (200 > 156)
		expect(items[0].style.display).not.toBe('none');
		expect(items[1].hasAttribute('data-overflow')).toBe(true);
		expect(items[2].hasAttribute('data-overflow')).toBe(true);
		expect(overflowButton.style.display).toBe('inline-block');
	});

	it('hides all items when none fit', async () => {
		el = await fixture(`
			<nldd-menu-bar>
				<nldd-menu-bar-item text="Home"></nldd-menu-bar-item>
				<nldd-menu-bar-item text="About"></nldd-menu-bar-item>
			</nldd-menu-bar>
		`);
		await waitForUpdate(el);

		// Mock layout: container 80px, each item 100px, overflow button 44px
		// Available: 80 - 44 = 36px, first item (100px) doesn't fit
		vi.spyOn(el, 'clientWidth', 'get').mockReturnValue(80);
		const items = el.querySelectorAll('nldd-menu-bar-item');
		items.forEach(item => {
			vi.spyOn(item, 'offsetWidth', 'get').mockReturnValue(100);
		});
		const overflowButton = el.shadowRoot!.querySelector('.menu-bar__overflow-button') as HTMLElement;
		vi.spyOn(overflowButton, 'offsetWidth', 'get').mockReturnValue(44);

		(el as any)._updateOverflow();

		expect(items[0].hasAttribute('data-overflow')).toBe(true);
		expect(items[1].hasAttribute('data-overflow')).toBe(true);
		expect(overflowButton.style.display).toBe('inline-block');
	});

	it('hides overflow button when all items fit', async () => {
		el = await fixture(`
			<nldd-menu-bar>
				<nldd-menu-bar-item text="Home"></nldd-menu-bar-item>
				<nldd-menu-bar-item text="About"></nldd-menu-bar-item>
			</nldd-menu-bar>
		`);
		await waitForUpdate(el);

		// Mock layout: container 500px, each item 100px, overflow button 44px
		vi.spyOn(el, 'clientWidth', 'get').mockReturnValue(500);
		const items = el.querySelectorAll('nldd-menu-bar-item');
		items.forEach(item => {
			vi.spyOn(item, 'offsetWidth', 'get').mockReturnValue(100);
		});
		const overflowButton = el.shadowRoot!.querySelector('.menu-bar__overflow-button') as HTMLElement;
		vi.spyOn(overflowButton, 'offsetWidth', 'get').mockReturnValue(44);

		(el as any)._updateOverflow();

		expect(items[0].hasAttribute('data-overflow')).toBe(false);
		expect(items[1].hasAttribute('data-overflow')).toBe(false);
		expect(overflowButton.style.display).toBe('none');
	});
});
