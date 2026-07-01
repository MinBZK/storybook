import { css } from 'lit';

export const barSplitViewStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host */

	:host {
		--_background-color: var(--context-parent-background-color, var(--semantics-surfaces-base-background-color));

		display: flex;
		background-color: var(--_background-color);
		width: 100%;
		height: 100%;
		flex-direction: column;
	}

	:host([hidden]) {
		display: none;
	}

	:host([background="base"]) {
		--context-parent-background-color: var(--semantics-surfaces-base-background-color);
		--_background-color: var(--context-parent-background-color);
	}

	:host([background="tinted"]) {
		--context-parent-background-color: var(--semantics-surfaces-tinted-background-color);
		--_background-color: var(--context-parent-background-color);
	}


	/* # Block */

	.bar-split-view {
		display: flex;
		min-width: 0;
		min-height: 0;
		flex-direction: column;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
	}


	/* # Elements */

	.bar-split-view__bar {
		display: flex;
		min-width: 0;
		overflow: hidden;
		flex-direction: column;
		flex-shrink: 0;
	}

	.bar-split-view__divider {
		flex-shrink: 0;
	}

	.bar-split-view__main {
		display: flex;
		min-width: 0;
		min-height: 0;
		overflow: hidden;
		flex-direction: column;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
	}

	/* Only the main pane grows to fill remaining space; bar panes size to
	 * their content. Without this scoping a bar's slotted content gets
	 * flex-basis: 0 and collapses (the old 'flex: 1' shorthand expanded
	 * to 'flex: 1 1 0%', where % resolved to 'auto' inside the
	 * height-indeterminate bar wrapper — the longhand conversion lost
	 * that nuance, hence this rule). */
	::slotted([slot="main"]) {
		min-height: 0;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
	}
`;
