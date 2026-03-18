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
   State
   ============================================================ */

describe('rr-toggle-button – state', () => {
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
   Icon detection
   ============================================================ */

describe('rr-toggle-button – icon detection', () => {
	let el: RRToggleButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders no shadow icon when there is no rr-icon', async () => {
		el = await fixture<RRToggleButton>('<rr-toggle-button>Label</rr-toggle-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.toggle-button__icon')).toBeNull();
	});

	it('renders a shadow icon when rr-icon is present', async () => {
		el = await fixture<RRToggleButton>(`
			<rr-toggle-button>
				<rr-icon name="heart"></rr-icon>
				Label
			</rr-toggle-button>
		`);
		await waitForUpdate(el);
		const icon = el.shadowRoot!.querySelector('.toggle-button__icon');
		expect(icon).not.toBeNull();
		expect(icon!.getAttribute('name')).toBe('heart');
	});

	it('hides the slotted rr-icon', async () => {
		el = await fixture<RRToggleButton>(`
			<rr-toggle-button>
				<rr-icon name="heart"></rr-icon>
				Label
			</rr-toggle-button>
		`);
		await waitForUpdate(el);
		// The slotted icon should be hidden via ::slotted(rr-icon) { display: none }
		// We verify _iconName is set correctly instead
		expect(el._iconName).toBe('heart');
	});

	it('re-detects when an icon is dynamically added', async () => {
		el = await fixture<RRToggleButton>('<rr-toggle-button>Label</rr-toggle-button>');
		await waitForUpdate(el);
		expect(el._iconName).toBeNull();

		const icon = document.createElement('rr-icon');
		icon.setAttribute('name', 'plus');
		el.prepend(icon);
		await waitForUpdate(el);

		expect(el._iconName).toBe('plus');
	});

	it('re-detects when an icon is dynamically removed', async () => {
		el = await fixture<RRToggleButton>(`
			<rr-toggle-button>
				<rr-icon name="heart"></rr-icon>
				Label
			</rr-toggle-button>
		`);
		await waitForUpdate(el);
		expect(el._iconName).toBe('heart');

		el.querySelector('rr-icon')!.remove();
		await waitForUpdate(el);

		expect(el._iconName).toBeNull();
	});

	it('disconnects observer when removed from DOM', async () => {
		el = await fixture<RRToggleButton>('<rr-toggle-button>Label</rr-toggle-button>');
		await waitForUpdate(el);
		expect((el as any)._observer).not.toBeNull();

		el.remove();
		expect((el as any)._observer).toBeNull();
	});

	it('re-creates observer when re-inserted into DOM', async () => {
		el = await fixture<RRToggleButton>('<rr-toggle-button>Label</rr-toggle-button>');
		await waitForUpdate(el);

		const parent = el.parentElement!;
		el.remove();
		expect((el as any)._observer).toBeNull();

		parent.appendChild(el);
		await waitForUpdate(el);
		expect((el as any)._observer).not.toBeNull();
	});
});


/* ============================================================
   Icon-only detection
   ============================================================ */

describe('rr-toggle-button – icon-only', () => {
	let el: RRToggleButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('sets icon-only attribute when only an icon is present', async () => {
		el = await fixture<RRToggleButton>(`
			<rr-toggle-button accessible-label="Favoriet">
				<rr-icon name="heart"></rr-icon>
			</rr-toggle-button>
		`);
		await waitForUpdate(el);
		expect(el.hasAttribute('icon-only')).toBe(true);
	});

	it('does not set icon-only when there is text', async () => {
		el = await fixture<RRToggleButton>(`
			<rr-toggle-button>
				<rr-icon name="heart"></rr-icon>
				Label
			</rr-toggle-button>
		`);
		await waitForUpdate(el);
		expect(el.hasAttribute('icon-only')).toBe(false);
	});

	it('does not set icon-only when there is no icon', async () => {
		el = await fixture<RRToggleButton>('<rr-toggle-button>Label</rr-toggle-button>');
		await waitForUpdate(el);
		expect(el.hasAttribute('icon-only')).toBe(false);
	});

	it('warns when icon-only without accessible-label', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

		el = await fixture<RRToggleButton>(`
			<rr-toggle-button>
				<rr-icon name="heart"></rr-icon>
			</rr-toggle-button>
		`);
		await waitForUpdate(el);

		expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('accessible-label'));
		warnSpy.mockRestore();
	});

	it('does not warn when icon-only with accessible-label', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

		el = await fixture<RRToggleButton>(`
			<rr-toggle-button accessible-label="Favoriet">
				<rr-icon name="heart"></rr-icon>
			</rr-toggle-button>
		`);
		await waitForUpdate(el);

		expect(warnSpy).not.toHaveBeenCalled();
		warnSpy.mockRestore();
	});
});


/* ============================================================
   Interaction – type=button
   ============================================================ */

describe('rr-toggle-button – interaction (button)', () => {
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

		expect(detail?.selected).toBe(true);
		expect(detail?.value).toBe('optie');
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
   Interaction – type=checkbox
   ============================================================ */

describe('rr-toggle-button – interaction (checkbox)', () => {
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
   Interaction – type=radio
   ============================================================ */

describe('rr-toggle-button – interaction (radio)', () => {
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
   toggle() method
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
   Accessibility
   ============================================================ */

describe('rr-toggle-button – accessibility', () => {
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
