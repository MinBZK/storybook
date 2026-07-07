import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/style-resets.js';

export const tokenFieldStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host — mirrors the other input fields (combo-box, text-field) so a
	   token-field sits among plain inputs consistently. */

	:host {
		--_width: 100%;
		--_background-color: var(--semantics-input-fields-background-color);
		--_corner-radius: var(--semantics-controls-md-corner-radius);
		--_min-size: var(--semantics-controls-md-min-size);
		--_inline-padding: calc(var(--semantics-controls-md-inline-padding) - var(--semantics-input-fields-border-thickness));
		--_text-font: var(--semantics-input-fields-md-text-font);
		--_validation-icon-size: var(--semantics-input-fields-md-validation-icon-size);
		/* Square area at the trailing edge that centers the validation icon, sized
		   like the other input fields (frame height minus the border on both sides)
		   so the icon lines up horizontally with theirs. */
		--_icon-area-size: calc(var(--_min-size) - var(--semantics-input-fields-border-thickness) * 2);
		/* Uniform spacing used for both the padding (every side) and the gap
		   between tokens. Sized so a token (controls-sm height) sits exactly in the
		   md-height frame, accounting for the border on both sides (box-sizing is
		   border-box): (44 - 32 - 2 * 2) / 2 = 4px. */
		--_gap: calc(
			(
				var(--semantics-controls-md-min-size) - var(--semantics-controls-sm-min-size) -
					2 * var(--semantics-input-fields-border-thickness)
			) / 2
		);
		/* The inline input never shrinks below this; when the remaining space on a
		   row is smaller it wraps to the next line, growing the field's height. */
		--_input-min-width: 160px;

		${inheritedTextReset}
		display: block;
		width: var(--_width);
		max-width: 100%;
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}

	:host([disabled]) {
		opacity: var(--primitives-opacity-disabled);
		pointer-events: none;
	}

	:host([readonly]) .token-field {
		--_background-color: var(--semantics-input-fields-is-read-only-background-color);
		border-color: var(--semantics-input-fields-is-read-only-border-color);
		cursor: default;
	}


	/* # Block — the field frame: a content area (wrapping tokens + inline input)
	   and, on the right, an optional validation icon. */

	.token-field {
		position: relative;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--_gap);
		border: var(--semantics-input-fields-border);
		border-radius: var(--_corner-radius);
		background-color: var(--_background-color);
		width: 100%;
		min-height: var(--_min-size);
		/* The gap sizes the block padding and the leading padding (space left of and
		   between tokens). The trailing edge is left to the validation-icon area, so
		   its icon lines up with the other input fields' icons. */
		padding-block: var(--_gap);
		padding-inline-start: var(--_gap);
		padding-inline-end: 0;
		cursor: text;
	}

	/* The frame's ring represents input focus only. A focused token or picker
	   shows its own ring, so we don't double up (one ring at a time). */
	.token-field:has(.token-field__input:focus) {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	.token-field[data-invalid] {
		border-color: var(--semantics-input-fields-is-invalid-border-color);
	}

	.token-field[data-valid] {
		border-color: var(--semantics-input-fields-is-valid-border-color);
	}


	/* # Content — the wrapping row of tokens followed by the inline input. */

	.token-field__content {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--_gap);
		flex: 1 1 auto;
		min-width: 0;
		/* Without a validation icon the trailing padding mirrors the leading gap,
		   so a full-width token doesn't butt against the right border. */
		padding-inline-end: var(--_gap);
	}

	/* With a validation icon, reserve its area instead and keep tokens/input
	   clear of the absolutely-positioned icon. */
	.token-field[data-invalid] .token-field__content,
	.token-field[data-valid] .token-field__content {
		padding-inline-end: var(--_icon-area-size);
	}

	.token-field__token {
		max-width: 100%;
	}


	/* # Field — wraps the input and picker so they always travel to a new row
	   together. Stretches to fill the row and wraps as a unit below its min-width. */

	.token-field__field {
		display: flex;
		align-items: center;
		gap: var(--_gap);
		flex: 1 1 var(--_input-min-width);
		min-width: var(--_input-min-width);
	}


	/* # Input — transparent; grows to fill the field container. */

	.token-field__input {
		${inheritedTextReset}
		box-sizing: border-box;
		flex: 1 1 auto;
		min-width: 0;
		border: none;
		outline: none;
		background: transparent;
		color: inherit;
		font: var(--_text-font);
		/* Match a token's height and corner radius so the empty field reads as one
		   token-tall row and, once autofilled, the masked background is rounded like
		   a token (controls-sm, same as nldd-token). */
		height: var(--semantics-controls-sm-min-size);
		border-radius: var(--semantics-controls-sm-corner-radius);
		/* Inline offset so the text starts at the standard input inline-padding
		   (aligning with other fields) and keeps a little air from a token to its
		   left; the frame already contributes the leading gap, hence subtracting it. */
		padding: 0;
		padding-inline-start: calc(var(--_inline-padding) - var(--_gap));
		margin: 0;
	}

	.token-field__input::placeholder {
		color: var(--semantics-input-fields-placeholder-color);
	}

	/* Autofill: mask the browser's default highlight with the design's autofill
	   background (clipped to the token corner radius above) and set a matching text
	   colour — the same box-shadow technique as the text-field. */
	.token-field__input:-webkit-autofill,
	.token-field__input:autofill,
	.token-field__input:-webkit-autofill:disabled,
	.token-field__input:autofill:disabled {
		box-shadow: 0 0 0 999px var(--semantics-input-fields-is-autofill-background-color) inset;
		-webkit-text-fill-color: var(--semantics-input-fields-is-autofill-content-color);
	}


	/* # Picker — trailing chevron button that opens the options menu. It lives in
	   the content flow (not the absolute icon area) so it wraps onto the last row
	   together with the input, and keeps its size while tokens/input shrink. */

	.token-field__picker {
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}

	.token-field__picker:focus-within {
		position: relative;
		z-index: 1;
	}


	/* # Validation icon — a square area pinned to the trailing edge with the icon
	   centered, matching the other input fields. Absolutely positioned so it never
	   affects the frame height; the content reserves space for it (see above). The
	   icon fills its box by default, so give it a fixed size. */

	.token-field__validation-icon-area {
		position: absolute;
		inset-block: 0;
		inset-inline-end: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--_icon-area-size);
		pointer-events: none;
	}

	.token-field__validation-icon {
		width: var(--_validation-icon-size);
		height: var(--_validation-icon-size);
	}

	:host([valid]) .token-field__validation-icon {
		color: var(--semantics-input-fields-is-valid-icon-color);
	}

	:host([invalid]) .token-field__validation-icon {
		color: var(--semantics-input-fields-is-invalid-icon-color);
	}
`;
