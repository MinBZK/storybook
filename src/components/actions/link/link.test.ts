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

	it('removes href and adds role="link" when disabled', async () => {
		el = await fixture('<nldd-link href="#" text="Disabled" disabled></nldd-link>');
		await waitForUpdate(el);
		const anchor = el.shadowRoot!.querySelector('a')!;
		expect(anchor.hasAttribute('href')).toBe(false);
		expect(anchor.getAttribute('role')).toBe('link');
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
});
