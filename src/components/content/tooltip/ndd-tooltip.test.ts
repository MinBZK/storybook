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

	it('wordt zichtbaar bij trigger enter', async () => {
		el = await fixture<NDDTooltip>('<ndd-tooltip text="Test"><button>Trigger</button></ndd-tooltip>');
		await waitForUpdate(el);

		el._handleTriggerEnter();
		await waitForUpdate(el);
		expect(el._visible).toBe(true);
	});

	it('wordt verborgen bij trigger leave', async () => {
		el = await fixture<NDDTooltip>('<ndd-tooltip text="Test"><button>Trigger</button></ndd-tooltip>');
		await waitForUpdate(el);

		el._handleTriggerEnter();
		await waitForUpdate(el);
		el._handleTriggerLeave();

		// Wait for hide delay
		await new Promise(resolve => setTimeout(resolve, 100));
		expect(el._visible).toBe(false);
	});

	it('blijft zichtbaar bij tooltip hover', async () => {
		el = await fixture<NDDTooltip>('<ndd-tooltip text="Test"><button>Trigger</button></ndd-tooltip>');
		await waitForUpdate(el);

		el._handleTriggerEnter();
		await waitForUpdate(el);
		el._handleTriggerLeave();
		el._handleTooltipEnter();

		await new Promise(resolve => setTimeout(resolve, 100));
		expect(el._visible).toBe(true);
	});

	it('Escape sluit de tooltip', async () => {
		el = await fixture<NDDTooltip>('<ndd-tooltip text="Test"><button>Trigger</button></ndd-tooltip>');
		await waitForUpdate(el);

		el._handleTriggerEnter();
		await waitForUpdate(el);
		expect(el._visible).toBe(true);

		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
		await waitForUpdate(el);
		expect(el._visible).toBe(false);
	});

	it('toont niet bij lege text', async () => {
		el = await fixture<NDDTooltip>('<ndd-tooltip text=""><button>Trigger</button></ndd-tooltip>');
		await waitForUpdate(el);

		el._handleTriggerEnter();
		await waitForUpdate(el);
		expect(el._visible).toBe(false);
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
