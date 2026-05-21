/**
 * Notifies subscribers when `:root[data-scheme]` flips, so they can force
 * a repaint of any scrollable region with `light-dark()` colours.
 *
 * Why this exists: browsers (Chromium especially) cache off-screen tiles
 * for composited scroll layers and don't always invalidate them when a
 * `color-scheme` flip re-resolves `light-dark()` values. Scroll back
 * after a theme switch and you see stale colours from the old scheme.
 * Components with overflowing scroll containers can subscribe here and
 * drop their compositor layer on each scheme change.
 *
 * The MutationObserver runs lazily — set up on first subscribe, torn
 * down when the last subscriber unsubscribes.
 */

type Listener = () => void;

const listeners = new Set<Listener>();
let observer: MutationObserver | null = null;

function init(): void {
	if (observer) return;
	observer = new MutationObserver((mutations) => {
		for (const m of mutations) {
			if (m.attributeName === 'data-scheme') {
				for (const l of listeners) l();
				return;
			}
		}
	});
	observer.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ['data-scheme'],
	});
}

/**
 * Subscribe to color-scheme changes. The callback fires synchronously
 * from the MutationObserver — before the next paint — so dropping a
 * compositor layer from inside it invalidates stale tiles before they
 * become visible.
 *
 * @returns Unsubscribe function. Tears down the global observer when
 *          the last subscriber leaves.
 */
export function onColorSchemeChange(callback: Listener): () => void {
	init();
	listeners.add(callback);
	return () => {
		listeners.delete(callback);
		if (listeners.size === 0) {
			observer?.disconnect();
			observer = null;
		}
	};
}

/**
 * Force a scrollable element to drop and recreate its compositor layer,
 * invalidating any stale off-screen paint tiles. Preserves scrollLeft/Top
 * so the user doesn't lose their position, and restores the caller's
 * inline `display` value.
 *
 * Use this from an `onColorSchemeChange` callback.
 *
 * Caveat: the display:none → reflow → display cycle fires any
 * ResizeObserver watching this element (it reports width/height 0, then
 * the original size). Harmless for elements no one observes, but a
 * component that observes its own scroll container should audit for
 * resize-driven side effects before adopting this.
 */
export function forceScrollLayerRepaint(el: HTMLElement): void {
	const x = el.scrollLeft;
	const y = el.scrollTop;
	// Save the caller's inline display so a legitimate value (e.g. an
	// explicit `display: flex`) survives — clearing to '' would drop it.
	const prevDisplay = el.style.display;
	el.style.display = 'none';
	// Synchronous reflow drops the layer; the browser doesn't paint
	// between this and re-showing, so there's no visible flicker.
	void el.offsetHeight;
	el.style.display = prevDisplay;
	el.scrollLeft = x;
	el.scrollTop = y;
}

/** @internal Reset state for testing only. */
export function _resetColorSchemeRepaintForTesting(): void {
	observer?.disconnect();
	observer = null;
	listeners.clear();
}
