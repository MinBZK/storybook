import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/slotted-reset.js';

export const progressBarStyles = css`


	/* # Host */

	:host {
		--_height: var(--components-progress-bar-md-height);
		--_track-color: var(--components-progress-bar-track-color);
		--_track-border-color: var(--components-progress-bar-track-border-color);
		--_track-border-width: var(--components-progress-bar-track-border-width);
		--_corner-radius: var(--components-progress-bar-corner-radius);
		--_segment-gap: var(--components-progress-bar-progress-segment-gap);
		--_header-gap: var(--components-progress-bar-header-gap);
		--_header-text-color: var(--components-progress-bar-header-text-color);
		--_header-value-color: var(--components-progress-bar-header-value-color);
		--_header-text-font: var(--components-progress-bar-header-text-font);
		--_header-value-font: var(--components-progress-bar-header-value-font);
		--_indeterminate-fill-color: var(--components-progress-bar-accent-fill-color);
		--_indeterminate-bar-width: 20%;
		--_indeterminate-duration: 800ms;

		${inheritedTextReset}
		box-sizing: border-box;
		display: flex;
		width: 100%;
		flex-direction: column;
		gap: var(--_header-gap);
	}

	:host([hidden]) {
		display: none;
	}

	:host([size="sm"]) { --_height: var(--components-progress-bar-sm-height); }
	:host([size="md"]) { --_height: var(--components-progress-bar-md-height); }
	:host([size="lg"]) { --_height: var(--components-progress-bar-lg-height); }

	:host([mode="distribution"]) {
		--_segment-gap: var(--components-progress-bar-distribution-segment-gap);
		--_corner-radius: var(--components-progress-bar-distribution-corner-radius);
	}


	/* ## Indeterminate fill colour follows the variant; default is accent (blue) */

	:host([color="neutral"]) { --_indeterminate-fill-color: var(--components-progress-bar-neutral-fill-color); }
	:host([color="accent"]) { --_indeterminate-fill-color: var(--components-progress-bar-accent-fill-color); }
	:host([color="success"]) { --_indeterminate-fill-color: var(--components-progress-bar-success-fill-color); }
	:host([color="warning"]) { --_indeterminate-fill-color: var(--components-progress-bar-warning-fill-color); }
	:host([color="critical"]) { --_indeterminate-fill-color: var(--components-progress-bar-critical-fill-color); }

	:host([color="coolgray"]) { --_indeterminate-fill-color: var(--components-progress-bar-coolgray-fill-color); }
	:host([color="lintblauw"]) { --_indeterminate-fill-color: var(--components-progress-bar-lintblauw-fill-color); }
	:host([color="donkerblauw"]) { --_indeterminate-fill-color: var(--components-progress-bar-donkerblauw-fill-color); }
	:host([color="hemelblauw"]) { --_indeterminate-fill-color: var(--components-progress-bar-hemelblauw-fill-color); }
	:host([color="lichtblauw"]) { --_indeterminate-fill-color: var(--components-progress-bar-lichtblauw-fill-color); }
	:host([color="paars"]) { --_indeterminate-fill-color: var(--components-progress-bar-paars-fill-color); }
	:host([color="violet"]) { --_indeterminate-fill-color: var(--components-progress-bar-violet-fill-color); }
	:host([color="robijnrood"]) { --_indeterminate-fill-color: var(--components-progress-bar-robijnrood-fill-color); }
	:host([color="roze"]) { --_indeterminate-fill-color: var(--components-progress-bar-roze-fill-color); }
	:host([color="rood"]) { --_indeterminate-fill-color: var(--components-progress-bar-rood-fill-color); }
	:host([color="oranje"]) { --_indeterminate-fill-color: var(--components-progress-bar-oranje-fill-color); }
	:host([color="donkergeel"]) { --_indeterminate-fill-color: var(--components-progress-bar-donkergeel-fill-color); }
	:host([color="geel"]) { --_indeterminate-fill-color: var(--components-progress-bar-geel-fill-color); }
	:host([color="donkerbruin"]) { --_indeterminate-fill-color: var(--components-progress-bar-donkerbruin-fill-color); }
	:host([color="bruin"]) { --_indeterminate-fill-color: var(--components-progress-bar-bruin-fill-color); }
	:host([color="donkergroen"]) { --_indeterminate-fill-color: var(--components-progress-bar-donkergroen-fill-color); }
	:host([color="groen"]) { --_indeterminate-fill-color: var(--components-progress-bar-groen-fill-color); }
	:host([color="mosgroen"]) { --_indeterminate-fill-color: var(--components-progress-bar-mosgroen-fill-color); }
	:host([color="mintgroen"]) { --_indeterminate-fill-color: var(--components-progress-bar-mintgroen-fill-color); }


	/* # Header */

	.progress-bar__header {
		display: flex;
		gap: var(--_header-gap);
		justify-content: space-between;
		align-items: baseline;
		color: var(--_header-text-color);
	}

	.progress-bar__text {
		font: var(--_header-text-font);
	}

	.progress-bar__value {
		color: var(--_header-value-color);
		font: var(--_header-value-font);
		font-variant-numeric: tabular-nums;
	}


	/* # Track */

	.progress-bar__track {
		box-sizing: border-box;
		display: flex;
		position: relative;
		border-radius: var(--_corner-radius);
		box-shadow: inset 0 0 0 var(--_track-border-width) var(--_track-border-color);
		background-color: var(--_track-color);
		width: 100%;
		height: var(--_height);
		overflow: hidden;
		gap: var(--_segment-gap);
		container-type: inline-size;
	}

	slot {
		display: contents;
	}


	/* # Indeterminate
	   Knight Rider style: track filled with a translucent variant tint,
	   a solid bar bounces left-right. ease-in-out + alternate
	   gives the typical "scanner" acceleration at the ends. */

	/* Indicator has no own bg — the track (and its inset border)
	   simply show through. Only the K.I.T.T. bar is visible.
	   On fade-out the bar fades away and track + border remain. */

	.progress-bar__indeterminate-indicator {
		position: absolute;
		inset: 0;
		opacity: 1;
		transition: opacity var(--primitives-transition-duration-slow) ease-out;
	}

	.progress-bar__indeterminate-indicator.is-fading-out {
		opacity: 0;
	}

	.progress-bar__indeterminate-indicator.is-fading-in {
		animation: progress-bar-indicator-fade-in var(--primitives-transition-duration-slow) ease-out;
	}

	@keyframes progress-bar-indicator-fade-in {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	/* K.I.T.T. bar. translateX uses calc(100cqw - 100%): cqw is the
	   container (track) width, 100% is the bar's own width. */

	.progress-bar__indeterminate-indicator::before {
		content: '';
		position: absolute;
		inset-block: 0;
		left: 0;
		border-radius: var(--_corner-radius);
		background: var(--_indeterminate-fill-color);
		width: var(--_indeterminate-bar-width);
		transform: translateX(0);
		/* Duration scales with track width via the container queries below.
		   Wider tracks need longer sweeps so the perceived velocity feels
		   constant — a fast 800 ms cycle reads as frantic on a 1000 px bar
		   and as too slow on a 200 px bar at the same wall-clock time. */
		animation: progress-bar-indeterminate var(--_indeterminate-duration) ease-in-out infinite alternate;
	}

	@container (min-width: 401px) and (max-width: 720px) {
		.progress-bar__indeterminate-indicator::before {
			--_indeterminate-duration: 1000ms;
		}
	}

	@container (min-width: 721px) {
		.progress-bar__indeterminate-indicator::before {
			--_indeterminate-duration: 1200ms;
		}
	}

	@keyframes progress-bar-indeterminate {
		0% { transform: translateX(0); }
		100% { transform: translateX(calc(100cqw - 100%)); }
	}


	/* # Accessibility */

	@media (prefers-reduced-motion: reduce) {
		.progress-bar__indeterminate-indicator::before {
			display: none;
		}

		.progress-bar__indeterminate-indicator {
			animation: progress-bar-indeterminate-pulse 2s ease-in-out infinite;
		}

		@keyframes progress-bar-indeterminate-pulse {
			0%, 100% { background-color: color-mix(in srgb, var(--_indeterminate-fill-color) 20%, transparent); }
			50% { background-color: color-mix(in srgb, var(--_indeterminate-fill-color) 50%, transparent); }
		}
	}

	@media (forced-colors: active) {
		.progress-bar__track {
			border: 1px solid CanvasText;
		}
	}
`;


