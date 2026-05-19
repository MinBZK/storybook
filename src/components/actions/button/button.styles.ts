import { css } from 'lit';

export const buttonStyles = css`


	/* # Host */

	:host {
		--_corner-radius: var(--semantics-controls-md-corner-radius);
		--_background-color: var(--semantics-buttons-neutral-tinted-background-color);
		--_width: auto;
		--_min-size: var(--semantics-controls-md-min-size);
		--_block-padding: var(--semantics-controls-md-block-padding);
		--_inline-padding: var(--semantics-controls-md-inline-padding);
		--_gap: var(--semantics-buttons-md-gap);
		--_content-color: var(--semantics-buttons-neutral-tinted-content-color);
		--_font: var(--semantics-buttons-md-font);
		--_is-hovered-background-color: var(--semantics-buttons-neutral-tinted-is-hovered-background-color);
		--_is-hovered-content-color: var(--semantics-buttons-neutral-tinted-is-hovered-content-color);
		--_is-active-background-color: var(--semantics-buttons-neutral-tinted-is-active-background-color);
		--_is-active-content-color: var(--semantics-buttons-neutral-tinted-is-active-content-color);
		--_icon-size: var(--semantics-buttons-md-icon-size);
		--_disclosure-icon-margin-left: -2px;
		--_disclosure-icon-size: var(--primitives-space-20);

		display: inline-block;
		max-width: 100%;
		-webkit-tap-highlight-color: transparent;
	}

	:host([size="sm"]) {
		--_corner-radius: var(--semantics-controls-sm-corner-radius);
		--_min-size: var(--semantics-controls-sm-min-size);
		--_block-padding: var(--semantics-controls-sm-block-padding);
		--_inline-padding: var(--semantics-controls-sm-inline-padding);
		--_gap: var(--semantics-buttons-sm-gap);
		--_font: var(--semantics-buttons-sm-font);
		--_icon-size: var(--semantics-buttons-sm-icon-size);
		--_disclosure-icon-margin-left: -1px;
		--_disclosure-icon-size: var(--primitives-space-18);
	}

	:host([size="xs"]) {
		--_corner-radius: var(--semantics-controls-xs-corner-radius);
		--_min-size: var(--semantics-controls-xs-min-size);
		--_block-padding: var(--semantics-controls-xs-block-padding);
		--_inline-padding: var(--semantics-controls-xs-inline-padding);
		--_gap: var(--semantics-buttons-xs-gap);
		--_font: var(--semantics-buttons-xs-font);
		--_icon-size: var(--semantics-buttons-xs-icon-size);
		--_disclosure-icon-margin-left: -1px;
		--_disclosure-icon-size: var(--primitives-space-16);
	}

	/* ## Neutral Transparent */

	:host([variant="neutral-transparent"]) {
		--_background-color: transparent;
		--_content-color: var(--semantics-buttons-neutral-transparent-content-color);
		--_is-hovered-background-color: transparent;
		--_is-hovered-content-color: var(--semantics-buttons-neutral-transparent-is-hovered-content-color);
		--_is-active-background-color: transparent;
		--_is-active-content-color: var(--semantics-buttons-neutral-transparent-is-active-content-color);
	}

	/* ## Accent Filled (Primary) */

	:host([variant="accent-filled"]),
	:host([variant="primary"]) {
		--_background-color: var(--semantics-buttons-accent-filled-background-color);
		--_content-color: var(--semantics-buttons-accent-filled-content-color);
		--_is-hovered-background-color: var(--semantics-buttons-accent-filled-is-hovered-background-color);
		--_is-hovered-content-color: var(--semantics-buttons-accent-filled-is-hovered-content-color);
		--_is-active-background-color: var(--semantics-buttons-accent-filled-is-active-background-color);
		--_is-active-content-color: var(--semantics-buttons-accent-filled-is-active-content-color);
	}

	/* ## Accent Transparent */

	:host([variant="accent-transparent"]) {
		--_background-color: transparent;
		--_content-color: var(--semantics-buttons-accent-transparent-content-color);
		--_is-hovered-background-color: transparent;
		--_is-hovered-content-color: var(--semantics-buttons-accent-transparent-is-hovered-content-color);
		--_is-active-background-color: transparent;
		--_is-active-content-color: var(--semantics-buttons-accent-transparent-is-active-content-color);
	}

	/* ## Critical Tinted */

	:host([variant="critical-tinted"]),
	:host([variant="destructive"]) {
		--_background-color: var(--semantics-buttons-critical-tinted-background-color);
		--_content-color: var(--semantics-buttons-critical-tinted-content-color);
		--_is-hovered-background-color: var(--semantics-buttons-critical-tinted-is-hovered-background-color);
		--_is-hovered-content-color: var(--semantics-buttons-critical-tinted-is-hovered-content-color);
		--_is-active-background-color: var(--semantics-buttons-critical-tinted-is-active-background-color);
		--_is-active-content-color: var(--semantics-buttons-critical-tinted-is-active-content-color);
	}

	/* ## Critical Transparent */

	:host([variant="critical-transparent"]) {
		--_background-color: transparent;
		--_content-color: var(--semantics-buttons-critical-transparent-content-color);
		--_is-hovered-background-color: transparent;
		--_is-hovered-content-color: var(--semantics-buttons-critical-transparent-is-hovered-content-color);
		--_is-active-background-color: transparent;
		--_is-active-content-color: var(--semantics-buttons-critical-transparent-is-active-content-color);
	}

	/* ## Expanded — default (incl. unknown variant) */

	:host([expanded]) {
		--_background-color: var(--semantics-buttons-neutral-tinted-is-expanded-background-color);
		--_content-color: var(--semantics-buttons-neutral-tinted-is-expanded-content-color);
		--_is-hovered-background-color: var(--semantics-buttons-neutral-tinted-is-expanded-is-hovered-background-color);
		--_is-hovered-content-color: var(--semantics-buttons-neutral-tinted-is-expanded-is-hovered-content-color);
		--_is-active-background-color: var(--semantics-buttons-neutral-tinted-is-expanded-is-active-background-color);
		--_is-active-content-color: var(--semantics-buttons-neutral-tinted-is-expanded-is-active-content-color);
	}

	:host([expanded][variant="accent-filled"]),
	:host([expanded][variant="primary"]) {
		--_background-color: var(--semantics-buttons-accent-filled-is-expanded-background-color);
		--_content-color: var(--semantics-buttons-accent-filled-is-expanded-content-color);
		--_is-hovered-background-color: var(--semantics-buttons-accent-filled-is-expanded-is-hovered-background-color);
		--_is-hovered-content-color: var(--semantics-buttons-accent-filled-is-expanded-is-hovered-content-color);
		--_is-active-background-color: var(--semantics-buttons-accent-filled-is-expanded-is-active-background-color);
		--_is-active-content-color: var(--semantics-buttons-accent-filled-is-expanded-is-active-content-color);
	}

	:host([expanded][variant="neutral-transparent"]) {
		--_background-color: transparent;
		--_content-color: var(--semantics-buttons-neutral-transparent-content-color);
		--_is-hovered-background-color: transparent;
		--_is-hovered-content-color: var(--semantics-buttons-neutral-transparent-is-hovered-content-color);
		--_is-active-background-color: transparent;
		--_is-active-content-color: var(--semantics-buttons-neutral-transparent-is-active-content-color);
	}

	:host([expanded][variant="accent-transparent"]) {
		--_background-color: transparent;
		--_content-color: var(--semantics-buttons-accent-transparent-content-color);
		--_is-hovered-background-color: transparent;
		--_is-hovered-content-color: var(--semantics-buttons-accent-transparent-is-hovered-content-color);
		--_is-active-background-color: transparent;
		--_is-active-content-color: var(--semantics-buttons-accent-transparent-is-active-content-color);
	}

	:host([expanded][variant="critical-tinted"]),
	:host([expanded][variant="destructive"]) {
		--_background-color: var(--semantics-buttons-critical-tinted-background-color);
		--_content-color: var(--semantics-buttons-critical-tinted-content-color);
		--_is-hovered-background-color: var(--semantics-buttons-critical-tinted-is-hovered-background-color);
		--_is-hovered-content-color: var(--semantics-buttons-critical-tinted-is-hovered-content-color);
		--_is-active-background-color: var(--semantics-buttons-critical-tinted-is-active-background-color);
		--_is-active-content-color: var(--semantics-buttons-critical-tinted-is-active-content-color);
	}

	:host([expanded][variant="critical-transparent"]) {
		--_background-color: transparent;
		--_content-color: var(--semantics-buttons-critical-transparent-content-color);
		--_is-hovered-background-color: transparent;
		--_is-hovered-content-color: var(--semantics-buttons-critical-transparent-is-hovered-content-color);
		--_is-active-background-color: transparent;
		--_is-active-content-color: var(--semantics-buttons-critical-transparent-is-active-content-color);
	}

	:host([width="full"]) {
		display: block;
		width: 100%;
		flex-grow: 1;
	}

	:host([hidden]) {
		display: none;
	}

	:host([disabled]) {
		opacity: var(--primitives-opacity-disabled);
		pointer-events: none;
	}


	/* # Button */

	.button {
		box-sizing: border-box;
		display: inline-flex;
		margin: 0;
		border: none;
		border-radius: var(--_corner-radius);
		background: none;
		background-color: var(--_background-color);
		width: var(--_width);
		min-width: var(--_min-size);
		max-width: 100%;
		min-height: var(--_min-size);
		padding: var(--_block-padding) var(--_inline-padding);
		gap: var(--_gap);
		align-items: center;
		justify-content: center;
		color: var(--_content-color);
		font: var(--_font);
		text-decoration: none;
		text-wrap: pretty;
		transition:
			background-color var(--primitives-transition-duration-fast) var(--primitives-transition-easing-default),
			color var(--primitives-transition-duration-fast) var(--primitives-transition-easing-default)
		;
		appearance: none;
	}

	a.button {
		cursor: var(--semantics-controls-link-cursor);
	}

	.button:hover {
		@media (hover: hover) {
			background-color: var(--_is-hovered-background-color);
			color: var(--_is-hovered-content-color);
		}
	}

	.button:active {
		background-color: var(--_is-active-background-color);
		color: var(--_is-active-content-color);
	}

	.button:focus-visible {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	.button:focus:not(:focus-visible) {
		outline: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.button {
			transition: none;
		}
	}


	/* # Elements */

	.button__content {
		display: contents;
	}

	::slotted(nldd-icon) {
		display: none;
	}

	.button__text {
		min-width: 0;
	}

	:host([single-line]) .button__text {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.button__start-icon,
	.button__end-icon {
		display: block;
		width: var(--_icon-size);
		height: var(--_icon-size);
		flex-shrink: 0;
	}

	.button__disclosure-icon {
		display: block;
		margin-left: var(--_disclosure-icon-margin-left);
		margin-right: -2px;
		width: var(--_disclosure-icon-size);
		height: var(--_disclosure-icon-size);
		flex-shrink: 0;
	}
`;
