import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRTopTitleBar } from './rr-top-title-bar.ts';
import './rr-top-title-bar.ts';


/* ============================================================
   Smoke tests
   ============================================================ */

describe('rr-top-title-bar', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-top-title-bar></rr-top-title-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders the title in the toolbar', async () => {
		el = await fixture('<rr-top-title-bar title="Overzicht"></rr-top-title-bar>');
		await waitForUpdate(el);
		const h1 = el.shadowRoot!.querySelector('.top-title-bar__toolbar-title');
		expect(h1?.textContent?.trim()).toBe('Overzicht');
	});

	it('renders the subtitle when set', async () => {
		el = await fixture('<rr-top-title-bar title="Titel" subtitle="Subtitel"></rr-top-title-bar>');
		await waitForUpdate(el);
		const subtitle = el.shadowRoot!.querySelector('.top-title-bar__toolbar-subtitle');
		expect(subtitle?.textContent?.trim()).toBe('Subtitel');
	});

	it('omits the subtitle element when not set', async () => {
		el = await fixture('<rr-top-title-bar title="Titel"></rr-top-title-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.top-title-bar__toolbar-subtitle')).toBeNull();
	});

	it('is compact by default (_titleHidden is true)', async () => {
		el = await fixture('<rr-top-title-bar title="Titel"></rr-top-title-bar>');
		await waitForUpdate(el);
		expect((el as RRTopTitleBar)._titleHidden).toBe(true);
	});

	it('toolbar title has is-hidden class when _titleHidden is false', async () => {
		const titleBar = await fixture<RRTopTitleBar>('<rr-top-title-bar title="Titel"></rr-top-title-bar>');
		await waitForUpdate(titleBar);
		titleBar._titleHidden = false;
		await waitForUpdate(titleBar);
		const h1 = titleBar.shadowRoot!.querySelector('.top-title-bar__toolbar-title');
		expect(h1?.classList.contains('is-hidden')).toBe(true);
	});
});


/* ============================================================
   Toolbar slot
   ============================================================ */

