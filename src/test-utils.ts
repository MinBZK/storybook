/**
 * Creates a DOM fixture by parsing the given HTML string, appending it to the
 * document body inside a wrapper <div>, and waiting for the first element
 * child to finish its Lit update cycle.
 *
 * Returns the first element child, typed as T.
 */
export async function fixture<T extends HTMLElement = HTMLElement>(html: string): Promise<T> {
	const wrapper = document.createElement('div');
	wrapper.innerHTML = html;
	document.body.appendChild(wrapper);

	const el = wrapper.firstElementChild as T;

	// Wait for the element's Lit lifecycle to settle
	if ('updateComplete' in el) {
		await (el as T & { updateComplete: Promise<boolean> }).updateComplete;
	}

	return el;
}

/**
 * Removes the fixture wrapper (parent div) from the DOM.
 * Call this in `afterEach` to clean up.
 */
export function cleanup(el: Element): void {
	el.parentElement?.remove();
}

/**
 * Walks shadow roots from `document.activeElement` down to the deepest
 * focused element. Use this in tests that assert focus delegation —
 * `document.activeElement` only returns the outermost shadow host, not
 * the inner element that actually received focus.
 */
export function deepActiveElement(): Element | null {
	let active: Element | null = document.activeElement;
	while (active?.shadowRoot?.activeElement) {
		active = active.shadowRoot.activeElement;
	}
	return active;
}

/**
 * Waits for a full MutationObserver → Lit re-render cycle to settle.
 *
 * MO callbacks are microtasks that trigger Lit state changes, which
 * themselves schedule an async `updateComplete`. This helper bridges
 * that gap by:
 *	 1. Awaiting the current updateComplete
 *	 2. Yielding to the macrotask queue (setTimeout 0)
 *	 3. Awaiting updateComplete again (covers MO-triggered re-renders)
 */
export async function waitForUpdate(el: HTMLElement): Promise<void> {
	const litEl = el as HTMLElement & { updateComplete: Promise<boolean> };
	await litEl.updateComplete;
	await new Promise(r => setTimeout(r, 0));
	await litEl.updateComplete;
}

/**
 * A deliberately hostile host stylesheet for slotted-reset regression coverage:
 * Tailwind Preflight's key resets plus aggressive direct and inherited overrides
 * (including an `!important`, to prove a shadow `!important` still wins). Inject it
 * at document level around slotted content; the slotted-reset must neutralise it.
 *
 * Shared by the regression test (slotted-reset.test.ts) and the Storybook demo
 * (Foundations/Host CSS Isolation) so both exercise the exact same threat.
 */
export const hostileHostCss = `
	*, ::before, ::after { box-sizing: border-box; }
	h1, h2, h3, h4, h5, h6 { font-size: 9px !important; font-weight: 100; margin: 40px; }
	p { margin: 40px; }
	a { color: rgb(255, 0, 0); text-decoration: none; }
	img { width: 12px; height: auto; max-width: none; }
	select { opacity: 1; appearance: auto; font: inherit; }
	[slot="title"], [slot="description"] { color: rgb(255, 0, 255); margin: 30px; }
	body { letter-spacing: 6px; text-transform: uppercase; }
`;
