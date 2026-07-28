import { describe, it, expect, afterEach } from 'vitest';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { fixture, cleanup, waitForUpdate } from '../test-utils.js';
import { FormAssociated, type FormValue } from './form-associated-mixin.js';

class TestField extends FormAssociated(LitElement) {
	@property({ type: String, reflect: true })
	name = '';

	@property({ type: String })
	value = '';

	@property({ type: Boolean, reflect: true })
	disabled = false;

	override formValue(): FormValue {
		return this.value || null;
	}

	override render() {
		return html`<slot></slot>`;
	}
}
customElements.define('test-form-field', TestField);

describe('FormAssociated', () => {
	let el: HTMLElement;

	afterEach(() => cleanup(el));

	it('submits its value under name', async () => {
		el = await fixture<HTMLFormElement>('<form><test-form-field name="veld" value="a"></test-form-field></form>');
		const field = el.querySelector('test-form-field') as TestField;
		await waitForUpdate(field);

		expect(new FormData(el as HTMLFormElement).get('veld')).toBe('a');
	});

	it('commits again on demand, before the next render', async () => {
		el = await fixture<HTMLFormElement>('<form><test-form-field name="veld" value="a"></test-form-field></form>');
		const field = el.querySelector('test-form-field') as TestField;
		await waitForUpdate(field);

		// Set without awaiting the render, the way an event handler does.
		field.value = 'b';
		field.commitFormValue();

		expect(new FormData(el as HTMLFormElement).get('veld')).toBe('b');
	});

	it('submits nothing when formValue returns null', async () => {
		el = await fixture<HTMLFormElement>('<form><test-form-field name="veld"></test-form-field></form>');
		await waitForUpdate(el.querySelector('test-form-field') as TestField);

		expect(new FormData(el as HTMLFormElement).has('veld')).toBe(false);
	});

	it('follows a disabled fieldset', async () => {
		el = await fixture<HTMLFormElement>(`
			<form><fieldset><test-form-field name="veld" value="a"></test-form-field></fieldset></form>
		`);
		const field = el.querySelector('test-form-field') as TestField;
		await waitForUpdate(field);

		(el.querySelector('fieldset') as HTMLFieldSetElement).disabled = true;
		await waitForUpdate(field);

		expect(field.disabled).toBe(true);
	});

	it('leaves updated() to the component', async () => {
		// The mixin commits through a controller, so a component that defines its
		// own updated() does not have to remember to call super.
		let ran = 0;
		class WithUpdated extends FormAssociated(LitElement) {
			disabled = false;
			value = 'x';
			override formValue(): FormValue {
				return this.value;
			}

			override updated(): void {
				ran += 1;
			}
		}
		customElements.define('test-form-field-updated', WithUpdated);

		el = await fixture<HTMLFormElement>('<form><test-form-field-updated name="veld"></test-form-field-updated></form>');
		const field = el.querySelector('test-form-field-updated') as WithUpdated;
		field.setAttribute('name', 'veld');
		await waitForUpdate(field);

		expect(ran).toBeGreaterThan(0);
		expect(new FormData(el as HTMLFormElement).get('veld')).toBe('x');
	});
});
