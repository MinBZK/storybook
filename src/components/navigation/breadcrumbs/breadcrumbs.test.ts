import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './breadcrumbs.js';

describe('nldd-breadcrumbs', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders a nav landmark with the default aria-label', async () => {
		el = await fixture(`
			<nldd-breadcrumbs>
				<nldd-breadcrumbs-item text="Home" href="/"></nldd-breadcrumbs-item>
				<nldd-breadcrumbs-item text="Here" current></nldd-breadcrumbs-item>
			</nldd-breadcrumbs>
		`);
		await waitForUpdate(el);
		const nav = el.shadowRoot!.querySelector('nav');
		expect(nav).not.toBeNull();
		expect(nav!.getAttribute('aria-label')).toBe('Kruimelpad');
	});

	it('toggles has-parent when a non-current href item is slotted', async () => {
		el = await fixture(`
			<nldd-breadcrumbs>
				<nldd-breadcrumbs-item text="Home" href="/"></nldd-breadcrumbs-item>
				<nldd-breadcrumbs-item text="Here" current></nldd-breadcrumbs-item>
			</nldd-breadcrumbs>
		`);
		await waitForUpdate(el);
		expect(el.hasAttribute('has-parent')).toBe(true);
	});

	it('does not set has-parent when no eligible parent exists', async () => {
		el = await fixture(`
			<nldd-breadcrumbs>
				<nldd-breadcrumbs-item text="Here" current></nldd-breadcrumbs-item>
			</nldd-breadcrumbs>
		`);
		await waitForUpdate(el);
		expect(el.hasAttribute('has-parent')).toBe(false);
	});

	it('does not set has-parent when the only non-current item has no href', async () => {
		el = await fixture(`
			<nldd-breadcrumbs>
				<nldd-breadcrumbs-item text="Section"></nldd-breadcrumbs-item>
				<nldd-breadcrumbs-item text="Here" current></nldd-breadcrumbs-item>
			</nldd-breadcrumbs>
		`);
		await waitForUpdate(el);
		expect(el.hasAttribute('has-parent')).toBe(false);
	});

	it('uses the parent item text in the level-up link', async () => {
		el = await fixture(`
			<nldd-breadcrumbs>
				<nldd-breadcrumbs-item text="Documentation" href="/docs/"></nldd-breadcrumbs-item>
				<nldd-breadcrumbs-item text="Here" current></nldd-breadcrumbs-item>
			</nldd-breadcrumbs>
		`);
		await waitForUpdate(el);
		const levelUpText = el.shadowRoot!.querySelector('.breadcrumbs__level-up-text');
		expect(levelUpText?.textContent?.trim()).toBe('Documentation');
	});

	it('falls back to the slotted textContent when parent has no text attribute', async () => {
		el = await fixture(`
			<nldd-breadcrumbs>
				<nldd-breadcrumbs-item href="/docs/">Slotted parent</nldd-breadcrumbs-item>
				<nldd-breadcrumbs-item text="Here" current></nldd-breadcrumbs-item>
			</nldd-breadcrumbs>
		`);
		await waitForUpdate(el);
		const levelUpText = el.shadowRoot!.querySelector('.breadcrumbs__level-up-text');
		expect(levelUpText?.textContent?.trim()).toBe('Slotted parent');
	});

	it('does not render the level-up link when there is no parent', async () => {
		el = await fixture(`
			<nldd-breadcrumbs>
				<nldd-breadcrumbs-item text="Here" current></nldd-breadcrumbs-item>
			</nldd-breadcrumbs>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.breadcrumbs__level-up')).toBeNull();
	});

	it('falls back to the i18n level-up label when the parent has no text', async () => {
		el = await fixture(`
			<nldd-breadcrumbs>
				<nldd-breadcrumbs-item href="/"></nldd-breadcrumbs-item>
				<nldd-breadcrumbs-item text="Here" current></nldd-breadcrumbs-item>
			</nldd-breadcrumbs>
		`);
		await waitForUpdate(el);
		const levelUpText = el.shadowRoot!.querySelector('.breadcrumbs__level-up-text');
		expect(levelUpText?.textContent?.trim()).toBe('Eén niveau omhoog');
	});

	it('re-evaluates has-parent when an item href mutates after render', async () => {
		el = await fixture(`
			<nldd-breadcrumbs>
				<nldd-breadcrumbs-item text="Section"></nldd-breadcrumbs-item>
				<nldd-breadcrumbs-item text="Here" current></nldd-breadcrumbs-item>
			</nldd-breadcrumbs>
		`);
		await waitForUpdate(el);
		expect(el.hasAttribute('has-parent')).toBe(false);
		el.querySelector('nldd-breadcrumbs-item')!.setAttribute('href', '/section');
		// waitForUpdate already covers the MO microtask + Lit re-render cycle.
		await waitForUpdate(el);
		expect(el.hasAttribute('has-parent')).toBe(true);
		expect(el.shadowRoot!.querySelector('.breadcrumbs__level-up')).not.toBeNull();
	});
});

describe('nldd-breadcrumbs-item', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-breadcrumbs-item text="Home"></nldd-breadcrumbs-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('sets role="listitem" on the host', async () => {
		el = await fixture('<nldd-breadcrumbs-item text="Home"></nldd-breadcrumbs-item>');
		await waitForUpdate(el);
		expect(el.getAttribute('role')).toBe('listitem');
	});

	it('does not overwrite a consumer-provided role', async () => {
		el = await fixture('<nldd-breadcrumbs-item role="treeitem" text="Home"></nldd-breadcrumbs-item>');
		await waitForUpdate(el);
		expect(el.getAttribute('role')).toBe('treeitem');
	});

	it('renders as a link when href is set', async () => {
		el = await fixture('<nldd-breadcrumbs-item href="/docs/" text="Docs"></nldd-breadcrumbs-item>');
		await waitForUpdate(el);
		const a = el.shadowRoot!.querySelector('a');
		expect(a).not.toBeNull();
		expect(a!.getAttribute('href')).toBe('/docs/');
	});

	it('renders plain text and sets aria-current on the host when current', async () => {
		el = await fixture('<nldd-breadcrumbs-item current text="Here" href="/here/"></nldd-breadcrumbs-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')).toBeNull();
		expect(el.getAttribute('aria-current')).toBe('page');
	});

	it('clears aria-current when current is toggled off', async () => {
		el = await fixture('<nldd-breadcrumbs-item current text="Here"></nldd-breadcrumbs-item>');
		await waitForUpdate(el);
		expect(el.getAttribute('aria-current')).toBe('page');
		el.removeAttribute('current');
		await waitForUpdate(el);
		expect(el.hasAttribute('aria-current')).toBe(false);
	});

	it('renders a chevron-right separator after every item', async () => {
		el = await fixture('<nldd-breadcrumbs-item text="Home" href="/"></nldd-breadcrumbs-item>');
		await waitForUpdate(el);
		const sep = el.shadowRoot!.querySelector('.breadcrumbs__separator');
		expect(sep).not.toBeNull();
		expect(sep?.querySelector('nldd-icon')?.getAttribute('name')).toBe('chevron-right-small');
	});
});
