import { css } from 'lit';

export const styles = css`

	/* # Host */

	:host {
		display: block;
		font-family: var(--rr-font-family-body);
		width: 100%;
	}

	:host([hidden]) {
		display: none;
	}

	/* # Skip link */

	.skip-link {
		position: absolute;
		top: -100%;
		left: 50%;
		transform: translateX(-50%);
		z-index: 1000;
		background-color: var(--primitives-color-accent-100);
		color: var(--primitives-color-neutral-0);
		padding: var(--primitives-space-8) var(--primitives-space-16);
		font: var(--components-menu-bar-menu-item-font);
		text-decoration: none;
		border-radius: var(--semantics-controls-md-corner-radius);
	}

	.skip-link:focus {
		top: var(--primitives-space-8);
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
	}

	/* # Container */

	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0 auto;
		background-color: var(--semantics-surfaces-background-color);
		border-bottom: var(--semantics-dividers-thickness) solid var(--semantics-dividers-color);
		box-sizing: border-box;
	}

	:host([container="sm"]) .container {
		min-width: var(--primitives-breakpoint-sm-min);
	}

	:host([container="md"]) .container,
	:host(:not([container])) .container {
		min-width: var(--primitives-breakpoint-md-min);
	}

	:host([container="lg"]) .container {
		min-width: var(--primitives-breakpoint-lg-min);
	}

	/* # Logo bar */

	.logo-bar {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background-color: var(--semantics-surfaces-background-color);
	}

	:host([no-logo]) .logo-bar {
		display: none;
	}

	/* # Nav bar */

	.nav-bar {
		display: flex;
		align-items: center;
		min-height: 44px;
		background-color: var(--semantics-surfaces-background-color);
	}

	:host([container="sm"]) .nav-bar {
		padding: 0 var(--primitives-space-4);
	}

	:host([container="md"]) .nav-bar,
	:host(:not([container])) .nav-bar {
		padding: 0 var(--primitives-space-8);
	}

	:host([container="lg"]) .nav-bar {
		padding: 0 var(--primitives-space-8);
	}

	/* # Nav bar inner */

	.nav-bar-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex: 1;
		min-width: 0;
	}

	/* # Nav left */

	.nav-left {
		display: flex;
		align-items: center;
		flex: 1;
		min-width: 0;
	}

	/* # Nav right */

	.nav-right {
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}

	:host([no-utility-bar]) .nav-right {
		display: none;
	}

	/* # Nav title */

	.nav-title {
		font: var(--components-menu-bar-title-item-m-font);
		color: var(--primitives-color-neutral-900);
		padding: 0 var(--primitives-space-8);
		white-space: nowrap;
	}

	:host([container="sm"]) .nav-title {
		font: var(--components-menu-bar-title-item-s-font);
	}

	:host([container="lg"]) .nav-title {
		font: var(--components-menu-bar-title-item-l-font);
	}

	:host([no-title]) .nav-title {
		display: none;
	}

	/* # Global menu */

	.global-menu {
		flex: 1;
		min-width: 0;
		overflow: visible;
	}

	:host([container="sm"]) .global-menu,
	:host([no-menu]) .global-menu {
		display: none;
	}

	rr-menu-bar::part(menu) {
		border-bottom: none;
	}

	/* # Back button */

	:host(:not([has-back-button])) rr-back-button {
		display: none;
	}

	:host([has-back-button]) rr-back-button {
		display: inline-flex;
		margin-right: var(--primitives-space-8);
	}
`;
