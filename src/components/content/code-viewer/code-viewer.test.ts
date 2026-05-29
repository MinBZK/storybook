import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import type { NLDDCodeViewer } from './code-viewer.js';
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
			el = await fixture(`<nldd-code-viewer background="${bg}">x</nldd-code-viewer>`);
			await waitForUpdate(el);
			expect(el.getAttribute('background')).toBe(bg);
			cleanup(el);
		}
	});


	/* ============================================================
	   Copy button
	   ============================================================ */

	it('renders the copy button by default', async () => {
		el = await fixture('<nldd-code-viewer>x</nldd-code-viewer>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.code-viewer__copy-button')).not.toBeNull();
	});

	it('no-copy hides the copy button', async () => {
		el = await fixture('<nldd-code-viewer no-copy>x</nldd-code-viewer>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.code-viewer__copy-button')).toBeNull();
	});

	it('clicking copy writes the raw slot text to the clipboard', async () => {
		const writeText = vi.fn().mockResolvedValue(undefined);
		const originalClipboard = navigator.clipboard;
		Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
		try {
			el = await fixture<NLDDCodeViewer>('<nldd-code-viewer>hello world</nldd-code-viewer>');
			await waitForUpdate(el);
			(el as unknown as NLDDCodeViewer)._onCopyClick();
			await waitForUpdate(el);
			expect(writeText).toHaveBeenCalledWith('hello world');
		} finally {
			Object.defineProperty(navigator, 'clipboard', { value: originalClipboard, configurable: true });
		}
	});

	it('success state swaps icon to check-mark and opens the tooltip', async () => {
		const originalClipboard = navigator.clipboard;
		Object.defineProperty(navigator, 'clipboard', { value: { writeText: vi.fn().mockResolvedValue(undefined) }, configurable: true });
		try {
			el = await fixture<NLDDCodeViewer>('<nldd-code-viewer>x</nldd-code-viewer>');
			await waitForUpdate(el);
			await (el as unknown as NLDDCodeViewer)._onCopyClick();
			await waitForUpdate(el);
			expect((el as unknown as NLDDCodeViewer)._copyState).toBe('success');
			const iconBtn = el.shadowRoot!.querySelector('.code-viewer__copy-button nldd-icon-button');
			expect(iconBtn!.getAttribute('icon')).toBe('check-mark');
			const tooltip = el.shadowRoot!.querySelector('.code-viewer__copy-button nldd-tooltip');
			expect(tooltip!.hasAttribute('open')).toBe(true);
		} finally {
			Object.defineProperty(navigator, 'clipboard', { value: originalClipboard, configurable: true });
		}
	});

	it('failure state keeps the copy icon and opens the tooltip with failure text', async () => {
		const originalClipboard = navigator.clipboard;
		Object.defineProperty(navigator, 'clipboard', { value: { writeText: vi.fn().mockRejectedValue(new Error('denied')) }, configurable: true });
		try {
			el = await fixture<NLDDCodeViewer>('<nldd-code-viewer>x</nldd-code-viewer>');
			await waitForUpdate(el);
			await (el as unknown as NLDDCodeViewer)._onCopyClick();
			await waitForUpdate(el);
			expect((el as unknown as NLDDCodeViewer)._copyState).toBe('failure');
			const iconBtn = el.shadowRoot!.querySelector('.code-viewer__copy-button nldd-icon-button');
			expect(iconBtn!.getAttribute('icon')).toBe('copy');
			const tooltip = el.shadowRoot!.querySelector('.code-viewer__copy-button nldd-tooltip');
			expect(tooltip!.getAttribute('text')).toBe('Kopiëren mislukt');
		} finally {
			Object.defineProperty(navigator, 'clipboard', { value: originalClipboard, configurable: true });
		}
	});

	it('resets to idle after the feedback duration', async () => {
		const originalClipboard = navigator.clipboard;
		Object.defineProperty(navigator, 'clipboard', { value: { writeText: vi.fn().mockResolvedValue(undefined) }, configurable: true });
		vi.useFakeTimers();
		try {
			el = await fixture<NLDDCodeViewer>('<nldd-code-viewer>x</nldd-code-viewer>');
			const litEl = el as HTMLElement & { updateComplete: Promise<boolean> };
			await litEl.updateComplete;
			await (el as unknown as NLDDCodeViewer)._onCopyClick();
			await litEl.updateComplete;
			expect((el as unknown as NLDDCodeViewer)._copyState).toBe('success');
			// Advance past the 2s reset timer with fake timers instead of a
			// real setTimeout. Direct updateComplete (not waitForUpdate)
			// because waitForUpdate's internal setTimeout(0) never fires
			// under fake timers.
			await vi.advanceTimersByTimeAsync(2100);
			await litEl.updateComplete;
			expect((el as unknown as NLDDCodeViewer)._copyState).toBe('idle');
		} finally {
			vi.useRealTimers();
			Object.defineProperty(navigator, 'clipboard', { value: originalClipboard, configurable: true });
		}
	});
});
