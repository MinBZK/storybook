import { css } from 'lit';

export const iconButtonStyles = css`


	/* # Host */

	:host {
		--_width: auto;

		display: inline-block;
		-webkit-tap-highlight-color: transparent;
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
		appearance: none;
		border: none;
		margin: 0;
		padding: 0;
		background: none;
		font: inherit;
		box-sizing: border-box;
		text-decoration: none;
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: var(--_width);
		transition:
			background-color var(--primitives-transition-duration-fast) var(--primitives-transition-easing-default),
			color var(--primitives-transition-duration-fast) var(--primitives-transition-easing-default)
		;
	}

	a.icon-button {
		cursor: var(--semantics-controls-link-cursor);
	}

	@media (prefers-reduced-motion: reduce) {
		.icon-button {
			transition: none;
		}
	}


	/* # Focus */

	.icon-button:focus-visible {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	.icon-button:focus:not(:focus-visible) {
		outline: none;
	}


	/* # Sizes */

	/* ## Size: XS */

	:host([size='xs']) .icon-button {
		height: var(--semantics-controls-xs-min-size);
		min-width: var(--semantics-controls-xs-min-size);
		min-height: var(--semantics-controls-xs-min-size);
		padding: var(--primitives-space-4);
		border-radius: var(--semantics-controls-xs-corner-radius);
	}

	:host([size='xs']) .icon-button__icon {
		width: var(--primitives-space-16);
		height: var(--primitives-space-16);
	}

	:host([size='xs']) .icon-button__disclosure-icon {
		width: var(--primitives-space-16);
		height: var(--primitives-space-16);
	}

	/* ## Size: SM */

	:host([size='sm']) .icon-button {
		height: var(--semantics-controls-sm-min-size);
		min-width: var(--semantics-controls-sm-min-size);
		min-height: var(--semantics-controls-sm-min-size);
		padding: var(--primitives-space-6);
		border-radius: var(--semantics-controls-sm-corner-radius);
	}

	:host([size='sm']) .icon-button__icon {
		width: var(--primitives-space-20);
		height: var(--primitives-space-20);
	}

	:host([size='sm']) .icon-button__disclosure-icon {
		width: var(--primitives-space-20);
		height: var(--primitives-space-20);
		margin-right: calc(var(--primitives-space-2) * -1);
	}

	/* ## Size: MD (Default) */

	:host([size='md']) .icon-button,
	:host(:not([size])) .icon-button {
		height: var(--semantics-controls-md-min-size);
		min-width: var(--semantics-controls-md-min-size);
		min-height: var(--semantics-controls-md-min-size);
		padding: var(--primitives-space-8);
		border-radius: var(--semantics-controls-md-corner-radius);
	}

	:host([size='md']) .icon-button__icon,
	:host(:not([size])) .icon-button__icon {
		width: var(--primitives-space-24);
		height: var(--primitives-space-24);
	}

	:host([size='md']) .icon-button__disclosure-icon,
	:host(:not([size])) .icon-button__disclosure-icon {
		width: var(--primitives-space-20);
		height: var(--primitives-space-20);
		margin-right: calc(var(--primitives-space-2) * -1);
	}

	/* ## Size: LG */

	:host([size='lg']) .icon-button {
		height: var(--semantics-controls-lg-min-size);
		min-width: var(--semantics-controls-lg-min-size);
		min-height: var(--semantics-controls-lg-min-size);
		padding: var(--primitives-space-8);
		border-radius: var(--semantics-controls-lg-corner-radius);
	}

	:host([size='lg']) .icon-button__icon {
		width: var(--primitives-space-24);
		height: var(--primitives-space-24);
	}

	:host([size='lg']) .icon-button__disclosure-icon {
		width: var(--primitives-space-20);
		height: var(--primitives-space-20);
		margin-right: calc(var(--primitives-space-2) * -1);
	}

	/* # Variants */

	/* ## Neutral Tinted (Secondary, Default) */

	/* ### Default neutral tinted icon button */

	:host([variant='neutral-tinted']) .icon-button,
	:host([variant='secondary']) .icon-button,
	:host(:not([variant])) .icon-button {
		background-color: var(--semantics-buttons-neutral-tinted-background-color);
		color: var(--semantics-buttons-neutral-tinted-content-color);
	}

	/* ### Hovered neutral tinted icon button */

	@media (hover: hover) {
		:host([variant='neutral-tinted']) .icon-button:hover,
		:host([variant='secondary']) .icon-button:hover,
		:host(:not([variant])) .icon-button:hover {
			background-color: var(--semantics-buttons-neutral-tinted-is-hovered-background-color);
			color: var(--semantics-buttons-neutral-tinted-is-hovered-content-color);
		}
	}

	/* ### Active neutral tinted icon button */

	:host([variant='neutral-tinted']) .icon-button:active,
	:host([variant='secondary']) .icon-button:active,
	:host(:not([variant])) .icon-button:active {
		background-color: var(--semantics-buttons-neutral-tinted-is-active-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-active-content-color);
	}

	/* ### Open neutral tinted icon button */

	:host([open][variant='neutral-tinted']) .icon-button,
	:host([open][variant='secondary']) .icon-button,
	:host([open]:not([variant])) .icon-button {
		background-color: var(--semantics-buttons-neutral-tinted-is-open-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-open-content-color);
	}

	/* ### Open hovered neutral tinted icon button */

	@media (hover: hover) {
		:host([open][variant='neutral-tinted']) .icon-button:hover,
		:host([open][variant='secondary']) .icon-button:hover,
		:host([open]:not([variant])) .icon-button:hover {
			background-color: var(--semantics-buttons-neutral-tinted-is-open-is-hovered-background-color);
			color: var(--semantics-buttons-neutral-tinted-is-open-is-hovered-content-color);
		}
	}

	/* ### Open active neutral tinted icon button */

	:host([open][variant='neutral-tinted']) .icon-button:active,
	:host([open][variant='secondary']) .icon-button:active,
	:host([open]:not([variant])) .icon-button:active {
		background-color: var(--semantics-buttons-neutral-tinted-is-open-is-active-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-open-is-active-content-color);
	}

	/* ## Neutral Transparent */

	/* ### Default neutral transparent icon button */

	:host([variant='neutral-transparent']) .icon-button {
		background-color: transparent;
		color: var(--semantics-buttons-neutral-transparent-content-color);
	}

	/* ### Hovered neutral transparent icon button */

	@media (hover: hover) {
		:host([variant='neutral-transparent']) .icon-button:hover {
			background-color: transparent;
			color: var(--semantics-buttons-neutral-transparent-is-hovered-content-color);
		}
	}

	/* ### Active neutral transparent icon button */

	:host([variant='neutral-transparent']) .icon-button:active {
		color: var(--semantics-buttons-neutral-transparent-is-active-content-color);
	}

	/* ## Accent Filled (Primary) */

	/* ### Default accent filled icon button */

	:host([variant='accent-filled']) .icon-button,
	:host([variant='primary']) .icon-button {
		background-color: var(--semantics-buttons-accent-filled-background-color);
		color: var(--semantics-buttons-accent-filled-content-color);
	}

	/* ### Hovered accent filled icon button */

	@media (hover: hover) {
		:host([variant='accent-filled']) .icon-button:hover,
		:host([variant='primary']) .icon-button:hover {
			background-color: var(--semantics-buttons-accent-filled-is-hovered-background-color);
			color: var(--semantics-buttons-accent-filled-is-hovered-content-color);
		}
	}

	/* ### Active accent filled icon button */

	:host([variant='accent-filled']) .icon-button:active,
	:host([variant='primary']) .icon-button:active {
		background-color: var(--semantics-buttons-accent-filled-is-active-background-color);
		color: var(--semantics-buttons-accent-filled-is-active-content-color);
	}

	/* ### Open accent filled icon button */

	:host([open][variant='accent-filled']) .icon-button,
	:host([open][variant='primary']) .icon-button {
		background-color: var(--semantics-buttons-accent-filled-is-open-background-color);
		color: var(--semantics-buttons-accent-filled-is-open-content-color);
	}

	/* ### Open hovered accent filled icon button */

	@media (hover: hover) {
		:host([open][variant='accent-filled']) .icon-button:hover,
		:host([open][variant='primary']) .icon-button:hover {
			background-color: var(--semantics-buttons-accent-filled-is-open-is-hovered-background-color);
			color: var(--semantics-buttons-accent-filled-is-open-is-hovered-content-color);
		}
	}

	/* ### Open active accent filled icon button */

	:host([open][variant='accent-filled']) .icon-button:active,
	:host([open][variant='primary']) .icon-button:active {
		background-color: var(--semantics-buttons-accent-filled-is-open-is-active-background-color);
		color: var(--semantics-buttons-accent-filled-is-open-is-active-content-color);
	}

	/* ## Accent Transparent */

	/* ### Default accent transparent icon button */

	:host([variant='accent-transparent']) .icon-button {
		background-color: transparent;
		color: var(--semantics-buttons-accent-transparent-content-color);
	}

	/* ### Hovered accent transparent icon button */

	@media (hover: hover) {
		:host([variant='accent-transparent']) .icon-button:hover {
			color: var(--semantics-buttons-accent-transparent-is-hovered-content-color);
		}
	}

	/* ### Active accent transparent icon button */

	:host([variant='accent-transparent']) .icon-button:active {
		color: var(--semantics-buttons-accent-transparent-is-active-content-color);
	}

	/* ## Critical Tinted (Destructive) */

	/* ### Default critical tinted icon button */

	:host([variant='critical-tinted']) .icon-button,
	:host([variant='destructive']) .icon-button {
		background-color: var(--semantics-buttons-critical-tinted-background-color);
		color: var(--semantics-buttons-critical-tinted-content-color);
	}

	/* ### Hovered critical tinted icon button */

	@media (hover: hover) {
		:host([variant='critical-tinted']) .icon-button:hover,
		:host([variant='destructive']) .icon-button:hover {
			background-color: var(--semantics-buttons-critical-tinted-is-hovered-background-color);
			color: var(--semantics-buttons-critical-tinted-is-hovered-content-color);
		}
	}

	/* ### Active critical tinted icon button */

	:host([variant='critical-tinted']) .icon-button:active,
	:host([variant='destructive']) .icon-button:active {
		background-color: var(--semantics-buttons-critical-tinted-is-active-background-color);
		color: var(--semantics-buttons-critical-tinted-is-active-content-color);
	}

	/* ## Critical Transparent */

	/* ### Default critical transparent icon button */

	:host([variant='critical-transparent']) .icon-button {
		background-color: transparent;
		color: var(--semantics-buttons-critical-transparent-content-color);
	}

	/* ### Hovered critical transparent icon button */

	@media (hover: hover) {
		:host([variant='critical-transparent']) .icon-button:hover {
			color: var(--semantics-buttons-critical-transparent-is-hovered-content-color);
		}
	}

	/* ### Active critical transparent icon button */

	:host([variant='critical-transparent']) .icon-button:active {
		color: var(--semantics-buttons-critical-transparent-is-active-content-color);
	}


	/* # Elements */

	.icon-button__icon-area {
		display: inline-flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.icon-button__icon {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
	}

	.icon-button__disclosure-icon {
		display: flex;
		flex-shrink: 0;
	}

	.icon-button__text {
		display: none;
		text-align: center;
		white-space: nowrap;
		color: inherit;
		font: var(--primitives-font-body-xxs-bold-flat);
	}

	:host([size='lg']) .icon-button__text {
		display: block;
	}
`;
