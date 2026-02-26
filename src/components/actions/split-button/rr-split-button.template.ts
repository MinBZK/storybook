import { html } from 'lit';
import type { RRSplitButton } from './rr-split-button.ts';

export function template(this: RRSplitButton) {
	return html`
		<div class="split-button">
			<rr-button
				variant=${this.variant}
				size=${this.size}
				?disabled=${this.disabled}
				@click=${this._handleActionClick}
			>
				<slot></slot>
			</rr-button>
			<div class="split-button__divider"></div>
			<rr-icon-button
				variant=${this.variant}
				size=${this.size}
				?disabled=${this.disabled}
				aria-haspopup="menu"
				@click=${this._handleMenuClick}
			>
				<rr-icon name="chevron-down-small"></rr-icon>
				Meer opties
			</rr-icon-button>
		</div>
	`;
}
