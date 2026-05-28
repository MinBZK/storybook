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
});
