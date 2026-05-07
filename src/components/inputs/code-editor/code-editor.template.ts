import { html, nothing, TemplateResult } from 'lit';
import type { NLDDCodeEditor } from './code-editor.js';

export function codeEditorTemplate(component: NLDDCodeEditor): TemplateResult {
	return html`
		<div class="code-editor">
			<textarea class="code-editor__input"
				id=${component.inputId || nothing}
				rows=${component.rows}
				.value=${component.value}
				placeholder=${component.placeholder || nothing}
				?disabled=${component.disabled}
				?readonly=${component.readonly}
				?required=${component.required}
				spellcheck="false"
				autocomplete="off"
				autocorrect="off"
				autocapitalize="off"
				aria-label=${component.accessibleLabel || nothing}
				@input=${component._handleInput}
				@change=${component._handleChange}
			></textarea>
		</div>
	`;
}
