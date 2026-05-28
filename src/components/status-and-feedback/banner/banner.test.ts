import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import type { NLDDBanner } from './banner.js';
import './banner.js';

describe('nldd-banner', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('rendert zonder fouten', async () => {
		el = await fixture('<nldd-banner></nldd-banner>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults to variant="neutral"', async () => {
		el = await fixture('<nldd-banner></nldd-banner>');
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('neutral');
	});

	it('renders text and supporting-text', async () => {
		el = await fixture('<nldd-banner text="Titel" supporting-text="Toelichting"></nldd-banner>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.banner__text')!.textContent).toBe('Titel');
		expect(el.shadowRoot!.querySelector('.banner__supporting-text')!.textContent).toBe('Toelichting');
	});

	it('renders text as h2 when heading-level=2', async () => {
		el = await fixture('<nldd-banner text="Titel" heading-level="2"></nldd-banner>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('h2.banner__text')).not.toBeNull();
	});

	it('renders text as p when heading-level is absent', async () => {
		el = await fixture('<nldd-banner text="Titel"></nldd-banner>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('p.banner__text')).not.toBeNull();
	});


	/* ============================================================
	   Variants & icons
	   ============================================================ */

	it.each([
		['neutral', 'info-circle-filled'],
		['success', 'check-circle-filled'],
		['warning', 'exclamation-triangle-filled'],
		['critical', 'exclamation-circle-filled'],
	])('variant="%s" uses default icon "%s"', async (variant, expectedIcon) => {
		el = await fixture(`<nldd-banner variant="${variant}"></nldd-banner>`);
		await waitForUpdate(el);
		const icon = el.shadowRoot!.querySelector('.banner__icon');
		expect(icon!.getAttribute('name')).toBe(expectedIcon);
	});

	it('icon attribute overrides the default', async () => {
		el = await fixture('<nldd-banner variant="success" icon="star"></nldd-banner>');
		await waitForUpdate(el);
		const icon = el.shadowRoot!.querySelector('.banner__icon');
		expect(icon!.getAttribute('name')).toBe('star');
	});


	/* ============================================================
	   ARIA semantics
	   ============================================================ */

	it('non-critical variants get role="status" and aria-live="polite"', async () => {
		for (const v of ['neutral', 'success', 'warning'] as const) {
			const wrapper = document.createElement('div');
			wrapper.innerHTML = `<nldd-banner variant="${v}"></nldd-banner>`;
			document.body.appendChild(wrapper);
			const banner = wrapper.firstElementChild as HTMLElement & { updateComplete: Promise<boolean> };
			await banner.updateComplete;
			expect(banner.getAttribute('role')).toBe('status');
			expect(banner.getAttribute('aria-live')).toBe('polite');
			wrapper.remove();
		}
	});

	it('critical variant gets role="alert" without aria-live', async () => {
		el = await fixture('<nldd-banner variant="critical"></nldd-banner>');
		await waitForUpdate(el);
		expect(el.getAttribute('role')).toBe('alert');
		expect(el.hasAttribute('aria-live')).toBe(false);
	});

	it('switches role/aria-live when variant changes', async () => {
		el = await fixture<NLDDBanner>('<nldd-banner variant="success"></nldd-banner>');
		await waitForUpdate(el);
		expect(el.getAttribute('role')).toBe('status');
		(el as unknown as NLDDBanner).variant = 'critical';
		await waitForUpdate(el);
		expect(el.getAttribute('role')).toBe('alert');
		expect(el.hasAttribute('aria-live')).toBe(false);
	});

	it('always sets aria-atomic="true" so live-region updates announce the whole banner', async () => {
		el = await fixture('<nldd-banner variant="success"></nldd-banner>');
		await waitForUpdate(el);
		expect(el.getAttribute('aria-atomic')).toBe('true');
		(el as unknown as NLDDBanner).variant = 'critical';
		await waitForUpdate(el);
		expect(el.getAttribute('aria-atomic')).toBe('true');
	});


	/* ============================================================
	   Dismissible
	   ============================================================ */

	it('does not render a dismiss button by default', async () => {
		el = await fixture('<nldd-banner></nldd-banner>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.banner__dismiss-button')).toBeNull();
	});

	it('renders a dismiss button when dismissible is set', async () => {
		el = await fixture('<nldd-banner dismissible></nldd-banner>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.banner__dismiss-button nldd-icon-button')).not.toBeNull();
	});

	it('fires a dismiss event when the dismiss button is clicked', async () => {
		el = await fixture('<nldd-banner dismissible></nldd-banner>');
		await waitForUpdate(el);
		let fired = false;
		el.addEventListener('dismiss', () => { fired = true; });
		const btn = el.shadowRoot!.querySelector<HTMLElement>('.banner__dismiss-button nldd-icon-button')!;
		btn.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
		expect(fired).toBe(true);
	});
});
