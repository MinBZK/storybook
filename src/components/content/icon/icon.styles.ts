import { css } from 'lit';

export const iconStyles = css`


	/* # Host
	 *
	 * Default size = fill parent (existing behaviour). Setting [size]
	 * pins width/height to a fixed spacer value; setting [color] picks
	 * either a functional semantic colour or a descriptive rijkskleur. */

	:host {
		--_size: 100%;
		--_color: inherit;

		display: inline-block;
		width: var(--_size);
		color: var(--_color);
	}

	:host([hidden]) {
		display: none;
	}


	/* # Size — spacer-aligned, 16+ */

	:host([size="16"]) { --_size: var(--primitives-space-16); }
	:host([size="20"]) { --_size: var(--primitives-space-20); }
	:host([size="24"]) { --_size: var(--primitives-space-24); }
	:host([size="28"]) { --_size: var(--primitives-space-28); }
	:host([size="32"]) { --_size: var(--primitives-space-32); }
	:host([size="40"]) { --_size: var(--primitives-space-40); }
	:host([size="44"]) { --_size: var(--primitives-space-44); }
	:host([size="48"]) { --_size: var(--primitives-space-48); }
	:host([size="56"]) { --_size: var(--primitives-space-56); }
	:host([size="64"]) { --_size: var(--primitives-space-64); }
	:host([size="80"]) { --_size: var(--primitives-space-80); }
	:host([size="96"]) { --_size: var(--primitives-space-96); }


	/* # Color — functional */

	:host([color="primary-content"])   { --_color: var(--semantics-content-color); }
	:host([color="secondary-content"]) { --_color: var(--semantics-content-secondary-color); }
	:host([color="accent"])            { --_color: var(--semantics-content-accent-color); }
	:host([color="critical"])          { --_color: var(--semantics-content-critical-color); }
	:host([color="warning"])           { --_color: var(--semantics-content-warning-color); }
	:host([color="success"])           { --_color: var(--semantics-content-success-color); }


	/* # Color — rijkskleuren */

	:host([color="lintblauw"])   { --_color: var(--components-icon-color-lintblauw-color); }
	:host([color="donkerblauw"]) { --_color: var(--components-icon-color-donkerblauw-color); }
	:host([color="hemelblauw"])  { --_color: var(--components-icon-color-hemelblauw-color); }
	:host([color="lichtblauw"])  { --_color: var(--components-icon-color-lichtblauw-color); }
	:host([color="paars"])       { --_color: var(--components-icon-color-paars-color); }
	:host([color="violet"])      { --_color: var(--components-icon-color-violet-color); }
	:host([color="robijnrood"])  { --_color: var(--components-icon-color-robijnrood-color); }
	:host([color="roze"])        { --_color: var(--components-icon-color-roze-color); }
	:host([color="rood"])        { --_color: var(--components-icon-color-rood-color); }
	:host([color="oranje"])      { --_color: var(--components-icon-color-oranje-color); }
	:host([color="donkergeel"])  { --_color: var(--components-icon-color-donkergeel-color); }
	:host([color="geel"])        { --_color: var(--components-icon-color-geel-color); }
	:host([color="donkerbruin"]) { --_color: var(--components-icon-color-donkerbruin-color); }
	:host([color="bruin"])       { --_color: var(--components-icon-color-bruin-color); }
	:host([color="donkergroen"]) { --_color: var(--components-icon-color-donkergroen-color); }
	:host([color="groen"])       { --_color: var(--components-icon-color-groen-color); }
	:host([color="mosgroen"])    { --_color: var(--components-icon-color-mosgroen-color); }
	:host([color="mintgroen"])   { --_color: var(--components-icon-color-mintgroen-color); }


	/* # Block */

	.icon__container {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: center;
	}


	/* # Elements */

	svg {
		display: block;
		width: 100%;
	}
`;
