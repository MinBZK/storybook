import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import type { NLDDToken } from './token.js';
import './token.js';


/* ============================================================
   Rendering
   ============================================================ */

describe('nldd-token', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-token></nldd-token>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a div for control=none', async () => {
		el = await fixture('<nldd-token>Label</nldd-token>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('div.token')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('button.token')).toBeNull();
	});

	it('renders the text property in the token text', async () => {
		el = await fixture('<nldd-token text="Status: Actief"></nldd-token>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.token__text')!.textContent).toContain('Status: Actief');
	});

	it('renders a div for control=dismiss', async () => {
		el = await fixture('<nldd-token control="dismiss">Label</nldd-token>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('div.token')).not.toBeNull();
	});

	it('renders a div with a menu icon-button for control=menu', async () => {
		el = await fixture('<nldd-token control="menu">Label</nldd-token>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('div.token')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('button.token')).toBeNull();
		expect(el.shadowRoot!.querySelector('.token__menu-action nldd-icon-button')).not.toBeNull();
	});

	it('renders a dismiss action for control=dismiss', async () => {
		el = await fixture('<nldd-token control="dismiss">Label</nldd-token>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.token__dismiss-action')).not.toBeNull();
	});

	it('does not render a dismiss action for control=none', async () => {
		el = await fixture('<nldd-token>Label</nldd-token>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.token__dismiss-action')).toBeNull();
	});
});


/* ============================================================
   State
   ============================================================ */

describe('nldd-token – state', () => {
	let el: NLDDToken;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('open is false by default', async () => {
		el = await fixture<NLDDToken>('<nldd-token control="menu">Label</nldd-token>');
		await waitForUpdate(el);
		expect(el.expanded).toBe(false);
	});

	it('open reflects as attribute', async () => {
		el = await fixture<NLDDToken>('<nldd-token control="menu" expanded>Label</nldd-token>');
		await waitForUpdate(el);
		expect(el.hasAttribute('expanded')).toBe(true);
	});

	it('menu icon-button is not expanded and has popup-type=menu when closed', async () => {
		el = await fixture<NLDDToken>('<nldd-token control="menu">Label</nldd-token>');
		await waitForUpdate(el);
		const button = el.shadowRoot!.querySelector('.token__menu-action nldd-icon-button')!;
		expect(button.hasAttribute('expanded')).toBe(false);
		expect(button.getAttribute('popup-type')).toBe('menu');
	});

	it('menu icon-button is expanded when the menu is open', async () => {
		el = await fixture<NLDDToken>('<nldd-token control="menu" expanded>Label</nldd-token>');
		await waitForUpdate(el);
		const button = el.shadowRoot!.querySelector('.token__menu-action nldd-icon-button')!;
		expect(button.hasAttribute('expanded')).toBe(true);
	});

	it('disabled reflects as attribute', async () => {
		el = await fixture<NLDDToken>('<nldd-token disabled>Label</nldd-token>');
		await waitForUpdate(el);
		expect(el.hasAttribute('disabled')).toBe(true);
	});

	it('menu icon-button uses the chevron icon', async () => {
		el = await fixture('<nldd-token control="menu">Label</nldd-token>');
		await waitForUpdate(el);
		const button = el.shadowRoot!.querySelector('.token__menu-action nldd-icon-button')!;
		expect(button.getAttribute('icon')).toBe('chevron-down-small');
	});

	it('dismiss nldd-icon-button is disabled when token is disabled', async () => {
		el = await fixture<NLDDToken>('<nldd-token control="dismiss" disabled>Label</nldd-token>');
		await waitForUpdate(el);
		const dismiss = el.shadowRoot!.querySelector<HTMLElement>('.token__dismiss-action nldd-icon-button')!;
		expect(dismiss.hasAttribute('disabled')).toBe(true);
	});

	it('menu icon-button is disabled when token is disabled', async () => {
		el = await fixture<NLDDToken>('<nldd-token control="menu" disabled>Label</nldd-token>');
		await waitForUpdate(el);
		const button = el.shadowRoot!.querySelector('.token__menu-action nldd-icon-button')!;
		expect(button.hasAttribute('disabled')).toBe(true);
	});
});


/* ============================================================
   Dismiss
   ============================================================ */

describe('nldd-token – dismiss', () => {
	let el: NLDDToken;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('clicking dismiss dispatches dismiss event', async () => {
		el = await fixture<NLDDToken>('<nldd-token control="dismiss">Label</nldd-token>');
		await waitForUpdate(el);

		let fired = false;
		el.addEventListener('dismiss', () => { fired = true; });

		el.shadowRoot!.querySelector<HTMLElement>('.token__dismiss-action nldd-icon-button')!.click();
		expect(fired).toBe(true);
	});

	it('dismiss does not fire when disabled', async () => {
		el = await fixture<NLDDToken>('<nldd-token control="dismiss" disabled>Label</nldd-token>');
		await waitForUpdate(el);

		let fired = false;
		el.addEventListener('dismiss', () => { fired = true; });

		el.shadowRoot!.querySelector<HTMLElement>('.token__dismiss-action nldd-icon-button')!.click();
		expect(fired).toBe(false);
	});

	it('dismiss button has default accessible-label', async () => {
		el = await fixture<NLDDToken>('<nldd-token control="dismiss">Label</nldd-token>');
		await waitForUpdate(el);
		const dismiss = el.shadowRoot!.querySelector('.token__dismiss-action nldd-icon-button')!;
		expect(dismiss.getAttribute('accessible-label')).toBe('Verwijder');
	});

	it('dismiss button uses custom dismiss-text', async () => {
		el = await fixture<NLDDToken>('<nldd-token control="dismiss" dismiss-text="Remove filter">Label</nldd-token>');
		await waitForUpdate(el);
		const dismiss = el.shadowRoot!.querySelector('.token__dismiss-action nldd-icon-button')!;
		expect(dismiss.getAttribute('accessible-label')).toBe('Remove filter');
	});
});


/* ============================================================
   Menu
   ============================================================ */

describe('nldd-token – menu', () => {
	let el: NLDDToken;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('clicking menu toggles open state', async () => {
		el = await fixture<NLDDToken>('<nldd-token control="menu">Label</nldd-token>');
		await waitForUpdate(el);

		el.shadowRoot!.querySelector<HTMLElement>('.token__menu-action nldd-icon-button')!.click();
		await waitForUpdate(el);
		expect(el.expanded).toBe(true);

		el.shadowRoot!.querySelector<HTMLElement>('.token__menu-action nldd-icon-button')!.click();
		await waitForUpdate(el);
		expect(el.expanded).toBe(false);
	});

	it('clicking menu dispatches toggle event with open detail', async () => {
		el = await fixture<NLDDToken>('<nldd-token control="menu">Label</nldd-token>');
		await waitForUpdate(el);

		let detail: any;
		el.addEventListener('toggle', (e: Event) => { detail = (e as CustomEvent).detail; });

		el.shadowRoot!.querySelector<HTMLElement>('.token__menu-action nldd-icon-button')!.click();
		expect(detail?.expanded).toBe(true);
	});

	it('menu does not toggle when disabled', async () => {
		el = await fixture<NLDDToken>('<nldd-token control="menu" disabled>Label</nldd-token>');
		await waitForUpdate(el);

		el._handleMenuClick();
		await waitForUpdate(el);
		expect(el.expanded).toBe(false);
	});
});
