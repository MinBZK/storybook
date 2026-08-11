/**
 * Enter in a single-line field submits the form it belongs to.
 *
 * The browser does this by itself and calls it implicit submission, but only
 * for a control that has a form owner. The real `<input>` of an nldd field
 * lives in a shadow root, and form ownership does not cross that boundary:
 * `input.form` is null, so the browser has no form to submit and nothing
 * happens. The component is form-associated through ElementInternals, which
 * does know the form, so the behavior is handed back over that connection. It
 * mirrors what `nldd-button type="submit"` already does from the other side.
 */

/** Input types that block implicit submission, per the HTML specification. */
const BLOCKING_INPUT_TYPES = new Set([
	'text', 'search', 'url', 'tel', 'email', 'password',
	'date', 'month', 'week', 'time', 'datetime-local', 'number',
]);

/**
 * Whether this control counts for the "more than one field" rule below. Native
 * inputs are classified by type, the way the specification does it; an nldd
 * field says so itself with `static blocksImplicitSubmission = true`.
 */
function blocksImplicitSubmission(el: Element): boolean {
	if (el instanceof HTMLInputElement) return BLOCKING_INPUT_TYPES.has(el.type);
	return (el.constructor as { blocksImplicitSubmission?: boolean }).blocksImplicitSubmission === true;
}

/**
 * The button the browser would press. A `<button>` without a type is a submit
 * button, and `nldd-button type="submit"` carries the same attribute.
 */
function hasDefaultButton(form: HTMLFormElement): boolean {
	return form.querySelector('button:not([type]), [type="submit"], [type="image"]') !== null;
}

/**
 * Submits the form this field belongs to, under the same conditions the browser
 * uses.
 *
 * Does nothing when something already handled the Enter. A component that owns
 * the key calls `preventDefault` when it acts on it and leaves it alone when it
 * does not, so an open date picker keeps its Enter and a token field that
 * commits nothing lets the form through.
 *
 * Without a submit button the specification submits only when the form holds a
 * single field that blocks implicit submission. Reproducing that rule matters
 * more than it looks: an Enter that behaves differently inside this design
 * system than outside it is worse than one that does nothing.
 *
 * @returns whether the form was submitted, so a caller can tell.
 */
export function submitOnEnter(
	host: HTMLElement & { internals: ElementInternals },
	event: KeyboardEvent,
): boolean {
	if (event.key !== 'Enter' || event.isComposing || event.defaultPrevented) return false;

	const form = host.internals.form;
	if (!form) return false;

	if (!hasDefaultButton(form)) {
		const blocking = Array.from(form.elements).filter(blocksImplicitSubmission);
		if (blocking.length > 1) return false;
	}

	event.preventDefault();
	form.requestSubmit();
	return true;
}
