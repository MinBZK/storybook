import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import type { NLDDProgress } from './progress.js';
import './progress.js';

describe('nldd-progress', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without errors', async () => {
		el = await fixture('<nldd-progress></nldd-progress>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults text to empty (falls back to translated "Laden")', async () => {
		el = await fixture<NLDDProgress>('<nldd-progress></nldd-progress>');
		await waitForUpdate(el);
		expect((el as unknown as NLDDProgress).text).toBe('');
	});

	it('hides the indicator initially so brief loads do not flash a spinner', async () => {
		el = await fixture('<nldd-progress></nldd-progress>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.progress__indicator')).toBeNull();
	});

	it('shows the indicator after the 1000ms delay elapses', async () => {
		// Timer-dependent tests in this file use vi.useFakeTimers + direct
		// litEl.updateComplete instead of the shared waitForUpdate helper —
		// waitForUpdate's internal setTimeout(0) would never fire under fake
		// timers and the test would hang.
		vi.useFakeTimers();
		try {
			el = await fixture<NLDDProgress>('<nldd-progress></nldd-progress>');
			const litEl = el as HTMLElement & { updateComplete: Promise<boolean> };
			await litEl.updateComplete;
			expect(el.shadowRoot!.querySelector('.progress__indicator')).toBeNull();
			await vi.advanceTimersByTimeAsync(1000);
			await litEl.updateComplete;
			expect(el.shadowRoot!.querySelector('.progress__indicator')).not.toBeNull();
		} finally {
			vi.useRealTimers();
		}
	});

	it('resets the delay timer on disconnect + reconnect and re-fires after 1000ms', async () => {
		// Removing and re-inserting the element restarts the 1000ms wait and
		// hides the indicator again — by design. Consumers who want the timer
		// to run only once should toggle `hidden` or visibility instead of
		// unmounting the element.
		vi.useFakeTimers();
		try {
			el = await fixture<NLDDProgress>('<nldd-progress></nldd-progress>');
			const litEl = el as HTMLElement & { updateComplete: Promise<boolean> };
			await litEl.updateComplete;
			// First timer fires → indicator visible.
			await vi.advanceTimersByTimeAsync(1000);
			await litEl.updateComplete;
			expect(el.shadowRoot!.querySelector('.progress__indicator')).not.toBeNull();
			// Detach + re-attach to trigger the reconnect path.
			const parent = el.parentElement!;
			parent.removeChild(el);
			parent.appendChild(el);
			await litEl.updateComplete;
			expect(el.shadowRoot!.querySelector('.progress__indicator')).toBeNull();
			// Another 1000ms makes it reappear.
			await vi.advanceTimersByTimeAsync(1000);
			await litEl.updateComplete;
			expect(el.shadowRoot!.querySelector('.progress__indicator')).not.toBeNull();
		} finally {
			vi.useRealTimers();
		}
	});
});
