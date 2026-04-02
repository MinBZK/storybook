import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { NDDTopTitleBar } from './ndd-top-title-bar.ts';
import './ndd-top-title-bar.ts';

/* ============================================================
   Smoke tests
   ============================================================ */

describe('ndd-top-title-bar', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-top-title-bar></ndd-top-title-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders the title', async () => {
		el = await fixture('<ndd-top-title-bar title="Overzicht"></ndd-top-title-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.top-title-bar__title')?.textContent?.trim()).toBe(
			'Overzicht'
		);
	});

	it('renders the subtitle when set', async () => {
		el = await fixture('<ndd-top-title-bar title="Titel" subtitle="Subtitel"></ndd-top-title-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.top-title-bar__subtitle')?.textContent?.trim()).toBe(
			'Subtitel'
		);
	});

	it('omits the subtitle when not set', async () => {
		el = await fixture('<ndd-top-title-bar title="Titel"></ndd-top-title-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.top-title-bar__subtitle')).toBeNull();
	});

	it('has is-compact class by default when no title-anchor is set', async () => {
		el = await fixture('<ndd-top-title-bar title="Titel"></ndd-top-title-bar>');
		await waitForUpdate(el);
		expect(el.classList.contains('is-compact')).toBe(true);
	});
});

/* ============================================================
   Toolbar slot
   ============================================================ */

describe('ndd-top-title-bar – toolbar slot', () => {
	let el: NDDTopTitleBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders the toolbar slot', async () => {
		el = await fixture<NDDTopTitleBar>(`
			<ndd-top-title-bar title="Titel">
				<ndd-button slot="toolbar" text="Actie"></ndd-button>
			</ndd-top-title-bar>
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

describe('ndd-top-title-bar – terugknop', () => {
	let el: NDDTopTitleBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('hides the back button when back-label is not set', async () => {
		el = await fixture<NDDTopTitleBar>('<ndd-top-title-bar title="Titel"></ndd-top-title-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.top-title-bar__text-back-button')).toBeNull();
		expect(el.shadowRoot!.querySelector('.top-title-bar__icon-back-button')).toBeNull();
	});

	it('renders both back button variants when back-label is set', async () => {
		el = await fixture<NDDTopTitleBar>(
			'<ndd-top-title-bar title="Titel" back-label="Overzicht"></ndd-top-title-bar>'
		);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.top-title-bar__text-back-button')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('.top-title-bar__icon-back-button')).not.toBeNull();
	});

	it('shows icon back button when is-compact class is set', async () => {
		el = await fixture<NDDTopTitleBar>(
			'<ndd-top-title-bar title="Titel" back-label="Overzicht"></ndd-top-title-bar>'
		);
		await waitForUpdate(el);
		el.classList.add('is-compact');
		await waitForUpdate(el);
		// CSS hides text back and shows icon back — check accessible-label on icon button
		const iconBtn = el.shadowRoot!.querySelector(
			'.top-title-bar__icon-back-button ndd-icon-button'
		);
		expect(iconBtn!.getAttribute('accessible-label')).toBe('Overzicht');
	});

	it('sets href on back buttons when back-href is set', async () => {
		el = await fixture<NDDTopTitleBar>(
			'<ndd-top-title-bar title="Titel" back-label="Overzicht" back-href="/overzicht"></ndd-top-title-bar>'
		);
		await waitForUpdate(el);
		const textBtn = el.shadowRoot!.querySelector('.top-title-bar__text-back-button ndd-button');
		const iconBtn = el.shadowRoot!.querySelector(
			'.top-title-bar__icon-back-button ndd-icon-button'
		);
		expect(textBtn!.getAttribute('href')).toBe('/overzicht');
		expect(iconBtn!.getAttribute('href')).toBe('/overzicht');
	});

	it('fires a back event when _handleBack is called without backHref', async () => {
		el = await fixture<NDDTopTitleBar>(
			'<ndd-top-title-bar title="Titel" back-label="Overzicht"></ndd-top-title-bar>'
		);
		await waitForUpdate(el);
		const listener = vi.fn();
		el.addEventListener('back', listener);
		el._handleBack();
		expect(listener).toHaveBeenCalledOnce();
	});

	it('does not fire a back event when back-href is set', async () => {
		el = await fixture<NDDTopTitleBar>(
			'<ndd-top-title-bar title="Titel" back-label="Overzicht" back-href="/overzicht"></ndd-top-title-bar>'
		);
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

describe('ndd-top-title-bar – sluitknop', () => {
	let el: NDDTopTitleBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('hides the dismiss button when dismiss-label is not set', async () => {
		el = await fixture<NDDTopTitleBar>('<ndd-top-title-bar title="Titel"></ndd-top-title-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.top-title-bar__dismiss-button')).toBeNull();
	});

	it('shows the dismiss button when dismiss-label is set', async () => {
		el = await fixture<NDDTopTitleBar>(
			'<ndd-top-title-bar title="Titel" dismiss-label="Sluit"></ndd-top-title-bar>'
		);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.top-title-bar__dismiss-button')).not.toBeNull();
	});

	it('renders the dismiss label text', async () => {
		el = await fixture<NDDTopTitleBar>(
			'<ndd-top-title-bar title="Titel" dismiss-label="Annuleer"></ndd-top-title-bar>'
		);
		await waitForUpdate(el);
		expect(
			el
				.shadowRoot!.querySelector('.top-title-bar__dismiss-button ndd-button')
				?.getAttribute('text')
		).toBe('Annuleer');
	});

	it('fires a dismiss event when _handleDismiss is called', async () => {
		el = await fixture<NDDTopTitleBar>(
			'<ndd-top-title-bar title="Titel" dismiss-label="Sluit"></ndd-top-title-bar>'
		);
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

describe('ndd-top-title-bar – is-compact', () => {
	let el: NDDTopTitleBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('has is-compact by default when no title-anchor is set', async () => {
		el = await fixture<NDDTopTitleBar>('<ndd-top-title-bar title="Titel"></ndd-top-title-bar>');
		await waitForUpdate(el);
		expect(el.classList.contains('is-compact')).toBe(true);
	});

	it('stores the anchor element when title-anchor id matches', async () => {
		const container = await fixture<HTMLElement>(`
			<div>
				<ndd-top-title-bar title="Titel" title-anchor="heading"></ndd-top-title-bar>
				<h1 id="heading">Titel</h1>
			</div>
		`);
		el = container.querySelector('ndd-top-title-bar')!;
		await waitForUpdate(el);
		expect((el as any)._anchorElement).not.toBeNull();
		cleanup(container);
	});

	it('does not set _anchorElement when id does not match', async () => {
		el = await fixture<NDDTopTitleBar>(
			'<ndd-top-title-bar title="Titel" title-anchor="does-not-exist"></ndd-top-title-bar>'
		);
		await waitForUpdate(el);
		expect((el as any)._anchorElement).toBeNull();
	});

	it('removes scroll listener on disconnect', async () => {
		const container = await fixture<HTMLElement>(`
			<div>
				<ndd-top-title-bar title="Titel" title-anchor="heading"></ndd-top-title-bar>
				<h1 id="heading">Titel</h1>
			</div>
		`);
		el = container.querySelector('ndd-top-title-bar')!;
		await waitForUpdate(el);
		const removeSpy = vi.spyOn(window, 'removeEventListener');
		el.remove();
		expect(removeSpy).toHaveBeenCalled();
		removeSpy.mockRestore();
		cleanup(container);
	});
});
