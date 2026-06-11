import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/slotted-reset.js';

export const buttonStyles = css`


	/* # Host */

	:host {
		--_corner-radius: var(--semantics-controls-md-corner-radius);
		--_width: auto;
		--_min-size: var(--semantics-controls-md-min-size);
		--_block-padding: var(--semantics-controls-md-block-padding);
		--_inline-padding: calc((var(--_min-size) - var(--_icon-size)) / 2);
		--_gap: var(--semantics-buttons-md-gap);
		--_font: var(--semantics-buttons-md-primary-text-font);
		--_icon-size: var(--semantics-buttons-md-icon-size);
		--_disclosure-icon-size: var(--primitives-space-20);
		--_supporting-font: var(--semantics-buttons-md-supporting-text-font);
		--_background-color: var(--semantics-buttons-neutral-tinted-background-color);
		--_primary-content-color: var(--semantics-buttons-neutral-tinted-primary-content-color);
		--_secondary-content-color: var(--semantics-buttons-neutral-tinted-secondary-content-color);
		--_highlight-border-color: var(--semantics-buttons-neutral-tinted-highlight-border-color);
		--_is-hovered-background-color: var(--semantics-buttons-neutral-tinted-is-hovered-background-color);
		--_is-hovered-primary-content-color: var(--semantics-buttons-neutral-tinted-is-hovered-primary-content-color);
		--_is-hovered-secondary-content-color: var(--semantics-buttons-neutral-tinted-is-hovered-secondary-content-color);
		--_is-hovered-highlight-border-color: var(--semantics-buttons-neutral-tinted-is-hovered-highlight-border-color);
		--_is-active-background-color: var(--semantics-buttons-neutral-tinted-is-active-background-color);
		--_is-active-primary-content-color: var(--semantics-buttons-neutral-tinted-is-active-primary-content-color);
		--_is-active-secondary-content-color: var(--semantics-buttons-neutral-tinted-is-active-secondary-content-color);
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
		--_block-padding: var(--semantics-controls-xs-block-padding);
		--_gap: var(--semantics-buttons-xs-gap);
		--_font: var(--semantics-buttons-xs-primary-text-font);
		--_icon-size: var(--semantics-buttons-xs-icon-size);
		--_disclosure-icon-size: var(--primitives-space-16);
		--_supporting-font: var(--semantics-buttons-xs-supporting-text-font);
	}

	:host([size="sm"]) {
		--_corner-radius: var(--semantics-controls-sm-corner-radius);
		--_min-size: var(--semantics-controls-sm-min-size);
		--_block-padding: var(--semantics-controls-sm-block-padding);
		--_gap: var(--semantics-buttons-sm-gap);
		--_font: var(--semantics-buttons-sm-primary-text-font);
		--_icon-size: var(--semantics-buttons-sm-icon-size);
		--_disclosure-icon-size: var(--primitives-space-18);
		--_supporting-font: var(--semantics-buttons-sm-supporting-text-font);
	}

	:host([size="lg"]) {
		--_corner-radius: var(--semantics-controls-lg-corner-radius);
		--_min-size: var(--semantics-controls-lg-min-size);
		--_block-padding: var(--semantics-controls-lg-block-padding);
		--_gap: var(--semantics-buttons-lg-gap);
		--_font: var(--semantics-buttons-lg-primary-text-font);
		--_icon-size: var(--semantics-buttons-lg-icon-size);
		--_disclosure-icon-size: var(--primitives-space-24);
		--_supporting-font: var(--semantics-buttons-lg-supporting-text-font);
	}

	:host([variant="neutral-base"]) {
		--_background-color: var(--semantics-buttons-neutral-base-background-color);
		--_primary-content-color: var(--semantics-buttons-neutral-base-primary-content-color);
		--_secondary-content-color: var(--semantics-buttons-neutral-base-secondary-content-color);
		--_highlight-border-color: var(--semantics-buttons-neutral-base-highlight-border-color);
		--_is-hovered-background-color: var(--semantics-buttons-neutral-base-is-hovered-background-color);
		--_is-hovered-primary-content-color: var(--semantics-buttons-neutral-base-is-hovered-primary-content-color);
		--_is-hovered-secondary-content-color: var(--semantics-buttons-neutral-base-is-hovered-secondary-content-color);
		--_is-hovered-highlight-border-color: var(--semantics-buttons-neutral-base-is-hovered-highlight-border-color);
		--_is-active-background-color: var(--semantics-buttons-neutral-base-is-active-background-color);
		--_is-active-primary-content-color: var(--semantics-buttons-neutral-base-is-active-primary-content-color);
		--_is-active-secondary-content-color: var(--semantics-buttons-neutral-base-is-active-secondary-content-color);
		--_is-active-highlight-border-color: var(--semantics-buttons-neutral-base-is-active-highlight-border-color);
	}

	:host([variant="neutral-transparent"]) {
		--_background-color: transparent;
		--_primary-content-color: var(--semantics-buttons-neutral-transparent-primary-content-color);
		--_secondary-content-color: var(--semantics-buttons-neutral-transparent-secondary-content-color);
		--_highlight-border-color: transparent;
		--_is-hovered-background-color: transparent;
		--_is-hovered-primary-content-color: var(--semantics-buttons-neutral-transparent-is-hovered-primary-content-color);
		--_is-hovered-secondary-content-color: var(--semantics-buttons-neutral-transparent-is-hovered-secondary-content-color);
		--_is-hovered-highlight-border-color: transparent;
		--_is-active-background-color: transparent;
		--_is-active-primary-content-color: var(--semantics-buttons-neutral-transparent-is-active-primary-content-color);
		--_is-active-secondary-content-color: var(--semantics-buttons-neutral-transparent-is-active-secondary-content-color);
		--_is-active-highlight-border-color: transparent;
	}

	:host([variant="accent-filled"]),
	:host([variant="primary"]) {
		--_background-color: var(--semantics-buttons-accent-filled-background-color);
		--_primary-content-color: var(--semantics-buttons-accent-filled-primary-content-color);
		--_secondary-content-color: var(--semantics-buttons-accent-filled-secondary-content-color);
		--_highlight-border-color: var(--semantics-buttons-accent-filled-highlight-border-color);
		--_is-hovered-background-color: var(--semantics-buttons-accent-filled-is-hovered-background-color);
		--_is-hovered-primary-content-color: var(--semantics-buttons-accent-filled-is-hovered-primary-content-color);
		--_is-hovered-secondary-content-color: var(--semantics-buttons-accent-filled-is-hovered-secondary-content-color);
		--_is-hovered-highlight-border-color: var(--semantics-buttons-accent-filled-is-hovered-highlight-border-color);
		--_is-active-background-color: var(--semantics-buttons-accent-filled-is-active-background-color);
		--_is-active-primary-content-color: var(--semantics-buttons-accent-filled-is-active-primary-content-color);
		--_is-active-secondary-content-color: var(--semantics-buttons-accent-filled-is-active-secondary-content-color);
		--_is-active-highlight-border-color: var(--semantics-buttons-accent-filled-is-active-highlight-border-color);
	}

	:host([variant="accent-transparent"]) {
		--_background-color: transparent;
		--_primary-content-color: var(--semantics-buttons-accent-transparent-primary-content-color);
		--_secondary-content-color: var(--semantics-buttons-accent-transparent-secondary-content-color);
		--_highlight-border-color: transparent;
		--_is-hovered-background-color: transparent;
		--_is-hovered-primary-content-color: var(--semantics-buttons-accent-transparent-is-hovered-primary-content-color);
		--_is-hovered-secondary-content-color: var(--semantics-buttons-accent-transparent-is-hovered-secondary-content-color);
		--_is-hovered-highlight-border-color: transparent;
		--_is-active-background-color: transparent;
		--_is-active-primary-content-color: var(--semantics-buttons-accent-transparent-is-active-primary-content-color);
		--_is-active-secondary-content-color: var(--semantics-buttons-accent-transparent-is-active-secondary-content-color);
		--_is-active-highlight-border-color: transparent;
	}

	:host([variant="critical-tinted"]),
	:host([variant="destructive"]) {
		--_background-color: var(--semantics-buttons-critical-tinted-background-color);
		--_primary-content-color: var(--semantics-buttons-critical-tinted-primary-content-color);
		--_secondary-content-color: var(--semantics-buttons-critical-tinted-secondary-content-color);
		--_highlight-border-color: var(--semantics-buttons-critical-tinted-highlight-border-color);
		--_is-hovered-background-color: var(--semantics-buttons-critical-tinted-is-hovered-background-color);
		--_is-hovered-primary-content-color: var(--semantics-buttons-critical-tinted-is-hovered-primary-content-color);
		--_is-hovered-secondary-content-color: var(--semantics-buttons-critical-tinted-is-hovered-secondary-content-color);
		--_is-hovered-highlight-border-color: var(--semantics-buttons-critical-tinted-is-hovered-highlight-border-color);
		--_is-active-background-color: var(--semantics-buttons-critical-tinted-is-active-background-color);
		--_is-active-primary-content-color: var(--semantics-buttons-critical-tinted-is-active-primary-content-color);
		--_is-active-secondary-content-color: var(--semantics-buttons-critical-tinted-is-active-secondary-content-color);
		--_is-active-highlight-border-color: var(--semantics-buttons-critical-tinted-is-active-highlight-border-color);
	}

	:host([variant="critical-transparent"]) {
		--_background-color: transparent;
		--_primary-content-color: var(--semantics-buttons-critical-transparent-primary-content-color);
		--_secondary-content-color: var(--semantics-buttons-critical-transparent-secondary-content-color);
		--_highlight-border-color: transparent;
		--_is-hovered-background-color: transparent;
		--_is-hovered-primary-content-color: var(--semantics-buttons-critical-transparent-is-hovered-primary-content-color);
		--_is-hovered-secondary-content-color: var(--semantics-buttons-critical-transparent-is-hovered-secondary-content-color);
		--_is-hovered-highlight-border-color: transparent;
		--_is-active-background-color: transparent;
		--_is-active-primary-content-color: var(--semantics-buttons-critical-transparent-is-active-primary-content-color);
		--_is-active-secondary-content-color: var(--semantics-buttons-critical-transparent-is-active-secondary-content-color);
		--_is-active-highlight-border-color: transparent;
	}

	/* The on-color variants derive from currentColor (which stays
	   unresolved inside the tokens). The filled label prefers the surface
	   color from --context-parent-background-color; that var() must resolve
	   here on the host — inside a :root token it would freeze — with the
	   tokens' white/black contrast flip as fallback. */

	:host([variant="inherit-tinted"]) {
		--_background-color: var(--semantics-buttons-inherit-tinted-background-color);
		--_primary-content-color: var(--semantics-buttons-inherit-tinted-primary-content-color);
		--_secondary-content-color: var(--semantics-buttons-inherit-tinted-secondary-content-color);
		--_highlight-border-color: var(--semantics-buttons-inherit-tinted-highlight-border-color);
		--_is-hovered-background-color: var(--semantics-buttons-inherit-tinted-is-hovered-background-color);
		--_is-hovered-primary-content-color: var(--semantics-buttons-inherit-tinted-is-hovered-primary-content-color);
		--_is-hovered-secondary-content-color: var(--semantics-buttons-inherit-tinted-is-hovered-secondary-content-color);
		--_is-hovered-highlight-border-color: var(--semantics-buttons-inherit-tinted-is-hovered-highlight-border-color);
		--_is-active-background-color: var(--semantics-buttons-inherit-tinted-is-active-background-color);
		--_is-active-primary-content-color: var(--semantics-buttons-inherit-tinted-is-active-primary-content-color);
		--_is-active-secondary-content-color: var(--semantics-buttons-inherit-tinted-is-active-secondary-content-color);
		--_is-active-highlight-border-color: var(--semantics-buttons-inherit-tinted-is-active-highlight-border-color);
	}

	:host([variant="inherit-filled"]) {
		--_inherit-filled-label-color: var(--context-parent-background-color, var(--semantics-buttons-inherit-filled-primary-content-color));
		--_background-color: var(--semantics-buttons-inherit-filled-background-color);
		--_primary-content-color: var(--_inherit-filled-label-color);
		/* secondary mixes currentColor, not the label token: the content
		   layer below sets currentColor to the resolved label, so re-running
		   the contrast flip here would invert it (white label → black mix). */
		--_secondary-content-color: color-mix(in oklab, currentColor var(--semantics-content-secondary-opacity), transparent);
		--_highlight-border-color: var(--semantics-buttons-inherit-filled-highlight-border-color);
		--_is-hovered-background-color: var(--semantics-buttons-inherit-filled-is-hovered-background-color);
		--_is-hovered-primary-content-color: var(--_inherit-filled-label-color);
		--_is-hovered-secondary-content-color: color-mix(in oklab, currentColor var(--semantics-content-secondary-opacity), transparent);
		--_is-hovered-highlight-border-color: var(--semantics-buttons-inherit-filled-is-hovered-highlight-border-color);
		--_is-active-background-color: var(--semantics-buttons-inherit-filled-is-active-background-color);
		--_is-active-primary-content-color: var(--_inherit-filled-label-color);
		--_is-active-secondary-content-color: color-mix(in oklab, currentColor var(--semantics-content-secondary-opacity), transparent);
		--_is-active-highlight-border-color: var(--semantics-buttons-inherit-filled-is-active-highlight-border-color);
	}

	/* For inherit-filled the inner button keeps the inherited on-color:
	   its currentColor background and the label's contrast flip resolve
	   against it, and would otherwise self-reference the label. The label
	   color moves to the content layer instead, which also makes currentColor
	   there the resolved label so secondary text fades correctly. The higher
	   specificity of these rules deliberately pins the color through
	   hover/active/expanded. */
	:host([variant="inherit-filled"]) .button {
		color: inherit;
	}

	:host([variant="inherit-filled"]) .button > * {
		color: var(--_primary-content-color);
	}

	/* ## Expanded — default (incl. unknown variant) */

	:host([expanded]) {
		--_background-color: var(--semantics-buttons-neutral-tinted-is-expanded-background-color);
		--_primary-content-color: var(--semantics-buttons-neutral-tinted-is-expanded-primary-content-color);
		--_secondary-content-color: var(--semantics-buttons-neutral-tinted-is-expanded-secondary-content-color);
		--_highlight-border-color: var(--semantics-buttons-neutral-tinted-is-expanded-highlight-border-color);
		--_is-hovered-background-color: var(--semantics-buttons-neutral-tinted-is-expanded-is-hovered-background-color);
		--_is-hovered-primary-content-color: var(--semantics-buttons-neutral-tinted-is-expanded-is-hovered-primary-content-color);
		--_is-hovered-secondary-content-color: var(--semantics-buttons-neutral-tinted-is-expanded-is-hovered-secondary-content-color);
		--_is-hovered-highlight-border-color: var(--semantics-buttons-neutral-tinted-is-expanded-is-hovered-highlight-border-color);
		--_is-active-background-color: var(--semantics-buttons-neutral-tinted-is-expanded-is-active-background-color);
		--_is-active-primary-content-color: var(--semantics-buttons-neutral-tinted-is-expanded-is-active-primary-content-color);
		--_is-active-secondary-content-color: var(--semantics-buttons-neutral-tinted-is-expanded-is-active-secondary-content-color);
		--_is-active-highlight-border-color: var(--semantics-buttons-neutral-tinted-is-expanded-is-active-highlight-border-color);
	}

	:host([expanded][variant="neutral-base"]) {
		--_background-color: var(--semantics-buttons-neutral-base-is-expanded-background-color);
		--_primary-content-color: var(--semantics-buttons-neutral-base-is-expanded-primary-content-color);
		--_secondary-content-color: var(--semantics-buttons-neutral-base-is-expanded-secondary-content-color);
		--_highlight-border-color: var(--semantics-buttons-neutral-base-is-expanded-highlight-border-color);
		--_is-hovered-background-color: var(--semantics-buttons-neutral-base-is-expanded-is-hovered-background-color);
		--_is-hovered-primary-content-color: var(--semantics-buttons-neutral-base-is-expanded-is-hovered-primary-content-color);
		--_is-hovered-secondary-content-color: var(--semantics-buttons-neutral-base-is-expanded-is-hovered-secondary-content-color);
		--_is-hovered-highlight-border-color: var(--semantics-buttons-neutral-base-is-expanded-is-hovered-highlight-border-color);
		--_is-active-background-color: var(--semantics-buttons-neutral-base-is-expanded-is-active-background-color);
		--_is-active-primary-content-color: var(--semantics-buttons-neutral-base-is-expanded-is-active-primary-content-color);
		--_is-active-secondary-content-color: var(--semantics-buttons-neutral-base-is-expanded-is-active-secondary-content-color);
		--_is-active-highlight-border-color: var(--semantics-buttons-neutral-base-is-expanded-is-active-highlight-border-color);
	}

	:host([expanded][variant="neutral-transparent"]) {
		--_background-color: transparent;
		--_primary-content-color: var(--semantics-buttons-neutral-transparent-primary-content-color);
		--_secondary-content-color: var(--semantics-buttons-neutral-transparent-secondary-content-color);
		--_highlight-border-color: transparent;
		--_is-hovered-background-color: transparent;
		--_is-hovered-primary-content-color: var(--semantics-buttons-neutral-transparent-is-hovered-primary-content-color);
		--_is-hovered-secondary-content-color: var(--semantics-buttons-neutral-transparent-is-hovered-secondary-content-color);
		--_is-hovered-highlight-border-color: transparent;
		--_is-active-background-color: transparent;
		--_is-active-primary-content-color: var(--semantics-buttons-neutral-transparent-is-active-primary-content-color);
		--_is-active-secondary-content-color: var(--semantics-buttons-neutral-transparent-is-active-secondary-content-color);
		--_is-active-highlight-border-color: transparent;
	}

	:host([expanded][variant="accent-filled"]),
	:host([expanded][variant="primary"]) {
		--_background-color: var(--semantics-buttons-accent-filled-is-expanded-background-color);
		--_primary-content-color: var(--semantics-buttons-accent-filled-is-expanded-primary-content-color);
		--_secondary-content-color: var(--semantics-buttons-accent-filled-is-expanded-secondary-content-color);
		--_highlight-border-color: var(--semantics-buttons-accent-filled-is-expanded-highlight-border-color);
		--_is-hovered-background-color: var(--semantics-buttons-accent-filled-is-expanded-is-hovered-background-color);
		--_is-hovered-primary-content-color: var(--semantics-buttons-accent-filled-is-expanded-is-hovered-primary-content-color);
		--_is-hovered-secondary-content-color: var(--semantics-buttons-accent-filled-is-expanded-is-hovered-secondary-content-color);
		--_is-hovered-highlight-border-color: var(--semantics-buttons-accent-filled-is-expanded-is-hovered-highlight-border-color);
		--_is-active-background-color: var(--semantics-buttons-accent-filled-is-expanded-is-active-background-color);
		--_is-active-primary-content-color: var(--semantics-buttons-accent-filled-is-expanded-is-active-primary-content-color);
		--_is-active-secondary-content-color: var(--semantics-buttons-accent-filled-is-expanded-is-active-secondary-content-color);
		--_is-active-highlight-border-color: var(--semantics-buttons-accent-filled-is-expanded-is-active-highlight-border-color);
	}

	:host([expanded][variant="accent-transparent"]) {
		--_background-color: transparent;
		--_primary-content-color: var(--semantics-buttons-accent-transparent-primary-content-color);
		--_secondary-content-color: var(--semantics-buttons-accent-transparent-secondary-content-color);
		--_highlight-border-color: transparent;
		--_is-hovered-background-color: transparent;
		--_is-hovered-primary-content-color: var(--semantics-buttons-accent-transparent-is-hovered-primary-content-color);
		--_is-hovered-secondary-content-color: var(--semantics-buttons-accent-transparent-is-hovered-secondary-content-color);
		--_is-hovered-highlight-border-color: transparent;
		--_is-active-background-color: transparent;
		--_is-active-primary-content-color: var(--semantics-buttons-accent-transparent-is-active-primary-content-color);
		--_is-active-secondary-content-color: var(--semantics-buttons-accent-transparent-is-active-secondary-content-color);
		--_is-active-highlight-border-color: transparent;
	}

	:host([expanded][variant="critical-tinted"]),
	:host([expanded][variant="destructive"]) {
		--_background-color: var(--semantics-buttons-critical-tinted-is-expanded-background-color);
		--_primary-content-color: var(--semantics-buttons-critical-tinted-is-expanded-primary-content-color);
		--_secondary-content-color: var(--semantics-buttons-critical-tinted-is-expanded-secondary-content-color);
		--_highlight-border-color: var(--semantics-buttons-critical-tinted-is-expanded-highlight-border-color);
		--_is-hovered-background-color: var(--semantics-buttons-critical-tinted-is-expanded-is-hovered-background-color);
		--_is-hovered-primary-content-color: var(--semantics-buttons-critical-tinted-is-expanded-is-hovered-primary-content-color);
		--_is-hovered-secondary-content-color: var(--semantics-buttons-critical-tinted-is-expanded-is-hovered-secondary-content-color);
		--_is-hovered-highlight-border-color: var(--semantics-buttons-critical-tinted-is-expanded-is-hovered-highlight-border-color);
		--_is-active-background-color: var(--semantics-buttons-critical-tinted-is-expanded-is-active-background-color);
		--_is-active-primary-content-color: var(--semantics-buttons-critical-tinted-is-expanded-is-active-primary-content-color);
		--_is-active-secondary-content-color: var(--semantics-buttons-critical-tinted-is-expanded-is-active-secondary-content-color);
		--_is-active-highlight-border-color: var(--semantics-buttons-critical-tinted-is-expanded-is-active-highlight-border-color);
	}

	:host([expanded][variant="critical-transparent"]) {
		--_background-color: transparent;
		--_primary-content-color: var(--semantics-buttons-critical-transparent-primary-content-color);
		--_secondary-content-color: var(--semantics-buttons-critical-transparent-secondary-content-color);
		--_highlight-border-color: transparent;
		--_is-hovered-background-color: transparent;
		--_is-hovered-primary-content-color: var(--semantics-buttons-critical-transparent-is-hovered-primary-content-color);
		--_is-hovered-secondary-content-color: var(--semantics-buttons-critical-transparent-is-hovered-secondary-content-color);
		--_is-hovered-highlight-border-color: transparent;
		--_is-active-background-color: transparent;
		--_is-active-primary-content-color: var(--semantics-buttons-critical-transparent-is-active-primary-content-color);
		--_is-active-secondary-content-color: var(--semantics-buttons-critical-transparent-is-active-secondary-content-color);
		--_is-active-highlight-border-color: transparent;
	}

	/* The on-color variants keep their currentColor-derived content; expanded
	   only deepens the background. Content is restated (not inherited from the
	   resting block) because the default [expanded] block has equal
	   specificity and later source order, so it would otherwise win. */
	:host([expanded][variant="inherit-tinted"]) {
		--_background-color: var(--semantics-buttons-inherit-tinted-is-expanded-background-color);
		--_primary-content-color: currentColor;
		--_secondary-content-color: color-mix(in oklab, currentColor var(--semantics-content-secondary-opacity), transparent);
		--_highlight-border-color: var(--semantics-buttons-inherit-tinted-is-expanded-highlight-border-color);
		--_is-hovered-background-color: var(--semantics-buttons-inherit-tinted-is-expanded-is-hovered-background-color);
		--_is-hovered-primary-content-color: currentColor;
		--_is-hovered-secondary-content-color: color-mix(in oklab, currentColor var(--semantics-content-secondary-opacity), transparent);
		--_is-hovered-highlight-border-color: var(--semantics-buttons-inherit-tinted-is-expanded-is-hovered-highlight-border-color);
		--_is-active-background-color: var(--semantics-buttons-inherit-tinted-is-expanded-is-active-background-color);
		--_is-active-primary-content-color: currentColor;
		--_is-active-secondary-content-color: color-mix(in oklab, currentColor var(--semantics-content-secondary-opacity), transparent);
		--_is-active-highlight-border-color: var(--semantics-buttons-inherit-tinted-is-expanded-is-active-highlight-border-color);
	}

	:host([expanded][variant="inherit-filled"]) {
		--_background-color: var(--semantics-buttons-inherit-filled-is-expanded-background-color);
		--_primary-content-color: var(--_inherit-filled-label-color);
		--_secondary-content-color: color-mix(in oklab, currentColor var(--semantics-content-secondary-opacity), transparent);
		--_highlight-border-color: var(--semantics-buttons-inherit-filled-is-expanded-highlight-border-color);
		--_is-hovered-background-color: var(--semantics-buttons-inherit-filled-is-expanded-is-hovered-background-color);
		--_is-hovered-primary-content-color: var(--_inherit-filled-label-color);
		--_is-hovered-secondary-content-color: color-mix(in oklab, currentColor var(--semantics-content-secondary-opacity), transparent);
		--_is-hovered-highlight-border-color: var(--semantics-buttons-inherit-filled-is-expanded-is-hovered-highlight-border-color);
		--_is-active-background-color: var(--semantics-buttons-inherit-filled-is-expanded-is-active-background-color);
		--_is-active-primary-content-color: var(--_inherit-filled-label-color);
		--_is-active-secondary-content-color: color-mix(in oklab, currentColor var(--semantics-content-secondary-opacity), transparent);
		--_is-active-highlight-border-color: var(--semantics-buttons-inherit-filled-is-expanded-is-active-highlight-border-color);
	}

	:host([width="full"]) {
		display: block;
		width: 100%;
		flex-grow: 1;
	}

	:host([horizontal-alignment="left"]) .button {
		justify-content: flex-start;
		text-align: left;
	}

	:host([horizontal-alignment="right"]) .button {
		justify-content: flex-end;
		text-align: right;
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

	.button {
		box-sizing: border-box;
		display: inline-flex;
		position: relative;
		margin: 0;
		border: none;
		border-radius: var(--_corner-radius);
		background: none;
		background-color: var(--_background-color);
		box-shadow: inset 0 0 0 var(--primitives-border-width-thin) var(--_highlight-border-color);
		width: var(--_width);
		min-width: var(--_min-size);
		max-width: 100%;
		min-height: var(--_min-size);
		padding: var(--_block-padding) var(--_inline-padding);
		gap: var(--_gap);
		align-items: center;
		justify-content: center;
		color: var(--_primary-content-color);
		font: var(--_font);
		text-align: center;
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
			color: var(--_is-hovered-primary-content-color);
			--_highlight-border-color: var(--_is-hovered-highlight-border-color);
		}
	}

	.button:active {
		background-color: var(--_is-active-background-color);
		color: var(--_is-active-primary-content-color);
		--_highlight-border-color: var(--_is-active-highlight-border-color);
	}

	/* Loading keeps the control focusable (not disabled); activation is blocked in JS. */
	:host([loading]) .button {
		cursor: default;
	}

	.button:focus-visible {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow), inset 0 0 0 var(--primitives-border-width-thin) var(--_highlight-border-color);
	}

	.button:focus:not(:focus-visible) {
		outline: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.button,
		.button__content {
			transition: none;
		}
	}


	/* # Elements */

	.button__content {
		display: inline-flex;
		max-width: 100%;
		min-width: 0;
		align-items: center;
		gap: 0;
		transition: opacity var(--primitives-transition-duration-slow) var(--primitives-transition-easing-default);
	}

	/* Loading crossfades the content out (opacity, not visibility, so the button
	   keeps its accessible name) while the indicator fades in. The content stays
	   laid out, so the button keeps its width. */
	:host([loading]) .button__content {
		opacity: 0;
	}

	:host([loading]) .button__disclosure-icon {
		opacity: 0;
	}

	/* Wrapper overlaid on the control, positioned against the host (which is
	   position:relative). It lives outside the <button>/<a> so the indicator's
	   role="status" live region announces loading without joining the button's
	   accessible name. The activity-indicator inside fills it and centres its
	   circle, which inherits the content color via currentColor. */
	.button__activity-indicator {
		position: absolute;
		inset: 0;
		color: var(--_primary-content-color);
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

	.button__text-area {
		display: flex;
		flex-direction: column;
		min-width: 0;
		padding-inline: var(--_gap);
	}

	:host([size="xs"]) .button__text-area,
	:host([size="sm"]) .button__text-area {
		flex-direction: row;
		align-items: baseline;
		gap: var(--_gap);
	}

	.button__supporting-text {
		min-width: 0;
		color: var(--_secondary-content-color);
		font: var(--_supporting-font);
	}

	.button:hover .button__supporting-text {
		@media (hover: hover) {
			color: var(--_is-hovered-secondary-content-color);
		}
	}

	.button:active .button__supporting-text {
		color: var(--_is-active-secondary-content-color);
	}

	:host([single-line]) .button__supporting-text {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	:host([size="md"]) .button.has-supporting-text {
		--_font: var(--semantics-buttons-sm-primary-text-font);
		--_icon-size: var(--semantics-buttons-md-with-supporting-text-icon-size);
		--_inline-padding: calc((var(--_min-size) - var(--_icon-size)) / 2);
		--_block-padding: var(--primitives-space-4);
	}

	:host([size="lg"]) .button.has-supporting-text {
		--_font: var(--semantics-buttons-md-primary-text-font);
		--_icon-size: var(--semantics-buttons-lg-with-supporting-text-icon-size);
		--_inline-padding: calc((var(--_min-size) - var(--_icon-size)) / 2);
		--_block-padding: var(--primitives-space-4);
	}

	.button__start-icon,
	.button__end-icon {
		display: flex;
		width: var(--_icon-size);
		height: var(--_icon-size);
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
	}

	:host([expandable]) .button {
		padding-inline-end: calc(var(--_inline-padding) + var(--_gap) + var(--_disclosure-icon-size));
	}

	.button__disclosure-icon {
		display: block;
		position: absolute;
		top: 50%;
		inset-inline-end: var(--_inline-padding);
		width: var(--_disclosure-icon-size);
		height: var(--_disclosure-icon-size);
		transform: translateY(-50%);
	}
`;
