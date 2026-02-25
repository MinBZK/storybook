import { html, nothing } from 'lit';
import type { RRButton } from './rr-button.ts';

interface TemplateHelpers {
	handleClick: (e: MouseEvent) => void;
	detectIconPosition: () => void;
}

export function template(this: RRButton, helpers: TemplateHelpers) {
	return html`
		<button
			class="button"
			part="button"
			type=${this.type}
			?disabled=${this.disabled}
			aria-disabled=${this.disabled}
			@click=${helpers.handleClick}
		>
			<span class="button__content">
				${this._iconStart ? html`
					<rr-icon
						class="button__start-icon"
						name=${this._iconStart.name}
					></rr-icon>
				` : nothing}
				<slot @slotchange=${helpers.detectIconPosition}></slot>
				${this._iconEnd ? html`
					<rr-icon
						class="button__end-icon"
						name=${this._iconEnd.name}
					></rr-icon>
				` : nothing}
				${this.isExpandable ? html`
					<rr-icon
						class="button__disclosure-icon"
						name="chevron-down-small"
					></rr-icon>
				` : nothing}
			</span>
		</button>
	`;
}
