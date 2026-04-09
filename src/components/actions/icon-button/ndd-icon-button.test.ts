import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { NDDIconButton } from './ndd-icon-button.ts';
import './ndd-icon-button.ts';

describe('ndd-icon-button', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-icon-button></ndd-icon-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});
});


/* ============================================================
   Icon & text attributes
   ============================================================ */

describe('ndd-icon-button – icon & text attributes', () => {
	let el: NDDIconButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders ndd-icon from icon attribute', async () => {
		el = await fixture<NDDIconButton>('<ndd-icon-button icon="download" text="Download"></ndd-icon-button>');
		await waitForUpdate(el);
		const icon = el.shadowRoot!.querySelector('ndd-icon.icon-button__icon ndd-icon, .icon-button__icon ndd-icon');
		expect(icon).not.toBeNull();
	});

	it('renders text from text attribute', async () => {
		el = await fixture<NDDIconButton>('<ndd-icon-button icon="download" text="Download"></ndd-icon-button>');
		await waitForUpdate(el);
		const textEl = el.shadowRoot!.querySelector('.icon-button__text');
		expect(textEl).not.toBeNull();
		expect(textEl!.textContent).toBe('Download');
	});

	it('renders icon slot when icon attribute is not set', async () => {
		el = await fixture<NDDIconButton>(`
			<ndd-icon-button text="Custom">
				<svg slot="icon" width="20" height="20"><circle cx="10" cy="10" r="8"/></svg>
			</ndd-icon-button>
		`);
		await waitForUpdate(el);
		const slot = el.shadowRoot!.querySelector('slot[name="icon"]') as HTMLSlotElement;
		expect(slot).not.toBeNull();
		expect(slot!.assignedElements().length).toBe(1);
	});

	it('does not render text span when text is empty', async () => {
		el = await fixture<NDDIconButton>('<ndd-icon-button icon="download"></ndd-icon-button>');
		await waitForUpdate(el);
		const textEl = el.shadowRoot!.querySelector('.icon-button__text');
		expect(textEl).toBeNull();
	});

	it('warns when slot-based icon-only has no accessible name', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture<NDDIconButton>(`
			<ndd-icon-button>
				<svg slot="icon" width="20" height="20"><circle cx="10" cy="10" r="8"/></svg>
			</ndd-icon-button>
		`);
		await waitForUpdate(el);
		expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('accessible-label'));
		warnSpy.mockRestore();
	});

	it('does not warn when slot-based icon has text', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture<NDDIconButton>(`
			<ndd-icon-button text="Custom">
				<svg slot="icon" width="20" height="20"><circle cx="10" cy="10" r="8"/></svg>
			</ndd-icon-button>
		`);
		await waitForUpdate(el);
		expect(warnSpy).not.toHaveBeenCalled();
		warnSpy.mockRestore();
	});
});


/* ============================================================
   Accessible label & aria-label
   ============================================================ */

describe('ndd-icon-button – accessible label & aria-label', () => {
	let el: NDDIconButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('uses text as aria-label when no accessible-label is set', async () => {
		el = await fixture<NDDIconButton>('<ndd-icon-button icon="download" text="Download"></ndd-icon-button>');
		await waitForUpdate(el);
		const btn = el.shadowRoot!.querySelector('button')!;
		expect(btn.getAttribute('aria-label')).toBe('Download');
	});

	it('uses accessible-label as aria-label when set', async () => {
		el = await fixture<NDDIconButton>('<ndd-icon-button icon="eye" text="Toon" accessible-label="Toon wachtwoord"></ndd-icon-button>');
		await waitForUpdate(el);
		const btn = el.shadowRoot!.querySelector('button')!;
		expect(btn.getAttribute('aria-label')).toBe('Toon wachtwoord');
	});

	it('has no aria-label when neither text nor accessible-label is set', async () => {
		el = await fixture<NDDIconButton>('<ndd-icon-button icon="download"></ndd-icon-button>');
		await waitForUpdate(el);
		const btn = el.shadowRoot!.querySelector('button')!;
		const ariaLabel = btn.getAttribute('aria-label');
		expect(ariaLabel === null || ariaLabel === '').toBe(true);
	});
});


/* ============================================================
   Title tooltip
   ============================================================ */

