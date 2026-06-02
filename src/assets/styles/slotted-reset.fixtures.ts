/**
 * A deliberately hostile host stylesheet for slotted-reset regression coverage:
 * Tailwind Preflight's key resets plus aggressive direct and inherited overrides
 * (including an `!important`, to prove a shadow `!important` still wins). Inject it
 * at document level around slotted content; the slotted-reset must neutralise it.
 *
 * Used by the slotted-reset regression test (slotted-reset.test.ts). Lives next
 * to the stylesheet it guards rather than in test-utils.ts.
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
