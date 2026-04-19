import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import type { NLDDSheet } from './sheet.js';
import './sheet.js';


/* ============================================================
   Smoke tests
   ============================================================ */

describe('nldd-sheet', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-sheet></nldd-sheet>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a dialog element', async () => {
		el = await fixture('<nldd-sheet></nldd-sheet>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('dialog')).not.toBeNull();
	});

	it('defaults to placement right', async () => {
		el = await fixture('<nldd-sheet></nldd-sheet>');
		await waitForUpdate(el);
		expect(el.getAttribute('placement')).toBe('right');
	});

	it('defaults to modal (modeless attribute absent)', async () => {
		el = await fixture('<nldd-sheet></nldd-sheet>');
		await waitForUpdate(el);
		expect((el as NLDDSheet).modeless).toBe(false);
		expect(el.hasAttribute('modeless')).toBe(false);
	});

	it('reflects placement attribute', async () => {
		el = await fixture('<nldd-sheet placement="bottom"></nldd-sheet>');
		await waitForUpdate(el);
		expect(el.getAttribute('placement')).toBe('bottom');
	});
});


/* ============================================================
   show() / hide()
   ============================================================ */

describe('nldd-sheet – tonen en verbergen', () => {
	let el: NLDDSheet;

	afterEach(() => {
		if (el) {
			const dialog = el.shadowRoot?.querySelector('dialog');
			if (dialog?.open) dialog.close();
			cleanup(el);
		}
	});

	it('opens the dialog when show() is called', async () => {
		el = await fixture<NLDDSheet>('<nldd-sheet></nldd-sheet>');
		await waitForUpdate(el);
		el.show();
		const dialog = el.shadowRoot!.querySelector('dialog')!;
		expect(dialog.open).toBe(true);
	});

	it('fires open event when show() is called', async () => {
		el = await fixture<NLDDSheet>('<nldd-sheet></nldd-sheet>');
		await waitForUpdate(el);
		const listener = vi.fn();
		el.addEventListener('open', listener);
		el.show();
		expect(listener).toHaveBeenCalledOnce();
	});

	it('adds is-closing class when hide() is called', async () => {
		el = await fixture<NLDDSheet>('<nldd-sheet></nldd-sheet>');
		await waitForUpdate(el);
		el.show();
		el.hide();
		const dialog = el.shadowRoot!.querySelector('dialog')!;
		expect(dialog.classList.contains('is-closing')).toBe(true);
	});

	it('does not fire close event immediately when hide() is called', async () => {
		el = await fixture<NLDDSheet>('<nldd-sheet></nldd-sheet>');
		await waitForUpdate(el);
		el.show();
		const listener = vi.fn();
		el.addEventListener('close', listener);
		el.hide();
		expect(listener).not.toHaveBeenCalled();
	});

	it('does nothing when hide() is called on a closed sheet', async () => {
		el = await fixture<NLDDSheet>('<nldd-sheet></nldd-sheet>');
		await waitForUpdate(el);
		// Should not throw
		expect(() => el.hide()).not.toThrow();
	});

	it('uses show() for modeless sheets', async () => {
		el = await fixture<NLDDSheet>('<nldd-sheet modeless></nldd-sheet>');
		await waitForUpdate(el);
		el.show();
		const dialog = el.shadowRoot!.querySelector('dialog')!;
		expect(dialog.open).toBe(true);
	});
});


/* ============================================================
   Backdrop click
   ============================================================ */

describe('nldd-sheet – backdrop klik', () => {
	let el: NLDDSheet;

	afterEach(() => {
		if (el) {
			const dialog = el.shadowRoot?.querySelector('dialog');
			if (dialog?.open) dialog.close();
			cleanup(el);
		}
	});

	it('calls hide() when click target is the dialog itself', async () => {
		el = await fixture<NLDDSheet>('<nldd-sheet></nldd-sheet>');
		await waitForUpdate(el);
		el.show();

		const hideSpy = vi.spyOn(el, 'hide');
		const dialog = el.shadowRoot!.querySelector('dialog')!;
		const event = new MouseEvent('click', { bubbles: true });
		Object.defineProperty(event, 'target', { value: dialog });
		el._handleDialogClick(event);

		expect(hideSpy).toHaveBeenCalledOnce();
	});
});


