import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-password-field.ts';

describe('rr-password-field', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-password-field></rr-password-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults to masked (type="password")', async () => {
		el = await fixture('<rr-password-field></rr-password-field>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.type).toBe('password');
	});

	it('shows password as text when masked is false', async () => {
		el = await fixture('<rr-password-field></rr-password-field>');
		(el as any).masked = false;
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.type).toBe('text');
	});

	it('toggles masked state when visibility button is clicked', async () => {
		el = await fixture('<rr-password-field></rr-password-field>');
		await waitForUpdate(el);
		expect((el as any).masked).toBe(true);
		const button = el.shadowRoot!.querySelector('.password-field__visibility-toggle rr-button')!;
		(button as HTMLElement).click();
		await waitForUpdate(el);
		expect((el as any).masked).toBe(false);
		(button as HTMLElement).click();
		await waitForUpdate(el);
		expect((el as any).masked).toBe(true);
	});

	it('applies is-masked class to input when masked', async () => {
		el = await fixture('<rr-password-field></rr-password-field>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.classList.contains('is-masked')).toBe(true);
	});

	it('removes is-masked class from input when unmasked', async () => {
		el = await fixture('<rr-password-field></rr-password-field>');
		(el as any).masked = false;
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.classList.contains('is-masked')).toBe(false);
	});

	it('renders valid icon when valid attribute is set', async () => {
		el = await fixture('<rr-password-field valid></rr-password-field>');
		await waitForUpdate(el);
		const icon = el.shadowRoot!.querySelector('.password-field__validation-icon-area rr-icon');
		expect(icon).not.toBeNull();
		expect(icon!.getAttribute('name')).toBe('valid');
	});

	it('renders invalid icon when invalid attribute is set', async () => {
		el = await fixture('<rr-password-field invalid></rr-password-field>');
		await waitForUpdate(el);
		const icon = el.shadowRoot!.querySelector('.password-field__validation-icon-area rr-icon');
		expect(icon).not.toBeNull();
		expect(icon!.getAttribute('name')).toBe('invalid');
	});

	it('does not render validation icon in neutral state', async () => {
		el = await fixture('<rr-password-field></rr-password-field>');
		await waitForUpdate(el);
		const area = el.shadowRoot!.querySelector('.password-field__validation-icon-area');
		expect(area).toBeNull();
	});

	it('dispatches custom input event on input', async () => {
		el = await fixture('<rr-password-field></rr-password-field>');
		await waitForUpdate(el);
		const handler = vi.fn();
		el.addEventListener('input', handler);
		const input = el.shadowRoot!.querySelector('input')!;
		input.value = 'secret';
		input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
		expect(handler).toHaveBeenCalledOnce();
		expect(handler.mock.calls[0][0].detail.value).toBe('secret');
	});

	it('dispatches custom change event on change', async () => {
		el = await fixture('<rr-password-field></rr-password-field>');
		await waitForUpdate(el);
		const handler = vi.fn();
		el.addEventListener('change', handler);
		const input = el.shadowRoot!.querySelector('input')!;
		input.value = 'secret';
		input.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
		expect(handler).toHaveBeenCalledOnce();
		expect(handler.mock.calls[0][0].detail.value).toBe('secret');
	});

	it('does not double-fire input event', async () => {
		el = await fixture('<rr-password-field></rr-password-field>');
		await waitForUpdate(el);
		const handler = vi.fn();
		el.addEventListener('input', handler);
		const input = el.shadowRoot!.querySelector('input')!;
		input.value = 'test';
		input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
		expect(handler).toHaveBeenCalledOnce();
	});

	it('reflects disabled attribute to host', async () => {
		el = await fixture('<rr-password-field disabled></rr-password-field>');
		await waitForUpdate(el);
		expect(el.hasAttribute('disabled')).toBe(true);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.disabled).toBe(true);
	});

	it('reflects readonly attribute to host', async () => {
		el = await fixture('<rr-password-field readonly></rr-password-field>');
		await waitForUpdate(el);
		expect(el.hasAttribute('readonly')).toBe(true);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.readOnly).toBe(true);
	});

	it('disables visibility toggle button when disabled', async () => {
		el = await fixture('<rr-password-field disabled></rr-password-field>');
		await waitForUpdate(el);
		const button = el.shadowRoot!.querySelector('.password-field__visibility-toggle rr-button')!;
		expect(button.hasAttribute('disabled')).toBe(true);
	});

	it('reflects size attribute to host', async () => {
		el = await fixture('<rr-password-field size="sm"></rr-password-field>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('sm');
	});
});
