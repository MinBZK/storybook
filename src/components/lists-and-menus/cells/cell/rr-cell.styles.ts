import { css } from 'lit';

export const styles = css`
	/* # Host */

	:host {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		flex-shrink: 0;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Width */

	:host([width='stretch']) {
		flex-grow: 1;
		flex-shrink: 1;
		min-width: 0;
	}

	:host([width='fit-content']),
	:host(:not([width])) {
		flex-grow: 0;
		width: fit-content;
	}


	/* # Vertical alignment */

	:host([vertical-alignment='center']),
	:host(:not([vertical-alignment])) {
		justify-content: center;
	}

	:host([vertical-alignment='top']) {
		justify-content: flex-start;
	}

	:host([vertical-alignment='bottom']) {
		justify-content: flex-end;
	}


	/* # Slotted content */

	::slotted(*) {
		flex-shrink: 0;
	}
`;
