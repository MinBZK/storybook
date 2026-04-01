import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRIconButton } from './rr-icon-button.ts';
import './rr-icon-button.ts';

describe('rr-icon-button', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-icon-button></rr-icon-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});
});


/* ============================================================
   Icon & text attributes
   ============================================================ */

describe('rr-icon-button – icon & text attributes', () => {
	let el: RRIconButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders rr-icon from icon attribute', async () => {
		el = await fixture<RRIconButton>('<rr-icon-button icon="download" text="Download"></rr-icon-button>');
		await waitForUpdate(el);
		const icon = el.shadowRoot!.querySelector('rr-icon.icon-button__icon rr-icon, .icon-button__icon rr-icon');
		expect(icon).not.toBeNull();
	});

	it('renders text from text attribute', async () => {
		el = await fixture<RRIconButton>('<rr-icon-button icon="download" text="Download"></rr-icon-button>');
		await waitForUpdate(el);
		const textEl = el.shadowRoot!.querySelector('.icon-button__text');
		expect(textEl).not.toBeNull();
		expect(textEl!.textContent).toBe('Download');
	});

	it('renders icon slot when icon attribute is not set', async () => {
		el = await fixture<RRIconButton>(`
			<rr-icon-button text="Custom">
				<svg slot="icon" width="20" height="20"><circle cx="10" cy="10" r="8"/></svg>
			</rr-icon-button>
		`);
		await waitForUpdate(el);
		const slot = el.shadowRoot!.querySelector('slot[name="icon"]') as HTMLSlotElement;
		expect(slot).not.toBeNull();
		expect(slot!.assignedElements().length).toBe(1);
	});

	it('does not render text span when text is empty', async () => {
		el = await fixture<RRIconButton>('<rr-icon-button icon="download"></rr-icon-button>');
		await waitForUpdate(el);
		const textEl = el.shadowRoot!.querySelector('.icon-button__text');
		expect(textEl).toBeNull();
	});

	it('warns when slot-based icon-only has no accessible name', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture<RRIconButton>(`
			<rr-icon-button>
				<svg slot="icon" width="20" height="20"><circle cx="10" cy="10" r="8"/></svg>
			</rr-icon-button>
		`);
		await waitForUpdate(el);
		expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('accessible-label'));
		warnSpy.mockRestore();
	});

	it('does not warn when slot-based icon has text', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture<RRIconButton>(`
			<rr-icon-button text="Custom">
				<svg slot="icon" width="20" height="20"><circle cx="10" cy="10" r="8"/></svg>
			</rr-icon-button>
		`);
		await waitForUpdate(el);
		expect(warnSpy).not.toHaveBeenCalled();
		warnSpy.mockRestore();
	});
});


/* ============================================================
   Accessible label & aria-label
   ============================================================ */

describe('rr-icon-button – accessible label & aria-label', () => {
	let el: RRIconButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('uses text as aria-label when no accessible-label is set', async () => {
		el = await fixture<RRIconButton>('<rr-icon-button icon="download" text="Download"></rr-icon-button>');
		await waitForUpdate(el);
		const btn = el.shadowRoot!.querySelector('button')!;
		expect(btn.getAttribute('aria-label')).toBe('Download');
	});

	it('uses accessible-label as aria-label when set', async () => {
		el = await fixture<RRIconButton>('<rr-icon-button icon="eye" text="Toon" accessible-label="Toon wachtwoord"></rr-icon-button>');
		await waitForUpdate(el);
		const btn = el.shadowRoot!.querySelector('button')!;
		expect(btn.getAttribute('aria-label')).toBe('Toon wachtwoord');
	});

	it('has no aria-label when neither text nor accessible-label is set', async () => {
		el = await fixture<RRIconButton>('<rr-icon-button icon="download"></rr-icon-button>');
		await waitForUpdate(el);
		const btn = el.shadowRoot!.querySelector('button')!;
		const ariaLabel = btn.getAttribute('aria-label');
		expect(ariaLabel === null || ariaLabel === '').toBe(true);
	});
});


/* ============================================================
   Title tooltip
   ============================================================ */

