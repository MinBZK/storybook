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
