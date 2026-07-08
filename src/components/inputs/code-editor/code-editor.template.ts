import { html, TemplateResult } from 'lit';
import type { NLDDCodeEditor } from './code-editor.js';

export function codeEditorTemplate(_component: NLDDCodeEditor): TemplateResult {
	// CodeMirror mounts into and owns .code-editor; keep this element free of
	// Lit expressions so re-renders never touch the editor's own DOM.
	return html`<div class="code-editor"></div>`;
}
