import { css } from 'lit';
import { slottedReset, inheritedTextReset } from '../../../assets/styles/slotted-reset.js';

export const bylineStyles = css`


	/* # Host */

	:host {
		--_gap: var(--primitives-space-8);
		--_avatar-overlap: var(--primitives-space-8);
		--_avatar-size: var(--primitives-space-40);
		--_avatar-border-width: var(--primitives-border-width-regular);
		--_avatar-border-color: var(--context-parent-background-color, var(--semantics-surfaces-base-background-color));
		--_avatar-corner-radius: var(--primitives-corner-radius-full);
		--_text-color: var(--semantics-content-color);
		--_text-font: var(--primitives-font-body-md-medium-tight);
		--_supporting-text-color: var(--semantics-content-secondary-color);
		--_supporting-text-font: var(--primitives-font-body-sm-regular-tight);

		${inheritedTextReset}
		display: flex;
		align-items: center;
		gap: var(--_gap);
	}

	:host([hidden]) {
		display: none;
	}


	/* # Avatars */

	.byline__avatars {
		display: flex;
		padding-inline-start: var(--_avatar-overlap);
	}

	.byline__avatars[hidden] {
		display: none;
	}

	.byline__avatars ::slotted(img) {
		${slottedReset}
		display: block !important;
		margin-inline-start: calc(-1 * var(--_avatar-overlap)) !important;
		border-radius: var(--_avatar-corner-radius) !important;
		box-shadow: 0 0 0 var(--_avatar-border-width) var(--_avatar-border-color) !important;
		width: var(--_avatar-size) !important;
		height: var(--_avatar-size) !important;
		object-fit: cover !important;
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
