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

	it('cancels the delay and shows immediately when timing flips to "instant" after connect', async () => {
		vi.useFakeTimers();
		try {
			el = await fixture<NLDDActivityIndicator>('<nldd-activity-indicator></nldd-activity-indicator>');
			const litEl = el as HTMLElement & { updateComplete: Promise<boolean> };
			await litEl.updateComplete;
			// default timing → hidden during the delay window
			expect(el.shadowRoot!.querySelector('.activity-indicator')).toBeNull();
			// flip to instant → visible right away, without waiting out the delay
			(el as unknown as NLDDActivityIndicator).timing = 'instant';
			await litEl.updateComplete;
			expect(el.shadowRoot!.querySelector('.activity-indicator')).not.toBeNull();
		} finally {
			vi.useRealTimers();
		}
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

	it('renders the label always (visually hidden by default; visible with show-text)', async () => {
		el = await fixture<NLDDActivityIndicator>('<nldd-activity-indicator timing="instant"></nldd-activity-indicator>');
		await waitForUpdate(el);
		const label = () => el.shadowRoot!.querySelector('.activity-indicator__text');
		// Always present (it is the announced live-region content), hidden by default.
		expect(label()).not.toBeNull();
		expect(label()!.classList.contains('activity-indicator__text--visually-hidden')).toBe(true);
		(el as unknown as NLDDActivityIndicator).showText = true;
		await waitForUpdate(el);
		expect(label()!.classList.contains('activity-indicator__text--visually-hidden')).toBe(false);
	});

	it('is a polite live region (role="status", no aria-busy/aria-label) on connect', async () => {
		el = await fixture<NLDDActivityIndicator>('<nldd-activity-indicator></nldd-activity-indicator>');
		await waitForUpdate(el);
		expect(el.getAttribute('role')).toBe('status');
		expect(el.hasAttribute('aria-busy')).toBe(false);
		expect(el.hasAttribute('aria-label')).toBe(false);
	});

	it('announces the label as visually-hidden live-region content (fallback "Laden")', async () => {
		el = await fixture<NLDDActivityIndicator>('<nldd-activity-indicator timing="instant"></nldd-activity-indicator>');
		await waitForUpdate(el);
		const label = el.shadowRoot!.querySelector('.activity-indicator__text');
		expect(label?.textContent).toBe('Laden');
		expect(label!.classList.contains('activity-indicator__text--visually-hidden')).toBe(true);
	});

	it('uses text as the announced label content', async () => {
		el = await fixture<NLDDActivityIndicator>('<nldd-activity-indicator timing="instant" text="Bezig"></nldd-activity-indicator>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.activity-indicator__text')?.textContent).toBe('Bezig');
	});

	it('clears role and hides the indicator when complete is set', async () => {
		vi.useFakeTimers();
		try {
			el = await fixture<NLDDActivityIndicator>('<nldd-activity-indicator timing="instant"></nldd-activity-indicator>');
			const litEl = el as HTMLElement & { updateComplete: Promise<boolean> };
			await litEl.updateComplete;
			expect(el.shadowRoot!.querySelector('.activity-indicator')).not.toBeNull();
			expect(el.getAttribute('role')).toBe('status');
			// Flip complete → indicator goes, role goes.
			(el as unknown as NLDDActivityIndicator).complete = true;
			await litEl.updateComplete;
			expect(el.shadowRoot!.querySelector('.activity-indicator')).toBeNull();
			expect(el.hasAttribute('role')).toBe(false);
			// And the inverse: clearing complete brings them back.
			(el as unknown as NLDDActivityIndicator).complete = false;
			await litEl.updateComplete;
			expect(el.shadowRoot!.querySelector('.activity-indicator')).not.toBeNull();
			expect(el.getAttribute('role')).toBe('status');
		} finally {
			vi.useRealTimers();
		}
	});

	it('connects with complete already set: no role, no indicator', async () => {
		vi.useFakeTimers();
		try {
			el = await fixture<NLDDActivityIndicator>('<nldd-activity-indicator complete></nldd-activity-indicator>');
			const litEl = el as HTMLElement & { updateComplete: Promise<boolean> };
			await litEl.updateComplete;
			expect(el.hasAttribute('role')).toBe(false);
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

	it('renders the backdrop when backdrop is set and the indicator is visible', async () => {
		el = await fixture('<nldd-activity-indicator timing="instant" backdrop></nldd-activity-indicator>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.activity-indicator__backdrop')).not.toBeNull();
	});

	it('blurs the content behind the backdrop', async () => {
		el = await fixture('<nldd-activity-indicator timing="instant" backdrop></nldd-activity-indicator>');
		await waitForUpdate(el);
		const bd = el.shadowRoot!.querySelector('.activity-indicator__backdrop')!;
		// Tests run in real chromium (Playwright), which computes backdrop-filter
		// from the stylesheet — so this resolves to an actual radius, e.g.
		// "blur(3px)". If the rule were dropped it would compute to "none" and
		// this assertion would fail (it can't silently pass on an empty string).
		const filter = getComputedStyle(bd).backdropFilter;
		expect(filter).toMatch(/blur\(\d/);
	});

	it('omits the backdrop by default', async () => {
		el = await fixture('<nldd-activity-indicator timing="instant"></nldd-activity-indicator>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.activity-indicator__backdrop')).toBeNull();
	});

	it('reflects the backdrop attribute', async () => {
		el = await fixture<NLDDActivityIndicator>('<nldd-activity-indicator backdrop></nldd-activity-indicator>');
		await waitForUpdate(el);
		expect(el.hasAttribute('backdrop')).toBe(true);
		expect((el as unknown as NLDDActivityIndicator).backdrop).toBe(true);
	});

	it('does not render the backdrop during the anti-flash delay', async () => {
		el = await fixture('<nldd-activity-indicator backdrop></nldd-activity-indicator>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.activity-indicator__backdrop')).toBeNull();
	});

	it('drops the backdrop when complete is set', async () => {
		vi.useFakeTimers();
		try {
			el = await fixture<NLDDActivityIndicator>('<nldd-activity-indicator timing="instant" backdrop></nldd-activity-indicator>');
			const litEl = el as HTMLElement & { updateComplete: Promise<boolean> };
			await litEl.updateComplete;
			expect(el.shadowRoot!.querySelector('.activity-indicator__backdrop')).not.toBeNull();
			(el as unknown as NLDDActivityIndicator).complete = true;
			await litEl.updateComplete;
			expect(el.shadowRoot!.querySelector('.activity-indicator__backdrop')).toBeNull();
		} finally {
			vi.useRealTimers();
		}
	});
});
