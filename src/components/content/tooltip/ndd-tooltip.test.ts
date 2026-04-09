import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { NDDTooltip } from './ndd-tooltip.ts';
import './ndd-tooltip.ts';

describe('ndd-tooltip', () => {
	let el: NDDTooltip;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('rendert zonder fouten', async () => {
		el = await fixture<NDDTooltip>('<ndd-tooltip text="Test"></ndd-tooltip>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('gebruikt display: contents', async () => {
		el = await fixture<NDDTooltip>('<ndd-tooltip text="Test"></ndd-tooltip>');
		await waitForUpdate(el);
		expect(getComputedStyle(el).display).toBe('contents');
	});

	it('rendert tooltip met role="tooltip"', async () => {
		el = await fixture<NDDTooltip>('<ndd-tooltip text="Test"></ndd-tooltip>');
		await waitForUpdate(el);
		const tooltip = el.shadowRoot!.querySelector('[role="tooltip"]');
		expect(tooltip).not.toBeNull();
	});

	it('toont de tooltip tekst', async () => {
		el = await fixture<NDDTooltip>('<ndd-tooltip text="Helptekst"></ndd-tooltip>');
		await waitForUpdate(el);
		const body = el.shadowRoot!.querySelector('.tooltip__body');
		expect(body?.textContent?.trim()).toBe('Helptekst');
	});

	it('tooltip is standaard niet zichtbaar', async () => {
		el = await fixture<NDDTooltip>('<ndd-tooltip text="Test"></ndd-tooltip>');
		await waitForUpdate(el);
		const tooltip = el.shadowRoot!.querySelector('.tooltip');
		expect(tooltip?.classList.contains('is-visible')).toBe(false);
	});

	it('zet aria-describedby op het child element', async () => {
		el = await fixture<NDDTooltip>(`
			<ndd-tooltip text="Helptekst">
				<button>Trigger</button>
			</ndd-tooltip>
		`);
		await waitForUpdate(el);
		const trigger = el.querySelector('button');
		expect(trigger?.getAttribute('aria-describedby')).toBe(el._tooltipId);
	});

	it('standaard placement is top', async () => {
		el = await fixture<NDDTooltip>('<ndd-tooltip text="Test"></ndd-tooltip>');
		await waitForUpdate(el);
		expect(el.placement).toBe('top');
	});
});
