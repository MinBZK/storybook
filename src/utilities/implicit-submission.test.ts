import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../test-utils.js';
import '../components/inputs/text-field/text-field.js';
import '../components/inputs/password-field/password-field.js';
import '../components/inputs/number-field/number-field.js';
import '../components/inputs/multi-line-text-field/multi-line-text-field.js';
import '../components/inputs/search-field/search-field.js';
import '../components/actions/button/button.js';

/** Presses Enter on the inner control of a field, the way a user would. */
function pressEnter(field: Element): void {
	const inner = field.shadowRoot!.querySelector('input, textarea') as HTMLElement;
	inner.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true, cancelable: true }));
}

describe('Enter submits the form a field belongs to', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	function onSubmit(form: HTMLFormElement) {
		const spy = vi.fn((e: Event) => e.preventDefault());
		form.addEventListener('submit', spy);
		return spy;
	}

	it('submits from a single-line field with a submit button', async () => {
		el = await fixture(`
			<form>
				<nldd-text-field></nldd-text-field>
				<nldd-text-field></nldd-text-field>
				<nldd-button type="submit" text="Opslaan"></nldd-button>
			</form>
		`);
		await waitForUpdate(el);
		const submit = onSubmit(el as HTMLFormElement);
		pressEnter(el.querySelector('nldd-text-field')!);
		expect(submit).toHaveBeenCalledOnce();
	});

	it('submits from a lone field without a submit button', async () => {
		el = await fixture('<form><nldd-text-field></nldd-text-field></form>');
		await waitForUpdate(el);
		const submit = onSubmit(el as HTMLFormElement);
		pressEnter(el.querySelector('nldd-text-field')!);
		expect(submit).toHaveBeenCalledOnce();
	});

	// The specification's rule: with no submit button and more than one field
	// that blocks implicit submission, Enter does nothing. An Enter that behaves
	// differently inside this design system than outside it is worse than one
	// that does nothing.
	it('stays put with several fields and no submit button', async () => {
		el = await fixture(`
			<form>
				<nldd-text-field></nldd-text-field>
				<nldd-password-field></nldd-password-field>
			</form>
		`);
		await waitForUpdate(el);
		const submit = onSubmit(el as HTMLFormElement);
		pressEnter(el.querySelector('nldd-text-field')!);
		expect(submit).not.toHaveBeenCalled();
	});

	it('submits from a number field', async () => {
		el = await fixture('<form><nldd-number-field></nldd-number-field></form>');
		await waitForUpdate(el);
		const submit = onSubmit(el as HTMLFormElement);
		pressEnter(el.querySelector('nldd-number-field')!);
		expect(submit).toHaveBeenCalledOnce();
	});

	it('leaves a multi-line field alone, where Enter makes a new line', async () => {
		el = await fixture('<form><nldd-multi-line-text-field></nldd-multi-line-text-field></form>');
		await waitForUpdate(el);
		const submit = onSubmit(el as HTMLFormElement);
		pressEnter(el.querySelector('nldd-multi-line-text-field')!);
		expect(submit).not.toHaveBeenCalled();
	});

	it('leaves a search field alone, which keeps its own Enter', async () => {
		el = await fixture('<form><nldd-search-field></nldd-search-field></form>');
		await waitForUpdate(el);
		const submit = onSubmit(el as HTMLFormElement);
		pressEnter(el.querySelector('nldd-search-field')!);
		expect(submit).not.toHaveBeenCalled();
	});

	it('does nothing when something already handled the Enter', async () => {
		el = await fixture('<form><nldd-text-field></nldd-text-field></form>');
		await waitForUpdate(el);
		const submit = onSubmit(el as HTMLFormElement);
		const field = el.querySelector('nldd-text-field')!;
		const inner = field.shadowRoot!.querySelector('input') as HTMLElement;
		inner.dispatchEvent(Object.assign(
			new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true, cancelable: true }),
			{},
		));
		// een tweede Enter die al is afgehandeld
		const handled = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true, cancelable: true });
		handled.preventDefault();
		submit.mockClear();
		inner.dispatchEvent(handled);
		expect(submit).not.toHaveBeenCalled();
	});

	it('does nothing outside a form', async () => {
		el = await fixture('<div><nldd-text-field></nldd-text-field></div>');
		await waitForUpdate(el);
		expect(() => pressEnter(el.querySelector('nldd-text-field')!)).not.toThrow();
	});
});
