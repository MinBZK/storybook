import { css } from 'lit';

export const buttonBarStyles = css`


	/* # Host */

	:host {
		display: inline-flex;
		isolation: isolate;
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
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}


	/* # Variants */

	/* ## Variant: Neutral Tinted (Default) / Secondary */

	:host([variant="neutral-tinted"]) .button-bar,
	:host([variant="secondary"]) .button-bar,
	:host(:not([variant])) .button-bar {
		background-color: var(--semantics-buttons-neutral-tinted-background-color);
	}

	/* ## Variant: Accent Filled / Primary */

	:host([variant="accent-filled"]) .button-bar,
	:host([variant="primary"]) .button-bar {
		background-color: var(--semantics-buttons-accent-filled-background-color);
	}


	/* # Size: XS */

	:host([size="xs"]) .button-bar {
		height: var(--semantics-controls-xs-min-size);
		border-radius: var(--semantics-controls-xs-corner-radius);
	}


	/* # Size: SM */

	:host([size="sm"]) .button-bar {
		height: var(--semantics-controls-sm-min-size);
		border-radius: var(--semantics-controls-sm-corner-radius);
	}


	/* # Size: MD */

	:host([size="md"]) .button-bar,
	:host(:not([size])) .button-bar {
		height: var(--semantics-controls-md-min-size);
		border-radius: var(--semantics-controls-md-corner-radius);
	}


	/* # Divider */

	.button-bar__divider {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	:host([size="xs"]) .button-bar__divider {
		height: var(--semantics-controls-xs-min-size);
	}

	:host([size="sm"]) .button-bar__divider {
		height: var(--semantics-controls-sm-min-size);
	}

	:host([size="md"]) .button-bar__divider,
	:host(:not([size])) .button-bar__divider {
		height: var(--semantics-controls-md-min-size);
	}

	.button-bar__divider-line {
		width: var(--semantics-dividers-thickness);
		background-color: var(--semantics-buttons-neutral-tinted-divider-color);
	}

	:host([variant="accent-filled"]) .button-bar__divider-line,
	:host([variant="primary"]) .button-bar__divider-line {
		background-color: var(--semantics-buttons-accent-filled-divider-color);
	}

	:host([size="xs"]) .button-bar__divider-line {
		height: var(--semantics-buttons-xs-divider-length);
	}

	:host([size="sm"]) .button-bar__divider-line {
		height: var(--semantics-buttons-sm-divider-length);
	}

	:host([size="md"]) .button-bar__divider-line,
	:host(:not([size])) .button-bar__divider-line {
		height: var(--semantics-buttons-md-divider-length);
	}


	/* # Focus */

	::slotted([data-focused]) {
		position: relative;
		z-index: 1;
	}
`;
