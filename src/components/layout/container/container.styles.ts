import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.js';

const smMax = unsafeCSS(breakpoints.smMax);
const mdMin = unsafeCSS(breakpoints.mdMin);
const mdMax = unsafeCSS(breakpoints.mdMax);
const lgMin = unsafeCSS(breakpoints.lgMin);

export const containerStyles = css`


	/* # Host */

	:host {
		display: block;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.container {
		height: 100%;
	}


	/* # Padding — base */

	:host([padding="0"]) .container { padding: 0; }
	:host([padding="2"]) .container { padding: var(--primitives-space-2); }
	:host([padding="4"]) .container { padding: var(--primitives-space-4); }
	:host([padding="6"]) .container { padding: var(--primitives-space-6); }
	:host([padding="8"]) .container { padding: var(--primitives-space-8); }
	:host([padding="10"]) .container { padding: var(--primitives-space-10); }
	:host([padding="12"]) .container { padding: var(--primitives-space-12); }
	:host([padding="16"]) .container { padding: var(--primitives-space-16); }
	:host([padding="20"]) .container { padding: var(--primitives-space-20); }
	:host([padding="24"]) .container { padding: var(--primitives-space-24); }
	:host([padding="28"]) .container { padding: var(--primitives-space-28); }
	:host([padding="32"]) .container { padding: var(--primitives-space-32); }
	:host([padding="40"]) .container { padding: var(--primitives-space-40); }
	:host([padding="44"]) .container { padding: var(--primitives-space-44); }
	:host([padding="48"]) .container { padding: var(--primitives-space-48); }
	:host([padding="56"]) .container { padding: var(--primitives-space-56); }
	:host([padding="64"]) .container { padding: var(--primitives-space-64); }
	:host([padding="80"]) .container { padding: var(--primitives-space-80); }
	:host([padding="96"]) .container { padding: var(--primitives-space-96); }


	/* # Padding — sm viewport */

	:host([sm-padding="0"]) .container { @media (max-width: ${smMax}) { padding: 0; } }
	:host([sm-padding="2"]) .container { @media (max-width: ${smMax}) { padding: var(--primitives-space-2); } }
	:host([sm-padding="4"]) .container { @media (max-width: ${smMax}) { padding: var(--primitives-space-4); } }
	:host([sm-padding="6"]) .container { @media (max-width: ${smMax}) { padding: var(--primitives-space-6); } }
	:host([sm-padding="8"]) .container { @media (max-width: ${smMax}) { padding: var(--primitives-space-8); } }
	:host([sm-padding="10"]) .container { @media (max-width: ${smMax}) { padding: var(--primitives-space-10); } }
	:host([sm-padding="12"]) .container { @media (max-width: ${smMax}) { padding: var(--primitives-space-12); } }
	:host([sm-padding="16"]) .container { @media (max-width: ${smMax}) { padding: var(--primitives-space-16); } }
	:host([sm-padding="20"]) .container { @media (max-width: ${smMax}) { padding: var(--primitives-space-20); } }
	:host([sm-padding="24"]) .container { @media (max-width: ${smMax}) { padding: var(--primitives-space-24); } }
	:host([sm-padding="28"]) .container { @media (max-width: ${smMax}) { padding: var(--primitives-space-28); } }
	:host([sm-padding="32"]) .container { @media (max-width: ${smMax}) { padding: var(--primitives-space-32); } }
	:host([sm-padding="40"]) .container { @media (max-width: ${smMax}) { padding: var(--primitives-space-40); } }
	:host([sm-padding="44"]) .container { @media (max-width: ${smMax}) { padding: var(--primitives-space-44); } }
	:host([sm-padding="48"]) .container { @media (max-width: ${smMax}) { padding: var(--primitives-space-48); } }
	:host([sm-padding="56"]) .container { @media (max-width: ${smMax}) { padding: var(--primitives-space-56); } }
	:host([sm-padding="64"]) .container { @media (max-width: ${smMax}) { padding: var(--primitives-space-64); } }
	:host([sm-padding="80"]) .container { @media (max-width: ${smMax}) { padding: var(--primitives-space-80); } }
	:host([sm-padding="96"]) .container { @media (max-width: ${smMax}) { padding: var(--primitives-space-96); } }


	/* # Padding — md viewport */

	:host([md-padding="0"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: 0; } }
	:host([md-padding="2"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-2); } }
	:host([md-padding="4"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-4); } }
	:host([md-padding="6"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-6); } }
	:host([md-padding="8"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-8); } }
	:host([md-padding="10"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-10); } }
	:host([md-padding="12"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-12); } }
	:host([md-padding="16"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-16); } }
	:host([md-padding="20"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-20); } }
	:host([md-padding="24"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-24); } }
	:host([md-padding="28"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-28); } }
	:host([md-padding="32"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-32); } }
	:host([md-padding="40"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-40); } }
	:host([md-padding="44"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-44); } }
	:host([md-padding="48"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-48); } }
	:host([md-padding="56"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-56); } }
	:host([md-padding="64"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-64); } }
	:host([md-padding="80"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-80); } }
	:host([md-padding="96"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-96); } }


	/* # Padding — lg viewport */

	:host([lg-padding="0"]) .container { @media (min-width: ${lgMin}) { padding: 0; } }
	:host([lg-padding="2"]) .container { @media (min-width: ${lgMin}) { padding: var(--primitives-space-2); } }
	:host([lg-padding="4"]) .container { @media (min-width: ${lgMin}) { padding: var(--primitives-space-4); } }
	:host([lg-padding="6"]) .container { @media (min-width: ${lgMin}) { padding: var(--primitives-space-6); } }
	:host([lg-padding="8"]) .container { @media (min-width: ${lgMin}) { padding: var(--primitives-space-8); } }
	:host([lg-padding="10"]) .container { @media (min-width: ${lgMin}) { padding: var(--primitives-space-10); } }
	:host([lg-padding="12"]) .container { @media (min-width: ${lgMin}) { padding: var(--primitives-space-12); } }
	:host([lg-padding="16"]) .container { @media (min-width: ${lgMin}) { padding: var(--primitives-space-16); } }
	:host([lg-padding="20"]) .container { @media (min-width: ${lgMin}) { padding: var(--primitives-space-20); } }
	:host([lg-padding="24"]) .container { @media (min-width: ${lgMin}) { padding: var(--primitives-space-24); } }
	:host([lg-padding="28"]) .container { @media (min-width: ${lgMin}) { padding: var(--primitives-space-28); } }
	:host([lg-padding="32"]) .container { @media (min-width: ${lgMin}) { padding: var(--primitives-space-32); } }
	:host([lg-padding="40"]) .container { @media (min-width: ${lgMin}) { padding: var(--primitives-space-40); } }
	:host([lg-padding="44"]) .container { @media (min-width: ${lgMin}) { padding: var(--primitives-space-44); } }
	:host([lg-padding="48"]) .container { @media (min-width: ${lgMin}) { padding: var(--primitives-space-48); } }
	:host([lg-padding="56"]) .container { @media (min-width: ${lgMin}) { padding: var(--primitives-space-56); } }
	:host([lg-padding="64"]) .container { @media (min-width: ${lgMin}) { padding: var(--primitives-space-64); } }
	:host([lg-padding="80"]) .container { @media (min-width: ${lgMin}) { padding: var(--primitives-space-80); } }
	:host([lg-padding="96"]) .container { @media (min-width: ${lgMin}) { padding: var(--primitives-space-96); } }


	/* # Padding — sm container */

	:host([layout-area-sm-padding="0"]) .container { @container layout-area (max-width: ${smMax}) { padding: 0; } }
	:host([layout-area-sm-padding="2"]) .container { @container layout-area (max-width: ${smMax}) { padding: var(--primitives-space-2); } }
	:host([layout-area-sm-padding="4"]) .container { @container layout-area (max-width: ${smMax}) { padding: var(--primitives-space-4); } }
	:host([layout-area-sm-padding="6"]) .container { @container layout-area (max-width: ${smMax}) { padding: var(--primitives-space-6); } }
	:host([layout-area-sm-padding="8"]) .container { @container layout-area (max-width: ${smMax}) { padding: var(--primitives-space-8); } }
	:host([layout-area-sm-padding="10"]) .container { @container layout-area (max-width: ${smMax}) { padding: var(--primitives-space-10); } }
	:host([layout-area-sm-padding="12"]) .container { @container layout-area (max-width: ${smMax}) { padding: var(--primitives-space-12); } }
	:host([layout-area-sm-padding="16"]) .container { @container layout-area (max-width: ${smMax}) { padding: var(--primitives-space-16); } }
	:host([layout-area-sm-padding="20"]) .container { @container layout-area (max-width: ${smMax}) { padding: var(--primitives-space-20); } }
	:host([layout-area-sm-padding="24"]) .container { @container layout-area (max-width: ${smMax}) { padding: var(--primitives-space-24); } }
	:host([layout-area-sm-padding="28"]) .container { @container layout-area (max-width: ${smMax}) { padding: var(--primitives-space-28); } }
	:host([layout-area-sm-padding="32"]) .container { @container layout-area (max-width: ${smMax}) { padding: var(--primitives-space-32); } }
	:host([layout-area-sm-padding="40"]) .container { @container layout-area (max-width: ${smMax}) { padding: var(--primitives-space-40); } }
	:host([layout-area-sm-padding="44"]) .container { @container layout-area (max-width: ${smMax}) { padding: var(--primitives-space-44); } }
	:host([layout-area-sm-padding="48"]) .container { @container layout-area (max-width: ${smMax}) { padding: var(--primitives-space-48); } }
	:host([layout-area-sm-padding="56"]) .container { @container layout-area (max-width: ${smMax}) { padding: var(--primitives-space-56); } }
	:host([layout-area-sm-padding="64"]) .container { @container layout-area (max-width: ${smMax}) { padding: var(--primitives-space-64); } }
	:host([layout-area-sm-padding="80"]) .container { @container layout-area (max-width: ${smMax}) { padding: var(--primitives-space-80); } }
	:host([layout-area-sm-padding="96"]) .container { @container layout-area (max-width: ${smMax}) { padding: var(--primitives-space-96); } }


	/* # Padding — md container */

	:host([layout-area-md-padding="0"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: 0; } }
	:host([layout-area-md-padding="2"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-2); } }
	:host([layout-area-md-padding="4"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-4); } }
	:host([layout-area-md-padding="6"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-6); } }
	:host([layout-area-md-padding="8"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-8); } }
	:host([layout-area-md-padding="10"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-10); } }
	:host([layout-area-md-padding="12"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-12); } }
	:host([layout-area-md-padding="16"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-16); } }
	:host([layout-area-md-padding="20"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-20); } }
	:host([layout-area-md-padding="24"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-24); } }
	:host([layout-area-md-padding="28"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-28); } }
	:host([layout-area-md-padding="32"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-32); } }
	:host([layout-area-md-padding="40"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-40); } }
	:host([layout-area-md-padding="44"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-44); } }
	:host([layout-area-md-padding="48"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-48); } }
	:host([layout-area-md-padding="56"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-56); } }
	:host([layout-area-md-padding="64"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-64); } }
	:host([layout-area-md-padding="80"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-80); } }
	:host([layout-area-md-padding="96"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding: var(--primitives-space-96); } }


	/* # Padding — lg container */

	:host([layout-area-lg-padding="0"]) .container { @container layout-area (min-width: ${lgMin}) { padding: 0; } }
	:host([layout-area-lg-padding="2"]) .container { @container layout-area (min-width: ${lgMin}) { padding: var(--primitives-space-2); } }
	:host([layout-area-lg-padding="4"]) .container { @container layout-area (min-width: ${lgMin}) { padding: var(--primitives-space-4); } }
	:host([layout-area-lg-padding="6"]) .container { @container layout-area (min-width: ${lgMin}) { padding: var(--primitives-space-6); } }
	:host([layout-area-lg-padding="8"]) .container { @container layout-area (min-width: ${lgMin}) { padding: var(--primitives-space-8); } }
	:host([layout-area-lg-padding="10"]) .container { @container layout-area (min-width: ${lgMin}) { padding: var(--primitives-space-10); } }
	:host([layout-area-lg-padding="12"]) .container { @container layout-area (min-width: ${lgMin}) { padding: var(--primitives-space-12); } }
	:host([layout-area-lg-padding="16"]) .container { @container layout-area (min-width: ${lgMin}) { padding: var(--primitives-space-16); } }
	:host([layout-area-lg-padding="20"]) .container { @container layout-area (min-width: ${lgMin}) { padding: var(--primitives-space-20); } }
	:host([layout-area-lg-padding="24"]) .container { @container layout-area (min-width: ${lgMin}) { padding: var(--primitives-space-24); } }
	:host([layout-area-lg-padding="28"]) .container { @container layout-area (min-width: ${lgMin}) { padding: var(--primitives-space-28); } }
	:host([layout-area-lg-padding="32"]) .container { @container layout-area (min-width: ${lgMin}) { padding: var(--primitives-space-32); } }
	:host([layout-area-lg-padding="40"]) .container { @container layout-area (min-width: ${lgMin}) { padding: var(--primitives-space-40); } }
	:host([layout-area-lg-padding="44"]) .container { @container layout-area (min-width: ${lgMin}) { padding: var(--primitives-space-44); } }
	:host([layout-area-lg-padding="48"]) .container { @container layout-area (min-width: ${lgMin}) { padding: var(--primitives-space-48); } }
	:host([layout-area-lg-padding="56"]) .container { @container layout-area (min-width: ${lgMin}) { padding: var(--primitives-space-56); } }
	:host([layout-area-lg-padding="64"]) .container { @container layout-area (min-width: ${lgMin}) { padding: var(--primitives-space-64); } }
	:host([layout-area-lg-padding="80"]) .container { @container layout-area (min-width: ${lgMin}) { padding: var(--primitives-space-80); } }
	:host([layout-area-lg-padding="96"]) .container { @container layout-area (min-width: ${lgMin}) { padding: var(--primitives-space-96); } }


	/* # Padding Inline — base */

	:host([padding-inline="0"]) .container { padding-inline: 0; }
	:host([padding-inline="2"]) .container { padding-inline: var(--primitives-space-2); }
	:host([padding-inline="4"]) .container { padding-inline: var(--primitives-space-4); }
	:host([padding-inline="6"]) .container { padding-inline: var(--primitives-space-6); }
	:host([padding-inline="8"]) .container { padding-inline: var(--primitives-space-8); }
	:host([padding-inline="10"]) .container { padding-inline: var(--primitives-space-10); }
	:host([padding-inline="12"]) .container { padding-inline: var(--primitives-space-12); }
	:host([padding-inline="16"]) .container { padding-inline: var(--primitives-space-16); }
	:host([padding-inline="20"]) .container { padding-inline: var(--primitives-space-20); }
	:host([padding-inline="24"]) .container { padding-inline: var(--primitives-space-24); }
	:host([padding-inline="28"]) .container { padding-inline: var(--primitives-space-28); }
	:host([padding-inline="32"]) .container { padding-inline: var(--primitives-space-32); }
	:host([padding-inline="40"]) .container { padding-inline: var(--primitives-space-40); }
	:host([padding-inline="44"]) .container { padding-inline: var(--primitives-space-44); }
	:host([padding-inline="48"]) .container { padding-inline: var(--primitives-space-48); }
	:host([padding-inline="56"]) .container { padding-inline: var(--primitives-space-56); }
	:host([padding-inline="64"]) .container { padding-inline: var(--primitives-space-64); }
	:host([padding-inline="80"]) .container { padding-inline: var(--primitives-space-80); }
	:host([padding-inline="96"]) .container { padding-inline: var(--primitives-space-96); }


	/* # Padding Inline — sm viewport */

	:host([sm-padding-inline="0"]) .container { @media (max-width: ${smMax}) { padding-inline: 0; } }
	:host([sm-padding-inline="2"]) .container { @media (max-width: ${smMax}) { padding-inline: var(--primitives-space-2); } }
	:host([sm-padding-inline="4"]) .container { @media (max-width: ${smMax}) { padding-inline: var(--primitives-space-4); } }
	:host([sm-padding-inline="6"]) .container { @media (max-width: ${smMax}) { padding-inline: var(--primitives-space-6); } }
	:host([sm-padding-inline="8"]) .container { @media (max-width: ${smMax}) { padding-inline: var(--primitives-space-8); } }
	:host([sm-padding-inline="10"]) .container { @media (max-width: ${smMax}) { padding-inline: var(--primitives-space-10); } }
	:host([sm-padding-inline="12"]) .container { @media (max-width: ${smMax}) { padding-inline: var(--primitives-space-12); } }
	:host([sm-padding-inline="16"]) .container { @media (max-width: ${smMax}) { padding-inline: var(--primitives-space-16); } }
	:host([sm-padding-inline="20"]) .container { @media (max-width: ${smMax}) { padding-inline: var(--primitives-space-20); } }
	:host([sm-padding-inline="24"]) .container { @media (max-width: ${smMax}) { padding-inline: var(--primitives-space-24); } }
	:host([sm-padding-inline="28"]) .container { @media (max-width: ${smMax}) { padding-inline: var(--primitives-space-28); } }
	:host([sm-padding-inline="32"]) .container { @media (max-width: ${smMax}) { padding-inline: var(--primitives-space-32); } }
	:host([sm-padding-inline="40"]) .container { @media (max-width: ${smMax}) { padding-inline: var(--primitives-space-40); } }
	:host([sm-padding-inline="44"]) .container { @media (max-width: ${smMax}) { padding-inline: var(--primitives-space-44); } }
	:host([sm-padding-inline="48"]) .container { @media (max-width: ${smMax}) { padding-inline: var(--primitives-space-48); } }
	:host([sm-padding-inline="56"]) .container { @media (max-width: ${smMax}) { padding-inline: var(--primitives-space-56); } }
	:host([sm-padding-inline="64"]) .container { @media (max-width: ${smMax}) { padding-inline: var(--primitives-space-64); } }
	:host([sm-padding-inline="80"]) .container { @media (max-width: ${smMax}) { padding-inline: var(--primitives-space-80); } }
	:host([sm-padding-inline="96"]) .container { @media (max-width: ${smMax}) { padding-inline: var(--primitives-space-96); } }


	/* # Padding Inline — md viewport */

	:host([md-padding-inline="0"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: 0; } }
	:host([md-padding-inline="2"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-2); } }
	:host([md-padding-inline="4"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-4); } }
	:host([md-padding-inline="6"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-6); } }
	:host([md-padding-inline="8"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-8); } }
	:host([md-padding-inline="10"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-10); } }
	:host([md-padding-inline="12"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-12); } }
	:host([md-padding-inline="16"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-16); } }
	:host([md-padding-inline="20"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-20); } }
	:host([md-padding-inline="24"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-24); } }
	:host([md-padding-inline="28"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-28); } }
	:host([md-padding-inline="32"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-32); } }
	:host([md-padding-inline="40"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-40); } }
	:host([md-padding-inline="44"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-44); } }
	:host([md-padding-inline="48"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-48); } }
	:host([md-padding-inline="56"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-56); } }
	:host([md-padding-inline="64"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-64); } }
	:host([md-padding-inline="80"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-80); } }
	:host([md-padding-inline="96"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-96); } }


	/* # Padding Inline — lg viewport */

	:host([lg-padding-inline="0"]) .container { @media (min-width: ${lgMin}) { padding-inline: 0; } }
	:host([lg-padding-inline="2"]) .container { @media (min-width: ${lgMin}) { padding-inline: var(--primitives-space-2); } }
	:host([lg-padding-inline="4"]) .container { @media (min-width: ${lgMin}) { padding-inline: var(--primitives-space-4); } }
	:host([lg-padding-inline="6"]) .container { @media (min-width: ${lgMin}) { padding-inline: var(--primitives-space-6); } }
	:host([lg-padding-inline="8"]) .container { @media (min-width: ${lgMin}) { padding-inline: var(--primitives-space-8); } }
	:host([lg-padding-inline="10"]) .container { @media (min-width: ${lgMin}) { padding-inline: var(--primitives-space-10); } }
	:host([lg-padding-inline="12"]) .container { @media (min-width: ${lgMin}) { padding-inline: var(--primitives-space-12); } }
	:host([lg-padding-inline="16"]) .container { @media (min-width: ${lgMin}) { padding-inline: var(--primitives-space-16); } }
	:host([lg-padding-inline="20"]) .container { @media (min-width: ${lgMin}) { padding-inline: var(--primitives-space-20); } }
	:host([lg-padding-inline="24"]) .container { @media (min-width: ${lgMin}) { padding-inline: var(--primitives-space-24); } }
	:host([lg-padding-inline="28"]) .container { @media (min-width: ${lgMin}) { padding-inline: var(--primitives-space-28); } }
	:host([lg-padding-inline="32"]) .container { @media (min-width: ${lgMin}) { padding-inline: var(--primitives-space-32); } }
	:host([lg-padding-inline="40"]) .container { @media (min-width: ${lgMin}) { padding-inline: var(--primitives-space-40); } }
	:host([lg-padding-inline="44"]) .container { @media (min-width: ${lgMin}) { padding-inline: var(--primitives-space-44); } }
	:host([lg-padding-inline="48"]) .container { @media (min-width: ${lgMin}) { padding-inline: var(--primitives-space-48); } }
	:host([lg-padding-inline="56"]) .container { @media (min-width: ${lgMin}) { padding-inline: var(--primitives-space-56); } }
	:host([lg-padding-inline="64"]) .container { @media (min-width: ${lgMin}) { padding-inline: var(--primitives-space-64); } }
	:host([lg-padding-inline="80"]) .container { @media (min-width: ${lgMin}) { padding-inline: var(--primitives-space-80); } }
	:host([lg-padding-inline="96"]) .container { @media (min-width: ${lgMin}) { padding-inline: var(--primitives-space-96); } }


	/* # Padding Inline — sm container */

	:host([layout-area-sm-padding-inline="0"]) .container { @container layout-area (max-width: ${smMax}) { padding-inline: 0; } }
	:host([layout-area-sm-padding-inline="2"]) .container { @container layout-area (max-width: ${smMax}) { padding-inline: var(--primitives-space-2); } }
	:host([layout-area-sm-padding-inline="4"]) .container { @container layout-area (max-width: ${smMax}) { padding-inline: var(--primitives-space-4); } }
	:host([layout-area-sm-padding-inline="6"]) .container { @container layout-area (max-width: ${smMax}) { padding-inline: var(--primitives-space-6); } }
	:host([layout-area-sm-padding-inline="8"]) .container { @container layout-area (max-width: ${smMax}) { padding-inline: var(--primitives-space-8); } }
	:host([layout-area-sm-padding-inline="10"]) .container { @container layout-area (max-width: ${smMax}) { padding-inline: var(--primitives-space-10); } }
	:host([layout-area-sm-padding-inline="12"]) .container { @container layout-area (max-width: ${smMax}) { padding-inline: var(--primitives-space-12); } }
	:host([layout-area-sm-padding-inline="16"]) .container { @container layout-area (max-width: ${smMax}) { padding-inline: var(--primitives-space-16); } }
	:host([layout-area-sm-padding-inline="20"]) .container { @container layout-area (max-width: ${smMax}) { padding-inline: var(--primitives-space-20); } }
	:host([layout-area-sm-padding-inline="24"]) .container { @container layout-area (max-width: ${smMax}) { padding-inline: var(--primitives-space-24); } }
	:host([layout-area-sm-padding-inline="28"]) .container { @container layout-area (max-width: ${smMax}) { padding-inline: var(--primitives-space-28); } }
	:host([layout-area-sm-padding-inline="32"]) .container { @container layout-area (max-width: ${smMax}) { padding-inline: var(--primitives-space-32); } }
	:host([layout-area-sm-padding-inline="40"]) .container { @container layout-area (max-width: ${smMax}) { padding-inline: var(--primitives-space-40); } }
	:host([layout-area-sm-padding-inline="44"]) .container { @container layout-area (max-width: ${smMax}) { padding-inline: var(--primitives-space-44); } }
	:host([layout-area-sm-padding-inline="48"]) .container { @container layout-area (max-width: ${smMax}) { padding-inline: var(--primitives-space-48); } }
	:host([layout-area-sm-padding-inline="56"]) .container { @container layout-area (max-width: ${smMax}) { padding-inline: var(--primitives-space-56); } }
	:host([layout-area-sm-padding-inline="64"]) .container { @container layout-area (max-width: ${smMax}) { padding-inline: var(--primitives-space-64); } }
	:host([layout-area-sm-padding-inline="80"]) .container { @container layout-area (max-width: ${smMax}) { padding-inline: var(--primitives-space-80); } }
	:host([layout-area-sm-padding-inline="96"]) .container { @container layout-area (max-width: ${smMax}) { padding-inline: var(--primitives-space-96); } }


	/* # Padding Inline — md container */

	:host([layout-area-md-padding-inline="0"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: 0; } }
	:host([layout-area-md-padding-inline="2"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-2); } }
	:host([layout-area-md-padding-inline="4"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-4); } }
	:host([layout-area-md-padding-inline="6"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-6); } }
	:host([layout-area-md-padding-inline="8"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-8); } }
	:host([layout-area-md-padding-inline="10"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-10); } }
	:host([layout-area-md-padding-inline="12"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-12); } }
	:host([layout-area-md-padding-inline="16"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-16); } }
	:host([layout-area-md-padding-inline="20"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-20); } }
	:host([layout-area-md-padding-inline="24"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-24); } }
	:host([layout-area-md-padding-inline="28"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-28); } }
	:host([layout-area-md-padding-inline="32"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-32); } }
	:host([layout-area-md-padding-inline="40"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-40); } }
	:host([layout-area-md-padding-inline="44"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-44); } }
	:host([layout-area-md-padding-inline="48"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-48); } }
	:host([layout-area-md-padding-inline="56"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-56); } }
	:host([layout-area-md-padding-inline="64"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-64); } }
	:host([layout-area-md-padding-inline="80"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-80); } }
	:host([layout-area-md-padding-inline="96"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-inline: var(--primitives-space-96); } }


	/* # Padding Inline — lg container */

	:host([layout-area-lg-padding-inline="0"]) .container { @container layout-area (min-width: ${lgMin}) { padding-inline: 0; } }
	:host([layout-area-lg-padding-inline="2"]) .container { @container layout-area (min-width: ${lgMin}) { padding-inline: var(--primitives-space-2); } }
	:host([layout-area-lg-padding-inline="4"]) .container { @container layout-area (min-width: ${lgMin}) { padding-inline: var(--primitives-space-4); } }
	:host([layout-area-lg-padding-inline="6"]) .container { @container layout-area (min-width: ${lgMin}) { padding-inline: var(--primitives-space-6); } }
	:host([layout-area-lg-padding-inline="8"]) .container { @container layout-area (min-width: ${lgMin}) { padding-inline: var(--primitives-space-8); } }
	:host([layout-area-lg-padding-inline="10"]) .container { @container layout-area (min-width: ${lgMin}) { padding-inline: var(--primitives-space-10); } }
	:host([layout-area-lg-padding-inline="12"]) .container { @container layout-area (min-width: ${lgMin}) { padding-inline: var(--primitives-space-12); } }
	:host([layout-area-lg-padding-inline="16"]) .container { @container layout-area (min-width: ${lgMin}) { padding-inline: var(--primitives-space-16); } }
	:host([layout-area-lg-padding-inline="20"]) .container { @container layout-area (min-width: ${lgMin}) { padding-inline: var(--primitives-space-20); } }
	:host([layout-area-lg-padding-inline="24"]) .container { @container layout-area (min-width: ${lgMin}) { padding-inline: var(--primitives-space-24); } }
	:host([layout-area-lg-padding-inline="28"]) .container { @container layout-area (min-width: ${lgMin}) { padding-inline: var(--primitives-space-28); } }
	:host([layout-area-lg-padding-inline="32"]) .container { @container layout-area (min-width: ${lgMin}) { padding-inline: var(--primitives-space-32); } }
	:host([layout-area-lg-padding-inline="40"]) .container { @container layout-area (min-width: ${lgMin}) { padding-inline: var(--primitives-space-40); } }
	:host([layout-area-lg-padding-inline="44"]) .container { @container layout-area (min-width: ${lgMin}) { padding-inline: var(--primitives-space-44); } }
	:host([layout-area-lg-padding-inline="48"]) .container { @container layout-area (min-width: ${lgMin}) { padding-inline: var(--primitives-space-48); } }
	:host([layout-area-lg-padding-inline="56"]) .container { @container layout-area (min-width: ${lgMin}) { padding-inline: var(--primitives-space-56); } }
	:host([layout-area-lg-padding-inline="64"]) .container { @container layout-area (min-width: ${lgMin}) { padding-inline: var(--primitives-space-64); } }
	:host([layout-area-lg-padding-inline="80"]) .container { @container layout-area (min-width: ${lgMin}) { padding-inline: var(--primitives-space-80); } }
	:host([layout-area-lg-padding-inline="96"]) .container { @container layout-area (min-width: ${lgMin}) { padding-inline: var(--primitives-space-96); } }


	/* # Padding Block — base */

	:host([padding-block="0"]) .container { padding-block: 0; }
	:host([padding-block="2"]) .container { padding-block: var(--primitives-space-2); }
	:host([padding-block="4"]) .container { padding-block: var(--primitives-space-4); }
	:host([padding-block="6"]) .container { padding-block: var(--primitives-space-6); }
	:host([padding-block="8"]) .container { padding-block: var(--primitives-space-8); }
	:host([padding-block="10"]) .container { padding-block: var(--primitives-space-10); }
	:host([padding-block="12"]) .container { padding-block: var(--primitives-space-12); }
	:host([padding-block="16"]) .container { padding-block: var(--primitives-space-16); }
	:host([padding-block="20"]) .container { padding-block: var(--primitives-space-20); }
	:host([padding-block="24"]) .container { padding-block: var(--primitives-space-24); }
	:host([padding-block="28"]) .container { padding-block: var(--primitives-space-28); }
	:host([padding-block="32"]) .container { padding-block: var(--primitives-space-32); }
	:host([padding-block="40"]) .container { padding-block: var(--primitives-space-40); }
	:host([padding-block="44"]) .container { padding-block: var(--primitives-space-44); }
	:host([padding-block="48"]) .container { padding-block: var(--primitives-space-48); }
	:host([padding-block="56"]) .container { padding-block: var(--primitives-space-56); }
	:host([padding-block="64"]) .container { padding-block: var(--primitives-space-64); }
	:host([padding-block="80"]) .container { padding-block: var(--primitives-space-80); }
	:host([padding-block="96"]) .container { padding-block: var(--primitives-space-96); }


	/* # Padding Block — sm viewport */

	:host([sm-padding-block="0"]) .container { @media (max-width: ${smMax}) { padding-block: 0; } }
	:host([sm-padding-block="2"]) .container { @media (max-width: ${smMax}) { padding-block: var(--primitives-space-2); } }
	:host([sm-padding-block="4"]) .container { @media (max-width: ${smMax}) { padding-block: var(--primitives-space-4); } }
	:host([sm-padding-block="6"]) .container { @media (max-width: ${smMax}) { padding-block: var(--primitives-space-6); } }
	:host([sm-padding-block="8"]) .container { @media (max-width: ${smMax}) { padding-block: var(--primitives-space-8); } }
	:host([sm-padding-block="10"]) .container { @media (max-width: ${smMax}) { padding-block: var(--primitives-space-10); } }
	:host([sm-padding-block="12"]) .container { @media (max-width: ${smMax}) { padding-block: var(--primitives-space-12); } }
	:host([sm-padding-block="16"]) .container { @media (max-width: ${smMax}) { padding-block: var(--primitives-space-16); } }
	:host([sm-padding-block="20"]) .container { @media (max-width: ${smMax}) { padding-block: var(--primitives-space-20); } }
	:host([sm-padding-block="24"]) .container { @media (max-width: ${smMax}) { padding-block: var(--primitives-space-24); } }
	:host([sm-padding-block="28"]) .container { @media (max-width: ${smMax}) { padding-block: var(--primitives-space-28); } }
	:host([sm-padding-block="32"]) .container { @media (max-width: ${smMax}) { padding-block: var(--primitives-space-32); } }
	:host([sm-padding-block="40"]) .container { @media (max-width: ${smMax}) { padding-block: var(--primitives-space-40); } }
	:host([sm-padding-block="44"]) .container { @media (max-width: ${smMax}) { padding-block: var(--primitives-space-44); } }
	:host([sm-padding-block="48"]) .container { @media (max-width: ${smMax}) { padding-block: var(--primitives-space-48); } }
	:host([sm-padding-block="56"]) .container { @media (max-width: ${smMax}) { padding-block: var(--primitives-space-56); } }
	:host([sm-padding-block="64"]) .container { @media (max-width: ${smMax}) { padding-block: var(--primitives-space-64); } }
	:host([sm-padding-block="80"]) .container { @media (max-width: ${smMax}) { padding-block: var(--primitives-space-80); } }
	:host([sm-padding-block="96"]) .container { @media (max-width: ${smMax}) { padding-block: var(--primitives-space-96); } }


	/* # Padding Block — md viewport */

	:host([md-padding-block="0"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: 0; } }
	:host([md-padding-block="2"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-2); } }
	:host([md-padding-block="4"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-4); } }
	:host([md-padding-block="6"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-6); } }
	:host([md-padding-block="8"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-8); } }
	:host([md-padding-block="10"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-10); } }
	:host([md-padding-block="12"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-12); } }
	:host([md-padding-block="16"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-16); } }
	:host([md-padding-block="20"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-20); } }
	:host([md-padding-block="24"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-24); } }
	:host([md-padding-block="28"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-28); } }
	:host([md-padding-block="32"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-32); } }
	:host([md-padding-block="40"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-40); } }
	:host([md-padding-block="44"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-44); } }
	:host([md-padding-block="48"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-48); } }
	:host([md-padding-block="56"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-56); } }
	:host([md-padding-block="64"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-64); } }
	:host([md-padding-block="80"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-80); } }
	:host([md-padding-block="96"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-96); } }


	/* # Padding Block — lg viewport */

	:host([lg-padding-block="0"]) .container { @media (min-width: ${lgMin}) { padding-block: 0; } }
	:host([lg-padding-block="2"]) .container { @media (min-width: ${lgMin}) { padding-block: var(--primitives-space-2); } }
	:host([lg-padding-block="4"]) .container { @media (min-width: ${lgMin}) { padding-block: var(--primitives-space-4); } }
	:host([lg-padding-block="6"]) .container { @media (min-width: ${lgMin}) { padding-block: var(--primitives-space-6); } }
	:host([lg-padding-block="8"]) .container { @media (min-width: ${lgMin}) { padding-block: var(--primitives-space-8); } }
	:host([lg-padding-block="10"]) .container { @media (min-width: ${lgMin}) { padding-block: var(--primitives-space-10); } }
	:host([lg-padding-block="12"]) .container { @media (min-width: ${lgMin}) { padding-block: var(--primitives-space-12); } }
	:host([lg-padding-block="16"]) .container { @media (min-width: ${lgMin}) { padding-block: var(--primitives-space-16); } }
	:host([lg-padding-block="20"]) .container { @media (min-width: ${lgMin}) { padding-block: var(--primitives-space-20); } }
	:host([lg-padding-block="24"]) .container { @media (min-width: ${lgMin}) { padding-block: var(--primitives-space-24); } }
	:host([lg-padding-block="28"]) .container { @media (min-width: ${lgMin}) { padding-block: var(--primitives-space-28); } }
	:host([lg-padding-block="32"]) .container { @media (min-width: ${lgMin}) { padding-block: var(--primitives-space-32); } }
	:host([lg-padding-block="40"]) .container { @media (min-width: ${lgMin}) { padding-block: var(--primitives-space-40); } }
	:host([lg-padding-block="44"]) .container { @media (min-width: ${lgMin}) { padding-block: var(--primitives-space-44); } }
	:host([lg-padding-block="48"]) .container { @media (min-width: ${lgMin}) { padding-block: var(--primitives-space-48); } }
	:host([lg-padding-block="56"]) .container { @media (min-width: ${lgMin}) { padding-block: var(--primitives-space-56); } }
	:host([lg-padding-block="64"]) .container { @media (min-width: ${lgMin}) { padding-block: var(--primitives-space-64); } }
	:host([lg-padding-block="80"]) .container { @media (min-width: ${lgMin}) { padding-block: var(--primitives-space-80); } }
	:host([lg-padding-block="96"]) .container { @media (min-width: ${lgMin}) { padding-block: var(--primitives-space-96); } }


	/* # Padding Block — sm container */

	:host([layout-area-sm-padding-block="0"]) .container { @container layout-area (max-width: ${smMax}) { padding-block: 0; } }
	:host([layout-area-sm-padding-block="2"]) .container { @container layout-area (max-width: ${smMax}) { padding-block: var(--primitives-space-2); } }
	:host([layout-area-sm-padding-block="4"]) .container { @container layout-area (max-width: ${smMax}) { padding-block: var(--primitives-space-4); } }
	:host([layout-area-sm-padding-block="6"]) .container { @container layout-area (max-width: ${smMax}) { padding-block: var(--primitives-space-6); } }
	:host([layout-area-sm-padding-block="8"]) .container { @container layout-area (max-width: ${smMax}) { padding-block: var(--primitives-space-8); } }
	:host([layout-area-sm-padding-block="10"]) .container { @container layout-area (max-width: ${smMax}) { padding-block: var(--primitives-space-10); } }
	:host([layout-area-sm-padding-block="12"]) .container { @container layout-area (max-width: ${smMax}) { padding-block: var(--primitives-space-12); } }
	:host([layout-area-sm-padding-block="16"]) .container { @container layout-area (max-width: ${smMax}) { padding-block: var(--primitives-space-16); } }
	:host([layout-area-sm-padding-block="20"]) .container { @container layout-area (max-width: ${smMax}) { padding-block: var(--primitives-space-20); } }
	:host([layout-area-sm-padding-block="24"]) .container { @container layout-area (max-width: ${smMax}) { padding-block: var(--primitives-space-24); } }
	:host([layout-area-sm-padding-block="28"]) .container { @container layout-area (max-width: ${smMax}) { padding-block: var(--primitives-space-28); } }
	:host([layout-area-sm-padding-block="32"]) .container { @container layout-area (max-width: ${smMax}) { padding-block: var(--primitives-space-32); } }
	:host([layout-area-sm-padding-block="40"]) .container { @container layout-area (max-width: ${smMax}) { padding-block: var(--primitives-space-40); } }
	:host([layout-area-sm-padding-block="44"]) .container { @container layout-area (max-width: ${smMax}) { padding-block: var(--primitives-space-44); } }
	:host([layout-area-sm-padding-block="48"]) .container { @container layout-area (max-width: ${smMax}) { padding-block: var(--primitives-space-48); } }
	:host([layout-area-sm-padding-block="56"]) .container { @container layout-area (max-width: ${smMax}) { padding-block: var(--primitives-space-56); } }
	:host([layout-area-sm-padding-block="64"]) .container { @container layout-area (max-width: ${smMax}) { padding-block: var(--primitives-space-64); } }
	:host([layout-area-sm-padding-block="80"]) .container { @container layout-area (max-width: ${smMax}) { padding-block: var(--primitives-space-80); } }
	:host([layout-area-sm-padding-block="96"]) .container { @container layout-area (max-width: ${smMax}) { padding-block: var(--primitives-space-96); } }


	/* # Padding Block — md container */

	:host([layout-area-md-padding-block="0"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: 0; } }
	:host([layout-area-md-padding-block="2"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-2); } }
	:host([layout-area-md-padding-block="4"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-4); } }
	:host([layout-area-md-padding-block="6"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-6); } }
	:host([layout-area-md-padding-block="8"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-8); } }
	:host([layout-area-md-padding-block="10"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-10); } }
	:host([layout-area-md-padding-block="12"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-12); } }
	:host([layout-area-md-padding-block="16"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-16); } }
	:host([layout-area-md-padding-block="20"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-20); } }
	:host([layout-area-md-padding-block="24"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-24); } }
	:host([layout-area-md-padding-block="28"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-28); } }
	:host([layout-area-md-padding-block="32"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-32); } }
	:host([layout-area-md-padding-block="40"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-40); } }
	:host([layout-area-md-padding-block="44"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-44); } }
	:host([layout-area-md-padding-block="48"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-48); } }
	:host([layout-area-md-padding-block="56"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-56); } }
	:host([layout-area-md-padding-block="64"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-64); } }
	:host([layout-area-md-padding-block="80"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-80); } }
	:host([layout-area-md-padding-block="96"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-block: var(--primitives-space-96); } }


	/* # Padding Block — lg container */

	:host([layout-area-lg-padding-block="0"]) .container { @container layout-area (min-width: ${lgMin}) { padding-block: 0; } }
	:host([layout-area-lg-padding-block="2"]) .container { @container layout-area (min-width: ${lgMin}) { padding-block: var(--primitives-space-2); } }
	:host([layout-area-lg-padding-block="4"]) .container { @container layout-area (min-width: ${lgMin}) { padding-block: var(--primitives-space-4); } }
	:host([layout-area-lg-padding-block="6"]) .container { @container layout-area (min-width: ${lgMin}) { padding-block: var(--primitives-space-6); } }
	:host([layout-area-lg-padding-block="8"]) .container { @container layout-area (min-width: ${lgMin}) { padding-block: var(--primitives-space-8); } }
	:host([layout-area-lg-padding-block="10"]) .container { @container layout-area (min-width: ${lgMin}) { padding-block: var(--primitives-space-10); } }
	:host([layout-area-lg-padding-block="12"]) .container { @container layout-area (min-width: ${lgMin}) { padding-block: var(--primitives-space-12); } }
	:host([layout-area-lg-padding-block="16"]) .container { @container layout-area (min-width: ${lgMin}) { padding-block: var(--primitives-space-16); } }
	:host([layout-area-lg-padding-block="20"]) .container { @container layout-area (min-width: ${lgMin}) { padding-block: var(--primitives-space-20); } }
	:host([layout-area-lg-padding-block="24"]) .container { @container layout-area (min-width: ${lgMin}) { padding-block: var(--primitives-space-24); } }
	:host([layout-area-lg-padding-block="28"]) .container { @container layout-area (min-width: ${lgMin}) { padding-block: var(--primitives-space-28); } }
	:host([layout-area-lg-padding-block="32"]) .container { @container layout-area (min-width: ${lgMin}) { padding-block: var(--primitives-space-32); } }
	:host([layout-area-lg-padding-block="40"]) .container { @container layout-area (min-width: ${lgMin}) { padding-block: var(--primitives-space-40); } }
	:host([layout-area-lg-padding-block="44"]) .container { @container layout-area (min-width: ${lgMin}) { padding-block: var(--primitives-space-44); } }
	:host([layout-area-lg-padding-block="48"]) .container { @container layout-area (min-width: ${lgMin}) { padding-block: var(--primitives-space-48); } }
	:host([layout-area-lg-padding-block="56"]) .container { @container layout-area (min-width: ${lgMin}) { padding-block: var(--primitives-space-56); } }
	:host([layout-area-lg-padding-block="64"]) .container { @container layout-area (min-width: ${lgMin}) { padding-block: var(--primitives-space-64); } }
	:host([layout-area-lg-padding-block="80"]) .container { @container layout-area (min-width: ${lgMin}) { padding-block: var(--primitives-space-80); } }
	:host([layout-area-lg-padding-block="96"]) .container { @container layout-area (min-width: ${lgMin}) { padding-block: var(--primitives-space-96); } }


	/* # Padding Top — base */

	:host([padding-top="0"]) .container { padding-top: 0; }
	:host([padding-top="2"]) .container { padding-top: var(--primitives-space-2); }
	:host([padding-top="4"]) .container { padding-top: var(--primitives-space-4); }
	:host([padding-top="6"]) .container { padding-top: var(--primitives-space-6); }
	:host([padding-top="8"]) .container { padding-top: var(--primitives-space-8); }
	:host([padding-top="10"]) .container { padding-top: var(--primitives-space-10); }
	:host([padding-top="12"]) .container { padding-top: var(--primitives-space-12); }
	:host([padding-top="16"]) .container { padding-top: var(--primitives-space-16); }
	:host([padding-top="20"]) .container { padding-top: var(--primitives-space-20); }
	:host([padding-top="24"]) .container { padding-top: var(--primitives-space-24); }
	:host([padding-top="28"]) .container { padding-top: var(--primitives-space-28); }
	:host([padding-top="32"]) .container { padding-top: var(--primitives-space-32); }
	:host([padding-top="40"]) .container { padding-top: var(--primitives-space-40); }
	:host([padding-top="44"]) .container { padding-top: var(--primitives-space-44); }
	:host([padding-top="48"]) .container { padding-top: var(--primitives-space-48); }
	:host([padding-top="56"]) .container { padding-top: var(--primitives-space-56); }
	:host([padding-top="64"]) .container { padding-top: var(--primitives-space-64); }
	:host([padding-top="80"]) .container { padding-top: var(--primitives-space-80); }
	:host([padding-top="96"]) .container { padding-top: var(--primitives-space-96); }


	/* # Padding Top — sm viewport */

	:host([sm-padding-top="0"]) .container { @media (max-width: ${smMax}) { padding-top: 0; } }
	:host([sm-padding-top="2"]) .container { @media (max-width: ${smMax}) { padding-top: var(--primitives-space-2); } }
	:host([sm-padding-top="4"]) .container { @media (max-width: ${smMax}) { padding-top: var(--primitives-space-4); } }
	:host([sm-padding-top="6"]) .container { @media (max-width: ${smMax}) { padding-top: var(--primitives-space-6); } }
	:host([sm-padding-top="8"]) .container { @media (max-width: ${smMax}) { padding-top: var(--primitives-space-8); } }
	:host([sm-padding-top="10"]) .container { @media (max-width: ${smMax}) { padding-top: var(--primitives-space-10); } }
	:host([sm-padding-top="12"]) .container { @media (max-width: ${smMax}) { padding-top: var(--primitives-space-12); } }
	:host([sm-padding-top="16"]) .container { @media (max-width: ${smMax}) { padding-top: var(--primitives-space-16); } }
	:host([sm-padding-top="20"]) .container { @media (max-width: ${smMax}) { padding-top: var(--primitives-space-20); } }
	:host([sm-padding-top="24"]) .container { @media (max-width: ${smMax}) { padding-top: var(--primitives-space-24); } }
	:host([sm-padding-top="28"]) .container { @media (max-width: ${smMax}) { padding-top: var(--primitives-space-28); } }
	:host([sm-padding-top="32"]) .container { @media (max-width: ${smMax}) { padding-top: var(--primitives-space-32); } }
	:host([sm-padding-top="40"]) .container { @media (max-width: ${smMax}) { padding-top: var(--primitives-space-40); } }
	:host([sm-padding-top="44"]) .container { @media (max-width: ${smMax}) { padding-top: var(--primitives-space-44); } }
	:host([sm-padding-top="48"]) .container { @media (max-width: ${smMax}) { padding-top: var(--primitives-space-48); } }
	:host([sm-padding-top="56"]) .container { @media (max-width: ${smMax}) { padding-top: var(--primitives-space-56); } }
	:host([sm-padding-top="64"]) .container { @media (max-width: ${smMax}) { padding-top: var(--primitives-space-64); } }
	:host([sm-padding-top="80"]) .container { @media (max-width: ${smMax}) { padding-top: var(--primitives-space-80); } }
	:host([sm-padding-top="96"]) .container { @media (max-width: ${smMax}) { padding-top: var(--primitives-space-96); } }


	/* # Padding Top — md viewport */

	:host([md-padding-top="0"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: 0; } }
	:host([md-padding-top="2"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-2); } }
	:host([md-padding-top="4"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-4); } }
	:host([md-padding-top="6"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-6); } }
	:host([md-padding-top="8"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-8); } }
	:host([md-padding-top="10"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-10); } }
	:host([md-padding-top="12"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-12); } }
	:host([md-padding-top="16"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-16); } }
	:host([md-padding-top="20"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-20); } }
	:host([md-padding-top="24"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-24); } }
	:host([md-padding-top="28"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-28); } }
	:host([md-padding-top="32"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-32); } }
	:host([md-padding-top="40"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-40); } }
	:host([md-padding-top="44"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-44); } }
	:host([md-padding-top="48"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-48); } }
	:host([md-padding-top="56"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-56); } }
	:host([md-padding-top="64"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-64); } }
	:host([md-padding-top="80"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-80); } }
	:host([md-padding-top="96"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-96); } }


	/* # Padding Top — lg viewport */

	:host([lg-padding-top="0"]) .container { @media (min-width: ${lgMin}) { padding-top: 0; } }
	:host([lg-padding-top="2"]) .container { @media (min-width: ${lgMin}) { padding-top: var(--primitives-space-2); } }
	:host([lg-padding-top="4"]) .container { @media (min-width: ${lgMin}) { padding-top: var(--primitives-space-4); } }
	:host([lg-padding-top="6"]) .container { @media (min-width: ${lgMin}) { padding-top: var(--primitives-space-6); } }
	:host([lg-padding-top="8"]) .container { @media (min-width: ${lgMin}) { padding-top: var(--primitives-space-8); } }
	:host([lg-padding-top="10"]) .container { @media (min-width: ${lgMin}) { padding-top: var(--primitives-space-10); } }
	:host([lg-padding-top="12"]) .container { @media (min-width: ${lgMin}) { padding-top: var(--primitives-space-12); } }
	:host([lg-padding-top="16"]) .container { @media (min-width: ${lgMin}) { padding-top: var(--primitives-space-16); } }
	:host([lg-padding-top="20"]) .container { @media (min-width: ${lgMin}) { padding-top: var(--primitives-space-20); } }
	:host([lg-padding-top="24"]) .container { @media (min-width: ${lgMin}) { padding-top: var(--primitives-space-24); } }
	:host([lg-padding-top="28"]) .container { @media (min-width: ${lgMin}) { padding-top: var(--primitives-space-28); } }
	:host([lg-padding-top="32"]) .container { @media (min-width: ${lgMin}) { padding-top: var(--primitives-space-32); } }
	:host([lg-padding-top="40"]) .container { @media (min-width: ${lgMin}) { padding-top: var(--primitives-space-40); } }
	:host([lg-padding-top="44"]) .container { @media (min-width: ${lgMin}) { padding-top: var(--primitives-space-44); } }
	:host([lg-padding-top="48"]) .container { @media (min-width: ${lgMin}) { padding-top: var(--primitives-space-48); } }
	:host([lg-padding-top="56"]) .container { @media (min-width: ${lgMin}) { padding-top: var(--primitives-space-56); } }
	:host([lg-padding-top="64"]) .container { @media (min-width: ${lgMin}) { padding-top: var(--primitives-space-64); } }
	:host([lg-padding-top="80"]) .container { @media (min-width: ${lgMin}) { padding-top: var(--primitives-space-80); } }
	:host([lg-padding-top="96"]) .container { @media (min-width: ${lgMin}) { padding-top: var(--primitives-space-96); } }


	/* # Padding Top — sm container */

	:host([layout-area-sm-padding-top="0"]) .container { @container layout-area (max-width: ${smMax}) { padding-top: 0; } }
	:host([layout-area-sm-padding-top="2"]) .container { @container layout-area (max-width: ${smMax}) { padding-top: var(--primitives-space-2); } }
	:host([layout-area-sm-padding-top="4"]) .container { @container layout-area (max-width: ${smMax}) { padding-top: var(--primitives-space-4); } }
	:host([layout-area-sm-padding-top="6"]) .container { @container layout-area (max-width: ${smMax}) { padding-top: var(--primitives-space-6); } }
	:host([layout-area-sm-padding-top="8"]) .container { @container layout-area (max-width: ${smMax}) { padding-top: var(--primitives-space-8); } }
	:host([layout-area-sm-padding-top="10"]) .container { @container layout-area (max-width: ${smMax}) { padding-top: var(--primitives-space-10); } }
	:host([layout-area-sm-padding-top="12"]) .container { @container layout-area (max-width: ${smMax}) { padding-top: var(--primitives-space-12); } }
	:host([layout-area-sm-padding-top="16"]) .container { @container layout-area (max-width: ${smMax}) { padding-top: var(--primitives-space-16); } }
	:host([layout-area-sm-padding-top="20"]) .container { @container layout-area (max-width: ${smMax}) { padding-top: var(--primitives-space-20); } }
	:host([layout-area-sm-padding-top="24"]) .container { @container layout-area (max-width: ${smMax}) { padding-top: var(--primitives-space-24); } }
	:host([layout-area-sm-padding-top="28"]) .container { @container layout-area (max-width: ${smMax}) { padding-top: var(--primitives-space-28); } }
	:host([layout-area-sm-padding-top="32"]) .container { @container layout-area (max-width: ${smMax}) { padding-top: var(--primitives-space-32); } }
	:host([layout-area-sm-padding-top="40"]) .container { @container layout-area (max-width: ${smMax}) { padding-top: var(--primitives-space-40); } }
	:host([layout-area-sm-padding-top="44"]) .container { @container layout-area (max-width: ${smMax}) { padding-top: var(--primitives-space-44); } }
	:host([layout-area-sm-padding-top="48"]) .container { @container layout-area (max-width: ${smMax}) { padding-top: var(--primitives-space-48); } }
	:host([layout-area-sm-padding-top="56"]) .container { @container layout-area (max-width: ${smMax}) { padding-top: var(--primitives-space-56); } }
	:host([layout-area-sm-padding-top="64"]) .container { @container layout-area (max-width: ${smMax}) { padding-top: var(--primitives-space-64); } }
	:host([layout-area-sm-padding-top="80"]) .container { @container layout-area (max-width: ${smMax}) { padding-top: var(--primitives-space-80); } }
	:host([layout-area-sm-padding-top="96"]) .container { @container layout-area (max-width: ${smMax}) { padding-top: var(--primitives-space-96); } }


	/* # Padding Top — md container */

	:host([layout-area-md-padding-top="0"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: 0; } }
	:host([layout-area-md-padding-top="2"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-2); } }
	:host([layout-area-md-padding-top="4"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-4); } }
	:host([layout-area-md-padding-top="6"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-6); } }
	:host([layout-area-md-padding-top="8"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-8); } }
	:host([layout-area-md-padding-top="10"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-10); } }
	:host([layout-area-md-padding-top="12"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-12); } }
	:host([layout-area-md-padding-top="16"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-16); } }
	:host([layout-area-md-padding-top="20"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-20); } }
	:host([layout-area-md-padding-top="24"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-24); } }
	:host([layout-area-md-padding-top="28"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-28); } }
	:host([layout-area-md-padding-top="32"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-32); } }
	:host([layout-area-md-padding-top="40"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-40); } }
	:host([layout-area-md-padding-top="44"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-44); } }
	:host([layout-area-md-padding-top="48"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-48); } }
	:host([layout-area-md-padding-top="56"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-56); } }
	:host([layout-area-md-padding-top="64"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-64); } }
	:host([layout-area-md-padding-top="80"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-80); } }
	:host([layout-area-md-padding-top="96"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-top: var(--primitives-space-96); } }


	/* # Padding Top — lg container */

	:host([layout-area-lg-padding-top="0"]) .container { @container layout-area (min-width: ${lgMin}) { padding-top: 0; } }
	:host([layout-area-lg-padding-top="2"]) .container { @container layout-area (min-width: ${lgMin}) { padding-top: var(--primitives-space-2); } }
	:host([layout-area-lg-padding-top="4"]) .container { @container layout-area (min-width: ${lgMin}) { padding-top: var(--primitives-space-4); } }
	:host([layout-area-lg-padding-top="6"]) .container { @container layout-area (min-width: ${lgMin}) { padding-top: var(--primitives-space-6); } }
	:host([layout-area-lg-padding-top="8"]) .container { @container layout-area (min-width: ${lgMin}) { padding-top: var(--primitives-space-8); } }
	:host([layout-area-lg-padding-top="10"]) .container { @container layout-area (min-width: ${lgMin}) { padding-top: var(--primitives-space-10); } }
	:host([layout-area-lg-padding-top="12"]) .container { @container layout-area (min-width: ${lgMin}) { padding-top: var(--primitives-space-12); } }
	:host([layout-area-lg-padding-top="16"]) .container { @container layout-area (min-width: ${lgMin}) { padding-top: var(--primitives-space-16); } }
	:host([layout-area-lg-padding-top="20"]) .container { @container layout-area (min-width: ${lgMin}) { padding-top: var(--primitives-space-20); } }
	:host([layout-area-lg-padding-top="24"]) .container { @container layout-area (min-width: ${lgMin}) { padding-top: var(--primitives-space-24); } }
	:host([layout-area-lg-padding-top="28"]) .container { @container layout-area (min-width: ${lgMin}) { padding-top: var(--primitives-space-28); } }
	:host([layout-area-lg-padding-top="32"]) .container { @container layout-area (min-width: ${lgMin}) { padding-top: var(--primitives-space-32); } }
	:host([layout-area-lg-padding-top="40"]) .container { @container layout-area (min-width: ${lgMin}) { padding-top: var(--primitives-space-40); } }
	:host([layout-area-lg-padding-top="44"]) .container { @container layout-area (min-width: ${lgMin}) { padding-top: var(--primitives-space-44); } }
	:host([layout-area-lg-padding-top="48"]) .container { @container layout-area (min-width: ${lgMin}) { padding-top: var(--primitives-space-48); } }
	:host([layout-area-lg-padding-top="56"]) .container { @container layout-area (min-width: ${lgMin}) { padding-top: var(--primitives-space-56); } }
	:host([layout-area-lg-padding-top="64"]) .container { @container layout-area (min-width: ${lgMin}) { padding-top: var(--primitives-space-64); } }
	:host([layout-area-lg-padding-top="80"]) .container { @container layout-area (min-width: ${lgMin}) { padding-top: var(--primitives-space-80); } }
	:host([layout-area-lg-padding-top="96"]) .container { @container layout-area (min-width: ${lgMin}) { padding-top: var(--primitives-space-96); } }


	/* # Padding Right — base */

	:host([padding-right="0"]) .container { padding-right: 0; }
	:host([padding-right="2"]) .container { padding-right: var(--primitives-space-2); }
	:host([padding-right="4"]) .container { padding-right: var(--primitives-space-4); }
	:host([padding-right="6"]) .container { padding-right: var(--primitives-space-6); }
	:host([padding-right="8"]) .container { padding-right: var(--primitives-space-8); }
	:host([padding-right="10"]) .container { padding-right: var(--primitives-space-10); }
	:host([padding-right="12"]) .container { padding-right: var(--primitives-space-12); }
	:host([padding-right="16"]) .container { padding-right: var(--primitives-space-16); }
	:host([padding-right="20"]) .container { padding-right: var(--primitives-space-20); }
	:host([padding-right="24"]) .container { padding-right: var(--primitives-space-24); }
	:host([padding-right="28"]) .container { padding-right: var(--primitives-space-28); }
	:host([padding-right="32"]) .container { padding-right: var(--primitives-space-32); }
	:host([padding-right="40"]) .container { padding-right: var(--primitives-space-40); }
	:host([padding-right="44"]) .container { padding-right: var(--primitives-space-44); }
	:host([padding-right="48"]) .container { padding-right: var(--primitives-space-48); }
	:host([padding-right="56"]) .container { padding-right: var(--primitives-space-56); }
	:host([padding-right="64"]) .container { padding-right: var(--primitives-space-64); }
	:host([padding-right="80"]) .container { padding-right: var(--primitives-space-80); }
	:host([padding-right="96"]) .container { padding-right: var(--primitives-space-96); }


	/* # Padding Right — sm viewport */

	:host([sm-padding-right="0"]) .container { @media (max-width: ${smMax}) { padding-right: 0; } }
	:host([sm-padding-right="2"]) .container { @media (max-width: ${smMax}) { padding-right: var(--primitives-space-2); } }
	:host([sm-padding-right="4"]) .container { @media (max-width: ${smMax}) { padding-right: var(--primitives-space-4); } }
	:host([sm-padding-right="6"]) .container { @media (max-width: ${smMax}) { padding-right: var(--primitives-space-6); } }
	:host([sm-padding-right="8"]) .container { @media (max-width: ${smMax}) { padding-right: var(--primitives-space-8); } }
	:host([sm-padding-right="10"]) .container { @media (max-width: ${smMax}) { padding-right: var(--primitives-space-10); } }
	:host([sm-padding-right="12"]) .container { @media (max-width: ${smMax}) { padding-right: var(--primitives-space-12); } }
	:host([sm-padding-right="16"]) .container { @media (max-width: ${smMax}) { padding-right: var(--primitives-space-16); } }
	:host([sm-padding-right="20"]) .container { @media (max-width: ${smMax}) { padding-right: var(--primitives-space-20); } }
	:host([sm-padding-right="24"]) .container { @media (max-width: ${smMax}) { padding-right: var(--primitives-space-24); } }
	:host([sm-padding-right="28"]) .container { @media (max-width: ${smMax}) { padding-right: var(--primitives-space-28); } }
	:host([sm-padding-right="32"]) .container { @media (max-width: ${smMax}) { padding-right: var(--primitives-space-32); } }
	:host([sm-padding-right="40"]) .container { @media (max-width: ${smMax}) { padding-right: var(--primitives-space-40); } }
	:host([sm-padding-right="44"]) .container { @media (max-width: ${smMax}) { padding-right: var(--primitives-space-44); } }
	:host([sm-padding-right="48"]) .container { @media (max-width: ${smMax}) { padding-right: var(--primitives-space-48); } }
	:host([sm-padding-right="56"]) .container { @media (max-width: ${smMax}) { padding-right: var(--primitives-space-56); } }
	:host([sm-padding-right="64"]) .container { @media (max-width: ${smMax}) { padding-right: var(--primitives-space-64); } }
	:host([sm-padding-right="80"]) .container { @media (max-width: ${smMax}) { padding-right: var(--primitives-space-80); } }
	:host([sm-padding-right="96"]) .container { @media (max-width: ${smMax}) { padding-right: var(--primitives-space-96); } }


	/* # Padding Right — md viewport */

	:host([md-padding-right="0"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: 0; } }
	:host([md-padding-right="2"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-2); } }
	:host([md-padding-right="4"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-4); } }
	:host([md-padding-right="6"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-6); } }
	:host([md-padding-right="8"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-8); } }
	:host([md-padding-right="10"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-10); } }
	:host([md-padding-right="12"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-12); } }
	:host([md-padding-right="16"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-16); } }
	:host([md-padding-right="20"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-20); } }
	:host([md-padding-right="24"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-24); } }
	:host([md-padding-right="28"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-28); } }
	:host([md-padding-right="32"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-32); } }
	:host([md-padding-right="40"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-40); } }
	:host([md-padding-right="44"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-44); } }
	:host([md-padding-right="48"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-48); } }
	:host([md-padding-right="56"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-56); } }
	:host([md-padding-right="64"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-64); } }
	:host([md-padding-right="80"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-80); } }
	:host([md-padding-right="96"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-96); } }


	/* # Padding Right — lg viewport */

	:host([lg-padding-right="0"]) .container { @media (min-width: ${lgMin}) { padding-right: 0; } }
	:host([lg-padding-right="2"]) .container { @media (min-width: ${lgMin}) { padding-right: var(--primitives-space-2); } }
	:host([lg-padding-right="4"]) .container { @media (min-width: ${lgMin}) { padding-right: var(--primitives-space-4); } }
	:host([lg-padding-right="6"]) .container { @media (min-width: ${lgMin}) { padding-right: var(--primitives-space-6); } }
	:host([lg-padding-right="8"]) .container { @media (min-width: ${lgMin}) { padding-right: var(--primitives-space-8); } }
	:host([lg-padding-right="10"]) .container { @media (min-width: ${lgMin}) { padding-right: var(--primitives-space-10); } }
	:host([lg-padding-right="12"]) .container { @media (min-width: ${lgMin}) { padding-right: var(--primitives-space-12); } }
	:host([lg-padding-right="16"]) .container { @media (min-width: ${lgMin}) { padding-right: var(--primitives-space-16); } }
	:host([lg-padding-right="20"]) .container { @media (min-width: ${lgMin}) { padding-right: var(--primitives-space-20); } }
	:host([lg-padding-right="24"]) .container { @media (min-width: ${lgMin}) { padding-right: var(--primitives-space-24); } }
	:host([lg-padding-right="28"]) .container { @media (min-width: ${lgMin}) { padding-right: var(--primitives-space-28); } }
	:host([lg-padding-right="32"]) .container { @media (min-width: ${lgMin}) { padding-right: var(--primitives-space-32); } }
	:host([lg-padding-right="40"]) .container { @media (min-width: ${lgMin}) { padding-right: var(--primitives-space-40); } }
	:host([lg-padding-right="44"]) .container { @media (min-width: ${lgMin}) { padding-right: var(--primitives-space-44); } }
	:host([lg-padding-right="48"]) .container { @media (min-width: ${lgMin}) { padding-right: var(--primitives-space-48); } }
	:host([lg-padding-right="56"]) .container { @media (min-width: ${lgMin}) { padding-right: var(--primitives-space-56); } }
	:host([lg-padding-right="64"]) .container { @media (min-width: ${lgMin}) { padding-right: var(--primitives-space-64); } }
	:host([lg-padding-right="80"]) .container { @media (min-width: ${lgMin}) { padding-right: var(--primitives-space-80); } }
	:host([lg-padding-right="96"]) .container { @media (min-width: ${lgMin}) { padding-right: var(--primitives-space-96); } }


	/* # Padding Right — sm container */

	:host([layout-area-sm-padding-right="0"]) .container { @container layout-area (max-width: ${smMax}) { padding-right: 0; } }
	:host([layout-area-sm-padding-right="2"]) .container { @container layout-area (max-width: ${smMax}) { padding-right: var(--primitives-space-2); } }
	:host([layout-area-sm-padding-right="4"]) .container { @container layout-area (max-width: ${smMax}) { padding-right: var(--primitives-space-4); } }
	:host([layout-area-sm-padding-right="6"]) .container { @container layout-area (max-width: ${smMax}) { padding-right: var(--primitives-space-6); } }
	:host([layout-area-sm-padding-right="8"]) .container { @container layout-area (max-width: ${smMax}) { padding-right: var(--primitives-space-8); } }
	:host([layout-area-sm-padding-right="10"]) .container { @container layout-area (max-width: ${smMax}) { padding-right: var(--primitives-space-10); } }
	:host([layout-area-sm-padding-right="12"]) .container { @container layout-area (max-width: ${smMax}) { padding-right: var(--primitives-space-12); } }
	:host([layout-area-sm-padding-right="16"]) .container { @container layout-area (max-width: ${smMax}) { padding-right: var(--primitives-space-16); } }
	:host([layout-area-sm-padding-right="20"]) .container { @container layout-area (max-width: ${smMax}) { padding-right: var(--primitives-space-20); } }
	:host([layout-area-sm-padding-right="24"]) .container { @container layout-area (max-width: ${smMax}) { padding-right: var(--primitives-space-24); } }
	:host([layout-area-sm-padding-right="28"]) .container { @container layout-area (max-width: ${smMax}) { padding-right: var(--primitives-space-28); } }
	:host([layout-area-sm-padding-right="32"]) .container { @container layout-area (max-width: ${smMax}) { padding-right: var(--primitives-space-32); } }
	:host([layout-area-sm-padding-right="40"]) .container { @container layout-area (max-width: ${smMax}) { padding-right: var(--primitives-space-40); } }
	:host([layout-area-sm-padding-right="44"]) .container { @container layout-area (max-width: ${smMax}) { padding-right: var(--primitives-space-44); } }
	:host([layout-area-sm-padding-right="48"]) .container { @container layout-area (max-width: ${smMax}) { padding-right: var(--primitives-space-48); } }
	:host([layout-area-sm-padding-right="56"]) .container { @container layout-area (max-width: ${smMax}) { padding-right: var(--primitives-space-56); } }
	:host([layout-area-sm-padding-right="64"]) .container { @container layout-area (max-width: ${smMax}) { padding-right: var(--primitives-space-64); } }
	:host([layout-area-sm-padding-right="80"]) .container { @container layout-area (max-width: ${smMax}) { padding-right: var(--primitives-space-80); } }
	:host([layout-area-sm-padding-right="96"]) .container { @container layout-area (max-width: ${smMax}) { padding-right: var(--primitives-space-96); } }


	/* # Padding Right — md container */

	:host([layout-area-md-padding-right="0"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: 0; } }
	:host([layout-area-md-padding-right="2"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-2); } }
	:host([layout-area-md-padding-right="4"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-4); } }
	:host([layout-area-md-padding-right="6"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-6); } }
	:host([layout-area-md-padding-right="8"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-8); } }
	:host([layout-area-md-padding-right="10"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-10); } }
	:host([layout-area-md-padding-right="12"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-12); } }
	:host([layout-area-md-padding-right="16"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-16); } }
	:host([layout-area-md-padding-right="20"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-20); } }
	:host([layout-area-md-padding-right="24"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-24); } }
	:host([layout-area-md-padding-right="28"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-28); } }
	:host([layout-area-md-padding-right="32"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-32); } }
	:host([layout-area-md-padding-right="40"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-40); } }
	:host([layout-area-md-padding-right="44"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-44); } }
	:host([layout-area-md-padding-right="48"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-48); } }
	:host([layout-area-md-padding-right="56"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-56); } }
	:host([layout-area-md-padding-right="64"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-64); } }
	:host([layout-area-md-padding-right="80"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-80); } }
	:host([layout-area-md-padding-right="96"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-right: var(--primitives-space-96); } }


	/* # Padding Right — lg container */

	:host([layout-area-lg-padding-right="0"]) .container { @container layout-area (min-width: ${lgMin}) { padding-right: 0; } }
	:host([layout-area-lg-padding-right="2"]) .container { @container layout-area (min-width: ${lgMin}) { padding-right: var(--primitives-space-2); } }
	:host([layout-area-lg-padding-right="4"]) .container { @container layout-area (min-width: ${lgMin}) { padding-right: var(--primitives-space-4); } }
	:host([layout-area-lg-padding-right="6"]) .container { @container layout-area (min-width: ${lgMin}) { padding-right: var(--primitives-space-6); } }
	:host([layout-area-lg-padding-right="8"]) .container { @container layout-area (min-width: ${lgMin}) { padding-right: var(--primitives-space-8); } }
	:host([layout-area-lg-padding-right="10"]) .container { @container layout-area (min-width: ${lgMin}) { padding-right: var(--primitives-space-10); } }
	:host([layout-area-lg-padding-right="12"]) .container { @container layout-area (min-width: ${lgMin}) { padding-right: var(--primitives-space-12); } }
	:host([layout-area-lg-padding-right="16"]) .container { @container layout-area (min-width: ${lgMin}) { padding-right: var(--primitives-space-16); } }
	:host([layout-area-lg-padding-right="20"]) .container { @container layout-area (min-width: ${lgMin}) { padding-right: var(--primitives-space-20); } }
	:host([layout-area-lg-padding-right="24"]) .container { @container layout-area (min-width: ${lgMin}) { padding-right: var(--primitives-space-24); } }
	:host([layout-area-lg-padding-right="28"]) .container { @container layout-area (min-width: ${lgMin}) { padding-right: var(--primitives-space-28); } }
	:host([layout-area-lg-padding-right="32"]) .container { @container layout-area (min-width: ${lgMin}) { padding-right: var(--primitives-space-32); } }
	:host([layout-area-lg-padding-right="40"]) .container { @container layout-area (min-width: ${lgMin}) { padding-right: var(--primitives-space-40); } }
	:host([layout-area-lg-padding-right="44"]) .container { @container layout-area (min-width: ${lgMin}) { padding-right: var(--primitives-space-44); } }
	:host([layout-area-lg-padding-right="48"]) .container { @container layout-area (min-width: ${lgMin}) { padding-right: var(--primitives-space-48); } }
	:host([layout-area-lg-padding-right="56"]) .container { @container layout-area (min-width: ${lgMin}) { padding-right: var(--primitives-space-56); } }
	:host([layout-area-lg-padding-right="64"]) .container { @container layout-area (min-width: ${lgMin}) { padding-right: var(--primitives-space-64); } }
	:host([layout-area-lg-padding-right="80"]) .container { @container layout-area (min-width: ${lgMin}) { padding-right: var(--primitives-space-80); } }
	:host([layout-area-lg-padding-right="96"]) .container { @container layout-area (min-width: ${lgMin}) { padding-right: var(--primitives-space-96); } }


	/* # Padding Bottom — base */

	:host([padding-bottom="0"]) .container { padding-bottom: 0; }
	:host([padding-bottom="2"]) .container { padding-bottom: var(--primitives-space-2); }
	:host([padding-bottom="4"]) .container { padding-bottom: var(--primitives-space-4); }
	:host([padding-bottom="6"]) .container { padding-bottom: var(--primitives-space-6); }
	:host([padding-bottom="8"]) .container { padding-bottom: var(--primitives-space-8); }
	:host([padding-bottom="10"]) .container { padding-bottom: var(--primitives-space-10); }
	:host([padding-bottom="12"]) .container { padding-bottom: var(--primitives-space-12); }
	:host([padding-bottom="16"]) .container { padding-bottom: var(--primitives-space-16); }
	:host([padding-bottom="20"]) .container { padding-bottom: var(--primitives-space-20); }
	:host([padding-bottom="24"]) .container { padding-bottom: var(--primitives-space-24); }
	:host([padding-bottom="28"]) .container { padding-bottom: var(--primitives-space-28); }
	:host([padding-bottom="32"]) .container { padding-bottom: var(--primitives-space-32); }
	:host([padding-bottom="40"]) .container { padding-bottom: var(--primitives-space-40); }
	:host([padding-bottom="44"]) .container { padding-bottom: var(--primitives-space-44); }
	:host([padding-bottom="48"]) .container { padding-bottom: var(--primitives-space-48); }
	:host([padding-bottom="56"]) .container { padding-bottom: var(--primitives-space-56); }
	:host([padding-bottom="64"]) .container { padding-bottom: var(--primitives-space-64); }
	:host([padding-bottom="80"]) .container { padding-bottom: var(--primitives-space-80); }
	:host([padding-bottom="96"]) .container { padding-bottom: var(--primitives-space-96); }


	/* # Padding Bottom — sm viewport */

	:host([sm-padding-bottom="0"]) .container { @media (max-width: ${smMax}) { padding-bottom: 0; } }
	:host([sm-padding-bottom="2"]) .container { @media (max-width: ${smMax}) { padding-bottom: var(--primitives-space-2); } }
	:host([sm-padding-bottom="4"]) .container { @media (max-width: ${smMax}) { padding-bottom: var(--primitives-space-4); } }
	:host([sm-padding-bottom="6"]) .container { @media (max-width: ${smMax}) { padding-bottom: var(--primitives-space-6); } }
	:host([sm-padding-bottom="8"]) .container { @media (max-width: ${smMax}) { padding-bottom: var(--primitives-space-8); } }
	:host([sm-padding-bottom="10"]) .container { @media (max-width: ${smMax}) { padding-bottom: var(--primitives-space-10); } }
	:host([sm-padding-bottom="12"]) .container { @media (max-width: ${smMax}) { padding-bottom: var(--primitives-space-12); } }
	:host([sm-padding-bottom="16"]) .container { @media (max-width: ${smMax}) { padding-bottom: var(--primitives-space-16); } }
	:host([sm-padding-bottom="20"]) .container { @media (max-width: ${smMax}) { padding-bottom: var(--primitives-space-20); } }
	:host([sm-padding-bottom="24"]) .container { @media (max-width: ${smMax}) { padding-bottom: var(--primitives-space-24); } }
	:host([sm-padding-bottom="28"]) .container { @media (max-width: ${smMax}) { padding-bottom: var(--primitives-space-28); } }
	:host([sm-padding-bottom="32"]) .container { @media (max-width: ${smMax}) { padding-bottom: var(--primitives-space-32); } }
	:host([sm-padding-bottom="40"]) .container { @media (max-width: ${smMax}) { padding-bottom: var(--primitives-space-40); } }
	:host([sm-padding-bottom="44"]) .container { @media (max-width: ${smMax}) { padding-bottom: var(--primitives-space-44); } }
	:host([sm-padding-bottom="48"]) .container { @media (max-width: ${smMax}) { padding-bottom: var(--primitives-space-48); } }
	:host([sm-padding-bottom="56"]) .container { @media (max-width: ${smMax}) { padding-bottom: var(--primitives-space-56); } }
	:host([sm-padding-bottom="64"]) .container { @media (max-width: ${smMax}) { padding-bottom: var(--primitives-space-64); } }
	:host([sm-padding-bottom="80"]) .container { @media (max-width: ${smMax}) { padding-bottom: var(--primitives-space-80); } }
	:host([sm-padding-bottom="96"]) .container { @media (max-width: ${smMax}) { padding-bottom: var(--primitives-space-96); } }


	/* # Padding Bottom — md viewport */

	:host([md-padding-bottom="0"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: 0; } }
	:host([md-padding-bottom="2"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-2); } }
	:host([md-padding-bottom="4"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-4); } }
	:host([md-padding-bottom="6"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-6); } }
	:host([md-padding-bottom="8"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-8); } }
	:host([md-padding-bottom="10"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-10); } }
	:host([md-padding-bottom="12"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-12); } }
	:host([md-padding-bottom="16"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-16); } }
	:host([md-padding-bottom="20"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-20); } }
	:host([md-padding-bottom="24"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-24); } }
	:host([md-padding-bottom="28"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-28); } }
	:host([md-padding-bottom="32"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-32); } }
	:host([md-padding-bottom="40"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-40); } }
	:host([md-padding-bottom="44"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-44); } }
	:host([md-padding-bottom="48"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-48); } }
	:host([md-padding-bottom="56"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-56); } }
	:host([md-padding-bottom="64"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-64); } }
	:host([md-padding-bottom="80"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-80); } }
	:host([md-padding-bottom="96"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-96); } }


	/* # Padding Bottom — lg viewport */

	:host([lg-padding-bottom="0"]) .container { @media (min-width: ${lgMin}) { padding-bottom: 0; } }
	:host([lg-padding-bottom="2"]) .container { @media (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-2); } }
	:host([lg-padding-bottom="4"]) .container { @media (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-4); } }
	:host([lg-padding-bottom="6"]) .container { @media (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-6); } }
	:host([lg-padding-bottom="8"]) .container { @media (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-8); } }
	:host([lg-padding-bottom="10"]) .container { @media (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-10); } }
	:host([lg-padding-bottom="12"]) .container { @media (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-12); } }
	:host([lg-padding-bottom="16"]) .container { @media (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-16); } }
	:host([lg-padding-bottom="20"]) .container { @media (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-20); } }
	:host([lg-padding-bottom="24"]) .container { @media (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-24); } }
	:host([lg-padding-bottom="28"]) .container { @media (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-28); } }
	:host([lg-padding-bottom="32"]) .container { @media (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-32); } }
	:host([lg-padding-bottom="40"]) .container { @media (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-40); } }
	:host([lg-padding-bottom="44"]) .container { @media (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-44); } }
	:host([lg-padding-bottom="48"]) .container { @media (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-48); } }
	:host([lg-padding-bottom="56"]) .container { @media (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-56); } }
	:host([lg-padding-bottom="64"]) .container { @media (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-64); } }
	:host([lg-padding-bottom="80"]) .container { @media (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-80); } }
	:host([lg-padding-bottom="96"]) .container { @media (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-96); } }


	/* # Padding Bottom — sm container */

	:host([layout-area-sm-padding-bottom="0"]) .container { @container layout-area (max-width: ${smMax}) { padding-bottom: 0; } }
	:host([layout-area-sm-padding-bottom="2"]) .container { @container layout-area (max-width: ${smMax}) { padding-bottom: var(--primitives-space-2); } }
	:host([layout-area-sm-padding-bottom="4"]) .container { @container layout-area (max-width: ${smMax}) { padding-bottom: var(--primitives-space-4); } }
	:host([layout-area-sm-padding-bottom="6"]) .container { @container layout-area (max-width: ${smMax}) { padding-bottom: var(--primitives-space-6); } }
	:host([layout-area-sm-padding-bottom="8"]) .container { @container layout-area (max-width: ${smMax}) { padding-bottom: var(--primitives-space-8); } }
	:host([layout-area-sm-padding-bottom="10"]) .container { @container layout-area (max-width: ${smMax}) { padding-bottom: var(--primitives-space-10); } }
	:host([layout-area-sm-padding-bottom="12"]) .container { @container layout-area (max-width: ${smMax}) { padding-bottom: var(--primitives-space-12); } }
	:host([layout-area-sm-padding-bottom="16"]) .container { @container layout-area (max-width: ${smMax}) { padding-bottom: var(--primitives-space-16); } }
	:host([layout-area-sm-padding-bottom="20"]) .container { @container layout-area (max-width: ${smMax}) { padding-bottom: var(--primitives-space-20); } }
	:host([layout-area-sm-padding-bottom="24"]) .container { @container layout-area (max-width: ${smMax}) { padding-bottom: var(--primitives-space-24); } }
	:host([layout-area-sm-padding-bottom="28"]) .container { @container layout-area (max-width: ${smMax}) { padding-bottom: var(--primitives-space-28); } }
	:host([layout-area-sm-padding-bottom="32"]) .container { @container layout-area (max-width: ${smMax}) { padding-bottom: var(--primitives-space-32); } }
	:host([layout-area-sm-padding-bottom="40"]) .container { @container layout-area (max-width: ${smMax}) { padding-bottom: var(--primitives-space-40); } }
	:host([layout-area-sm-padding-bottom="44"]) .container { @container layout-area (max-width: ${smMax}) { padding-bottom: var(--primitives-space-44); } }
	:host([layout-area-sm-padding-bottom="48"]) .container { @container layout-area (max-width: ${smMax}) { padding-bottom: var(--primitives-space-48); } }
	:host([layout-area-sm-padding-bottom="56"]) .container { @container layout-area (max-width: ${smMax}) { padding-bottom: var(--primitives-space-56); } }
	:host([layout-area-sm-padding-bottom="64"]) .container { @container layout-area (max-width: ${smMax}) { padding-bottom: var(--primitives-space-64); } }
	:host([layout-area-sm-padding-bottom="80"]) .container { @container layout-area (max-width: ${smMax}) { padding-bottom: var(--primitives-space-80); } }
	:host([layout-area-sm-padding-bottom="96"]) .container { @container layout-area (max-width: ${smMax}) { padding-bottom: var(--primitives-space-96); } }


	/* # Padding Bottom — md container */

	:host([layout-area-md-padding-bottom="0"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: 0; } }
	:host([layout-area-md-padding-bottom="2"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-2); } }
	:host([layout-area-md-padding-bottom="4"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-4); } }
	:host([layout-area-md-padding-bottom="6"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-6); } }
	:host([layout-area-md-padding-bottom="8"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-8); } }
	:host([layout-area-md-padding-bottom="10"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-10); } }
	:host([layout-area-md-padding-bottom="12"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-12); } }
	:host([layout-area-md-padding-bottom="16"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-16); } }
	:host([layout-area-md-padding-bottom="20"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-20); } }
	:host([layout-area-md-padding-bottom="24"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-24); } }
	:host([layout-area-md-padding-bottom="28"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-28); } }
	:host([layout-area-md-padding-bottom="32"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-32); } }
	:host([layout-area-md-padding-bottom="40"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-40); } }
	:host([layout-area-md-padding-bottom="44"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-44); } }
	:host([layout-area-md-padding-bottom="48"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-48); } }
	:host([layout-area-md-padding-bottom="56"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-56); } }
	:host([layout-area-md-padding-bottom="64"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-64); } }
	:host([layout-area-md-padding-bottom="80"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-80); } }
	:host([layout-area-md-padding-bottom="96"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-bottom: var(--primitives-space-96); } }


	/* # Padding Bottom — lg container */

	:host([layout-area-lg-padding-bottom="0"]) .container { @container layout-area (min-width: ${lgMin}) { padding-bottom: 0; } }
	:host([layout-area-lg-padding-bottom="2"]) .container { @container layout-area (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-2); } }
	:host([layout-area-lg-padding-bottom="4"]) .container { @container layout-area (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-4); } }
	:host([layout-area-lg-padding-bottom="6"]) .container { @container layout-area (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-6); } }
	:host([layout-area-lg-padding-bottom="8"]) .container { @container layout-area (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-8); } }
	:host([layout-area-lg-padding-bottom="10"]) .container { @container layout-area (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-10); } }
	:host([layout-area-lg-padding-bottom="12"]) .container { @container layout-area (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-12); } }
	:host([layout-area-lg-padding-bottom="16"]) .container { @container layout-area (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-16); } }
	:host([layout-area-lg-padding-bottom="20"]) .container { @container layout-area (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-20); } }
	:host([layout-area-lg-padding-bottom="24"]) .container { @container layout-area (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-24); } }
	:host([layout-area-lg-padding-bottom="28"]) .container { @container layout-area (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-28); } }
	:host([layout-area-lg-padding-bottom="32"]) .container { @container layout-area (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-32); } }
	:host([layout-area-lg-padding-bottom="40"]) .container { @container layout-area (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-40); } }
	:host([layout-area-lg-padding-bottom="44"]) .container { @container layout-area (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-44); } }
	:host([layout-area-lg-padding-bottom="48"]) .container { @container layout-area (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-48); } }
	:host([layout-area-lg-padding-bottom="56"]) .container { @container layout-area (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-56); } }
	:host([layout-area-lg-padding-bottom="64"]) .container { @container layout-area (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-64); } }
	:host([layout-area-lg-padding-bottom="80"]) .container { @container layout-area (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-80); } }
	:host([layout-area-lg-padding-bottom="96"]) .container { @container layout-area (min-width: ${lgMin}) { padding-bottom: var(--primitives-space-96); } }


	/* # Padding Left — base */

	:host([padding-left="0"]) .container { padding-left: 0; }
	:host([padding-left="2"]) .container { padding-left: var(--primitives-space-2); }
	:host([padding-left="4"]) .container { padding-left: var(--primitives-space-4); }
	:host([padding-left="6"]) .container { padding-left: var(--primitives-space-6); }
	:host([padding-left="8"]) .container { padding-left: var(--primitives-space-8); }
	:host([padding-left="10"]) .container { padding-left: var(--primitives-space-10); }
	:host([padding-left="12"]) .container { padding-left: var(--primitives-space-12); }
	:host([padding-left="16"]) .container { padding-left: var(--primitives-space-16); }
	:host([padding-left="20"]) .container { padding-left: var(--primitives-space-20); }
	:host([padding-left="24"]) .container { padding-left: var(--primitives-space-24); }
	:host([padding-left="28"]) .container { padding-left: var(--primitives-space-28); }
	:host([padding-left="32"]) .container { padding-left: var(--primitives-space-32); }
	:host([padding-left="40"]) .container { padding-left: var(--primitives-space-40); }
	:host([padding-left="44"]) .container { padding-left: var(--primitives-space-44); }
	:host([padding-left="48"]) .container { padding-left: var(--primitives-space-48); }
	:host([padding-left="56"]) .container { padding-left: var(--primitives-space-56); }
	:host([padding-left="64"]) .container { padding-left: var(--primitives-space-64); }
	:host([padding-left="80"]) .container { padding-left: var(--primitives-space-80); }
	:host([padding-left="96"]) .container { padding-left: var(--primitives-space-96); }


	/* # Padding Left — sm viewport */

	:host([sm-padding-left="0"]) .container { @media (max-width: ${smMax}) { padding-left: 0; } }
	:host([sm-padding-left="2"]) .container { @media (max-width: ${smMax}) { padding-left: var(--primitives-space-2); } }
	:host([sm-padding-left="4"]) .container { @media (max-width: ${smMax}) { padding-left: var(--primitives-space-4); } }
	:host([sm-padding-left="6"]) .container { @media (max-width: ${smMax}) { padding-left: var(--primitives-space-6); } }
	:host([sm-padding-left="8"]) .container { @media (max-width: ${smMax}) { padding-left: var(--primitives-space-8); } }
	:host([sm-padding-left="10"]) .container { @media (max-width: ${smMax}) { padding-left: var(--primitives-space-10); } }
	:host([sm-padding-left="12"]) .container { @media (max-width: ${smMax}) { padding-left: var(--primitives-space-12); } }
	:host([sm-padding-left="16"]) .container { @media (max-width: ${smMax}) { padding-left: var(--primitives-space-16); } }
	:host([sm-padding-left="20"]) .container { @media (max-width: ${smMax}) { padding-left: var(--primitives-space-20); } }
	:host([sm-padding-left="24"]) .container { @media (max-width: ${smMax}) { padding-left: var(--primitives-space-24); } }
	:host([sm-padding-left="28"]) .container { @media (max-width: ${smMax}) { padding-left: var(--primitives-space-28); } }
	:host([sm-padding-left="32"]) .container { @media (max-width: ${smMax}) { padding-left: var(--primitives-space-32); } }
	:host([sm-padding-left="40"]) .container { @media (max-width: ${smMax}) { padding-left: var(--primitives-space-40); } }
	:host([sm-padding-left="44"]) .container { @media (max-width: ${smMax}) { padding-left: var(--primitives-space-44); } }
	:host([sm-padding-left="48"]) .container { @media (max-width: ${smMax}) { padding-left: var(--primitives-space-48); } }
	:host([sm-padding-left="56"]) .container { @media (max-width: ${smMax}) { padding-left: var(--primitives-space-56); } }
	:host([sm-padding-left="64"]) .container { @media (max-width: ${smMax}) { padding-left: var(--primitives-space-64); } }
	:host([sm-padding-left="80"]) .container { @media (max-width: ${smMax}) { padding-left: var(--primitives-space-80); } }
	:host([sm-padding-left="96"]) .container { @media (max-width: ${smMax}) { padding-left: var(--primitives-space-96); } }


	/* # Padding Left — md viewport */

	:host([md-padding-left="0"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: 0; } }
	:host([md-padding-left="2"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-2); } }
	:host([md-padding-left="4"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-4); } }
	:host([md-padding-left="6"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-6); } }
	:host([md-padding-left="8"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-8); } }
	:host([md-padding-left="10"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-10); } }
	:host([md-padding-left="12"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-12); } }
	:host([md-padding-left="16"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-16); } }
	:host([md-padding-left="20"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-20); } }
	:host([md-padding-left="24"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-24); } }
	:host([md-padding-left="28"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-28); } }
	:host([md-padding-left="32"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-32); } }
	:host([md-padding-left="40"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-40); } }
	:host([md-padding-left="44"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-44); } }
	:host([md-padding-left="48"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-48); } }
	:host([md-padding-left="56"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-56); } }
	:host([md-padding-left="64"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-64); } }
	:host([md-padding-left="80"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-80); } }
	:host([md-padding-left="96"]) .container { @media (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-96); } }


	/* # Padding Left — lg viewport */

	:host([lg-padding-left="0"]) .container { @media (min-width: ${lgMin}) { padding-left: 0; } }
	:host([lg-padding-left="2"]) .container { @media (min-width: ${lgMin}) { padding-left: var(--primitives-space-2); } }
	:host([lg-padding-left="4"]) .container { @media (min-width: ${lgMin}) { padding-left: var(--primitives-space-4); } }
	:host([lg-padding-left="6"]) .container { @media (min-width: ${lgMin}) { padding-left: var(--primitives-space-6); } }
	:host([lg-padding-left="8"]) .container { @media (min-width: ${lgMin}) { padding-left: var(--primitives-space-8); } }
	:host([lg-padding-left="10"]) .container { @media (min-width: ${lgMin}) { padding-left: var(--primitives-space-10); } }
	:host([lg-padding-left="12"]) .container { @media (min-width: ${lgMin}) { padding-left: var(--primitives-space-12); } }
	:host([lg-padding-left="16"]) .container { @media (min-width: ${lgMin}) { padding-left: var(--primitives-space-16); } }
	:host([lg-padding-left="20"]) .container { @media (min-width: ${lgMin}) { padding-left: var(--primitives-space-20); } }
	:host([lg-padding-left="24"]) .container { @media (min-width: ${lgMin}) { padding-left: var(--primitives-space-24); } }
	:host([lg-padding-left="28"]) .container { @media (min-width: ${lgMin}) { padding-left: var(--primitives-space-28); } }
	:host([lg-padding-left="32"]) .container { @media (min-width: ${lgMin}) { padding-left: var(--primitives-space-32); } }
	:host([lg-padding-left="40"]) .container { @media (min-width: ${lgMin}) { padding-left: var(--primitives-space-40); } }
	:host([lg-padding-left="44"]) .container { @media (min-width: ${lgMin}) { padding-left: var(--primitives-space-44); } }
	:host([lg-padding-left="48"]) .container { @media (min-width: ${lgMin}) { padding-left: var(--primitives-space-48); } }
	:host([lg-padding-left="56"]) .container { @media (min-width: ${lgMin}) { padding-left: var(--primitives-space-56); } }
	:host([lg-padding-left="64"]) .container { @media (min-width: ${lgMin}) { padding-left: var(--primitives-space-64); } }
	:host([lg-padding-left="80"]) .container { @media (min-width: ${lgMin}) { padding-left: var(--primitives-space-80); } }
	:host([lg-padding-left="96"]) .container { @media (min-width: ${lgMin}) { padding-left: var(--primitives-space-96); } }


	/* # Padding Left — sm container */

	:host([layout-area-sm-padding-left="0"]) .container { @container layout-area (max-width: ${smMax}) { padding-left: 0; } }
	:host([layout-area-sm-padding-left="2"]) .container { @container layout-area (max-width: ${smMax}) { padding-left: var(--primitives-space-2); } }
	:host([layout-area-sm-padding-left="4"]) .container { @container layout-area (max-width: ${smMax}) { padding-left: var(--primitives-space-4); } }
	:host([layout-area-sm-padding-left="6"]) .container { @container layout-area (max-width: ${smMax}) { padding-left: var(--primitives-space-6); } }
	:host([layout-area-sm-padding-left="8"]) .container { @container layout-area (max-width: ${smMax}) { padding-left: var(--primitives-space-8); } }
	:host([layout-area-sm-padding-left="10"]) .container { @container layout-area (max-width: ${smMax}) { padding-left: var(--primitives-space-10); } }
	:host([layout-area-sm-padding-left="12"]) .container { @container layout-area (max-width: ${smMax}) { padding-left: var(--primitives-space-12); } }
	:host([layout-area-sm-padding-left="16"]) .container { @container layout-area (max-width: ${smMax}) { padding-left: var(--primitives-space-16); } }
	:host([layout-area-sm-padding-left="20"]) .container { @container layout-area (max-width: ${smMax}) { padding-left: var(--primitives-space-20); } }
	:host([layout-area-sm-padding-left="24"]) .container { @container layout-area (max-width: ${smMax}) { padding-left: var(--primitives-space-24); } }
	:host([layout-area-sm-padding-left="28"]) .container { @container layout-area (max-width: ${smMax}) { padding-left: var(--primitives-space-28); } }
	:host([layout-area-sm-padding-left="32"]) .container { @container layout-area (max-width: ${smMax}) { padding-left: var(--primitives-space-32); } }
	:host([layout-area-sm-padding-left="40"]) .container { @container layout-area (max-width: ${smMax}) { padding-left: var(--primitives-space-40); } }
	:host([layout-area-sm-padding-left="44"]) .container { @container layout-area (max-width: ${smMax}) { padding-left: var(--primitives-space-44); } }
	:host([layout-area-sm-padding-left="48"]) .container { @container layout-area (max-width: ${smMax}) { padding-left: var(--primitives-space-48); } }
	:host([layout-area-sm-padding-left="56"]) .container { @container layout-area (max-width: ${smMax}) { padding-left: var(--primitives-space-56); } }
	:host([layout-area-sm-padding-left="64"]) .container { @container layout-area (max-width: ${smMax}) { padding-left: var(--primitives-space-64); } }
	:host([layout-area-sm-padding-left="80"]) .container { @container layout-area (max-width: ${smMax}) { padding-left: var(--primitives-space-80); } }
	:host([layout-area-sm-padding-left="96"]) .container { @container layout-area (max-width: ${smMax}) { padding-left: var(--primitives-space-96); } }


	/* # Padding Left — md container */

	:host([layout-area-md-padding-left="0"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: 0; } }
	:host([layout-area-md-padding-left="2"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-2); } }
	:host([layout-area-md-padding-left="4"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-4); } }
	:host([layout-area-md-padding-left="6"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-6); } }
	:host([layout-area-md-padding-left="8"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-8); } }
	:host([layout-area-md-padding-left="10"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-10); } }
	:host([layout-area-md-padding-left="12"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-12); } }
	:host([layout-area-md-padding-left="16"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-16); } }
	:host([layout-area-md-padding-left="20"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-20); } }
	:host([layout-area-md-padding-left="24"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-24); } }
	:host([layout-area-md-padding-left="28"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-28); } }
	:host([layout-area-md-padding-left="32"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-32); } }
	:host([layout-area-md-padding-left="40"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-40); } }
	:host([layout-area-md-padding-left="44"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-44); } }
	:host([layout-area-md-padding-left="48"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-48); } }
	:host([layout-area-md-padding-left="56"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-56); } }
	:host([layout-area-md-padding-left="64"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-64); } }
	:host([layout-area-md-padding-left="80"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-80); } }
	:host([layout-area-md-padding-left="96"]) .container { @container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) { padding-left: var(--primitives-space-96); } }


	/* # Padding Left — lg container */

	:host([layout-area-lg-padding-left="0"]) .container { @container layout-area (min-width: ${lgMin}) { padding-left: 0; } }
	:host([layout-area-lg-padding-left="2"]) .container { @container layout-area (min-width: ${lgMin}) { padding-left: var(--primitives-space-2); } }
	:host([layout-area-lg-padding-left="4"]) .container { @container layout-area (min-width: ${lgMin}) { padding-left: var(--primitives-space-4); } }
	:host([layout-area-lg-padding-left="6"]) .container { @container layout-area (min-width: ${lgMin}) { padding-left: var(--primitives-space-6); } }
	:host([layout-area-lg-padding-left="8"]) .container { @container layout-area (min-width: ${lgMin}) { padding-left: var(--primitives-space-8); } }
	:host([layout-area-lg-padding-left="10"]) .container { @container layout-area (min-width: ${lgMin}) { padding-left: var(--primitives-space-10); } }
	:host([layout-area-lg-padding-left="12"]) .container { @container layout-area (min-width: ${lgMin}) { padding-left: var(--primitives-space-12); } }
	:host([layout-area-lg-padding-left="16"]) .container { @container layout-area (min-width: ${lgMin}) { padding-left: var(--primitives-space-16); } }
	:host([layout-area-lg-padding-left="20"]) .container { @container layout-area (min-width: ${lgMin}) { padding-left: var(--primitives-space-20); } }
	:host([layout-area-lg-padding-left="24"]) .container { @container layout-area (min-width: ${lgMin}) { padding-left: var(--primitives-space-24); } }
	:host([layout-area-lg-padding-left="28"]) .container { @container layout-area (min-width: ${lgMin}) { padding-left: var(--primitives-space-28); } }
	:host([layout-area-lg-padding-left="32"]) .container { @container layout-area (min-width: ${lgMin}) { padding-left: var(--primitives-space-32); } }
	:host([layout-area-lg-padding-left="40"]) .container { @container layout-area (min-width: ${lgMin}) { padding-left: var(--primitives-space-40); } }
	:host([layout-area-lg-padding-left="44"]) .container { @container layout-area (min-width: ${lgMin}) { padding-left: var(--primitives-space-44); } }
	:host([layout-area-lg-padding-left="48"]) .container { @container layout-area (min-width: ${lgMin}) { padding-left: var(--primitives-space-48); } }
	:host([layout-area-lg-padding-left="56"]) .container { @container layout-area (min-width: ${lgMin}) { padding-left: var(--primitives-space-56); } }
	:host([layout-area-lg-padding-left="64"]) .container { @container layout-area (min-width: ${lgMin}) { padding-left: var(--primitives-space-64); } }
	:host([layout-area-lg-padding-left="80"]) .container { @container layout-area (min-width: ${lgMin}) { padding-left: var(--primitives-space-80); } }
	:host([layout-area-lg-padding-left="96"]) .container { @container layout-area (min-width: ${lgMin}) { padding-left: var(--primitives-space-96); } }

`;
