import { css } from 'lit';

export const splitViewDividerStyles = css`


	/* # Host */

	:host {
		display: flex;
		flex-shrink: 0;
		align-self: stretch;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.split-view-divider {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		background-color: var(--semantics-dividers-color);
	}


	/* # Drag handle */

	.split-view-divider__drag-handle {
		background-color: var(--semantics-content-secondary-color);
		border-radius: 9999px;
		position: absolute;
	}


	/* # Vertical */

	:host([orientation='vertical']) .split-view-divider {
		width: var(--semantics-dividers-thickness);
		height: 100%;
	}

	:host([orientation='vertical'][has-drag-handle]) .split-view-divider {
		width: 12px;
	}

	:host([orientation='vertical']) .split-view-divider__drag-handle {
		width: 4px;
		height: 40px;
	}


	/* # Horizontal */

	:host([orientation='horizontal']) .split-view-divider,
	:host(:not([orientation])) .split-view-divider {
		width: 100%;
		height: var(--semantics-dividers-thickness);
	}

	:host([orientation='horizontal'][has-drag-handle]) .split-view-divider,
	:host(:not([orientation])[has-drag-handle]) .split-view-divider {
		height: 12px;
	}

	:host([orientation='horizontal']) .split-view-divider__drag-handle,
	:host(:not([orientation])) .split-view-divider__drag-handle {
		width: 40px;
		height: 4px;
	}


	/* # High contrast */

	@media (forced-colors: active) {
		.split-view-divider {
			background-color: CanvasText;
		}
	}
`;
