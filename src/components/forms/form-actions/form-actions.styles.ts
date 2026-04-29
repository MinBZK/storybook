import { css } from 'lit';

export const formActionsStyles = css`


	/* # Host */

	:host {
		display: block;
		container-type: inline-size;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.form-actions {
		display: flex;
		flex-direction: column;
	}

	:host([label-alignment='left']) .form-actions,
	:host([label-alignment='right']) .form-actions {
		@container (min-width: 640px) {
			flex-direction: row;
			align-items: start;
			gap: var(--semantics-forms-columns-gap);
		}
	}

	:host([label-alignment='left']) .form-actions::before,
	:host([label-alignment='right']) .form-actions::before {
		@container (min-width: 640px) {
			content: '';
			flex-grow: 0;
			flex-shrink: 0;
			width: var(--semantics-forms-label-column-width);
		}
	}


	/* # Main */

	.form-actions__main {
		display: flex;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
		min-width: 0;
	}
`;
