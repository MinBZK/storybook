/**
 * An attribute one component hands to another without overruling what is
 * already there.
 *
 * The closer to the control, the more specific, so the heavier it weighs. An
 * `aria-label` on a slotted `<select>` beats the `accessible-label` on the
 * wrapper around it, which beats the caption of the `nldd-form-field` above
 * that. Every layer does two things and no more: it fills a gap, and it takes
 * back only what it wrote itself.
 *
 * Without that second half a component reads "I have no name to give" as
 * "remove the name that is there", which is how a documented way of naming a
 * control quietly stopped working.
 *
 * @param applied what this component wrote here last time, or null
 * @returns the new value to remember, to pass back in on the next call
 */
export function setOwnedAttribute(
	el: Element,
	name: string,
	value: string,
	applied: string | null,
): string | null {
	const current = el.getAttribute(name);

	// Someone else's value. Leave it alone, and keep remembering ours as it was,
	// so a later change of theirs does not suddenly look like ours.
	if (current !== null && current !== applied) return applied;

	if (value) {
		el.setAttribute(name, value);
		return value;
	}

	if (current !== null) el.removeAttribute(name);
	return null;
}
