import { css } from 'lit';


/* # rr-container styles */

export const containerStyles = css`
	:host {
		display: block;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Padding — all */

	:host([padding="none"]) { padding: 0; }
	:host([padding="md"]) { padding: var(--primitives-space-md); }
	:host([padding="2"]) { padding: var(--primitives-space-2); }
	:host([padding="4"]) { padding: var(--primitives-space-4); }
	:host([padding="6"]) { padding: var(--primitives-space-6); }
	:host([padding="8"]) { padding: var(--primitives-space-8); }
	:host([padding="10"]) { padding: var(--primitives-space-10); }
	:host([padding="12"]) { padding: var(--primitives-space-12); }
	:host([padding="16"]) { padding: var(--primitives-space-16); }
	:host([padding="20"]) { padding: var(--primitives-space-20); }
	:host([padding="24"]) { padding: var(--primitives-space-24); }
	:host([padding="28"]) { padding: var(--primitives-space-28); }
	:host([padding="32"]) { padding: var(--primitives-space-32); }
	:host([padding="40"]) { padding: var(--primitives-space-40); }
	:host([padding="44"]) { padding: var(--primitives-space-44); }
	:host([padding="48"]) { padding: var(--primitives-space-48); }
	:host([padding="56"]) { padding: var(--primitives-space-56); }
	:host([padding="64"]) { padding: var(--primitives-space-64); }
	:host([padding="80"]) { padding: var(--primitives-space-80); }
	:host([padding="96"]) { padding: var(--primitives-space-96); }


	/* # Padding — inline */

	:host([padding-inline="none"]) { padding-inline: 0; }
	:host([padding-inline="md"]) { padding-inline: var(--primitives-space-md); }
	:host([padding-inline="2"]) { padding-inline: var(--primitives-space-2); }
	:host([padding-inline="4"]) { padding-inline: var(--primitives-space-4); }
	:host([padding-inline="6"]) { padding-inline: var(--primitives-space-6); }
	:host([padding-inline="8"]) { padding-inline: var(--primitives-space-8); }
	:host([padding-inline="10"]) { padding-inline: var(--primitives-space-10); }
	:host([padding-inline="12"]) { padding-inline: var(--primitives-space-12); }
	:host([padding-inline="16"]) { padding-inline: var(--primitives-space-16); }
	:host([padding-inline="20"]) { padding-inline: var(--primitives-space-20); }
	:host([padding-inline="24"]) { padding-inline: var(--primitives-space-24); }
	:host([padding-inline="28"]) { padding-inline: var(--primitives-space-28); }
	:host([padding-inline="32"]) { padding-inline: var(--primitives-space-32); }
	:host([padding-inline="40"]) { padding-inline: var(--primitives-space-40); }
	:host([padding-inline="44"]) { padding-inline: var(--primitives-space-44); }
	:host([padding-inline="48"]) { padding-inline: var(--primitives-space-48); }
	:host([padding-inline="56"]) { padding-inline: var(--primitives-space-56); }
	:host([padding-inline="64"]) { padding-inline: var(--primitives-space-64); }
	:host([padding-inline="80"]) { padding-inline: var(--primitives-space-80); }
	:host([padding-inline="96"]) { padding-inline: var(--primitives-space-96); }


	/* # Padding — block */

	:host([padding-block="none"]) { padding-block: 0; }
	:host([padding-block="md"]) { padding-block: var(--primitives-space-md); }
	:host([padding-block="2"]) { padding-block: var(--primitives-space-2); }
	:host([padding-block="4"]) { padding-block: var(--primitives-space-4); }
	:host([padding-block="6"]) { padding-block: var(--primitives-space-6); }
	:host([padding-block="8"]) { padding-block: var(--primitives-space-8); }
	:host([padding-block="10"]) { padding-block: var(--primitives-space-10); }
	:host([padding-block="12"]) { padding-block: var(--primitives-space-12); }
	:host([padding-block="16"]) { padding-block: var(--primitives-space-16); }
	:host([padding-block="20"]) { padding-block: var(--primitives-space-20); }
	:host([padding-block="24"]) { padding-block: var(--primitives-space-24); }
	:host([padding-block="28"]) { padding-block: var(--primitives-space-28); }
	:host([padding-block="32"]) { padding-block: var(--primitives-space-32); }
	:host([padding-block="40"]) { padding-block: var(--primitives-space-40); }
	:host([padding-block="44"]) { padding-block: var(--primitives-space-44); }
	:host([padding-block="48"]) { padding-block: var(--primitives-space-48); }
	:host([padding-block="56"]) { padding-block: var(--primitives-space-56); }
	:host([padding-block="64"]) { padding-block: var(--primitives-space-64); }
	:host([padding-block="80"]) { padding-block: var(--primitives-space-80); }
	:host([padding-block="96"]) { padding-block: var(--primitives-space-96); }


	/* # Padding — top */

	:host([padding-top="none"]) { padding-top: 0; }
	:host([padding-top="md"]) { padding-top: var(--primitives-space-md); }
	:host([padding-top="2"]) { padding-top: var(--primitives-space-2); }
	:host([padding-top="4"]) { padding-top: var(--primitives-space-4); }
	:host([padding-top="6"]) { padding-top: var(--primitives-space-6); }
	:host([padding-top="8"]) { padding-top: var(--primitives-space-8); }
	:host([padding-top="10"]) { padding-top: var(--primitives-space-10); }
	:host([padding-top="12"]) { padding-top: var(--primitives-space-12); }
	:host([padding-top="16"]) { padding-top: var(--primitives-space-16); }
	:host([padding-top="20"]) { padding-top: var(--primitives-space-20); }
	:host([padding-top="24"]) { padding-top: var(--primitives-space-24); }
	:host([padding-top="28"]) { padding-top: var(--primitives-space-28); }
	:host([padding-top="32"]) { padding-top: var(--primitives-space-32); }
	:host([padding-top="40"]) { padding-top: var(--primitives-space-40); }
	:host([padding-top="44"]) { padding-top: var(--primitives-space-44); }
	:host([padding-top="48"]) { padding-top: var(--primitives-space-48); }
	:host([padding-top="56"]) { padding-top: var(--primitives-space-56); }
	:host([padding-top="64"]) { padding-top: var(--primitives-space-64); }
	:host([padding-top="80"]) { padding-top: var(--primitives-space-80); }
	:host([padding-top="96"]) { padding-top: var(--primitives-space-96); }


	/* # Padding — right */

	:host([padding-right="none"]) { padding-right: 0; }
	:host([padding-right="md"]) { padding-right: var(--primitives-space-md); }
	:host([padding-right="2"]) { padding-right: var(--primitives-space-2); }
	:host([padding-right="4"]) { padding-right: var(--primitives-space-4); }
	:host([padding-right="6"]) { padding-right: var(--primitives-space-6); }
	:host([padding-right="8"]) { padding-right: var(--primitives-space-8); }
	:host([padding-right="10"]) { padding-right: var(--primitives-space-10); }
	:host([padding-right="12"]) { padding-right: var(--primitives-space-12); }
	:host([padding-right="16"]) { padding-right: var(--primitives-space-16); }
	:host([padding-right="20"]) { padding-right: var(--primitives-space-20); }
	:host([padding-right="24"]) { padding-right: var(--primitives-space-24); }
	:host([padding-right="28"]) { padding-right: var(--primitives-space-28); }
	:host([padding-right="32"]) { padding-right: var(--primitives-space-32); }
	:host([padding-right="40"]) { padding-right: var(--primitives-space-40); }
	:host([padding-right="44"]) { padding-right: var(--primitives-space-44); }
	:host([padding-right="48"]) { padding-right: var(--primitives-space-48); }
	:host([padding-right="56"]) { padding-right: var(--primitives-space-56); }
	:host([padding-right="64"]) { padding-right: var(--primitives-space-64); }
	:host([padding-right="80"]) { padding-right: var(--primitives-space-80); }
	:host([padding-right="96"]) { padding-right: var(--primitives-space-96); }


	/* # Padding — bottom */

	:host([padding-bottom="none"]) { padding-bottom: 0; }
	:host([padding-bottom="md"]) { padding-bottom: var(--primitives-space-md); }
	:host([padding-bottom="2"]) { padding-bottom: var(--primitives-space-2); }
	:host([padding-bottom="4"]) { padding-bottom: var(--primitives-space-4); }
	:host([padding-bottom="6"]) { padding-bottom: var(--primitives-space-6); }
	:host([padding-bottom="8"]) { padding-bottom: var(--primitives-space-8); }
	:host([padding-bottom="10"]) { padding-bottom: var(--primitives-space-10); }
	:host([padding-bottom="12"]) { padding-bottom: var(--primitives-space-12); }
	:host([padding-bottom="16"]) { padding-bottom: var(--primitives-space-16); }
	:host([padding-bottom="20"]) { padding-bottom: var(--primitives-space-20); }
	:host([padding-bottom="24"]) { padding-bottom: var(--primitives-space-24); }
	:host([padding-bottom="28"]) { padding-bottom: var(--primitives-space-28); }
	:host([padding-bottom="32"]) { padding-bottom: var(--primitives-space-32); }
	:host([padding-bottom="40"]) { padding-bottom: var(--primitives-space-40); }
	:host([padding-bottom="44"]) { padding-bottom: var(--primitives-space-44); }
	:host([padding-bottom="48"]) { padding-bottom: var(--primitives-space-48); }
	:host([padding-bottom="56"]) { padding-bottom: var(--primitives-space-56); }
	:host([padding-bottom="64"]) { padding-bottom: var(--primitives-space-64); }
	:host([padding-bottom="80"]) { padding-bottom: var(--primitives-space-80); }
	:host([padding-bottom="96"]) { padding-bottom: var(--primitives-space-96); }


	/* # Padding — left */

	:host([padding-left="none"]) { padding-left: 0; }
	:host([padding-left="md"]) { padding-left: var(--primitives-space-md); }
	:host([padding-left="2"]) { padding-left: var(--primitives-space-2); }
	:host([padding-left="4"]) { padding-left: var(--primitives-space-4); }
	:host([padding-left="6"]) { padding-left: var(--primitives-space-6); }
	:host([padding-left="8"]) { padding-left: var(--primitives-space-8); }
	:host([padding-left="10"]) { padding-left: var(--primitives-space-10); }
	:host([padding-left="12"]) { padding-left: var(--primitives-space-12); }
	:host([padding-left="16"]) { padding-left: var(--primitives-space-16); }
	:host([padding-left="20"]) { padding-left: var(--primitives-space-20); }
	:host([padding-left="24"]) { padding-left: var(--primitives-space-24); }
	:host([padding-left="28"]) { padding-left: var(--primitives-space-28); }
	:host([padding-left="32"]) { padding-left: var(--primitives-space-32); }
	:host([padding-left="40"]) { padding-left: var(--primitives-space-40); }
	:host([padding-left="44"]) { padding-left: var(--primitives-space-44); }
	:host([padding-left="48"]) { padding-left: var(--primitives-space-48); }
	:host([padding-left="56"]) { padding-left: var(--primitives-space-56); }
	:host([padding-left="64"]) { padding-left: var(--primitives-space-64); }
	:host([padding-left="80"]) { padding-left: var(--primitives-space-80); }
	:host([padding-left="96"]) { padding-left: var(--primitives-space-96); }
`;
