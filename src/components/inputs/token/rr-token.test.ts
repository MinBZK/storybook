import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRToken } from './rr-token.ts';
import './rr-token.ts';


/* ============================================================
   Rendering
   ============================================================ */

describe('rr-token', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-token></rr-token>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a div for control=none', async () => {
		el = await fixture('<rr-token>Label</rr-token>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('div.token')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('button.token')).toBeNull();
	});

	it('renders a div for control=dismiss', async () => {
		el = await fixture('<rr-token control="dismiss">Label</rr-token>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('div.token')).not.toBeNull();
	});

	it('renders a button for control=menu', async () => {
		el = await fixture('<rr-token control="menu">Label</rr-token>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('button.token')).not.toBeNull();
	});

	it('renders a dismiss button for control=dismiss', async () => {
		el = await fixture('<rr-token control="dismiss">Label</rr-token>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.token__dismiss')).not.toBeNull();
	});

	it('does not render a dismiss button for control=none', async () => {
		el = await fixture('<rr-token>Label</rr-token>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.token__dismiss')).toBeNull();
	});
});


/* ============================================================
   State
   ============================================================ */

describe('rr-token – state', () => {
	let el: RRToken;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('open is false by default', async () => {
		el = await fixture<RRToken>('<rr-token control="menu">Label</rr-token>');
		await waitForUpdate(el);
		expect(el.open).toBe(false);
	});

	it('open reflects as attribute', async () => {
		el = await fixture<RRToken>('<rr-token control="menu" open>Label</rr-token>');
		await waitForUpdate(el);
		expect(el.hasAttribute('open')).toBe(true);
	});

	it('menu button has aria-expanded=false when not open', async () => {
		el = await fixture<RRToken>('<rr-token control="menu">Label</rr-token>');
		await waitForUpdate(el);
		const button = el.shadowRoot!.querySelector('button.token')!;
		expect(button.getAttribute('aria-expanded')).toBe('false');
	});

	it('menu button has aria-expanded=true when open', async () => {
		el = await fixture<RRToken>('<rr-token control="menu" open>Label</rr-token>');
		await waitForUpdate(el);
		const button = el.shadowRoot!.querySelector('button.token')!;
		expect(button.getAttribute('aria-expanded')).toBe('true');
	});

	it('disabled reflects as attribute', async () => {
		el = await fixture<RRToken>('<rr-token disabled>Label</rr-token>');
		await waitForUpdate(el);
		expect(el.hasAttribute('disabled')).toBe(true);
	});

	it('renders caret icon for control=menu', async () => {
		el = await fixture('<rr-token control="menu">Label</rr-token>');
		await waitForUpdate(el);
		const icon = el.shadowRoot!.querySelector('.token__icon');
		expect(icon).not.toBeNull();
		expect(icon!.getAttribute('name')).toBe('chevron-down-small');
	});

	it('dismiss rr-icon-button is disabled when token is disabled', async () => {
		el = await fixture<RRToken>('<rr-token control="dismiss" disabled>Label</rr-token>');
		await waitForUpdate(el);
		const dismiss = el.shadowRoot!.querySelector<HTMLElement>('.token__dismiss')!;
		expect(dismiss.hasAttribute('disabled')).toBe(true);
	});

	it('menu button is disabled when token is disabled', async () => {
		el = await fixture<RRToken>('<rr-token control="menu" disabled>Label</rr-token>');
		await waitForUpdate(el);
		const button = el.shadowRoot!.querySelector<HTMLButtonElement>('button.token')!;
		expect(button.disabled).toBe(true);
	});
});


/* ============================================================
   Dismiss
   ============================================================ */

describe('rr-token – dismiss', () => {
	let el: RRToken;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('clicking dismiss dispatches dismiss event', async () => {
		el = await fixture<RRToken>('<rr-token control="dismiss">Label</rr-token>');
		await waitForUpdate(el);

		let fired = false;
		el.addEventListener('dismiss', () => { fired = true; });

		el.shadowRoot!.querySelector<HTMLElement>('.token__dismiss')!.click();
		expect(fired).toBe(true);
	});

	it('dismiss does not fire when disabled', async () => {
		el = await fixture<RRToken>('<rr-token control="dismiss" disabled>Label</rr-token>');
		await waitForUpdate(el);

		let fired = false;
		el.addEventListener('dismiss', () => { fired = true; });

		el.shadowRoot!.querySelector<HTMLElement>('.token__dismiss')!.click();
		expect(fired).toBe(false);
	});

	it('dismiss button has default accessible-label', async () => {
		el = await fixture<RRToken>('<rr-token control="dismiss">Label</rr-token>');
		await waitForUpdate(el);
		const dismiss = el.shadowRoot!.querySelector('.token__dismiss')!;
		expect(dismiss.getAttribute('accessible-label')).toBe('Verwijder');
	});

	it('dismiss button uses custom dismiss-label', async () => {
		el = await fixture<RRToken>('<rr-token control="dismiss" dismiss-label="Remove filter">Label</rr-token>');
		await waitForUpdate(el);
		const dismiss = el.shadowRoot!.querySelector('.token__dismiss')!;
		expect(dismiss.getAttribute('accessible-label')).toBe('Remove filter');
	});
});


/* ============================================================
   Menu
   ============================================================ */

describe('rr-token – menu', () => {
	let el: RRToken;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('clicking menu toggles open state', async () => {
		el = await fixture<RRToken>('<rr-token control="menu">Label</rr-token>');
		await waitForUpdate(el);

		el.shadowRoot!.querySelector<HTMLButtonElement>('button.token')!.click();
		await waitForUpdate(el);
		expect(el.open).toBe(true);

		el.shadowRoot!.querySelector<HTMLButtonElement>('button.token')!.click();
		await waitForUpdate(el);
		expect(el.open).toBe(false);
	});

	it('clicking menu dispatches toggle event with open detail', async () => {
		el = await fixture<RRToken>('<rr-token control="menu">Label</rr-token>');
		await waitForUpdate(el);

		let detail: any;
		el.addEventListener('toggle', (e: Event) => { detail = (e as CustomEvent).detail; });

		el.shadowRoot!.querySelector<HTMLButtonElement>('button.token')!.click();
		expect(detail?.open).toBe(true);
	});

	it('menu does not toggle when disabled', async () => {
		el = await fixture<RRToken>('<rr-token control="menu" disabled>Label</rr-token>');
		await waitForUpdate(el);

		el._handleMenuClick();
		await waitForUpdate(el);
		expect(el.open).toBe(false);
	});
});
