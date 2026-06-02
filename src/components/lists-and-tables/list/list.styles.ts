import { css } from 'lit';

export const listStyles = css`


	/* # Host */

	:host {
		--_drag-clone-top: 0px;
		--_drag-clone-left: 0px;
		--_drag-clone-opacity: 0.95;
		--_drag-clone-z-index: 100;
		--_drag-clone-width: 0px;
		--_drag-clone-height: 0px;

		display: block;
		position: relative;
		isolation: isolate;
	}

	:host([no-dividers]) {
		--context-list-divider-display: none;
	}


	/* ## Background + border
	   Only the box variant has a surface. simple is a plain vertical
	   strip with no chrome. variant="box" defaults to the tinted
	   surface; an explicit background="base" picks the base semantic
	   pair (same shape nldd-box uses). */

	:host([variant="box"]) {
		--_background-color: var(--semantics-surfaces-tinted-background-color);
		--_border-color: var(--semantics-surfaces-tinted-border-color);
	}

	:host([background="base"]) {
		--_background-color: var(--semantics-surfaces-base-background-color);
		--_border-color: var(--semantics-surfaces-base-border-color);
	}

	:host([variant="box"]) .list__items {
		border-radius: var(--components-list-corner-radius);
		background-color: var(--_background-color);
		/* Inner box-shadow paints the border ring inside the radius
		   without taking layout space, matching nldd-box / nldd-banner. */
		box-shadow: inset 0 0 0 1px var(--_border-color);
		overflow: hidden;
	}


	/* # Elements */

	.list__body {
		display: flex;
		flex-direction: column;
		gap: var(--primitives-space-8);
	}

	.list__header,
	.list__footer {
		display: contents;
	}

	.list__items {
		display: flex;
		flex-direction: column;
	}

	.list__empty {
		padding: var(--primitives-space-16);
	}

	.list__empty[hidden] {
		display: none;
	}

	::slotted(.nldd-list-drag-placeholder) {
		box-sizing: border-box;
		border-radius: var(--components-list-item-indicator-corner-radius);
		background-color: var(--components-list-drag-placeholder-background-color);
		pointer-events: none;
	}

	.list__drag-clone {
		display: flex;
		position: absolute;
		top: var(--_drag-clone-top);
		left: var(--_drag-clone-left);
		opacity: var(--_drag-clone-opacity);
		z-index: var(--_drag-clone-z-index);
		border-radius: var(--components-list-item-indicator-corner-radius);
		background: var(--semantics-surfaces-base-background-color);
		pointer-events: none;
		width: var(--_drag-clone-width);
		height: var(--_drag-clone-height);
		overflow: hidden;
		flex-direction: row;
		align-items: stretch;
	}

	.list__polite-announcer,
	.list__assertive-announcer {
		position: absolute;
		margin: -1px;
		border: 0;
		width: 1px;
		height: 1px;
		overflow: hidden;
		padding: 0;
		white-space: nowrap;
		clip-path: inset(50%);
	}


	/* # Accessibility
	   forced-colors / Windows High Contrast strips box-shadow, so the
	   inset border on the box variant would disappear. Restore the
	   frame with a real border in that mode — same fallback nldd-box
	   and nldd-banner use. */

	@media (forced-colors: active) {
		:host([variant="box"]) .list__items {
			border: 1px solid CanvasText;
		}
	}
`;
