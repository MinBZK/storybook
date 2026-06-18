import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import type { NLDDLink } from './link.js';
import './link.js';

describe('nldd-link', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-link></nldd-link>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders text from text attribute', async () => {
		el = await fixture('<nldd-link href="#" text="Go home"></nldd-link>');
		await waitForUpdate(el);
		const anchor = el.shadowRoot!.querySelector('a')!;
		expect(anchor.textContent).toContain('Go home');
	});

	it('sets href on inner anchor', async () => {
		el = await fixture('<nldd-link href="/about" text="About"></nldd-link>');
		await waitForUpdate(el);
		const anchor = el.shadowRoot!.querySelector('a')!;
		expect(anchor.getAttribute('href')).toBe('/about');
	});

	it('defaults rel to noopener noreferrer for target=_blank', async () => {
		el = await fixture('<nldd-link href="https://example.com" target="_blank" text="External"></nldd-link>');
		await waitForUpdate(el);
		const anchor = el.shadowRoot!.querySelector('a')!;
		expect(anchor.getAttribute('rel')).toBe('noopener noreferrer');
	});

	it('merges custom rel with noopener noreferrer for target=_blank', async () => {
		el = await fixture('<nldd-link href="https://example.com" target="_blank" rel="nofollow" text="External"></nldd-link>');
		await waitForUpdate(el);
		const anchor = el.shadowRoot!.querySelector('a')!;
		const rel = anchor.getAttribute('rel')!.split(/\s+/);
		expect(rel).toContain('nofollow');
		expect(rel).toContain('noopener');
		expect(rel).toContain('noreferrer');
	});

	it('does not add safety attrs when target is not _blank', async () => {
		el = await fixture('<nldd-link href="/local" rel="nofollow" text="Local"></nldd-link>');
		await waitForUpdate(el);
		const anchor = el.shadowRoot!.querySelector('a')!;
		expect(anchor.getAttribute('rel')).toBe('nofollow');
	});

	it('announces "opens in new tab" via a visually-hidden hint when target=_blank', async () => {
		el = await fixture('<nldd-link href="https://example.com" target="_blank" text="External"></nldd-link>');
		await waitForUpdate(el);
		const anchor = el.shadowRoot!.querySelector('a')!;
		expect(anchor.querySelector('.link__new-tab-hint')?.textContent).toBe('Opent in nieuw tabblad');
		// The name stays content-derived (visible text + hint), so no aria-label override.
		expect(anchor.hasAttribute('aria-label')).toBe(false);
	});

	it('folds the new-tab hint into aria-label when accessible-label is set', async () => {
		el = await fixture('<nldd-link href="https://example.com" target="_blank" accessible-label="Externe site" text="External"></nldd-link>');
		await waitForUpdate(el);
		const anchor = el.shadowRoot!.querySelector('a')!;
		expect(anchor.getAttribute('aria-label')).toBe('Externe site, Opent in nieuw tabblad');
		// A hidden span would lose to aria-label, so it isn't rendered.
		expect(anchor.querySelector('.link__new-tab-hint')).toBeNull();
	});

	it('omits the new-tab hint when target is not _blank', async () => {
		el = await fixture('<nldd-link href="/local" text="Local"></nldd-link>');
		await waitForUpdate(el);
		const anchor = el.shadowRoot!.querySelector('a')!;
		expect(anchor.querySelector('.link__new-tab-hint')).toBeNull();
		expect(anchor.hasAttribute('aria-label')).toBe(false);
	});

	it('suppresses the new-tab hint when disabled (the anchor does not navigate)', async () => {
		el = await fixture('<nldd-link href="https://example.com" target="_blank" disabled text="External"></nldd-link>');
		await waitForUpdate(el);
		const anchor = el.shadowRoot!.querySelector('a')!;
		expect(anchor.querySelector('.link__new-tab-hint')).toBeNull();
	});

	it('overrides the new-tab wording via the translations property', async () => {
		el = await fixture('<nldd-link href="https://example.com" target="_blank" text="External"></nldd-link>');
		(el as NLDDLink).translations = { 'components.link.opens-in-new-tab-text': 'Opens in a new tab' };
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.link__new-tab-hint')?.textContent).toBe('Opens in a new tab');
	});

	it('removes href and adds role="link" + tabindex=0 when disabled', async () => {
		el = await fixture('<nldd-link href="#" text="Disabled" disabled></nldd-link>');
		await waitForUpdate(el);
		const anchor = el.shadowRoot!.querySelector('a')!;
		expect(anchor.hasAttribute('href')).toBe(false);
		expect(anchor.getAttribute('role')).toBe('link');
		expect(anchor.getAttribute('tabindex')).toBe('0');
		expect(anchor.getAttribute('aria-disabled')).toBe('true');
	});

	it('blocks programmatic click when disabled', async () => {
		el = await fixture('<nldd-link href="#" text="Disabled" disabled></nldd-link>');
		await waitForUpdate(el);
		const anchor = el.shadowRoot!.querySelector('a')!;
		const event = new MouseEvent('click', { bubbles: true, cancelable: true });
		anchor.dispatchEvent(event);
		expect(event.defaultPrevented).toBe(true);
	});

	// — Inherit / inline mode —

	it('has no size attribute by default (inherit mode)', async () => {
		el = await fixture('<nldd-link href="#" text="Inline"></nldd-link>');
		await waitForUpdate(el);
		expect(el.hasAttribute('size')).toBe(false);
	});

	it('inherit mode uses display: inline so text wraps in flow', async () => {
		el = await fixture('<nldd-link href="#" text="Inline"></nldd-link>');
		await waitForUpdate(el);
		expect(getComputedStyle(el).display).toBe('inline');
	});

	it('explicit size="inherit" behaves identically to no size', async () => {
		el = await fixture('<nldd-link href="#" size="inherit" text="Inline"></nldd-link>');
		await waitForUpdate(el);
		expect(getComputedStyle(el).display).toBe('inline');
	});

	it('sized mode uses display: inline-flex for icon alignment', async () => {
		el = await fixture('<nldd-link href="#" size="md" text="Sized"></nldd-link>');
		await waitForUpdate(el);
		expect(getComputedStyle(el).display).toBe('inline-flex');
	});

	it('inherit mode renders start-icon (whitespace provides spacing)', async () => {
		el = await fixture('<nldd-link href="#" text="With icon" start-icon="download"></nldd-link>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.link__start-icon')).not.toBeNull();
	});

	it('inherit mode renders end-icon (whitespace provides spacing)', async () => {
		el = await fixture('<nldd-link href="#" text="With icon" end-icon="arrow-right"></nldd-link>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.link__end-icon')).not.toBeNull();
	});

	it('sized mode renders icons as before', async () => {
		el = await fixture('<nldd-link href="#" size="md" text="With icon" start-icon="download"></nldd-link>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.link__start-icon')).not.toBeNull();
	});
});
