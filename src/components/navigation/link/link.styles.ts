import { css } from 'lit';

export const linkStyles = css`


	/* # Host
	 *
	 * Inherit mode (no [size] attribute, or [size="inherit"]): display is
	 * inline so the link wraps naturally inside running text and inherits
	 * font-size / line-height / font-family from its surroundings. Icons are
	 * supported via the inline whitespace between icon span and label span,
	 * which provides natural single-space separation.
	 *
	 * Sized mode (xs/sm/md/lg): display becomes inline-flex so start/end
	 * icons can be aligned to the text baseline with explicit gap spacing.
	 */

	:host {
		-webkit-tap-highlight-color: transparent;
	}

	:host(:not([size])),
	:host([size="inherit"]) {
		display: inline;
	}

	:host([size="xs"]),
	:host([size="sm"]),
	:host([size="md"]),
	:host([size="lg"]) {
		display: inline-flex;
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
		border-radius: var(--primitives-corner-radius-xs);
		background: none;
		color: var(--semantics-links-color);
		text-decoration: none;
		appearance: none;
		transition: color var(--primitives-transition-duration-fast) var(--primitives-transition-easing-default);
	}

	:host(:not([size])) .link,
	:host([size="inherit"]) .link {
		display: inline;
	}

	:host([size="xs"]) .link {
		display: inline-flex;
		align-items: center;
		gap: var(--primitives-space-4);
		font: var(--primitives-font-body-xs-regular-flat);
	}

	:host([size="sm"]) .link {
		display: inline-flex;
		align-items: center;
		gap: var(--primitives-space-4);
		font: var(--primitives-font-body-sm-regular-flat);
	}

	:host([size="md"]) .link {
		display: inline-flex;
		align-items: center;
		gap: var(--primitives-space-6);
		font: var(--primitives-font-body-md-regular-flat);
	}

	:host([size="lg"]) .link {
		display: inline-flex;
		align-items: center;
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
		width: 1em;
		height: 1em;
		align-items: center;
		flex-shrink: 0;
	}

	:host(:not([size])) .link__start-icon,
	:host([size="inherit"]) .link__start-icon,
	:host(:not([size])) .link__end-icon,
	:host([size="inherit"]) .link__end-icon {
		top: 0.2em;
	}


	/* # Toegankelijkheid */

	@media (forced-colors: active) {
		.link:focus-visible {
			outline: 2px solid CanvasText;
		}
	}
`;
