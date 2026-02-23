import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { aliases } from './rr-icon-aliases.js';

const iconCache = new Map<string, string>();

/**
 * A customizable icon component that renders SVG icons from a predefined library.
 * 
 * @element rr-icon
 * 
 * @attr {string} name - The name of the icon to display
 * 
 * @example
 * ```html
 * <rr-icon name="heart"></rr-icon>
 * ```
 */
@customElement('rr-icon')
export class RRIcon extends LitElement {
	@property({ type: String }) name = 'circle-dashed';
	@state() private _iconSvg: string | null = null;

	static styles = css`
		:host {
			display: inline-block;
			width: 100%;
			height: 100%;
			aspect-ratio: 1 / 1;
			color: inherit;
		}
		.icon__container {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		svg {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	`;

	async connectedCallback() {
		super.connectedCallback();
		await this._loadIcon(this.name);
	}

	async updated(changedProperties: Map<string, unknown>) {
		if (changedProperties.has('name') && this.name) {
			await this._loadIcon(this.name);
		}
	}

	private async _loadIcon(name: string) {
		const resolvedName = aliases[name] ?? name;

		if (iconCache.has(resolvedName)) {
			this._iconSvg = iconCache.get(resolvedName)!;
			return;
		}

		try {
			const module = await import(`./rr-icons/${resolvedName}.svg?raw`);
			iconCache.set(resolvedName, module.default);
			this._iconSvg = module.default;
		} catch {
			console.warn(`RRIcon: icon "${resolvedName}" not found`);
			this._iconSvg = null;
		}
	}

	render() {
		if (!this._iconSvg) {
			return html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"></svg>`;
		}
		return html`
			<div class="icon__container">
				${unsafeHTML(this._iconSvg)}
			</div>
		`;
	}
}