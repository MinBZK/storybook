import { css } from 'lit';


export const styles = css`


	/* # Host */

	:host {
		--_z-index: 1000;
		display: block;
		position: relative;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.skip-link {
		position: absolute;
		top: 0;
		left: 0;
		z-index: var(--_z-index);
		display: flex;
		justify-content: center;
		background-color: var(--semantics-surfaces-background-color);
		box-shadow: var(--primitives-box-shadows-level-3);
		border-radius: var(--semantics-controls-md-corner-radius);
		opacity: 0;
		pointer-events: none;
	}

	.skip-link:has(:focus-visible) {
		opacity: 1;
		pointer-events: auto;
	}


	/* # Control */

	.skip-link__control {
		display: inline-flex;
		align-items: center;
		min-height: var(--semantics-controls-md-min-size);
		appearance: none;
		border: none;
		background: none;
		color: var(--semantics-links-color);
		font: var(--primitives-font-body-md-bold-flat);
		text-decoration: underline;
		white-space: nowrap;
		border-radius: var(--semantics-controls-sm-corner-radius);
		padding: var(--primitives-space-4) var(--primitives-space-16);
	}

	.skip-link__control:focus-visible {
		box-shadow: inset 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
		outline: var(--semantics-focus-ring-outline);
		outline-offset: calc(var(--semantics-focus-ring-edge-thickness) * -1);
	}
`;
