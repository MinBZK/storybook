import { css } from 'lit';

export const timelineTrackCellStyles = css`
	:host {
		box-sizing: border-box;
	}

	:host {
		--_lane-size: var(--primitives-space-16);
		--_marker-size: var(--primitives-space-16);
		--_marker-corner-radius: var(--primitives-corner-radius-full);

		--_line-width: var(--primitives-space-2);
		--_track-color: var(--components-timeline-track-cell-color);
		--_future-fill-color: var(--components-timeline-track-cell-future-background-color);
		--_marker-z-index: 1;
		--_ring-thickness: var(--primitives-space-2);
		--_ring-color: var(--context-parent-background-color, var(--semantics-surfaces-base-background-color));
		--_marker-content-color: var(--semantics-content-contrast-color);
		--_future-content-color: var(--semantics-content-secondary-color);
		--_current-fill-color: light-dark(var(--primitives-color-accent-75), var(--primitives-color-accent-100));
		--_icon-size: calc(var(--_marker-size) * 2 / 3);

		isolation: isolate;
		display: flex;
		/* !important: shields the row padding from consumer universal resets, which beat normal :host declarations per CSS Scoping. */
		padding-block: var(--context-cell-padding-block, 0px) !important;
		width: var(--_lane-size);
		flex-direction: column;
		align-self: stretch;
		align-items: center;
	}

	:host([hidden]) {
		display: none;
	}

	/* The lane is the size; the dot fills it, and a minor one sits smaller in the
	   same lane so the track runs straight on. */
	:host([size="md"]) {
		--_lane-size: var(--primitives-space-24);
		--_marker-size: var(--primitives-space-24);
	}

	:host([variant="minor"]) {
		--_marker-size: var(--primitives-space-10);
	}

	:host([size="md"][variant="minor"]) {
		--_marker-size: var(--primitives-space-12);
	}

	/* Bleeds back over the host's block padding, so consecutive rows connect. */
	.timeline-track-cell {
		position: relative;
		width: var(--_lane-size);
		height: calc(100% + 2 * var(--context-cell-padding-block, 0px));
		min-height: var(--primitives-space-48);
		margin-block: calc(var(--context-cell-padding-block, 0px) * -1);
	}

	.timeline-track-cell__full-line,
	.timeline-track-cell__top-line,
	.timeline-track-cell__bottom-line {
		position: absolute;
		left: 50%;
		margin-left: calc(var(--_line-width) / -2);
		background-color: var(--_track-color);
		width: var(--_line-width);
	}

	/* The lines that run on downward also bridge the row boundary: an
	   nldd-list-item reserves a divider's worth of space below itself, and
	   without this the track breaks at every row. The top line needs nothing —
	   the row above already covers the band. */
	.timeline-track-cell__full-line {
		top: 0;
		bottom: calc(-1 * var(--semantics-dividers-thickness));
	}

	.timeline-track-cell__top-line {
		bottom: 50%;
		height: 50%;
	}

	.timeline-track-cell__bottom-line {
		top: 50%;
		bottom: calc(-1 * var(--semantics-dividers-thickness));
	}

	/* The status fills the halves as long as line says nothing. */
	:host([status="future"]:not([line])) .timeline-track-cell__top-line,
	:host([status="future"]:not([line])) .timeline-track-cell__bottom-line {
		background-color: var(--_future-fill-color);
	}

	:host([status="current"]:not([line])) .timeline-track-cell__bottom-line {
		background-color: var(--_future-fill-color);
	}

	:host([status="current"][direction="up"]:not([line])) .timeline-track-cell__bottom-line {
		background-color: var(--_track-color);
	}

	:host([status="current"][direction="up"]:not([line])) .timeline-track-cell__top-line {
		background-color: var(--_future-fill-color);
	}

	/* And once it does, it says it for both halves: the ones it names are track
	   you have covered, the other one is track still ahead. It stays drawn —
	   where you stand in the series is what position says, and naming a fill
	   does not move you. */
	:host([line="top"]) .timeline-track-cell__top-line,
	:host([line="bottom"]) .timeline-track-cell__bottom-line,
	:host([line="both"]) .timeline-track-cell__top-line,
	:host([line="both"]) .timeline-track-cell__bottom-line {
		background-color: var(--_track-color);
	}

	/* A row without a dot has one line to fill rather than two halves, and no point
	   where a fill could change over, so its whole line follows the status. On a
	   current row that leans the way the timeline runs: what belongs to a point
	   usually comes after it, so going down that stretch is still ahead, and going
	   up it is behind you. line overrules the whole of it, as everywhere. */
	:host([variant="none"][status="future"]) .timeline-track-cell__full-line,
	:host([variant="none"][status="current"]:not([direction="up"])) .timeline-track-cell__full-line,
	:host([variant="none"][line="none"]) .timeline-track-cell__full-line {
		background-color: var(--_future-fill-color);
	}

	:host([line="top"]) .timeline-track-cell__bottom-line,
	:host([line="bottom"]) .timeline-track-cell__top-line,
	:host([line="none"]) .timeline-track-cell__top-line,
	:host([line="none"]) .timeline-track-cell__bottom-line {
		background-color: var(--_future-fill-color);
	}

	.timeline-track-cell__marker {
		box-sizing: border-box;
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: var(--_marker-z-index);
		display: flex;
		width: var(--_marker-size);
		height: var(--_marker-size);
		margin-top: calc(var(--_marker-size) / -2);
		margin-left: calc(var(--_marker-size) / -2);
		align-items: center;
		justify-content: center;
		border: var(--_line-width) solid var(--_track-color);
		border-radius: var(--_marker-corner-radius);
		/* Ring in the background color: masks the line running underneath. */
		box-shadow: 0 0 0 var(--_ring-thickness) var(--_ring-color);
		color: var(--_marker-content-color);
		font: var(--primitives-font-body-sm-medium-flat);
	}

	:host([status="past"]) .timeline-track-cell__marker,
	:host(:not([status])) .timeline-track-cell__marker {
		background-color: var(--_track-color);
	}

	:host([status="current"]) .timeline-track-cell__marker {
		background-color: var(--_current-fill-color);
		color: var(--_track-color);
	}

	:host([status="future"]) .timeline-track-cell__marker {
		border-color: var(--_future-fill-color);
		background-color: var(--_future-fill-color);
		color: var(--_future-content-color);
	}

	.timeline-track-cell__icon {
		width: var(--_icon-size);
		height: var(--_icon-size);
	}

	@media (forced-colors: active) {
		.timeline-track-cell__marker,
		.timeline-track-cell__top-line,
		.timeline-track-cell__bottom-line,
		.timeline-track-cell__full-line {
			forced-color-adjust: none;
		}
	}
`;
