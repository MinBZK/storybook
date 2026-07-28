import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { reflectNonDefault } from '../../../utilities/reflect-non-default.js';
import { iconStyles } from './icon.styles.js';
import { template } from './icon.template.js';
import { aliases } from './icon-aliases.js';
import { iconRegistry } from './icon-registry.js';

export { aliases };

export const ICONS: string[] = [
	...iconRegistry.keys(),
	...Object.keys(aliases),
].sort();

export type IconSize = '' | 'full' | 'inherit' | '16' | '20' | '24' | '28' | '32' | '40' | '44' | '48' | '56' | '64' | '80' | '96';

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
 * Sizing: the icon fills whatever sizes it — an `nldd-icon-cell`, a button, a
 * menu item. `size="full"` names that default explicitly. `size="inherit"` makes
 * it follow the surrounding text (1em), for an icon set inline in a sentence.
 * Any spacer-aligned number (16–96) pins a fixed dimension.
 *
 * Reach for `inherit` rather than a global `nldd-icon { width: 1em }` rule in
 * the consumer: such a rule wins over the component's own :host styling and so
 * also shrinks the icons that a cell or button was already sizing correctly.
 *
 * Color: by default the icon inherits its parent's `color`. Set `color` to one
 * of the functional semantics (`primary-content`, `secondary-content`,
 * `accent`, `critical`, `warning`, `success`) or a rijkskleur (`lintblauw`,
 * `paars`, `groen`, …). For arbitrary one-off colors, set `style="color: …"`
 * on the host — the inherited `color` still drives the SVG fill/stroke.
 *
 * @element nldd-icon
 *
 * @attr {string} name - The name of the icon to display
 * @attr {string} size - `full` (default) fills the container; `inherit` follows the surrounding text (1em); or a fixed spacer-aligned size in px (16, 20, 24, 28, 32, 40, 44, 48, 56, 64, 80, 96). Empty behaves as `full`.
 * @attr {string} color - Functional (`primary-content`, `secondary-content`, `accent`, `critical`, `warning`, `success`) or rijkskleur (`lintblauw`, `donkerblauw`, `hemelblauw`, `lichtblauw`, `paars`, `violet`, `robijnrood`, `roze`, `rood`, `oranje`, `donkergeel`, `geel`, `donkerbruin`, `bruin`, `donkergroen`, `groen`, `mosgroen`, `mintgroen`). Empty = inherit `color` from parent.
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

	@property({ reflect: true, converter: reflectNonDefault<IconSize>('') })
	size: IconSize = '';

	@property({ reflect: true, converter: reflectNonDefault<IconColor>('') })
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
