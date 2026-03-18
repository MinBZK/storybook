import { css } from 'lit';

export const toggleButtonGroupStyles = css`


	/* # Host */

	:host {
		display: block;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Groep */

	.toggle-button-group {
		display: flex;
		flex-wrap: wrap;
		gap: var(--components-toggle-button-group-md-gap);
	}

	:host([size="xs"]) .toggle-button-group,
	:host([size="sm"]) .toggle-button-group {
		gap: var(--components-toggle-button-group-sm-gap);
	}
`;
