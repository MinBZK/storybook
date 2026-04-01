import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './ndd-icon.styles.js';
import { template } from './ndd-icon.template.js';
import { aliases } from './ndd-icon-aliases.js';

const iconModules = import.meta.glob('./ndd-icons/*.svg', { query: '?raw', eager: true }) as Record<string, { default: string }>;

const iconRegistry = new Map<string, string>();
for (const [path, module] of Object.entries(iconModules)) {
	const name = path.replace('./ndd-icons/', '').replace('.svg', '');
	iconRegistry.set(name, module.default);
}

export { aliases };

export const ICONS: string[] = [
	...iconRegistry.keys(),
	...Object.keys(aliases),
].sort();

/**
 * A customizable icon component that renders SVG icons from a predefined library.
 *
 * @element ndd-icon
 *
 * @attr {string} name - The name of the icon to display
 *
 * @example
 * ```html
 * <ndd-icon name="heart"></ndd-icon>
 * ```
 */
@customElement('ndd-icon')
export class NDDIcon extends LitElement {
	static override styles = styles;

	@property({ type: String })
	name = 'circle-dashed';

	@state()
	private _iconSvg: string | null = null;

	override connectedCallback(): void {
		super.connectedCallback();
		this._iconSvg = this._loadIcon(this.name);
	}

	override updated(changedProperties: Map<string, unknown>): void {
		if (changedProperties.has('name') && this.name) {
			this._iconSvg = this._loadIcon(this.name);
		}
	}

	private _loadIcon(name: string): string | null {
		const resolvedName = aliases[name] ?? name;
		const svg = iconRegistry.get(resolvedName);

		if (svg) {
			return svg;
		}

		console.warn(`NDDIcon: icon "${resolvedName}" not found`);
		return null;
	}

	override render() {
		return template(this._iconSvg);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-icon': NDDIcon;
	}
}
