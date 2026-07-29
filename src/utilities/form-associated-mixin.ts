import type { LitElement, ReactiveController } from 'lit';

/** What ElementInternals accepts as a form value. */
export type FormValue = string | File | FormData | null;

// Abstract, so an abstract base (nldd-code-editor and nldd-text-editor share
// NLDDCodeMirrorElement) can be mixed in too.
type Constructor<T = Record<string, unknown>> = abstract new (...args: any[]) => T;

export interface FormAssociatedElement {
	readonly internals: ElementInternals;
	/** The value submitted under `name`; `null` submits nothing. Override this. */
	formValue(): FormValue;
	/** Extra state for bfcache and state restore, when the value alone is not enough. */
	formState(): FormValue | undefined;
	commitFormValue(): void;
}

/**
 * Turns a Lit element into a form-associated custom element: it submits under
 * `name`, follows a disabled fieldset, and can be read back with `FormData`.
 *
 * A component supplies the one thing that is its own — what it submits — by
 * overriding `formValue()`. Everything around it lives here, including the
 * timing: the value is committed on every render AND has to be committed again
 * from the handler that changed it, with `commitFormValue()`. A render is a
 * task later than the event, so a listener that serializes the form on `change`
 * (htmx, or a plain `new FormData(form)`) runs before the render and would
 * otherwise read the value from before the change. That contract is checked for
 * every input at once in `form-value-timing.test.ts`.
 *
 * Reset and state restore stay with the component: what "the initial value" is
 * differs per input (checked, text, a number to clamp, two fields at once), so
 * a component implements `formResetCallback` / `formStateRestoreCallback`
 * itself.
 */
export function FormAssociated<T extends Constructor<LitElement>>(Base: T) {
	abstract class FormAssociatedMixin extends Base implements FormAssociatedElement {
		static formAssociated = true;

		readonly internals = this.attachInternals();

		constructor(...args: any[]) {
			super(...args);
			// A controller, not an updated() override: a component that defines
			// its own updated() would have to remember to call super.
			const commit: ReactiveController = { hostUpdated: () => this.commitFormValue() };
			this.addController(commit);
		}

		/** The value submitted under `name`; `null` submits nothing. Override. */
		formValue(): FormValue {
			return null;
		}

		/** Extra state kept for bfcache and state restore, when the submitted
		 *  value alone cannot rebuild the control (a combo box submits a code but
		 *  shows a label). Override alongside `formValue()`. */
		formState(): FormValue | undefined {
			return undefined;
		}

		/** Commit the value now, from the handler that changed it. */
		commitFormValue(): void {
			this.internals.setFormValue(this.formValue(), this.formState());
		}

		formDisabledCallback(disabled: boolean): void {
			// Every form-associated component declares its own `disabled` property
			// (with its own reflection), so the mixin only writes to it.
			(this as unknown as { disabled: boolean }).disabled = disabled;
		}
	}

	return FormAssociatedMixin as unknown as T & Constructor<InstanceType<T> & FormAssociatedElement>;
}