import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/style-resets.js';

export const codeViewerStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host */

	:host {
		--_corner-radius: var(--primitives-corner-radius-lg);
		--_background-color: var(--semantics-surfaces-tinted-background-color);
		--_border-color: var(--semantics-surfaces-tinted-border-color);
		/* Shared shadow value so the default and focus-visible rules can
		   compose with var(...) instead of repeating the inset literal. */
		--_border-shadow: inset 0 0 0 1px var(--_border-color);
		--_block-padding: var(--primitives-space-16);
		--_inline-padding: var(--primitives-space-16);
		--_content-color: var(--semantics-content-color);
		--_font: var(--primitives-font-monospace-sm-regular-snug);
		--_actions-area-padding: var(--primitives-space-8);
		--_actions-area-size: calc(var(--semantics-controls-md-min-size) + var(--_actions-area-padding) * 2);
		--_actions-z-index: 1;

		${inheritedTextReset}
		display: flex;
		position: relative;
		/* Own stacking context so the absolutely-positioned actions button
		   (z-index: var(--_actions-z-index)) stays scoped to the code-viewer
		   and can't paint over other layers on the page. */
		isolation: isolate;
		/* iOS Safari inflates text in wide scrollable blocks (text autosizing);
		   lock the size so code renders at the authored font-size on mobile. */
		-webkit-text-size-adjust: 100%;
		text-size-adjust: 100%;
	}

	:host([hidden]) {
		display: none;
	}

	:host([background="base"]) {
		--_background-color: var(--semantics-surfaces-base-background-color);
		--_border-color: var(--semantics-surfaces-base-border-color);
	}

	/* variant="simple" drops the entire frame (no rounded corners, no
	   padding, no fill, no border ring). The host becomes a thin wrapper
	   around the editor — use for embedding in a consumer-supplied container. */
	:host([variant="simple"]) {
		--_corner-radius: 0;
		--_background-color: transparent;
		--_border-color: transparent;
		--_block-padding: 0;
		--_inline-padding: 0;
	}


	/* # Block — CodeMirror (read-only) mounts into .code-viewer */

	.code-viewer {
		box-sizing: border-box;
		position: relative;
		border-radius: var(--_corner-radius);
		/* Inner box-shadow paints the 1px border ring inside the radius
		   without taking layout space — matches nldd-box / nldd-banner.
		   variant="simple" suppresses the ring via --_border-color. The
		   forced-colors fallback at the bottom restores a real border. */
		box-shadow: var(--_border-shadow);
		background-color: var(--_background-color);
		min-width: 0;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: auto;
		padding: var(--_block-padding) var(--_inline-padding);
		color: var(--_content-color);
		font: var(--_font);
	}

	:host(:not([no-copy])) .code-viewer {
		min-height: var(--_actions-area-size);
		padding-right: var(--_actions-area-size);
	}

	/* variant="simple" + copy-button: pin the button flush to the host's
	   top-right corner and keep the snippet at least as tall as the button. */
	:host([variant="simple"]:not([no-copy])) {
		--_actions-area-padding: 0;
	}

	:host([variant="simple"]:not([no-copy])) .code-viewer {
		min-height: var(--_actions-area-size);
		padding-right: 0;
	}

	/* The horizontally-scrollable region is CodeMirror's scroller; it gets
	   tabindex/role/aria-label from JS when content overflows. Lift the focus
	   ring onto the framed block so it reads as one element. */
	.code-viewer:has(.cm-scroller:focus-visible) {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow), var(--_border-shadow);
	}

	.cm-content {
		tab-size: 2;
	}

	/* The slot is the declarative content + copy source only; CodeMirror
	   renders the visible, highlighted copy. */
	slot {
		display: none;
	}


	/* # Elements */

	.code-viewer__actions {
		position: absolute;
		top: var(--_actions-area-padding);
		right: var(--_actions-area-padding);
		z-index: var(--_actions-z-index);
	}

	/* Visually-hidden live region announces copy success/failure to screen
	   readers — the static accessible-label alone can't convey state changes. */

	.code-viewer__live-region {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}


	/* # Accessibility
	   forced-colors / Windows High Contrast strips box-shadow, so the inset
	   border ring would disappear. Restore the frame with a real border —
	   same fallback nldd-box, nldd-banner, and nldd-list use. */

	@media (forced-colors: active) {
		:host .code-viewer {
			border: 1px solid CanvasText;
		}

		:host([variant="simple"]) .code-viewer {
			border: none;
		}
	}
`;
