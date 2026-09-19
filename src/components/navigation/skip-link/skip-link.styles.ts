import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/shadow-resets.js';


export const skipLinkStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host */

	:host {
		--_z-index: 1000;
		--_box-shadow: var(--primitives-box-shadows-level-3);
		--_focus-box-shadow: inset var(--semantics-focus-ring-box-shadow);
		--_focus-outline-offset: -6px;

		${inheritedTextReset}
		display: block;
		position: relative;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	/* fixed: max-width resolves against the viewport (or nldd-page, a container),
	   not the host, which can be 0px wide. Hidden at 1px with overflow: hidden, as
	   opacity or clip-path alone still add the label's width to the page scroll. */
	.skip-link {
		display: flex;
		position: fixed;
		top: 0;
		left: 0;
		overflow: hidden;
		z-index: var(--_z-index);
		width: 1px;
		height: 1px;
		max-width: 100%;
		border-radius: var(--semantics-controls-md-corner-radius);
		box-shadow: var(--_box-shadow);
		background-color: var(--semantics-surfaces-base-background-color);
		clip-path: inset(50%);
		justify-content: center;
	}

	.skip-link:has(:focus-visible) {
		overflow: visible;
		width: auto;
		height: auto;
		clip-path: none;
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
		font: var(--primitives-font-body-md-medium-tight);
		text-decoration: underline;
		appearance: none;
	}

	.skip-link__control:focus-visible {
		outline: var(--semantics-focus-ring-outline);
		/* negative: keep the focus halo inside the small skip-link, not past the viewport */
		outline-offset: var(--_focus-outline-offset);
		box-shadow: var(--_focus-box-shadow);
	}
`;
