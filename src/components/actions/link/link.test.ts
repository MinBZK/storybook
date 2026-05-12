import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
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
