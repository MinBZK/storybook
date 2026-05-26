import { css } from 'lit';

export const dropdownStyles = css`


	/* # Host */

	:host {
		--_width: 100%;
		--_corner-radius: var(--semantics-controls-md-corner-radius);
		--_min-size: var(--semantics-controls-md-min-size);
		--_inline-padding: var(--semantics-controls-md-inline-padding);
		--_text-font: var(--semantics-input-fields-md-text-font);
		--_validation-icon-area-padding-right: var(--primitives-space-4);
		--_validation-icon-size: var(--semantics-input-fields-md-validation-icon-size);
		--_picker-icon-size: var(--primitives-space-24);
		--_background-color: var(--semantics-buttons-neutral-tinted-background-color);
		--_content-color: var(--semantics-buttons-neutral-tinted-content-color);
		--_is-hovered-background-color: var(--semantics-buttons-neutral-tinted-is-hovered-background-color);
		--_is-hovered-content-color: var(--semantics-buttons-neutral-tinted-is-hovered-content-color);
		--_is-active-background-color: var(--semantics-buttons-neutral-tinted-is-active-background-color);
		--_is-active-content-color: var(--semantics-buttons-neutral-tinted-is-active-content-color);

		display: block;
		width: var(--_width);
		max-width: 100%;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}

	:host([size="sm"]) {
		--_corner-radius: var(--semantics-controls-sm-corner-radius);
		--_min-size: var(--semantics-controls-sm-min-size);
		--_inline-padding: var(--semantics-controls-sm-inline-padding);
		--_text-font: var(--semantics-input-fields-sm-text-font);
		--_validation-icon-area-padding-right: var(--primitives-space-2);
		--_validation-icon-size: var(--semantics-input-fields-sm-validation-icon-size);
		--_picker-icon-size: var(--primitives-space-20);
	}

	:host([size="xs"]) {
		--_corner-radius: var(--semantics-controls-xs-corner-radius);
		--_min-size: var(--semantics-controls-xs-min-size);
		--_inline-padding: var(--semantics-controls-xs-inline-padding);
		--_text-font: var(--semantics-input-fields-xs-text-font);
		--_validation-icon-area-padding-right: var(--primitives-space-0);
		--_validation-icon-size: var(--semantics-input-fields-xs-validation-icon-size);
		--_picker-icon-size: var(--primitives-space-16);
	}

	:host([expanded]) {
		--_background-color: var(--semantics-buttons-neutral-tinted-is-expanded-background-color);
		--_content-color: var(--semantics-buttons-neutral-tinted-is-expanded-content-color);
		--_is-hovered-background-color: var(--semantics-buttons-neutral-tinted-is-expanded-is-hovered-background-color);
		--_is-hovered-content-color: var(--semantics-buttons-neutral-tinted-is-expanded-is-hovered-content-color);
		--_is-active-background-color: var(--semantics-buttons-neutral-tinted-is-expanded-is-active-background-color);
		--_is-active-content-color: var(--semantics-buttons-neutral-tinted-is-expanded-is-active-content-color);
	}

	:host([disabled]) {
		opacity: var(--primitives-opacity-disabled);
		pointer-events: none;
	}


	/* # Block */

	.dropdown {
		box-sizing: border-box;
		display: flex;
		position: relative;
		border-radius: var(--_corner-radius);
		background-color: var(--_background-color);
		width: 100%;
		min-height: var(--_min-size);
		flex-direction: row;
		align-items: center;
		color: var(--_content-color);
		transition:
			background-color var(--primitives-transition-duration-fast) var(--primitives-transition-easing-default),
			color var(--primitives-transition-duration-fast) var(--primitives-transition-easing-default)
		;
	}

	.dropdown:hover {
		@media (hover: hover) {
			background-color: var(--_is-hovered-background-color);
			color: var(--_is-hovered-content-color);
		}
	}

	.dropdown:active {
		background-color: var(--_is-active-background-color);
		color: var(--_is-active-content-color);
	}

	.dropdown:focus-within {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	:host([is-pointer-focus]) .dropdown:focus-within {
		outline: none;
		box-shadow: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.dropdown {
			transition: none;
		}
	}


	/* # Elements */

	::slotted(select) {
		box-sizing: border-box;
		position: absolute;
		inset: 0;
		opacity: 0;
		margin: 0;
		outline: none;
		border: none;
		background: transparent;
		width: 100%;
		height: 100%;
		padding: 0;
		font: var(--semantics-input-fields-native-select-font);
		appearance: none;
	}

	.dropdown__value {
		min-width: 0;
		overflow: hidden;
		padding: 0 var(--_inline-padding);
		flex-grow: 1;
		color: inherit;
		font: var(--_text-font);
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.dropdown__validation-icon-area {
		display: flex;
		height: 100%;
		padding-right: var(--_validation-icon-area-padding-right);
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
	}

	:host([valid]) .dropdown__validation-icon-area {
		color: var(--semantics-input-fields-is-valid-icon-color);
	}

	:host([invalid]) .dropdown__validation-icon-area {
		color: var(--semantics-input-fields-is-invalid-icon-color);
	}

	.dropdown__validation-icon {
		width: var(--_validation-icon-size);
		height: var(--_validation-icon-size);
	}

	.dropdown__picker-icon {
		display: flex;
		width: var(--_picker-icon-size);
		height: var(--_picker-icon-size);
		padding-right: calc((var(--_min-size) - var(--_picker-icon-size)) / 2);
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		color: inherit;
	}
`;
