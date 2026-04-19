import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import type { NLDDIconButton } from './icon-button.js';
import './icon-button.ts';

describe('nldd-icon-button', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-icon-button></nldd-icon-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});
});


/* ============================================================
   Icon & text attributes
   ============================================================ */

describe('nldd-icon-button – icon & text attributes', () => {
	let el: NLDDIconButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders nldd-icon from icon attribute', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button icon="download" text="Download"></nldd-icon-button>');
		await waitForUpdate(el);
		const icon = el.shadowRoot!.querySelector('nldd-icon.icon-button__icon nldd-icon, .icon-button__icon nldd-icon');
		expect(icon).not.toBeNull();
	});

	it('renders text from text attribute', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button icon="download" text="Download"></nldd-icon-button>');
		await waitForUpdate(el);
		const textEl = el.shadowRoot!.querySelector('.icon-button__text');
		expect(textEl).not.toBeNull();
		expect(textEl!.textContent).toBe('Download');
	});

	it('renders icon slot when icon attribute is not set', async () => {
		el = await fixture<NLDDIconButton>(`
			<nldd-icon-button text="Custom">
				<svg slot="icon" width="20" height="20"><circle cx="10" cy="10" r="8"/></svg>
			</nldd-icon-button>
		`);
		await waitForUpdate(el);
		const slot = el.shadowRoot!.querySelector('slot[name="icon"]') as HTMLSlotElement;
		expect(slot).not.toBeNull();
		expect(slot!.assignedElements().length).toBe(1);
	});

	it('does not render text span when text is empty', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button icon="download"></nldd-icon-button>');
		await waitForUpdate(el);
		const textEl = el.shadowRoot!.querySelector('.icon-button__text');
		expect(textEl).toBeNull();
	});

	it('warns when slot-based icon-only has no accessible name', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture<NLDDIconButton>(`
			<nldd-icon-button>
				<svg slot="icon" width="20" height="20"><circle cx="10" cy="10" r="8"/></svg>
			</nldd-icon-button>
		`);
		await waitForUpdate(el);
		expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('accessible-label'));
		warnSpy.mockRestore();
	});

	it('does not warn when slot-based icon has text', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture<NLDDIconButton>(`
			<nldd-icon-button text="Custom">
				<svg slot="icon" width="20" height="20"><circle cx="10" cy="10" r="8"/></svg>
			</nldd-icon-button>
		`);
		await waitForUpdate(el);
		expect(warnSpy).not.toHaveBeenCalled();
		warnSpy.mockRestore();
	});
});


/* ============================================================
   Accessible label & aria-label
   ============================================================ */

describe('nldd-icon-button – accessible label & aria-label', () => {
	let el: NLDDIconButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('uses text as aria-label when no accessible-label is set', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button icon="download" text="Download"></nldd-icon-button>');
		await waitForUpdate(el);
		const btn = el.shadowRoot!.querySelector('button')!;
		expect(btn.getAttribute('aria-label')).toBe('Download');
	});

	it('uses accessible-label as aria-label when set', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button icon="eye" text="Toon" accessible-label="Toon wachtwoord"></nldd-icon-button>');
		await waitForUpdate(el);
		const btn = el.shadowRoot!.querySelector('button')!;
		expect(btn.getAttribute('aria-label')).toBe('Toon wachtwoord');
	});

	it('has no aria-label when neither text nor accessible-label is set', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button icon="download"></nldd-icon-button>');
		await waitForUpdate(el);
		const btn = el.shadowRoot!.querySelector('button')!;
		const ariaLabel = btn.getAttribute('aria-label');
		expect(ariaLabel === null || ariaLabel === '').toBe(true);
	});
});


/* ============================================================
   Title tooltip
   ============================================================ */

