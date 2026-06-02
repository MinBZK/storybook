import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/slotted-reset.js';

export const activityIndicatorStyles = css`


	/* # Host */

	:host {
		--_circle-size: var(--primitives-space-32);
		--_track-opacity: 0.25;
		--_stroke-width: 2;
		--_rotation-duration: 0.8s;
		--_fade-duration: var(--primitives-transition-duration-slow);
		--_max-width: var(--primitives-area-240);
		--_gap: var(--primitives-space-4);
		--_text-font: var(--primitives-font-body-sm-regular-flat);

		${inheritedTextReset}
		box-sizing: border-box;
		display: flex;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: auto;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
	}

	:host([hidden]) {
		display: none;
	}


	/* ## Sizes (icon scale) */

	:host([size="16"]) { --_circle-size: var(--primitives-space-16); }
	:host([size="20"]) { --_circle-size: var(--primitives-space-20); }
	:host([size="24"]) { --_circle-size: var(--primitives-space-24); }
	:host([size="28"]) { --_circle-size: var(--primitives-space-28); }
	:host([size="32"]) { --_circle-size: var(--primitives-space-32); }
	:host([size="40"]) { --_circle-size: var(--primitives-space-40); }
	:host([size="44"]) { --_circle-size: var(--primitives-space-44); }
	:host([size="48"]) { --_circle-size: var(--primitives-space-48); }
	:host([size="56"]) { --_circle-size: var(--primitives-space-56); }
	:host([size="64"]) { --_circle-size: var(--primitives-space-64); }
	:host([size="80"]) { --_circle-size: var(--primitives-space-80); }
	:host([size="96"]) { --_circle-size: var(--primitives-space-96); }


	/* # Block
	   Fades the indicator in once it becomes visible (both timing modes), and
	   stacks the default circle + label as a centred column. width:100% +
	   max-width gives a slotted progress-bar a width to fill; the fixed-size
	   circle and the label stay centred via align-items. */

	.activity-indicator {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: var(--_max-width);
		align-items: center;
		gap: var(--_gap);
		animation: activity-indicator-fade-in var(--_fade-duration) ease-out;
	}

	@keyframes activity-indicator-fade-in {
		from { opacity: 0; }
	}

	/* display:contents so the default circle + label (or a slotted override)
	   are direct flex items of the block. */
	slot {
		display: contents;
	}


	/* # Elements */

	/* The whole SVG (stroke included) scales with the size, like an icon. */
	.activity-indicator__circle {
		display: block;
		width: var(--_circle-size);
		height: var(--_circle-size);
	}

	.activity-indicator__track {
		opacity: var(--_track-opacity);
		stroke: currentColor;
		stroke-width: var(--_stroke-width);
	}

	/* Rotate only the arc inside the SVG (around the view-box centre via
	   transform-origin) rather than the whole <svg> element — rotating the
	   element visibly wobbles when it sits at a sub-pixel position (next to a
	   label, or overlaid on a button). Mirrors nldd-progress-circle. */
	.activity-indicator__indicator {
		stroke: currentColor;
		stroke-width: var(--_stroke-width);
		stroke-linecap: round;
		stroke-dasharray: 25 100;
		transform-origin: 50% 50%;
		animation: activity-indicator-rotate var(--_rotation-duration) linear infinite;
	}

	@keyframes activity-indicator-rotate {
		to { transform: rotate(360deg); }
	}

	.activity-indicator__text {
		color: currentColor;
		font: var(--_text-font);
		text-align: center;
	}

	/* show-text off (default): the label still renders as the announced
	   content of the role="status" host, but is visually hidden.
	   Standard visually-hidden recipe. */
	.activity-indicator__text--visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}


	/* # Accessibility */

	@media (prefers-reduced-motion: reduce) {
		.activity-indicator {
			animation: none;
		}

		.activity-indicator__indicator {
			/* Drop the rotation (vestibular safety); keep the 25 / 100 arc and
			   pulse its opacity instead, mirroring nldd-progress-circle. */
			animation: activity-indicator-pulse 2s ease-in-out infinite;
		}

		@keyframes activity-indicator-pulse {
			0%, 100% { opacity: 0.3; }
			50% { opacity: 0.7; }
		}
	}
`;
