import { html, nothing } from 'lit';
import type { RRMenuBarItem } from './rr-menu-bar-item.js';

export function template(this: RRMenuBarItem) {
	const safeHref = this._sanitizeUrl(this.href);
	const isLink = Boolean(safeHref);
	const tabindex = this.disabled ? '-1' : '0';

	if (isLink) {
		return html`
			<a
				class="menu-bar-item"
				part="link"
				href=${safeHref!}
				aria-disabled=${this.disabled}
				aria-current=${this.selected ? 'page' : nothing}
				tabindex=${tabindex}
			>
				<span class="hover-indicator"></span>
				<span class="selection-indicator" part="indicator"></span>
				<span class="content">
					<slot></slot>
				</span>
			</a>
		`;
	}

	return html`
		<button
			class="menu-bar-item"
			part="link"
			type="button"
			?disabled=${this.disabled}
			aria-current=${this.selected ? 'page' : nothing}
			tabindex=${tabindex}
		>
			<span class="hover-indicator"></span>
			<span class="selection-indicator" part="indicator"></span>
			<span class="content">
				<slot></slot>
			</span>
		</button>
	`;
}
