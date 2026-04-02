import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { NDDToggleButtonGroup } from './ndd-toggle-button-group.ts';
import type { NDDToggleButton } from '../toggle-button/ndd-toggle-button.ts';
import './ndd-toggle-button-group.ts';
import '../toggle-button/ndd-toggle-button.ts';

/* ============================================================
   Rendering
   ============================================================ */

describe('ndd-toggle-button-group', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-toggle-button-group></ndd-toggle-button-group>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('has role=group by default (type=checkbox)', async () => {
		el = await fixture('<ndd-toggle-button-group type="checkbox"></ndd-toggle-button-group>');
		await waitForUpdate(el);
		expect(el.getAttribute('role')).toBe('group');
	});

	it('has role=radiogroup for type=radio', async () => {
		el = await fixture('<ndd-toggle-button-group type="radio"></ndd-toggle-button-group>');
		await waitForUpdate(el);
		expect(el.getAttribute('role')).toBe('radiogroup');
	});

	it('has role=group for type=button', async () => {
		el = await fixture('<ndd-toggle-button-group type="button"></ndd-toggle-button-group>');
		await waitForUpdate(el);
		expect(el.getAttribute('role')).toBe('group');
	});

	it('warns when no accessible name is provided', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture('<ndd-toggle-button-group></ndd-toggle-button-group>');
		await waitForUpdate(el);
		expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('accessible name'));
		warnSpy.mockRestore();
	});

	it('does not warn when accessible-label is provided', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture(
			'<ndd-toggle-button-group accessible-label="Filters"></ndd-toggle-button-group>'
		);
		await waitForUpdate(el);
		expect(warnSpy).not.toHaveBeenCalled();
		warnSpy.mockRestore();
	});
});

/* ============================================================
   Synchronisatie
   ============================================================ */

describe('ndd-toggle-button-group – synchronisatie', () => {
	let el: NDDToggleButtonGroup;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('does not sync name to child buttons when type=button', async () => {
		el = await fixture<NDDToggleButtonGroup>(`
			<ndd-toggle-button-group type="button" name="toolbar">
				<ndd-toggle-button value="bold" text="Bold"></ndd-toggle-button>
				<ndd-toggle-button value="italic" text="Italic"></ndd-toggle-button>
			</ndd-toggle-button-group>
		`);
		await waitForUpdate(el);

		const buttons = el.querySelectorAll<NDDToggleButton>('ndd-toggle-button');
		buttons.forEach((b) => expect(b.name).toBe(''));
	});

	it('syncs type to child buttons', async () => {
		el = await fixture<NDDToggleButtonGroup>(`
			<ndd-toggle-button-group type="radio">
				<ndd-toggle-button value="a" text="A"></ndd-toggle-button>
				<ndd-toggle-button value="b" text="B"></ndd-toggle-button>
			</ndd-toggle-button-group>
		`);
		await waitForUpdate(el);

		const buttons = el.querySelectorAll<NDDToggleButton>('ndd-toggle-button');
		buttons.forEach((b) => expect(b.type).toBe('radio'));
	});

	it('syncs name to child buttons', async () => {
		el = await fixture<NDDToggleButtonGroup>(`
			<ndd-toggle-button-group type="radio" name="keuze">
				<ndd-toggle-button value="a" text="A"></ndd-toggle-button>
				<ndd-toggle-button value="b" text="B"></ndd-toggle-button>
			</ndd-toggle-button-group>
		`);
		await waitForUpdate(el);

		const buttons = el.querySelectorAll<NDDToggleButton>('ndd-toggle-button');
		buttons.forEach((b) => expect(b.name).toBe('keuze'));
	});

	it('syncs size to child buttons', async () => {
		el = await fixture<NDDToggleButtonGroup>(`
			<ndd-toggle-button-group size="sm">
				<ndd-toggle-button value="a" text="A"></ndd-toggle-button>
			</ndd-toggle-button-group>
		`);
		await waitForUpdate(el);

		const button = el.querySelector<NDDToggleButton>('ndd-toggle-button')!;
		expect(button.size).toBe('sm');
	});

	it('disables child buttons when group is disabled', async () => {
		el = await fixture<NDDToggleButtonGroup>(`
			<ndd-toggle-button-group disabled>
				<ndd-toggle-button value="a" text="A"></ndd-toggle-button>
				<ndd-toggle-button value="b" text="B"></ndd-toggle-button>
			</ndd-toggle-button-group>
		`);
		await waitForUpdate(el);

		const buttons = el.querySelectorAll<NDDToggleButton>('ndd-toggle-button');
		buttons.forEach((b) => expect(b.disabled).toBe(true));
	});

	it('re-enables group-disabled buttons when group disabled is removed', async () => {
		el = await fixture<NDDToggleButtonGroup>(`
			<ndd-toggle-button-group disabled>
				<ndd-toggle-button value="a" text="A"></ndd-toggle-button>
			</ndd-toggle-button-group>
		`);
		await waitForUpdate(el);

		el.disabled = false;
		await waitForUpdate(el);

		const button = el.querySelector<NDDToggleButton>('ndd-toggle-button')!;
		expect(button.disabled).toBe(false);
	});

	it('does not re-enable buttons that were individually disabled', async () => {
		el = await fixture<NDDToggleButtonGroup>(`
			<ndd-toggle-button-group disabled>
				<ndd-toggle-button value="a" text="A" disabled></ndd-toggle-button>
			</ndd-toggle-button-group>
		`);
		await waitForUpdate(el);

		el.disabled = false;
		await waitForUpdate(el);

		const button = el.querySelector<NDDToggleButton>('ndd-toggle-button')!;
		expect(button.disabled).toBe(true);
	});

	it('syncs buttons added after initial render', async () => {
		el = await fixture<NDDToggleButtonGroup>(`
			<ndd-toggle-button-group type="radio" name="laat">
			</ndd-toggle-button-group>
		`);
		await waitForUpdate(el);

		const button = document.createElement('ndd-toggle-button') as NDDToggleButton;
		button.setAttribute('text', 'Laat toegevoegd');
		el.appendChild(button);
		await waitForUpdate(el);

		expect(button.type).toBe('radio');
		expect(button.name).toBe('laat');
	});
});

