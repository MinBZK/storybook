import { css } from 'lit';

export const buttonBarStyles = css`


	/* # Host */

	:host {
		--_corner-radius: var(--semantics-controls-md-corner-radius);
		--_background-color: var(--semantics-buttons-neutral-tinted-background-color);
		--_size: var(--semantics-controls-md-min-size);
		--_divider-color: var(--semantics-buttons-neutral-tinted-divider-color);
		--_divider-length: var(--semantics-buttons-md-divider-length);

		display: inline-flex;
		isolation: isolate;
	}

	:host([size="sm"]) {
		--_corner-radius: var(--semantics-controls-sm-corner-radius);
		--_size: var(--semantics-controls-sm-min-size);
		--_divider-length: var(--semantics-buttons-sm-divider-length);
	}

	:host([size="xs"]) {
		--_corner-radius: var(--semantics-controls-xs-corner-radius);
		--_size: var(--semantics-controls-xs-min-size);
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

	:host([disabled]) ::slotted(nldd-button),
	:host([disabled]) ::slotted(nldd-icon-button) {
		opacity: 1;
	}


	/* # Block */

	.button-bar {
		display: flex;
		border-radius: var(--_corner-radius);
		background-color: var(--_background-color);
		height: var(--_size);
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}


	/* # Elements */

	.button-bar__divider {
		display: flex;
		height: var(--_size);
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.button-bar__divider-line {
		background-color: var(--_divider-color);
		width: var(--semantics-dividers-thickness);
		height: var(--_divider-length);
	}

	::slotted([data-focused]) {
		position: relative;
		z-index: 1;
	}
`;
