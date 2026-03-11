import { css } from 'lit';


/* # rr-horizontal-split-view styles */

export const horizontalSplitViewStyles = css`
	:host {
		display: flex;
		width: 100%;
		height: 100%;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Split view */

	.split-view {
		display: flex;
		flex-direction: row;
		flex: 1;
		min-height: 0;
		min-width: 0;
		overflow: hidden;
		container-type: inline-size;
	}


	/* # Sidebar */

	.split-view__sidebar {
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		min-height: 0;
		min-width: var(--primitives-area-320);
		overflow: hidden;
	}


	/* # Main */

	.split-view__main {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		min-width: var(--primitives-area-320);
		overflow: hidden;
	}


	/* # Inspector */

	.split-view__inspector {
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		min-height: 0;
		min-width: var(--primitives-area-320);
		overflow: hidden;
	}

	::slotted(*) {
		flex: 1;
		min-height: 0;
	}


	/* # Auto-hide */

	@container (max-width: 961px) {
		.split-view__inspector,
		rr-split-view-divider[data-index="1"] {
			display: none;
		}
	}

	/* If sidebar is already hidden by consumer, inspector stays until 641px */
	@container (min-width: 641px) {
		:host(:not([show-sidebar])) .split-view__inspector,
		:host(:not([show-sidebar])) rr-split-view-divider[data-index="1"] {
			display: flex;
		}
	}

	@container (max-width: 640px) {
		.split-view__sidebar,
		rr-split-view-divider[data-index="0"] {
			display: none;
		}
	}
`;
