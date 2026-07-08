import { html, TemplateResult } from 'lit';
import type { NLDDTextEditor } from './text-editor.js';

export function textEditorTemplate(_component: NLDDTextEditor): TemplateResult {
	// CodeMirror mounts into and owns .text-editor; keep this element free of
	// Lit expressions so re-renders never touch the editor's own DOM.
	return html`<div class="text-editor"></div>`;
}
