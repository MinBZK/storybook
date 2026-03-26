import { describe, it, expect, afterEach } from 'vitest';
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
   Slot assignment & text extraction
   ============================================================ */

describe('rr-icon-button – slot assignment & text extraction', () => {
	let el: RRIconButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('assigns slot="__icon" to rr-icon child', async () => {
		el = await fixture<RRIconButton>(`
			<rr-icon-button>
				<rr-icon name="download"></rr-icon>
				Download
			</rr-icon-button>
		`);
		await waitForUpdate(el);
		const icon = el.querySelector('rr-icon')!;
		expect(icon.getAttribute('slot')).toBe('__icon');
	});

	it('extracts slot text into _text', async () => {
		el = await fixture<RRIconButton>(`
			<rr-icon-button>
				<rr-icon name="download"></rr-icon>
				Download
			</rr-icon-button>
		`);
		await waitForUpdate(el);
		expect(el._text).toBe('Download');
	});

	it('filters out whitespace-only text nodes', async () => {
		el = await fixture<RRIconButton>(`<rr-icon-button>
			<rr-icon name="download"></rr-icon>
			Download
		</rr-icon-button>`);
		await waitForUpdate(el);
		expect(el._text).toBe('Download');
	});

	it('updates _text when text is dynamically added', async () => {
		el = await fixture<RRIconButton>(`
			<rr-icon-button>
				<rr-icon name="download"></rr-icon>
			</rr-icon-button>
		`);
		await waitForUpdate(el);
		el.appendChild(document.createTextNode('Save'));
		await waitForUpdate(el);
		expect(el._text).toBe('Save');
	});

	it('assigns slot to dynamically added icon', async () => {
		el = await fixture<RRIconButton>(`<rr-icon-button>Upload</rr-icon-button>`);
		await waitForUpdate(el);
		const icon = document.createElement('rr-icon');
		icon.setAttribute('name', 'upload');
		el.prepend(icon);
		await waitForUpdate(el);
		expect(icon.getAttribute('slot')).toBe('__icon');
	});

	it('cleans up observer on disconnect', async () => {
		el = await fixture<RRIconButton>(`
			<rr-icon-button>
				<rr-icon name="x"></rr-icon>
				Close
			</rr-icon-button>
		`);
		await waitForUpdate(el);
		expect((el as any)._observer).not.toBeNull();
		el.remove();
		expect((el as any)._observer).toBeNull();
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

	it('uses slot text as aria-label when no accessible-label is set', async () => {
		el = await fixture<RRIconButton>(`
			<rr-icon-button>
				<rr-icon name="download"></rr-icon>
				Download
			</rr-icon-button>
		`);
		await waitForUpdate(el);
		const btn = el.shadowRoot!.querySelector('button')!;
		expect(btn.getAttribute('aria-label')).toBe('Download');
	});

	it('uses accessible-label as aria-label when set', async () => {
		el = await fixture<RRIconButton>(`
			<rr-icon-button accessible-label="Toon wachtwoord">
				<rr-icon name="eye"></rr-icon>
				Toon
			</rr-icon-button>
		`);
		await waitForUpdate(el);
		const btn = el.shadowRoot!.querySelector('button')!;
		expect(btn.getAttribute('aria-label')).toBe('Toon wachtwoord');
	});

	it('has no aria-label when neither text nor accessible-label is set', async () => {
		el = await fixture<RRIconButton>(`
			<rr-icon-button>
				<rr-icon name="download"></rr-icon>
			</rr-icon-button>
		`);
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

	it('uses slot text as title tooltip for non-lg sizes', async () => {
		el = await fixture<RRIconButton>(`
			<rr-icon-button size="md">
				<rr-icon name="download"></rr-icon>
				Download
			</rr-icon-button>
		`);
		await waitForUpdate(el);
		const btn = el.shadowRoot!.querySelector('button')!;
		expect(btn.getAttribute('title')).toBe('Download');
	});

	it('uses accessible-label as title tooltip when set', async () => {
		el = await fixture<RRIconButton>(`
			<rr-icon-button size="md" accessible-label="Toon wachtwoord">
				<rr-icon name="eye"></rr-icon>
				Toon
			</rr-icon-button>
		`);
		await waitForUpdate(el);
		const btn = el.shadowRoot!.querySelector('button')!;
		expect(btn.getAttribute('title')).toBe('Toon wachtwoord');
	});

	it('omits title attribute for lg size', async () => {
		el = await fixture<RRIconButton>(`
			<rr-icon-button size="lg">
				<rr-icon name="download"></rr-icon>
				Download
			</rr-icon-button>
		`);
		await waitForUpdate(el);
		const btn = el.shadowRoot!.querySelector('button')!;
		expect(btn.getAttribute('title')).toBeNull();
	});

	it('omits title attribute for lg size even when accessible-label is set', async () => {
		el = await fixture<RRIconButton>(`
			<rr-icon-button size="lg" accessible-label="Toon wachtwoord">
				<rr-icon name="eye"></rr-icon>
				Toon
			</rr-icon-button>
		`);
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
		el = await fixture<RRIconButton>(`<rr-icon-button>Close</rr-icon-button>`);
		await waitForUpdate(el);
		const btn = el.shadowRoot!.querySelector('button')!;
		expect(btn.hasAttribute('aria-disabled')).toBe(false);
	});

	it('sets aria-disabled="true" when disabled', async () => {
		el = await fixture<RRIconButton>(`<rr-icon-button disabled>Close</rr-icon-button>`);
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
		el = await fixture<RRIconButton>(`
			<rr-icon-button>
				<rr-icon name="dismiss"></rr-icon>
				Sluiten
			</rr-icon-button>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('button')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('a')).toBeNull();
	});

	it('does not reflect href attribute when not set', async () => {
		el = await fixture<RRIconButton>(`
			<rr-icon-button>
				<rr-icon name="dismiss"></rr-icon>
				Sluiten
			</rr-icon-button>
		`);
		await waitForUpdate(el);
		expect(el.hasAttribute('href')).toBe(false);
	});

	it('renders an <a> when href is set', async () => {
		el = await fixture<RRIconButton>(`
			<rr-icon-button href="/overzicht">
				<rr-icon name="arrow-left"></rr-icon>
				Terug
			</rr-icon-button>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('button')).toBeNull();
	});

	it('sets href on the anchor element', async () => {
		el = await fixture<RRIconButton>(`
			<rr-icon-button href="/overzicht">
				<rr-icon name="arrow-left"></rr-icon>
				Terug
			</rr-icon-button>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')!.getAttribute('href')).toBe('/overzicht');
	});

	it('forwards target and rel to the anchor element', async () => {
		el = await fixture<RRIconButton>(`
			<rr-icon-button href="/overzicht" target="_blank" rel="noopener">
				<rr-icon name="arrow-left"></rr-icon>
				Terug
			</rr-icon-button>
		`);
		await waitForUpdate(el);
		const a = el.shadowRoot!.querySelector('a')!;
		expect(a.getAttribute('target')).toBe('_blank');
		expect(a.getAttribute('rel')).toBe('noopener');
	});

	it('defaults rel to noopener noreferrer when target is _blank and rel is not set', async () => {
		el = await fixture<RRIconButton>(`
			<rr-icon-button href="/overzicht" target="_blank">
				<rr-icon name="arrow-left"></rr-icon>
				Terug
			</rr-icon-button>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')!.getAttribute('rel')).toBe('noopener noreferrer');
	});

	it('keeps href on the anchor when disabled so it remains keyboard-discoverable', async () => {
		el = await fixture<RRIconButton>(`
			<rr-icon-button href="/overzicht" disabled>
				<rr-icon name="arrow-left"></rr-icon>
				Terug
			</rr-icon-button>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')!.getAttribute('href')).toBe('/overzicht');
	});

	it('sets aria-disabled on the anchor when disabled', async () => {
		el = await fixture<RRIconButton>(`
			<rr-icon-button href="/overzicht" disabled>
				<rr-icon name="arrow-left"></rr-icon>
				Terug
			</rr-icon-button>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')!.getAttribute('aria-disabled')).toBe('true');
	});

	it('does not set aria-disabled on the anchor when not disabled', async () => {
		el = await fixture<RRIconButton>(`
			<rr-icon-button href="/overzicht">
				<rr-icon name="arrow-left"></rr-icon>
				Terug
			</rr-icon-button>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')!.hasAttribute('aria-disabled')).toBe(false);
	});

	it('forwards accessible-label to the anchor as aria-label', async () => {
		el = await fixture<RRIconButton>(`
			<rr-icon-button href="/overzicht" accessible-label="Ga terug naar overzicht">
				<rr-icon name="arrow-left"></rr-icon>
				Terug
			</rr-icon-button>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')!.getAttribute('aria-label')).toBe('Ga terug naar overzicht');
	});

	it('omits title tooltip on the anchor for lg size', async () => {
		el = await fixture<RRIconButton>(`
			<rr-icon-button href="/overzicht" size="lg">
				<rr-icon name="arrow-left"></rr-icon>
				Terug
			</rr-icon-button>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')!.getAttribute('title')).toBeNull();
	});

	it('prevents default click on disabled anchor to block navigation', async () => {
		el = await fixture<RRIconButton>(`
			<rr-icon-button href="/overzicht" disabled>
				<rr-icon name="arrow-left"></rr-icon>
				Terug
			</rr-icon-button>
		`);
		await waitForUpdate(el);
		const anchor = el.shadowRoot!.querySelector('a')!;
		const event = new MouseEvent('click', { bubbles: true, cancelable: true });
		const preventSpy = vi.spyOn(event, 'preventDefault');
		anchor.dispatchEvent(event);
		expect(preventSpy).toHaveBeenCalled();
	});
		el = await fixture<RRIconButton>(`
			<rr-icon-button>
				<rr-icon name="arrow-left"></rr-icon>
				Terug
			</rr-icon-button>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('button')).not.toBeNull();

		el.href = '/overzicht';
		await waitForUpdate(el);

		expect(el.shadowRoot!.querySelector('a')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('button')).toBeNull();
	});
});
