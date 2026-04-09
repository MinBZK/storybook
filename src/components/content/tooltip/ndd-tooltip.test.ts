import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { NDDTooltip } from './ndd-tooltip.ts';
import './ndd-tooltip.ts';

function isTooltipVisible(el: NDDTooltip): boolean {
	return el.shadowRoot!.querySelector('.tooltip')?.classList.contains('is-visible') ?? false;
}

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

	it('rendert tooltip met role="tooltip"', async () => {
		el = await fixture<NDDTooltip>('<ndd-tooltip text="Test"></ndd-tooltip>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('[role="tooltip"]')).not.toBeNull();
	});

	it('toont de tooltip tekst', async () => {
		el = await fixture<NDDTooltip>('<ndd-tooltip text="Helptekst"></ndd-tooltip>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.tooltip__body')?.textContent?.trim()).toBe('Helptekst');
	});

	it('tooltip is standaard niet zichtbaar', async () => {
		el = await fixture<NDDTooltip>('<ndd-tooltip text="Test"></ndd-tooltip>');
		await waitForUpdate(el);
		expect(isTooltipVisible(el)).toBe(false);
	});

	it('standaard placement is top', async () => {
		el = await fixture<NDDTooltip>('<ndd-tooltip text="Test"></ndd-tooltip>');
		await waitForUpdate(el);
		expect(el.placement).toBe('top');
	});
});

describe('ndd-tooltip – show/hide', () => {
	let el: NDDTooltip;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('wordt zichtbaar bij mouseenter op trigger', async () => {
		el = await fixture<NDDTooltip>('<ndd-tooltip text="Test"><button>Trigger</button></ndd-tooltip>');
		await waitForUpdate(el);

		const trigger = el.querySelector('button')!;
		trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
		await waitForUpdate(el);

		expect(isTooltipVisible(el)).toBe(true);
	});

	it('wordt zichtbaar bij focusin op trigger', async () => {
		el = await fixture<NDDTooltip>('<ndd-tooltip text="Test"><button>Trigger</button></ndd-tooltip>');
		await waitForUpdate(el);

		const trigger = el.querySelector('button')!;
		trigger.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
		await waitForUpdate(el);

		expect(isTooltipVisible(el)).toBe(true);
	});

	it('wordt verborgen bij mouseleave', async () => {
		el = await fixture<NDDTooltip>('<ndd-tooltip text="Test"><button>Trigger</button></ndd-tooltip>');
		await waitForUpdate(el);

		const trigger = el.querySelector('button')!;
		trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
		await waitForUpdate(el);
		trigger.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
		await new Promise(resolve => setTimeout(resolve, 250));

		expect(isTooltipVisible(el)).toBe(false);
	});

	it('blijft zichtbaar bij tooltip hover', async () => {
		el = await fixture<NDDTooltip>('<ndd-tooltip text="Test"><button>Trigger</button></ndd-tooltip>');
		await waitForUpdate(el);

		const trigger = el.querySelector('button')!;
		trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
		await waitForUpdate(el);

		trigger.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
		const tooltipEl = el.shadowRoot!.querySelector('.tooltip')!;
		tooltipEl.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
		await new Promise(resolve => setTimeout(resolve, 250));

		expect(isTooltipVisible(el)).toBe(true);
	});

	it('Escape sluit de tooltip', async () => {
		el = await fixture<NDDTooltip>('<ndd-tooltip text="Test"><button>Trigger</button></ndd-tooltip>');
		await waitForUpdate(el);

		const trigger = el.querySelector('button')!;
		trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
		await waitForUpdate(el);
		expect(isTooltipVisible(el)).toBe(true);

		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
		await waitForUpdate(el);
		expect(isTooltipVisible(el)).toBe(false);
	});

	it('toont niet bij lege text', async () => {
		el = await fixture<NDDTooltip>('<ndd-tooltip text=""><button>Trigger</button></ndd-tooltip>');
		await waitForUpdate(el);

		const trigger = el.querySelector('button')!;
		trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
		await waitForUpdate(el);

		expect(isTooltipVisible(el)).toBe(false);
	});
});

describe('ndd-tooltip – aria-describedby', () => {
	let el: NDDTooltip;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('zet aria-describedby op het trigger element', async () => {
		el = await fixture<NDDTooltip>(`
			<ndd-tooltip text="Helptekst">
				<button>Trigger</button>
			</ndd-tooltip>
		`);
		await waitForUpdate(el);

		const trigger = el.querySelector('button');
		const describedBy = trigger?.getAttribute('aria-describedby');
		expect(describedBy).toBeTruthy();

		const descriptionEl = el.querySelector(`#${describedBy}`);
		expect(descriptionEl).not.toBeNull();
		expect(descriptionEl?.textContent).toBe('Helptekst');
	});

	it('verwijdert aria-describedby bij lege text', async () => {
		el = await fixture<NDDTooltip>(`
			<ndd-tooltip text="Helptekst">
				<button>Trigger</button>
			</ndd-tooltip>
		`);
		await waitForUpdate(el);

		el.text = '';
		await waitForUpdate(el);

		const trigger = el.querySelector('button');
		expect(trigger?.hasAttribute('aria-describedby')).toBe(false);
	});
});
