import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './icon.styles.js';
import { template } from './icon.template.js';
import { aliases } from './icon-aliases.js';
import { iconRegistry } from './icon-registry.js';

export { aliases };

export const ICONS: string[] = [
	...iconRegistry.keys(),
	...Object.keys(aliases),
].sort();

/**
 * A customizable icon component that renders SVG icons from a predefined library.
 *
 * @element nldd-icon
 *
 * @attr {string} name - The name of the icon to display
 *
 * @example
 * ```html
 * <nldd-icon name="heart"></nldd-icon>
 * ```
 */
@customElement('nldd-icon')
export class NLDDIcon extends LitElement {
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

		console.warn(`NLDDIcon: icon "${resolvedName}" not found`);
		return null;
	}

	override render() {
		return template(this._iconSvg);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-icon': NLDDIcon;
	}
}
