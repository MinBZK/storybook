import type { NLDDNotification } from './notification.js';

/**
 * The one place every notification ends up, wherever a consumer wrote it.
 *
 * It exists because a notification cannot answer the three questions that decide
 * its behavior on its own: where it sits in the stack, how deep it is buried,
 * and whether it is the one that should be counting down. All three are
 * properties of the group. The region owns the group, so it owns the answers.
 *
 * ## The deck
 * Notifications sit on top of each other, the front one readable and the older
 * ones peeking out below it, so a burst of messages takes the room of roughly
 * one. The newest is in front and is the one counting down. Dismiss it and the
 * one behind it is already standing there: it slides up into the place that
 * came free and its message fades in, because it was there all along.
 *
 * ## Opening it
 * Under the front notification sits a strip as wide as the deck and as tall as
 * the deck is when it fans out. That strip is the handle: pointing at it fans
 * the deck out to fill it, clicking it lays the deck out as a list. Moving
 * focus into the region does the same, and clicking or tabbing away puts it
 * back. Nothing counts down while the list is open, because open means someone
 * is reading. The notification itself is not a button, so a click on the
 * message you are reading does nothing, which is what it says it does.
 */
const REGION_ID = 'nldd-notification-region';

/** Past this a notification adds no edge of its own: it would sit exactly
 *  behind the last one that does, and stack another copy of the same shadow on
 *  the same spot. Three cards is enough to say "there is more". */
const MAX_DEPTH = 2;

let frontObserver: ResizeObserver | null = null;
let expanded = false;

/**
 * A modal overlay paints in the browser's top layer, above the whole document
 * and out of reach of any z-index, and while one is open everything outside it
 * is inert: a region left on the body is not merely behind the sheet, it is
 * unclickable even once you put it in the top layer yourself. So the region
 * travels. It lives in the topmost open overlay and sinks back as they close,
 * which is also what makes a notification raised before the sheet opened come
 * along rather than stay behind it.
 *
 * Innermost last. Entries are verified on read rather than trusted, so an
 * overlay torn out of the DOM without closing cannot strand the region.
 */
const overlays: HTMLElement[] = [];
let watchingOverlays = false;

function modalOf(host: HTMLElement): HTMLElement | null {
	const dialog = host.shadowRoot?.querySelector('dialog') ?? null;
	return dialog?.matches(':modal') ? dialog : null;
}

function regionHost(): HTMLElement {
	while (overlays.length) {
		const top = overlays[overlays.length - 1];
		if (top.isConnected && modalOf(top)) return top;
		overlays.pop();
	}
	return document.body;
}

function placeRegion(region: HTMLElement): void {
	const host = regionHost();
	if (region.parentElement === host) return;
	// Slotted rather than put in the overlay's shadow root: it has to be a flat
	// tree descendant of the dialog to escape the inertness, and its own slot
	// keeps it out of the default one, whose content decides how an
	// nldd-modal-dialog aligns.
	if (host === document.body) region.removeAttribute('slot');
	else region.setAttribute('slot', 'overlay-layer');
	const carried = notifications(region);
	carried.forEach((item) => item._setMoving?.(true));
	host.appendChild(region);
	carried.forEach((item) => item._setMoving?.(false));
}

function relocateRegion(): void {
	const region = document.getElementById(REGION_ID);
	if (region) placeRegion(region);
}

function watchOverlays(): void {
	if (watchingOverlays) return;
	watchingOverlays = true;
	document.addEventListener('open', (event) => {
		const host = event.target as HTMLElement | null;
		if (!host?.shadowRoot || !modalOf(host)) return;
		if (!overlays.includes(host)) overlays.push(host);
		relocateRegion();
	});
	// close does not bubble, so it is caught on the way down instead.
	document.addEventListener('close', (event) => {
		const host = event.target as HTMLElement | null;
		const at = host ? overlays.indexOf(host) : -1;
		if (at === -1) return;
		overlays.splice(at, 1);
		relocateRegion();
	}, true);
}

function notifications(region: HTMLElement): NLDDNotification[] {
	return Array.from(region.querySelectorAll<NLDDNotification>(':scope > nldd-notification'));
}

