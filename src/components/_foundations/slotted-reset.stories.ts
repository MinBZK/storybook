import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { hostileHostCss } from '../../assets/styles/slotted-reset.fixtures.js';
import '../content/title/title.js';
import '../inputs/dropdown/dropdown.js';
import '../forms/form-field/form-field.js';
import '../content/image/image.js';
import '../content/blockquote/blockquote.js';
import '../lists-and-menus/cells/description-cell/description-cell.js';

/**
 * Laat zien dat slotted content host-CSS overleeft. De story "Onder vijandige
 * host-CSS" injecteert Tailwind Preflight + agressieve overrides (dezelfde
 * `hostileHostCss` die de regressietest gebruikt). De componenten blijven intact;
 * de rauwe HTML eronder wordt platgeslagen — dáár zie je dat de host-CSS écht
 * actief is. Breekt iemand de slotted-reset, dan divergeert deze story.
 */
export default {
	title: 'Foundations/Host CSS Isolation',
	parameters: {
		status: { type: 'stable' },
		controls: { disable: true },
	},
};

const label = (text: string) => html`
	<div style="margin: 16px 0 4px; font: 600 13px/1.4 system-ui, sans-serif; letter-spacing: normal; text-transform: none; color: #555;">${text}</div>
`;

const components = () => html`
	<div style="display: flex; flex-direction: column; gap: 8px; padding: 24px; container-type: inline-size; container-name: layout-container;">
		${label('nldd-title')}
		<nldd-title size="2"><h1>Paginatitel</h1></nldd-title>
		${label('nldd-dropdown')}
		<nldd-dropdown>
			<select aria-label="Kies een optie">
				<option>Optie A</option>
				<option>Optie B</option>
			</select>
		</nldd-dropdown>
		${label('nldd-form-field-error-text')}
		<nldd-form-field-error-text invalid>Verplicht veld — <a href="#">bekijk de toelichting</a></nldd-form-field-error-text>
		${label('nldd-image')}
		<div style="width: 220px; height: 130px;">
			<nldd-image>
				<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 22 13'%3E%3Crect width='22' height='13' fill='%23357abd'/%3E%3C/svg%3E" alt="Voorbeeld">
			</nldd-image>
		</div>
		${label('nldd-blockquote')}
		<nldd-blockquote><p>Een citaat dat z'n eigen typografie houdt.</p></nldd-blockquote>
		${label('nldd-description-cell')}
		<nldd-description-cell>
			<span slot="title">Titel van de cel</span>
			<span slot="description">Bijbehorende omschrijving</span>
		</nldd-description-cell>
	</div>
`;

const rawHtmlComparison = () => html`
	<div style="padding: 0 24px 24px;">
		${label('Rauwe HTML (NIET in een component) — ter vergelijking: deze hoort wél kapot')}
		<h1>Rauwe titel</h1>
		<p>Rauwe paragraaf met een <a href="#">link</a>.</p>
	</div>
`;

export const Standaard = {
	name: 'Standaard (geen host-CSS)',
	render: () => components(),
};

export const OnderVijandigeHostCss = {
	name: 'Onder vijandige host-CSS',
	render: () => html`
		<!-- hostileHostCss is a compile-time fixture, not user input --> ${unsafeHTML(`<style>${hostileHostCss}</style>`)}
		${components()}
		<hr style="border: none; border-top: 1px solid #ddd; margin: 8px 24px;">
		${rawHtmlComparison()}
	`,
};