/* ============================================================
   Single-select (radio)
   ============================================================ */

describe('ndd-toggle-button-group – single-select (radio)', () => {
	let el: NDDToggleButtonGroup;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('deselects other buttons when one is selected via change event', async () => {
		el = await fixture<NDDToggleButtonGroup>(`
			<ndd-toggle-button-group type="radio" name="keuze">
				<ndd-toggle-button value="a" text="A" selected></ndd-toggle-button>
				<ndd-toggle-button value="b" text="B"></ndd-toggle-button>
				<ndd-toggle-button value="c" text="C"></ndd-toggle-button>
			</ndd-toggle-button-group>
		`);
		await waitForUpdate(el);

		const [buttonA, buttonB] = el.querySelectorAll<NDDToggleButton>('ndd-toggle-button');

		buttonB.selected = true;
		buttonB.dispatchEvent(
			new CustomEvent('change', {
				detail: { selected: true, value: 'b' },
				bubbles: true,
			})
		);
		await waitForUpdate(el);

		expect(buttonA.selected).toBe(false);
		expect(buttonB.selected).toBe(true);
	});

	it('does not deselect others when a deselection event fires', async () => {
		el = await fixture<NDDToggleButtonGroup>(`
			<ndd-toggle-button-group type="radio" name="keuze">
				<ndd-toggle-button value="a" text="A" selected></ndd-toggle-button>
				<ndd-toggle-button value="b" text="B" selected></ndd-toggle-button>
			</ndd-toggle-button-group>
		`);
		await waitForUpdate(el);

		const [buttonA, buttonB] = el.querySelectorAll<NDDToggleButton>('ndd-toggle-button');

		buttonA.selected = false;
		buttonA.dispatchEvent(
			new CustomEvent('change', {
				detail: { selected: false, value: 'a' },
				bubbles: true,
			})
		);
		await waitForUpdate(el);

		expect(buttonB.selected).toBe(true);
	});
});

