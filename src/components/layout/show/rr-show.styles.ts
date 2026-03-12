import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.ts';


/* # rr-show styles */

export const showStyles = css`
	:host {
		display: contents;
	}

	:host([query="container"]) {
		display: block;
		container-type: inline-size;
	}

	:host([hidden]) {
		display: none;
	}

	.show {
		display: contents;
	}


	/* # Above — viewport */

	:host([above="md"]:not([query="container"])) {
		@media (max-width: ${unsafeCSS(breakpoints.smMax)}) {
			display: none;
		}
	}

	:host([above="lg"]:not([query="container"])) {
		@media (max-width: ${unsafeCSS(breakpoints.mdMax)}) {
			display: none;
		}
	}


	/* # Above — container */

	:host([above="md"][query="container"]) .show {
		@container (max-width: ${unsafeCSS(breakpoints.smMax)}) {
			display: none;
		}
	}

	:host([above="lg"][query="container"]) .show {
		@container (max-width: ${unsafeCSS(breakpoints.mdMax)}) {
			display: none;
		}
	}


	/* # Below — viewport */

	:host([below="sm"]:not([query="container"])) {
		@media (min-width: ${unsafeCSS(breakpoints.mdMin)}) {
			display: none;
		}
	}

	:host([below="md"]:not([query="container"])) {
		@media (min-width: ${unsafeCSS(breakpoints.lgMin)}) {
			display: none;
		}
	}


	/* # Below — container */

	:host([below="sm"][query="container"]) .show {
		@container (min-width: ${unsafeCSS(breakpoints.mdMin)}) {
			display: none;
		}
	}

	:host([below="md"][query="container"]) .show {
		@container (min-width: ${unsafeCSS(breakpoints.lgMin)}) {
			display: none;
		}
	}


	/* # Only — viewport */

	:host([only="sm"]:not([query="container"])) {
		@media (min-width: ${unsafeCSS(breakpoints.mdMin)}) {
			display: none;
		}
	}

	:host([only="md"]:not([query="container"])) {
		@media (max-width: ${unsafeCSS(breakpoints.smMax)}) {
			display: none;
		}
		@media (min-width: ${unsafeCSS(breakpoints.lgMin)}) {
			display: none;
		}
	}

	:host([only="lg"]:not([query="container"])) {
		@media (max-width: ${unsafeCSS(breakpoints.mdMax)}) {
			display: none;
		}
	}


	/* # Only — container */

	:host([only="sm"][query="container"]) .show {
		@container (min-width: ${unsafeCSS(breakpoints.mdMin)}) {
			display: none;
		}
	}

	:host([only="md"][query="container"]) .show {
		@container (max-width: ${unsafeCSS(breakpoints.smMax)}) {
			display: none;
		}
		@container (min-width: ${unsafeCSS(breakpoints.lgMin)}) {
			display: none;
		}
	}

	:host([only="lg"][query="container"]) .show {
		@container (max-width: ${unsafeCSS(breakpoints.mdMax)}) {
			display: none;
		}
	}
`;
