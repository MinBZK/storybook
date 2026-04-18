import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { NLDDTopTitleBar } from './top-title-bar.ts';
import './top-title-bar.ts';


/* ============================================================
   Smoke tests
   ============================================================ */

describe('nldd-top-title-bar', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-top-title-bar></nldd-top-title-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders the title', async () => {
		el = await fixture('<nldd-top-title-bar text="Overzicht"></nldd-top-title-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.top-title-bar__title')?.textContent?.trim()).toBe('Overzicht');
	});

	it('renders the supporting text when set', async () => {
		el = await fixture('<nldd-top-title-bar text="Titel" supporting-text="Subtitel"></nldd-top-title-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.top-title-bar__subtitle')?.textContent?.trim()).toBe('Subtitel');
	});

	it('omits the supporting text when not set', async () => {
		el = await fixture('<nldd-top-title-bar text="Titel"></nldd-top-title-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.top-title-bar__subtitle')).toBeNull();
	});

	it('has is-compact class by default when no collapse-anchor is set', async () => {
		el = await fixture('<nldd-top-title-bar text="Titel"></nldd-top-title-bar>');
		await waitForUpdate(el);
		expect(el.classList.contains('is-compact')).toBe(true);
	});
});


/* ============================================================
   Toolbar slot
   ============================================================ */

describe('nldd-top-title-bar – toolbar slot', () => {
	let el: NLDDTopTitleBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders the toolbar slot', async () => {
		el = await fixture<NLDDTopTitleBar>(`
			<nldd-top-title-bar text="Titel">
				<nldd-button slot="toolbar" text="Actie"></nldd-button>
			</nldd-top-title-bar>
		`);
		await waitForUpdate(el);
		const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="toolbar"]');
		expect(slot).not.toBeNull();
		expect(slot!.assignedElements().length).toBe(1);
	});
});


/* ============================================================
   Back button
   ============================================================ */

describe('nldd-top-title-bar – terugknop', () => {
	let el: NLDDTopTitleBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('hides the back button when back-text is not set', async () => {
		el = await fixture<NLDDTopTitleBar>('<nldd-top-title-bar text="Titel"></nldd-top-title-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.top-title-bar__text-back-button')).toBeNull();
		expect(el.shadowRoot!.querySelector('.top-title-bar__icon-back-button')).toBeNull();
	});

	it('renders both back button variants when back-text is set', async () => {
		el = await fixture<NLDDTopTitleBar>('<nldd-top-title-bar text="Titel" back-text="Overzicht"></nldd-top-title-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.top-title-bar__text-back-button')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('.top-title-bar__icon-back-button')).not.toBeNull();
	});

	it('shows icon back button when is-compact class is set', async () => {
		el = await fixture<NLDDTopTitleBar>('<nldd-top-title-bar text="Titel" back-text="Overzicht"></nldd-top-title-bar>');
		await waitForUpdate(el);
		el.classList.add('is-compact');
		await waitForUpdate(el);
		// CSS hides text back and shows icon back — check accessible-label on icon button
		const iconBtn = el.shadowRoot!.querySelector('.top-title-bar__icon-back-button nldd-icon-button');
		expect(iconBtn!.getAttribute('accessible-label')).toBe('Overzicht');
	});

	it('sets href on back buttons when back-href is set', async () => {
		el = await fixture<NLDDTopTitleBar>('<nldd-top-title-bar text="Titel" back-text="Overzicht" back-href="/overzicht"></nldd-top-title-bar>');
		await waitForUpdate(el);
		const textBtn = el.shadowRoot!.querySelector('.top-title-bar__text-back-button nldd-button');
		const iconBtn = el.shadowRoot!.querySelector('.top-title-bar__icon-back-button nldd-icon-button');
		expect(textBtn!.getAttribute('href')).toBe('/overzicht');
		expect(iconBtn!.getAttribute('href')).toBe('/overzicht');
	});

	it('fires a back event when _handleBack is called without backHref', async () => {
		el = await fixture<NLDDTopTitleBar>('<nldd-top-title-bar text="Titel" back-text="Overzicht"></nldd-top-title-bar>');
		await waitForUpdate(el);
		const listener = vi.fn();
		el.addEventListener('back', listener);
		el._handleBack();
		expect(listener).toHaveBeenCalledOnce();
	});

	it('does not fire a back event when back-href is set', async () => {
		el = await fixture<NLDDTopTitleBar>('<nldd-top-title-bar text="Titel" back-text="Overzicht" back-href="/overzicht"></nldd-top-title-bar>');
		await waitForUpdate(el);
		const listener = vi.fn();
		el.addEventListener('back', listener);
		el._handleBack();
		expect(listener).not.toHaveBeenCalled();
	});
});


