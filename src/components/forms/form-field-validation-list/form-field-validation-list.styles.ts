import { css } from 'lit';


export const formFieldValidationListStyles = css`


	/* # Host */

	:host {
		display: block;
		margin-top: var(--primitives-space-4);
	}

	:host(:not(.has-items)) {
		display: none;
	}

	:host([hidden]) {
		display: none;
	}


	/* # List */

	.form-field-validation-list {
		display: flex;
		flex-direction: column;
		gap: var(--primitives-space-2);
	}
`;


export const formFieldValidationItemStyles = css`


	/* # Host */

	:host {
		display: none;
		color: var(--semantics-content-color);
		font: var(--primitives-font-body-sm-regular-tight);
	}

	:host([visible]) {
		display: block;
	}

	:host([unmet]) {
		color: var(--semantics-content-critical-color);
	}

	/* After the visible rule at equal specificity: hidden must also win on an
	   item that is currently shown. */
	:host([hidden]) {
		display: none;
	}
`;
