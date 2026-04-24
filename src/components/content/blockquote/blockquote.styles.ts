import { css } from 'lit';

export const blockquoteStyles = css`


	/* # Host */

	:host {
		display: block;
		max-width: var(--semantics-blockquotes-max-width);
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.blockquote {
		margin: 0;
		padding-inline: var(--semantics-blockquotes-spacing);
		padding-top: var(--semantics-blockquotes-spacing);
		border-top: var(--semantics-blockquotes-border);
		border-left: var(--semantics-blockquotes-border);
		border-top-left-radius: var(--semantics-blockquotes-corner-radius);
		color: var(--semantics-content-color);
		display: flex;
		flex-direction: column;
		gap: var(--semantics-blockquotes-spacing);
	}


	/* # Elements */

	.blockquote__quote {
		font: var(--semantics-blockquotes-quote-font);
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
