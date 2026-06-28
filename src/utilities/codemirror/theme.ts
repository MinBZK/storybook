import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';
import type { Extension } from '@codemirror/state';

/* CodeMirror's generated theme styles mount into the same root as the view
 * (the component's shadow root). CSS custom properties inherit across the
 * shadow boundary, so every var(--…) below resolves against settings.css and
 * adapts to light/dark mode automatically. Background and padding are left to
 * the host component (the box/simple variant owns the framing). */
const baseTheme = EditorView.theme({
	'&': {
		height: '100%',
		color: 'var(--semantics-content-color)',
		backgroundColor: 'transparent',
	},
	'&.cm-focused': {
		// The focus ring lives on the host (.code-editor:focus-within).
		outline: 'none',
	},
	'.cm-scroller': {
		fontFamily: 'inherit',
		lineHeight: 'inherit',
		overflow: 'auto',
	},
	'.cm-content': {
		padding: '0',
		caretColor: 'var(--semantics-content-color)',
	},
	'.cm-line': {
		padding: '0',
	},
	'.cm-cursor, .cm-dropCursor': {
		borderLeftColor: 'var(--semantics-content-color)',
	},
	'.cm-placeholder': {
		color: 'var(--semantics-input-fields-placeholder-color)',
	},
	'&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
		backgroundColor: 'color-mix(in srgb, var(--primitives-color-accent-600) 22%, transparent)',
	},
	'.cm-gutters': {
		border: 'none',
		backgroundColor: 'transparent',
		color: 'var(--semantics-input-fields-placeholder-color)',
	},
	// Breathing room between the line-number gutter and the code (VS Code-like).
	'.cm-lineNumbers .cm-gutterElement': {
		padding: '0 16px 0 8px',
	},
	'.cm-activeLine, .cm-activeLineGutter': {
		backgroundColor: 'transparent',
	},
});

/* Token colors reuse the existing code-viewer palette so the editor and the
 * read-only viewer highlight identically with one source of truth. */
const highlightStyle = HighlightStyle.define([
	{ tag: [t.comment, t.lineComment, t.blockComment, t.docComment], color: 'var(--components-code-viewer-token-comment-color)', fontStyle: 'italic' },
	{ tag: [t.keyword, t.modifier, t.controlKeyword, t.operatorKeyword], color: 'var(--components-code-viewer-token-keyword-color)' },
	{ tag: [t.string, t.special(t.string), t.character], color: 'var(--components-code-viewer-token-string-color)' },
	{ tag: [t.number, t.integer, t.float], color: 'var(--components-code-viewer-token-number-color)' },
	{ tag: t.bool, color: 'var(--components-code-viewer-token-boolean-color)' },
	{ tag: t.null, color: 'var(--components-code-viewer-token-null-color)' },
	{ tag: [t.function(t.variableName), t.function(t.propertyName)], color: 'var(--components-code-viewer-token-function-color)' },
	{ tag: [t.className, t.typeName, t.namespace], color: 'var(--components-code-viewer-token-class-color)' },
	{ tag: [t.propertyName, t.attributeName], color: 'var(--components-code-viewer-token-property-color)' },
	{ tag: [t.punctuation, t.separator, t.bracket], color: 'var(--components-code-viewer-token-punctuation-color)' },
	{ tag: t.operator, color: 'var(--components-code-viewer-token-operator-color)' },
	{ tag: t.tagName, color: 'var(--components-code-viewer-token-tag-color)' },
	{ tag: t.attributeValue, color: 'var(--components-code-viewer-token-attr-value-color)' },
	{ tag: t.variableName, color: 'var(--components-code-viewer-token-variable-color)' },
	{ tag: [t.constant(t.variableName), t.standard(t.variableName)], color: 'var(--components-code-viewer-token-constant-color)' },
	{ tag: t.regexp, color: 'var(--components-code-viewer-token-regex-color)' },
	{ tag: t.url, color: 'var(--components-code-viewer-token-url-color)' },
	{ tag: t.strong, fontWeight: 'bold' },
	{ tag: t.emphasis, fontStyle: 'italic' },
]);

/** Theme + syntax highlighting as one extension, shared by all DS editors. */
export const nlddCodeMirrorTheme: Extension = [baseTheme, syntaxHighlighting(highlightStyle)];
