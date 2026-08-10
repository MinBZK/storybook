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

	it('tekent bij position="only" geen lijn boven en geen lijn eronder', async () => {
		el = await fixture('<nldd-timeline-track-cell position="only"></nldd-timeline-track-cell>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.timeline-track-cell__top-line')).toBeNull();
		expect(el.shadowRoot!.querySelector('.timeline-track-cell__bottom-line')).toBeNull();
		expect(el.shadowRoot!.querySelector('.timeline-track-cell__marker')).not.toBeNull();
	});

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

	// The row reserves a divider's worth of space below itself, so a line that
	// stops at the cell's edge breaks the track at every row boundary. Measured
	// on the declaration, not on two stacked rows: the row's padding bleed only
	// settles after a layout pass, which makes a pixel comparison flaky here.
	it('laat de neergaande lijnen over de rijgrens doorlopen', async () => {
		// The token itself comes from variables.css, which the test page doesn't
		// load, so set it here: what's being checked is that the line reaches past
		// the cell by exactly that thickness.
		el = await fixture<NLDDTimelineTrackCell>('<nldd-timeline-track-cell position="first"></nldd-timeline-track-cell>');
		el.style.setProperty('--semantics-dividers-thickness', '1px');
		await waitForUpdate(el);
		const onder = el.shadowRoot!.querySelector('.timeline-track-cell__bottom-line')!;
		expect(getComputedStyle(onder).bottom).toBe('-1px');

		el = await fixture<NLDDTimelineTrackCell>('<nldd-timeline-track-cell status="none"></nldd-timeline-track-cell>');
		el.style.setProperty('--semantics-dividers-thickness', '1px');
		await waitForUpdate(el);
		const vol = el.shadowRoot!.querySelector('.timeline-track-cell__full-line')!;
		expect(getComputedStyle(vol).bottom).toBe('-1px');
	});

	it('renders a full line for status=none', async () => {
		el = await fixture<NLDDTimelineTrackCell>('<nldd-timeline-track-cell status="none"></nldd-timeline-track-cell>');
		await waitForUpdate(el);

		expect(el.shadowRoot!.querySelector('.timeline-track-cell__full-line')).not.toBeNull();
		expect(marker()).toBeNull();
	});

	it('injects a @container rule for hide-below (md → max-width 640px)', async () => {
		el = await fixture<NLDDTimelineTrackCell>('<nldd-timeline-track-cell hide-below="md"></nldd-timeline-track-cell>');
		await waitForUpdate(el);
		const injected = Array.from(el.shadowRoot!.querySelectorAll('style')).find((s) =>
			s.textContent?.includes('@container'),
		);
		expect(injected?.textContent).toContain('max-width: 640px');
		expect(injected?.textContent).toContain('display: none');
	});

	it('injects a @container rule for hide-above (md → min-width 1008px)', async () => {
		el = await fixture<NLDDTimelineTrackCell>('<nldd-timeline-track-cell hide-above="md"></nldd-timeline-track-cell>');
		await waitForUpdate(el);
		const injected = Array.from(el.shadowRoot!.querySelectorAll('style')).find((s) =>
			s.textContent?.includes('@container'),
		);
		expect(injected?.textContent).toContain('min-width: 1008px');
	});
});