// Note: aria-describedby from ndd-tooltip does not reach the inner <button>
// in ndd-icon-button's shadow DOM. This is a known shadow DOM + ARIA limitation.
// The tooltip is visual-only for custom element triggers; aria-label on the
// inner button provides the accessible name.
describe('ndd-icon-button – tooltip', () => {
	let el: NDDIconButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders ndd-tooltip with text for non-lg sizes', async () => {
		el = await fixture<NDDIconButton>('<ndd-icon-button size="md" icon="download" text="Download"></ndd-icon-button>');
		await waitForUpdate(el);
		const tooltip = el.shadowRoot!.querySelector('ndd-tooltip');
		expect(tooltip).not.toBeNull();
		expect(tooltip!.getAttribute('text')).toBe('Download');
	});

	it('renders ndd-tooltip with accessible-label when set', async () => {
		el = await fixture<NDDIconButton>('<ndd-icon-button size="md" icon="eye" text="Toon" accessible-label="Toon wachtwoord"></ndd-icon-button>');
		await waitForUpdate(el);
		const tooltip = el.shadowRoot!.querySelector('ndd-tooltip');
		expect(tooltip).not.toBeNull();
		expect(tooltip!.getAttribute('text')).toBe('Toon wachtwoord');
	});

	it('omits ndd-tooltip for lg size without accessible-label', async () => {
		el = await fixture<NDDIconButton>('<ndd-icon-button size="lg" icon="download" text="Download"></ndd-icon-button>');
		await waitForUpdate(el);
		const tooltip = el.shadowRoot!.querySelector('ndd-tooltip');
		expect(tooltip).toBeNull();
	});

	it('renders ndd-tooltip for lg size when accessible-label is set', async () => {
		el = await fixture<NDDIconButton>('<ndd-icon-button size="lg" icon="eye" text="Toon" accessible-label="Toon wachtwoord"></ndd-icon-button>');
		await waitForUpdate(el);
		const tooltip = el.shadowRoot!.querySelector('ndd-tooltip');
		expect(tooltip).not.toBeNull();
		expect(tooltip!.getAttribute('text')).toBe('Toon wachtwoord');
	});
});


/* ============================================================
   Disabled & aria-disabled
   ============================================================ */

describe('ndd-icon-button – disabled & aria-disabled', () => {
	let el: NDDIconButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('does not set aria-disabled when not disabled', async () => {
		el = await fixture<NDDIconButton>('<ndd-icon-button icon="dismiss" text="Close"></ndd-icon-button>');
		await waitForUpdate(el);
		const btn = el.shadowRoot!.querySelector('button')!;
		expect(btn.hasAttribute('aria-disabled')).toBe(false);
	});

	it('sets aria-disabled="true" when disabled', async () => {
		el = await fixture<NDDIconButton>('<ndd-icon-button icon="dismiss" text="Close" disabled></ndd-icon-button>');
		await waitForUpdate(el);
		const btn = el.shadowRoot!.querySelector('button')!;
		expect(btn.getAttribute('aria-disabled')).toBe('true');
	});
});


/* ============================================================
   href / link rendering
   ============================================================ */

describe('ndd-icon-button – href / link rendering', () => {
	let el: NDDIconButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders a <button> by default', async () => {
		el = await fixture<NDDIconButton>('<ndd-icon-button icon="dismiss" text="Sluiten"></ndd-icon-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('button')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('a')).toBeNull();
	});

	it('renders an <a> when href is set', async () => {
		el = await fixture<NDDIconButton>('<ndd-icon-button href="/overzicht" icon="arrow-left" text="Terug"></ndd-icon-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('button')).toBeNull();
	});

	it('sets href on the anchor element', async () => {
		el = await fixture<NDDIconButton>('<ndd-icon-button href="/overzicht" icon="arrow-left" text="Terug"></ndd-icon-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')!.getAttribute('href')).toBe('/overzicht');
	});

	it('forwards target and rel to the anchor element', async () => {
		el = await fixture<NDDIconButton>('<ndd-icon-button href="/overzicht" target="_blank" rel="noopener" icon="arrow-left" text="Terug"></ndd-icon-button>');
		await waitForUpdate(el);
		const a = el.shadowRoot!.querySelector('a')!;
		expect(a.getAttribute('target')).toBe('_blank');
		expect(a.getAttribute('rel')).toBe('noopener');
	});

	it('defaults rel to noopener noreferrer when target is _blank and rel is not set', async () => {
		el = await fixture<NDDIconButton>('<ndd-icon-button href="/overzicht" target="_blank" icon="arrow-left" text="Terug"></ndd-icon-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')!.getAttribute('rel')).toBe('noopener noreferrer');
	});

	it('sets aria-disabled on the anchor when disabled', async () => {
		el = await fixture<NDDIconButton>('<ndd-icon-button href="/overzicht" disabled icon="arrow-left" text="Terug"></ndd-icon-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')!.getAttribute('aria-disabled')).toBe('true');
	});

	it('forwards accessible-label to the anchor as aria-label', async () => {
		el = await fixture<NDDIconButton>('<ndd-icon-button href="/overzicht" accessible-label="Ga terug naar overzicht" icon="arrow-left" text="Terug"></ndd-icon-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')!.getAttribute('aria-label')).toBe('Ga terug naar overzicht');
	});

	it('prevents default click on disabled anchor to block navigation', async () => {
		el = await fixture<NDDIconButton>('<ndd-icon-button href="/overzicht" disabled icon="arrow-left" text="Terug"></ndd-icon-button>');
		await waitForUpdate(el);
		const anchor = el.shadowRoot!.querySelector('a')!;
		const event = new MouseEvent('click', { bubbles: true, cancelable: true });
		const preventSpy = vi.spyOn(event, 'preventDefault');
		anchor.dispatchEvent(event);
		expect(preventSpy).toHaveBeenCalled();
	});

	it('switches from <button> to <a> when href is set dynamically', async () => {
		el = await fixture<NDDIconButton>('<ndd-icon-button icon="arrow-left" text="Terug"></ndd-icon-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('button')).not.toBeNull();

		el.href = '/overzicht';
		await waitForUpdate(el);

		expect(el.shadowRoot!.querySelector('a')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('button')).toBeNull();
	});
});
