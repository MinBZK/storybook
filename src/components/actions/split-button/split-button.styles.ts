import { css } from 'lit';

export const splitButtonStyles = css`


	/* # Host */

	:host {
		display: inline-flex;
		isolation: isolate;
		-webkit-tap-highlight-color: transparent;
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


	/* # Block */

	.split-button {
		display: inline-flex;
		flex-direction: row;
		align-items: center;
	}


	/* # Focus */

	nldd-button:focus-within,
	nldd-icon-button:focus-within {
		position: relative;
		z-index: 1;
	}


	/* # Sizes */

	/* ## Size: XS */

	:host([size='xs']) .split-button {
		border-radius: var(--semantics-controls-xs-corner-radius);
	}

	:host([size='xs']) .split-button__divider {
		height: var(--semantics-buttons-xs-divider-length);
	}

	/* ## Size: SM */

	:host([size='sm']) .split-button {
		border-radius: var(--semantics-controls-sm-corner-radius);
	}

	:host([size='sm']) .split-button__divider {
		height: var(--semantics-buttons-sm-divider-length);
	}

	/* ## Size: MD */

	:host([size='md']) .split-button,
	:host(:not([size])) .split-button {
		border-radius: var(--semantics-controls-md-corner-radius);
	}

	:host([size='md']) .split-button__divider,
	:host(:not([size])) .split-button__divider {
		height: var(--semantics-buttons-md-divider-length);
	}


	/* # Variants */

	/* ## Variant: Neutral Tintend (Default) / Secondary */

	:host([variant="neutral-tinted"]) .split-button,
	:host([variant="secondary"]) .split-button,
	:host(:not([variant])) .split-button {
		background-color: var(--semantics-buttons-neutral-tinted-background-color);
	}

	/* ## Variant: Accent Filled / Primary */

	:host([variant="accent-filled"]) .split-button,
	:host([variant="primary"]) .split-button {
		background-color: var(--semantics-buttons-accent-filled-background-color);
	}


	/* # Divider */

	.split-button__divider {
		width: 1px;
		flex-shrink: 0;
		background-color: var(--semantics-buttons-neutral-tinted-divider-color);
	}

	:host([variant="accent-filled"]) .split-button__divider,
	:host([variant="primary"]) .split-button__divider {
		background-color: var(--semantics-buttons-accent-filled-divider-color);
	}
`;
