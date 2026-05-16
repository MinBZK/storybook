import { css } from 'lit';

export const buttonStyles = css`


	/* # Host */

	:host {
		--_width: auto;
		--_disclosure-icon-size: var(--primitives-space-20);

		display: inline-block;
		max-width: 100%;
		-webkit-tap-highlight-color: transparent;
	}

	:host([size="sm"]) {
		--_disclosure-icon-size: var(--primitives-space-18);
	}

	:host([size="xs"]) {
		--_disclosure-icon-size: var(--primitives-space-16);
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

	.button {
		box-sizing: border-box;
		display: inline-flex;
		margin: 0;
		border: none;
		background: none;
		width: var(--_width);
		max-width: 100%;
		padding: 0;
		align-items: center;
		justify-content: center;
		font: inherit;
		text-decoration: none;
		text-wrap: pretty;
		appearance: none;
		transition:
			background-color var(--primitives-transition-duration-fast) var(--primitives-transition-easing-default),
			color var(--primitives-transition-duration-fast) var(--primitives-transition-easing-default)
		;
	}

	a.button {
		cursor: var(--semantics-controls-link-cursor);
	}

	@media (prefers-reduced-motion: reduce) {
		.button {
			transition: none;
		}
	}


	/* # Focus */

	.button:focus-visible {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	.button:focus:not(:focus-visible) {
		outline: none;
	}


	/* # Sizes */

	/* ## Size: XS */

	:host([size="xs"]) .button {
		border-radius: var(--semantics-controls-xs-corner-radius);
		min-height: var(--semantics-controls-xs-min-size);
		min-width: var(--semantics-controls-xs-min-size);
		padding: var(--semantics-controls-xs-block-padding) var(--semantics-controls-xs-inline-padding);
		gap: var(--semantics-buttons-xs-gap);
		font: var(--semantics-buttons-xs-font);
	}

	/* ## Size: SM */

	:host([size="sm"]) .button {
		border-radius: var(--semantics-controls-sm-corner-radius);
		min-height: var(--semantics-controls-sm-min-size);
		min-width: var(--semantics-controls-sm-min-size);
		padding: var(--semantics-controls-sm-block-padding) var(--semantics-controls-sm-inline-padding);
		gap: var(--semantics-buttons-sm-gap);
		font: var(--semantics-buttons-sm-font);
	}

	/* ## Size: MD (Default) */

	:host([size="md"]) .button,
	:host(:not([size])) .button {
		border-radius: var(--semantics-controls-md-corner-radius);
		min-height: var(--semantics-controls-md-min-size);
		min-width: var(--semantics-controls-md-min-size);
		padding: var(--semantics-controls-md-block-padding) var(--semantics-controls-md-inline-padding);
		gap: var(--semantics-buttons-md-gap);
		font: var(--semantics-buttons-md-font);
	}


	/* # Variants */

	/* ## Neutral Tintend (Secondary, Default) */

	/* ### Default neutral tinted button */

	:host([variant="neutral-tinted"]) .button,
	:host([variant="secondary"]) .button,
	:host(:not([variant])) .button {
		background-color: var(--semantics-buttons-neutral-tinted-background-color);
		color: var(--semantics-buttons-neutral-tinted-content-color);
	}

	/* ### Hovered neutral tinted button */

	@media (hover: hover) {
		:host([variant="neutral-tinted"]) .button:hover,
		:host([variant="secondary"]) .button:hover,
		:host(:not([variant])) .button:hover {
			background-color: var(--semantics-buttons-neutral-tinted-is-hovered-background-color);
			color: var(--semantics-buttons-neutral-tinted-is-hovered-content-color);
		}
	}

	/* ### Active neutral tinted button */

	:host([variant="neutral-tinted"]) .button:active,
	:host([variant="secondary"]) .button:active,
	:host(:not([variant])) .button:active {
		background-color: var(--semantics-buttons-neutral-tinted-is-active-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-active-content-color);
	}

	/* ### Open neutral tinted button */

	:host([expanded][variant="neutral-tinted"]) .button,
	:host([expanded][variant="secondary"]) .button,
	:host([expanded]:not([variant])) .button {
		background-color: var(--semantics-buttons-neutral-tinted-is-expanded-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-expanded-content-color);
	}

	/* ### Open hovered neutral tinted button */

	@media (hover: hover) {
		:host([expanded][variant="neutral-tinted"]) .button:hover,
		:host([expanded][variant="secondary"]) .button:hover,
		:host([expanded]:not([variant])) .button:hover {
			background-color: var(--semantics-buttons-neutral-tinted-is-expanded-is-hovered-background-color);
			color: var(--semantics-buttons-neutral-tinted-is-expanded-is-hovered-content-color);
		}
	}

	/* ### Open active neutral tinted button */

	:host([expanded][variant="neutral-tinted"]) .button:active,
	:host([expanded][variant="secondary"]) .button:active,
	:host([expanded]:not([variant])) .button:active {
		background-color: var(--semantics-buttons-neutral-tinted-is-expanded-is-active-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-expanded-is-active-content-color);
	}

	/* ## Neutral Transparent */

	/* ### Default neutral transparent button */

	:host([variant="neutral-transparent"]) .button {
		background-color: transparent;
		color: var(--semantics-buttons-neutral-transparent-content-color);
	}

	/* ### Hovered neutral transparent button */

	@media (hover: hover) {
		:host([variant="neutral-transparent"]) .button:hover {
			color: var(--semantics-buttons-neutral-transparent-is-hovered-content-color);
		}
	}

	/* ### Active neutral transparent button */

	:host([variant="neutral-transparent"]) .button:active {
		color: var(--semantics-buttons-neutral-transparent-is-active-content-color);
	}

	/* ## Accent Filled (Primary) */

	/* ### Default accent filled button */

	:host([variant="accent-filled"]) .button,
	:host([variant="primary"]) .button {
		background-color: var(--semantics-buttons-accent-filled-background-color);
		color: var(--semantics-buttons-accent-filled-content-color);
	}

	/* ### Hovered accent filled button */

	@media (hover: hover) {
		:host([variant="accent-filled"]) .button:hover,
		:host([variant="primary"]) .button:hover {
			background-color: var(--semantics-buttons-accent-filled-is-hovered-background-color);
			color: var(--semantics-buttons-accent-filled-is-hovered-content-color);
		}
	}

	/* ### Active accent filled button */

	:host([variant="accent-filled"]) .button:active,
	:host([variant="primary"]) .button:active {
		background-color: var(--semantics-buttons-accent-filled-is-active-background-color);
		color: var(--semantics-buttons-accent-filled-is-active-content-color);
	}

	/* ### Open accent filled button */

	:host([expanded][variant="accent-filled"]) .button,
	:host([expanded][variant="primary"]) .button {
		background-color: var(--semantics-buttons-accent-filled-is-expanded-background-color);
		color: var(--semantics-buttons-accent-filled-is-expanded-content-color);
	}

	/* ### Open hovered accent filled button */

	@media (hover: hover) {
		:host([expanded][variant="accent-filled"]) .button:hover,
		:host([expanded][variant="primary"]) .button:hover {
			background-color: var(--semantics-buttons-accent-filled-is-expanded-is-hovered-background-color);
			color: var(--semantics-buttons-accent-filled-is-expanded-is-hovered-content-color);
		}
	}

	/* ### Open active accent filled button */

	:host([expanded][variant="accent-filled"]) .button:active,
	:host([expanded][variant="primary"]) .button:active {
		background-color: var(--semantics-buttons-accent-filled-is-expanded-is-active-background-color);
		color: var(--semantics-buttons-accent-filled-is-expanded-is-active-content-color);
	}

	/* ## Accent Transparent */

	/* ### Default accent transparent button */

	:host([variant="accent-transparent"]) .button {
		background-color: transparent;
		color: var(--semantics-buttons-accent-transparent-content-color);
	}

	/* ### Hovered accent transparent button */

	@media (hover: hover) {
		:host([variant="accent-transparent"]) .button:hover {
			color: var(--semantics-buttons-accent-transparent-is-hovered-content-color);
		}
	}

	/* ### Active accent transparent button */

	:host([variant="accent-transparent"]) .button:active {
		color: var(--semantics-buttons-accent-transparent-is-active-content-color);
	}

	/* ## Critical Tinted */

	/* ### Default critical tinted button */

	:host([variant="critical-tinted"]) .button,
	:host([variant="destructive"]) .button {
		background-color: var(--semantics-buttons-critical-tinted-background-color);
		color: var(--semantics-buttons-critical-tinted-content-color);
	}

	/* ### Hovered critical tinted button */

	@media (hover: hover) {
		:host([variant="critical-tinted"]) .button:hover,
		:host([variant="destructive"]) .button:hover {
			background-color: var(--semantics-buttons-critical-tinted-is-hovered-background-color);
			color: var(--semantics-buttons-critical-tinted-is-hovered-content-color);
		}
	}

	/* ### Active critical tinted button */

	:host([variant="critical-tinted"]) .button:active,
	:host([variant="destructive"]) .button:active {
		background-color: var(--semantics-buttons-critical-tinted-is-active-background-color);
		color: var(--semantics-buttons-critical-tinted-is-active-content-color);
	}

	/* ## Critical Transparent */

	/* ### Default critical transparent button */

	:host([variant="critical-transparent"]) .button {
		background-color: transparent;
		color: var(--semantics-buttons-critical-transparent-content-color);
	}

	/* ### Hovered critical transparent button */

	@media (hover: hover) {
		:host([variant="critical-transparent"]) .button:hover {
			color: var(--semantics-buttons-critical-transparent-is-hovered-content-color);
		}
	}

	/* ### Active critical transparent button */

	:host([variant="critical-transparent"]) .button:active {
		color: var(--semantics-buttons-critical-transparent-is-active-content-color);
	}

	/* ## Elements */

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
		flex-shrink: 0;
	}

	:host([size="md"]) .button__start-icon,
	:host(:not([size])) .button__start-icon,
	:host([size="md"]) .button__end-icon,
	:host(:not([size])) .button__end-icon {
		width: var(--semantics-buttons-md-icon-size);
		height: var(--semantics-buttons-md-icon-size);
	}

	:host([size="sm"]) .button__start-icon,
	:host([size="sm"]) .button__end-icon {
		width: var(--semantics-buttons-sm-icon-size);
		height: var(--semantics-buttons-sm-icon-size);
	}

	:host([size="xs"]) .button__start-icon,
	:host([size="xs"]) .button__end-icon {
		width: var(--semantics-buttons-xs-icon-size);
		height: var(--semantics-buttons-xs-icon-size);
	}

	.button__disclosure-icon {
		display: block;
		width: var(--_disclosure-icon-size);
		height: var(--_disclosure-icon-size);
		flex-shrink: 0;
	}

	:host([size="md"]) .button__disclosure-icon,
	:host(:not([size])) .button__disclosure-icon {
		margin-left: -2px;
		margin-right: -2px;
	}

	:host([size="sm"]) .button__disclosure-icon {
		margin-left: -1px;
		margin-right: -2px;
	}

	:host([size="xs"]) .button__disclosure-icon {
		margin-left: -1px;
		margin-right: -2px;
	}
`;
