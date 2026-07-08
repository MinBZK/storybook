import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/style-resets.js';

export const iconButtonStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host */

	:host {
		--_corner-radius: var(--semantics-controls-md-corner-radius);
		--_width: auto;
		--_min-size: var(--semantics-controls-md-min-size);
		--_block-padding: var(--semantics-buttons-md-is-icon-only-inline-padding);
		--_inline-padding: var(--semantics-buttons-md-is-icon-only-inline-padding);
		--_icon-size: var(--semantics-buttons-md-is-icon-only-icon-size);
		--_disclosure-icon-margin-right: calc(var(--primitives-space-2) * -1);
		--_disclosure-icon-size: var(--primitives-space-20);
		--_text-display: none;
		--_text-font: var(--primitives-font-body-xxs-medium-flat);
		--_background-color: var(--semantics-buttons-neutral-tinted-background-color);
		--_primary-content-color: var(--semantics-buttons-neutral-tinted-primary-content-color);
		--_highlight-border-color: var(--semantics-buttons-neutral-tinted-highlight-border-color);
		--_is-hovered-background-color: var(--semantics-buttons-neutral-tinted-is-hovered-background-color);
		--_is-hovered-primary-content-color: var(--semantics-buttons-neutral-tinted-is-hovered-primary-content-color);
		--_is-hovered-highlight-border-color: var(--semantics-buttons-neutral-tinted-is-hovered-highlight-border-color);
		--_is-active-background-color: var(--semantics-buttons-neutral-tinted-is-active-background-color);
		--_is-active-primary-content-color: var(--semantics-buttons-neutral-tinted-is-active-primary-content-color);
		--_is-active-highlight-border-color: var(--semantics-buttons-neutral-tinted-is-active-highlight-border-color);

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
		--_block-padding: var(--semantics-buttons-xs-is-icon-only-inline-padding);
		--_inline-padding: var(--semantics-buttons-xs-is-icon-only-inline-padding);
		--_icon-size: var(--semantics-buttons-xs-is-icon-only-icon-size);
		--_disclosure-icon-margin-right: 0;
		--_disclosure-icon-size: var(--primitives-space-16);
	}

	:host([size="sm"]) {
		--_corner-radius: var(--semantics-controls-sm-corner-radius);
		--_min-size: var(--semantics-controls-sm-min-size);
		--_block-padding: var(--semantics-buttons-sm-is-icon-only-inline-padding);
		--_inline-padding: var(--semantics-buttons-sm-is-icon-only-inline-padding);
		--_icon-size: var(--semantics-buttons-sm-is-icon-only-icon-size);
	}

	:host([size="lg"]) {
		--_corner-radius: var(--semantics-controls-lg-corner-radius);
		--_min-size: var(--semantics-controls-lg-min-size);
		--_block-padding: var(--primitives-space-8);
		--_inline-padding: var(--primitives-space-8);
		--_text-display: block;
	}

	:host([size="lg"][hide-lg-text]) {
		--_block-padding: var(--semantics-buttons-lg-is-icon-only-inline-padding);
		--_inline-padding: var(--semantics-buttons-lg-is-icon-only-inline-padding);
		--_icon-size: var(--semantics-buttons-lg-is-icon-only-icon-size);
		--_text-display: none;
	}

	:host([variant="neutral-base"]) {
		--_background-color: var(--semantics-buttons-neutral-base-background-color);
		--_primary-content-color: var(--semantics-buttons-neutral-base-primary-content-color);
		--_highlight-border-color: var(--semantics-buttons-neutral-base-highlight-border-color);
		--_is-hovered-background-color: var(--semantics-buttons-neutral-base-is-hovered-background-color);
		--_is-hovered-primary-content-color: var(--semantics-buttons-neutral-base-is-hovered-primary-content-color);
		--_is-hovered-highlight-border-color: var(--semantics-buttons-neutral-base-is-hovered-highlight-border-color);
		--_is-active-background-color: var(--semantics-buttons-neutral-base-is-active-background-color);
		--_is-active-primary-content-color: var(--semantics-buttons-neutral-base-is-active-primary-content-color);
		--_is-active-highlight-border-color: var(--semantics-buttons-neutral-base-is-active-highlight-border-color);
	}

	:host([variant="neutral-transparent"]) {
		--_background-color: transparent;
		--_primary-content-color: var(--semantics-buttons-neutral-transparent-primary-content-color);
		--_highlight-border-color: transparent;
		--_is-hovered-background-color: transparent;
		--_is-hovered-primary-content-color: var(--semantics-buttons-neutral-transparent-is-hovered-primary-content-color);
		--_is-hovered-highlight-border-color: transparent;
		--_is-active-background-color: transparent;
		--_is-active-primary-content-color: var(--semantics-buttons-neutral-transparent-is-active-primary-content-color);
		--_is-active-highlight-border-color: transparent;
	}

	:host([variant="accent-filled"]),
	:host([variant="primary"]) {
		--_background-color: var(--semantics-buttons-accent-filled-background-color);
		--_primary-content-color: var(--semantics-buttons-accent-filled-primary-content-color);
		--_highlight-border-color: var(--semantics-buttons-accent-filled-highlight-border-color);
		--_is-hovered-background-color: var(--semantics-buttons-accent-filled-is-hovered-background-color);
		--_is-hovered-primary-content-color: var(--semantics-buttons-accent-filled-is-hovered-primary-content-color);
		--_is-hovered-highlight-border-color: var(--semantics-buttons-accent-filled-is-hovered-highlight-border-color);
		--_is-active-background-color: var(--semantics-buttons-accent-filled-is-active-background-color);
		--_is-active-primary-content-color: var(--semantics-buttons-accent-filled-is-active-primary-content-color);
		--_is-active-highlight-border-color: var(--semantics-buttons-accent-filled-is-active-highlight-border-color);
	}

	:host([variant="accent-transparent"]) {
		--_background-color: transparent;
		--_primary-content-color: var(--semantics-buttons-accent-transparent-primary-content-color);
		--_highlight-border-color: transparent;
		--_is-hovered-background-color: transparent;
		--_is-hovered-primary-content-color: var(--semantics-buttons-accent-transparent-is-hovered-primary-content-color);
		--_is-hovered-highlight-border-color: transparent;
		--_is-active-background-color: transparent;
		--_is-active-primary-content-color: var(--semantics-buttons-accent-transparent-is-active-primary-content-color);
		--_is-active-highlight-border-color: transparent;
	}

	:host([variant="critical-tinted"]),
	:host([variant="destructive"]) {
		--_background-color: var(--semantics-buttons-critical-tinted-background-color);
		--_primary-content-color: var(--semantics-buttons-critical-tinted-primary-content-color);
		--_highlight-border-color: var(--semantics-buttons-critical-tinted-highlight-border-color);
		--_is-hovered-background-color: var(--semantics-buttons-critical-tinted-is-hovered-background-color);
		--_is-hovered-primary-content-color: var(--semantics-buttons-critical-tinted-is-hovered-primary-content-color);
		--_is-hovered-highlight-border-color: var(--semantics-buttons-critical-tinted-is-hovered-highlight-border-color);
		--_is-active-background-color: var(--semantics-buttons-critical-tinted-is-active-background-color);
		--_is-active-primary-content-color: var(--semantics-buttons-critical-tinted-is-active-primary-content-color);
		--_is-active-highlight-border-color: var(--semantics-buttons-critical-tinted-is-active-highlight-border-color);
	}

	:host([variant="critical-transparent"]) {
		--_background-color: transparent;
		--_primary-content-color: var(--semantics-buttons-critical-transparent-primary-content-color);
		--_highlight-border-color: transparent;
		--_is-hovered-background-color: transparent;
		--_is-hovered-primary-content-color: var(--semantics-buttons-critical-transparent-is-hovered-primary-content-color);
		--_is-hovered-highlight-border-color: transparent;
		--_is-active-background-color: transparent;
		--_is-active-primary-content-color: var(--semantics-buttons-critical-transparent-is-active-primary-content-color);
		--_is-active-highlight-border-color: transparent;
	}

	/* The on-color variants derive from currentColor; see nldd-button for
	   the full rationale. The filled label resolves the context var here on
	   the host, with the tokens' white/black contrast flip as fallback. */

	:host([variant="inherit-tinted"]) {
		--_background-color: var(--semantics-buttons-inherit-tinted-background-color);
		--_primary-content-color: var(--semantics-buttons-inherit-tinted-primary-content-color);
		--_highlight-border-color: var(--semantics-buttons-inherit-tinted-highlight-border-color);
		--_is-hovered-background-color: var(--semantics-buttons-inherit-tinted-is-hovered-background-color);
		--_is-hovered-primary-content-color: var(--semantics-buttons-inherit-tinted-is-hovered-primary-content-color);
		--_is-hovered-highlight-border-color: var(--semantics-buttons-inherit-tinted-is-hovered-highlight-border-color);
		--_is-active-background-color: var(--semantics-buttons-inherit-tinted-is-active-background-color);
		--_is-active-primary-content-color: var(--semantics-buttons-inherit-tinted-is-active-primary-content-color);
		--_is-active-highlight-border-color: var(--semantics-buttons-inherit-tinted-is-active-highlight-border-color);
	}

	:host([variant="inherit-filled"]) {
		--_background-color: var(--semantics-buttons-inherit-filled-background-color);
		--_primary-content-color: var(--context-parent-background-color, var(--semantics-buttons-inherit-filled-primary-content-color));
		--_highlight-border-color: var(--semantics-buttons-inherit-filled-highlight-border-color);
		--_is-hovered-background-color: var(--semantics-buttons-inherit-filled-is-hovered-background-color);
		--_is-hovered-primary-content-color: var(--semantics-buttons-inherit-filled-is-hovered-primary-content-color);
		--_is-hovered-highlight-border-color: var(--semantics-buttons-inherit-filled-is-hovered-highlight-border-color);
		--_is-active-background-color: var(--semantics-buttons-inherit-filled-is-active-background-color);
		--_is-active-primary-content-color: var(--semantics-buttons-inherit-filled-is-active-primary-content-color);
		--_is-active-highlight-border-color: var(--semantics-buttons-inherit-filled-is-active-highlight-border-color);
	}

	/* For inherit-filled the inner button keeps the inherited on-color:
	   its currentColor background and the label's contrast flip resolve
	   against it, and would otherwise self-reference the label. The label
	   color moves to the content layer instead; see nldd-button. */
	:host([variant="inherit-filled"]) .icon-button {
		color: inherit;
	}

	:host([variant="inherit-filled"]) .icon-button > * {
		color: var(--_primary-content-color);
	}

	/* ## Expanded — default (incl. unknown variant) */

	:host([expanded]) {
		--_background-color: var(--semantics-buttons-neutral-tinted-is-expanded-background-color);
		--_primary-content-color: var(--semantics-buttons-neutral-tinted-is-expanded-primary-content-color);
		--_highlight-border-color: var(--semantics-buttons-neutral-tinted-is-expanded-highlight-border-color);
		--_is-hovered-background-color: var(--semantics-buttons-neutral-tinted-is-expanded-is-hovered-background-color);
		--_is-hovered-primary-content-color: var(--semantics-buttons-neutral-tinted-is-expanded-is-hovered-primary-content-color);
		--_is-hovered-highlight-border-color: var(--semantics-buttons-neutral-tinted-is-expanded-is-hovered-highlight-border-color);
		--_is-active-background-color: var(--semantics-buttons-neutral-tinted-is-expanded-is-active-background-color);
		--_is-active-primary-content-color: var(--semantics-buttons-neutral-tinted-is-expanded-is-active-primary-content-color);
		--_is-active-highlight-border-color: var(--semantics-buttons-neutral-tinted-is-expanded-is-active-highlight-border-color);
	}

	:host([expanded][variant="neutral-base"]) {
		--_background-color: var(--semantics-buttons-neutral-base-is-expanded-background-color);
		--_primary-content-color: var(--semantics-buttons-neutral-base-is-expanded-primary-content-color);
		--_highlight-border-color: var(--semantics-buttons-neutral-base-is-expanded-highlight-border-color);
		--_is-hovered-background-color: var(--semantics-buttons-neutral-base-is-expanded-is-hovered-background-color);
		--_is-hovered-primary-content-color: var(--semantics-buttons-neutral-base-is-expanded-is-hovered-primary-content-color);
		--_is-hovered-highlight-border-color: var(--semantics-buttons-neutral-base-is-expanded-is-hovered-highlight-border-color);
		--_is-active-background-color: var(--semantics-buttons-neutral-base-is-expanded-is-active-background-color);
		--_is-active-primary-content-color: var(--semantics-buttons-neutral-base-is-expanded-is-active-primary-content-color);
		--_is-active-highlight-border-color: var(--semantics-buttons-neutral-base-is-expanded-is-active-highlight-border-color);
	}

	:host([expanded][variant="neutral-transparent"]) {
		--_background-color: transparent;
		--_primary-content-color: var(--semantics-buttons-neutral-transparent-primary-content-color);
		--_highlight-border-color: transparent;
		--_is-hovered-background-color: transparent;
		--_is-hovered-primary-content-color: var(--semantics-buttons-neutral-transparent-is-hovered-primary-content-color);
		--_is-hovered-highlight-border-color: transparent;
		--_is-active-background-color: transparent;
		--_is-active-primary-content-color: var(--semantics-buttons-neutral-transparent-is-active-primary-content-color);
		--_is-active-highlight-border-color: transparent;
	}

	:host([expanded][variant="accent-filled"]),
	:host([expanded][variant="primary"]) {
		--_background-color: var(--semantics-buttons-accent-filled-is-expanded-background-color);
		--_primary-content-color: var(--semantics-buttons-accent-filled-is-expanded-primary-content-color);
		--_highlight-border-color: var(--semantics-buttons-accent-filled-is-expanded-highlight-border-color);
		--_is-hovered-background-color: var(--semantics-buttons-accent-filled-is-expanded-is-hovered-background-color);
		--_is-hovered-primary-content-color: var(--semantics-buttons-accent-filled-is-expanded-is-hovered-primary-content-color);
		--_is-hovered-highlight-border-color: var(--semantics-buttons-accent-filled-is-expanded-is-hovered-highlight-border-color);
		--_is-active-background-color: var(--semantics-buttons-accent-filled-is-expanded-is-active-background-color);
		--_is-active-primary-content-color: var(--semantics-buttons-accent-filled-is-expanded-is-active-primary-content-color);
		--_is-active-highlight-border-color: var(--semantics-buttons-accent-filled-is-expanded-is-active-highlight-border-color);
	}

	:host([expanded][variant="accent-transparent"]) {
		--_background-color: transparent;
		--_primary-content-color: var(--semantics-buttons-accent-transparent-primary-content-color);
		--_highlight-border-color: transparent;
		--_is-hovered-background-color: transparent;
		--_is-hovered-primary-content-color: var(--semantics-buttons-accent-transparent-is-hovered-primary-content-color);
		--_is-hovered-highlight-border-color: transparent;
		--_is-active-background-color: transparent;
		--_is-active-primary-content-color: var(--semantics-buttons-accent-transparent-is-active-primary-content-color);
		--_is-active-highlight-border-color: transparent;
	}

	:host([expanded][variant="critical-tinted"]),
	:host([expanded][variant="destructive"]) {
		--_background-color: var(--semantics-buttons-critical-tinted-is-expanded-background-color);
		--_primary-content-color: var(--semantics-buttons-critical-tinted-is-expanded-primary-content-color);
		--_highlight-border-color: var(--semantics-buttons-critical-tinted-is-expanded-highlight-border-color);
		--_is-hovered-background-color: var(--semantics-buttons-critical-tinted-is-expanded-is-hovered-background-color);
		--_is-hovered-primary-content-color: var(--semantics-buttons-critical-tinted-is-expanded-is-hovered-primary-content-color);
		--_is-hovered-highlight-border-color: var(--semantics-buttons-critical-tinted-is-expanded-is-hovered-highlight-border-color);
		--_is-active-background-color: var(--semantics-buttons-critical-tinted-is-expanded-is-active-background-color);
		--_is-active-primary-content-color: var(--semantics-buttons-critical-tinted-is-expanded-is-active-primary-content-color);
		--_is-active-highlight-border-color: var(--semantics-buttons-critical-tinted-is-expanded-is-active-highlight-border-color);
	}

	:host([expanded][variant="critical-transparent"]) {
		--_background-color: transparent;
		--_primary-content-color: var(--semantics-buttons-critical-transparent-primary-content-color);
		--_highlight-border-color: transparent;
		--_is-hovered-background-color: transparent;
		--_is-hovered-primary-content-color: var(--semantics-buttons-critical-transparent-is-hovered-primary-content-color);
		--_is-hovered-highlight-border-color: transparent;
		--_is-active-background-color: transparent;
		--_is-active-primary-content-color: var(--semantics-buttons-critical-transparent-is-active-primary-content-color);
		--_is-active-highlight-border-color: transparent;
	}

	/* The on-color variants keep their currentColor-derived content; expanded
	   only deepens the background. Content is restated (not inherited from the
	   resting block) because the default [expanded] block has equal
	   specificity and later source order. See nldd-button for the rationale. */
	:host([expanded][variant="inherit-tinted"]) {
		--_background-color: var(--semantics-buttons-inherit-tinted-is-expanded-background-color);
		--_primary-content-color: var(--semantics-buttons-inherit-tinted-is-expanded-primary-content-color);
		--_highlight-border-color: var(--semantics-buttons-inherit-tinted-is-expanded-highlight-border-color);
		--_is-hovered-background-color: var(--semantics-buttons-inherit-tinted-is-expanded-is-hovered-background-color);
		--_is-hovered-primary-content-color: var(--semantics-buttons-inherit-tinted-is-expanded-is-hovered-primary-content-color);
		--_is-hovered-highlight-border-color: var(--semantics-buttons-inherit-tinted-is-expanded-is-hovered-highlight-border-color);
		--_is-active-background-color: var(--semantics-buttons-inherit-tinted-is-expanded-is-active-background-color);
		--_is-active-primary-content-color: var(--semantics-buttons-inherit-tinted-is-expanded-is-active-primary-content-color);
		--_is-active-highlight-border-color: var(--semantics-buttons-inherit-tinted-is-expanded-is-active-highlight-border-color);
	}

	:host([expanded][variant="inherit-filled"]) {
		--_background-color: var(--semantics-buttons-inherit-filled-is-expanded-background-color);
		--_primary-content-color: var(--context-parent-background-color, var(--semantics-buttons-inherit-filled-is-expanded-primary-content-color));
		--_highlight-border-color: var(--semantics-buttons-inherit-filled-is-expanded-highlight-border-color);
		--_is-hovered-background-color: var(--semantics-buttons-inherit-filled-is-expanded-is-hovered-background-color);
		--_is-hovered-primary-content-color: var(--semantics-buttons-inherit-filled-is-expanded-is-hovered-primary-content-color);
		--_is-hovered-highlight-border-color: var(--semantics-buttons-inherit-filled-is-expanded-is-hovered-highlight-border-color);
		--_is-active-background-color: var(--semantics-buttons-inherit-filled-is-expanded-is-active-background-color);
		--_is-active-primary-content-color: var(--semantics-buttons-inherit-filled-is-expanded-is-active-primary-content-color);
		--_is-active-highlight-border-color: var(--semantics-buttons-inherit-filled-is-expanded-is-active-highlight-border-color);
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

	:host([no-highlight-border]),
	:host([no-highlight-border][expanded]) {
		--_highlight-border-color: transparent;
		--_is-hovered-highlight-border-color: transparent;
		--_is-active-highlight-border-color: transparent;
	}


	/* # Block */

	.icon-button {
		box-sizing: border-box;
		display: inline-flex;
		margin: 0;
		border: none;
		border-radius: var(--_corner-radius);
		background: none;
		background-color: var(--_background-color);
		box-shadow: inset 0 0 0 var(--primitives-border-width-thin) var(--_highlight-border-color);
		width: var(--_width);
		min-width: var(--_min-size);
		height: var(--_min-size);
		min-height: var(--_min-size);
		padding: var(--_block-padding) var(--_inline-padding);
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: var(--_primary-content-color);
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
		box-shadow: var(--semantics-focus-ring-box-shadow), inset 0 0 0 var(--primitives-border-width-thin) var(--_highlight-border-color);
	}

	.icon-button:focus:not(:focus-visible) {
		outline: none;
	}

	@media (hover: hover) {
		.icon-button:hover {
			background-color: var(--_is-hovered-background-color);
			color: var(--_is-hovered-primary-content-color);
			--_highlight-border-color: var(--_is-hovered-highlight-border-color);
		}
	}

	.icon-button:active {
		background-color: var(--_is-active-background-color);
		color: var(--_is-active-primary-content-color);
		--_highlight-border-color: var(--_is-active-highlight-border-color);
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
		color: var(--_primary-content-color);
	}
`;
