import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.js';
import { slottedReset, slottedTextReset } from '../../../assets/styles/slotted-reset.js';

const mdMin = unsafeCSS(breakpoints.mdMin);

export const formFieldStyles = css`


	/* # Host */

	:host {
		--_gap: calc(var(--primitives-space-10) / 2);

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
		gap: var(--_gap);
	}

	:host([label-alignment="left"]) .form-field,
	:host([label-alignment="right"]) .form-field,
	:host(:not([label-alignment])[form-label-alignment="left"]) .form-field,
	:host(:not([label-alignment])[form-label-alignment="right"]) .form-field {
		@container (min-width: ${mdMin}) {
			flex-direction: row;
			gap: var(--semantics-forms-columns-gap);
			align-items: start;
		}
	}


	/* # Header */

	.form-field__header {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}

	:host([label-alignment="left"]) .form-field__header,
	:host([label-alignment="right"]) .form-field__header,
	:host(:not([label-alignment])[form-label-alignment="left"]) .form-field__header,
	:host(:not([label-alignment])[form-label-alignment="right"]) .form-field__header {
		@container (min-width: ${mdMin}) {
			width: var(--semantics-forms-label-column-width);
			min-height: var(--semantics-controls-md-min-size);
			flex-grow: 0;
			flex-shrink: 0;
			justify-content: center;
		}
	}

	:host([label-alignment="right"]) .form-field__header,
	:host(:not([label-alignment])[form-label-alignment="right"]) .form-field__header {
		@container (min-width: ${mdMin}) {
			align-items: end;
			text-align: right;
		}
	}

	:host([label-alignment="left"]) .form-field__header,
	:host(:not([label-alignment])[form-label-alignment="left"]) .form-field__header {
		@container (min-width: ${mdMin}) {
			align-items: start;
			text-align: left;
		}
	}

	.form-field__header.is-empty {
		display: none;
	}

	:host([label-alignment="left"]) .form-field__header.is-empty,
	:host([label-alignment="right"]) .form-field__header.is-empty,
	:host(:not([label-alignment])[form-label-alignment="left"]) .form-field__header.is-empty,
	:host(:not([label-alignment])[form-label-alignment="right"]) .form-field__header.is-empty {
		@container (min-width: ${mdMin}) {
			display: flex;
		}
	}


	/* # Label */

	.form-field__label {
		display: inline-flex;
		gap: var(--primitives-space-4);
		align-items: baseline;
		color: var(--semantics-content-color);
		font: var(--primitives-font-body-md-regular-tight);
		text-wrap: pretty;
	}

	:host([label-alignment="left"]) .form-field__label,
	:host([label-alignment="right"]) .form-field__label,
	:host(:not([label-alignment])[form-label-alignment="left"]) .form-field__label,
	:host(:not([label-alignment])[form-label-alignment="right"]) .form-field__label {
		@container (min-width: ${mdMin}) {
			display: flex;
			flex-direction: column;
			gap: var(--primitives-space-0);
		}
	}

	:host([label-alignment="right"]) .form-field__label,
	:host(:not([label-alignment])[form-label-alignment="right"]) .form-field__label {
		@container (min-width: ${mdMin}) {
			align-items: end;
		}
	}

	:host([label-alignment="left"]) .form-field__label,
	:host(:not([label-alignment])[form-label-alignment="left"]) .form-field__label {
		@container (min-width: ${mdMin}) {
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
		text-wrap: pretty;
	}


	/* # Main */

	.form-field__main {
		display: flex;
		min-width: 0;
		flex-direction: column;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
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
		${slottedReset}
		${slottedTextReset}
		border-radius: var(--primitives-corner-radius-xxs) !important;
		color: var(--semantics-links-color) !important;
		text-decoration: underline !important;
		text-underline-offset: var(--primitives-space-2) !important;
	}

	@media (hover: hover) {
		::slotted(a:hover) {
			color: var(--semantics-links-is-hovered-color) !important;
		}
	}

	::slotted(a:active) {
		color: var(--semantics-links-is-active-color) !important;
	}

	::slotted(a:focus-visible) {
		outline: var(--semantics-focus-ring-outline) !important;
		outline-offset: var(--semantics-focus-ring-outline-offset) !important;
		box-shadow: var(--semantics-focus-ring-box-shadow) !important;
	}

	::slotted(a:focus:not(:focus-visible)) {
		outline: none !important;
	}
`;

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
		color: var(--semantics-content-critical-color);
		font: var(--primitives-font-body-sm-regular-tight);
	}


	/* # Links */

	::slotted(a) {
		${slottedReset}
		${slottedTextReset}
		border-radius: var(--primitives-corner-radius-xxs) !important;
		color: var(--semantics-links-color) !important;
		text-decoration: underline !important;
		text-underline-offset: var(--primitives-space-2) !important;
	}

	@media (hover: hover) {
		::slotted(a:hover) {
			color: var(--semantics-links-is-hovered-color) !important;
		}
	}

	::slotted(a:active) {
		color: var(--semantics-links-is-active-color) !important;
	}

	::slotted(a:focus-visible) {
		outline: var(--semantics-focus-ring-outline) !important;
		outline-offset: var(--semantics-focus-ring-outline-offset) !important;
		box-shadow: var(--semantics-focus-ring-box-shadow) !important;
	}

	::slotted(a:focus:not(:focus-visible)) {
		outline: none !important;
	}
`;
