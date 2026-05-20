import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { iconStyles } from './icon.styles.js';
import { template } from './icon.template.js';
import { aliases } from './icon-aliases.js';
import { iconRegistry } from './icon-registry.js';

export { aliases };

export const ICONS: string[] = [
	...iconRegistry.keys(),
	...Object.keys(aliases),
].sort();

export type IconSize = '' | '16' | '20' | '24' | '28' | '32' | '40' | '44' | '48' | '56' | '64' | '80' | '96';

export type IconColor =
	| ''
	/* Functional */
	| 'primary-content' | 'secondary-content' | 'accent' | 'critical' | 'warning' | 'success'
	/* Descriptief — rijkskleuren */
	| 'lintblauw' | 'donkerblauw' | 'hemelblauw' | 'lichtblauw'
	| 'paars' | 'violet' | 'robijnrood' | 'roze'
	| 'rood' | 'oranje' | 'donkergeel' | 'geel'
	| 'donkerbruin' | 'bruin' | 'donkergroen' | 'groen' | 'mosgroen' | 'mintgroen';

/**
 * A customizable icon component that renders SVG icons from a predefined library.
 *
 * Icons are decorative by default: the host gets `aria-hidden="true"` automatically.
 * If you want the icon to be announced by assistive tech, set `aria-hidden="false"`
 * on the consumer side together with an `aria-label`.
 *
 * Sizing: by default the icon fills its parent (existing behaviour). Set `size`
 * to pin to a fixed spacer-aligned dimension (16–96px).
 *
 * Colour: by default the icon inherits its parent's `color`. Set `color` to one
 * of the functional semantics (`primary-content`, `secondary-content`,
 * `accent`, `critical`, `warning`, `success`) or a rijkskleur (`lintblauw`,
 * `paars`, `groen`, …). For arbitrary one-off colours, set `style="color: …"`
 * on the host — the inherited `color` still drives the SVG fill/stroke.
 *
 * @element nldd-icon
 *
 * @attr {string} name  - The name of the icon to display
 * @attr {string} size  - Fixed size in px (spacer-aligned: 16, 20, 24, 28, 32,
 *                        40, 44, 48, 56, 64, 80, 96). Empty = inherit from parent.
 * @attr {string} color - Functional (`primary-content`, `secondary-content`,
 *                        `accent`, `critical`, `warning`, `success`) or
 *                        rijkskleur (`lintblauw`, `donkerblauw`, `hemelblauw`,
 *                        `lichtblauw`, `paars`, `violet`, `robijnrood`,
 *                        `roze`, `rood`, `oranje`, `donkergeel`, `geel`,
 *                        `donkerbruin`, `bruin`, `donkergroen`, `groen`,
 *                        `mosgroen`, `mintgroen`). Empty = inherit `color`
 *                        from parent.
 *
 * @example
 * ```html
 * <nldd-icon name="heart"></nldd-icon>
 * <nldd-icon name="trash" size="24" color="critical"></nldd-icon>
 * <nldd-icon name="leaf" size="32" color="mosgroen"></nldd-icon>
 * ```
 */
@customElement('nldd-icon')
export class NLDDIcon extends LitElement {
	static override styles = iconStyles;

	@property({ type: String })
	name = 'circle-dashed';

	@property({ type: String, reflect: true })
	size: IconSize = '';

	@property({ type: String, reflect: true })
	color: IconColor = '';

	@state()
	private _iconSvg: string | null = null;

	override connectedCallback(): void {
		super.connectedCallback();
		if (!this.hasAttribute('aria-hidden')) {
			this.setAttribute('aria-hidden', 'true');
		}
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

		if (import.meta.env?.DEV) console.warn(`NLDDIcon: icon "${resolvedName}" not found`);
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
