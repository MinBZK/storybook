import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.js';
import type { NLDDTimelineTrackCell } from './timeline-track-cell.js';
import './timeline-track-cell.js';

describe('nldd-timeline-track-cell', () => {
	let el: NLDDTimelineTrackCell;

	afterEach(() => {
		if (el) cleanup(el);
	});

	const marker = () => el.shadowRoot!.querySelector('.timeline-track-cell__marker');

	it('renders without error', async () => {
		el = await fixture<NLDDTimelineTrackCell>('<nldd-timeline-track-cell></nldd-timeline-track-cell>');
		await waitForUpdate(el);

		expect(el.shadowRoot).not.toBeNull();
	});

	it('stays a bare marker without content', async () => {
		el = await fixture<NLDDTimelineTrackCell>('<nldd-timeline-track-cell></nldd-timeline-track-cell>');
		await waitForUpdate(el);

		expect(marker()!.textContent?.trim()).toBe('');
	});

	it('renders a number in the marker', async () => {
		el = await fixture<NLDDTimelineTrackCell>('<nldd-timeline-track-cell variant="step" text="2"></nldd-timeline-track-cell>');
		await waitForUpdate(el);

		expect(el.shadowRoot!.querySelector('.timeline-track-cell__text')?.textContent?.trim()).toBe('2');
	});

	it('renders an icon in the marker, which wins from text', async () => {
		el = await fixture<NLDDTimelineTrackCell>('<nldd-timeline-track-cell variant="step" text="2" icon="check-mark"></nldd-timeline-track-cell>');
		await waitForUpdate(el);

		expect(el.shadowRoot!.querySelector('nldd-icon')?.getAttribute('name')).toBe('check-mark');
		expect(el.shadowRoot!.querySelector('.timeline-track-cell__text')).toBeNull();
	});

	it('takes slotted content in the marker', async () => {
		el = await fixture<NLDDTimelineTrackCell>('<nldd-timeline-track-cell variant="step"><nldd-icon name="check-mark"></nldd-icon></nldd-timeline-track-cell>');
		await waitForUpdate(el);

		expect(marker()!.querySelector('slot')).not.toBeNull();
	});

	it('accepts the current step', async () => {
		el = await fixture<NLDDTimelineTrackCell>('<nldd-timeline-track-cell status="current"></nldd-timeline-track-cell>');
		await waitForUpdate(el);

		expect(el.getAttribute('status')).toBe('current');
		expect(marker()).not.toBeNull();
	});

	it('reflects the direction so the track can flip its traveled half', async () => {
		el = await fixture<NLDDTimelineTrackCell>('<nldd-timeline-track-cell status="current" direction="up"></nldd-timeline-track-cell>');
		await waitForUpdate(el);

		// The colors themselves are asserted in the browser: the design tokens
		// are not loaded here, so every background computes to transparent.
		expect(el.getAttribute('direction')).toBe('up');
		expect(el.shadowRoot!.querySelector('.timeline-track-cell__top-line')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('.timeline-track-cell__bottom-line')).not.toBeNull();
	});

	it('leaves the direction attribute off by default', async () => {
		el = await fixture<NLDDTimelineTrackCell>('<nldd-timeline-track-cell status="current"></nldd-timeline-track-cell>');
		await waitForUpdate(el);

		expect(el.hasAttribute('direction')).toBe(false);
	});

	it('reflects minor so the styles can size the marker down', async () => {
		el = await fixture<NLDDTimelineTrackCell>('<nldd-timeline-track-cell status="past"></nldd-timeline-track-cell>');
		await waitForUpdate(el);
		expect(el.hasAttribute('minor')).toBe(false);

		el.minor = true;
		await waitForUpdate(el);

		expect(el.hasAttribute('minor')).toBe(true);
	});

	it('keeps a minor marker empty, whatever content it is given', async () => {
		el = await fixture<NLDDTimelineTrackCell>('<nldd-timeline-track-cell status="past" variant="step" minor text="2" icon="check-mark">x</nldd-timeline-track-cell>');
		await waitForUpdate(el);

		expect(el.shadowRoot!.querySelector('.timeline-track-cell__text')).toBeNull();
		expect(el.shadowRoot!.querySelector('.timeline-track-cell__icon')).toBeNull();
		expect(el.shadowRoot!.querySelector('slot')).toBeNull();
	});

	it('keeps every marker empty in the dot variant', async () => {
		el = await fixture<NLDDTimelineTrackCell>('<nldd-timeline-track-cell status="past" text="2"></nldd-timeline-track-cell>');
		await waitForUpdate(el);

		expect(el.shadowRoot!.querySelector('.timeline-track-cell__text')).toBeNull();
		expect(el.shadowRoot!.querySelector('slot')).toBeNull();
	});

	it('renders a full line for status=none', async () => {
		el = await fixture<NLDDTimelineTrackCell>('<nldd-timeline-track-cell status="none"></nldd-timeline-track-cell>');
		await waitForUpdate(el);

		expect(el.shadowRoot!.querySelector('.timeline-track-cell__full-line')).not.toBeNull();
		expect(marker()).toBeNull();
	});
});