describe('rr-top-title-bar – toolbar slot', () => {
	let el: RRTopTitleBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders the toolbar slot', async () => {
		el = await fixture<RRTopTitleBar>(`
			<rr-top-title-bar title="Titel">
				<rr-button slot="toolbar">Actie</rr-button>
			</rr-top-title-bar>
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

describe('rr-top-title-bar – terugknop', () => {
	let el: RRTopTitleBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('hides the back button when back-label is not set', async () => {
		el = await fixture<RRTopTitleBar>('<rr-top-title-bar title="Titel"></rr-top-title-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.top-title-bar__back-button')).toBeNull();
	});

	it('shows the back button when back-label is set', async () => {
		el = await fixture<RRTopTitleBar>('<rr-top-title-bar title="Titel" back-label="Overzicht"></rr-top-title-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.top-title-bar__back-button')).not.toBeNull();
	});

	it('renders rr-icon-button (neutral-tinted) when compact (_titleHidden true)', async () => {
		el = await fixture<RRTopTitleBar>('<rr-top-title-bar title="Titel" back-label="Overzicht"></rr-top-title-bar>');
		await waitForUpdate(el);
		const backButton = el.shadowRoot!.querySelector('.top-title-bar__back-button');
		const iconBtn = backButton!.querySelector('rr-icon-button');
		expect(iconBtn).not.toBeNull();
		expect(iconBtn!.getAttribute('variant')).toBe('neutral-tinted');
		expect(backButton!.querySelector('rr-button')).toBeNull();
	});

	it('renders rr-button (accent-transparent) when title is visible (_titleHidden false)', async () => {
		el = await fixture<RRTopTitleBar>('<rr-top-title-bar title="Titel" back-label="Overzicht"></rr-top-title-bar>');
		await waitForUpdate(el);
		el._titleHidden = false;
		await waitForUpdate(el);
		const backButton = el.shadowRoot!.querySelector('.top-title-bar__back-button');
		const btn = backButton!.querySelector('rr-button');
		expect(btn).not.toBeNull();
		expect(btn!.getAttribute('variant')).toBe('accent-transparent');
		expect(backButton!.querySelector('rr-icon-button')).toBeNull();
	});

	it('shows icon-only back button when _isStacked is true and back-label is not set', async () => {
		el = await fixture<RRTopTitleBar>('<rr-top-title-bar title="Titel"></rr-top-title-bar>');
		await waitForUpdate(el);
		el._isStacked = true;
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.top-title-bar__back-button rr-icon-button')).not.toBeNull();
	});

	it('sets accessible-label on the icon-only back button', async () => {
		el = await fixture<RRTopTitleBar>('<rr-top-title-bar title="Titel" back-label="Overzicht"></rr-top-title-bar>');
		await waitForUpdate(el);
		const iconBtn = el.shadowRoot!.querySelector('.top-title-bar__back-button rr-icon-button');
		expect(iconBtn!.getAttribute('accessible-label')).toBe('Overzicht');
	});

	it('sets href on the back button when back-href is set', async () => {
		el = await fixture<RRTopTitleBar>('<rr-top-title-bar title="Titel" back-label="Overzicht" back-href="/overzicht"></rr-top-title-bar>');
		await waitForUpdate(el);
		const iconBtn = el.shadowRoot!.querySelector('.top-title-bar__back-button rr-icon-button');
		expect(iconBtn!.getAttribute('href')).toBe('/overzicht');
	});

	it('fires a back event when the back button is clicked', async () => {
		el = await fixture<RRTopTitleBar>('<rr-top-title-bar title="Titel" back-label="Overzicht"></rr-top-title-bar>');
		await waitForUpdate(el);

		const listener = vi.fn();
		el.addEventListener('back', listener);

		const mockEvent = new MouseEvent('click', { bubbles: true });
		el._handleBack(mockEvent);

		expect(listener).toHaveBeenCalledOnce();
	});

	it('does not fire a back event when back-href is set', async () => {
		el = await fixture<RRTopTitleBar>('<rr-top-title-bar title="Titel" back-label="Overzicht" back-href="/overzicht"></rr-top-title-bar>');
		await waitForUpdate(el);

		const listener = vi.fn();
		el.addEventListener('back', listener);

		const mockEvent = new MouseEvent('click', { bubbles: true });
		el._handleBack(mockEvent);

		expect(listener).not.toHaveBeenCalled();
	});
});


/* ============================================================
   Dismiss button
   ============================================================ */

describe('rr-top-title-bar – sluitknop', () => {
	let el: RRTopTitleBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('hides the dismiss button when dismiss-label is not set', async () => {
		el = await fixture<RRTopTitleBar>('<rr-top-title-bar title="Titel"></rr-top-title-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.top-title-bar__dismiss-button')).toBeNull();
	});

	it('shows the dismiss button when dismiss-label is set', async () => {
		el = await fixture<RRTopTitleBar>('<rr-top-title-bar title="Titel" dismiss-label="Sluit"></rr-top-title-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.top-title-bar__dismiss-button')).not.toBeNull();
	});

	it('renders the dismiss label text', async () => {
		el = await fixture<RRTopTitleBar>('<rr-top-title-bar title="Titel" dismiss-label="Annuleer"></rr-top-title-bar>');
		await waitForUpdate(el);
		const button = el.shadowRoot!.querySelector('.top-title-bar__dismiss-button rr-button');
		expect(button?.textContent?.trim()).toBe('Annuleer');
	});

	it('fires a dismiss event when _handleDismiss is called', async () => {
		el = await fixture<RRTopTitleBar>('<rr-top-title-bar title="Titel" dismiss-label="Sluit"></rr-top-title-bar>');
		await waitForUpdate(el);

		const listener = vi.fn();
		el.addEventListener('dismiss', listener);
		el._handleDismiss();

		expect(listener).toHaveBeenCalledOnce();
	});
});


/* ============================================================
   Title anchor / IntersectionObserver
   ============================================================ */

describe('rr-top-title-bar – title-anchor', () => {
	let container: HTMLElement;
	let el: RRTopTitleBar;

	afterEach(() => {
		if (container) cleanup(container);
	});

	it('starts with _titleHidden true when no title-anchor is set', async () => {
		el = await fixture<RRTopTitleBar>('<rr-top-title-bar title="Titel"></rr-top-title-bar>');
		await waitForUpdate(el);
		expect(el._titleHidden).toBe(true);
	});

	it('observes the element matching title-anchor id', async () => {
		container = await fixture<HTMLElement>(`
			<div>
				<rr-top-title-bar title="Titel" title-anchor="page-heading"></rr-top-title-bar>
				<h1 id="page-heading">Paginatitel</h1>
			</div>
		`);
		el = container.querySelector('rr-top-title-bar')!;
		await waitForUpdate(el);
		expect((el as any)._anchorElement).not.toBeNull();
		expect((el as any)._intersectionObserver).not.toBeNull();
	});

	it('does not set _anchorElement when id does not match any element', async () => {
		el = await fixture<RRTopTitleBar>('<rr-top-title-bar title="Titel" title-anchor="does-not-exist"></rr-top-title-bar>');
		await waitForUpdate(el);
		expect((el as any)._anchorElement).toBeNull();
	});

	it('disconnects intersection observer when title-anchor changes', async () => {
		container = await fixture<HTMLElement>(`
			<div>
				<rr-top-title-bar title="Titel" title-anchor="heading-a"></rr-top-title-bar>
				<h1 id="heading-a">A</h1>
				<h1 id="heading-b">B</h1>
			</div>
		`);
		el = container.querySelector('rr-top-title-bar')!;
		await waitForUpdate(el);

		const firstObserver = (el as any)._intersectionObserver;
		const disconnectSpy = vi.spyOn(firstObserver, 'disconnect');

		el.titleAnchor = 'heading-b';
		await waitForUpdate(el);

		expect(disconnectSpy).toHaveBeenCalled();
	});

	it('disconnects intersection observer on disconnect', async () => {
		container = await fixture<HTMLElement>(`
			<div>
				<rr-top-title-bar title="Titel" title-anchor="heading"></rr-top-title-bar>
				<h1 id="heading">Titel</h1>
			</div>
		`);
		el = container.querySelector('rr-top-title-bar')!;
		await waitForUpdate(el);

		const observer = (el as any)._intersectionObserver;
		const disconnectSpy = vi.spyOn(observer, 'disconnect');

		el.remove();
		expect(disconnectSpy).toHaveBeenCalled();
		expect((el as any)._intersectionObserver).toBeNull();
	});
});


/* ============================================================
   rr-page stacked detection
   ============================================================ */

describe('rr-top-title-bar – rr-page stacked detectie', () => {
	let container: HTMLElement;
	let el: RRTopTitleBar;

	afterEach(() => {
		if (container) cleanup(container);
	});

	it('detects stacked on an rr-page ancestor', async () => {
		if (!customElements.get('rr-page')) {
			customElements.define('rr-page', class extends HTMLElement {});
		}
		container = await fixture<HTMLElement>(`
			<rr-page stacked>
				<rr-top-title-bar title="Titel"></rr-top-title-bar>
			</rr-page>
		`);
		el = container.querySelector('rr-top-title-bar')!;
		await waitForUpdate(el);
		expect(el._isStacked).toBe(true);
	});

	it('updates _isStacked when stacked attribute is removed from rr-page', async () => {
		if (!customElements.get('rr-page')) {
			customElements.define('rr-page', class extends HTMLElement {});
		}
		container = await fixture<HTMLElement>(`
			<rr-page stacked>
				<rr-top-title-bar title="Titel"></rr-top-title-bar>
			</rr-page>
		`);
		el = container.querySelector('rr-top-title-bar')!;
		await waitForUpdate(el);

		container.removeAttribute('stacked');
		await new Promise(resolve => setTimeout(resolve, 0));
		await waitForUpdate(el);

		expect(el._isStacked).toBe(false);
	});
});


/* ============================================================
   Lifecycle
   ============================================================ */

describe('rr-top-title-bar – levenscyclus', () => {
	let el: RRTopTitleBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('disconnects the page observer on disconnect', async () => {
		if (!customElements.get('rr-page')) {
			customElements.define('rr-page', class extends HTMLElement {});
		}
		const container = await fixture<HTMLElement>(`
			<rr-page stacked>
				<rr-top-title-bar title="Titel"></rr-top-title-bar>
			</rr-page>
		`);
		el = container.querySelector('rr-top-title-bar')!;
		await waitForUpdate(el);

		expect((el as any)._pageObserver).not.toBeNull();
		el.remove();
		expect((el as any)._pageObserver).toBeNull();

		cleanup(container);
	});
});
