import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './modal-dialog.js';
import type { NLDDModalDialog } from './modal-dialog.js';

describe('nldd-modal-dialog', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) {
			const dialog = (el as NLDDModalDialog).shadowRoot?.querySelector('dialog');
			if (dialog?.open) dialog.close();
			cleanup(el);
		}
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-modal-dialog></nldd-modal-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('sets role="alertdialog" when variant is alert', async () => {
		el = await fixture('<nldd-modal-dialog variant="alert"></nldd-modal-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('dialog')!.getAttribute('role')).toBe('alertdialog');
	});

	it('does not set role attribute when no variant is set', async () => {
		el = await fixture('<nldd-modal-dialog></nldd-modal-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('dialog')!.getAttribute('role')).toBeNull();
	});

	it('renders a native dialog element', async () => {
		el = await fixture('<nldd-modal-dialog></nldd-modal-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('dialog')).not.toBeNull();
	});

	it('renders an nldd-inline-dialog inside the native dialog', async () => {
		el = await fixture('<nldd-modal-dialog></nldd-modal-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('nldd-inline-dialog')).not.toBeNull();
	});

	it('does not throw when show() is called on an already-open dialog', async () => {
		el = await fixture('<nldd-modal-dialog></nldd-modal-dialog>');
		await waitForUpdate(el);
		(el as NLDDModalDialog).show();
		expect(() => (el as NLDDModalDialog).show()).not.toThrow();
	});

	it('opens the native dialog on show()', async () => {
		el = await fixture('<nldd-modal-dialog></nldd-modal-dialog>');
		await waitForUpdate(el);
		(el as NLDDModalDialog).show();
		expect(el.shadowRoot!.querySelector('dialog')!.open).toBe(true);
	});

	it('fires open event on show()', async () => {
		el = await fixture('<nldd-modal-dialog></nldd-modal-dialog>');
		await waitForUpdate(el);
		const listener = vi.fn();
		el.addEventListener('open', listener);
		(el as NLDDModalDialog).show();
		expect(listener).toHaveBeenCalledOnce();
	});

	it('adds is-closing class on hide()', async () => {
		el = await fixture('<nldd-modal-dialog></nldd-modal-dialog>');
		await waitForUpdate(el);
		(el as NLDDModalDialog).show();
		(el as NLDDModalDialog).hide();
		expect(el.shadowRoot!.querySelector('dialog')!.classList.contains('is-closing')).toBe(true);
	});

	it('does nothing when hide() is called on a closed dialog', async () => {
		el = await fixture('<nldd-modal-dialog></nldd-modal-dialog>');
		await waitForUpdate(el);
		expect(() => (el as NLDDModalDialog).hide()).not.toThrow();
	});

	it('forwards text attribute to nldd-inline-dialog', async () => {
		el = await fixture('<nldd-modal-dialog text="Bevestiging vereist"></nldd-modal-dialog>');
		await waitForUpdate(el);
		const inner = el.shadowRoot!.querySelector('nldd-inline-dialog');
		expect(inner?.getAttribute('text')).toBe('Bevestiging vereist');
	});

	it('forwards supporting-text attribute to nldd-inline-dialog', async () => {
		el = await fixture('<nldd-modal-dialog supporting-text="Ondersteunende tekst"></nldd-modal-dialog>');
		await waitForUpdate(el);
		const inner = el.shadowRoot!.querySelector('nldd-inline-dialog');
		expect(inner?.getAttribute('supporting-text')).toBe('Ondersteunende tekst');
	});

	it('forwards variant attribute to nldd-inline-dialog', async () => {
		el = await fixture('<nldd-modal-dialog variant="alert"></nldd-modal-dialog>');
		await waitForUpdate(el);
		const inner = el.shadowRoot!.querySelector('nldd-inline-dialog');
		expect(inner?.getAttribute('variant')).toBe('alert');
	});

	it('forwards icon attribute to nldd-inline-dialog', async () => {
		el = await fixture('<nldd-modal-dialog icon="check-mark-circle"></nldd-modal-dialog>');
		await waitForUpdate(el);
		const inner = el.shadowRoot!.querySelector('nldd-inline-dialog');
		expect(inner?.getAttribute('icon')).toBe('check-mark-circle');
	});

	it('sets aria-label from accessible-label', async () => {
		el = await fixture('<nldd-modal-dialog accessible-label="Bevestig actie" text="Weet u het zeker?"></nldd-modal-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('dialog')!.getAttribute('aria-label')).toBe('Bevestig actie');
	});

	it('falls back to text for aria-label when no accessible-label', async () => {
		el = await fixture('<nldd-modal-dialog text="Bevestiging vereist"></nldd-modal-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('dialog')!.getAttribute('aria-label')).toBe('Bevestiging vereist');
	});

	it('focuses the dialog on show()', async () => {
		el = await fixture('<nldd-modal-dialog text="Bevestiging vereist"></nldd-modal-dialog>');
		await waitForUpdate(el);
		(el as NLDDModalDialog).show();
		const dialog = el.shadowRoot!.querySelector('dialog')!;
		expect(document.activeElement === dialog || el.shadowRoot!.activeElement === dialog).toBe(true);
	});

	it('inner nldd-inline-dialog receives heading-level="2"', async () => {
		el = await fixture('<nldd-modal-dialog text="Test"></nldd-modal-dialog>');
		await waitForUpdate(el);
		const inner = el.shadowRoot!.querySelector('nldd-inline-dialog');
		expect(inner?.getAttribute('heading-level')).toBe('2');
	});

	it('respects autofocus attribute on slotted content', async () => {
		el = await fixture('<nldd-modal-dialog><button slot="actions" autofocus>OK</button></nldd-modal-dialog>');
		await waitForUpdate(el);
		(el as NLDDModalDialog).show();
		const button = el.querySelector<HTMLElement>('button')!;
		expect(document.activeElement === button).toBe(true);
	});

	// Note: getBoundingClientRect() returns all-zeros in JSDOM. The padding-click
	// test passes because (0, 0) lies on the degenerate [0,0]×[0,0] rect; the
	// backdrop-click test passes because (-10, -10) lies outside it. The logic
	// is correct under real layout — these assertions exercise the in-rect /
	// outside-rect branch boundaries, not realistic geometry.
	it('does not close when clicking on the dialog padding', async () => {
		el = await fixture('<nldd-modal-dialog text="Test"></nldd-modal-dialog>');
		await waitForUpdate(el);
		(el as NLDDModalDialog).show();
		const dialog = el.shadowRoot!.querySelector('dialog')!;
		const rect = dialog.getBoundingClientRect();
		// Click coordinates inside the dialog rect, target = dialog (i.e., on padding)
		const event = new MouseEvent('click', {
			bubbles: true,
			clientX: rect.left + rect.width / 2,
			clientY: rect.top + rect.height / 2,
		});
		Object.defineProperty(event, 'target', { value: dialog });
		(el as NLDDModalDialog)._handleBackdropClick(event);
		expect(dialog.classList.contains('is-closing')).toBe(false);
		expect(dialog.open).toBe(true);
	});

	it('closes when clicking on the backdrop (outside dialog rect)', async () => {
		el = await fixture('<nldd-modal-dialog text="Test"></nldd-modal-dialog>');
		await waitForUpdate(el);
		(el as NLDDModalDialog).show();
		const dialog = el.shadowRoot!.querySelector('dialog')!;
		const rect = dialog.getBoundingClientRect();
		// Click coordinates outside the dialog rect, target = dialog (i.e., on backdrop)
		const event = new MouseEvent('click', {
			bubbles: true,
			clientX: rect.left - 10,
			clientY: rect.top - 10,
		});
		Object.defineProperty(event, 'target', { value: dialog });
		(el as NLDDModalDialog)._handleBackdropClick(event);
		expect(dialog.classList.contains('is-closing')).toBe(true);
	});

	it('prevents default on cancel event and calls hide()', async () => {
		el = await fixture('<nldd-modal-dialog></nldd-modal-dialog>');
		await waitForUpdate(el);
		(el as NLDDModalDialog).show();
		const hideSpy = vi.spyOn(el as NLDDModalDialog, 'hide');
		const event = new Event('cancel', { cancelable: true });
		const preventSpy = vi.spyOn(event, 'preventDefault');
		el.shadowRoot!.querySelector('dialog')!.dispatchEvent(event);
		expect(preventSpy).toHaveBeenCalled();
		expect(hideSpy).toHaveBeenCalledOnce();
	});
});
