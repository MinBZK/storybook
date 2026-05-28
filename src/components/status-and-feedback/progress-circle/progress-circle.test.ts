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
		// aria-valuenow must be ABSENT (not empty) — some screenreaders read "" as "0 percent".
		expect(wrapper.hasAttribute('aria-valuenow')).toBe(false);
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

	it('reflects value, color, and name attributes', async () => {
		el = await fixture(
			'<nldd-progress-circle-segment value="40" color="success" name="Foto\'s"></nldd-progress-circle-segment>',
		);
		await waitForUpdate(el);
		const seg = el as unknown as { value: number; color: string; name: string };
		expect(seg.value).toBe(40);
		expect(seg.color).toBe('success');
		expect(seg.name).toBe("Foto's");
		expect(el.getAttribute('value')).toBe('40');
		expect(el.getAttribute('color')).toBe('success');
		expect(el.getAttribute('name')).toBe("Foto's");
	});

	it('renders no visible content (data-only element — parent renders the SVG arc)', async () => {
		el = await fixture('<nldd-progress-circle-segment value="50"></nldd-progress-circle-segment>');
		await waitForUpdate(el);
		// Lit leaves marker comments in the shadow root for empty templates;
		// what matters is that there are no actual elements.
		expect(el.shadowRoot!.querySelector('*')).toBeNull();
	});

	it('is included in the parent\'s _buildArcs output', async () => {
		const parent = await fixture(`
			<nldd-progress-circle mode="distribution" max="500">
				<nldd-progress-circle-segment value="200" color="success" name="Foto's"></nldd-progress-circle-segment>
				<nldd-progress-circle-segment value="150" color="accent" name="Video's"></nldd-progress-circle-segment>
			</nldd-progress-circle>
		`);
		await waitForUpdate(parent);
		const arcs = (parent as unknown as { _buildArcs(): Array<{ length: number; offset: number; color: string }> })._buildArcs();
		expect(arcs.length).toBe(2);
		expect(arcs[0].color).toBe('success');
		expect(arcs[1].color).toBe('accent');
		// Arc lengths are positive and the second arc's offset comes after the first's start.
		expect(arcs[0].length).toBeGreaterThan(0);
		expect(arcs[1].length).toBeGreaterThan(0);
		expect(arcs[1].offset).toBeGreaterThan(arcs[0].offset);
		cleanup(parent);
	});

	it('zero-value segment still gets pushed (with length 0) so CSS transitions can animate later', async () => {
		const parent = await fixture(`
			<nldd-progress-circle max="100">
				<nldd-progress-circle-segment value="0" color="accent"></nldd-progress-circle-segment>
				<nldd-progress-circle-segment value="40" color="success"></nldd-progress-circle-segment>
			</nldd-progress-circle>
		`);
		await waitForUpdate(parent);
		const arcs = (parent as unknown as { _buildArcs(): Array<{ length: number; offset: number; color: string }> })._buildArcs();
		expect(arcs.length).toBe(2);
		expect(arcs[0].length).toBe(0);
		expect(arcs[1].length).toBeGreaterThan(0);
		cleanup(parent);
	});
});
