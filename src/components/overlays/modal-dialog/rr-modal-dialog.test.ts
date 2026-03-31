import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRModalDialog } from './rr-modal-dialog.ts';
import './rr-modal-dialog.ts';

describe('rr-modal-dialog', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) {
			const dialog = (el as RRModalDialog).shadowRoot?.querySelector('dialog');
			if (dialog?.open) dialog.close();
			cleanup(el);
		}
	});

	it('sets role="alertdialog" when variant is alert', async () => {
		el = await fixture('<rr-modal-dialog variant="alert"></rr-modal-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('dialog')!.getAttribute('role')).toBe('alertdialog');
	});

	it('sets role="dialog" when no variant is set', async () => {
		el = await fixture('<rr-modal-dialog></rr-modal-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('dialog')!.getAttribute('role')).toBe('dialog');
	});

	it('renders without error', async () => {
		el = await fixture('<rr-modal-dialog></rr-modal-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a native dialog element', async () => {
		el = await fixture('<rr-modal-dialog></rr-modal-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('dialog')).not.toBeNull();
	});

	it('renders an rr-dialog inside the native dialog', async () => {
		el = await fixture('<rr-modal-dialog></rr-modal-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('rr-dialog')).not.toBeNull();
	});

	it('opens the native dialog on show()', async () => {
		el = await fixture('<rr-modal-dialog></rr-modal-dialog>');
		await waitForUpdate(el);
		(el as RRModalDialog).show();
		expect(el.shadowRoot!.querySelector('dialog')!.open).toBe(true);
	});

	it('fires open event on show()', async () => {
		el = await fixture('<rr-modal-dialog></rr-modal-dialog>');
		await waitForUpdate(el);
		const listener = vi.fn();
		el.addEventListener('open', listener);
		(el as RRModalDialog).show();
		expect(listener).toHaveBeenCalledOnce();
	});

	it('adds is-closing class on hide()', async () => {
		el = await fixture('<rr-modal-dialog></rr-modal-dialog>');
		await waitForUpdate(el);
		(el as RRModalDialog).show();
		(el as RRModalDialog).hide();
		expect(el.shadowRoot!.querySelector('dialog')!.classList.contains('is-closing')).toBe(true);
	});

	it('does nothing when hide() is called on a closed dialog', async () => {
		el = await fixture('<rr-modal-dialog></rr-modal-dialog>');
		await waitForUpdate(el);
		expect(() => (el as RRModalDialog).hide()).not.toThrow();
	});

	it('forwards text attribute to rr-dialog', async () => {
		el = await fixture('<rr-modal-dialog text="Bevestiging vereist"></rr-modal-dialog>');
		await waitForUpdate(el);
		const inner = el.shadowRoot!.querySelector('rr-dialog');
		expect(inner?.getAttribute('text')).toBe('Bevestiging vereist');
	});

	it('forwards supporting-text attribute to rr-dialog', async () => {
		el = await fixture('<rr-modal-dialog supporting-text="Ondersteunende tekst"></rr-modal-dialog>');
		await waitForUpdate(el);
		const inner = el.shadowRoot!.querySelector('rr-dialog');
		expect(inner?.getAttribute('supporting-text')).toBe('Ondersteunende tekst');
	});

	it('forwards variant attribute to rr-dialog', async () => {
		el = await fixture('<rr-modal-dialog variant="alert"></rr-modal-dialog>');
		await waitForUpdate(el);
		const inner = el.shadowRoot!.querySelector('rr-dialog');
		expect(inner?.getAttribute('variant')).toBe('alert');
	});

	it('forwards icon-name attribute to rr-dialog', async () => {
		el = await fixture('<rr-modal-dialog icon-name="check-mark-circle"></rr-modal-dialog>');
		await waitForUpdate(el);
		const inner = el.shadowRoot!.querySelector('rr-dialog');
		expect(inner?.getAttribute('icon-name')).toBe('check-mark-circle');
	});

	it('focuses the dialog__text heading on show()', async () => {
		el = await fixture('<rr-modal-dialog text="Bevestiging vereist"></rr-modal-dialog>');
		await waitForUpdate(el);
		(el as RRModalDialog).show();
		const inner = el.shadowRoot!.querySelector('rr-dialog');
		const heading = inner?.shadowRoot?.querySelector('.dialog__text') as HTMLElement;
		expect(document.activeElement === heading || inner?.shadowRoot?.activeElement === heading).toBe(true);
	});

	it('adds tabindex="-1" to dialog__text heading on show()', async () => {
		el = await fixture('<rr-modal-dialog text="Bevestiging vereist"></rr-modal-dialog>');
		await waitForUpdate(el);
		(el as RRModalDialog).show();
		const inner = el.shadowRoot!.querySelector('rr-dialog');
		const heading = inner?.shadowRoot?.querySelector('.dialog__text') as HTMLElement;
		expect(heading.getAttribute('tabindex')).toBe('-1');
	});

	it('prevents default on cancel event and calls hide()', async () => {
		el = await fixture('<rr-modal-dialog></rr-modal-dialog>');
		await waitForUpdate(el);
		(el as RRModalDialog).show();
		const hideSpy = vi.spyOn(el as RRModalDialog, 'hide');
		const event = new Event('cancel', { cancelable: true });
		const preventSpy = vi.spyOn(event, 'preventDefault');
		el.shadowRoot!.querySelector('dialog')!.dispatchEvent(event);
		expect(preventSpy).toHaveBeenCalled();
		expect(hideSpy).toHaveBeenCalledOnce();
	});
});
