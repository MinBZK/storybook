import { html, nothing, svg } from 'lit';
import type { RRMenuBarItem } from './rr-menu-bar.js';
import type { RRMenuBar } from './rr-menu-bar.js';

const chevronDownIcon = svg`
	<svg
		class="overflow-icon"
		viewBox="0 0 24 24"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M11.9995 15.1715L3.4 6.59998L2 7.99998L11.9995 18L22 7.99998L20.6 6.59998L11.9995 15.1715Z"/>
	</svg>
`;

export function menuBarItemTemplate(this: RRMenuBarItem) {
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

export function template(this: RRMenuBar) {
	return html`
		<div
			class="container"
			part="container"
		>
			<slot name="title"></slot>
			<nav
				class="menu"
				part="menu"
				role="none"
			>
				<slot></slot>
				${this.hasOverflowMenu ? html`
					<div class="overflow-wrapper">
						<button
							class="overflow-button"
							part="overflow-button"
							aria-expanded="false"
							aria-haspopup="menu"
							aria-controls=${this._overflowMenuId}
							@click=${this._toggleOverflowMenu}
							@keydown=${this._handleOverflowButtonKeyDown}
						>
							${this.overflowLabel}
							${chevronDownIcon}
						</button>
						<div
							class="overflow-dropdown"
							part="overflow-menu"
							id=${this._overflowMenuId}
							aria-label=${this.overflowLabel}
						></div>
					</div>
				` : ''}
			</nav>
		</div>
	`;
}
