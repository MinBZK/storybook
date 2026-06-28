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

	it('mount een read-only CodeMirror editor', async () => {
		el = await fixture('<nldd-code-viewer>hello</nldd-code-viewer>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.cm-editor')).not.toBeNull();
		const content = el.shadowRoot!.querySelector('.cm-content') as HTMLElement;
		expect(content.getAttribute('contenteditable')).toBe('false');
	});

	it('toont slot content in de editor', async () => {
		el = await fixture('<nldd-code-viewer>example content</nldd-code-viewer>');
		await waitForUpdate(el);
		const content = el.shadowRoot!.querySelector('.cm-content')!;
		expect(content.textContent).toContain('example content');
	});

	it('reflects the wrap attribute', async () => {
		el = await fixture('<nldd-code-viewer wrap>x</nldd-code-viewer>');
		await waitForUpdate(el);
		expect(el.hasAttribute('wrap')).toBe(true);
	});

	it('rendert inhoud plain zonder taal', async () => {
		el = await fixture('<nldd-code-viewer>const x = 1;</nldd-code-viewer>');
		await waitForUpdate(el);
		const content = el.shadowRoot!.querySelector('.cm-content')!;
		expect(content.textContent).toContain('const x = 1;');
	});

	it('highlight de inhoud met een bekende taal (CM tokens)', async () => {
		el = await fixture('<nldd-code-viewer language="json">{"foo": 1, "bar": true}</nldd-code-viewer>');
		await (el as HTMLElement & { updateComplete: Promise<boolean> }).updateComplete;
		await waitForUpdate(el);
		const content = el.shadowRoot!.querySelector('.cm-content')!;
		expect(content.textContent).toContain('"foo"');
		// CodeMirror wraps highlighted tokens in <span> nodes; plain text has none.
		expect(content.querySelectorAll('span').length).toBeGreaterThan(0);
	});

	it('onbekende taal: rendert plain zonder fout', async () => {
		el = await fixture('<nldd-code-viewer language="not-a-real-language">plain text</nldd-code-viewer>');
		await (el as HTMLElement & { updateComplete: Promise<boolean> }).updateComplete;
		await waitForUpdate(el);
		const content = el.shadowRoot!.querySelector('.cm-content')!;
		expect(content.textContent).toContain('plain text');
	});


	/* ============================================================
	   Container (box + background)
	   ============================================================ */

	it('defaults to variant="box" + background="tinted"', async () => {
		el = await fixture('<nldd-code-viewer>x</nldd-code-viewer>');
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('box');
		expect(el.getAttribute('background')).toBe('tinted');
	});

	it('reflects variant attribute', async () => {
		el = await fixture('<nldd-code-viewer variant="simple">x</nldd-code-viewer>');
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('simple');
		expect((el as { variant?: string }).variant).toBe('simple');
	});

	it('variant="simple" zeroes the box CSS — corner-radius and padding', async () => {
		el = await fixture('<nldd-code-viewer variant="simple">x</nldd-code-viewer>');
		await waitForUpdate(el);
		const block = el.shadowRoot!.querySelector<HTMLElement>('.code-viewer')!;
		const cs = getComputedStyle(block);
		expect(parseFloat(cs.borderTopLeftRadius)).toBe(0);
		expect(parseFloat(cs.paddingTop)).toBe(0);
		expect(parseFloat(cs.paddingLeft)).toBe(0);
		expect(cs.backgroundColor).toBe('rgba(0, 0, 0, 0)');
	});

	it('background attribute reflects each value', async () => {
		for (const bg of ['tinted', 'base'] as const) {
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
			await vi.advanceTimersByTimeAsync(2100);
			await litEl.updateComplete;
			expect((el as unknown as NLDDCodeViewer)._copyState).toBe('idle');
		} finally {
			vi.useRealTimers();
			Object.defineProperty(navigator, 'clipboard', { value: originalClipboard, configurable: true });
		}
	});

	it('tooltip dismiss (Escape) resets copy state to idle and cancels the timer', async () => {
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
			const tooltip = el.shadowRoot!.querySelector('.code-viewer__copy-button nldd-tooltip')!;
			tooltip.dispatchEvent(new CustomEvent('nldd-tooltip-dismiss', { bubbles: true, composed: true }));
			await litEl.updateComplete;
			expect((el as unknown as NLDDCodeViewer)._copyState).toBe('idle');
			expect(tooltip.hasAttribute('open')).toBe(false);
			await vi.advanceTimersByTimeAsync(2100);
			await litEl.updateComplete;
			expect((el as unknown as NLDDCodeViewer)._copyState).toBe('idle');
		} finally {
			vi.useRealTimers();
			Object.defineProperty(navigator, 'clipboard', { value: originalClipboard, configurable: true });
		}
	});
});
