import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import type { NLDDActivityIndicator } from './activity-indicator.js';
import './activity-indicator.js';

describe('nldd-activity-indicator', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without errors', async () => {
		el = await fixture('<nldd-activity-indicator></nldd-activity-indicator>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults text to empty (falls back to translated "Laden")', async () => {
		el = await fixture<NLDDActivityIndicator>('<nldd-activity-indicator></nldd-activity-indicator>');
		await waitForUpdate(el);
		expect((el as unknown as NLDDActivityIndicator).text).toBe('');
	});

	it('hides the indicator initially so brief loads do not flash (timing="default")', async () => {
		el = await fixture('<nldd-activity-indicator></nldd-activity-indicator>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.activity-indicator')).toBeNull();
	});

	it('shows the indicator immediately when timing="instant"', async () => {
		el = await fixture('<nldd-activity-indicator timing="instant"></nldd-activity-indicator>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.activity-indicator')).not.toBeNull();
	});

	it('renders the default circle when the slot is empty', async () => {
		el = await fixture('<nldd-activity-indicator timing="instant"></nldd-activity-indicator>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.activity-indicator__circle')).not.toBeNull();
	});

	it('shows the indicator after the 1000ms delay elapses (timing="default")', async () => {
		// Timer-dependent tests use vi.useFakeTimers + direct updateComplete
		// instead of waitForUpdate, whose internal setTimeout(0) never fires
		// under fake timers.
		vi.useFakeTimers();
		try {
			el = await fixture<NLDDActivityIndicator>('<nldd-activity-indicator></nldd-activity-indicator>');
			const litEl = el as HTMLElement & { updateComplete: Promise<boolean> };
			await litEl.updateComplete;
			expect(el.shadowRoot!.querySelector('.activity-indicator')).toBeNull();
			await vi.advanceTimersByTimeAsync(1000);
			await litEl.updateComplete;
			expect(el.shadowRoot!.querySelector('.activity-indicator')).not.toBeNull();
		} finally {
			vi.useRealTimers();
		}
	});

	it('hides the label by default and shows it with show-text', async () => {
		el = await fixture<NLDDActivityIndicator>('<nldd-activity-indicator timing="instant"></nldd-activity-indicator>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.activity-indicator__text')).toBeNull();
		(el as unknown as NLDDActivityIndicator).showText = true;
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.activity-indicator__text')).not.toBeNull();
	});

	it('sets role="status", aria-busy and aria-label (fallback "Laden") on connect', async () => {
		el = await fixture<NLDDActivityIndicator>('<nldd-activity-indicator></nldd-activity-indicator>');
		await waitForUpdate(el);
		expect(el.getAttribute('role')).toBe('status');
		expect(el.getAttribute('aria-busy')).toBe('true');
		expect(el.getAttribute('aria-label')).toBe('Laden');
	});

	it('uses text as the accessible name even when the label is hidden', async () => {
		el = await fixture<NLDDActivityIndicator>('<nldd-activity-indicator text="Bezig"></nldd-activity-indicator>');
		await waitForUpdate(el);
		expect(el.getAttribute('aria-label')).toBe('Bezig');
		expect(el.shadowRoot!.querySelector('.activity-indicator__text')).toBeNull();
	});

	it('clears role/aria-busy and hides the indicator when complete is set', async () => {
		vi.useFakeTimers();
		try {
			el = await fixture<NLDDActivityIndicator>('<nldd-activity-indicator timing="instant"></nldd-activity-indicator>');
			const litEl = el as HTMLElement & { updateComplete: Promise<boolean> };
			await litEl.updateComplete;
			expect(el.shadowRoot!.querySelector('.activity-indicator')).not.toBeNull();
			expect(el.getAttribute('aria-busy')).toBe('true');
			// Flip complete → indicator goes, aria-busy + role go.
			(el as unknown as NLDDActivityIndicator).complete = true;
			await litEl.updateComplete;
			expect(el.shadowRoot!.querySelector('.activity-indicator')).toBeNull();
			expect(el.hasAttribute('aria-busy')).toBe(false);
			expect(el.hasAttribute('role')).toBe(false);
			// And the inverse: clearing complete brings them back.
			(el as unknown as NLDDActivityIndicator).complete = false;
			await litEl.updateComplete;
			expect(el.shadowRoot!.querySelector('.activity-indicator')).not.toBeNull();
			expect(el.getAttribute('aria-busy')).toBe('true');
		} finally {
			vi.useRealTimers();
		}
	});

	it('connects with complete already set: no aria-busy, no indicator', async () => {
		vi.useFakeTimers();
		try {
			el = await fixture<NLDDActivityIndicator>('<nldd-activity-indicator complete></nldd-activity-indicator>');
			const litEl = el as HTMLElement & { updateComplete: Promise<boolean> };
			await litEl.updateComplete;
			expect(el.hasAttribute('aria-busy')).toBe(false);
			await vi.advanceTimersByTimeAsync(1000);
			await litEl.updateComplete;
			expect(el.shadowRoot!.querySelector('.activity-indicator')).toBeNull();
		} finally {
			vi.useRealTimers();
		}
	});

	it('resets the delay timer on disconnect + reconnect and re-fires after 1000ms', async () => {
		vi.useFakeTimers();
		try {
			el = await fixture<NLDDActivityIndicator>('<nldd-activity-indicator></nldd-activity-indicator>');
			const litEl = el as HTMLElement & { updateComplete: Promise<boolean> };
			await litEl.updateComplete;
			await vi.advanceTimersByTimeAsync(1000);
			await litEl.updateComplete;
			expect(el.shadowRoot!.querySelector('.activity-indicator')).not.toBeNull();
			const parent = el.parentElement!;
			parent.removeChild(el);
			parent.appendChild(el);
			await litEl.updateComplete;
			expect(el.shadowRoot!.querySelector('.activity-indicator')).toBeNull();
			await vi.advanceTimersByTimeAsync(1000);
			await litEl.updateComplete;
			expect(el.shadowRoot!.querySelector('.activity-indicator')).not.toBeNull();
		} finally {
			vi.useRealTimers();
		}
	});
});
