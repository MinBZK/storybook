import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/slotted-reset.js';

export const iconButtonStyles = css`


	/* # Host */

	:host {
		--_corner-radius: var(--semantics-controls-md-corner-radius);
		--_background-color: var(--semantics-buttons-neutral-tinted-background-color);
		--_width: auto;
		--_min-size: var(--semantics-controls-md-min-size);
		--_padding: calc((var(--semantics-controls-md-min-size) - var(--semantics-buttons-md-icon-only-icon-size)) / 2);
		--_content-color: var(--semantics-buttons-neutral-tinted-content-color);
		--_is-hovered-background-color: var(--semantics-buttons-neutral-tinted-is-hovered-background-color);
		--_is-hovered-content-color: var(--semantics-buttons-neutral-tinted-is-hovered-content-color);
		--_is-active-background-color: var(--semantics-buttons-neutral-tinted-is-active-background-color);
		--_is-active-content-color: var(--semantics-buttons-neutral-tinted-is-active-content-color);
		--_icon-size: var(--semantics-buttons-md-icon-only-icon-size);
		--_disclosure-icon-margin-right: calc(var(--primitives-space-2) * -1);
		--_disclosure-icon-size: var(--primitives-space-20);
		--_text-display: none;
		--_text-font: var(--primitives-font-body-xxs-medium-flat);

		${inheritedTextReset}
		display: inline-block;
		position: relative;
		max-width: 100%;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
	}

	:host([size="xs"]) {
		--_corner-radius: var(--semantics-controls-xs-corner-radius);
		--_min-size: var(--semantics-controls-xs-min-size);
		--_padding: calc((var(--semantics-controls-xs-min-size) - var(--semantics-buttons-xs-icon-only-icon-size)) / 2);
		--_icon-size: var(--semantics-buttons-xs-icon-only-icon-size);
		--_disclosure-icon-margin-right: 0;
		--_disclosure-icon-size: var(--primitives-space-16);
	}

	:host([size="sm"]) {
		--_corner-radius: var(--semantics-controls-sm-corner-radius);
		--_min-size: var(--semantics-controls-sm-min-size);
		--_padding: calc((var(--semantics-controls-sm-min-size) - var(--semantics-buttons-sm-icon-only-icon-size)) / 2);
		--_icon-size: var(--semantics-buttons-sm-icon-only-icon-size);
	}

	:host([size="lg"]) {
		--_corner-radius: var(--semantics-controls-lg-corner-radius);
		--_min-size: var(--semantics-controls-lg-min-size);
		--_padding: var(--primitives-space-8);
		--_text-display: block;
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

	/* ## Critical Tinted (Destructive) */

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


	/* # Block */

	.icon-button {
		box-sizing: border-box;
		display: inline-flex;
		position: relative;
		margin: 0;
		border: none;
		border-radius: var(--_corner-radius);
		background: none;
		background-color: var(--_background-color);
		width: var(--_width);
		min-width: var(--_min-size);
		height: var(--_min-size);
		min-height: var(--_min-size);
		padding: var(--_padding);
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: var(--_content-color);
		font: inherit;
		text-decoration: none;
		transition:
			background-color var(--primitives-transition-duration-fast) var(--primitives-transition-easing-default),
			color var(--primitives-transition-duration-fast) var(--primitives-transition-easing-default)
		;
		appearance: none;
	}

	a.icon-button {
		cursor: var(--semantics-controls-link-cursor);
	}

	@media (prefers-reduced-motion: reduce) {
		.icon-button,
		.icon-button__icon-area,
		.icon-button__text {
			transition: none;
		}
	}

	.icon-button:focus-visible {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	.icon-button:focus:not(:focus-visible) {
		outline: none;
	}

	@media (hover: hover) {
		.icon-button:hover {
			background-color: var(--_is-hovered-background-color);
			color: var(--_is-hovered-content-color);
		}
	}

	.icon-button:active {
		background-color: var(--_is-active-background-color);
		color: var(--_is-active-content-color);
	}

	/* Loading keeps the control focusable (not disabled); activation is blocked in JS. */
	:host([loading]) .icon-button {
		cursor: default;
	}


	/* # Elements */

	.icon-button__icon-area {
		display: inline-flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		transition: opacity var(--primitives-transition-duration-slow) var(--primitives-transition-easing-default);
	}

	/* Loading crossfades the content out (opacity, not visibility, so the control
	   keeps its accessible name) while the indicator fades in. The content stays
	   laid out, so the control keeps its size. */
	:host([loading]) .icon-button__icon-area {
		opacity: 0;
	}

	.icon-button__icon {
		display: flex;
		width: var(--_icon-size);
		height: var(--_icon-size);
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
	}

	.icon-button__disclosure-icon {
		display: flex;
		margin-right: var(--_disclosure-icon-margin-right);
		width: var(--_disclosure-icon-size);
		height: var(--_disclosure-icon-size);
		flex-shrink: 0;
	}

	.icon-button__text {
		display: var(--_text-display);
		text-align: center;
		color: inherit;
		font: var(--_text-font);
		white-space: nowrap;
		transition: opacity var(--primitives-transition-duration-slow) var(--primitives-transition-easing-default);
	}

	:host([loading]) .icon-button__text {
		opacity: 0;
	}

	/* Wrapper overlaid on the control, positioned against the host (which is
	   position:relative). It lives outside the <button>/<a> and the tooltip
	   wrapper so the indicator's role="status" live region works reliably. The
	   activity-indicator inside fills it and centres its circle, which inherits
	   the content color via currentColor. */
	.icon-button__activity-indicator {
		position: absolute;
		inset: 0;
		/* Re-establish the content color here: the indicator lives outside
		   .icon-button now, so its currentColor stroke can no longer inherit it. */
		color: var(--_content-color);
	}
`;
