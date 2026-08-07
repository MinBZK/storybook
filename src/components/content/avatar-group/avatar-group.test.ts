import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './avatar-group.js';

describe('nldd-avatar-group', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('rendert zonder fouten', async () => {
		el = await fixture('<nldd-avatar-group></nldd-avatar-group>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('slot de avatars in de groep', async () => {
		el = await fixture(`
			<nldd-avatar-group>
				<nldd-avatar name="Jan Jansen" decorative></nldd-avatar>
				<nldd-avatar name="Piet Pietersen" decorative></nldd-avatar>
			</nldd-avatar-group>
		`);
		await waitForUpdate(el);
		const slot = el.shadowRoot!.querySelector('slot')!;
		expect(slot.assignedElements().length).toBe(2);
	});

	it('is geen groep voor hulpsoftware zonder accessible-label', async () => {
		el = await fixture('<nldd-avatar-group><nldd-avatar name="Jan" decorative></nldd-avatar></nldd-avatar-group>');
		await waitForUpdate(el);
		const group = el.shadowRoot!.querySelector('.avatar-group')!;
		expect(group.getAttribute('role')).toBeNull();
		expect(group.getAttribute('aria-label')).toBeNull();
	});

	it('wordt een gelabelde groep met accessible-label', async () => {
		el = await fixture('<nldd-avatar-group accessible-label="Redactie"><nldd-avatar name="Jan" decorative></nldd-avatar></nldd-avatar-group>');
		await waitForUpdate(el);
		const group = el.shadowRoot!.querySelector('.avatar-group')!;
		expect(group.getAttribute('role')).toBe('group');
		expect(group.getAttribute('aria-label')).toBe('Redactie');
	});

	// No assertions on the sizes and the overlap: the test document carries no
	// design tokens, so every --_* that resolves to one computes to nothing
	// here. Those are checked in Storybook (Sizes and Overlap stories).
});
