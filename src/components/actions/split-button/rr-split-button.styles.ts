import { css } from 'lit';

export const styles = css`
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
		cursor: not-allowed;
	}

	:host([disabled]) rr-button,
	:host([disabled]) rr-icon-button {
		opacity: 1;
	}

	/* # Base */

	.split-button {
		display: inline-flex;
		flex-direction: row;
		align-items: center;
		background-color: var(--semantics-buttons-neutral-tinted-background-color);
	}

	/* # Focus */

	rr-button:focus-within,
	rr-icon-button:focus-within {
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

	/* # Elements */

	.split-button__divider {
		width: 1px;
		flex-shrink: 0;
		background-color: var(--semantics-buttons-neutral-tinted-divider-color);
	}
`;
