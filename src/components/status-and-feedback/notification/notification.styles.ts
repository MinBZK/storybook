import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.js';

const smMax = unsafeCSS(breakpoints.smMax);


/* # Host */

export const notificationStyles = css`
	:host {
		--_width: var(--primitives-area-400);
		--_depth: 0;
		--_hint: 0;
		--_stack-base-offset: var(--primitives-space-6);
		--_stack-hint-offset: var(--primitives-space-6);
		--_stack-offset: calc(var(--_stack-base-offset) + var(--_stack-hint-offset) * var(--_hint));
		--_stack-scale-step: 0.03;
		--_padding: var(--primitives-space-12);
		--_gap: var(--primitives-space-6);
		--_icon-color: var(--components-notification-icon-neutral-color);
		--_icon-size: var(--primitives-space-32);
		--_actions-margin-top: var(--primitives-space-4);
		--_actions-gap: var(--primitives-space-6);
		--_dismiss-inset: calc(var(--_padding) - (var(--semantics-controls-sm-min-size) - var(--_icon-size)) / 2);
		--_dismiss-space: calc(var(--_dismiss-inset) + var(--semantics-controls-sm-min-size));

		box-sizing: border-box;
		display: block;
		border-radius: var(--components-notification-corner-radius);
		box-shadow: var(--components-notification-box-shadow);
		background-color: var(--components-notification-background-color);
		width: var(--_width);
		max-width: 100%;
		overflow: hidden;
		/* Open, the region is a column that can run past the bottom of the screen.
		   Without this the messages would squeeze themselves to fit instead of
		   letting the list scroll. */
		flex-shrink: 0;
		translate: 0 calc(var(--_stack-offset) * var(--_depth));
		scale: calc(1 - var(--_stack-scale-step) * var(--_depth)) 1;
		transform-origin: top center;
		transition: translate var(--primitives-transition-duration-medium) var(--primitives-transition-easing-default), scale var(--primitives-transition-duration-medium) var(--primitives-transition-easing-default);
		animation: notification-arrive var(--primitives-transition-duration-medium) var(--primitives-transition-easing-default) both;
	}

	/* The surface stays neutral whatever happened: four colored panes floating
	   over the interface shout, and the icon already says which kind this is. */
	:host([variant="accent"]) {
		--_icon-color: var(--components-notification-icon-accent-color);
	}

	:host([variant="success"]) {
		--_icon-color: var(--components-notification-icon-success-color);
	}

	:host([variant="warning"]) {
		--_icon-color: var(--components-notification-icon-warning-color);
	}

	:host([variant="critical"]) {
		--_icon-color: var(--components-notification-icon-critical-color);
	}

	:host([hidden]) {
		display: none;
	}

	@media (prefers-reduced-motion: reduce) {
		:host {
			transition: none;
			animation: none;
		}
	}


	/* # Element */

	/* Behind the front of the deck a notification is a bare surface. Its edge is
	   cut to the height of the one in front, so a taller one behind would show
	   half a row of buttons along the bottom, and half a button reads as a
	   mistake rather than as a card further back. Coming forward, the message
	   fades in on the card that was already standing there. */
	.notification {
		display: flex;
		position: relative;
		opacity: calc(1 - var(--_depth));
		transition: opacity var(--primitives-transition-duration-medium) var(--primitives-transition-easing-default);
		padding: var(--_padding);
		padding-inline-end: var(--_dismiss-space);
		gap: var(--_gap);
		align-items: center;
	}

	/* No border of its own: it floats on a shadow the way the other overlays do,
	   and a line around it would only fight that. Forced colors take the shadow
	   away, so there the edge has to be drawn after all. */
	@media (forced-colors: active) {
		.notification {
			border: var(--primitives-border-width-regular) solid CanvasText;
		}
	}


	/* ## Icon */

	/* Pinned to the top while the text beside it is centred: however far the
	   message runs, the icon stays where the message starts. */
	.notification__icon {
		display: flex;
		align-self: flex-start;
		flex-shrink: 0;
		color: var(--_icon-color);
		width: var(--_icon-size);
		height: var(--_icon-size);
	}


	/* ## Main */

	.notification__main {
		display: flex;
		min-width: 0;
		flex-direction: column;
		flex-grow: 1;
	}

	.notification__text {
		margin: 0;
		overflow-wrap: break-word;
		color: var(--semantics-content-color);
		font: var(--components-notification-text-font);
		text-wrap: pretty;
	}

	.notification__supporting-text {
		margin: 0;
		overflow-wrap: break-word;
		color: var(--components-notification-supporting-text-color);
		font: var(--components-notification-supporting-text-font);
		text-wrap: pretty;
	}

	/* Under the text, not beside it: a button in the row would fight the dismiss
	   button for the same corner, and both would lose room for a real label. */
	.notification__actions {
		display: flex;
		margin-top: var(--_actions-margin-top);
		flex-wrap: wrap;
		gap: var(--_actions-gap);
	}

	.notification__actions[hidden] {
		display: none;
	}


	/* ## Dismiss */

	/* Out of the flow and over the padding, so the button cannot make the
	   notification taller than the message in it. Always there, not on hover: a
	   control that appears when you point at it cannot be found with a finger or
	   with a keyboard. */
	.notification__dismiss {
		display: flex;
		position: absolute;
		top: var(--_dismiss-inset);
		right: var(--_dismiss-inset);
	}


	/* # Animation */

	/* In from the edge it came from, past the inset so it starts off the screen
	   rather than at the margin. */
	@keyframes notification-arrive {
		from {
			opacity: 0;
			transform: translateX(calc(100% + var(--semantics-overlays-inset)));
		}
		to {
			opacity: 1;
			transform: none;
		}
	}


	/* # Responsive */

	@media (max-width: ${smMax}) {
		:host {
			width: 100%;
		}
	}
`;
