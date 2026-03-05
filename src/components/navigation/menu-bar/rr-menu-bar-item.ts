import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { styles } from './rr-menu-bar-item.styles.js';
import { template } from './rr-menu-bar-item.template.js';

export class RRMenuBarItem extends LitElement {
	static override styles = styles;

	@property({ type: Boolean, reflect: true })
	selected = false;

	@property({ type: String })
	href = '';

	@property({ type: Boolean, reflect: true })
	disabled = false;

	override connectedCallback(): void {
		super.connectedCallback();
		this.setAttribute('role', 'none');
		this.addEventListener('click', this._handleClick);
		this.addEventListener('keydown', this._handleKeyDown);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener('click', this._handleClick);
		this.removeEventListener('keydown', this._handleKeyDown);
	}

	_sanitizeUrl(url: string | null): string | null {
		if (!url) return null;
		const trimmed = url.trim().toLowerCase();
		if (
			trimmed.startsWith('javascript:') ||
			trimmed.startsWith('data:') ||
			trimmed.startsWith('vbscript:')
		) {
			return null;
		}
		return url;
	}

	private _handleClick = (event: Event): void => {
		if (this.disabled) {
			event.preventDefault();
			event.stopPropagation();
			return;
		}
		if (!this.href) {
			event.preventDefault();
			this.selected = true;
			this.dispatchEvent(new CustomEvent('select', {
				bubbles: true,
				composed: true,
				detail: { item: this },
			}));
		}
	};

	private _handleKeyDown = (event: KeyboardEvent): void => {
		if (this.disabled) return;
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			this._handleClick(event);
		}
	};

	override render() {
		return template.call(this);
	}
}

if (!customElements.get('rr-menu-bar-item')) {
	customElements.define('rr-menu-bar-item', RRMenuBarItem);
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-menu-bar-item': RRMenuBarItem;
	}
}
