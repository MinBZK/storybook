import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './breadcrumbs.js';

const headJsonLd = () =>
	document.head.querySelector('script[type="application/ld+json"]');

describe('nldd-breadcrumbs', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
		// JSON-LD scripts live in <head>; the component cleans them up on
		// disconnect, but the fixture cleanup may race with the assertions.
		// Sweep any stragglers to keep tests independent.
		document.head.querySelectorAll('script[type="application/ld+json"]').forEach(s => s.remove());
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

	it('emits BreadcrumbList JSON-LD into document.head by default', async () => {
		el = await fixture(`
			<nldd-breadcrumbs>
				<nldd-breadcrumbs-item text="Home" href="/"></nldd-breadcrumbs-item>
				<nldd-breadcrumbs-item text="Section" href="/section/"></nldd-breadcrumbs-item>
				<nldd-breadcrumbs-item text="Here" current></nldd-breadcrumbs-item>
			</nldd-breadcrumbs>
		`);
		await waitForUpdate(el);
		const script = headJsonLd();
		expect(script).not.toBeNull();
		const data = JSON.parse(script!.textContent ?? '{}');
		expect(data['@type']).toBe('BreadcrumbList');
		expect(data.itemListElement).toHaveLength(3);
		// position + name on every entry; item only when href is set.
		expect(data.itemListElement[0]).toEqual({
			'@type': 'ListItem',
			position: 1,
			name: 'Home',
			item: '/',
		});
		expect(data.itemListElement[1]).toEqual({
			'@type': 'ListItem',
			position: 2,
			name: 'Section',
			item: '/section/',
		});
		// Current item: no href → no `item` field.
		expect(data.itemListElement[2]).toEqual({
			'@type': 'ListItem',
			position: 3,
			name: 'Here',
		});
	});

	it('omits JSON-LD when no-seo is set', async () => {
		el = await fixture(`
			<nldd-breadcrumbs no-seo>
				<nldd-breadcrumbs-item text="Home" href="/"></nldd-breadcrumbs-item>
			</nldd-breadcrumbs>
		`);
		await waitForUpdate(el);
		expect(headJsonLd()).toBeNull();
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

	it('renders plain text with aria-current when current is set', async () => {
		el = await fixture('<nldd-breadcrumbs-item current text="Here" href="/here/"></nldd-breadcrumbs-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')).toBeNull();
		const span = el.shadowRoot!.querySelector('.breadcrumbs__item');
		expect(span?.getAttribute('aria-current')).toBe('page');
	});

	it('renders a chevron-right separator after every item', async () => {
		el = await fixture('<nldd-breadcrumbs-item text="Home" href="/"></nldd-breadcrumbs-item>');
		await waitForUpdate(el);
		const sep = el.shadowRoot!.querySelector('.breadcrumbs__separator');
		expect(sep).not.toBeNull();
		expect(sep?.querySelector('nldd-icon')?.getAttribute('name')).toBe('chevron-right-small');
	});
});
