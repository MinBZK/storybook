import { css } from 'lit';


export const validationListStyles = css`


	/* # Host */

	:host {
		display: block;
	}

	:host(:not(.has-items)) {
		display: none;
	}

	:host([hidden]) {
		display: none;
	}


	/* # List */

	/* The gap sits here and not on :host, where a consumer reset would win. It
	   collapses out through the host, which has no padding or border, so it
	   still reads as the distance between the field and this list. Same route
	   as .form-field__help-text. */

	.validation-list {
		display: flex;
		margin-top: var(--primitives-space-4);
		flex-direction: column;
		gap: var(--primitives-space-2);
	}
`;


export const validationItemStyles = css`


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
