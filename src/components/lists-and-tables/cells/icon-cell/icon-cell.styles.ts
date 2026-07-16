import { css } from 'lit';

export const iconCellStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host */

	:host {
		--_size: var(--primitives-space-24);
		--_content-color: var(--context-content-color, var(--semantics-content-color));

		display: flex;
		width: var(--_size);
		flex-direction: column;
		align-items: center;
		color: var(--_content-color);
	}

	:host([hidden]) {
		display: none;
	}

	:host([size="16"]) {
		--_size: var(--primitives-space-16);
	}

	:host([size="20"]) {
		--_size: var(--primitives-space-20);
	}

	:host([size="32"]) {
		--_size: var(--primitives-space-32);
	}

	/* ## Color */

	:host([color="secondary"]) {
		--_content-color: var(--context-content-secondary-color, var(--semantics-content-secondary-color));
	}

	:host([color="accent"]) {
		--_content-color: var(--context-content-accent-color, var(--semantics-content-accent-color));
	}

	:host([color="success"]) {
		--_content-color: var(--context-content-success-color, var(--semantics-content-success-color));
	}

	:host([color="warning"]) {
		--_content-color: var(--context-content-warning-color, var(--semantics-content-warning-color));
	}

	:host([color="critical"]) {
		--_content-color: var(--context-content-critical-color, var(--semantics-content-critical-color));
	}


	/* # Vertical alignment */

	:host([vertical-alignment="center"]),
	:host(:not([vertical-alignment])) {
		align-self: stretch;
		justify-content: center;
	}

	:host([vertical-alignment="top"]) {
		align-self: flex-start;
		justify-content: flex-start;
	}

	:host([vertical-alignment="bottom"]) {
		align-self: flex-end;
		justify-content: flex-end;
	}


	/* # Elements */

	/* No width/height here: a slotted nldd-icon defines its own --_size,
	   which shadows this cell's --_size in ::slotted var() resolution
	   (custom props resolve against the slotted element). The icon sizes
	   itself — width fills the cell, height auto keeps it square. */
	::slotted(*) {
		display: block;
		flex-shrink: 0;
	}
`;
