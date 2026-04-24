import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.js';

const smMax = unsafeCSS(breakpoints.smMax);

export const blockquoteStyles = css`


	/* # Host */

	:host {
		--_spacing: var(--semantics-blockquotes-md-spacing);
		--_quote-font: var(--semantics-blockquotes-md-quote-font);
		display: block;
		max-width: var(--semantics-blockquotes-max-width);
	}

	@media (max-width: ${smMax}) {
		:host {
			--_spacing: var(--semantics-blockquotes-sm-spacing);
			--_quote-font: var(--semantics-blockquotes-sm-quote-font);
		}
	}

	@container layout-area (max-width: ${smMax}) {
		:host {
			--_spacing: var(--semantics-blockquotes-sm-spacing);
			--_quote-font: var(--semantics-blockquotes-sm-quote-font);
		}
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.blockquote {
		margin: 0;
		padding-inline: var(--_spacing);
		padding-top: var(--_spacing);
		border-top: var(--semantics-blockquotes-border);
		border-left: var(--semantics-blockquotes-border);
		border-top-left-radius: var(--semantics-blockquotes-corner-radius);
		color: var(--semantics-content-color);
		display: flex;
		flex-direction: column;
		gap: var(--_spacing);
	}


	/* # Elements */

	.blockquote__quote {
		font: var(--_quote-font);
	}

	.blockquote__attribution {
		font: var(--primitives-font-body-sm-regular-flat);
	}

	.blockquote__attribution::before {
		content: "— ";
	}

	.blockquote__attribution[hidden] {
		display: none;
	}
`;
