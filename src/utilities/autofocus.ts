/**
 * Focus the `[autofocus]` element inside an overlay, if there is one.
 *
 * The browser's own autofocus only reaches natively focusable elements. A
 * design-system field is a custom element whose input sits in its shadow root,
 * so `<nldd-text-field autofocus>` would be skipped entirely and the overlay
 * would open with focus on the dialog. Calling `focus()` on the host covers
 * both: our components forward it inward, and for a native element the browser
 * has already done it, which makes the second call a no-op.
 *
 * Custom elements may not have rendered yet when an overlay opens right after
 * an htmx swap, so a component that exposes `updateComplete` gets a second
 * attempt once it has.
 *
 * @returns true when an autofocus target was found, so the caller can skip its
 *          own fallback focus.
 */
export function focusAutofocusTarget(host: Element): boolean {
	const target = host.querySelector<HTMLElement>('[autofocus]');
	if (!target) return false;

	target.focus();

	const pending = (target as HTMLElement & { updateComplete?: Promise<unknown> }).updateComplete;
	if (pending && typeof pending.then === 'function') {
		pending.then(() => {
			// Only if focus is still sitting where the overlay left it: a user who
			// clicked elsewhere in the meantime should not be yanked back.
			if (!host.contains(document.activeElement) || document.activeElement === host) {
				target.focus();
			}
		});
	}
	return true;
}
