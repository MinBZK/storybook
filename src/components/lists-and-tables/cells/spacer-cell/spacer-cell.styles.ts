import { css } from 'lit';
import { boxSizingReset } from '../../../../assets/styles/style-resets.js';

export const spacerCellStyles = css`
	${boxSizingReset}


	/* # Host */

	:host {
		--_width: var(--primitives-space-16);

		display: block;
		width: var(--_width);
		flex-grow: 0;
		flex-shrink: 0;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Size */

	:host([size="2"])  { --_width: var(--primitives-space-2); }
	:host([size="4"])  { --_width: var(--primitives-space-4); }
	:host([size="6"])  { --_width: var(--primitives-space-6); }
	:host([size="8"])  { --_width: var(--primitives-space-8); }
	:host([size="10"]) { --_width: var(--primitives-space-10); }
	:host([size="12"]) { --_width: var(--primitives-space-12); }
	:host([size="20"]) { --_width: var(--primitives-space-20); }
	:host([size="24"]) { --_width: var(--primitives-space-24); }
	:host([size="28"]) { --_width: var(--primitives-space-28); }
	:host([size="32"]) { --_width: var(--primitives-space-32); }
	:host([size="40"]) { --_width: var(--primitives-space-40); }
	:host([size="44"]) { --_width: var(--primitives-space-44); }
	:host([size="48"]) { --_width: var(--primitives-space-48); }
	:host([size="56"]) { --_width: var(--primitives-space-56); }
	:host([size="64"]) { --_width: var(--primitives-space-64); }
	:host([size="80"]) { --_width: var(--primitives-space-80); }
	:host([size="96"]) { --_width: var(--primitives-space-96); }

	:host([size="flexible"]) {
		--_width: auto;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
	}
`;