export const progressBarSegmentStyles = css`


	/* # Host */

	:host {
		--_width: var(--context-progress-bar-segment-width, 0%);
		--_min-width: var(--components-progress-bar-segment-min-width);
		--_fill-color: var(--components-progress-bar-accent-fill-color);
		--_border-color: var(--components-progress-bar-accent-border-color);
		--_border-width: var(--components-progress-bar-segment-border-width);

		box-sizing: border-box;
		display: block;
		position: relative;
		box-shadow: inset 0 0 0 var(--_border-width) var(--_border-color);
		background-color: var(--_fill-color);
		width: var(--_width);
		min-width: var(--_min-width);
		height: 100%;
		overflow: hidden;
		transition: width var(--primitives-transition-duration-medium) ease-out;
	}

	:host([value="0"]),
	:host(:not([value])) {
		display: none;
	}


	/* ## Grow / shrink
	   Set by the parent (data-grow / data-shrink) on the transitions between
	   indeterminate and determinate. */

	:host([data-grow]) {
		animation: progress-bar-segment-grow var(--primitives-transition-duration-slow) ease-out;
	}

	:host([data-shrink]) {
		animation: progress-bar-segment-shrink var(--primitives-transition-duration-slow) ease-out forwards;
	}

	@keyframes progress-bar-segment-grow {
		from { width: 0%; }
		to { width: var(--_width); }
	}

	@keyframes progress-bar-segment-shrink {
		from { width: var(--_width); opacity: 1; }
		to { width: 0%; opacity: 0; }
	}


	/* ## Rounding per mode
	   Progress mode: every segment is its own capsule. Distribution mode:
	   segments use a small radius matching the track's outer corners.
	   data-mode is set by the parent. */

	:host([data-mode="progress"]) {
		border-radius: var(--components-progress-bar-corner-radius);
	}

	:host([data-mode="distribution"]) {
		border-radius: var(--components-progress-bar-distribution-corner-radius);
	}


	/* ## Variants — semantic */

	:host([color="neutral"]) {
		--_fill-color: var(--components-progress-bar-neutral-fill-color);
		--_border-color: var(--components-progress-bar-neutral-border-color);
	}
	:host([color="accent"]) {
		--_fill-color: var(--components-progress-bar-accent-fill-color);
		--_border-color: var(--components-progress-bar-accent-border-color);
	}
	:host([color="success"]) {
		--_fill-color: var(--components-progress-bar-success-fill-color);
		--_border-color: var(--components-progress-bar-success-border-color);
	}
	:host([color="warning"]) {
		--_fill-color: var(--components-progress-bar-warning-fill-color);
		--_border-color: var(--components-progress-bar-warning-border-color);
	}
	:host([color="critical"]) {
		--_fill-color: var(--components-progress-bar-critical-fill-color);
		--_border-color: var(--components-progress-bar-critical-border-color);
	}


	/* ## Variants — Rijkskleuren */

	:host([color="coolgray"]) {
		--_fill-color: var(--components-progress-bar-coolgray-fill-color);
		--_border-color: var(--components-progress-bar-coolgray-border-color);
	}
	:host([color="lintblauw"]) {
		--_fill-color: var(--components-progress-bar-lintblauw-fill-color);
		--_border-color: var(--components-progress-bar-lintblauw-border-color);
	}
	:host([color="donkerblauw"]) {
		--_fill-color: var(--components-progress-bar-donkerblauw-fill-color);
		--_border-color: var(--components-progress-bar-donkerblauw-border-color);
	}
	:host([color="hemelblauw"]) {
		--_fill-color: var(--components-progress-bar-hemelblauw-fill-color);
		--_border-color: var(--components-progress-bar-hemelblauw-border-color);
	}
	:host([color="lichtblauw"]) {
		--_fill-color: var(--components-progress-bar-lichtblauw-fill-color);
		--_border-color: var(--components-progress-bar-lichtblauw-border-color);
	}
	:host([color="paars"]) {
		--_fill-color: var(--components-progress-bar-paars-fill-color);
		--_border-color: var(--components-progress-bar-paars-border-color);
	}
	:host([color="violet"]) {
		--_fill-color: var(--components-progress-bar-violet-fill-color);
		--_border-color: var(--components-progress-bar-violet-border-color);
	}
	:host([color="robijnrood"]) {
		--_fill-color: var(--components-progress-bar-robijnrood-fill-color);
		--_border-color: var(--components-progress-bar-robijnrood-border-color);
	}
	:host([color="roze"]) {
		--_fill-color: var(--components-progress-bar-roze-fill-color);
		--_border-color: var(--components-progress-bar-roze-border-color);
	}
	:host([color="rood"]) {
		--_fill-color: var(--components-progress-bar-rood-fill-color);
		--_border-color: var(--components-progress-bar-rood-border-color);
	}
	:host([color="oranje"]) {
		--_fill-color: var(--components-progress-bar-oranje-fill-color);
		--_border-color: var(--components-progress-bar-oranje-border-color);
	}
	:host([color="donkergeel"]) {
		--_fill-color: var(--components-progress-bar-donkergeel-fill-color);
		--_border-color: var(--components-progress-bar-donkergeel-border-color);
	}
	:host([color="geel"]) {
		--_fill-color: var(--components-progress-bar-geel-fill-color);
		--_border-color: var(--components-progress-bar-geel-border-color);
	}
	:host([color="donkerbruin"]) {
		--_fill-color: var(--components-progress-bar-donkerbruin-fill-color);
		--_border-color: var(--components-progress-bar-donkerbruin-border-color);
	}
	:host([color="bruin"]) {
		--_fill-color: var(--components-progress-bar-bruin-fill-color);
		--_border-color: var(--components-progress-bar-bruin-border-color);
	}
	:host([color="donkergroen"]) {
		--_fill-color: var(--components-progress-bar-donkergroen-fill-color);
		--_border-color: var(--components-progress-bar-donkergroen-border-color);
	}
	:host([color="groen"]) {
		--_fill-color: var(--components-progress-bar-groen-fill-color);
		--_border-color: var(--components-progress-bar-groen-border-color);
	}
	:host([color="mosgroen"]) {
		--_fill-color: var(--components-progress-bar-mosgroen-fill-color);
		--_border-color: var(--components-progress-bar-mosgroen-border-color);
	}
	:host([color="mintgroen"]) {
		--_fill-color: var(--components-progress-bar-mintgroen-fill-color);
		--_border-color: var(--components-progress-bar-mintgroen-border-color);
	}


	/* # Hover area (tooltip trigger)
	   Fills the segment; captures hover/focus for the wrapping nldd-tooltip. */

	.progress-bar-segment__hover-area {
		display: block;
		position: absolute;
		inset: 0;
	}


	/* # Accessibility */

	@media (prefers-reduced-motion: reduce) {
		:host {
			transition: none;
		}
	}

	@media (forced-colors: active) {
		:host {
			background-color: CanvasText;
			border: 1px solid CanvasText;
		}
	}
`;
