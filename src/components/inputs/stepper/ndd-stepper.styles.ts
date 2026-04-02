import { css } from 'lit';

export const stepperStyles = css`
	/* # Host */

	:host {
		display: inline-flex;
	}

	:host([hidden]) {
		display: none;
	}

	:host([disabled]) {
		opacity: var(--primitives-opacity-disabled);
		pointer-events: none;
	}

	:host([disabled]) ndd-icon-button {
		opacity: 1;
	}

	/* # Container */

	.stepper {
		display: inline-flex;
		flex-direction: row;
		align-items: center;
		background-color: var(--semantics-buttons-neutral-tinted-background-color);
	}

	:host([size='sm']) .stepper {
		border-radius: var(--semantics-controls-sm-corner-radius);
	}

	:host([size='md']) .stepper,
	:host(:not([size])) .stepper {
		border-radius: var(--semantics-controls-md-corner-radius);
	}

	.stepper:focus-visible {
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness)
			var(--semantics-focus-ring-center-color);
		outline: var(--semantics-focus-ring-edge-thickness) double
			var(--semantics-focus-ring-edge-color);
	}

	/* # Divider */

	.stepper__divider {
		width: var(--semantics-dividers-thickness);
		flex-shrink: 0;
		background-color: var(--semantics-buttons-neutral-tinted-divider-color);
	}

	:host([size='sm']) .stepper__divider {
		height: var(--semantics-buttons-sm-divider-length);
	}

	:host([size='md']) .stepper__divider,
	:host(:not([size])) .stepper__divider {
		height: var(--semantics-buttons-md-divider-length);
	}

	/* # Focus */

	ndd-icon-button:focus-within {
		position: relative;
		z-index: 1;
	}
`;
