import { html } from 'lit';
import type { NLDDKeyboardShortcut } from './keyboard-shortcut.js';

export function template(component: NLDDKeyboardShortcut) {
	const keys = component._parsedKeys;

	if (keys.length === 0) {
		return html`
			<kbd class="keyboard-shortcut">
				<slot></slot>
			</kbd>
		`;
	}

	return html`
		<kbd class="keyboard-shortcut">
			${keys.map((key, index) => html`
				${index > 0 ? html`<span class="keyboard-shortcut__separator" aria-hidden="true">+</span>` : ''}
				<kbd class="keyboard-shortcut__key">${key}</kbd>
			`)}
		</kbd>
	`;
}
