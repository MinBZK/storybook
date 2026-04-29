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


	/* # Title (rendered as <legend>, must be direct child of <fieldset>) */

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


	/* # Main — gets margin-top to separate from title/subtitle. When neither
	   title nor subtitle is rendered, main is the first child of the fieldset
	   and the margin collapses via :first-child. */

	.form-section__main {
		display: block;
		margin-top: var(--semantics-forms-gap);
	}

	.form-section__main:first-child {
		margin-top: 0;
	}
`;
