import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/slotted-reset.js';

export const codeEditorStyles = css`


	/* # Host */

	:host {
		--_corner-radius: var(--primitives-corner-radius-lg);
		--_background-color: var(--semantics-surfaces-tinted-background-color);
		--_block-padding: var(--primitives-space-16);
		--_inline-padding: var(--primitives-space-16);
		--_content-color: var(--semantics-content-color);
		--_font: var(--primitives-font-monospace-sm-regular-snug);

		${inheritedTextReset}
		/* flex column + min-height:0 + flex:1 makes the host a good flex
		   citizen so a fixed-height parent grows the textarea; with no set
		   height it falls back to the rows attribute. */
		display: flex;
		min-height: 0;
		flex-direction: column;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: auto;
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.code-editor {
		box-sizing: border-box;
		display: flex;
		position: relative;
		border-radius: var(--_corner-radius);
		background-color: var(--_background-color);
		min-height: 0;
		overflow: hidden;
		flex-direction: column;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: auto;
	}

	:host([disabled]) .code-editor {
		opacity: var(--primitives-opacity-disabled);
	}

	.code-editor:focus-within {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}


	/* # Elements */

	.code-editor__input {
		box-sizing: border-box;
		display: block;
		margin: 0;
		outline: none;
		border: none;
		background: transparent;
		width: 100%;
		min-height: 0;
		padding: var(--_block-padding) var(--_inline-padding);
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: auto;
		color: var(--_content-color);
		font: var(--_font);
		tab-size: 2;
		white-space: pre;
		overflow-wrap: normal;
		appearance: none;
	}

	:host([wrap]) .code-editor__input {
		white-space: pre-wrap;
		overflow-wrap: break-word;
	}

	:host([resize="vertical"]) .code-editor__input {
		resize: vertical;
	}

	:host([resize="none"]) .code-editor__input {
		resize: none;
	}

	:host([resize="auto"]) .code-editor__input {
		resize: none;
		field-sizing: content;
	}

	:host([disabled]) .code-editor__input {
		pointer-events: none;
	}

	.code-editor__input::placeholder {
		color: var(--semantics-input-fields-placeholder-color);
	}
`;
