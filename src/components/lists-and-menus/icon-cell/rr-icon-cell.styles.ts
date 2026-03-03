import { css } from 'lit';

export const styles = css`
	:host {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: var(--semantics-content-color);
	}

	:host([hidden]) {
		display: none;
	}

	/* # Vertical alignment */

	/* ## Vertical alignment: center (default) */

	:host([vertical-alignment="center"]),
	:host(:not([vertical-alignment])) {
		justify-content: center;
	}

	/* ## Vertical alignment: top */

	:host([vertical-alignment="top"]) {
		justify-content: flex-start;
	}

	/* # Sizes */

	/* Icon sizing via slotted content */
	::slotted(*) {
		display: block;
		flex-shrink: 0;
	}

	/* ## Size: 16 */

	:host([size="16"]) ::slotted(*) {
		width: var(--primitives-space-16);
		height: var(--primitives-space-16);
	}

	/* ## Size: 20 */

	:host([size="20"]) ::slotted(*) {
		width: var(--primitives-space-20);
		height: var(--primitives-space-20);
	}

	/* ## Size: 24 (default) */

	:host([size="24"]) ::slotted(*),
	:host(:not([size])) ::slotted(*) {
		width: var(--primitives-space-24);
		height: var(--primitives-space-24);
	}

	/* ## Size: 32 */

	:host([size="32"]) ::slotted(*) {
		width: var(--primitives-space-32);
		height: var(--primitives-space-32);
	}

	:host([selected]) {
		color: var(--semantics-controls-is-selected-contrast-color);
	}
`;
