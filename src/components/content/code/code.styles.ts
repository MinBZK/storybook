import { css } from 'lit';

export const codeStyles = css`


	/* # Host */

	:host {
		--_background-color: var(--semantics-surfaces-tinted-background-color);
		--_content-color: var(--semantics-content-color);
		--_inline-padding: var(--primitives-space-16);
		--_block-padding: var(--primitives-space-16);
		--_corner-radius: var(--primitives-corner-radius-lg);
		--_font: var(--primitives-font-monospace-sm-regular-snug);

		/* Token theme — Solarized-inspired, mapped to descriptive DS palettes.
		   Override per-instance to swap colors. */
		--_token-comment-color: var(--semantics-content-secondary-color);
		--_token-punctuation-color: var(--_content-color);
		--_token-keyword-color: var(--primitives-color-donkergeel-650);
		--_token-string-color: var(--primitives-color-groen-650);
		--_token-number-color: var(--primitives-color-oranje-650);
		--_token-boolean-color: var(--primitives-color-oranje-650);
		--_token-null-color: var(--primitives-color-oranje-650);
		--_token-function-color: var(--primitives-color-lintblauw-650);
		--_token-class-color: var(--primitives-color-donkergeel-650);
		--_token-builtin-color: var(--primitives-color-donkergeel-650);
		--_token-tag-color: var(--primitives-color-groen-650);
		--_token-attr-name-color: var(--primitives-color-lintblauw-650);
		--_token-attr-value-color: var(--primitives-color-mintgroen-650);
		--_token-property-color: var(--primitives-color-lintblauw-650);
		--_token-selector-color: var(--primitives-color-donkergeel-650);
		--_token-atrule-color: var(--primitives-color-groen-650);
		--_token-regex-color: var(--primitives-color-rood-650);
		--_token-url-color: var(--primitives-color-mintgroen-650);
		--_token-operator-color: var(--primitives-color-groen-650);
		--_token-constant-color: var(--primitives-color-oranje-650);
		--_token-deleted-color: var(--primitives-color-rood-650);
		--_token-inserted-color: var(--primitives-color-groen-650);
		--_token-important-color: var(--primitives-color-rood-650);
		--_token-symbol-color: var(--primitives-color-violet-650);
		--_token-entity-color: var(--primitives-color-paars-650);
		--_token-variable-color: var(--primitives-color-lintblauw-650);

		display: block;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.code {
		margin: 0;
		padding: var(--_block-padding) var(--_inline-padding);
		background-color: var(--_background-color);
		color: var(--_content-color);
		border-radius: var(--_corner-radius);
		font: var(--_font);
		overflow-x: auto;
		white-space: pre;
	}

	:host([wrap]) .code {
		overflow-x: visible;
		white-space: pre-wrap;
		word-break: break-word;
	}

	/* When highlighting is active, hide the raw slot output and show the
	   tokenised <code> instead. The slot stays in the tree as the source
	   of truth — slotchange listens there and feeds the highlighter.
	   Lit reflects empty-string properties as language="" attributes,
	   so we explicitly exclude that case. */
	:host([language]:not([language=""])) slot {
		display: none;
	}

	.code__highlighted {
		font: inherit;
		color: inherit;
	}


	/* # Tokens (Prism) */

	.token.comment,
	.token.prolog,
	.token.doctype,
	.token.cdata { color: var(--_token-comment-color); font-style: italic; }

	.token.punctuation { color: var(--_token-punctuation-color); }

	.token.namespace { opacity: 0.7; }

	.token.keyword { color: var(--_token-keyword-color); }
	.token.string,
	.token.char { color: var(--_token-string-color); }
	.token.number { color: var(--_token-number-color); }
	.token.boolean { color: var(--_token-boolean-color); }
	.token.null { color: var(--_token-null-color); }
	.token.function { color: var(--_token-function-color); }
	.token.class-name { color: var(--_token-class-color); }
	.token.builtin { color: var(--_token-builtin-color); }
	.token.tag { color: var(--_token-tag-color); }
	.token.attr-name { color: var(--_token-attr-name-color); }
	.token.attr-value { color: var(--_token-attr-value-color); }
	.token.property { color: var(--_token-property-color); }
	.token.selector { color: var(--_token-selector-color); }
	.token.atrule { color: var(--_token-atrule-color); }
	.token.regex { color: var(--_token-regex-color); }
	.token.url { color: var(--_token-url-color); }
	.token.operator { color: var(--_token-operator-color); }
	.token.constant { color: var(--_token-constant-color); }
	.token.deleted { color: var(--_token-deleted-color); }
	.token.inserted { color: var(--_token-inserted-color); }
	.token.important { color: var(--_token-important-color); font-weight: bold; }
	.token.symbol { color: var(--_token-symbol-color); }
	.token.entity { color: var(--_token-entity-color); }
	.token.variable { color: var(--_token-variable-color); }

	/* YAML key uses the property/keyword slot so YAML reads naturally */
	.token.key { color: var(--_token-property-color); }

	.token.bold { font-weight: bold; }
	.token.italic { font-style: italic; }
`;
