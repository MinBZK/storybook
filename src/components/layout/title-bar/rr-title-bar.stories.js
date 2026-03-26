import { html } from 'lit';
import './rr-title-bar.ts';
import '../../actions/button/rr-button.ts';
import '../spacer/rr-spacer.ts';

/**
 * Gebruik een title bar om een paginatitel of sectietitel te tonen met
 * optionele overline, ondertitel en acties. Geef een h1–h6 element mee
 * voor de juiste semantische structuur.
 *
 * ## Gebruik
 * ```html
 * <rr-title-bar size="3">
 *   <p slot="overline">Overline</p>
 *   <h1>Paginatitel</h1>
 *   <p slot="subtitle">Ondertitel</p>
 *   <rr-button slot="actions">Actie</rr-button>
 * </rr-title-bar>
 * ```
 */
export default {
	title: 'Components/Layout/Title Bar',
	component: 'rr-title-bar',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/layout/title-bar/rr-title-bar.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		size: {
			control: { type: 'select' },
			options: [1, 2, 3, 4, 5, 6],
			description: 'Visuele grootte van de titel',
			table: { defaultValue: { summary: '3' } },
		},
	},
	args: {
		size: 3,
	},
};

export const Standaard = ({ size }) => html`
	<div style="display: block; padding: 24px; container-type: inline-size; container-name: layout-area;">
		<rr-title-bar size=${size}>
			<h1>Paginatitel</h1>
			<rr-button slot="actions" variant="secondary" size="sm">Actie</rr-button>
		</rr-title-bar>
	</div>
`;

export const MetOverline = () => html`
	<div style="display: block; padding: 24px; container-type: inline-size; container-name: layout-area;">
		<rr-title-bar>
			<p slot="overline">Wet op de zorgtoeslag</p>
			<h1>Artikel 1</h1>
		</rr-title-bar>
	</div>
`;
MetOverline.parameters = { controls: { disable: true } };

export const MetOndertitel = () => html`
	<div style="display: block; padding: 24px; container-type: inline-size; container-name: layout-area;">
		<rr-title-bar>
			<h1>Wet op de zorgtoeslag</h1>
			<p slot="subtitle">Laatste wijziging: 1 januari 2024</p>
		</rr-title-bar>
	</div>
`;
MetOndertitel.parameters = { controls: { disable: true } };

export const MetOverlineEnOndertitel = () => html`
	<div style="display: block; padding: 24px; container-type: inline-size; container-name: layout-area;">
		<rr-title-bar>
			<p slot="overline">Hoofdstuk 1</p>
			<h1>Begripsbepalingen</h1>
			<p slot="subtitle">Ingangsdatum: 1 januari 2024</p>
		</rr-title-bar>
	</div>
`;
MetOverlineEnOndertitel.parameters = { controls: { disable: true } };

export const MetActies = () => html`
	<div style="display: block; padding: 24px; container-type: inline-size; container-name: layout-area;">
		<rr-title-bar>
			<h1>Wet op de zorgtoeslag</h1>
			<rr-button slot="actions" variant="secondary" size="sm">Bewerken</rr-button>
			<rr-spacer slot="actions" size="8"></rr-spacer>
			<rr-button slot="actions" size="sm">Opslaan</rr-button>
		</rr-title-bar>
	</div>
`;
MetActies.parameters = { controls: { disable: true } };

export const AlleGrootten = () => html`
	<div style="display: flex; flex-direction: column; gap: 24px; padding: 24px; container-type: inline-size; container-name: layout-area;">
		${[1, 2, 3, 4, 5, 6].map(s => html`
			<rr-title-bar size=${s}>
				<h1>Grootte ${s}</h1>
			</rr-title-bar>
		`)}
	</div>
`;
AlleGrootten.parameters = { controls: { disable: true } };
