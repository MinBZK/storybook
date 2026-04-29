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

	/* In stacked mode only .form-actions__main is visible (spacer is display:none),
	   so no gap is needed. Aligned-gap kicks in below in the row-layout media query. */

	.form-actions {
		display: flex;
		flex-direction: column;
	}

	@container (min-width: 640px) {
		:host([label-alignment='left']) .form-actions,
		:host([label-alignment='right']) .form-actions {
			flex-direction: row;
			align-items: start;
			gap: var(--semantics-forms-aligned-gap);
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
