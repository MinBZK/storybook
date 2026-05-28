import { css } from 'lit';

export const progressCircleStyles = css`


	/* # Host */

	:host {
		--_size: var(--primitives-space-32);
		/* SVG viewBox is 100×100 user units. To get a visual {N}px stroke at any
		   rendered size, the user-unit stroke-width must scale up by 100/size.
		   Per-size overrides below set the appropriate value. Stroke width
		   grows with circle size — must match getStrokeWidthPx() in the
		   template file. */
		--_stroke-width: calc(4px * 100 / 32);
		--_track-color: var(--components-progress-circle-track-color);
		--_track-border-color: var(--components-progress-circle-track-border-color);
		--_label-gap: var(--components-progress-circle-label-gap);
		--_label-color: var(--components-progress-circle-label-color);
		--_label-font: var(--components-progress-circle-label-font);

		box-sizing: border-box;
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		gap: var(--_label-gap);
	}

	:host([hidden]) {
		display: none;
	}

	:host([size="16"]) { --_size: var(--primitives-space-16); --_stroke-width: calc(3px * 100 / 16); }
	:host([size="20"]) { --_size: var(--primitives-space-20); --_stroke-width: calc(3px * 100 / 20); }
	:host([size="24"]) { --_size: var(--primitives-space-24); --_stroke-width: calc(4px * 100 / 24); }
	:host([size="28"]) { --_size: var(--primitives-space-28); --_stroke-width: calc(4px * 100 / 28); }
	:host([size="32"]) { --_size: var(--primitives-space-32); --_stroke-width: calc(4px * 100 / 32); }
	:host([size="40"]) { --_size: var(--primitives-space-40); --_stroke-width: calc(4px * 100 / 40); }
	:host([size="44"]) { --_size: var(--primitives-space-44); --_stroke-width: calc(5px * 100 / 44); }
	:host([size="48"]) { --_size: var(--primitives-space-48); --_stroke-width: calc(5px * 100 / 48); }
	:host([size="56"]) { --_size: var(--primitives-space-56); --_stroke-width: calc(6px * 100 / 56); }
	:host([size="64"]) { --_size: var(--primitives-space-64); --_stroke-width: calc(6px * 100 / 64); }
	:host([size="80"]) { --_size: var(--primitives-space-80); --_stroke-width: calc(6px * 100 / 80); }
	:host([size="96"]) { --_size: var(--primitives-space-96); --_stroke-width: calc(6px * 100 / 96); }


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
		stroke: var(--_track-color);
		stroke-width: var(--_stroke-width);
	}


	/* # Arc segments
	   Animate value changes smoothly via stroke-dasharray transition.
	   Crossfade with the indeterminate indicator uses opacity on the SVG group. */

	.progress-circle__segment {
		stroke-width: var(--_stroke-width);
		opacity: 1;
		transition: stroke-dasharray var(--primitives-transition-duration-slow) ease-out, stroke-dashoffset var(--primitives-transition-duration-slow) ease-out, opacity var(--primitives-transition-duration-slow) ease-out;
	}

	.progress-circle__segment[data-shrink] {
		opacity: 0;
	}

	/* Progress mode: rounded caps for friendly segment ends. The JS gap
	   calculation compensates for the half-stroke-width extension so the
	   visible gap between segments stays consistent.
	   Distribution mode: butt caps keep the segment boundaries crisp. */

	.progress-circle__segment {
		stroke-linecap: round;
	}

	:host([mode="distribution"]) .progress-circle__segment {
		stroke-linecap: butt;
	}


	/* ## Arc color per variant */

	.progress-circle__segment--neutral { stroke: var(--components-progress-circle-neutral-fill-color); }
	.progress-circle__segment--accent { stroke: var(--components-progress-circle-accent-fill-color); }
	.progress-circle__segment--success { stroke: var(--components-progress-circle-success-fill-color); }
	.progress-circle__segment--warning { stroke: var(--components-progress-circle-warning-fill-color); }
	.progress-circle__segment--critical { stroke: var(--components-progress-circle-critical-fill-color); }
	.progress-circle__segment--coolgray { stroke: var(--components-progress-circle-coolgray-fill-color); }
	.progress-circle__segment--lintblauw { stroke: var(--components-progress-circle-lintblauw-fill-color); }
	.progress-circle__segment--donkerblauw { stroke: var(--components-progress-circle-donkerblauw-fill-color); }
	.progress-circle__segment--hemelblauw { stroke: var(--components-progress-circle-hemelblauw-fill-color); }
	.progress-circle__segment--lichtblauw { stroke: var(--components-progress-circle-lichtblauw-fill-color); }
	.progress-circle__segment--paars { stroke: var(--components-progress-circle-paars-fill-color); }
	.progress-circle__segment--violet { stroke: var(--components-progress-circle-violet-fill-color); }
	.progress-circle__segment--robijnrood { stroke: var(--components-progress-circle-robijnrood-fill-color); }
	.progress-circle__segment--roze { stroke: var(--components-progress-circle-roze-fill-color); }
	.progress-circle__segment--rood { stroke: var(--components-progress-circle-rood-fill-color); }
	.progress-circle__segment--oranje { stroke: var(--components-progress-circle-oranje-fill-color); }
	.progress-circle__segment--donkergeel { stroke: var(--components-progress-circle-donkergeel-fill-color); }
	.progress-circle__segment--geel { stroke: var(--components-progress-circle-geel-fill-color); }
	.progress-circle__segment--donkerbruin { stroke: var(--components-progress-circle-donkerbruin-fill-color); }
	.progress-circle__segment--bruin { stroke: var(--components-progress-circle-bruin-fill-color); }
	.progress-circle__segment--donkergroen { stroke: var(--components-progress-circle-donkergroen-fill-color); }
	.progress-circle__segment--groen { stroke: var(--components-progress-circle-groen-fill-color); }
	.progress-circle__segment--mosgroen { stroke: var(--components-progress-circle-mosgroen-fill-color); }
	.progress-circle__segment--mintgroen { stroke: var(--components-progress-circle-mintgroen-fill-color); }


	/* # Spinner (indeterminate)
	   Material-style: elastic indicator that grows + shrinks while the whole
	   element rotates. transform-origin centers the rotation on the circle. */

	.progress-circle__indeterminate-indicator {
		stroke-width: var(--_stroke-width);
		stroke: var(--_indeterminate-fill-color);
		opacity: 1;
		transform-origin: 50% 50%;
		transition: opacity var(--primitives-transition-duration-slow) ease-out;
		animation:
			progress-circle-indeterminate-indicator-rotate 2s linear infinite,
			progress-circle-indeterminate-indicator-dash 1.5s ease-in-out infinite;
	}

	.progress-circle__indeterminate-indicator[data-fade="out"] {
		opacity: 0;
	}

	@keyframes progress-circle-indeterminate-indicator-rotate {
		100% { transform: rotate(360deg); }
	}

	/* pathLength="100" on the indicator normalises the circle's path to
	   100 units regardless of the actual radius, so these keyframe values
	   are percentages of the circumference and stay correct at every size.
	   The 100% state matches the 0% state (dash 1, offset advanced by one
	   full circumference) so the loop is seamless — the offset wraps from
	   -100 to 0 without a visible jump because the dash pattern repeats
	   every 100 units. */

	@keyframes progress-circle-indeterminate-indicator-dash {
		0%   { stroke-dasharray: 1 100; stroke-dashoffset: 0; }
		50%  { stroke-dasharray: 75 100; stroke-dashoffset: -30; }
		100% { stroke-dasharray: 1 100; stroke-dashoffset: -100; }
	}


	/* # Indeterminate fill colour follows the color variant; default accent (blue) */

	:host {
		--_indeterminate-fill-color: var(--components-progress-circle-accent-fill-color);
	}

	:host([color="neutral"]) { --_indeterminate-fill-color: var(--components-progress-circle-neutral-fill-color); }
	:host([color="accent"]) { --_indeterminate-fill-color: var(--components-progress-circle-accent-fill-color); }
	:host([color="success"]) { --_indeterminate-fill-color: var(--components-progress-circle-success-fill-color); }
	:host([color="warning"]) { --_indeterminate-fill-color: var(--components-progress-circle-warning-fill-color); }
	:host([color="critical"]) { --_indeterminate-fill-color: var(--components-progress-circle-critical-fill-color); }
	:host([color="coolgray"]) { --_indeterminate-fill-color: var(--components-progress-circle-coolgray-fill-color); }
	:host([color="lintblauw"]) { --_indeterminate-fill-color: var(--components-progress-circle-lintblauw-fill-color); }
	:host([color="donkerblauw"]) { --_indeterminate-fill-color: var(--components-progress-circle-donkerblauw-fill-color); }
	:host([color="hemelblauw"]) { --_indeterminate-fill-color: var(--components-progress-circle-hemelblauw-fill-color); }
	:host([color="lichtblauw"]) { --_indeterminate-fill-color: var(--components-progress-circle-lichtblauw-fill-color); }
	:host([color="paars"]) { --_indeterminate-fill-color: var(--components-progress-circle-paars-fill-color); }
	:host([color="violet"]) { --_indeterminate-fill-color: var(--components-progress-circle-violet-fill-color); }
	:host([color="robijnrood"]) { --_indeterminate-fill-color: var(--components-progress-circle-robijnrood-fill-color); }
	:host([color="roze"]) { --_indeterminate-fill-color: var(--components-progress-circle-roze-fill-color); }
	:host([color="rood"]) { --_indeterminate-fill-color: var(--components-progress-circle-rood-fill-color); }
	:host([color="oranje"]) { --_indeterminate-fill-color: var(--components-progress-circle-oranje-fill-color); }
	:host([color="donkergeel"]) { --_indeterminate-fill-color: var(--components-progress-circle-donkergeel-fill-color); }
	:host([color="geel"]) { --_indeterminate-fill-color: var(--components-progress-circle-geel-fill-color); }
	:host([color="donkerbruin"]) { --_indeterminate-fill-color: var(--components-progress-circle-donkerbruin-fill-color); }
	:host([color="bruin"]) { --_indeterminate-fill-color: var(--components-progress-circle-bruin-fill-color); }
	:host([color="donkergroen"]) { --_indeterminate-fill-color: var(--components-progress-circle-donkergroen-fill-color); }
	:host([color="groen"]) { --_indeterminate-fill-color: var(--components-progress-circle-groen-fill-color); }
	:host([color="mosgroen"]) { --_indeterminate-fill-color: var(--components-progress-circle-mosgroen-fill-color); }
	:host([color="mintgroen"]) { --_indeterminate-fill-color: var(--components-progress-circle-mintgroen-fill-color); }


	/* # Label */

	.progress-circle__text {
		color: var(--_label-color);
		font: var(--_label-font);
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
			animation: progress-circle-indeterminate-indicator-pulse 2s ease-in-out infinite;
			stroke-dasharray: 23 100;
			stroke-dashoffset: 0;
		}

		@keyframes progress-circle-indeterminate-indicator-pulse {
			0%, 100% { opacity: 0.3; }
			50% { opacity: 0.7; }
		}

		.progress-circle__segment {
			transition: none;
			animation: none;
		}
	}

	@media (forced-colors: active) {
		.progress-circle__track,
		.progress-circle__segment,
		.progress-circle__indeterminate-indicator {
			stroke: CanvasText;
		}
	}
`;


export const progressCircleSegmentStyles = css`
	:host {
		display: none;
	}
`;
