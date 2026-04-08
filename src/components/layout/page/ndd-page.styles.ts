import { css } from 'lit';


/* # ndd-page styles */

export const pageStyles = css`
	:host {
		--_background-color: var(--context-parent-background-color, var(--semantics-surfaces-background-color));
		--_initial-header-height: 0px;

		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		background-color: var(--_background-color);
		padding-top: var(--context-bar-split-view-top-bars-height, 0px);
		padding-bottom: var(--context-bar-split-view-bottom-bars-height, 0px);
	}

	/* Overflow hidden prevents content from escaping the scroll wrapper.
	   Overlays inside slotted content should use popover, dialog, or
	   position: fixed to render in the top layer. */
	:host([sticky-header]) {
		position: relative;
		overflow: hidden;
	}

	:host([background="default"]) {
		--context-parent-background-color: var(--semantics-surfaces-background-color);
		--_background-color: var(--context-parent-background-color);
	}

	:host([background="tinted"]) {
		--context-parent-background-color: var(--semantics-surfaces-tinted-background-color);
		--_background-color: var(--context-parent-background-color);
	}

	:host([hidden]) {
		display: none;
	}


	/* # Header */

	.page__header {
		flex-shrink: 0;
		position: relative;
		container-type: inline-size;
		container-name: layout-area;
	}

	:host([sticky-header]) .page__header {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1;
		background-color: color-mix(in srgb, var(--_background-color) 95%, transparent);
	}

	:host([sticky-header]) .page__header::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		height: var(--primitives-space-32);
		background: linear-gradient(to bottom, color-mix(in srgb, var(--_background-color) 95%, transparent), transparent);
		pointer-events: none;
		opacity: 0;
		transition: opacity 200ms ease;
	}

	:host([sticky-header]) .page__header.is-scrolled::after {
		opacity: 1;
	}


	/* # Scroll */

	.page__scroll {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		min-height: 0;
	}

	:host([sticky-header]) .page__scroll {
		overflow-y: auto;
		overflow-x: hidden;
		padding-top: var(--_initial-header-height);
	}


	/* # Main */

	.page__main {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		container-type: inline-size;
		container-name: layout-area;
	}


	/* # Footer */

	.page__footer {
		flex-shrink: 0;
		position: relative;
		container-type: inline-size;
		container-name: layout-area;
	}

	:host([sticky-footer]) .page__footer {
		position: sticky;
		bottom: 0;
		z-index: 1;
		background-color: color-mix(in srgb, var(--_background-color) 95%, transparent);
	}

	:host([sticky-footer]) .page__footer::before {
		content: '';
		position: absolute;
		bottom: 100%;
		left: 0;
		right: 0;
		height: var(--primitives-space-32);
		background: linear-gradient(to top, color-mix(in srgb, var(--_background-color) 95%, transparent), transparent);
		pointer-events: none;
	}
`;
