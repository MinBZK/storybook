import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './rr-icon.styles.js';
import { template } from './rr-icon.template.js';
import { aliases } from './rr-icon-aliases.js';

const iconModules = import.meta.glob('./rr-icons/*.svg', { query: '?raw', eager: true }) as Record<string, { default: string }>;

const iconRegistry = new Map<string, string>();
for (const [path, module] of Object.entries(iconModules)) {
	const name = path.replace('./rr-icons/', '').replace('.svg', '');
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

		console.warn(`RRIcon: icon "${resolvedName}" not found`);
		return null;
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
