import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './multi-line-text-field.js';

describe('nldd-multi-line-text-field', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-multi-line-text-field></nldd-multi-line-text-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a native textarea', async () => {
		el = await fixture('<nldd-multi-line-text-field></nldd-multi-line-text-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('textarea')).not.toBeNull();
	});

	it('renders valid icon when valid attribute is set', async () => {
		el = await fixture('<nldd-multi-line-text-field valid></nldd-multi-line-text-field>');
		await waitForUpdate(el);
		const icon = el.shadowRoot!.querySelector('.multi-line-text-field__validation-icon-area nldd-icon');
		expect(icon).not.toBeNull();
		expect(icon!.getAttribute('name')).toBe('valid');
	});

	it('renders invalid icon when invalid attribute is set', async () => {
		el = await fixture('<nldd-multi-line-text-field invalid></nldd-multi-line-text-field>');
		await waitForUpdate(el);
		const icon = el.shadowRoot!.querySelector('.multi-line-text-field__validation-icon-area nldd-icon');
		expect(icon).not.toBeNull();
		expect(icon!.getAttribute('name')).toBe('invalid');
	});

	it('does not render validation icon in neutral state', async () => {
		el = await fixture('<nldd-multi-line-text-field></nldd-multi-line-text-field>');
		await waitForUpdate(el);
		const area = el.shadowRoot!.querySelector('.multi-line-text-field__validation-icon-area');
		expect(area).toBeNull();
	});

	it('dispatches custom input event on input', async () => {
		el = await fixture('<nldd-multi-line-text-field></nldd-multi-line-text-field>');
		await waitForUpdate(el);
		const handler = vi.fn();
		el.addEventListener('input', handler);
		const textarea = el.shadowRoot!.querySelector('textarea')!;
		textarea.value = 'hello\nworld';
		textarea.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
		expect(handler).toHaveBeenCalledOnce();
		expect(handler.mock.calls[0][0].detail.value).toBe('hello\nworld');
	});

	it('dispatches custom change event on change', async () => {
		el = await fixture('<nldd-multi-line-text-field></nldd-multi-line-text-field>');
		await waitForUpdate(el);
		const handler = vi.fn();
		el.addEventListener('change', handler);
		const textarea = el.shadowRoot!.querySelector('textarea')!;
		textarea.value = 'committed';
		textarea.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
		expect(handler).toHaveBeenCalledOnce();
		expect(handler.mock.calls[0][0].detail.value).toBe('committed');
	});

	it('does not double-fire input event', async () => {
		el = await fixture('<nldd-multi-line-text-field></nldd-multi-line-text-field>');
		await waitForUpdate(el);
		const handler = vi.fn();
		el.addEventListener('input', handler);
		const textarea = el.shadowRoot!.querySelector('textarea')!;
		textarea.value = 'test';
		textarea.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
		expect(handler).toHaveBeenCalledOnce();
	});

	it('reflects disabled attribute to host', async () => {
		el = await fixture('<nldd-multi-line-text-field disabled></nldd-multi-line-text-field>');
		await waitForUpdate(el);
		expect(el.hasAttribute('disabled')).toBe(true);
		const textarea = el.shadowRoot!.querySelector('textarea')!;
		expect(textarea.disabled).toBe(true);
	});

	it('reflects readonly attribute to host', async () => {
		el = await fixture('<nldd-multi-line-text-field readonly></nldd-multi-line-text-field>');
		await waitForUpdate(el);
		expect(el.hasAttribute('readonly')).toBe(true);
		const textarea = el.shadowRoot!.querySelector('textarea')!;
		expect(textarea.readOnly).toBe(true);
	});

	it('reflects size attribute to host', async () => {
		el = await fixture('<nldd-multi-line-text-field size="sm"></nldd-multi-line-text-field>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('sm');
	});

	it('reflects resize attribute to host', async () => {
		el = await fixture('<nldd-multi-line-text-field resize="auto"></nldd-multi-line-text-field>');
		await waitForUpdate(el);
		expect(el.getAttribute('resize')).toBe('auto');
	});

	it('passes rows attribute to inner textarea', async () => {
		el = await fixture('<nldd-multi-line-text-field rows="5"></nldd-multi-line-text-field>');
		await waitForUpdate(el);
		const textarea = el.shadowRoot!.querySelector('textarea')!;
		expect(textarea.rows).toBe(5);
	});

	it('defaults to rows="3"', async () => {
		el = await fixture('<nldd-multi-line-text-field></nldd-multi-line-text-field>');
		await waitForUpdate(el);
		const textarea = el.shadowRoot!.querySelector('textarea')!;
		expect(textarea.rows).toBe(3);
	});

	it('forwards accessible-label to the inner textarea', async () => {
		el = await fixture('<nldd-multi-line-text-field accessible-label="Toelichting"></nldd-multi-line-text-field>');
		await waitForUpdate(el);
		const textarea = el.shadowRoot!.querySelector('textarea')!;
		expect(textarea.getAttribute('aria-label')).toBe('Toelichting');
	});

	it('forwards error-message-ids to inner textarea aria-describedby', async () => {
		el = await fixture('<nldd-multi-line-text-field error-message-ids="help-1 error-1"></nldd-multi-line-text-field>');
		await waitForUpdate(el);
		const textarea = el.shadowRoot!.querySelector('textarea')!;
		expect(textarea.getAttribute('aria-describedby')).toBe('help-1 error-1');
	});

	it('omits aria-describedby from inner textarea when error-message-ids not set', async () => {
		el = await fixture('<nldd-multi-line-text-field></nldd-multi-line-text-field>');
		await waitForUpdate(el);
		const textarea = el.shadowRoot!.querySelector('textarea')!;
		expect(textarea.hasAttribute('aria-describedby')).toBe(false);
	});

	it('past inline host width toe als width property gezet is', async () => {
		el = await fixture('<nldd-multi-line-text-field width="240px"></nldd-multi-line-text-field>');
		await waitForUpdate(el);
		expect(el.getAttribute('width')).toBe('240px');
		expect((el as HTMLElement).style.width).toBe('240px');
	});

	it('wist inline textarea dimensies wanneer resize op "auto" wordt gezet', async () => {
		el = await fixture('<nldd-multi-line-text-field resize="vertical"></nldd-multi-line-text-field>');
		await waitForUpdate(el);
		const textarea = el.shadowRoot!.querySelector('textarea')!;
		// Simulate a manual resize: browser writes inline height on the textarea
		textarea.style.height = '200px';
		textarea.style.width = '300px';
		(el as any).resize = 'auto';
		await waitForUpdate(el);
		expect(textarea.style.height).toBe('');
		expect(textarea.style.width).toBe('');
	});

	it('verwijdert inline host width als width leeg wordt gezet', async () => {
		el = await fixture('<nldd-multi-line-text-field width="240px"></nldd-multi-line-text-field>');
		await waitForUpdate(el);
		(el as any).width = '';
		await waitForUpdate(el);
		expect((el as HTMLElement).style.width).toBe('');
	});
});
