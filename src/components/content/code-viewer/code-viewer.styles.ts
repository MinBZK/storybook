import { css } from 'lit';

export const codeViewerStyles = css`


	/* # Host */

	:host {
		--_corner-radius: var(--primitives-corner-radius-lg);
		--_background-color: var(--semantics-surfaces-tinted-background-color);
		--_block-padding: var(--primitives-space-16);
		--_inline-padding: var(--primitives-space-16);
		--_content-color: var(--semantics-content-color);
		--_font: var(--primitives-font-monospace-sm-regular-snug);
		--_actions-area-padding: var(--primitives-space-8);
		--_actions-area-size: calc(var(--semantics-controls-md-min-size) + var(--_actions-area-padding) * 2);
		--_actions-z-index: 1;

		display: flex;
		position: relative;
	}

	:host([hidden]) {
		display: none;
	}

	:host([background="base"]) {
		--_background-color: var(--semantics-surfaces-background-color);
	}

	:host([background="inherit"]) {
		--_background-color: transparent;
	}

	:host([no-box]) {
		--_corner-radius: 0;
		--_background-color: transparent;
		--_block-padding: 0;
		--_inline-padding: 0;
	}


	/* # Block */

	.code-viewer {
		box-sizing: border-box;
		display: flex;
		position: relative;
		margin: 0;
		border-radius: var(--_corner-radius);
		background-color: var(--_background-color);
		overflow-x: auto;
		padding: var(--_block-padding) var(--_inline-padding);
		flex-direction: column;
		flex-grow: 1;
		align-items: start;
		justify-content: center;
		color: var(--_content-color);
		font: var(--_font);
		white-space: pre;
	}

	:host(:not([no-copy])) .code-viewer {
		min-height: var(--_actions-area-size);
		padding-right: var(--_actions-area-size);
	}

	/* no-box + copy-button isn't a designed combination (the button is laid
	   out for the carded variant). Drop the min-height + reserved right-padding
	   so a naked snippet doesn't sit on an oversized vertical baseline. */
	:host([no-box]:not([no-copy])) .code-viewer {
		min-height: 0;
		padding-right: 0;
	}

	.code-viewer:focus-visible {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	.code-viewer:focus:not(:focus-visible) {
		outline: none;
	}

	:host([wrap]) .code-viewer {
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

	.code-viewer__actions {
		position: absolute;
		top: var(--_actions-area-padding);
		right: var(--_actions-area-padding);
		bottom: var(--_actions-area-padding);
		z-index: var(--_actions-z-index);
	}

	.code-viewer__copy-button {
		position: sticky;
		top: var(--_actions-area-padding);
	}

	/* Visually-hidden live region announces copy success/failure to
	   screen readers — the static accessible-label on the icon button
	   alone can't convey state changes. */

	.code-viewer__live-region {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}


	/* # Tokens */

	.token.comment,
	.token.prolog,
	.token.doctype,
	.token.cdata { color: var(--components-code-viewer-token-comment-color); font-style: italic; }
	.token.punctuation { color: var(--components-code-viewer-token-punctuation-color); }
	.token.namespace { opacity: 0.7; }
	.token.keyword { color: var(--components-code-viewer-token-keyword-color); }
	.token.string, .token.char { color: var(--components-code-viewer-token-string-color); }
	.token.number { color: var(--components-code-viewer-token-number-color); }
	.token.boolean { color: var(--components-code-viewer-token-boolean-color); }
	.token.null { color: var(--components-code-viewer-token-null-color); }
	.token.function { color: var(--components-code-viewer-token-function-color); }
	.token.class-name { color: var(--components-code-viewer-token-class-color); }
	.token.builtin { color: var(--components-code-viewer-token-builtin-color); }
	.token.tag { color: var(--components-code-viewer-token-tag-color); }
	.token.attr-name { color: var(--components-code-viewer-token-attr-name-color); }
	.token.attr-value { color: var(--components-code-viewer-token-attr-value-color); }
	.token.property { color: var(--components-code-viewer-token-property-color); }
	.token.selector { color: var(--components-code-viewer-token-selector-color); }
	.token.atrule { color: var(--components-code-viewer-token-atrule-color); }
	.token.regex { color: var(--components-code-viewer-token-regex-color); }
	.token.url { color: var(--components-code-viewer-token-url-color); }
	.token.operator { color: var(--components-code-viewer-token-operator-color); }
	.token.constant { color: var(--components-code-viewer-token-constant-color); }
	.token.deleted { color: var(--components-code-viewer-token-deleted-color); }
	.token.inserted { color: var(--components-code-viewer-token-inserted-color); }
	.token.important { color: var(--components-code-viewer-token-important-color); font-weight: bold; }
	.token.symbol { color: var(--components-code-viewer-token-symbol-color); }
	.token.entity { color: var(--components-code-viewer-token-entity-color); }
	.token.variable { color: var(--components-code-viewer-token-variable-color); }
	.token.key { color: var(--components-code-viewer-token-property-color); }
	.token.bold { font-weight: bold; }
	.token.italic { font-style: italic; }
`;
