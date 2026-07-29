import { css } from 'lit';

export const listItemActionStyles = css`
	:host {
		box-sizing: border-box;
	}

	:host {
		--_background-color: transparent;
		--_min-size: var(--context-list-item-size, var(--semantics-controls-md-min-size));
		--_expanded-rotation: 90deg;
		--_fill-z-index: -1;

		display: flex;
		position: relative;
		align-items: stretch;
		/* The row's areas center their children; this must span instead, so its hit
		   area and fill reach the row's top and bottom edges. */
		align-self: stretch;
		flex-grow: 0;
		flex-shrink: 1;
		/* Square floor from the row's control size, so an icon-only action is still
		   a touch target. On the host, not the control: the host is the flex item,
		   so a floor on the control would be measured against a host that had
		   already shrunk to zero. */
		min-width: var(--_min-size);
		min-height: var(--_min-size);
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}

	/* A growing action needs no floor and needs min-width: 0, so its text can
	   truncate instead of pushing its siblings out. */
	:host([width="full"]) {
		flex-grow: 1;
		min-width: 0;
	}

	:host([width="full"]) .list-item-action {
		justify-content: flex-start;
	}

	/* The cell rotates, not the icon — ::slotted reaches a direct child only, and
	   rotating the cell turns the glyph in place. */
	:host([disclosure]) ::slotted(nldd-icon-cell) {
		rotate: 0deg;
		transition: rotate var(--primitives-transition-duration-fast) var(--primitives-transition-easing-default);
	}

	:host([disclosure].is-expanded) ::slotted(nldd-icon-cell) {
		rotate: var(--_expanded-rotation);
	}

	@media (prefers-reduced-motion: reduce) {
		:host([disclosure]) ::slotted(nldd-icon-cell) {
			transition: none;
		}
	}

	/* The control is the whole action: hit area, fill and focus ring. Its inline
	   padding is fixed at the indicator inset, the way a button owns its padding,
	   so the fill always sits the same distance from the content. Do not add
	   spacer cells for room or hit area — that doubles the space. */
	.list-item-action {
		box-sizing: border-box;
		display: flex;
		position: relative;
		margin: 0;
		outline: none;
		border: none;
		background: none;
		width: 100%;
		min-width: 0;
		padding: 0;
		padding-inline: var(--components-list-item-indicator-inline-inset);
		flex-direction: row;
		align-items: center;
		/* Content narrower than the floor is centered in the leftover space, which
		   is the floor's doing and not the author's. A growing action keeps its
		   content leading: that is text, and text reads from the start. */
		justify-content: center;
		color: inherit;
		text-align: start;
		text-decoration: none;
	}

	a.list-item-action {
		cursor: var(--semantics-controls-link-cursor);
	}

	button.list-item-action:disabled {
		cursor: not-allowed;
		opacity: var(--primitives-opacity-disabled);
	}

	.list-item-action::before {
		content: '';
		display: block;
		position: absolute;
		z-index: var(--_fill-z-index);
		inset-block: 0;
		inset-inline: 0;
		border-radius: var(--components-list-item-indicator-corner-radius);
		background-color: var(--_background-color);
		pointer-events: none;
	}

	@media (hover: hover) {
		a.list-item-action:hover,
		button.list-item-action:not(:disabled):hover {
			--_background-color: var(--components-list-item-is-hovered-background-color);
			--context-content-color: var(--components-list-item-is-hovered-content-color);
			--context-content-secondary-color: var(--components-list-item-is-hovered-content-color);
		}
	}

	/* Press feedback — works on touch where :hover doesn't. JS-driven so a touch
	   that turns into a scroll clears it (pointercancel) instead of flashing. */
	.list-item-action.is-pressed {
		--_background-color: var(--components-list-item-is-hovered-background-color);
		--context-content-color: var(--components-list-item-is-hovered-content-color);
		--context-content-secondary-color: var(--components-list-item-is-hovered-content-color);
	}

	:host([checked]) .list-item-action {
		--_background-color: var(--components-list-item-is-selected-background-color);
		--context-content-color: var(--components-list-item-is-selected-content-color);
		--context-content-secondary-color: var(--components-list-item-is-selected-content-color);
	}

	.list-item-action:focus-visible:not(.is-pointer-focus)::after {
		content: '';
		display: block;
		position: absolute;
		inset: 0;
		border-radius: var(--components-list-item-indicator-corner-radius);
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
		pointer-events: none;
	}
`;
