import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.js';

const smMax = unsafeCSS(breakpoints.smMax);

export const breadcrumbsStyles = css`
	:host {
		container-type: inline-size;
		display: block;
	}

	:host([hidden]) {
		display: none;
	}

	.breadcrumbs {
		display: flex;
	}

	.breadcrumbs__items {
		display: flex;
		flex-wrap: wrap;
		row-gap: var(--primitives-space-4);
	}

	:host([has-parent]) .breadcrumbs__items {
		@container (max-width: ${smMax}) {
			display: none;
		}
	}

	.breadcrumbs__level-up {
		display: none;
		align-items: center;
		gap: var(--primitives-space-4);
		color: var(--semantics-links-color);
		font: var(--primitives-font-body-md-regular-tight);
		text-decoration: none;
	}

	:host([has-parent]) .breadcrumbs__level-up {
		@container (max-width: ${smMax}) {
			display: inline-flex;
		}
	}

	.breadcrumbs__level-up:hover {
		color: var(--semantics-links-is-hovered-color);
	}

	.breadcrumbs__level-up:active {
		color: var(--semantics-links-is-active-color);
	}

	.breadcrumbs__level-up:focus-visible {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		border-radius: var(--primitives-corner-radius-xs);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	.breadcrumbs__level-up-icon {
		display: inline-flex;
		width: var(--primitives-space-20);
		height: var(--primitives-space-20);
		flex-shrink: 0;
	}
`;

export const breadcrumbsItemStyles = css`
	:host {
		/* Small downward offset so the chevron-right-small icon sits closer
		   to the text's optical centerline (the icon's bbox renders slightly
		   above the visual baseline). */
		--_separator-vertical-offset: 0.05em;

		display: inline-flex;
		align-items: center;
	}

	:host([hidden]) {
		display: none;
	}

	.breadcrumbs__item {
		display: inline-flex;
		align-items: center;
		color: var(--semantics-content-color);
		font: var(--primitives-font-body-md-regular-tight);
	}

	.breadcrumbs__item-link {
		color: var(--semantics-links-color);
		text-decoration: underline;
	}

	.breadcrumbs__item-link:hover {
		color: var(--semantics-links-is-hovered-color);
	}

	.breadcrumbs__item-link:active {
		color: var(--semantics-links-is-active-color);
	}

	.breadcrumbs__item-link:focus-visible {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		border-radius: var(--primitives-corner-radius-xs);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	.breadcrumbs__separator {
		display: inline-flex;
		position: relative;
		top: var(--_separator-vertical-offset);
		margin-inline: var(--primitives-space-2);
		color: var(--semantics-content-secondary-color);
		width: var(--primitives-space-16);
		height: var(--primitives-space-16);
		flex-shrink: 0;
	}

	:host(:last-of-type) .breadcrumbs__separator {
		display: none;
	}
`;
