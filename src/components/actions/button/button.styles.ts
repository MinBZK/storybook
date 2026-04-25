import { css } from 'lit';

export const buttonStyles = css`


	/* # Host */

	:host {
		display: inline-block;
		-webkit-tap-highlight-color: transparent;
	}

	:host([full-width]) {
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
		appearance: none;
		border: none;
		margin: 0;
		padding: 0;
		background: none;
		font: inherit;
		box-sizing: border-box;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 100%;
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
		box-shadow: var(--semantics-focus-ring-box-shadow);
		outline: var(--semantics-focus-ring-outline);
	}

	.button:focus:not(:focus-visible) {
		outline: none;
	}


	/* # Sizes */

	/* ## Size: XS */

	:host([size="xs"]) .button {
		min-height: var(--semantics-controls-xs-min-size);
		min-width: var(--semantics-controls-xs-min-size);
		padding: var(--semantics-controls-xs-block-padding) var(--semantics-controls-xs-inline-padding);
		font: var(--semantics-buttons-xs-font);
		border-radius: var(--semantics-controls-xs-corner-radius);
		gap: var(--semantics-buttons-xs-gap);
	}

	/* ## Size: SM */

	:host([size="sm"]) .button {
		min-height: var(--semantics-controls-sm-min-size);
		min-width: var(--semantics-controls-sm-min-size);
		padding: var(--semantics-controls-sm-block-padding) var(--semantics-controls-sm-inline-padding);
		font: var(--semantics-buttons-sm-font);
		border-radius: var(--semantics-controls-sm-corner-radius);
		gap: var(--semantics-buttons-sm-gap);
	}

	/* ## Size: MD (Default) */

	:host([size="md"]) .button,
	:host(:not([size])) .button {
		min-height: var(--semantics-controls-md-min-size);
		min-width: var(--semantics-controls-md-min-size);
		padding: var(--semantics-controls-md-block-padding) var(--semantics-controls-md-inline-padding);
		font: var(--semantics-buttons-md-font);
		border-radius: var(--semantics-controls-md-corner-radius);
		gap: var(--semantics-buttons-md-gap);
	}


	/* # Variants */

	/* ## Variant: Neutral Tintend (Secondary, Default) */

	:host([variant="neutral-tinted"]) .button,
	:host([variant="secondary"]) .button,
	:host(:not([variant])) .button {
		background-color: var(--semantics-buttons-neutral-tinted-background-color);
		color: var(--semantics-buttons-neutral-tinted-content-color);
	}

	:host([variant="neutral-tinted"]) .button:hover,
	:host([variant="secondary"]) .button:hover,
	:host(:not([variant])) .button:hover {
		background-color: var(--semantics-buttons-neutral-tinted-is-hovered-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-hovered-content-color);
	}

	:host([variant="neutral-tinted"]) .button:active,
	:host([variant="secondary"]) .button:active,
	:host(:not([variant])) .button:active {
		background-color: var(--semantics-buttons-neutral-tinted-is-active-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-active-content-color);
	}

	/* ## Variant: Neutral Transparent */

	:host([variant="neutral-transparent"]) .button {
		background-color: transparent;
		color: var(--semantics-buttons-neutral-transparent-content-color);
	}

	:host([variant="neutral-transparent"]) .button:hover {
		color: var(--semantics-buttons-neutral-transparent-is-hovered-content-color);
	}

	:host([variant="neutral-transparent"]) .button:active {
		color: var(--semantics-buttons-neutral-transparent-is-active-content-color);
	}

	/* ## Variant: Accent Filled (Primary) */

	:host([variant="accent-filled"]) .button,
	:host([variant="primary"]) .button {
		background-color: var(--semantics-buttons-accent-filled-background-color);
		color: var(--semantics-buttons-accent-filled-content-color);
	}

	:host([variant="accent-filled"]) .button:hover,
	:host([variant="primary"]) .button:hover {
		background-color: var(--semantics-buttons-accent-filled-is-hovered-background-color);
		color: var(--semantics-buttons-accent-filled-is-hovered-content-color);
	}

	:host([variant="accent-filled"]) .button:active,
	:host([variant="primary"]) .button:active {
		background-color: var(--semantics-buttons-accent-filled-is-active-background-color);
		color: var(--semantics-buttons-accent-filled-is-active-content-color);
	}

	/* ## Variant: Accent Outlined */

	:host([variant="accent-outlined"]) .button {
		background-color: transparent;
		padding: calc(var(--primitives-space-12) - var(--semantics-buttons-accent-outlined-border-thickness));
		color: var(--semantics-buttons-accent-outlined-content-color);
		border-width: var(--semantics-buttons-accent-outlined-border-thickness);
		border-style: solid;
		border-color: var(--semantics-buttons-accent-outlined-border-color);
	}

	:host([variant="accent-outlined"][size="md"]) .button {
		padding: calc(var(--primitives-space-12) - var(--semantics-buttons-accent-outlined-border-thickness));
	}

	:host([variant="accent-outlined"][size="sm"]) .button {
		padding:
			calc(var(--primitives-space-6) - var(--semantics-buttons-accent-outlined-border-thickness))
			calc(var(--primitives-space-10) - var(--semantics-buttons-accent-outlined-border-thickness))
		;
	}

	:host([variant="accent-outlined"][size="xs"]) .button {
		padding:
			calc(var(--primitives-space-4) - var(--semantics-buttons-accent-outlined-border-thickness))
			calc(var(--primitives-space-6) - var(--semantics-buttons-accent-outlined-border-thickness))
		;
	}

	:host([variant="accent-outlined"]) .button:hover {
		color: var(--semantics-buttons-accent-outlined-is-hovered-content-color);
		border-color: var(--semantics-buttons-accent-outlined-is-hovered-border-color);
	}

	:host([variant="accent-outlined"]) .button:active {
		color: var(--semantics-buttons-accent-outlined-is-active-content-color);
		border-color: var(--semantics-buttons-accent-outlined-is-active-border-color);
	}

	/* ## Variant: Accent Transparent */

	:host([variant="accent-transparent"]) .button {
		background-color: transparent;
		color: var(--semantics-buttons-accent-transparent-content-color);
	}

	:host([variant="accent-transparent"]) .button:hover {
		color: var(--semantics-buttons-accent-transparent-is-hovered-content-color);
	}

	:host([variant="accent-transparent"]) .button:active {
		color: var(--semantics-buttons-accent-transparent-is-active-content-color);
	}

	/* ## Variant: Critical Tinted */

	:host([variant="critical-tinted"]) .button,
	:host([variant="destructive"]) .button {
		background-color: var(--semantics-buttons-critical-tinted-background-color);
		color: var(--semantics-buttons-critical-tinted-content-color);
	}

	:host([variant="critical-tinted"]) .button:hover,
	:host([variant="destructive"]) .button:hover {
		background-color: var(--semantics-buttons-critical-tinted-is-hovered-background-color);
		color: var(--semantics-buttons-critical-tinted-is-hovered-content-color);
	}

	:host([variant="critical-tinted"]) .button:active,
	:host([variant="destructive"]) .button:active {
		background-color: var(--semantics-buttons-critical-tinted-is-active-background-color);
		color: var(--semantics-buttons-critical-tinted-is-active-content-color);
	}

	/* ## Elements */

	.button__content {
		display: contents;
	}

	::slotted(nldd-icon) {
		display: none;
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
		width: var(--primitives-space-20);
		height: var(--primitives-space-20);
	}

	:host([size="sm"]) .button__start-icon,
	:host([size="sm"]) .button__end-icon {
		width: var(--primitives-space-18);
		height: var(--primitives-space-18);
	}

	:host([size="xs"]) .button__start-icon,
	:host([size="xs"]) .button__end-icon {
		width: var(--primitives-space-16);
		height: var(--primitives-space-16);
	}

	.button__disclosure-icon {
		display: block;
		flex-shrink: 0;
	}

	:host([size="md"]) .button__disclosure-icon,
	:host(:not([size])) .button__disclosure-icon {
		width: var(--primitives-space-20);
		height: var(--primitives-space-20);
		margin-left: -2px;
		margin-right: -2px;
	}

	:host([size="sm"]) .button__disclosure-icon {
		width: var(--primitives-space-18);
		height: var(--primitives-space-18);
		margin-left: -1px;
		margin-right: -2px;
	}

	:host([size="xs"]) .button__disclosure-icon {
		width: var(--primitives-space-16);
		height: var(--primitives-space-16);
		margin-left: -1px;
		margin-right: -2px;
	}
`;
