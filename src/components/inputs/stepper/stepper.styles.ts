import { css } from 'lit';

export const stepperStyles = css`


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

	:host([disabled]) nldd-icon-button {
		opacity: 1;
	}


	/* # Block */

	.stepper {
		display: inline-flex;
		flex-direction: row;
		align-items: center;
		background-color: var(--semantics-buttons-neutral-tinted-background-color);
	}

	:host([size='xs']) .stepper {
		border-radius: var(--semantics-controls-xs-corner-radius);
	}

	:host([size='sm']) .stepper {
		border-radius: var(--semantics-controls-sm-corner-radius);
	}

	:host([size='md']) .stepper,
	:host(:not([size])) .stepper {
		border-radius: var(--semantics-controls-md-corner-radius);
	}

	.stepper:focus-visible {
		box-shadow: var(--semantics-focus-ring-box-shadow);
		outline: var(--semantics-focus-ring-outline);
	}


	/* # Divider */

	.stepper__divider {
		width: var(--semantics-dividers-thickness);
		flex-shrink: 0;
		background-color: var(--semantics-buttons-neutral-tinted-divider-color);
	}

	:host([size='xs']) .stepper__divider {
		height: var(--semantics-buttons-xs-divider-length);
	}

	:host([size='sm']) .stepper__divider {
		height: var(--semantics-buttons-sm-divider-length);
	}

	:host([size='md']) .stepper__divider,
	:host(:not([size])) .stepper__divider {
		height: var(--semantics-buttons-md-divider-length);
	}


	/* # Focus */

	nldd-icon-button:focus-within {
		position: relative;
		z-index: 1;
	}
`;
