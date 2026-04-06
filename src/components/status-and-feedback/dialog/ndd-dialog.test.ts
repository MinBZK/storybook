import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { NDDDialog } from './ndd-dialog.ts';
import './ndd-dialog.ts';

describe('ndd-dialog', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) {
			const dialog = (el as NDDDialog).shadowRoot?.querySelector('dialog');
			if (dialog?.open) dialog.close();
			cleanup(el);
		}
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-dialog></ndd-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('sets role="alertdialog" when variant is alert', async () => {
		el = await fixture('<ndd-dialog variant="alert"></ndd-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('dialog')!.getAttribute('role')).toBe('alertdialog');
	});

	it('does not set role attribute when no variant is set', async () => {
		el = await fixture('<ndd-dialog></ndd-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('dialog')!.getAttribute('role')).toBeNull();
	});

	it('renders a native dialog element', async () => {
		el = await fixture('<ndd-dialog></ndd-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('dialog')).not.toBeNull();
	});

	it('renders an ndd-inline-dialog inside the native dialog', async () => {
		el = await fixture('<ndd-dialog></ndd-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('ndd-inline-dialog')).not.toBeNull();
	});

	it('does not throw when show() is called on an already-open dialog', async () => {
		el = await fixture('<ndd-dialog></ndd-dialog>');
		await waitForUpdate(el);
		(el as NDDDialog).show();
		expect(() => (el as NDDDialog).show()).not.toThrow();
	});

	it('opens the native dialog on show()', async () => {
		el = await fixture('<ndd-dialog></ndd-dialog>');
		await waitForUpdate(el);
		(el as NDDDialog).show();
		expect(el.shadowRoot!.querySelector('dialog')!.open).toBe(true);
	});

	it('fires open event on show()', async () => {
		el = await fixture('<ndd-dialog></ndd-dialog>');
		await waitForUpdate(el);
		const listener = vi.fn();
		el.addEventListener('open', listener);
		(el as NDDDialog).show();
		expect(listener).toHaveBeenCalledOnce();
	});

	it('adds is-closing class on hide()', async () => {
		el = await fixture('<ndd-dialog></ndd-dialog>');
		await waitForUpdate(el);
		(el as NDDDialog).show();
		(el as NDDDialog).hide();
		expect(el.shadowRoot!.querySelector('dialog')!.classList.contains('is-closing')).toBe(true);
	});

	it('does nothing when hide() is called on a closed dialog', async () => {
		el = await fixture('<ndd-dialog></ndd-dialog>');
		await waitForUpdate(el);
		expect(() => (el as NDDDialog).hide()).not.toThrow();
	});

	it('forwards text attribute to ndd-dialog', async () => {
		el = await fixture('<ndd-dialog text="Bevestiging vereist"></ndd-dialog>');
		await waitForUpdate(el);
		const inner = el.shadowRoot!.querySelector('ndd-inline-dialog');
		expect(inner?.getAttribute('text')).toBe('Bevestiging vereist');
	});

	it('forwards supporting-text attribute to ndd-dialog', async () => {
		el = await fixture('<ndd-dialog supporting-text="Ondersteunende tekst"></ndd-dialog>');
		await waitForUpdate(el);
		const inner = el.shadowRoot!.querySelector('ndd-inline-dialog');
		expect(inner?.getAttribute('supporting-text')).toBe('Ondersteunende tekst');
	});

	it('forwards variant attribute to ndd-dialog', async () => {
		el = await fixture('<ndd-dialog variant="alert"></ndd-dialog>');
		await waitForUpdate(el);
		const inner = el.shadowRoot!.querySelector('ndd-inline-dialog');
		expect(inner?.getAttribute('variant')).toBe('alert');
	});

	it('forwards icon-name attribute to ndd-dialog', async () => {
		el = await fixture('<ndd-dialog icon-name="check-mark-circle"></ndd-dialog>');
		await waitForUpdate(el);
		const inner = el.shadowRoot!.querySelector('ndd-inline-dialog');
		expect(inner?.getAttribute('icon-name')).toBe('check-mark-circle');
	});

	it('focuses the dialog__text heading on show()', async () => {
		el = await fixture('<ndd-dialog text="Bevestiging vereist"></ndd-dialog>');
		await waitForUpdate(el);
		(el as NDDDialog).show();
		const inner = el.shadowRoot!.querySelector('ndd-inline-dialog');
		const heading = inner?.shadowRoot?.querySelector('h2.inline-dialog__text') as HTMLElement;
		expect(document.activeElement === heading || inner?.shadowRoot?.activeElement === heading).toBe(true);
	});

	it('inner ndd-inline-dialog receives heading-level="2"', async () => {
		el = await fixture('<ndd-dialog text="Test"></ndd-dialog>');
		await waitForUpdate(el);
		const inner = el.shadowRoot!.querySelector('ndd-inline-dialog');
		expect(inner?.getAttribute('heading-level')).toBe('2');
	});

	it('adds tabindex="-1" to dialog__text heading on show()', async () => {
		el = await fixture('<ndd-dialog text="Bevestiging vereist"></ndd-dialog>');
		await waitForUpdate(el);
		(el as NDDDialog).show();
		const inner = el.shadowRoot!.querySelector('ndd-inline-dialog');
		const heading = inner?.shadowRoot?.querySelector('.inline-dialog__text') as HTMLElement;
		expect(heading.getAttribute('tabindex')).toBe('-1');
	});

	it('prevents default on cancel event and calls hide()', async () => {
		el = await fixture('<ndd-dialog></ndd-dialog>');
		await waitForUpdate(el);
		(el as NDDDialog).show();
		const hideSpy = vi.spyOn(el as NDDDialog, 'hide');
		const event = new Event('cancel', { cancelable: true });
		const preventSpy = vi.spyOn(event, 'preventDefault');
		el.shadowRoot!.querySelector('dialog')!.dispatchEvent(event);
		expect(preventSpy).toHaveBeenCalled();
		expect(hideSpy).toHaveBeenCalledOnce();
	});
});
