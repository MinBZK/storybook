import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './form-actions.js';

describe('nldd-form-actions', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('rendert zonder fouten', async () => {
		el = await fixture('<nldd-form-actions></nldd-form-actions>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('rendert slot content', async () => {
		el = await fixture('<nldd-form-actions><button>Save</button></nldd-form-actions>');
		await waitForUpdate(el);
		const slot = el.shadowRoot!.querySelector('slot') as HTMLSlotElement;
		const assigned = slot.assignedElements();
		expect(assigned.length).toBe(1);
		expect((assigned[0] as HTMLElement).textContent).toBe('Save');
	});

	it('reflecteert label-alignment attribuut', async () => {
		el = await fixture('<nldd-form-actions label-alignment="right"></nldd-form-actions>');
		await waitForUpdate(el);
		expect(el.getAttribute('label-alignment')).toBe('right');
	});

	it('main is enige child van form-actions (spacer is een ::before pseudo-element)', async () => {
		el = await fixture('<nldd-form-actions label-alignment="right"><button>Save</button></nldd-form-actions>');
		await waitForUpdate(el);
		const root = el.shadowRoot!.querySelector('.form-actions')!;
		const main = el.shadowRoot!.querySelector('.form-actions__main');
		expect(main).not.toBeNull();
		// Geen spacer-div meer in DOM — alignment komt van .form-actions::before
		expect(el.shadowRoot!.querySelector('.form-actions__spacer')).toBeNull();
		expect(root.children.length).toBe(1);
		expect(root.firstElementChild).toBe(main);
	});
});
