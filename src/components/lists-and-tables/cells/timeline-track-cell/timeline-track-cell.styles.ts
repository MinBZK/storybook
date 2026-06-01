import { css } from 'lit';

export const timelineTrackCellStyles = css`


	/* # Host */

	:host {
		--_size: var(--primitives-space-16);
		--_line-width: var(--primitives-space-2);
		--_z-index-dot: 1;
		--_color: var(--components-timeline-track-cell-color);
		--_future-background-color: var(--components-timeline-track-cell-future-background-color);

		display: flex;
		width: var(--_size);
		flex-direction: column;
		align-self: stretch;
		align-items: center;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.timeline-track-cell {
		position: relative;
		width: var(--_size);
		height: 100%;
		min-height: var(--primitives-space-48);
	}


	/* # Elements */

	.timeline-track-cell__line-top,
	.timeline-track-cell__line-bottom,
	.timeline-track-cell__line-full {
		position: absolute;
		left: 50%;
		margin-left: calc(var(--_line-width) / -2);
		background-color: var(--_color);
		width: var(--_line-width);
	}

	.timeline-track-cell__line-top {
		bottom: 50%;
		height: calc(50% + var(--context-list-item-padding-block, 0px));
	}

	.timeline-track-cell__line-bottom {
		top: 50%;
		height: calc(50% + var(--context-list-item-padding-block, 0px));
	}

	.timeline-track-cell__line-full {
		top: calc(-1 * var(--context-list-item-padding-block, 0px));
		bottom: calc(-1 * var(--context-list-item-padding-block, 0px));
	}

	.timeline-track-cell__dot {
		box-sizing: border-box;
		position: absolute;
		top: 50%;
		left: 0;
		z-index: var(--_z-index-dot);
		margin-top: calc(var(--_size) / -2);
		border: var(--_line-width) solid var(--_color);
		border-radius: var(--primitives-corner-radius-full);
		width: var(--_size);
		height: var(--_size);
	}

	:host([step="past"]) .timeline-track-cell__dot,
	:host(:not([step])) .timeline-track-cell__dot {
		background-color: var(--_color);
	}

	:host([step="future"]) .timeline-track-cell__dot {
		background-color: var(--_future-background-color);
	}

	@media (forced-colors: active) {
		.timeline-track-cell__dot,
		.timeline-track-cell__line-top,
		.timeline-track-cell__line-bottom,
		.timeline-track-cell__line-full {
			forced-color-adjust: none;
		}
	}
`;
