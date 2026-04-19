import { html, nothing } from 'lit';
import type { NLDDSplitButton } from './split-button.js';

export function template(this: NLDDSplitButton) {
	return html`
		<div class="split-button">
			<nldd-button
				variant=${this.variant}
				size=${this.size}
				text=${this.text}
				start-icon=${this.startIcon || nothing}
				?disabled=${this.disabled}
				@click=${this._handleActionClick}
			></nldd-button>
			<div class="split-button__divider"></div>
			<nldd-icon-button
				variant=${this.variant}
				size=${this.size}
				icon="chevron-down-small"
				text=${this._t('components.split-button.menu-action')}
				?disabled=${this.disabled}
				aria-haspopup="menu"
				@click=${this._handleMenuClick}
			></nldd-icon-button>
		</div>
	`;
}
