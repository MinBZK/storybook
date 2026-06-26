import { css } from 'lit';
import { boxSizingReset } from '../../../assets/styles/style-resets.js';

export const toggleButtonGroupStyles = css`
	${boxSizingReset}


	/* # Host */

	:host {
		display: block;
		isolation: isolate;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.toggle-button-group {
		display: flex;
		flex-wrap: wrap;
		gap: var(--components-toggle-button-group-md-gap);
	}

	:host([size="sm"]) .toggle-button-group {
		gap: var(--components-toggle-button-group-sm-gap);
	}

	:host([size="xs"]) .toggle-button-group {
		gap: var(--components-toggle-button-group-xs-gap);
	}
`;
