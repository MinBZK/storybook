import { css } from 'lit';


export const skipLinkStyles = css`


	/* # Host */

	:host {
		--_z-index: 1000;
		--_box-shadow: var(--primitives-box-shadows-level-3);
		--_focus-box-shadow: inset var(--semantics-focus-ring-box-shadow);
		--_focus-outline-offset: -6px;

		display: block;
		position: relative;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.skip-link {
		display: flex;
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
		z-index: var(--_z-index);
		border-radius: var(--semantics-controls-md-corner-radius);
		box-shadow: var(--_box-shadow);
		background-color: var(--semantics-surfaces-background-color);
		pointer-events: none;
		justify-content: center;
	}

	.skip-link:has(:focus-visible) {
		opacity: 1;
		pointer-events: auto;
	}


	/* # Elements */

	.skip-link__control {
		display: inline-flex;
		border: none;
		border-radius: var(--semantics-controls-sm-corner-radius);
		background: none;
		min-height: var(--semantics-controls-md-min-size);
		padding: var(--primitives-space-4) var(--primitives-space-16);
		align-items: center;
		color: var(--semantics-links-color);
		font: var(--primitives-font-body-md-bold-flat);
		text-decoration: underline;
		white-space: nowrap;
		appearance: none;
	}

	.skip-link__control:focus-visible {
		outline: var(--semantics-focus-ring-outline);
		/* negative: keep the focus halo inside the small skip-link, not past the viewport */
		outline-offset: var(--_focus-outline-offset);
		box-shadow: var(--_focus-box-shadow);
	}
`;