function expander(region: HTMLElement): HTMLElement {
	return region.querySelector<HTMLElement>(':scope > [data-expander]')!;
}

function ensureRegion(label: string): HTMLElement {
	const existing = document.getElementById(REGION_ID);
	if (existing) return existing;

	const region = document.createElement('div');
	region.id = REGION_ID;
	// Styled here rather than in a stylesheet because this element is not a
	// component: it is the one fixed place notifications land, and where that is
	// deliberately cannot be set. Top right from md so it stays clear of the
	// content, full width across the top below that, where there is no corner to
	// spare. One grid cell holds every notification, so the deck stacks without
	// any of them taking room of its own.
	region.style.cssText = [
		'box-sizing: border-box',
		'position: fixed',
		'z-index: 1000',
		'top: max(var(--semantics-overlays-inset), env(safe-area-inset-top))',
		'right: max(var(--semantics-overlays-inset), env(safe-area-inset-right))',
		'left: auto',
		'display: grid',
		'align-items: start',
		'pointer-events: none',
		'max-height: calc(100dvh - 2 * var(--semantics-overlays-inset))',
	].join(';');
	// The stack itself catches no clicks, only the notifications in it, so the
	// empty space beside them stays part of the page.
	region.addEventListener('pointerdown', () => {}, { passive: true });
	// Focus is the keyboard's way of reaching for the deck. Without this, tabbing
	// would land on a button in a notification nobody can see.
	region.addEventListener('focusin', () => setExpanded(region, true));
	region.addEventListener('focusout', (e) => {
		if (region.contains((e as FocusEvent).relatedTarget as Node)) return;
		setExpanded(region, false);
	});
	// A live region so a notification is announced wherever it was written; the
	// urgency itself comes from each notification's own role.
	region.setAttribute('role', 'region');
	region.setAttribute('aria-label', label);
	region.appendChild(makeExpander(region));
	placeRegion(region);
	return region;
}

/**
 * The strip under the front notification. It covers the edges peeking out from
 * behind it, which on their own are a few pixels tall and no target at all, and
 * it stays exactly as tall as the deck is when it fans out, so what you point
 * at is what you get.
 */
function makeExpander(region: HTMLElement): HTMLElement {
	const strip = document.createElement('div');
	strip.dataset.expander = '';
	strip.style.cssText = [
		'position: absolute',
		'z-index: 1000',
		'top: 100%',
		'right: 0',
		'left: 0',
		'display: none',
		'height: var(--primitives-space-24)',
		'pointer-events: auto',
	].join(';');
	strip.addEventListener('pointerenter', () => setFanned(region, true));
	strip.addEventListener('pointerleave', () => setFanned(region, false));
	strip.addEventListener('click', () => setExpanded(region, true));
	return strip;
}

/** Newest in front: what just happened is what you want to read, and the older
 *  ones slide back and downwards behind it. */
export function joinRegion(notification: NLDDNotification, label: string): void {
	watchOverlays();
	const region = ensureRegion(label);
	placeRegion(region);
	notification.style.pointerEvents = 'auto';
	region.prepend(notification);
	syncStack(region);
}

export function leaveRegion(notification: NLDDNotification): void {
	const region = document.getElementById(REGION_ID);
	if (!region) return;
	if (notification.parentElement === region) region.removeChild(notification);
	if (notifications(region).length === 0) {
		stopWatchingFront();
		document.removeEventListener('pointerdown', onDocumentPointerDown, true);
		expanded = false;
		region.remove();
		return;
	}
	syncStack(region);
}

/**
 * Exactly one notification counts down: the front of the deck, and only while
 * the deck is closed. The rest wait their turn, so nothing disappears from
 * under the one you are reading. An error in front never leaves on its own, and
 * holds the whole deck until it is dismissed.
 *
 * Closed, everything behind the front is cut to the front's height. Without
 * that a taller notification would hang out from under a shorter one, and a
 * shorter one would vanish behind a taller one, leaving a deck that says
 * nothing about how much is in it.
 */
