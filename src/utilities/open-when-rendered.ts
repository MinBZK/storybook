import type { LitElement } from 'lit';

/**
 * Defers an overlay's `show()` until the element has rendered its `<dialog>`.
 *
 * `show()` needs a dialog in the shadow root to call `showModal()` on. A consumer
 * that opens an overlay in the same tick it is created — an overlay bound to
 * `show=true` on a routed component, say — gets there first, and without this the
 * call would silently do nothing with nothing to retry it: the overlay stays shut
 * for good, which reads as a broken component rather than a race.
 *
 * Retried exactly once. If the dialog still is not there after the update, the
 * element was never rendered at all, and opening again would only queue another
 * retry against the same missing dialog.
 *
 * @param host The overlay element.
 * @param getDialog Resolves the dialog from the shadow root.
 * @param open Opens the overlay: the caller's own `show()`.
 * @returns Cancels the pending open, for a `hide()` that overtakes it.
 */
export function openWhenRendered(
	host: LitElement,
	getDialog: () => HTMLDialogElement | null,
	open: () => void,
): () => void {
	let cancelled = false;

	host.updateComplete.then(() => {
		if (cancelled || !getDialog()) return;
		open();
	});

	return () => {
		cancelled = true;
	};
}
