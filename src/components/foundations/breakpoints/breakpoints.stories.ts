import { html } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.js';

/**
 * Het design system definieert vijf vaste breakpoints die door alle responsive
 * componenten worden gebruikt. Ze zijn beschikbaar in CSS én in JavaScript zodat
 * media-queries en runtime-logica niet uit elkaar kunnen lopen.
 *
 * | Token   | Waarde   | Gebruik                                              |
 * | ------- | -------- | ---------------------------------------------------- |
 * | `smMin` | `320px`  | Kleinste ondersteunde viewport (kleine telefoons)    |
 * | `smMax` | `640px`  | Bovengrens van het sm-bereik                          |
 * | `mdMin` | `641px`  | Ondergrens van het md-bereik (tablets)               |
 * | `mdMax` | `1007px` | Bovengrens van het md-bereik                         |
 * | `lgMin` | `1008px` | Ondergrens van het lg-bereik (desktops en breder)    |
 *
 * ## Gebruik in CSS
 *
 * In `@media` of `@container` query conditions moeten altijd **letterlijke
 * waardes** staan — CSS-spec staat geen `var(--…)` toe in query conditions.
 * Componenten in het design system schrijven dus expliciet:
 *
 * ```css
 * @media (min-width: 641px) { … }       // mdMin
 * @container (min-width: 1008px) { … }  // lgMin
 * ```
 *
 * Daarom staan de breakpoints niet als CSS custom properties in `settings.css`:
 * `var(--…)` zou hier toch niet werken en zou alleen drift uitlokken met de
 * canonieke definitie in `breakpoints.ts`.
 *
 * ## Gebruik in JavaScript / TypeScript
 *
 * ```ts
 * import { breakpoints } from '@nldd/design-system/tokens';
 *
 * const isDesktop = matchMedia(`(min-width: ${breakpoints.lgMin})`).matches;
 * const isTablet  = matchMedia(`(min-width: ${breakpoints.mdMin}) and (max-width: ${breakpoints.mdMax})`).matches;
 *
 * // Of als getal voor berekeningen:
 * const lgMinPx = parseInt(breakpoints.lgMin); // 1008
 * ```
 *
 * Importeer ze altijd hier in plaats van waardes hardcoded — een toekomstige
 * design-update past dan automatisch alle consumenten aan zonder zoek-en-vervang.
 *
 * @element foundations-breakpoints
 */
export default {
	title: 'Foundations/Breakpoints',
	tags: ['autodocs'],
};

const breakpointDescriptions: Record<keyof typeof breakpoints, string> = {
	smMin: 'Kleinste ondersteunde viewport (kleine telefoons)',
	smMax: 'Bovengrens van het sm-bereik',
	mdMin: 'Ondergrens van het md-bereik (tablets)',
	mdMax: 'Bovengrens van het md-bereik',
	lgMin: 'Ondergrens van het lg-bereik (desktops en breder)',
};

export const Tokens = {
	render: () => html`
		<style>
			.bp-table {
				border-collapse: collapse;
				font: var(--primitives-font-body-md-regular-normal);
			}
			.bp-table th, .bp-table td {
				padding: var(--primitives-space-8) var(--primitives-space-12);
				text-align: left;
				border-bottom: 1px solid var(--semantics-dividers-color);
			}
			.bp-table th { font-weight: 600; }
			.bp-table code {
				font: var(--primitives-font-mono-md-regular-normal);
				background: var(--semantics-surfaces-secondary-background-color);
				padding: 2px 6px;
				border-radius: 4px;
			}
		</style>
		<table class="bp-table">
			<thead>
				<tr><th>Token</th><th>Waarde</th><th>Beschrijving</th></tr>
			</thead>
			<tbody>
				${(Object.keys(breakpoints) as Array<keyof typeof breakpoints>).map(key => html`
					<tr>
						<td><code>${key}</code></td>
						<td><code>${breakpoints[key]}</code></td>
						<td>${breakpointDescriptions[key]}</td>
					</tr>
				`)}
			</tbody>
		</table>
	`,
};
