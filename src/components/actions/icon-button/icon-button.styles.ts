import { css } from 'lit';

export const iconButtonStyles = css`


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

	.icon-button {
		appearance: none;
		border: none;
		margin: 0;
		padding: 0;
		background: none;
		font: inherit;
		box-sizing: border-box;
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		transition:
			background-color 0.15s ease-out,
			color 0.15s ease-out;
	}

	@media (prefers-reduced-motion: reduce) {
		.icon-button {
			transition: none;
		}
	}

	a.icon-button {
		cursor: var(--semantics-controls-link-cursor);
	}


	/* # Focus */

	.icon-button:focus-visible {
		box-shadow: var(--semantics-focus-ring-box-shadow);
		outline: var(--semantics-focus-ring-outline);
	}

	.icon-button:focus:not(:focus-visible) {
		outline: none;
	}


	/* # Sizes */

	/* ## Size: XS */

	:host([size='xs']) .icon-button {
		width: auto;
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
		width: auto;
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
		width: auto;
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
		width: auto;
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

	:host([full-width]) .icon-button {
		width: 100%;
	}


	/* # Variants */

	/* ## Variant: neutral-tinted (secondary, default) */

	:host([variant='neutral-tinted']) .icon-button,
	:host([variant='secondary']) .icon-button,
	:host(:not([variant])) .icon-button {
		background-color: var(--semantics-buttons-neutral-tinted-background-color);
		color: var(--semantics-buttons-neutral-tinted-content-color);
	}

	:host([variant='neutral-tinted']) .icon-button:hover,
	:host([variant='secondary']) .icon-button:hover,
	:host(:not([variant])) .icon-button:hover {
		background-color: var(--semantics-buttons-neutral-tinted-is-hovered-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-hovered-content-color);
	}

	:host([variant='neutral-tinted']) .icon-button:active,
	:host([variant='secondary']) .icon-button:active,
	:host(:not([variant])) .icon-button:active {
		background-color: var(--semantics-buttons-neutral-tinted-is-active-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-active-content-color);
	}

	/* ## Variant: neutral-transparent */

	:host([variant='neutral-transparent']) .icon-button {
		background-color: transparent;
		color: var(--semantics-buttons-neutral-transparent-content-color);
	}

	:host([variant='neutral-transparent']) .icon-button:hover {
		background-color: transparent;
		color: var(--semantics-buttons-neutral-transparent-is-hovered-content-color);
	}

	:host([variant='neutral-transparent']) .icon-button:active {
		color: var(--semantics-buttons-neutral-transparent-is-active-content-color);
	}

	/* ## Variant: accent-filled (primary) */

	:host([variant='accent-filled']) .icon-button,
	:host([variant='primary']) .icon-button {
		background-color: var(--semantics-buttons-accent-filled-background-color);
		color: var(--semantics-buttons-accent-filled-content-color);
	}

	:host([variant='accent-filled']) .icon-button:hover,
	:host([variant='primary']) .icon-button:hover {
		background-color: var(--semantics-buttons-accent-filled-is-hovered-background-color);
		color: var(--semantics-buttons-accent-filled-is-hovered-content-color);
	}

	:host([variant='accent-filled']) .icon-button:active,
	:host([variant='primary']) .icon-button:active {
		background-color: var(--semantics-buttons-accent-filled-is-active-background-color);
		color: var(--semantics-buttons-accent-filled-is-active-content-color);
	}

	/* ## Variant: accent-outlined */

	:host([variant='accent-outlined']) .icon-button {
		background-color: transparent;
		border-width: var(--semantics-buttons-accent-outlined-border-thickness);
		border-style: solid;
		border-color: var(--semantics-buttons-accent-outlined-border-color);
		color: var(--semantics-buttons-accent-outlined-content-color);
	}

	:host([variant='accent-outlined'][size='lg']) .icon-button {
		padding: calc(var(--primitives-space-8) - var(--semantics-buttons-accent-outlined-border-thickness));
	}

	:host([variant='accent-outlined'][size='md']) .icon-button {
		padding: calc(var(--primitives-space-8) - var(--semantics-buttons-accent-outlined-border-thickness));
	}

	:host([variant='accent-outlined'][size='sm']) .icon-button {
		padding: calc(var(--primitives-space-6) - var(--semantics-buttons-accent-outlined-border-thickness));
	}

	:host([variant='accent-outlined'][size='xs']) .icon-button {
		padding: calc(var(--primitives-space-4) - var(--semantics-buttons-accent-outlined-border-thickness));
	}

	:host([variant='accent-outlined']) .icon-button:hover {
		border-color: var(--semantics-buttons-accent-outlined-is-hovered-border-color);
		color: var(--semantics-buttons-accent-outlined-is-hovered-content-color);
	}

	:host([variant='accent-outlined']) .icon-button:active {
		border-color: var(--semantics-buttons-accent-outlined-is-active-border-color);
		color: var(--semantics-buttons-accent-outlined-is-active-content-color);
	}

	/* ## Variant: accent-transparent */

	:host([variant='accent-transparent']) .icon-button {
		background-color: transparent;
		color: var(--semantics-buttons-accent-transparent-content-color);
	}

	:host([variant='accent-transparent']) .icon-button:hover {
		color: var(--semantics-buttons-accent-transparent-is-hovered-content-color);
	}

	:host([variant='accent-transparent']) .icon-button:active {
		color: var(--semantics-buttons-accent-transparent-is-active-content-color);
	}

	/* ## Variant: danger-tinted (destructive) */

	:host([variant='danger-tinted']) .icon-button,
	:host([variant='destructive']) .icon-button {
		background-color: var(--semantics-buttons-danger-tinted-background-color);
		color: var(--semantics-buttons-danger-tinted-content-color);
	}

	:host([variant='danger-tinted']) .icon-button:hover,
	:host([variant='destructive']) .icon-button:hover {
		background-color: var(--semantics-buttons-danger-tinted-is-hovered-background-color);
		color: var(--semantics-buttons-danger-tinted-is-hovered-content-color);
	}

	:host([variant='danger-tinted']) .icon-button:active,
	:host([variant='destructive']) .icon-button:active {
		background-color: var(--semantics-buttons-danger-tinted-is-active-background-color);
		color: var(--semantics-buttons-danger-tinted-is-active-content-color);
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