/* ============================================================
   Dismiss button
   ============================================================ */

describe('nldd-top-title-bar – sluitknop', () => {
	let el: NLDDTopTitleBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('hides the dismiss button when dismiss-text is not set', async () => {
		el = await fixture<NLDDTopTitleBar>('<nldd-top-title-bar text="Titel"></nldd-top-title-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.top-title-bar__dismiss-button')).toBeNull();
	});

	it('shows the dismiss button when dismiss-text is set', async () => {
		el = await fixture<NLDDTopTitleBar>('<nldd-top-title-bar text="Titel" dismiss-text="Sluit"></nldd-top-title-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.top-title-bar__dismiss-button')).not.toBeNull();
	});

	it('renders the dismiss text', async () => {
		el = await fixture<NLDDTopTitleBar>('<nldd-top-title-bar text="Titel" dismiss-text="Annuleer"></nldd-top-title-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.top-title-bar__dismiss-button nldd-button')?.getAttribute('text')).toBe('Annuleer');
	});

	it('fires a dismiss event when _handleDismiss is called', async () => {
		el = await fixture<NLDDTopTitleBar>('<nldd-top-title-bar text="Titel" dismiss-text="Sluit"></nldd-top-title-bar>');
		await waitForUpdate(el);
		const listener = vi.fn();
		el.addEventListener('dismiss', listener);
		el._handleDismiss();
		expect(listener).toHaveBeenCalledOnce();
	});
});


/* ============================================================
   is-compact class / title anchor
   ============================================================ */

describe('nldd-top-title-bar – is-compact', () => {
	let el: NLDDTopTitleBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('has is-compact by default when no collapse-anchor is set', async () => {
		el = await fixture<NLDDTopTitleBar>('<nldd-top-title-bar text="Titel"></nldd-top-title-bar>');
		await waitForUpdate(el);
		expect(el.classList.contains('is-compact')).toBe(true);
	});

	it('stores the anchor element when collapse-anchor id matches', async () => {
		const container = await fixture<HTMLElement>(`
			<div>
				<nldd-top-title-bar text="Titel" collapse-anchor="heading"></nldd-top-title-bar>
				<h1 id="heading">Titel</h1>
			</div>
		`);
		el = container.querySelector('nldd-top-title-bar')!;
		await waitForUpdate(el);
		expect((el as any)._anchorElement).not.toBeNull();
		cleanup(container);
	});

	it('does not set _anchorElement when id does not match', async () => {
		el = await fixture<NLDDTopTitleBar>('<nldd-top-title-bar text="Titel" collapse-anchor="does-not-exist"></nldd-top-title-bar>');
		await waitForUpdate(el);
		expect((el as any)._anchorElement).toBeNull();
	});

	it('removes scroll listener on disconnect', async () => {
		const container = await fixture<HTMLElement>(`
			<div>
				<nldd-top-title-bar text="Titel" collapse-anchor="heading"></nldd-top-title-bar>
				<h1 id="heading">Titel</h1>
			</div>
		`);
		el = container.querySelector('nldd-top-title-bar')!;
		await waitForUpdate(el);
		const removeSpy = vi.spyOn(window, 'removeEventListener');
		el.remove();
		expect(removeSpy).toHaveBeenCalled();
		removeSpy.mockRestore();
		cleanup(container);
	});
});
