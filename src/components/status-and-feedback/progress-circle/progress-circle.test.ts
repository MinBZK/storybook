import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import type { NLDDProgressCircle } from './progress-circle.js';
import './progress-circle.js';

describe('nldd-progress-circle', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without errors', async () => {
		el = await fixture('<nldd-progress-circle></nldd-progress-circle>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
		expect(el.shadowRoot!.querySelector('svg')).not.toBeNull();
	});

	it('defaults to mode="progress", max=100, size="32", color="accent"', async () => {
		el = await fixture<NLDDProgressCircle>('<nldd-progress-circle></nldd-progress-circle>');
		await waitForUpdate(el);
		const bar = el as unknown as NLDDProgressCircle;
		expect(bar.mode).toBe('progress');
		expect(bar.max).toBe(100);
		expect(bar.size).toBe('32');
		expect(bar.color).toBe('accent');
	});

	it('renders a label below when text is set', async () => {
		el = await fixture('<nldd-progress-circle value="60" text="Uploaden"></nldd-progress-circle>');
		await waitForUpdate(el);
		const label = el.shadowRoot!.querySelector('.progress-circle__text')!;
		expect(label.textContent).toBe('Uploaden');
	});

	it('omits the label when no text is set', async () => {
		el = await fixture('<nldd-progress-circle value="60"></nldd-progress-circle>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.progress-circle__text')).toBeNull();
	});

	it('sets role=progressbar with valuemin/valuemax/valuenow', async () => {
		el = await fixture('<nldd-progress-circle max="200" value="50"></nldd-progress-circle>');
		await waitForUpdate(el);
		const wrapper = el.shadowRoot!.querySelector('.progress-circle__circle')!;
		expect(wrapper.getAttribute('role')).toBe('progressbar');
		expect(wrapper.getAttribute('aria-valuemin')).toBe('0');
		expect(wrapper.getAttribute('aria-valuemax')).toBe('200');
		expect(wrapper.getAttribute('aria-valuenow')).toBe('50');
	});

	it('single-value aria-valuetext reads "X% voltooid"', async () => {
		el = await fixture('<nldd-progress-circle value="60"></nldd-progress-circle>');
		await waitForUpdate(el);
		const wrapper = el.shadowRoot!.querySelector('.progress-circle__circle')!;
		expect(wrapper.getAttribute('aria-valuetext')).toBe('60% voltooid');
	});

	it('indeterminate omits aria-valuenow and reads loading text', async () => {
		el = await fixture('<nldd-progress-circle indeterminate></nldd-progress-circle>');
		await waitForUpdate(el);
		const wrapper = el.shadowRoot!.querySelector('.progress-circle__circle')!;
		expect(wrapper.getAttribute('aria-valuenow')).toBe('');
		expect(wrapper.getAttribute('aria-valuetext')).toBe('Aan het laden');
		expect(el.shadowRoot!.querySelector('.progress-circle__indeterminate-indicator')).not.toBeNull();
	});

	it('renders one segment circle per slotted segment', async () => {
		el = await fixture(`
			<nldd-progress-circle max="100">
				<nldd-progress-circle-segment value="30" color="success"></nldd-progress-circle-segment>
				<nldd-progress-circle-segment value="20" color="accent"></nldd-progress-circle-segment>
			</nldd-progress-circle>
		`);
		await waitForUpdate(el);
		const segments = el.shadowRoot!.querySelectorAll('.progress-circle__segment');
		expect(segments.length).toBe(2);
	});

	it('distribution mode reads aria-valuetext as enumerated percentages', async () => {
		el = await fixture(`
			<nldd-progress-circle mode="distribution" max="500">
				<nldd-progress-circle-segment value="200" name="Foto's"></nldd-progress-circle-segment>
				<nldd-progress-circle-segment value="150" name="Video's"></nldd-progress-circle-segment>
			</nldd-progress-circle>
		`);
		await waitForUpdate(el);
		const wrapper = el.shadowRoot!.querySelector('.progress-circle__circle')!;
		expect(wrapper.getAttribute('aria-valuetext')).toBe("Foto's: 40%, Video's: 30%");
	});

	it('accessible-label overrides aria-valuetext', async () => {
		el = await fixture('<nldd-progress-circle value="60" accessible-label="Custom"></nldd-progress-circle>');
		await waitForUpdate(el);
		const wrapper = el.shadowRoot!.querySelector('.progress-circle__circle')!;
		expect(wrapper.getAttribute('aria-valuetext')).toBe('Custom');
	});
});

describe('nldd-progress-circle-segment', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without errors', async () => {
		el = await fixture('<nldd-progress-circle-segment value="30"></nldd-progress-circle-segment>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});
});