// Note: aria-describedby from nldd-tooltip does not reach the inner <button>
// in nldd-icon-button's shadow DOM. This is a known shadow DOM + ARIA limitation.
// The tooltip is visual-only for custom element triggers; aria-label on the
// inner button provides the accessible name.
describe('nldd-icon-button – tooltip', () => {
	let el: NLDDIconButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders nldd-tooltip with text for non-lg sizes', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button size="md" icon="download" text="Download"></nldd-icon-button>');
		await waitForUpdate(el);
		const tooltip = el.shadowRoot!.querySelector('nldd-tooltip');
		expect(tooltip).not.toBeNull();
		expect(tooltip!.getAttribute('text')).toBe('Download');
	});

	it('renders nldd-tooltip with accessible-label when set', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button size="md" icon="eye" text="Toon" accessible-label="Toon wachtwoord"></nldd-icon-button>');
		await waitForUpdate(el);
		const tooltip = el.shadowRoot!.querySelector('nldd-tooltip');
		expect(tooltip).not.toBeNull();
		expect(tooltip!.getAttribute('text')).toBe('Toon wachtwoord');
	});

	it('omits nldd-tooltip for lg size without accessible-label', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button size="lg" icon="download" text="Download"></nldd-icon-button>');
		await waitForUpdate(el);
		const tooltip = el.shadowRoot!.querySelector('nldd-tooltip');
		expect(tooltip).toBeNull();
	});

	it('renders nldd-tooltip for lg size when accessible-label is set', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button size="lg" icon="eye" text="Toon" accessible-label="Toon wachtwoord"></nldd-icon-button>');
		await waitForUpdate(el);
		const tooltip = el.shadowRoot!.querySelector('nldd-tooltip');
		expect(tooltip).not.toBeNull();
		expect(tooltip!.getAttribute('text')).toBe('Toon wachtwoord');
	});
});


/* ============================================================
   Disabled & aria-disabled
   ============================================================ */

describe('nldd-icon-button – disabled & aria-disabled', () => {
	let el: NLDDIconButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('does not set aria-disabled when not disabled', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button icon="dismiss" text="Close"></nldd-icon-button>');
		await waitForUpdate(el);
		const btn = el.shadowRoot!.querySelector('button')!;
		expect(btn.hasAttribute('aria-disabled')).toBe(false);
	});

	it('sets aria-disabled="true" when disabled', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button icon="dismiss" text="Close" disabled></nldd-icon-button>');
		await waitForUpdate(el);
		const btn = el.shadowRoot!.querySelector('button')!;
		expect(btn.getAttribute('aria-disabled')).toBe('true');
	});
});


/* ============================================================
   href / link rendering
   ============================================================ */

describe('nldd-icon-button – href / link rendering', () => {
	let el: NLDDIconButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders a <button> by default', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button icon="dismiss" text="Sluiten"></nldd-icon-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('button')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('a')).toBeNull();
	});

	it('renders an <a> when href is set', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button href="/overzicht" icon="arrow-left" text="Terug"></nldd-icon-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('button')).toBeNull();
	});

	it('sets href on the anchor element', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button href="/overzicht" icon="arrow-left" text="Terug"></nldd-icon-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')!.getAttribute('href')).toBe('/overzicht');
	});

	it('forwards target and rel to the anchor element', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button href="/overzicht" target="_blank" rel="noopener" icon="arrow-left" text="Terug"></nldd-icon-button>');
		await waitForUpdate(el);
		const a = el.shadowRoot!.querySelector('a')!;
		expect(a.getAttribute('target')).toBe('_blank');
		expect(a.getAttribute('rel')).toBe('noopener');
	});

	it('defaults rel to noopener noreferrer when target is _blank and rel is not set', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button href="/overzicht" target="_blank" icon="arrow-left" text="Terug"></nldd-icon-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')!.getAttribute('rel')).toBe('noopener noreferrer');
	});

	it('sets aria-disabled on the anchor when disabled', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button href="/overzicht" disabled icon="arrow-left" text="Terug"></nldd-icon-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')!.getAttribute('aria-disabled')).toBe('true');
	});

	it('forwards accessible-label to the anchor as aria-label', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button href="/overzicht" accessible-label="Ga terug naar overzicht" icon="arrow-left" text="Terug"></nldd-icon-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')!.getAttribute('aria-label')).toBe('Ga terug naar overzicht');
	});

	it('prevents default click on disabled anchor to block navigation', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button href="/overzicht" disabled icon="arrow-left" text="Terug"></nldd-icon-button>');
		await waitForUpdate(el);
		const anchor = el.shadowRoot!.querySelector('a')!;
		const event = new MouseEvent('click', { bubbles: true, cancelable: true });
		const preventSpy = vi.spyOn(event, 'preventDefault');
		anchor.dispatchEvent(event);
		expect(preventSpy).toHaveBeenCalled();
	});

	it('switches from <button> to <a> when href is set dynamically', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button icon="arrow-left" text="Terug"></nldd-icon-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('button')).not.toBeNull();

		el.href = '/overzicht';
		await waitForUpdate(el);

		expect(el.shadowRoot!.querySelector('a')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('button')).toBeNull();
	});
});
