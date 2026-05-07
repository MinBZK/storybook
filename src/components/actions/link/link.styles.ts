import { css } from 'lit';

export const linkStyles = css`


	/* # Host */

	:host {
		display: inline-flex;
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}

	:host([disabled]) {
		opacity: var(--primitives-opacity-disabled);
		pointer-events: none;
	}


	/* # Block */

	.link {
		appearance: none;
		background: none;
		color: var(--semantics-links-color);
		display: inline-flex;
		align-items: center;
		text-decoration: none;
		border-radius: var(--primitives-corner-radius-xs);
		transition: color var(--primitives-transition-duration-fast) var(--primitives-transition-easing-default);
	}

	:host([size="xs"]) .link {
		gap: var(--primitives-space-4);
		font: var(--primitives-font-body-xs-regular-flat);
	}

	:host([size="sm"]) .link {
		gap: var(--primitives-space-4);
		font: var(--primitives-font-body-sm-regular-flat);
	}

	:host([size="md"]) .link,
	:host(:not([size])) .link {
		gap: var(--primitives-space-6);
		font: var(--primitives-font-body-md-regular-flat);
	}

	:host([size="lg"]) .link {
		gap: var(--primitives-space-6);
		font: var(--primitives-font-body-lg-regular-flat);
	}

	@media (hover: hover) {
		.link:hover {
			color: var(--semantics-links-is-hovered-color);
		}
	}

	.link:active {
		color: var(--semantics-links-is-active-color);
	}

	.link:focus-visible {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	.link:focus:not(:focus-visible) {
		outline: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.link {
			transition: none;
		}
	}


	/* # Elements */

	.link__label {
		text-decoration: underline;
		text-underline-offset: 0.15em;
	}

	.link:focus-visible .link__label {
		text-decoration: none;
	}

	.link__start-icon,
	.link__end-icon {
		position: relative;
		display: inline-flex;
		align-items: center;
		flex-shrink: 0;
		width: 1em;
		height: 1em;
	}


	/* # Toegankelijkheid */

	@media (forced-colors: active) {
		.link:focus-visible {
			outline: 2px solid CanvasText;
		}
	}
`;
