import { css } from 'lit';

export const formSectionStyles = css`


	/* # Host
	   Top + bottom dividers leven op de host, zodat external CSS (form.css)
	   ze via sibling-selectors kan overrulen. Defaults vallen terug op de
	   semantics-dividers-tokens; via --context-form-section-* kunnen ze
	   uitgezet worden.

	   Suppressed top divider scenarios:
	   - :first-child (niets erboven om van te scheiden)
	   - voorafgegaan door een andere nldd-form-section (form.css regel —
	     vermijdt dubbele lijn met de bottom-divider van het vorige section)

	   Suppressed bottom divider scenarios:
	   - :last-child (niets eronder om van te scheiden) */

	:host {
		display: block;
		box-sizing: border-box;
		border-top: var(--context-form-section-top-border, var(--semantics-dividers-thickness) solid var(--semantics-dividers-color));
		border-bottom: var(--context-form-section-bottom-border, var(--semantics-dividers-thickness) solid var(--semantics-dividers-color));
		padding-top: var(--context-form-section-top-padding, var(--primitives-space-16));
		padding-bottom: var(--context-form-section-bottom-padding, var(--primitives-space-16));
	}

	:host(:first-child) {
		--context-form-section-top-border: none;
		--context-form-section-top-padding: 0;
	}

	:host(:last-child) {
		--context-form-section-bottom-border: none;
		--context-form-section-bottom-padding: 0;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block (fieldset) — reset native styles */

	.form-section {
		border: none;
		margin: 0;
		padding: 0;
		min-width: 0;
		display: block;
		width: 100%;
	}


	/* # Header (rendered as <legend>, must be direct child of <fieldset>).
	   Title and subtitle are spans inside the legend so screen readers read
	   them together as the group label. */

	.form-section__header {
		padding: 0;
		margin: 0;
		width: 100%;
		text-align: left;
	}


	/* # Title */

	.form-section__title {
		display: block;
		color: var(--semantics-content-color);
		font: var(--semantics-forms-section-title-font);
	}


	/* # Subtitle */

	.form-section__subtitle {
		display: block;
		color: var(--semantics-content-secondary-color);
		font: var(--semantics-forms-section-subtitle-font);
	}


	/* # Main — gets margin-top to separate from header. When no header is
	   rendered, main is the first child of the fieldset and the margin
	   collapses via :first-child. */

	.form-section__main {
		display: block;
		margin-top: var(--semantics-forms-gap);
	}

	.form-section__main:first-child {
		margin-top: 0;
	}
`;
