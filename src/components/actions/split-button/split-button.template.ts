import { html, nothing } from 'lit';
import type { NDDSplitButton } from './ndd-split-button.ts';

export function template(this: NDDSplitButton) {
	return html`
		<div class="split-button">
			<ndd-button
				variant=${this.variant}
				size=${this.size}
				text=${this.text}
				start-icon=${this.startIcon || nothing}
				?disabled=${this.disabled}
				@click=${this._handleActionClick}
			></ndd-button>
			<div class="split-button__divider"></div>
			<ndd-icon-button
				variant=${this.variant}
				size=${this.size}
				icon="chevron-down-small"
				text=${this._t('components.split-button.menu-action')}
				?disabled=${this.disabled}
				aria-haspopup="menu"
				@click=${this._handleMenuClick}
			></ndd-icon-button>
		</div>
	`;
}