/* ============================================================
   Multi-select (checkbox)
   ============================================================ */

describe('ndd-toggle-button-group – multi-select (checkbox)', () => {
	let el: NDDToggleButtonGroup;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('allows multiple buttons to be selected simultaneously', async () => {
		el = await fixture<NDDToggleButtonGroup>(`
			<ndd-toggle-button-group type="checkbox" name="filter">
				<ndd-toggle-button value="a" text="A" selected></ndd-toggle-button>
				<ndd-toggle-button value="b" text="B" selected></ndd-toggle-button>
				<ndd-toggle-button value="c" text="C"></ndd-toggle-button>
			</ndd-toggle-button-group>
		`);
		await waitForUpdate(el);

		const buttons = el.querySelectorAll<NDDToggleButton>('ndd-toggle-button');
		expect(buttons[0].selected).toBe(true);
		expect(buttons[1].selected).toBe(true);
		expect(buttons[2].selected).toBe(false);
	});

	it('does not deselect other buttons on change', async () => {
		el = await fixture<NDDToggleButtonGroup>(`
			<ndd-toggle-button-group type="checkbox" name="filter">
				<ndd-toggle-button value="a" text="A" selected></ndd-toggle-button>
				<ndd-toggle-button value="b" text="B"></ndd-toggle-button>
			</ndd-toggle-button-group>
		`);
		await waitForUpdate(el);

		const [buttonA, buttonB] = el.querySelectorAll<NDDToggleButton>('ndd-toggle-button');

		buttonB.selected = true;
		buttonB.dispatchEvent(
			new CustomEvent('change', {
				detail: { selected: true, value: 'b' },
				bubbles: true,
			})
		);
		await waitForUpdate(el);

		expect(buttonA.selected).toBe(true);
		expect(buttonB.selected).toBe(true);
	});
});

/* ============================================================
   Toetsenbordnavigatie (radio)
   ============================================================ */

