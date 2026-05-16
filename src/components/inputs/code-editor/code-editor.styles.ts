import { css } from 'lit';

export const codeEditorStyles = css`


	/* # Host */

	:host {
		--_background-color: var(--semantics-surfaces-tinted-background-color);
		--_content-color: var(--semantics-content-color);
		--_inline-padding: var(--primitives-space-16);
		--_block-padding: var(--primitives-space-16);
		--_corner-radius: var(--primitives-corner-radius-lg);
		--_font: var(--primitives-font-monospace-sm-regular-snug);

		/* flex column lets the textarea grow when the host has a fixed
		   height (e.g. as a flex item in a tall pane). With no set height,
		   the textarea falls back to its rows attribute.
		   flex: 1 + min-height: 0 make the host a good flex citizen so
		   consumers in flex parents don't have to set them on every use. */
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
		position: relative;
		display: flex;
		box-sizing: border-box;
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


	/* # Input */

	.code-editor__input {
		display: block;
		box-sizing: border-box;
		margin: 0;
		border: none;
		outline: none;
		background: transparent;
		min-height: 0;
		width: 100%;
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

	:host([resize='vertical']) .code-editor__input {
		resize: vertical;
	}

	:host([resize='none']) .code-editor__input {
		resize: none;
	}

	:host([resize='auto']) .code-editor__input {
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
