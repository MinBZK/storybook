import { html, nothing } from 'lit';
import type { RRSplitButton } from './rr-split-button.ts';

export function template(this: RRSplitButton) {
	return html`
		<div class="split-button">
			<rr-button
				variant=${this.variant}
				size=${this.size}
				text=${this.text}
				start-icon=${this.startIcon || nothing}
				?disabled=${this.disabled}
				@click=${this._handleActionClick}
			></rr-button>
			<div class="split-button__divider"></div>
			<rr-icon-button
				variant=${this.variant}
				size=${this.size}
				icon="chevron-down-small"
				text=${this._t('components.split-button.menu-action')}
				?disabled=${this.disabled}
				aria-haspopup="menu"
				@click=${this._handleMenuClick}
			></rr-icon-button>
		</div>
	`;
}
