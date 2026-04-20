import { css } from 'lit';

export const spacerCellStyles = css`
	/* # host */

	:host {
		display: block;
		flex-shrink: 0;
		flex-grow: 0;
	}

	:host([hidden]) {
		display: none;
	}

	/* # size */

	:host([size="2"])  { width: var(--primitives-space-2); }
	:host([size="4"])  { width: var(--primitives-space-4); }
	:host([size="6"])  { width: var(--primitives-space-6); }
	:host([size="8"])  { width: var(--primitives-space-8); }
	:host([size="10"]) { width: var(--primitives-space-10); }
	:host([size="12"]) { width: var(--primitives-space-12); }

	:host([size="16"]),
	:host(:not([size])) { width: var(--primitives-space-16); }

	:host([size="20"]) { width: var(--primitives-space-20); }
	:host([size="24"]) { width: var(--primitives-space-24); }
	:host([size="28"]) { width: var(--primitives-space-28); }
	:host([size="32"]) { width: var(--primitives-space-32); }
	:host([size="40"]) { width: var(--primitives-space-40); }
	:host([size="44"]) { width: var(--primitives-space-44); }
	:host([size="48"]) { width: var(--primitives-space-48); }
	:host([size="56"]) { width: var(--primitives-space-56); }
	:host([size="64"]) { width: var(--primitives-space-64); }
	:host([size="80"]) { width: var(--primitives-space-80); }
	:host([size="96"]) { width: var(--primitives-space-96); }

	:host([size="flexible"]) {
		flex-grow: 1;
		width: auto;
	}
`;
