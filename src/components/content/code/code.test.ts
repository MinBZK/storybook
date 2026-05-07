import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './code.ts';

describe('nldd-code', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('rendert zonder fouten', async () => {
		el = await fixture('<nldd-code>hello</nldd-code>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('rendert een pre element met de code class', async () => {
		el = await fixture('<nldd-code>hello</nldd-code>');
		await waitForUpdate(el);
		const pre = el.shadowRoot!.querySelector('pre.code');
		expect(pre).not.toBeNull();
	});

	it('toont slot content', async () => {
		el = await fixture('<nldd-code>example content</nldd-code>');
		await waitForUpdate(el);
		const slot = el.shadowRoot!.querySelector('slot');
		const assigned = slot!.assignedNodes({ flatten: true });
		expect(assigned[0].textContent).toContain('example content');
	});

	it('reflects the wrap attribute', async () => {
		el = await fixture('<nldd-code wrap>x</nldd-code>');
		await waitForUpdate(el);
		expect(el.hasAttribute('wrap')).toBe(true);
	});

	it('renders the highlighted <code> wrapper only when language is set', async () => {
		el = await fixture('<nldd-code>const x = 1;</nldd-code>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('code.code__highlighted')).toBeNull();
	});

	it('produces highlighted html with token spans for a known language', async () => {
		el = await fixture('<nldd-code language="json">{"foo": 1, "bar": true}</nldd-code>');
		await waitForUpdate(el);
		const highlighted = el.shadowRoot!.querySelector('code.code__highlighted');
		expect(highlighted).not.toBeNull();
		// Prism wraps tokens in <span class="token …"> nodes.
		expect(highlighted!.querySelectorAll('.token').length).toBeGreaterThan(0);
	});

	it('falls back to raw slot when language is unknown', async () => {
		el = await fixture('<nldd-code language="not-a-real-language">plain text</nldd-code>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('code.code__highlighted')).toBeNull();
	});

	it('clears the highlighted html when language is removed', async () => {
		el = await fixture<HTMLElement>('<nldd-code language="json">{"a":1}</nldd-code>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('code.code__highlighted')).not.toBeNull();
		el.removeAttribute('language');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('code.code__highlighted')).toBeNull();
	});
});
