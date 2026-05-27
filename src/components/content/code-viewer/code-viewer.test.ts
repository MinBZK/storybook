import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './code-viewer.js';

describe('nldd-code-viewer', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('rendert zonder fouten', async () => {
		el = await fixture('<nldd-code-viewer>hello</nldd-code-viewer>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('rendert een pre element met de code class', async () => {
		el = await fixture('<nldd-code-viewer>hello</nldd-code-viewer>');
		await waitForUpdate(el);
		const pre = el.shadowRoot!.querySelector('pre.code-viewer');
		expect(pre).not.toBeNull();
	});

	it('toont slot content', async () => {
		el = await fixture('<nldd-code-viewer>example content</nldd-code-viewer>');
		await waitForUpdate(el);
		const slot = el.shadowRoot!.querySelector('slot');
		const assigned = slot!.assignedNodes({ flatten: true });
		expect(assigned[0].textContent).toContain('example content');
	});

	it('reflects the wrap attribute', async () => {
		el = await fixture('<nldd-code-viewer wrap>x</nldd-code-viewer>');
		await waitForUpdate(el);
		expect(el.hasAttribute('wrap')).toBe(true);
	});

	it('renders the highlighted <code> wrapper only when language is set', async () => {
		el = await fixture('<nldd-code-viewer>const x = 1;</nldd-code-viewer>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('code.code__highlighted')).toBeNull();
	});

	it('produces highlighted html with token spans for a known language', async () => {
		el = await fixture('<nldd-code-viewer language="json">{"foo": 1, "bar": true}</nldd-code-viewer>');
		await waitForUpdate(el);
		const highlighted = el.shadowRoot!.querySelector('code.code__highlighted');
		expect(highlighted).not.toBeNull();
		// Prism wraps tokens in <span class="token …"> nodes.
		expect(highlighted!.querySelectorAll('.token').length).toBeGreaterThan(0);
	});

	it('falls back to raw slot when language is unknown', async () => {
		el = await fixture('<nldd-code-viewer language="not-a-real-language">plain text</nldd-code-viewer>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('code.code__highlighted')).toBeNull();
	});

	it('clears the highlighted html when language is removed', async () => {
		el = await fixture<HTMLElement>('<nldd-code-viewer language="json">{"a":1}</nldd-code-viewer>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('code.code__highlighted')).not.toBeNull();
		el.removeAttribute('language');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('code.code__highlighted')).toBeNull();
	});


	/* ============================================================
	   Container (box + background)
	   ============================================================ */

	it('defaults to box on with background="tinted"', async () => {
		el = await fixture('<nldd-code-viewer>x</nldd-code-viewer>');
		await waitForUpdate(el);
		expect(el.hasAttribute('no-box')).toBe(false);
		expect(el.getAttribute('background')).toBe('tinted');
	});

	it('reflects no-box attribute', async () => {
		el = await fixture('<nldd-code-viewer no-box>x</nldd-code-viewer>');
		await waitForUpdate(el);
		expect(el.hasAttribute('no-box')).toBe(true);
		expect((el as { noBox?: boolean }).noBox).toBe(true);
	});

	it('no-box zeroes the box CSS — corner-radius and padding', async () => {
		el = await fixture('<nldd-code-viewer no-box>x</nldd-code-viewer>');
		await waitForUpdate(el);
		const pre = el.shadowRoot!.querySelector<HTMLElement>('pre.code-viewer')!;
		const cs = getComputedStyle(pre);
		expect(parseFloat(cs.borderTopLeftRadius)).toBe(0);
		expect(parseFloat(cs.paddingTop)).toBe(0);
		expect(parseFloat(cs.paddingLeft)).toBe(0);
		expect(cs.backgroundColor).toBe('rgba(0, 0, 0, 0)');
	});

	it('background="inherit" makes the background transparent', async () => {
		el = await fixture('<nldd-code-viewer background="inherit">x</nldd-code-viewer>');
		await waitForUpdate(el);
		const pre = el.shadowRoot!.querySelector<HTMLElement>('pre.code-viewer')!;
		expect(getComputedStyle(pre).backgroundColor).toBe('rgba(0, 0, 0, 0)');
	});

	it('background attribute reflects each value', async () => {
		for (const bg of ['tinted', 'base', 'inherit'] as const) {
			const wrapper = document.createElement('div');
			wrapper.innerHTML = `<nldd-code-viewer background="${bg}">x</nldd-code-viewer>`;
			document.body.appendChild(wrapper);
			const cv = wrapper.firstElementChild as HTMLElement & { updateComplete: Promise<boolean> };
			await cv.updateComplete;
			expect(cv.getAttribute('background')).toBe(bg);
			wrapper.remove();
		}
	});
});