describe('rr-icon-button – title tooltip', () => {
	let el: RRIconButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('uses text as title tooltip for non-lg sizes', async () => {
		el = await fixture<RRIconButton>('<rr-icon-button size="md" icon="download" text="Download"></rr-icon-button>');
		await waitForUpdate(el);
		const btn = el.shadowRoot!.querySelector('button')!;
		expect(btn.getAttribute('title')).toBe('Download');
	});

	it('uses accessible-label as title tooltip when set', async () => {
		el = await fixture<RRIconButton>('<rr-icon-button size="md" icon="eye" text="Toon" accessible-label="Toon wachtwoord"></rr-icon-button>');
		await waitForUpdate(el);
		const btn = el.shadowRoot!.querySelector('button')!;
		expect(btn.getAttribute('title')).toBe('Toon wachtwoord');
	});

	it('omits title attribute for lg size', async () => {
		el = await fixture<RRIconButton>('<rr-icon-button size="lg" icon="download" text="Download"></rr-icon-button>');
		await waitForUpdate(el);
		const btn = el.shadowRoot!.querySelector('button')!;
		expect(btn.getAttribute('title')).toBeNull();
	});

	it('omits title attribute for lg size even when accessible-label is set', async () => {
		el = await fixture<RRIconButton>('<rr-icon-button size="lg" icon="eye" text="Toon" accessible-label="Toon wachtwoord"></rr-icon-button>');
		await waitForUpdate(el);
		const btn = el.shadowRoot!.querySelector('button')!;
		expect(btn.getAttribute('title')).toBeNull();
	});
});


/* ============================================================
   Disabled & aria-disabled
   ============================================================ */

describe('rr-icon-button – disabled & aria-disabled', () => {
	let el: RRIconButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('does not set aria-disabled when not disabled', async () => {
		el = await fixture<RRIconButton>('<rr-icon-button icon="dismiss" text="Close"></rr-icon-button>');
		await waitForUpdate(el);
		const btn = el.shadowRoot!.querySelector('button')!;
		expect(btn.hasAttribute('aria-disabled')).toBe(false);
	});

	it('sets aria-disabled="true" when disabled', async () => {
		el = await fixture<RRIconButton>('<rr-icon-button icon="dismiss" text="Close" disabled></rr-icon-button>');
		await waitForUpdate(el);
		const btn = el.shadowRoot!.querySelector('button')!;
		expect(btn.getAttribute('aria-disabled')).toBe('true');
	});
});


/* ============================================================
   href / link rendering
   ============================================================ */

describe('rr-icon-button – href / link rendering', () => {
	let el: RRIconButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders a <button> by default', async () => {
		el = await fixture<RRIconButton>('<rr-icon-button icon="dismiss" text="Sluiten"></rr-icon-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('button')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('a')).toBeNull();
	});

	it('renders an <a> when href is set', async () => {
		el = await fixture<RRIconButton>('<rr-icon-button href="/overzicht" icon="arrow-left" text="Terug"></rr-icon-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('button')).toBeNull();
	});

	it('sets href on the anchor element', async () => {
		el = await fixture<RRIconButton>('<rr-icon-button href="/overzicht" icon="arrow-left" text="Terug"></rr-icon-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')!.getAttribute('href')).toBe('/overzicht');
	});

	it('forwards target and rel to the anchor element', async () => {
		el = await fixture<RRIconButton>('<rr-icon-button href="/overzicht" target="_blank" rel="noopener" icon="arrow-left" text="Terug"></rr-icon-button>');
		await waitForUpdate(el);
		const a = el.shadowRoot!.querySelector('a')!;
		expect(a.getAttribute('target')).toBe('_blank');
		expect(a.getAttribute('rel')).toBe('noopener');
	});

	it('defaults rel to noopener noreferrer when target is _blank and rel is not set', async () => {
		el = await fixture<RRIconButton>('<rr-icon-button href="/overzicht" target="_blank" icon="arrow-left" text="Terug"></rr-icon-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')!.getAttribute('rel')).toBe('noopener noreferrer');
	});

	it('sets aria-disabled on the anchor when disabled', async () => {
		el = await fixture<RRIconButton>('<rr-icon-button href="/overzicht" disabled icon="arrow-left" text="Terug"></rr-icon-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')!.getAttribute('aria-disabled')).toBe('true');
	});

	it('forwards accessible-label to the anchor as aria-label', async () => {
		el = await fixture<RRIconButton>('<rr-icon-button href="/overzicht" accessible-label="Ga terug naar overzicht" icon="arrow-left" text="Terug"></rr-icon-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')!.getAttribute('aria-label')).toBe('Ga terug naar overzicht');
	});

	it('prevents default click on disabled anchor to block navigation', async () => {
		el = await fixture<RRIconButton>('<rr-icon-button href="/overzicht" disabled icon="arrow-left" text="Terug"></rr-icon-button>');
		await waitForUpdate(el);
		const anchor = el.shadowRoot!.querySelector('a')!;
		const event = new MouseEvent('click', { bubbles: true, cancelable: true });
		const preventSpy = vi.spyOn(event, 'preventDefault');
		anchor.dispatchEvent(event);
		expect(preventSpy).toHaveBeenCalled();
	});

	it('switches from <button> to <a> when href is set dynamically', async () => {
		el = await fixture<RRIconButton>('<rr-icon-button icon="arrow-left" text="Terug"></rr-icon-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('button')).not.toBeNull();

		el.href = '/overzicht';
		await waitForUpdate(el);

		expect(el.shadowRoot!.querySelector('a')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('button')).toBeNull();
	});
});