/* ============================================================
   Escape key / cancel event
   ============================================================ */

describe('nldd-sheet – Escape-toets', () => {
	let el: NLDDSheet;

	afterEach(() => {
		if (el) {
			const dialog = el.shadowRoot?.querySelector('dialog');
			if (dialog?.open) dialog.close();
			cleanup(el);
		}
	});

	it('prevents default cancel event and calls hide()', async () => {
		el = await fixture<NLDDSheet>('<nldd-sheet></nldd-sheet>');
		await waitForUpdate(el);
		el.show();

		const hideSpy = vi.spyOn(el, 'hide');
		const event = new Event('cancel', { cancelable: true });
		const preventSpy = vi.spyOn(event, 'preventDefault');

		el._handleCancel(event);

		expect(preventSpy).toHaveBeenCalled();
		expect(hideSpy).toHaveBeenCalledOnce();
	});
});


/* ============================================================
   Dismiss event
   ============================================================ */

describe('nldd-sheet – dismiss event', () => {
	let el: NLDDSheet;

	afterEach(() => {
		if (el) {
			const dialog = el.shadowRoot?.querySelector('dialog');
			if (dialog?.open) dialog.close();
			cleanup(el);
		}
	});

	it('calls hide() when a dismiss event is dispatched on the sheet', async () => {
		el = await fixture<NLDDSheet>('<nldd-sheet></nldd-sheet>');
		await waitForUpdate(el);
		el.show();

		const hideSpy = vi.spyOn(el, 'hide');
		el.dispatchEvent(new CustomEvent('dismiss', { bubbles: true, composed: true }));

		expect(hideSpy).toHaveBeenCalledOnce();
	});
});


/* ============================================================
   Placement
   ============================================================ */

describe('nldd-sheet – placement', () => {
	let el: NLDDSheet;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('reflects placement="left"', async () => {
		el = await fixture<NLDDSheet>('<nldd-sheet placement="left"></nldd-sheet>');
		await waitForUpdate(el);
		expect(el.getAttribute('placement')).toBe('left');
	});

	it('reflects placement="bottom"', async () => {
		el = await fixture<NLDDSheet>('<nldd-sheet placement="bottom"></nldd-sheet>');
		await waitForUpdate(el);
		expect(el.getAttribute('placement')).toBe('bottom');
	});
});


/* ============================================================
   Slot
   ============================================================ */

describe('nldd-sheet – slot', () => {
	let el: NLDDSheet;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders slotted content', async () => {
		el = await fixture<NLDDSheet>(`
			<nldd-sheet>
				<div id="content">Inhoud</div>
			</nldd-sheet>
		`);
		await waitForUpdate(el);
		const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot')!;
		expect(slot.assignedElements().length).toBe(1);
	});
});


/* ============================================================
   Focus management
   ============================================================ */

describe('nldd-sheet – focus management', () => {
	let el: NLDDSheet;

	afterEach(() => {
		if (el) {
			const dialog = el.shadowRoot?.querySelector('dialog');
			if (dialog?.open) dialog.close();
			cleanup(el);
		}
	});

	it('focuses the dialog when show() is called', async () => {
		el = await fixture<NLDDSheet>(`
			<nldd-sheet>
				<h2>Sheet titel</h2>
			</nldd-sheet>
		`);
		await waitForUpdate(el);
		el.show();
		const dialog = el.shadowRoot!.querySelector('dialog')!;
		expect(document.activeElement === dialog || el.shadowRoot!.activeElement === dialog).toBe(true);
	});

	it('respects autofocus attribute on slotted content', async () => {
		el = await fixture<NLDDSheet>(`
			<nldd-sheet>
				<button autofocus>Focus me</button>
			</nldd-sheet>
		`);
		await waitForUpdate(el);
		el.show();
		const button = el.querySelector<HTMLElement>('button')!;
		expect(document.activeElement === button).toBe(true);
	});
});
