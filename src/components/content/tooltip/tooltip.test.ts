import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { NLDDTooltip } from './tooltip.ts';
import './tooltip.ts';

function isTooltipVisible(el: NLDDTooltip): boolean {
	const tooltip = el.shadowRoot!.querySelector('.tooltip');
	return tooltip?.classList.contains('is-visible') || tooltip?.classList.contains('is-focus-visible') || false;
}

describe('nldd-tooltip', () => {
	let el: NLDDTooltip;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('rendert zonder fouten', async () => {
		el = await fixture<NLDDTooltip>('<nldd-tooltip text="Test"></nldd-tooltip>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('rendert tooltip met aria-hidden', async () => {
		el = await fixture<NLDDTooltip>('<nldd-tooltip text="Test"></nldd-tooltip>');
		await waitForUpdate(el);
		const tooltip = el.shadowRoot!.querySelector('.tooltip');
		expect(tooltip).not.toBeNull();
		expect(tooltip!.getAttribute('aria-hidden')).toBe('true');
	});

	it('toont de tooltip tekst', async () => {
		el = await fixture<NLDDTooltip>('<nldd-tooltip text="Helptekst"></nldd-tooltip>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.tooltip__body')?.textContent?.trim()).toBe('Helptekst');
	});

	it('tooltip is standaard niet zichtbaar', async () => {
		el = await fixture<NLDDTooltip>('<nldd-tooltip text="Test"></nldd-tooltip>');
		await waitForUpdate(el);
		expect(isTooltipVisible(el)).toBe(false);
	});

	it('standaard placement is bottom', async () => {
		el = await fixture<NLDDTooltip>('<nldd-tooltip text="Test"></nldd-tooltip>');
		await waitForUpdate(el);
		expect(el.placement).toBe('bottom');
	});
});

describe('nldd-tooltip – show/hide', () => {
	let el: NLDDTooltip;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('wordt zichtbaar bij mouseenter op trigger', async () => {
		el = await fixture<NLDDTooltip>('<nldd-tooltip text="Test"><button>Trigger</button></nldd-tooltip>');
		await waitForUpdate(el);

		const trigger = el.querySelector('button')!;
		trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
		await waitForUpdate(el);

		expect(isTooltipVisible(el)).toBe(true);
	});

	it('wordt zichtbaar bij focusin op trigger', async () => {
		el = await fixture<NLDDTooltip>('<nldd-tooltip text="Test"><button>Trigger</button></nldd-tooltip>');
		await waitForUpdate(el);

		const trigger = el.querySelector('button')!;
		trigger.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
		await waitForUpdate(el);

		expect(isTooltipVisible(el)).toBe(true);
	});

	it('wordt verborgen bij mouseleave', async () => {
		el = await fixture<NLDDTooltip>('<nldd-tooltip text="Test"><button>Trigger</button></nldd-tooltip>');
		await waitForUpdate(el);

		const trigger = el.querySelector('button')!;
		trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
		await waitForUpdate(el);
		trigger.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
		await new Promise(resolve => setTimeout(resolve, 250));

		expect(isTooltipVisible(el)).toBe(false);
	});

	it('blijft zichtbaar bij tooltip hover', async () => {
		el = await fixture<NLDDTooltip>('<nldd-tooltip text="Test"><button>Trigger</button></nldd-tooltip>');
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
		el = await fixture<NLDDTooltip>('<nldd-tooltip text="Test"><button>Trigger</button></nldd-tooltip>');
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
		el = await fixture<NLDDTooltip>('<nldd-tooltip text=""><button>Trigger</button></nldd-tooltip>');
		await waitForUpdate(el);

		const trigger = el.querySelector('button')!;
		trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
		await waitForUpdate(el);

		expect(isTooltipVisible(el)).toBe(false);
	});
});

describe('nldd-tooltip – aria-describedby', () => {
	let el: NLDDTooltip;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('zet aria-describedby op het trigger element', async () => {
		el = await fixture<NLDDTooltip>(`
			<nldd-tooltip text="Helptekst">
				<button>Trigger</button>
			</nldd-tooltip>
		`);
		await waitForUpdate(el);

		const trigger = el.querySelector('button');
		const describedBy = trigger?.getAttribute('aria-describedby');
		expect(describedBy).toBeTruthy();

		const descriptionEl = document.getElementById(describedBy!);
		expect(descriptionEl).not.toBeNull();
		expect(descriptionEl?.textContent).toBe('Helptekst');
	});

	it('verwijdert aria-describedby bij lege text', async () => {
		el = await fixture<NLDDTooltip>(`
			<nldd-tooltip text="Helptekst">
				<button>Trigger</button>
			</nldd-tooltip>
		`);
		await waitForUpdate(el);

		el.text = '';
		await waitForUpdate(el);

		const trigger = el.querySelector('button');
		expect(trigger?.hasAttribute('aria-describedby')).toBe(false);
	});

	it('verwijdert description span bij disconnect', async () => {
		el = await fixture<NLDDTooltip>('<nldd-tooltip text="Test"><button>T</button></nldd-tooltip>');
		await waitForUpdate(el);
		const id = el.querySelector('button')!.getAttribute('aria-describedby')!;
		expect(document.getElementById(id)).not.toBeNull();
		cleanup(el);
		expect(document.getElementById(id)).toBeNull();
	});
});
