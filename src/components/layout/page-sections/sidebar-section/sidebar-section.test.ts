import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.js';
import './sidebar-section.js';
import type { NLDDSidebarSection } from './sidebar-section.js';

describe('nldd-sidebar-section', () => {
	let el: NLDDSidebarSection;

	afterEach(() => {
		if (el) cleanup(el);
	});

	const make = async (attrs = ''): Promise<NLDDSidebarSection> => {
		el = await fixture<NLDDSidebarSection>(`
			<nldd-sidebar-section ${attrs}>
				<p>Hoofdinhoud</p>
				<div slot="sidebar">Zijbalk-inhoud</div>
			</nldd-sidebar-section>
		`);
		await waitForUpdate(el);
		return el;
	};

	const raf = (): Promise<void> => new Promise(r => requestAnimationFrame(() => r()));

	// Drive the ResizeObserver by setting the host's own width, then wait for the
	// collapsed state to settle (collapses below 1008px, expands at/above).
	const setWidth = async (px: number, expectCollapsed = px < 1008): Promise<void> => {
		el.style.width = `${px}px`;
		for (let i = 0; i < 40 && el.collapsed !== expectCollapsed; i++) await raf();
		await el.updateComplete;
	};

	const dialog = () =>
		el.shadowRoot!.querySelector('.sidebar-section__sheet')!.shadowRoot!.querySelector('dialog');

	it('renders without error', async () => {
		await make();
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders the main slot content', async () => {
		await make();
		const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('.sidebar-section__main > slot:not([name])');
		expect(slot!.assignedElements().length).toBe(1);
	});

	it('not collapsed (lg): the sidebar is a sticky box and the sheet holds no slot', async () => {
		await make();
		await setWidth(1200);
		const box = el.shadowRoot!.querySelector<HTMLSlotElement>('.sidebar-section__sidebar-box > slot[name="sidebar"]');
		expect(box).not.toBeNull();
		expect(box!.assignedElements().length).toBe(1);
		expect(el.shadowRoot!.querySelector('.sidebar-section__sheet slot[name="sidebar"]')).toBeNull();
		expect(el.hasAttribute('collapsed')).toBe(false);
	});

	it('collapsed (sm/md): the sidebar moves into the sheet and reflects [collapsed]', async () => {
		await make();
		await setWidth(500);
		expect(el.shadowRoot!.querySelector('.sidebar-section__sidebar-box')).toBeNull();
		expect(el.hasAttribute('collapsed')).toBe(true);
		const sheetSlot = el.shadowRoot!.querySelector<HTMLSlotElement>('.sidebar-section__sheet slot[name="sidebar"]');
		expect(sheetSlot!.assignedElements().length).toBe(1);
	});

	it('collapsed: renders a default title bar with the sidebar-label and a Sluit button', async () => {
		await make();
		await setWidth(500);
		const bar = el.shadowRoot!.querySelector('nldd-top-title-bar');
		expect(bar).not.toBeNull();
		expect(bar!.getAttribute('text')).toBe('Zijbalk');
		expect(bar!.getAttribute('dismiss-text')).toBe('Sluit');
	});

	it('collapsed: the default title bar uses the overridden sidebar-label', async () => {
		await make('sidebar-label="Filters"');
		await setWidth(500);
		expect(el.shadowRoot!.querySelector('nldd-top-title-bar')!.getAttribute('text')).toBe('Filters');
	});

	it('not collapsed (lg): no sheet title bar is rendered', async () => {
		await make();
		await setWidth(1200);
		expect(el.shadowRoot!.querySelector('nldd-top-title-bar')).toBeNull();
	});

	it('the sheet-top-title-bar slot overrides the default title bar', async () => {
		el = await fixture<NLDDSidebarSection>(`
			<nldd-sidebar-section>
				<p>Hoofdinhoud</p>
				<div slot="sidebar">Zijbalk-inhoud</div>
				<div slot="sheet-top-title-bar" id="custom-bar">Eigen balk</div>
			</nldd-sidebar-section>
		`);
		await waitForUpdate(el);
		await setWidth(500);
		const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="sheet-top-title-bar"]');
		expect(slot).not.toBeNull();
		const assigned = slot!.assignedElements();
		expect(assigned.length).toBe(1);
		expect(assigned[0].id).toBe('custom-bar');
	});

	it('no-collapse: a narrow section stacks the sidebar instead of moving it to the sheet', async () => {
		await make('no-collapse');
		await setWidth(500, false);
		expect(el.collapsed).toBe(false);
		expect(el.shadowRoot!.querySelector('.sidebar-section__sidebar-box')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('nldd-top-title-bar')).toBeNull();
	});

	it('no-collapse toggled at runtime un-collapses a narrow section', async () => {
		await make();
		await setWidth(500);
		expect(el.collapsed).toBe(true);
		el.noCollapse = true;
		for (let i = 0; i < 20 && el.collapsed !== false; i++) await raf();
		expect(el.collapsed).toBe(false);
		expect(el.shadowRoot!.querySelector('.sidebar-section__sidebar-box')).not.toBeNull();
	});

	it('show() opens the sheet when collapsed', async () => {
		await make();
		await setWidth(500);
		el.show();
		await waitForUpdate(el);
		expect(dialog()!.open).toBe(true);
	});

	it('show() is a no-op on lg', async () => {
		await make();
		await setWidth(1200);
		el.show();
		await waitForUpdate(el);
		expect(dialog()!.open).toBe(false);
	});

	it('toggle() opens the sheet when collapsed', async () => {
		await make();
		await setWidth(500);
		el.toggle();
		await waitForUpdate(el);
		expect(dialog()!.open).toBe(true);
	});

	it('sidebar-label defaults to the i18n value', async () => {
		await make();
		await setWidth(1200);
		expect(el.shadowRoot!.querySelector('.sidebar-section__sidebar')!.getAttribute('aria-label')).toBe('Zijbalk');
	});

	it('sidebar-label is overridable', async () => {
		await make('sidebar-label="Filters"');
		await setWidth(1200);
		expect(el.shadowRoot!.querySelector('.sidebar-section__sidebar')!.getAttribute('aria-label')).toBe('Filters');
	});

	it('a CSS-length width feeds the body max-width', async () => {
		await make('width="200px"');
		expect(el.style.getPropertyValue('--_max-width')).toBe('200px');
	});

	it('sticky-top / sticky-bottom feed the sticky insets', async () => {
		await make('sticky-top="80px" sticky-bottom="24px"');
		expect(el.style.getPropertyValue('--_sticky-top')).toBe('80px');
		expect(el.style.getPropertyValue('--_sticky-bottom')).toBe('24px');
	});
});