function syncStack(region: HTMLElement): void {
	const items = notifications(region);
	if (items.length < 2) expanded = false;

	region.style.display = expanded ? 'flex' : 'grid';
	region.style.flexDirection = expanded ? 'column' : '';
	region.style.gap = expanded ? 'var(--primitives-space-12)' : '';
	expander(region).style.display = !expanded && items.length > 1 ? 'block' : 'none';

	items.forEach((item, index) => {
		item.style.gridArea = expanded ? '' : '1 / 1';
		item.style.setProperty('--_stack-depth', expanded ? '0' : String(Math.min(index, MAX_DEPTH)));
		// Closed, the front has to paint over the deck. Open, it is the other way
		// round: each notification covers the shadow of the one above it, so no
		// shadow lands on a notification instead of on the page.
		item.style.zIndex = String(expanded ? index + 1 : items.length - index);
		item.style.visibility = !expanded && index > MAX_DEPTH ? 'hidden' : '';
		item._setFront?.(!expanded && index === 0);
	});

	if (expanded) {
		stopWatchingFront();
		items.forEach((item) => { item.style.height = ''; });
		applyOverflow(region);
		return;
	}
	applyOverflow(region);
	watchFront(region, items[0]);
}

/**
 * A list longer than the screen it opened on has to scroll, because a message
 * you cannot reach is a message you do not have. It only scrolls then: a scroll
 * box clips, and what it would clip is the shadow every notification stands on.
 */
function applyOverflow(region: HTMLElement): void {
	// Measure unclipped, which means putting it back first.
	setScrolling(region, false);
	if (!expanded) return;
	if (region.scrollHeight <= region.clientHeight) return;
	setScrolling(region, true);
}

function setScrolling(region: HTMLElement, on: boolean): void {
	const inset = 'var(--semantics-overlays-inset)';
	const shadow = 'var(--primitives-space-48)';
	region.style.overflow = on ? 'auto' : '';
	region.style.overscrollBehavior = on ? 'contain' : '';
	// Room inside the scroll box for the shadow, taken straight back off the
	// outside again, so nothing moves when the list starts to scroll. Left and
	// below it needs the reach of the shadow itself; above and to the right the
	// box lands on the edge of the screen, where a clip and a shadow running off
	// the screen look the same.
	region.style.padding = on ? `${inset} ${inset} ${shadow} ${shadow}` : '';
	region.style.margin = on ? `calc(-1 * ${inset}) calc(-1 * ${inset}) 0 calc(-1 * ${shadow})` : '';
	region.style.maxHeight = on ? '100dvh' : `calc(100dvh - 2 * ${inset})`;
}

function setExpanded(region: HTMLElement, next: boolean): void {
	if (expanded === next) return;
	if (next && notifications(region).length < 2) return;
	expanded = next;
	if (next) {
		setFanned(region, false);
		document.addEventListener('pointerdown', onDocumentPointerDown, true);
	} else {
		document.removeEventListener('pointerdown', onDocumentPointerDown, true);
	}
	syncStack(region);
}

function onDocumentPointerDown(e: Event): void {
	const region = document.getElementById(REGION_ID);
	if (!region) return;
	if (e.composedPath().includes(region)) return;
	setExpanded(region, false);
}

/** Pointing at the strip fans the deck out until it fills it. It is the only
 *  thing saying there is more here than the one message you can read. */
function setFanned(region: HTMLElement, on: boolean): void {
	notifications(region).forEach((item) => {
		item.style.setProperty('--_stack-fanned', on ? '1' : '0');
	});
}

function watchFront(region: HTMLElement, front: NLDDNotification | undefined): void {
	stopWatchingFront();
	if (!front) return;
	// Not just once: the front notification is a live element whose height moves
	// with its own text, and the deck behind it has to follow.
	if (typeof ResizeObserver !== 'undefined') {
		frontObserver = new ResizeObserver(() => cutToFront(region, front.offsetHeight));
		frontObserver.observe(front);
	}
	cutToFront(region, front.offsetHeight);
}

function stopWatchingFront(): void {
	frontObserver?.disconnect();
	frontObserver = null;
}

function cutToFront(region: HTMLElement, height: number): void {
	notifications(region).forEach((item, index) => {
		item.style.height = index === 0 ? '' : `${height}px`;
	});
}
