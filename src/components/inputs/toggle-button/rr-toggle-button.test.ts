import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRToggleButton } from './rr-toggle-button.ts';
import './rr-toggle-button.ts';


/* ============================================================
   Rendering
   ============================================================ */

describe('rr-toggle-button', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-toggle-button></rr-toggle-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a button element by default', async () => {
		el = await fixture('<rr-toggle-button>Label</rr-toggle-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('button')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('input')).toBeNull();
	});

	it('type=checkbox renders an input[type=checkbox]', async () => {
		el = await fixture('<rr-toggle-button type="checkbox">Label</rr-toggle-button>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector<HTMLInputElement>('input');
		expect(input).not.toBeNull();
		expect(input!.type).toBe('checkbox');
	});

	it('type=radio renders an input[type=radio]', async () => {
		el = await fixture('<rr-toggle-button type="radio">Label</rr-toggle-button>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector<HTMLInputElement>('input');
		expect(input).not.toBeNull();
		expect(input!.type).toBe('radio');
	});

	it('checkbox/radio renders a label wrapper', async () => {
		el = await fixture('<rr-toggle-button type="checkbox">Label</rr-toggle-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('label')).not.toBeNull();
	});
});


/* ============================================================
   Toestand
   ============================================================ */

describe('rr-toggle-button – toestand', () => {
	let el: RRToggleButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('selected is false by default', async () => {
		el = await fixture<RRToggleButton>('<rr-toggle-button></rr-toggle-button>');
		await waitForUpdate(el);
		expect(el.selected).toBe(false);
	});

	it('selected reflects as attribute', async () => {
		el = await fixture<RRToggleButton>('<rr-toggle-button selected></rr-toggle-button>');
		await waitForUpdate(el);
		expect(el.hasAttribute('selected')).toBe(true);
	});

	it('disabled reflects as attribute', async () => {
		el = await fixture<RRToggleButton>('<rr-toggle-button disabled></rr-toggle-button>');
		await waitForUpdate(el);
		expect(el.hasAttribute('disabled')).toBe(true);
	});

	it('button type: button has aria-pressed=false when not selected', async () => {
		el = await fixture<RRToggleButton>('<rr-toggle-button>Label</rr-toggle-button>');
		await waitForUpdate(el);
		const button = el.shadowRoot!.querySelector('button')!;
		expect(button.getAttribute('aria-pressed')).toBe('false');
	});

	it('button type: button has aria-pressed=true when selected', async () => {
		el = await fixture<RRToggleButton>('<rr-toggle-button selected>Label</rr-toggle-button>');
		await waitForUpdate(el);
		const button = el.shadowRoot!.querySelector('button')!;
		expect(button.getAttribute('aria-pressed')).toBe('true');
	});

	it('checkbox type: input.checked matches selected property', async () => {
		el = await fixture<RRToggleButton>('<rr-toggle-button type="checkbox" selected>Label</rr-toggle-button>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
		expect(input.checked).toBe(true);
	});

	it('checkbox type: input is disabled when disabled attribute is set', async () => {
		el = await fixture<RRToggleButton>('<rr-toggle-button type="checkbox" disabled>Label</rr-toggle-button>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
		expect(input.disabled).toBe(true);
	});

	it('forwards name to the input', async () => {
		el = await fixture<RRToggleButton>('<rr-toggle-button type="checkbox" name="filter">Label</rr-toggle-button>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
		expect(input.name).toBe('filter');
	});

	it('forwards value to the input', async () => {
		el = await fixture<RRToggleButton>('<rr-toggle-button type="checkbox" value="optie-a">Label</rr-toggle-button>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
		expect(input.value).toBe('optie-a');
	});
});


/* ============================================================
   Interactie – type=button
   ============================================================ */

describe('rr-toggle-button – interactie (button)', () => {
	let el: RRToggleButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('clicking toggles selected', async () => {
		el = await fixture<RRToggleButton>('<rr-toggle-button>Label</rr-toggle-button>');
		await waitForUpdate(el);
		el.shadowRoot!.querySelector('button')!.click();
		await waitForUpdate(el);
		expect(el.selected).toBe(true);
	});

	it('clicking again deselects', async () => {
		el = await fixture<RRToggleButton>('<rr-toggle-button selected>Label</rr-toggle-button>');
		await waitForUpdate(el);
		el.shadowRoot!.querySelector('button')!.click();
		await waitForUpdate(el);
		expect(el.selected).toBe(false);
	});

	it('click dispatches change event with correct detail', async () => {
		el = await fixture<RRToggleButton>('<rr-toggle-button value="optie">Label</rr-toggle-button>');
		await waitForUpdate(el);

		let detail: any;
		el.addEventListener('change', (e: Event) => { detail = (e as CustomEvent).detail; });

		el.shadowRoot!.querySelector('button')!.click();

		expect(detail).toBeDefined();
		expect(detail.selected).toBe(true);
		expect(detail.value).toBe('optie');
	});

	it('disabled button does not toggle when clicked', async () => {
		el = await fixture<RRToggleButton>('<rr-toggle-button disabled>Label</rr-toggle-button>');
		await waitForUpdate(el);
		el.shadowRoot!.querySelector('button')!.click();
		await waitForUpdate(el);
		expect(el.selected).toBe(false);
	});
});


/* ============================================================
   Interactie – type=checkbox
   ============================================================ */

describe('rr-toggle-button – interactie (checkbox)', () => {
	let el: RRToggleButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('input change syncs selected property', async () => {
		el = await fixture<RRToggleButton>('<rr-toggle-button type="checkbox">Label</rr-toggle-button>');
		await waitForUpdate(el);

		const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
		input.checked = true;
		input.dispatchEvent(new Event('change', { bubbles: true }));
		await waitForUpdate(el);

		expect(el.selected).toBe(true);
	});

	it('input change dispatches change event', async () => {
		el = await fixture<RRToggleButton>('<rr-toggle-button type="checkbox" value="check">Label</rr-toggle-button>');
		await waitForUpdate(el);

		let detail: any;
		el.addEventListener('change', (e: Event) => { detail = (e as CustomEvent).detail; });

		const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
		input.checked = true;
		input.dispatchEvent(new Event('change', { bubbles: true }));

		expect(detail?.selected).toBe(true);
		expect(detail?.value).toBe('check');
	});
});


/* ============================================================
   Interactie – type=radio
   ============================================================ */

describe('rr-toggle-button – interactie (radio)', () => {
	let el: RRToggleButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('toggle() on selected radio does nothing', async () => {
		el = await fixture<RRToggleButton>('<rr-toggle-button type="radio" selected>Label</rr-toggle-button>');
		await waitForUpdate(el);
		el.toggle();
		await waitForUpdate(el);
		expect(el.selected).toBe(true);
	});

	it('toggle() on unselected radio selects it', async () => {
		el = await fixture<RRToggleButton>('<rr-toggle-button type="radio">Label</rr-toggle-button>');
		await waitForUpdate(el);
		el.toggle();
		await waitForUpdate(el);
		expect(el.selected).toBe(true);
	});
});


/* ============================================================
   toggle() methode
   ============================================================ */

describe('rr-toggle-button – toggle()', () => {
	let el: RRToggleButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('toggle() toggles button type', async () => {
		el = await fixture<RRToggleButton>('<rr-toggle-button>Label</rr-toggle-button>');
		await waitForUpdate(el);
		el.toggle();
		expect(el.selected).toBe(true);
		el.toggle();
		expect(el.selected).toBe(false);
	});

	it('toggle() does nothing when disabled', async () => {
		el = await fixture<RRToggleButton>('<rr-toggle-button disabled>Label</rr-toggle-button>');
		await waitForUpdate(el);
		el.toggle();
		expect(el.selected).toBe(false);
	});
});


/* ============================================================
   Icoon-only detectie
   ============================================================ */

describe('rr-toggle-button – icoon-only', () => {
	let el: RRToggleButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('sets icon-only attribute when only an icon is slotted', async () => {
		el = await fixture<RRToggleButton>(`
			<rr-toggle-button accessible-label="Favoriet">
				<span slot="icon">★</span>
			</rr-toggle-button>
		`);
		await waitForUpdate(el);
		expect(el.hasAttribute('icon-only')).toBe(true);
	});

	it('does not set icon-only when there is text', async () => {
		el = await fixture<RRToggleButton>(`
			<rr-toggle-button>
				<span slot="icon">★</span>
				Label
			</rr-toggle-button>
		`);
		await waitForUpdate(el);
		expect(el.hasAttribute('icon-only')).toBe(false);
	});

	it('does not set icon-only when there is no icon slot', async () => {
		el = await fixture<RRToggleButton>('<rr-toggle-button>Label</rr-toggle-button>');
		await waitForUpdate(el);
		expect(el.hasAttribute('icon-only')).toBe(false);
	});

	it('warns when icon-only without accessible-label', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

		el = await fixture<RRToggleButton>(`
			<rr-toggle-button>
				<span slot="icon">★</span>
			</rr-toggle-button>
		`);
		await waitForUpdate(el);

		expect(warnSpy).toHaveBeenCalledWith(
			expect.stringContaining('accessible-label')
		);

		warnSpy.mockRestore();
	});

	it('does not warn when icon-only with accessible-label', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

		el = await fixture<RRToggleButton>(`
			<rr-toggle-button accessible-label="Favoriet">
				<span slot="icon">★</span>
			</rr-toggle-button>
		`);
		await waitForUpdate(el);

		expect(warnSpy).not.toHaveBeenCalled();

		warnSpy.mockRestore();
	});
});


/* ============================================================
   Toegankelijkheid
   ============================================================ */

describe('rr-toggle-button – toegankelijkheid', () => {
	let el: RRToggleButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('forwards accessible-label to button aria-label', async () => {
		el = await fixture<RRToggleButton>('<rr-toggle-button accessible-label="Sluiten">✕</rr-toggle-button>');
		await waitForUpdate(el);
		const button = el.shadowRoot!.querySelector('button')!;
		expect(button.getAttribute('aria-label')).toBe('Sluiten');
	});

	it('forwards accessible-label to input aria-label', async () => {
		el = await fixture<RRToggleButton>('<rr-toggle-button type="checkbox" accessible-label="Sluiten">✕</rr-toggle-button>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.getAttribute('aria-label')).toBe('Sluiten');
	});

	it('does not set aria-label when accessible-label is empty', async () => {
		el = await fixture<RRToggleButton>('<rr-toggle-button>Label</rr-toggle-button>');
		await waitForUpdate(el);
		const button = el.shadowRoot!.querySelector('button')!;
		expect(button.hasAttribute('aria-label')).toBe(false);
	});
});
