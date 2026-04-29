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
		gap: var(--primitives-space-2);
	}

	@container (min-width: 640px) {
		:host([label-alignment='left']) .form-actions,
		:host([label-alignment='right']) .form-actions {
			flex-direction: row;
			align-items: start;
			gap: var(--primitives-space-8);
		}
	}


	/* # Spacer (mirrors form-field header for alignment) */

	.form-actions__spacer {
		display: none;
	}

	@container (min-width: 640px) {
		:host([label-alignment='left']) .form-actions__spacer,
		:host([label-alignment='right']) .form-actions__spacer {
			display: block;
			flex-grow: 0;
			flex-shrink: 0;
			width: var(--components-form-label-column-width);
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
