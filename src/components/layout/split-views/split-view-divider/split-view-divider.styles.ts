import { css } from 'lit';

export const splitViewDividerStyles = css`


	/* # Host */

	:host {
		--_thickness: var(--semantics-dividers-thickness);

		display: flex;
		flex-shrink: 0;
		align-self: stretch;
	}

	:host([hidden]) {
		display: none;
	}

	:host([has-drag-handle]) {
		--_thickness: 12px;
	}


	/* # Block */

	.split-view-divider {
		display: flex;
		position: relative;
		background-color: var(--semantics-dividers-color);
		width: 100%;
		height: var(--_thickness);
		align-items: center;
		justify-content: center;
	}

	:host([orientation="vertical"]) .split-view-divider {
		width: var(--_thickness);
		height: 100%;
	}

	@media (forced-colors: active) {
		.split-view-divider {
			background-color: CanvasText;
		}
	}


	/* # Elements */

	.split-view-divider__drag-handle {
		position: absolute;
		border-radius: 9999px;
		background-color: var(--semantics-content-secondary-color);
		width: 40px;
		height: 4px;
	}

	:host([orientation="vertical"]) .split-view-divider__drag-handle {
		width: 4px;
		height: 40px;
	}
`;
