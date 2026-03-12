import { css } from 'lit';

export const styles = css`
	/* # Host */

	:host {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Width */

	:host([width='stretch']),
	:host(:not([width])) {
		flex-grow: 1;
		min-width: 0;
	}

	:host([width='fit-content']) {
		flex-grow: 0;
		flex-shrink: 0;
		flex-basis: auto;
		width: fit-content;
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


	/* # Title */

	::slotted([slot='title']) {
		margin: 0;
		align-self: stretch;
		min-width: 0;
		font: var(--primitives-font-body-sm-regular-flat);
		color: var(--semantics-content-secondary-color);
	}


	/* # Description */

	::slotted([slot='description']) {
		margin: 0;
		align-self: stretch;
		min-width: 0;
		font: var(--primitives-font-body-md-regular-tight);
		color: var(--semantics-content-color);
	}


	/* # Selected */

	:host([selected]) ::slotted([slot='title']),
	:host([selected]) ::slotted([slot='description']) {
		color: var(--semantics-controls-is-selected-contrast-color);
	}


	/* # Forced colors */

	@media (forced-colors: active) {
		::slotted([slot='title']),
		::slotted([slot='description']) {
			forced-color-adjust: none;
		}
	}
`;
