import { describe, it, expect, afterEach } from 'vitest';
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

	it('resets the delay timer on disconnect + reconnect', async () => {
		// Document the by-design behaviour: removing the element and
		// re-inserting it restarts the 1000ms wait and hides the indicator
		// again. Consumers who want the timer to run only once should toggle
		// `hidden` or visibility instead of unmounting.
		el = await fixture<NLDDProgress>('<nldd-progress></nldd-progress>');
		await waitForUpdate(el);
		// Force the visible state to simulate the timer having fired.
		(el as unknown as { _visible: boolean })._visible = true;
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.progress__indicator')).not.toBeNull();
		const parent = el.parentElement!;
		parent.removeChild(el);
		parent.appendChild(el);
		await waitForUpdate(el);
		// Indicator is hidden again after reconnect; the new timeout has not yet fired.
		expect(el.shadowRoot!.querySelector('.progress__indicator')).toBeNull();
	});
});
