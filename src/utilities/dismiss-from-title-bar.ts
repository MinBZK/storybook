/**
 * True when a bubbling `dismiss` event originates from an `nldd-top-title-bar`'s
 * close button.
 *
 * Overlay containers (`nldd-sheet`, `nldd-window`) listen for bubbling `dismiss`
 * events to close themselves. But nested components fire their own `dismiss` for
 * their own element — an `nldd-token`'s remove button, an `nldd-banner`, an
 * `nldd-document-tab-bar` — and those must NOT close the container. Only the
 * container's own top-title-bar dismiss should. This shared check keeps that rule
 * identical across every overlay container.
 */
export function isDismissFromTitleBar(e: Event): boolean {
	return e.composedPath().some(
		(t) => t instanceof Element && t.tagName.toLowerCase() === 'nldd-top-title-bar',
	);
}
