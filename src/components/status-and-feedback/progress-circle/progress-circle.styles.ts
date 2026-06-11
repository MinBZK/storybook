import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/slotted-reset.js';

export const progressCircleStyles = css`


	/* # Host */

	:host {
		--_size: var(--primitives-space-28);
		/* SVG viewBox is 100×100 user units. To get a visual {N}px stroke at any
		   rendered size, the user-unit stroke-width must scale up by 100/size.
		   Per-size overrides below set the appropriate value. Stroke width
		   grows with circle size — must match getStrokeWidthPx() in the
		   template file. */
		--_stroke-width: calc(4px * 100 / 28);
		--_track-background-color: var(--components-progress-circle-track-background-color);
		--_track-border-color: var(--components-progress-circle-track-border-color);
		--_caption-gap: var(--components-progress-circle-caption-gap);
		--_text-color: var(--components-progress-circle-text-color);
		--_text-font: var(--components-progress-circle-text-font);
		--_supporting-text-color: var(--components-progress-circle-supporting-text-color);
		--_supporting-text-font: var(--components-progress-circle-supporting-text-font);

		${inheritedTextReset}
		box-sizing: border-box;
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		gap: var(--_caption-gap);
	}

	:host([hidden]) {
		display: none;
	}

	:host([size="16"]) { --_size: var(--primitives-space-16); --_stroke-width: calc(3px * 100 / 16); }
	:host([size="20"]) { --_size: var(--primitives-space-20); --_stroke-width: calc(4px * 100 / 20); }
	:host([size="24"]) { --_size: var(--primitives-space-24); --_stroke-width: calc(4px * 100 / 24); }
	:host([size="28"]) { --_size: var(--primitives-space-28); --_stroke-width: calc(4px * 100 / 28); }
	:host([size="32"]) { --_size: var(--primitives-space-32); --_stroke-width: calc(5px * 100 / 32); }
	:host([size="40"]) { --_size: var(--primitives-space-40); --_stroke-width: calc(5px * 100 / 40); }
	:host([size="44"]) { --_size: var(--primitives-space-44); --_stroke-width: calc(6px * 100 / 44); }
	:host([size="48"]) { --_size: var(--primitives-space-48); --_stroke-width: calc(6px * 100 / 48); }
	:host([size="56"]) { --_size: var(--primitives-space-56); --_stroke-width: calc(7px * 100 / 56); }
	:host([size="64"]) { --_size: var(--primitives-space-64); --_stroke-width: calc(7px * 100 / 64); }
	:host([size="80"]) { --_size: var(--primitives-space-80); --_stroke-width: calc(8px * 100 / 80); }
	:host([size="96"]) { --_size: var(--primitives-space-96); --_stroke-width: calc(8px * 100 / 96); }


	/* # SVG wrapper */

	.progress-circle__circle {
		display: block;
		position: relative;
		width: var(--_size);
		height: var(--_size);
	}

	.progress-circle__svg {
		display: block;
		width: 100%;
		height: 100%;
		/* Start segments at 12 o'clock instead of the default 3 o'clock. */
		transform: rotate(-90deg);
	}


	/* # Track ring (background)
	   vector-effect: non-scaling-stroke keeps the stroke at its specified
	   CSS pixel width regardless of the viewBox-to-rendered-size ratio,
	   so a 4px stroke is always 4 actual pixels at any circle size. */

	.progress-circle__track {
		stroke: var(--_track-background-color);
		stroke-width: var(--_stroke-width);
	}


	/* # Arc segments
	   Animate value changes smoothly via stroke-dasharray transition.
	   Crossfade with the indeterminate indicator uses opacity on the SVG group. */

	.progress-circle__segment-indicator {
		stroke-width: var(--_stroke-width);
		opacity: 1;
		transition: stroke-dasharray var(--primitives-transition-duration-slow) ease-out, stroke-dashoffset var(--primitives-transition-duration-slow) ease-out, opacity var(--primitives-transition-duration-slow) ease-out;
	}

	.progress-circle__segment-indicator[data-shrink] {
		opacity: 0;
	}

	/* Progress mode: rounded caps for friendly segment ends. The JS gap
	   calculation compensates for the half-stroke-width extension so the
	   visible gap between segments stays consistent.
	   Distribution mode: butt caps keep the segment boundaries crisp. */

	.progress-circle__segment-indicator {
		stroke-linecap: round;
	}

	:host([mode="distribution"]) .progress-circle__segment-indicator {
		stroke-linecap: butt;
	}


	/* ## Arc color per variant */

	.progress-circle__segment-indicator--neutral { stroke: var(--components-progress-circle-neutral-background-color); }
	.progress-circle__segment-indicator--accent { stroke: var(--components-progress-circle-accent-background-color); }
	.progress-circle__segment-indicator--success { stroke: var(--components-progress-circle-success-background-color); }
	.progress-circle__segment-indicator--warning { stroke: var(--components-progress-circle-warning-background-color); }
	.progress-circle__segment-indicator--critical { stroke: var(--components-progress-circle-critical-background-color); }
	.progress-circle__segment-indicator--lintblauw { stroke: var(--components-progress-circle-lintblauw-background-color); }
	.progress-circle__segment-indicator--donkerblauw { stroke: var(--components-progress-circle-donkerblauw-background-color); }
	.progress-circle__segment-indicator--hemelblauw { stroke: var(--components-progress-circle-hemelblauw-background-color); }
	.progress-circle__segment-indicator--lichtblauw { stroke: var(--components-progress-circle-lichtblauw-background-color); }
	.progress-circle__segment-indicator--paars { stroke: var(--components-progress-circle-paars-background-color); }
	.progress-circle__segment-indicator--violet { stroke: var(--components-progress-circle-violet-background-color); }
	.progress-circle__segment-indicator--robijnrood { stroke: var(--components-progress-circle-robijnrood-background-color); }
	.progress-circle__segment-indicator--roze { stroke: var(--components-progress-circle-roze-background-color); }
	.progress-circle__segment-indicator--rood { stroke: var(--components-progress-circle-rood-background-color); }
	.progress-circle__segment-indicator--oranje { stroke: var(--components-progress-circle-oranje-background-color); }
	.progress-circle__segment-indicator--donkergeel { stroke: var(--components-progress-circle-donkergeel-background-color); }
	.progress-circle__segment-indicator--geel { stroke: var(--components-progress-circle-geel-background-color); }
	.progress-circle__segment-indicator--donkerbruin { stroke: var(--components-progress-circle-donkerbruin-background-color); }
	.progress-circle__segment-indicator--bruin { stroke: var(--components-progress-circle-bruin-background-color); }
	.progress-circle__segment-indicator--donkergroen { stroke: var(--components-progress-circle-donkergroen-background-color); }
	.progress-circle__segment-indicator--groen { stroke: var(--components-progress-circle-groen-background-color); }
	.progress-circle__segment-indicator--mosgroen { stroke: var(--components-progress-circle-mosgroen-background-color); }
	.progress-circle__segment-indicator--mintgroen { stroke: var(--components-progress-circle-mintgroen-background-color); }


	/* # Spinner (indeterminate)
	   GitHub-style: a fixed-width arc (25 / 100 = quarter turn, 90°) that
	   simply rotates around the circle. Calmer than Material's elastic
	   grow + shrink, which at small sizes (default 28 px) reads as visually
	   busy. pathLength="100" on the indicator normalises the dash pattern
	   to percentages of the circumference so the same numbers stay correct
	   at every size. transform-origin centres the rotation. */

	.progress-circle__indeterminate-indicator {
		stroke-width: var(--_stroke-width);
		stroke-dasharray: 25 100;
		stroke-dashoffset: 0;
		stroke: var(--_indeterminate-background-color);
		opacity: 1;
		transform-origin: 50% 50%;
		transition: opacity var(--primitives-transition-duration-slow) ease-out;
		animation: progress-circle-indeterminate-indicator-rotate 1s linear infinite;
	}

	.progress-circle__indeterminate-indicator[data-fade="out"] {
		opacity: 0;
	}

	@keyframes progress-circle-indeterminate-indicator-rotate {
		100% { transform: rotate(360deg); }
	}


	/* # Indeterminate fill + border colour follow the color variant; default accent (blue) */

	:host {
		--_indeterminate-background-color: var(--components-progress-circle-accent-background-color);
		--_indeterminate-border-color: var(--components-progress-circle-accent-border-color);
	}

	:host([color="neutral"]) { --_indeterminate-background-color: var(--components-progress-circle-neutral-background-color); --_indeterminate-border-color: var(--components-progress-circle-neutral-border-color); }
	:host([color="accent"]) { --_indeterminate-background-color: var(--components-progress-circle-accent-background-color); --_indeterminate-border-color: var(--components-progress-circle-accent-border-color); }
	:host([color="success"]) { --_indeterminate-background-color: var(--components-progress-circle-success-background-color); --_indeterminate-border-color: var(--components-progress-circle-success-border-color); }
	:host([color="warning"]) { --_indeterminate-background-color: var(--components-progress-circle-warning-background-color); --_indeterminate-border-color: var(--components-progress-circle-warning-border-color); }
	:host([color="critical"]) { --_indeterminate-background-color: var(--components-progress-circle-critical-background-color); --_indeterminate-border-color: var(--components-progress-circle-critical-border-color); }
	:host([color="lintblauw"]) { --_indeterminate-background-color: var(--components-progress-circle-lintblauw-background-color); --_indeterminate-border-color: var(--components-progress-circle-lintblauw-border-color); }
	:host([color="donkerblauw"]) { --_indeterminate-background-color: var(--components-progress-circle-donkerblauw-background-color); --_indeterminate-border-color: var(--components-progress-circle-donkerblauw-border-color); }
	:host([color="hemelblauw"]) { --_indeterminate-background-color: var(--components-progress-circle-hemelblauw-background-color); --_indeterminate-border-color: var(--components-progress-circle-hemelblauw-border-color); }
	:host([color="lichtblauw"]) { --_indeterminate-background-color: var(--components-progress-circle-lichtblauw-background-color); --_indeterminate-border-color: var(--components-progress-circle-lichtblauw-border-color); }
	:host([color="paars"]) { --_indeterminate-background-color: var(--components-progress-circle-paars-background-color); --_indeterminate-border-color: var(--components-progress-circle-paars-border-color); }
	:host([color="violet"]) { --_indeterminate-background-color: var(--components-progress-circle-violet-background-color); --_indeterminate-border-color: var(--components-progress-circle-violet-border-color); }
	:host([color="robijnrood"]) { --_indeterminate-background-color: var(--components-progress-circle-robijnrood-background-color); --_indeterminate-border-color: var(--components-progress-circle-robijnrood-border-color); }
	:host([color="roze"]) { --_indeterminate-background-color: var(--components-progress-circle-roze-background-color); --_indeterminate-border-color: var(--components-progress-circle-roze-border-color); }
	:host([color="rood"]) { --_indeterminate-background-color: var(--components-progress-circle-rood-background-color); --_indeterminate-border-color: var(--components-progress-circle-rood-border-color); }
	:host([color="oranje"]) { --_indeterminate-background-color: var(--components-progress-circle-oranje-background-color); --_indeterminate-border-color: var(--components-progress-circle-oranje-border-color); }
	:host([color="donkergeel"]) { --_indeterminate-background-color: var(--components-progress-circle-donkergeel-background-color); --_indeterminate-border-color: var(--components-progress-circle-donkergeel-border-color); }
	:host([color="geel"]) { --_indeterminate-background-color: var(--components-progress-circle-geel-background-color); --_indeterminate-border-color: var(--components-progress-circle-geel-border-color); }
	:host([color="donkerbruin"]) { --_indeterminate-background-color: var(--components-progress-circle-donkerbruin-background-color); --_indeterminate-border-color: var(--components-progress-circle-donkerbruin-border-color); }
	:host([color="bruin"]) { --_indeterminate-background-color: var(--components-progress-circle-bruin-background-color); --_indeterminate-border-color: var(--components-progress-circle-bruin-border-color); }
	:host([color="donkergroen"]) { --_indeterminate-background-color: var(--components-progress-circle-donkergroen-background-color); --_indeterminate-border-color: var(--components-progress-circle-donkergroen-border-color); }
	:host([color="groen"]) { --_indeterminate-background-color: var(--components-progress-circle-groen-background-color); --_indeterminate-border-color: var(--components-progress-circle-groen-border-color); }
	:host([color="mosgroen"]) { --_indeterminate-background-color: var(--components-progress-circle-mosgroen-background-color); --_indeterminate-border-color: var(--components-progress-circle-mosgroen-border-color); }
	:host([color="mintgroen"]) { --_indeterminate-background-color: var(--components-progress-circle-mintgroen-background-color); --_indeterminate-border-color: var(--components-progress-circle-mintgroen-border-color); }


	/* # Caption (label + value) */

	.progress-circle__caption {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.progress-circle__text {
		color: var(--_text-color);
		font: var(--_text-font);
		text-align: center;
	}

	.progress-circle__supporting-text {
		color: var(--_supporting-text-color);
		font: var(--_supporting-text-font);
		text-align: center;
	}


	/* # Slot
	   Segment children are data-only; hide them visually but keep them in
	   the DOM so consumers can mutate values. */

	slot {
		display: none;
	}


	/* # Accessibility */

	@media (prefers-reduced-motion: reduce) {
		.progress-circle__indeterminate-indicator {
			/* Static arc with the same 25 / 100 dash pattern as the full-motion
			   spinner — only the rotation is removed and an opacity pulse
			   takes its place. Keeping the dasharray identical means the
			   placeholder shape doesn't visibly jump when a user toggles
			   reduce-motion at runtime. */
			animation: progress-circle-indeterminate-indicator-pulse 2s ease-in-out infinite;
		}

		@keyframes progress-circle-indeterminate-indicator-pulse {
			0%, 100% { opacity: 0.3; }
			50% { opacity: 0.7; }
		}

		.progress-circle__segment-indicator {
			transition: none;
			animation: none;
		}
	}

	@media (forced-colors: active) {
		.progress-circle__track,
		.progress-circle__segment-indicator,
		.progress-circle__indeterminate-indicator {
			stroke: CanvasText;
		}
	}
`;


export const progressCircleSegmentIndicatorStyles = css`
	:host {
		display: none;
	}
`;
