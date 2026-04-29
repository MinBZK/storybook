import { css } from 'lit';

/* ============================================================
   nldd-form-field
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


	/* # Block */

	.form-field {
		display: flex;
		flex-direction: column;
		gap: var(--semantics-forms-stacked-gap);
	}

	:host([label-alignment='left']) .form-field,
	:host([label-alignment='right']) .form-field {
		@container (min-width: 640px) {
			flex-direction: row;
			align-items: start;
			gap: var(--semantics-forms-aligned-gap);
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

	:host([label-alignment='left']) .form-field__header.is-empty,
	:host([label-alignment='right']) .form-field__header.is-empty {
		@container (min-width: 640px) {
			display: flex;
		}
	}

	:host([label-alignment='left']) .form-field__header,
	:host([label-alignment='right']) .form-field__header {
		@container (min-width: 640px) {
			flex-grow: 0;
			flex-shrink: 0;
			justify-content: center;
			width: var(--semantics-forms-label-column-width);
			min-height: var(--semantics-controls-md-min-size);
		}
	}

	:host([label-alignment='right']) .form-field__header {
		@container (min-width: 640px) {
			align-items: end;
			text-align: right;
		}
	}

	:host([label-alignment='left']) .form-field__header {
		@container (min-width: 640px) {
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

	:host([label-alignment='left']) .form-field__label,
	:host([label-alignment='right']) .form-field__label {
		@container (min-width: 640px) {
			display: flex;
			flex-direction: column;
			gap: var(--primitives-space-0);
		}
	}

	:host([label-alignment='right']) .form-field__label {
		@container (min-width: 640px) {
			align-items: end;
		}
	}

	:host([label-alignment='left']) .form-field__label {
		@container (min-width: 640px) {
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
   nldd-form-field-help-text
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
		box-shadow: var(--semantics-focus-ring-box-shadow);
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
	}

	::slotted(a:focus:not(:focus-visible)) {
		outline: none;
	}
`;

/* ============================================================
   nldd-form-field-error-text
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
		box-shadow: var(--semantics-focus-ring-box-shadow);
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
	}

	::slotted(a:focus:not(:focus-visible)) {
		outline: none;
	}
`;
