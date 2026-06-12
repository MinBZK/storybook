import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './blockquote.js';

describe('nldd-blockquote', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-blockquote>Quote</nldd-blockquote>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('forwards cite to the <blockquote> element', async () => {
		el = await fixture('<nldd-blockquote cite="https://example.com">Quote</nldd-blockquote>');
		await waitForUpdate(el);
		const inner = el.shadowRoot!.querySelector('blockquote')!;
		expect(inner.getAttribute('cite')).toBe('https://example.com');
	});

	it('hides attribution footer when slot is empty', async () => {
		el = await fixture('<nldd-blockquote>Quote</nldd-blockquote>');
		await waitForUpdate(el);
		const footer = el.shadowRoot!.querySelector('.blockquote__attribution') as HTMLElement;
		expect(footer.hasAttribute('hidden')).toBe(true);
	});

	it('shows attribution footer when slot has content', async () => {
		el = await fixture('<nldd-blockquote>Quote<span slot="attribution">Author</span></nldd-blockquote>');
		await waitForUpdate(el);
		const footer = el.shadowRoot!.querySelector('.blockquote__attribution') as HTMLElement;
		expect(footer.hasAttribute('hidden')).toBe(false);
	});

	it('suppresses the em-dash for a byline attribution', async () => {
		el = await fixture('<nldd-blockquote>Quote<nldd-byline slot="attribution" text="Jan"></nldd-byline></nldd-blockquote>');
		await waitForUpdate(el);
		const footer = el.shadowRoot!.querySelector('.blockquote__attribution') as HTMLElement;
		expect(footer.classList.contains('is-byline')).toBe(true);
	});

	it('keeps the em-dash for a plain text attribution', async () => {
		el = await fixture('<nldd-blockquote>Quote<span slot="attribution">Author</span></nldd-blockquote>');
		await waitForUpdate(el);
		const footer = el.shadowRoot!.querySelector('.blockquote__attribution') as HTMLElement;
		expect(footer.classList.contains('is-byline')).toBe(false);
	});
});
