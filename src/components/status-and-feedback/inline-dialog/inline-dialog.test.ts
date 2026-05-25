import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './inline-dialog.js';

describe('nldd-inline-dialog', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-inline-dialog></nldd-inline-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders text as p when heading-level is not set', async () => {
		el = await fixture('<nldd-inline-dialog text="Bevestiging vereist"></nldd-inline-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('p.inline-dialog__text')?.textContent?.trim()).toBe('Bevestiging vereist');
	});

	it('renders text as h2 when heading-level="2"', async () => {
		el = await fixture('<nldd-inline-dialog text="Bevestiging vereist" heading-level="2"></nldd-inline-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('h2.inline-dialog__text')?.textContent?.trim()).toBe('Bevestiging vereist');
	});

	it('renders text as h3 when heading-level="3"', async () => {
		el = await fixture('<nldd-inline-dialog text="Bevestiging vereist" heading-level="3"></nldd-inline-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('h3.inline-dialog__text')?.textContent?.trim()).toBe('Bevestiging vereist');
	});

	it('renders supporting-text when set', async () => {
		el = await fixture('<nldd-inline-dialog supporting-text="Dit kan niet ongedaan worden gemaakt."></nldd-inline-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.inline-dialog__supporting-text')?.textContent?.trim()).toBe('Dit kan niet ongedaan worden gemaakt.');
	});

	it('does not render text element when text is absent', async () => {
		el = await fixture('<nldd-inline-dialog></nldd-inline-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.inline-dialog__text')).toBeNull();
	});

	it('does not render supporting-text element when absent', async () => {
		el = await fixture('<nldd-inline-dialog></nldd-inline-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.inline-dialog__supporting-text')).toBeNull();
	});

	it('renders icon when icon is set', async () => {
		el = await fixture('<nldd-inline-dialog icon="check-mark-circle"></nldd-inline-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.inline-dialog__icon')).not.toBeNull();
	});

	it('does not render icon when icon is absent and no variant', async () => {
		el = await fixture('<nldd-inline-dialog></nldd-inline-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.inline-dialog__icon')).toBeNull();
	});

	it('forces icon to "alert" when variant="alert" and no explicit icon', async () => {
		el = await fixture('<nldd-inline-dialog variant="alert"></nldd-inline-dialog>');
		await waitForUpdate(el);
		const icon = el.shadowRoot!.querySelector('nldd-icon');
		expect(icon?.getAttribute('name')).toBe('alert');
	});

	it('variant="alert" always overrides explicit icon', async () => {
		el = await fixture('<nldd-inline-dialog variant="alert" icon="info-circle"></nldd-inline-dialog>');
		await waitForUpdate(el);
		const icon = el.shadowRoot!.querySelector('nldd-icon');
		expect(icon?.getAttribute('name')).toBe('alert');
	});

	it('reflects variant attribute', async () => {
		el = await fixture('<nldd-inline-dialog variant="alert"></nldd-inline-dialog>');
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('alert');
	});

	it('reflects size attribute', async () => {
		el = await fixture('<nldd-inline-dialog size="lg"></nldd-inline-dialog>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('lg');
	});

	it('defaults size to md when omitted', async () => {
		el = await fixture('<nldd-inline-dialog></nldd-inline-dialog>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('md');
	});

	it('renders actions slot wrapped in nldd-button-group', async () => {
		el = await fixture(`
			<nldd-inline-dialog>
				<nldd-button slot="actions" variant="primary" text="Bevestig"></nldd-button>
			</nldd-inline-dialog>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('nldd-button-group')).not.toBeNull();
	});

	it('renders success icon when variant="success"', async () => {
		el = await fixture('<nldd-inline-dialog variant="success"></nldd-inline-dialog>');
		await waitForUpdate(el);
		const icon = el.shadowRoot!.querySelector('nldd-icon');
		expect(icon?.getAttribute('name')).toBe('success');
	});

	it('reflects icon-color attribute', async () => {
		el = await fixture('<nldd-inline-dialog icon="info-circle" icon-color="success"></nldd-inline-dialog>');
		await waitForUpdate(el);
		expect(el.getAttribute('icon-color')).toBe('success');
	});

	it('icon-color overrides the variant icon color', async () => {
		el = await fixture('<nldd-inline-dialog variant="alert" icon-color="critical"></nldd-inline-dialog>');
		await waitForUpdate(el);
		const iconColor = getComputedStyle(el).getPropertyValue('--_icon-color').trim();
		const expected = getComputedStyle(document.documentElement)
			.getPropertyValue('--semantics-content-critical-color').trim();
		expect(iconColor).toBe(expected);
	});
});
