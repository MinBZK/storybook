import { css } from 'lit';

export const splitButtonStyles = css`


	/* # Host */

	:host {
		--_corner-radius: var(--semantics-controls-md-corner-radius);
		--_background-color: var(--semantics-buttons-neutral-tinted-background-color);
		--_divider-color: var(--semantics-buttons-neutral-tinted-divider-color);
		--_divider-length: var(--semantics-buttons-md-divider-length);

		display: inline-flex;
		isolation: isolate;
		-webkit-tap-highlight-color: transparent;
	}

	:host([size="sm"]) {
		--_corner-radius: var(--semantics-controls-sm-corner-radius);
		--_divider-length: var(--semantics-buttons-sm-divider-length);
	}

	:host([size="xs"]) {
		--_corner-radius: var(--semantics-controls-xs-corner-radius);
		--_divider-length: var(--semantics-buttons-xs-divider-length);
	}

	/* ## Accent Filled (Primary) */

	:host([variant="accent-filled"]),
	:host([variant="primary"]) {
		--_background-color: var(--semantics-buttons-accent-filled-background-color);
		--_divider-color: var(--semantics-buttons-accent-filled-divider-color);
	}

	:host([hidden]) {
		display: none;
	}

	:host([disabled]) {
		opacity: var(--primitives-opacity-disabled);
		pointer-events: none;
	}

	:host([disabled]) nldd-button,
	:host([disabled]) nldd-icon-button {
		opacity: 1;
	}


	/* # Split button */

	.split-button {
		display: inline-flex;
		border-radius: var(--_corner-radius);
		background-color: var(--_background-color);
		flex-direction: row;
		align-items: center;
	}


	/* # Elements */

	.split-button__divider {
		background-color: var(--_divider-color);
		width: 1px;
		height: var(--_divider-length);
		flex-shrink: 0;
	}

	nldd-button:focus-within,
	nldd-icon-button:focus-within {
		position: relative;
		z-index: 1;
	}
`;