describe('ndd-toggle-button-group – toetsenbordnavigatie', () => {
	let el: NDDToggleButtonGroup;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('ArrowRight selects first button when nothing is selected', async () => {
		el = await fixture<NDDToggleButtonGroup>(`
			<ndd-toggle-button-group type="radio" name="nav">
				<ndd-toggle-button value="a" text="A"></ndd-toggle-button>
				<ndd-toggle-button value="b" text="B"></ndd-toggle-button>
				<ndd-toggle-button value="c" text="C"></ndd-toggle-button>
			</ndd-toggle-button-group>
		`);
		await waitForUpdate(el);

		el.dispatchEvent(
			new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, composed: true })
		);
		await waitForUpdate(el);

		const buttons = el.querySelectorAll<NDDToggleButton>('ndd-toggle-button');
		expect(buttons[0].selected).toBe(true);
	});

	it('ArrowLeft selects last button when nothing is selected', async () => {
		el = await fixture<NDDToggleButtonGroup>(`
			<ndd-toggle-button-group type="radio" name="nav">
				<ndd-toggle-button value="a" text="A"></ndd-toggle-button>
				<ndd-toggle-button value="b" text="B"></ndd-toggle-button>
				<ndd-toggle-button value="c" text="C"></ndd-toggle-button>
			</ndd-toggle-button-group>
		`);
		await waitForUpdate(el);

		el.dispatchEvent(
			new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, composed: true })
		);
		await waitForUpdate(el);

		const buttons = el.querySelectorAll<NDDToggleButton>('ndd-toggle-button');
		expect(buttons[2].selected).toBe(true);
	});

	it('ArrowRight selects next button', async () => {
		el = await fixture<NDDToggleButtonGroup>(`
			<ndd-toggle-button-group type="radio" name="nav">
				<ndd-toggle-button value="a" text="A" selected></ndd-toggle-button>
				<ndd-toggle-button value="b" text="B"></ndd-toggle-button>
				<ndd-toggle-button value="c" text="C"></ndd-toggle-button>
			</ndd-toggle-button-group>
		`);
		await waitForUpdate(el);

		el.dispatchEvent(
			new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, composed: true })
		);
		await waitForUpdate(el);

		const buttons = el.querySelectorAll<NDDToggleButton>('ndd-toggle-button');
		expect(buttons[0].selected).toBe(false);
		expect(buttons[1].selected).toBe(true);
	});

	it('ArrowLeft selects previous button', async () => {
		el = await fixture<NDDToggleButtonGroup>(`
			<ndd-toggle-button-group type="radio" name="nav">
				<ndd-toggle-button value="a" text="A"></ndd-toggle-button>
				<ndd-toggle-button value="b" text="B" selected></ndd-toggle-button>
				<ndd-toggle-button value="c" text="C"></ndd-toggle-button>
			</ndd-toggle-button-group>
		`);
		await waitForUpdate(el);

		el.dispatchEvent(
			new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, composed: true })
		);
		await waitForUpdate(el);

		const buttons = el.querySelectorAll<NDDToggleButton>('ndd-toggle-button');
		expect(buttons[0].selected).toBe(true);
		expect(buttons[1].selected).toBe(false);
	});

	it('wraps around from last to first', async () => {
		el = await fixture<NDDToggleButtonGroup>(`
			<ndd-toggle-button-group type="radio" name="nav">
				<ndd-toggle-button value="a" text="A"></ndd-toggle-button>
				<ndd-toggle-button value="b" text="B"></ndd-toggle-button>
				<ndd-toggle-button value="c" text="C" selected></ndd-toggle-button>
			</ndd-toggle-button-group>
		`);
		await waitForUpdate(el);

		el.dispatchEvent(
			new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, composed: true })
		);
		await waitForUpdate(el);

		const buttons = el.querySelectorAll<NDDToggleButton>('ndd-toggle-button');
		expect(buttons[0].selected).toBe(true);
		expect(buttons[2].selected).toBe(false);
	});

	it('wraps around from first to last', async () => {
		el = await fixture<NDDToggleButtonGroup>(`
			<ndd-toggle-button-group type="radio" name="nav">
				<ndd-toggle-button value="a" text="A" selected></ndd-toggle-button>
				<ndd-toggle-button value="b" text="B"></ndd-toggle-button>
				<ndd-toggle-button value="c" text="C"></ndd-toggle-button>
			</ndd-toggle-button-group>
		`);
		await waitForUpdate(el);

		el.dispatchEvent(
			new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, composed: true })
		);
		await waitForUpdate(el);

		const buttons = el.querySelectorAll<NDDToggleButton>('ndd-toggle-button');
		expect(buttons[0].selected).toBe(false);
		expect(buttons[2].selected).toBe(true);
	});

	it('skips disabled buttons during keyboard navigation', async () => {
		el = await fixture<NDDToggleButtonGroup>(`
			<ndd-toggle-button-group type="radio" name="nav">
				<ndd-toggle-button value="a" text="A" selected></ndd-toggle-button>
				<ndd-toggle-button value="b" text="B" disabled></ndd-toggle-button>
				<ndd-toggle-button value="c" text="C"></ndd-toggle-button>
			</ndd-toggle-button-group>
		`);
		await waitForUpdate(el);

		el.dispatchEvent(
			new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, composed: true })
		);
		await waitForUpdate(el);

		const buttons = el.querySelectorAll<NDDToggleButton>('ndd-toggle-button');
		expect(buttons[2].selected).toBe(true);
	});

	it('does not handle arrow keys for type=checkbox', async () => {
		el = await fixture<NDDToggleButtonGroup>(`
			<ndd-toggle-button-group type="checkbox" name="filter">
				<ndd-toggle-button value="a" text="A" selected></ndd-toggle-button>
				<ndd-toggle-button value="b" text="B"></ndd-toggle-button>
			</ndd-toggle-button-group>
		`);
		await waitForUpdate(el);

		el.dispatchEvent(
			new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, composed: true })
		);
		await waitForUpdate(el);

		const buttons = el.querySelectorAll<NDDToggleButton>('ndd-toggle-button');
		expect(buttons[0].selected).toBe(true);
		expect(buttons[1].selected).toBe(false);
	});
});
