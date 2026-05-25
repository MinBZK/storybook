import { css } from 'lit';

export const pageStyles = css`


	/* # Host */

	:host {
		--_background-color: var(--context-parent-background-color, var(--semantics-surfaces-background-color));

		display: flex;
		background-color: var(--_background-color);
		width: 100%;
		height: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		overscroll-behavior: contain;
		flex-direction: column;
		/* New stacking context so descendant z-index (e.g. list-item
		 * sticky/elevated layers) can't paint over the page's scrollbar. */
		isolation: isolate;
	}

	:host([hidden]) {
		display: none;
	}

	:host([background="base"]) {
		--context-parent-background-color: var(--semantics-surfaces-background-color);
		--_background-color: var(--context-parent-background-color);
	}

	:host([background="tinted"]) {
		--context-parent-background-color: var(--semantics-surfaces-tinted-background-color);
		--_background-color: var(--context-parent-background-color);
	}

	/* Overflow hidden prevents content from escaping the scroll wrapper.
	   Overlays inside slotted content should use popover, dialog, or
	   position: fixed to render in the top layer. */
	:host([sticky-header]) {
		position: relative;
		overflow: hidden;
	}


	/* # Block */

	.page {
		display: flex;
		min-height: 0;
		flex-direction: column;
		flex-grow: 1;
	}


	/* # Elements */

	.page__header {
		position: relative;
		flex-shrink: 0;
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
		opacity: 0;
		background: linear-gradient(to bottom, color-mix(in srgb, var(--_background-color) 95%, transparent), transparent);
		pointer-events: none;
		height: var(--primitives-space-32);
		transition: opacity var(--primitives-transition-duration-medium) var(--primitives-transition-easing-default);
	}

	:host([sticky-header]) .page__header.is-scrolled::after {
		opacity: 1;
	}

	.page__scroll {
		display: flex;
		min-height: 0;
		flex-direction: column;
		flex-grow: 1;
	}

	:host([sticky-header]) .page__scroll {
		overflow-y: auto;
		overflow-x: hidden;
		overscroll-behavior: contain;
	}

	.page__main {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	.page__footer {
		position: relative;
		flex-shrink: 0;
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
		background: linear-gradient(to top, color-mix(in srgb, var(--_background-color) 95%, transparent), transparent);
		pointer-events: none;
		height: var(--primitives-space-32);
	}
`;
