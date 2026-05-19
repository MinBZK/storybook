import { css } from 'lit';

export const codeStyles = css`


	/* # Host */

	:host {
		--_corner-radius: var(--primitives-corner-radius-lg);
		--_background-color: var(--semantics-surfaces-tinted-background-color);
		--_block-padding: var(--primitives-space-16);
		--_inline-padding: var(--primitives-space-16);
		--_content-color: var(--semantics-content-color);
		--_font: var(--primitives-font-monospace-sm-regular-snug);

		display: block;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.code {
		margin: 0;
		border-radius: var(--_corner-radius);
		background-color: var(--_background-color);
		overflow-x: auto;
		padding: var(--_block-padding) var(--_inline-padding);
		color: var(--_content-color);
		font: var(--_font);
		white-space: pre;
	}

	:host([wrap]) .code {
		overflow-x: visible;
		white-space: pre-wrap;
		word-break: break-word;
	}

	/* Lit reflects empty-string props as language=""; exclude that case */
	:host([language]:not([language=""])) slot {
		display: none;
	}

	.code__highlighted {
		color: inherit;
		font: inherit;
	}


	/* # Tokens */

	.token.comment,
	.token.prolog,
	.token.doctype,
	.token.cdata { color: var(--components-code-token-comment-color); font-style: italic; }

	.token.punctuation { color: var(--components-code-token-punctuation-color); }

	.token.namespace { opacity: 0.7; }

	.token.keyword { color: var(--components-code-token-keyword-color); }
	.token.string,
	.token.char { color: var(--components-code-token-string-color); }
	.token.number { color: var(--components-code-token-number-color); }
	.token.boolean { color: var(--components-code-token-boolean-color); }
	.token.null { color: var(--components-code-token-null-color); }
	.token.function { color: var(--components-code-token-function-color); }
	.token.class-name { color: var(--components-code-token-class-color); }
	.token.builtin { color: var(--components-code-token-builtin-color); }
	.token.tag { color: var(--components-code-token-tag-color); }
	.token.attr-name { color: var(--components-code-token-attr-name-color); }
	.token.attr-value { color: var(--components-code-token-attr-value-color); }
	.token.property { color: var(--components-code-token-property-color); }
	.token.selector { color: var(--components-code-token-selector-color); }
	.token.atrule { color: var(--components-code-token-atrule-color); }
	.token.regex { color: var(--components-code-token-regex-color); }
	.token.url { color: var(--components-code-token-url-color); }
	.token.operator { color: var(--components-code-token-operator-color); }
	.token.constant { color: var(--components-code-token-constant-color); }
	.token.deleted { color: var(--components-code-token-deleted-color); }
	.token.inserted { color: var(--components-code-token-inserted-color); }
	.token.important { color: var(--components-code-token-important-color); font-weight: bold; }
	.token.symbol { color: var(--components-code-token-symbol-color); }
	.token.entity { color: var(--components-code-token-entity-color); }
	.token.variable { color: var(--components-code-token-variable-color); }
	.token.key { color: var(--components-code-token-property-color); }

	.token.bold { font-weight: bold; }
	.token.italic { font-style: italic; }
`;
