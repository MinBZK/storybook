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
		// The default (right) is kept out of the DOM; the property is the source of truth.
		expect((el as unknown as { placement: string }).placement).toBe('right');
		expect(el.hasAttribute('placement')).toBe(false);
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

	it('calls hide() when the dismiss comes from its top-title-bar', async () => {
		el = await fixture<NLDDSheet>(`
			<nldd-sheet>
				<nldd-top-title-bar dismiss-text="Sluit"></nldd-top-title-bar>
			</nldd-sheet>
		`);
		await waitForUpdate(el);
		el.show();

		const hideSpy = vi.spyOn(el, 'hide');
		el.querySelector('nldd-top-title-bar')!
			.dispatchEvent(new CustomEvent('dismiss', { bubbles: true, composed: true }));

		expect(hideSpy).toHaveBeenCalledOnce();
	});

	it('ignores a dismiss from another component inside it (e.g. nldd-token)', async () => {
		// Regression: nldd-token (and nldd-banner, nldd-document-tab-bar) fire
		// `dismiss` for their own element. Removing a token inside a sheet used to
		// bubble up and close the whole sheet.
		el = await fixture<NLDDSheet>(`
			<nldd-sheet>
				<nldd-token control="dismiss">Label</nldd-token>
			</nldd-sheet>
		`);
		await waitForUpdate(el);
		el.show();

		const hideSpy = vi.spyOn(el, 'hide');
		el.querySelector('nldd-token')!
			.dispatchEvent(new CustomEvent('dismiss', { bubbles: true, composed: true }));

		expect(hideSpy).not.toHaveBeenCalled();
	});

	it('a nested sheet title-bar dismiss closes only the inner sheet, not the outer', async () => {
		// Both overlays listen for a bubbling `dismiss`; without stopPropagation the
		// inner title-bar's dismiss would match the outer sheet too and close both.
		el = await fixture<NLDDSheet>(`
			<nldd-sheet>
				<nldd-sheet class="inner">
					<nldd-top-title-bar dismiss-text="Sluit"></nldd-top-title-bar>
				</nldd-sheet>
			</nldd-sheet>
		`);
		await waitForUpdate(el);
		const inner = el.querySelector('.inner') as NLDDSheet;
		el.show();
		inner.show();
		await waitForUpdate(el);

		const outerHide = vi.spyOn(el, 'hide');
		const innerHide = vi.spyOn(inner, 'hide');
		inner.querySelector('nldd-top-title-bar')!
			.dispatchEvent(new CustomEvent('dismiss', { bubbles: true, composed: true }));

		expect(innerHide).toHaveBeenCalledOnce();
		expect(outerHide).not.toHaveBeenCalled();
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
   Full-height
   ============================================================ */

describe('nldd-sheet – height', () => {
	let el: NLDDSheet;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('defaults height to empty string and sets no --_height var (CSS default = full)', async () => {
		el = await fixture<NLDDSheet>('<nldd-sheet></nldd-sheet>');
		await waitForUpdate(el);
		expect(el.height).toBe('');
		expect(el.style.getPropertyValue('--_height')).toBe('');
	});

	it('reflects height attribute when set in markup', async () => {
		el = await fixture<NLDDSheet>('<nldd-sheet placement="bottom" height="fit-content"></nldd-sheet>');
		await waitForUpdate(el);
		expect(el.height).toBe('fit-content');
		expect(el.getAttribute('height')).toBe('fit-content');
	});

	it('sets --_height for fit-content', async () => {
		el = await fixture<NLDDSheet>('<nldd-sheet placement="bottom" height="fit-content"></nldd-sheet>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_height').trim()).toBe('fit-content');
	});

	it('sets --_height for a CSS length', async () => {
		el = await fixture<NLDDSheet>('<nldd-sheet placement="bottom" height="50dvh"></nldd-sheet>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_height').trim()).toBe('50dvh');
	});

	it('does not set --_height for the "full" alias (uses CSS default)', async () => {
		el = await fixture<NLDDSheet>('<nldd-sheet placement="bottom" height="full"></nldd-sheet>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_height')).toBe('');
	});

	it('ignores invalid CSS values (falls back, no --_height)', async () => {
		el = await fixture<NLDDSheet>('<nldd-sheet placement="bottom" height="not-a-length"></nldd-sheet>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_height')).toBe('');
	});

	// The warning is gated on import.meta.env.DEV; skip when the suite runs
	// in production mode so a missing warn isn't a false failure.
	it.skipIf(!import.meta.env.DEV)('warns exactly once on an invalid height value', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture<NLDDSheet>('<nldd-sheet placement="bottom" height="not-a-length"></nldd-sheet>');
		await waitForUpdate(el);
		expect(warnSpy).toHaveBeenCalledTimes(1);
		expect(warnSpy.mock.calls[0][0]).toContain('Invalid height value "not-a-length"');

		el.height = 'also-bogus';
		await waitForUpdate(el);
		expect(warnSpy).toHaveBeenCalledTimes(1);
		warnSpy.mockRestore();
	});

	it('clears --_height when property is reset to empty', async () => {
		el = await fixture<NLDDSheet>('<nldd-sheet placement="bottom" height="50%"></nldd-sheet>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_height').trim()).toBe('50%');

		el.height = '';
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_height')).toBe('');
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
