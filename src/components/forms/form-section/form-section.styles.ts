import { css } from 'lit';

export const formSectionStyles = css`


	/* # Host */

	:host {
		display: block;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block (fieldset) — reset native styles */

	.form-section {
		border: none;
		border-bottom: var(--semantics-dividers-thickness) solid var(--semantics-dividers-color);
		margin: 0;
		padding-top: 0;
		padding-inline: 0;
		padding-bottom: var(--primitives-space-16);
		min-width: 0;
		display: block;
		width: 100%;
	}

	:host(:last-child) .form-section {
		border-bottom: none;
		padding-bottom: 0;
	}


	/* # Header (title + optional subtitle) */

	.form-section__header {
		display: flex;
		flex-direction: column;
		width: 100%;
		margin-bottom: var(--components-form-gap);
	}

	.form-section__header.is-empty {
		display: none;
	}


	/* # Title */

	.form-section__title {
		padding: 0;
		margin: 0;
		width: 100%;
		text-align: left;
		color: var(--semantics-content-color);
		font: var(--primitives-font-body-lg-bold-tight);
	}


	/* # Subtitle */

	.form-section__subtitle {
		margin: 0;
		color: var(--semantics-content-secondary-color);
		font: var(--primitives-font-body-md-regular-tight);
	}


	/* # Main */

	.form-section__main {
		display: block;
	}
`;
