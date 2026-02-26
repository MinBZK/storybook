import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './rr-icon.styles.js';
import { template } from './rr-icon.template.js';
import { aliases } from './rr-icon-aliases.js';

const iconModules = import.meta.glob('/src/components/content/icon/rr-icons/*.svg', { eager: false });

const svgIcons: string[] = Object.keys(iconModules)
	.map(path => path.replace('/src/components/content/icon/rr-icons/', '').replace('.svg', ''))
	.sort();

export { aliases };

export const ICONS: string[] = [
	...svgIcons,
	...Object.keys(aliases),
].sort();

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
	static override styles = styles;

	@property({ type: String })
	name = 'circle-dashed';

	@state()
	private _iconSvg: string | null = null;

	override async connectedCallback(): Promise<void> {
		super.connectedCallback();
		this._iconSvg = await this._loadIcon(this.name);
	}

	override async updated(changedProperties: Map<string, unknown>): Promise<void> {
		if (changedProperties.has('name') && this.name) {
			this._iconSvg = await this._loadIcon(this.name);
		}
	}

	private async _loadIcon(name: string): Promise<string | null> {
		const resolvedName = aliases[name] ?? name;

		if (iconCache.has(resolvedName)) {
			return iconCache.get(resolvedName)!;
		}

		try {
			const module = await import(`./rr-icons/${resolvedName}.svg?raw`);
			iconCache.set(resolvedName, module.default);
			return module.default;
		} catch {
			console.warn(`RRIcon: icon "${resolvedName}" not found`);
			return null;
		}
	}

	override render() {
		return template(this._iconSvg);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-icon': RRIcon;
	}
}
