import { css } from 'lit';
import { slottedReset } from '../../../assets/styles/shadow-resets.js';

export const avatarGroupStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host */

	:host {
		--_avatar-size: var(--primitives-space-40);
		--_overlap-size: var(--primitives-space-8);
		--_gap: 0px;
		--_ring-width: var(--primitives-border-width-regular);
		--_ring-color: var(--context-parent-background-color, var(--semantics-surfaces-base-background-color));
		--_corner-radius: var(--primitives-corner-radius-full);

		display: inline-flex;
		vertical-align: middle;
	}

	:host([hidden]) {
		display: none;
	}


	/* ## Size */

	:host([size="16"]) { --_avatar-size: var(--primitives-space-16); }
	:host([size="20"]) { --_avatar-size: var(--primitives-space-20); }
	:host([size="24"]) { --_avatar-size: var(--primitives-space-24); }
	:host([size="28"]) { --_avatar-size: var(--primitives-space-28); }
	:host([size="32"]) { --_avatar-size: var(--primitives-space-32); }
	:host([size="44"]) { --_avatar-size: var(--primitives-space-44); }
	:host([size="48"]) { --_avatar-size: var(--primitives-space-48); }
	:host([size="56"]) { --_avatar-size: var(--primitives-space-56); }
	:host([size="64"]) { --_avatar-size: var(--primitives-space-64); }
	:host([size="80"]) { --_avatar-size: var(--primitives-space-80); }
	:host([size="96"]) { --_avatar-size: var(--primitives-space-96); }


	/* ## Overlap

	   A smaller avatar needs less overlap to read as a group, so the small
	   sizes step down with it. "none" lays them out in a row instead, with a
	   real gap, for when the faces matter more than the grouping. */

	:host([overlap="sm"]) {
		--_overlap-size: var(--primitives-space-4);
	}

	:host([overlap="none"]) {
		--_overlap-size: 0px;
		--_gap: var(--primitives-space-4);
	}

	:host([size="16"]),
	:host([size="20"]),
	:host([size="24"]) {
		--_overlap-size: var(--primitives-space-4);
	}


	/* # Group */

	.avatar-group {
		display: flex;
		padding-inline-start: var(--_overlap-size);
		gap: var(--_gap);
	}


	/* # Avatars

	   A slotted avatar can't be wrapped, so the group sizes it here. The ring
	   is a box-shadow rather than a border: it sits outside the shape without
	   changing the diameter, so overlap stays exact. */

	.avatar-group ::slotted(nldd-avatar) {
		flex-shrink: 0;
		margin-inline-start: calc(-1 * var(--_overlap-size));
		border-radius: var(--_corner-radius);
		box-shadow: 0 0 0 var(--_ring-width) var(--_ring-color);
		width: var(--_avatar-size) !important;
		height: var(--_avatar-size) !important;
	}

	.avatar-group ::slotted(img) {
		${slottedReset}
		display: block !important;
		flex-shrink: 0 !important;
		margin-inline-start: calc(-1 * var(--_overlap-size)) !important;
		border-radius: var(--_corner-radius) !important;
		box-shadow: 0 0 0 var(--_ring-width) var(--_ring-color) !important;
		width: var(--_avatar-size) !important;
		height: var(--_avatar-size) !important;
		object-fit: cover !important;
	}

	/* A box-shadow does not paint in forced colors, so the separation comes
	   back as a real border there. */
	@media (forced-colors: active) {
		.avatar-group ::slotted(nldd-avatar) {
			border: var(--_ring-width) solid Canvas;
		}

		.avatar-group ::slotted(img) {
			border: var(--_ring-width) solid Canvas !important;
		}
	}
`;
