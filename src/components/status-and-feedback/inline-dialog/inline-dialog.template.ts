import { html, nothing } from 'lit';
import type { NLDDInlineDialog } from './inline-dialog.ts';

export function inlineDialogTemplate(component: NLDDInlineDialog) {
	return html`
		<div class="inline-dialog__body">
			${component._resolvedIconName ? html`
				<div class="inline-dialog__icon">
					<nldd-icon name=${component._resolvedIconName}></nldd-icon>
				</div>
			` : nothing}
			${component.text ? html`
				${component.headingLevel === 1 ? html`<h1 class="inline-dialog__text">${component.text}</h1>`
				: component.headingLevel === 2 ? html`<h2 class="inline-dialog__text">${component.text}</h2>`
				: component.headingLevel === 3 ? html`<h3 class="inline-dialog__text">${component.text}</h3>`
				: component.headingLevel === 4 ? html`<h4 class="inline-dialog__text">${component.text}</h4>`
				: component.headingLevel === 5 ? html`<h5 class="inline-dialog__text">${component.text}</h5>`
				: component.headingLevel === 6 ? html`<h6 class="inline-dialog__text">${component.text}</h6>`
				: html`<p class="inline-dialog__text">${component.text}</p>`}
			` : nothing}
			${component.supportingText ? html`
				<p class="inline-dialog__supporting-text">${component.supportingText}</p>
			` : nothing}
			<div class="inline-dialog__content">
				<slot></slot>
			</div>
			<div class="inline-dialog__actions">
				<nldd-button-group orientation="vertical">
					<slot name="actions"></slot>
				</nldd-button-group>
			</div>
		</div>
	`;
}
