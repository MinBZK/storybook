import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.js';
import { slottedReset, inheritedTextReset } from '../../../assets/styles/shadow-resets.js';

const smMax = unsafeCSS(breakpoints.smMax);

export const bylineStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host */

	:host {
		--_gap: var(--primitives-space-8);
		--_avatar-overlap-size: var(--primitives-space-8);
		--_avatar-size: var(--primitives-space-40);
		--_avatar-border-width: var(--primitives-border-width-regular);
		--_avatar-border-color: var(--context-parent-background-color, var(--semantics-surfaces-base-background-color));
		--_avatar-corner-radius: var(--primitives-corner-radius-full);
		--_text-color: var(--semantics-content-color);
		--_text-font: var(--primitives-font-body-md-medium-tight);
		--_supporting-text-color: var(--semantics-content-secondary-color);
		--_supporting-text-font: var(--primitives-font-body-sm-regular-tight);

		${inheritedTextReset}
		container-type: inline-size;
		display: block;
		width: 100%;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Byline */

	.byline {
		display: flex;
		align-items: center;
		gap: var(--_gap);
	}

	.byline[data-multiple-avatars] {
		@container (max-width: ${smMax}) {
			flex-direction: column;
			align-items: flex-start;
		}
	}


	/* # Avatars */

	.byline__avatars {
		display: flex;
		padding-inline-start: var(--_avatar-overlap-size);
	}

	.byline__avatars[hidden] {
		display: none;
	}

	.byline__avatars ::slotted(img) {
		${slottedReset}
		display: block !important;
		margin-inline-start: calc(-1 * var(--_avatar-overlap-size)) !important;
		border-radius: var(--_avatar-corner-radius) !important;
		box-shadow: 0 0 0 var(--_avatar-border-width) var(--_avatar-border-color) !important;
		width: var(--_avatar-size) !important;
		height: var(--_avatar-size) !important;
		object-fit: cover !important;
	}

	/* A slotted avatar can't be wrapped, so size it here. width/height need
	   !important to beat the avatar's own :host width. */
	.byline__avatars ::slotted(nldd-avatar) {
		width: var(--_avatar-size) !important;
		height: var(--_avatar-size) !important;
		margin-inline-start: calc(-1 * var(--_avatar-overlap-size));
		border-radius: var(--_avatar-corner-radius);
		box-shadow: 0 0 0 var(--_avatar-border-width) var(--_avatar-border-color);
	}

	.byline__avatar {
		display: flex;
		box-sizing: border-box;
		width: var(--_avatar-size);
		height: var(--_avatar-size);
		flex-shrink: 0;
		margin-inline-start: calc(-1 * var(--_avatar-overlap-size));
		border-radius: var(--_avatar-corner-radius);
		box-shadow: 0 0 0 var(--_avatar-border-width) var(--_avatar-border-color);
	}

	@media (forced-colors: active) {
		.byline__avatars ::slotted(img) {
			border: var(--_avatar-border-width) solid Canvas !important;
		}
	}


	/* # Text area */

	.byline__text-area {
		display: flex;
		min-width: 0;
		flex-direction: column;
	}

	.byline__text-area[hidden] {
		display: none;
	}

	.byline__text {
		margin: 0;
		color: var(--_text-color);
		font: var(--_text-font);
		text-wrap: pretty;
	}

	.byline__text[hidden] {
		display: none;
	}

	.byline__supporting-text {
		margin: 0;
		color: var(--_supporting-text-color);
		font: var(--_supporting-text-font);
		text-wrap: pretty;
	}

	.byline__supporting-text[hidden] {
		display: none;
	}
`;
