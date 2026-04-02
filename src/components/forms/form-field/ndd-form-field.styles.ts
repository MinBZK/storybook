import { css } from 'lit';

/* ============================================================
   ndd-form-field
   ============================================================ */

export const formFieldStyles = css`


	/* # Host */

	:host {
		display: block;
		container-type: inline-size;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Form field */

	.form-field {
		display: flex;
		flex-direction: column;
		gap: var(--primitives-space-2);
	}

	@container (min-width: 640px) {
		:host([label-alignment='left']) .form-field,
		:host([label-alignment='right']) .form-field {
			flex-direction: row;
			align-items: start;
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

	@container (min-width: 640px) {
		:host([label-alignment='left']) .form-field__header.is-empty,
		:host([label-alignment='right']) .form-field__header.is-empty {
			display: flex;
		}

		:host([label-alignment='left']) .form-field__header,
		:host([label-alignment='right']) .form-field__header {
			flex-grow: 0;
			flex-shrink: 0;
			justify-content: center;
			width: var(--primitives-area-240);
			min-height: var(--semantics-controls-md-min-size);
		}

		:host([label-alignment='right']) .form-field__header {
			align-items: end;
			text-align: right;
		}

		:host([label-alignment='left']) .form-field__header {
			align-items: start;
			text-align: left;
		}
	}


	/* # Label */

	.form-field__label {
		display: inline-flex;
		align-items: baseline;
		gap: var(--primitives-space-4);
		color: var(--semantics-content-color);
		font: var(--primitives-font-body-md-regular-tight);
	}

	@container (min-width: 640px) {
		:host([label-alignment='left']) .form-field__label,
		:host([label-alignment='right']) .form-field__label {
			display: flex;
			flex-direction: column;
			gap: var(--primitives-space-0);
		}

		:host([label-alignment='right']) .form-field__label {
			align-items: end;
		}

		:host([label-alignment='left']) .form-field__label {
			align-items: start;
		}
	}


	/* # Optional indicator */

	.form-field__optional {
		color: var(--semantics-content-secondary-color);
		font: var(--primitives-font-body-xs-regular-tight);
	}


	/* # Supporting label */

	.form-field__supporting-label {
		color: var(--semantics-content-secondary-color);
		font: var(--primitives-font-body-xs-regular-tight);
	}


	/* # Main */

	.form-field__main {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
		min-width: 0;
	}


	/* # Errors */

	.form-field__errors {
		display: flex;
		flex-direction: column;
	}

	:host(.has-errors) .form-field__errors {
		margin-top: var(--primitives-space-2);
	}
`;

/* ============================================================
   ndd-form-field-help-text
   ============================================================ */

export const formFieldHelpTextStyles = css`


	/* # Host */

	:host {
		display: contents;
	}


	/* # Help text */

	.form-field__help-text {
		margin: var(--primitives-space-2) 0 0;
		color: var(--semantics-content-color);
		font: var(--primitives-font-body-sm-regular-tight);
	}


	/* # Links */

	::slotted(a) {
		color: var(--semantics-links-color);
		text-decoration: underline;
		text-underline-offset: var(--primitives-space-2);
		border-radius: var(--primitives-corner-radius-xxs);
	}

	::slotted(a:hover) {
		color: var(--semantics-links-is-hovered-color);
	}

	::slotted(a:active) {
		color: var(--semantics-links-is-active-color);
	}

	::slotted(a:focus-visible) {
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
	}

	::slotted(a:focus:not(:focus-visible)) {
		outline: none;
	}
`;

/* ============================================================
   ndd-form-field-error-text
   ============================================================ */

export const formFieldErrorTextStyles = css`


	/* # Host */

	:host {
		display: none;
	}

	:host([invalid]) {
		display: block;
	}


	/* # Error text */

	.form-field__error-text {
		margin: 0;
		color: var(--semantics-content-error-color);
		font: var(--primitives-font-body-sm-regular-tight);
	}


	/* # Links */

	::slotted(a) {
		color: var(--semantics-links-color);
		text-decoration: underline;
		text-underline-offset: var(--primitives-space-2);
		border-radius: var(--primitives-corner-radius-xxs);
	}

	::slotted(a:hover) {
		color: var(--semantics-links-is-hovered-color);
	}

	::slotted(a:active) {
		color: var(--semantics-links-is-active-color);
	}

	::slotted(a:focus-visible) {
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
	}

	::slotted(a:focus:not(:focus-visible)) {
		outline: none;
	}
`;
