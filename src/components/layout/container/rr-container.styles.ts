import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../../assets/styles/breakpoints.ts';


/* # rr-container styles */

export const containerStyles = css`
	:host {
		display: block;
		container-type: inline-size;
	}

	:host([hidden]) {
		display: none;
	}

	.container {
		height: 100%;
	}


	/* # Padding — all */

	:host([padding="none"]) .container { padding: 0; }
	:host([padding="md"]) .container {
		padding: var(--primitives-space-16);
		@container (min-width: ${unsafeCSS(breakpoints.smMax)}) {
			padding: var(--primitives-space-24);
		}
	}
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


	/* # Padding — inline */

	:host([padding-inline="none"]) .container { padding-inline: 0; }
	:host([padding-inline="md"]) .container {
		padding-inline: var(--primitives-space-16);
		@container (min-width: ${unsafeCSS(breakpoints.smMax)}) {
			padding-inline: var(--primitives-space-24);
		}
	}
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


	/* # Padding — block */

	:host([padding-block="none"]) .container { padding-block: 0; }
	:host([padding-block="md"]) .container {
		padding-block: var(--primitives-space-16);
		@container (min-width: ${unsafeCSS(breakpoints.smMax)}) {
			padding-block: var(--primitives-space-24);
		}
	}
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


	/* # Padding — top */

	:host([padding-top="none"]) .container { padding-top: 0; }
	:host([padding-top="md"]) .container {
		padding-top: var(--primitives-space-16);
		@container (min-width: ${unsafeCSS(breakpoints.smMax)}) {
			padding-top: var(--primitives-space-24);
		}
	}
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


	/* # Padding — right */

	:host([padding-right="none"]) .container { padding-right: 0; }
	:host([padding-right="md"]) .container {
		padding-right: var(--primitives-space-16);
		@container (min-width: ${unsafeCSS(breakpoints.smMax)}) {
			padding-right: var(--primitives-space-24);
		}
	}
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


	/* # Padding — bottom */

	:host([padding-bottom="none"]) .container { padding-bottom: 0; }
	:host([padding-bottom="md"]) .container {
		padding-bottom: var(--primitives-space-16);
		@container (min-width: ${unsafeCSS(breakpoints.smMax)}) {
			padding-bottom: var(--primitives-space-24);
		}
	}
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


	/* # Padding — left */

	:host([padding-left="none"]) .container { padding-left: 0; }
	:host([padding-left="md"]) .container {
		padding-left: var(--primitives-space-16);
		@container (min-width: ${unsafeCSS(breakpoints.smMax)}) {
			padding-left: var(--primitives-space-24);
		}
	}
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
`;
