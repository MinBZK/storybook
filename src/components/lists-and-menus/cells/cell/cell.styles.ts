import { css } from 'lit';

export const cellStyles = css`


	/* # Host */

	:host {
		--_width: auto;
		--_min-width: 0;
		--_max-width: none;
		--_min-height: 0;

		display: flex;
		flex-direction: column;
		align-items: flex-start;
		flex-shrink: 0;
		justify-content: center;
		width: var(--_width);
		min-width: var(--_min-width);
		max-width: var(--_max-width);
		min-height: var(--_min-height);
	}

	:host([hidden]) {
		display: none;
	}


	/* # Width */

	:host([width='full']) {
		flex-grow: 1;
		flex-shrink: 1;
	}

	:host([width='fit-content']),
	:host(:not([width])),
	:host([width='']) {
		flex-grow: 0;
		flex-basis: auto;
		width: fit-content;
	}

	:host([width]:not([width='full']):not([width='fit-content']):not([width=''])) {
		flex-shrink: 0;
	}

	:host([max-width]) {
		flex-basis: var(--_max-width);
	}


	/* # Vertical alignment */

	:host([vertical-alignment='center']),
	:host(:not([vertical-alignment])) {
		align-self: stretch;
	}

	:host([vertical-alignment='top']) {
		align-self: flex-start;
	}

	:host([vertical-alignment='bottom']) {
		align-self: flex-end;
	}


	/* # Horizontal alignment */

	:host([horizontal-alignment='left']),
	:host(:not([horizontal-alignment])) {
		align-items: flex-start;
	}

	:host([horizontal-alignment='center']) {
		align-items: center;
	}

	:host([horizontal-alignment='right']) {
		align-items: flex-end;
	}


	/* # Slotted content */

	::slotted(*) {
		flex-shrink: 0;
	}
`;
