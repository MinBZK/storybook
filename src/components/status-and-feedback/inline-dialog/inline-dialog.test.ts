import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './ndd-inline-dialog.ts';

describe('ndd-inline-dialog', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-inline-dialog></ndd-inline-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders text as p when heading-level is not set', async () => {
		el = await fixture('<ndd-inline-dialog text="Bevestiging vereist"></ndd-inline-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('p.inline-dialog__text')?.textContent?.trim()).toBe('Bevestiging vereist');
	});

	it('renders text as h2 when heading-level="2"', async () => {
		el = await fixture('<ndd-inline-dialog text="Bevestiging vereist" heading-level="2"></ndd-inline-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('h2.inline-dialog__text')?.textContent?.trim()).toBe('Bevestiging vereist');
	});

	it('renders text as h3 when heading-level="3"', async () => {
		el = await fixture('<ndd-inline-dialog text="Bevestiging vereist" heading-level="3"></ndd-inline-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('h3.inline-dialog__text')?.textContent?.trim()).toBe('Bevestiging vereist');
	});

	it('renders supporting-text when set', async () => {
		el = await fixture('<ndd-inline-dialog supporting-text="Dit kan niet ongedaan worden gemaakt."></ndd-inline-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.inline-dialog__supporting-text')?.textContent?.trim()).toBe('Dit kan niet ongedaan worden gemaakt.');
	});

	it('does not render text element when text is absent', async () => {
		el = await fixture('<ndd-inline-dialog></ndd-inline-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.inline-dialog__text')).toBeNull();
	});

	it('does not render supporting-text element when absent', async () => {
		el = await fixture('<ndd-inline-dialog></ndd-inline-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.inline-dialog__supporting-text')).toBeNull();
	});

	it('renders icon when icon-name is set', async () => {
		el = await fixture('<ndd-inline-dialog icon-name="check-mark-circle"></ndd-inline-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.inline-dialog__icon')).not.toBeNull();
	});

	it('does not render icon when icon-name is absent and no variant', async () => {
		el = await fixture('<ndd-inline-dialog></ndd-inline-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.inline-dialog__icon')).toBeNull();
	});

	it('forces icon-name to "alert" when variant="alert" and no explicit icon-name', async () => {
		el = await fixture('<ndd-inline-dialog variant="alert"></ndd-inline-dialog>');
		await waitForUpdate(el);
		const icon = el.shadowRoot!.querySelector('ndd-icon');
		expect(icon?.getAttribute('name')).toBe('alert');
	});

	it('variant="alert" always overrides explicit icon-name', async () => {
		el = await fixture('<ndd-inline-dialog variant="alert" icon-name="info-circle"></ndd-inline-dialog>');
		await waitForUpdate(el);
		const icon = el.shadowRoot!.querySelector('ndd-icon');
		expect(icon?.getAttribute('name')).toBe('alert');
	});

	it('reflects variant attribute', async () => {
		el = await fixture('<ndd-inline-dialog variant="alert"></ndd-inline-dialog>');
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('alert');
	});

	it('renders actions slot wrapped in ndd-button-group', async () => {
		el = await fixture(`
			<ndd-inline-dialog>
				<ndd-button slot="actions" variant="primary" text="Bevestig"></ndd-button>
			</ndd-inline-dialog>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('ndd-button-group')).not.toBeNull();
	});
});
