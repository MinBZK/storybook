import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.js';

const mdMin = unsafeCSS(breakpoints.mdMin);

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

	:host([label-alignment="left"]) .form-actions,
	:host([label-alignment="right"]) .form-actions,
	:host(:not([label-alignment])[form-label-alignment="left"]) .form-actions,
	:host(:not([label-alignment])[form-label-alignment="right"]) .form-actions {
		@container (min-width: ${mdMin}) {
			flex-direction: row;
			gap: var(--semantics-forms-columns-gap);
			align-items: start;
		}
	}

	:host([label-alignment="left"]) .form-actions::before,
	:host([label-alignment="right"]) .form-actions::before,
	:host(:not([label-alignment])[form-label-alignment="left"]) .form-actions::before,
	:host(:not([label-alignment])[form-label-alignment="right"]) .form-actions::before {
		@container (min-width: ${mdMin}) {
			content: '';
			width: var(--semantics-forms-label-column-width);
			flex-grow: 0;
			flex-shrink: 0;
		}
	}


	/* # Elements */

	.form-actions__main {
		display: flex;
		min-width: 0;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
	}
`;
