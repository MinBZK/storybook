import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { NDDSheet } from './ndd-sheet.ts';
import './ndd-sheet.ts';


/* ============================================================
   Smoke tests
   ============================================================ */

describe('ndd-sheet', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-sheet></ndd-sheet>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a dialog element', async () => {
		el = await fixture('<ndd-sheet></ndd-sheet>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('dialog')).not.toBeNull();
	});

	it('defaults to placement right', async () => {
		el = await fixture('<ndd-sheet></ndd-sheet>');
		await waitForUpdate(el);
		expect(el.getAttribute('placement')).toBe('right');
	});

	it('defaults to modal (modeless attribute absent)', async () => {
		el = await fixture('<ndd-sheet></ndd-sheet>');
		await waitForUpdate(el);
		expect((el as NDDSheet).modeless).toBe(false);
		expect(el.hasAttribute('modeless')).toBe(false);
	});

	it('reflects placement attribute', async () => {
		el = await fixture('<ndd-sheet placement="bottom"></ndd-sheet>');
		await waitForUpdate(el);
		expect(el.getAttribute('placement')).toBe('bottom');
	});
});


/* ============================================================
   show() / hide()
   ============================================================ */

describe('ndd-sheet – tonen en verbergen', () => {
	let el: NDDSheet;

	afterEach(() => {
		if (el) {
			const dialog = el.shadowRoot?.querySelector('dialog');
			if (dialog?.open) dialog.close();
			cleanup(el);
		}
	});

	it('opens the dialog when show() is called', async () => {
		el = await fixture<NDDSheet>('<ndd-sheet></ndd-sheet>');
		await waitForUpdate(el);
		el.show();
		const dialog = el.shadowRoot!.querySelector('dialog')!;
		expect(dialog.open).toBe(true);
	});

	it('fires open event when show() is called', async () => {
		el = await fixture<NDDSheet>('<ndd-sheet></ndd-sheet>');
		await waitForUpdate(el);
		const listener = vi.fn();
		el.addEventListener('open', listener);
		el.show();
		expect(listener).toHaveBeenCalledOnce();
	});

	it('adds is-closing class when hide() is called', async () => {
		el = await fixture<NDDSheet>('<ndd-sheet></ndd-sheet>');
		await waitForUpdate(el);
		el.show();
		el.hide();
		const dialog = el.shadowRoot!.querySelector('dialog')!;
		expect(dialog.classList.contains('is-closing')).toBe(true);
	});

	it('does not fire close event immediately when hide() is called', async () => {
		el = await fixture<NDDSheet>('<ndd-sheet></ndd-sheet>');
		await waitForUpdate(el);
		el.show();
		const listener = vi.fn();
		el.addEventListener('close', listener);
		el.hide();
		expect(listener).not.toHaveBeenCalled();
	});

	it('does nothing when hide() is called on a closed sheet', async () => {
		el = await fixture<NDDSheet>('<ndd-sheet></ndd-sheet>');
		await waitForUpdate(el);
		// Should not throw
		expect(() => el.hide()).not.toThrow();
	});

	it('uses show() for modeless sheets', async () => {
		el = await fixture<NDDSheet>('<ndd-sheet modeless></ndd-sheet>');
		await waitForUpdate(el);
		el.show();
		const dialog = el.shadowRoot!.querySelector('dialog')!;
		expect(dialog.open).toBe(true);
	});
});


/* ============================================================
   Backdrop click
   ============================================================ */

describe('ndd-sheet – backdrop klik', () => {
	let el: NDDSheet;

	afterEach(() => {
		if (el) {
			const dialog = el.shadowRoot?.querySelector('dialog');
			if (dialog?.open) dialog.close();
			cleanup(el);
		}
	});

	it('calls hide() when click target is the dialog itself', async () => {
		el = await fixture<NDDSheet>('<ndd-sheet></ndd-sheet>');
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

describe('ndd-sheet – Escape-toets', () => {
	let el: NDDSheet;

	afterEach(() => {
		if (el) {
			const dialog = el.shadowRoot?.querySelector('dialog');
			if (dialog?.open) dialog.close();
			cleanup(el);
		}
	});

	it('prevents default cancel event and calls hide()', async () => {
		el = await fixture<NDDSheet>('<ndd-sheet></ndd-sheet>');
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

describe('ndd-sheet – dismiss event', () => {
	let el: NDDSheet;

	afterEach(() => {
		if (el) {
			const dialog = el.shadowRoot?.querySelector('dialog');
			if (dialog?.open) dialog.close();
			cleanup(el);
		}
	});

	it('calls hide() when a dismiss event is dispatched on the sheet', async () => {
		el = await fixture<NDDSheet>('<ndd-sheet></ndd-sheet>');
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

describe('ndd-sheet – placement', () => {
	let el: NDDSheet;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('reflects placement="left"', async () => {
		el = await fixture<NDDSheet>('<ndd-sheet placement="left"></ndd-sheet>');
		await waitForUpdate(el);
		expect(el.getAttribute('placement')).toBe('left');
	});

	it('reflects placement="bottom"', async () => {
		el = await fixture<NDDSheet>('<ndd-sheet placement="bottom"></ndd-sheet>');
		await waitForUpdate(el);
		expect(el.getAttribute('placement')).toBe('bottom');
	});
});


/* ============================================================
   Slot
   ============================================================ */

describe('ndd-sheet – slot', () => {
	let el: NDDSheet;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders slotted content', async () => {
		el = await fixture<NDDSheet>(`
			<ndd-sheet>
				<div id="content">Inhoud</div>
			</ndd-sheet>
		`);
		await waitForUpdate(el);
		const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot')!;
		expect(slot.assignedElements().length).toBe(1);
	});
});


/* ============================================================
   Focus management
   ============================================================ */

describe('ndd-sheet – focus management', () => {
	let el: NDDSheet;

	afterEach(() => {
		if (el) {
			const dialog = el.shadowRoot?.querySelector('dialog');
			if (dialog?.open) dialog.close();
			cleanup(el);
		}
	});

	it('focuses the dialog when show() is called', async () => {
		el = await fixture<NDDSheet>(`
			<ndd-sheet>
				<h2>Sheet titel</h2>
			</ndd-sheet>
		`);
		await waitForUpdate(el);
		el.show();
		const dialog = el.shadowRoot!.querySelector('dialog')!;
		expect(document.activeElement === dialog || el.shadowRoot!.activeElement === dialog).toBe(true);
	});

	it('respects autofocus attribute on slotted content', async () => {
		el = await fixture<NDDSheet>(`
			<ndd-sheet>
				<button autofocus>Focus me</button>
			</ndd-sheet>
		`);
		await waitForUpdate(el);
		el.show();
		const button = el.querySelector<HTMLElement>('button')!;
		expect(document.activeElement === button).toBe(true);
	});
});
