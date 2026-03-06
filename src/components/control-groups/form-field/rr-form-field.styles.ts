import { css } from 'lit';


/* ============================================================
   rr-form-field
   ============================================================ */

export const formFieldStyles = css`

	/* # Base */

	:host {
		display: block;
		container-type: inline-size;
	}

	:host([hidden]) {
		display: none;
	}

	.form-field {
		display: flex;
		flex-direction: column;
		gap: var(--primitives-space-2);
	}

	@container (min-width: 640px) {
		:host([label-alignment='left']) .form-field,
		:host([label-alignment='right']) .form-field {
			flex-direction: row;
			align-items: flex-start;
			gap: var(--primitives-space-8);
		}
	}


	/* # Header */

	.form-field__header {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	.form-field__header.is-empty {
		display: none;
	}

	:host([control-size='sm']) .form-field__header {
		min-height: var(--semantics-controls-sm-min-size);
	}

	:host([control-size='xs']) .form-field__header {
		min-height: var(--semantics-controls-xs-min-size);
	}

	@container (min-width: 640px) {

		:host([label-alignment='left']) .form-field__header,
		:host([label-alignment='right']) .form-field__header {
			flex-grow: 0;
			flex-shrink: 0;
			justify-content: center;
			width: var(--primitives-area-240);
			min-height: var(--semantics-controls-md-min-size);
		}

		:host([label-alignment='left']) .form-field__header {
			align-items: flex-start;
			text-align: left;
		}

		:host([label-alignment='right']) .form-field__header {
			align-items: flex-end;
			text-align: right;
		}

	}

	/* # Label */

	.form-field__label {
		display: inline-flex;
		align-items: baseline;
		gap: var(--primitives-space-8);
		color: var(--semantics-content-color);
		font: var(--primitives-font-body-md-regular-tight);
	}


	/* # Optional indicator */

	.form-field__optional {
		color: var(--semantics-content-secondary-color);
		font: var(--primitives-font-body-xs-regular-tight);
	}

	/* ## Main */

	@container (min-width: 640px) {

		:host([label-alignment='left']) .form-field__main,
		:host([label-alignment='right']) .form-field__main {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			flex-shrink: 1;
			flex-basis: 0;
			min-width: 0;
		}

	}
`;


/* ============================================================
   rr-form-field-help-text
   ============================================================ */

export const formFieldHelpTextStyles = css`

	/* # Base */

	:host {
		display: contents;
	}


	/* # Help text */

	.form-field__help-text {
		color: var(--semantics-content-secondary-color);
		font: var(--primitives-font-body-sm-regular-tight);
	}
`;


/* ============================================================
   rr-form-field-error-text
   ============================================================ */

export const formFieldErrorTextStyles = css`

	/* # Base */

	:host {
		display: none;
	}

	:host([invalid]) {
		display: block;
	}


	/* # Error text */

	.form-field__error-text {
		color: var(--semantics-content-error-color);
		font: var(--primitives-font-body-sm-regular-tight);
	}
`;
