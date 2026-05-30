import { css } from 'lit';

/**
 * Reset for slotted (light-DOM) content in shadow-DOM components.
 *
 * Slotted nodes live in the consumer's document, so document-level CSS —
 * Tailwind Preflight, Bootstrap Reboot, a bespoke host reset — beats a
 * component's `::slotted()` rules for any *normal* declaration, regardless of
 * specificity. That bleeds host styling into our components and breaks visual
 * consistency across consumers.
 *
 * `all: revert !important` closes that gap: an *important* declaration from the
 * shadow tree beats document declarations (even important ones), and `revert`
 * rolls each property back to its user-agent default — a stable, host-independent
 * baseline. Properties a host might weaponise (`display: none`,
 * `pointer-events: none`, stray margins/decoration) fall back to UA defaults.
 *
 * Usage — place at the START of a `::slotted()` rule, then declare the
 * properties the component owns, each `!important` so it wins over the revert:
 *
 * ```ts
 * css`
 *   ::slotted(:not([slot])) {
 *     ${slottedReset}
 *     ${slottedTextReset}
 *     color: var(--semantics-content-color) !important;
 *     font: var(--_font) !important;
 *   }
 * `
 * ```
 *
 * NOTE: `revert` does NOT isolate *inherited* properties — they still flow in
 * from the host via the chain `body → host → :host → slot`. For slotted text,
 * add {@link slottedTextReset} to seal the inherited typography that `font`
 * does not cover.
 */
export const slottedReset = css`
	all: revert !important;
`;

/**
 * Inherited typography properties that the `font` shorthand does NOT cover and
 * that would otherwise inherit into slotted text from a host `<body>` (e.g.
 * `body { letter-spacing: .1em }`). Pair with {@link slottedReset} on slotted
 * text rules.
 *
 * `text-align` is locked to `start` (logical, so it stays RTL-safe) — a host
 * cannot centre or justify our text. A component that needs a different
 * alignment exposes it explicitly via a more-specific override, e.g.
 * `:host([align="center"]) ::slotted(…) { text-align: center !important }`,
 * rather than leaving it open to the host.
 */
export const slottedTextReset = css`
	letter-spacing: normal !important;
	word-spacing: normal !important;
	text-transform: none !important;
	text-align: start !important;
`;
