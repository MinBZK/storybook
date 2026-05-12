import { css } from 'lit';

export const iconCellStyles = css`


	/* # Host */

	:host {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Vertical alignment */

	/* ## Vertical alignment: center (default) */

	:host([vertical-alignment="center"]),
	:host(:not([vertical-alignment])) {
		align-self: stretch;
		justify-content: center;
	}

	/* ## Vertical alignment: top */

	:host([vertical-alignment="top"]) {
		align-self: flex-start;
		justify-content: flex-start;
	}

	/* ## Vertical alignment: bottom */

	:host([vertical-alignment="bottom"]) {
		align-self: flex-end;
		justify-content: flex-end;
	}


	/* # Slotted icon */

	::slotted(*) {
		display: block;
		flex-shrink: 0;
	}


	/* # Size */

	/* ## Size: 16 */

	:host([size="16"]) {
		width: var(--primitives-space-16);
	}

	:host([size="16"]) ::slotted(*) {
		width: var(--primitives-space-16);
		height: var(--primitives-space-16);
	}

	/* ## Size: 20 */

	:host([size="20"]) {
		width: var(--primitives-space-20);
	}

	:host([size="20"]) ::slotted(*) {
		width: var(--primitives-space-20);
		height: var(--primitives-space-20);
	}

	/* ## Size: 24 (default) */

	:host([size="24"]),
	:host(:not([size])) {
		width: var(--primitives-space-24);
	}

	:host([size="24"]) ::slotted(*),
	:host(:not([size])) ::slotted(*) {
		width: var(--primitives-space-24);
		height: var(--primitives-space-24);
	}

	/* ## Size: 32 */

	:host([size="32"]) {
		width: var(--primitives-space-32);
	}

	:host([size="32"]) ::slotted(*) {
		width: var(--primitives-space-32);
		height: var(--primitives-space-32);
	}


	/* # Color */

	/* ## Color: default */

	:host([color="default"]),
	:host(:not([color])) {
		color: var(--context-cell-content-color, var(--semantics-content-color));
	}

	/* ## Color: secondary */

	:host([color="secondary"]) {
		color: var(--context-cell-content-secondary-color, var(--semantics-content-secondary-color));
	}

	/* ## Color: accent */

	:host([color="accent"]) {
		color: var(--context-cell-content-accent-color, var(--semantics-content-accent-color));
	}

	/* ## Color: success */

	:host([color="success"]) {
		color: var(--context-cell-content-success-color, var(--semantics-content-success-color));
	}

	/* ## Color: warning */

	:host([color="warning"]) {
		color: var(--context-cell-content-warning-color, var(--semantics-content-warning-color));
	}

	/* ## Color: critical */

	:host([color="critical"]) {
		color: var(--context-cell-content-critical-color, var(--semantics-content-critical-color));
	}
`;
