import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './page-footer.js';

describe('nldd-page-footer', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders a footer landmark with id="page-footer"', async () => {
		el = await fixture('<nldd-page-footer></nldd-page-footer>');
		await waitForUpdate(el);
		const footer = el.shadowRoot!.querySelector('footer');
		expect(footer).not.toBeNull();
		expect(footer!.id).toBe('page-footer');
	});

	it('hides all wrapper slots when no content is provided', async () => {
		el = await fixture('<nldd-page-footer></nldd-page-footer>');
		await waitForUpdate(el);
		const breadcrumbs = el.shadowRoot!.querySelector('.page-footer__breadcrumbs') as HTMLElement;
		const main = el.shadowRoot!.querySelector('.page-footer__main') as HTMLElement;
		const legal = el.shadowRoot!.querySelector('.page-footer__legal-bar') as HTMLElement;
		expect(breadcrumbs.hidden).toBe(true);
		expect(main.hidden).toBe(true);
		expect(legal.hidden).toBe(true);
	});

	it('reveals the breadcrumbs and legal-bar wrappers when their slots have content', async () => {
		el = await fixture(`
			<nldd-page-footer>
				<nldd-page-footer-legal-bar slot="legal-bar">
					<nldd-page-footer-legal-bar-item slot="end" text="Privacy" href="/privacy/"></nldd-page-footer-legal-bar-item>
				</nldd-page-footer-legal-bar>
			</nldd-page-footer>
		`);
		await waitForUpdate(el);
		const legal = el.shadowRoot!.querySelector('.page-footer__legal-bar') as HTMLElement;
		expect(legal.hidden).toBe(false);
	});

	it('hides dividers when only one row is present', async () => {
		el = await fixture(`
			<nldd-page-footer>
				<nldd-page-footer-legal-bar slot="legal-bar">
					<nldd-page-footer-legal-bar-item slot="end" text="Privacy" href="/privacy/"></nldd-page-footer-legal-bar-item>
				</nldd-page-footer-legal-bar>
			</nldd-page-footer>
		`);
		await waitForUpdate(el);
		const dividers = Array.from(el.shadowRoot!.querySelectorAll('.page-footer__divider')) as HTMLElement[];
		expect(dividers.every(d => d.hidden)).toBe(true);
	});
});

describe('nldd-page-footer-legal-bar', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders a nav landmark with the default aria-label', async () => {
		el = await fixture(`
			<nldd-page-footer-legal-bar>
				<nldd-page-footer-legal-bar-item slot="end" text="Privacy" href="/privacy/"></nldd-page-footer-legal-bar-item>
			</nldd-page-footer-legal-bar>
		`);
		await waitForUpdate(el);
		const nav = el.shadowRoot!.querySelector('nav');
		expect(nav).not.toBeNull();
		expect(nav!.getAttribute('aria-label')).toBe('Juridische links');
	});

	it('hides the start wrapper when no start items are slotted', async () => {
		el = await fixture(`
			<nldd-page-footer-legal-bar>
				<nldd-page-footer-legal-bar-item slot="end" text="Privacy" href="/privacy/"></nldd-page-footer-legal-bar-item>
			</nldd-page-footer-legal-bar>
		`);
		await waitForUpdate(el);
		const start = el.shadowRoot!.querySelector('.page-footer__legal-bar-start') as HTMLElement;
		const end = el.shadowRoot!.querySelector('.page-footer__legal-bar-end') as HTMLElement;
		expect(start.hidden).toBe(true);
		expect(end.hidden).toBe(false);
	});
});

describe('nldd-page-footer-legal-bar-item', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders as a link when href is set', async () => {
		el = await fixture('<nldd-page-footer-legal-bar-item href="/privacy/" text="Privacy"></nldd-page-footer-legal-bar-item>');
		await waitForUpdate(el);
		const a = el.shadowRoot!.querySelector('a');
		expect(a).not.toBeNull();
		expect(a!.getAttribute('href')).toBe('/privacy/');
		expect(a!.textContent).toBe('Privacy');
	});

	it('renders plain text when no href is set', async () => {
		el = await fixture('<nldd-page-footer-legal-bar-item text="© 2026"></nldd-page-footer-legal-bar-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')).toBeNull();
		const span = el.shadowRoot!.querySelector('.page-footer__legal-bar-item');
		expect(span?.textContent?.trim()).toBe('© 2026');
	});
});
