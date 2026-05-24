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

	it('emits BreadcrumbList JSON-LD by default', async () => {
		el = await fixture(`
			<nldd-breadcrumbs>
				<nldd-breadcrumbs-item text="Home" href="/"></nldd-breadcrumbs-item>
				<nldd-breadcrumbs-item text="Here" current></nldd-breadcrumbs-item>
			</nldd-breadcrumbs>
		`);
		await waitForUpdate(el);
		const script = el.shadowRoot!.querySelector('script[type="application/ld+json"]');
		expect(script).not.toBeNull();
		const data = JSON.parse(script!.textContent ?? '{}');
		expect(data['@type']).toBe('BreadcrumbList');
		expect(data.itemListElement).toHaveLength(2);
	});

	it('omits JSON-LD when no-seo is set', async () => {
		el = await fixture(`
			<nldd-breadcrumbs no-seo>
				<nldd-breadcrumbs-item text="Home" href="/"></nldd-breadcrumbs-item>
			</nldd-breadcrumbs>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('script[type="application/ld+json"]')).toBeNull();
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
