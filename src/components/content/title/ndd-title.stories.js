import { html } from 'lit';
import './ndd-title.ts';
import '../../actions/button/ndd-button.ts';
import '../../layout/spacer/ndd-spacer.ts';

/**
 * Gebruik een title bar om een paginatitel of sectietitel te tonen met
 * optionele overline, ondertitel en acties. Geef een h1–h6 element mee
 * voor de juiste semantische structuur.
 *
 * ## Gebruik
 * ```html
 * <ndd-title size="3">
 *   <p slot="overline">Overline</p>
 *   <h1>Paginatitel</h1>
 *   <p slot="subtitle">Ondertitel</p>
 *   <ndd-button slot="actions" text="Actie"></ndd-button>
 * </ndd-title>
 * ```
 */
export default {
	title: 'Components/Content/Title',
	component: 'ndd-title',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/content/title/ndd-title.ts',
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
		<ndd-title size=${size}>
			<h1>Paginatitel</h1>
			<ndd-button slot="actions" variant="secondary" size="sm" text="Actie"></ndd-button>
		</ndd-title>
	</div>
`;

export const MetOverline = () => html`
	<div style="display: block; padding: 24px; container-type: inline-size; container-name: layout-area;">
		<ndd-title>
			<p slot="overline">Wet op de zorgtoeslag</p>
			<h1>Artikel 1</h1>
		</ndd-title>
	</div>
`;
MetOverline.parameters = { controls: { disable: true } };

export const MetOndertitel = () => html`
	<div style="display: block; padding: 24px; container-type: inline-size; container-name: layout-area;">
		<ndd-title>
			<h1>Wet op de zorgtoeslag</h1>
			<p slot="subtitle">Laatste wijziging: 1 januari 2024</p>
		</ndd-title>
	</div>
`;
MetOndertitel.parameters = { controls: { disable: true } };

export const MetOverlineEnOndertitel = () => html`
	<div style="display: block; padding: 24px; container-type: inline-size; container-name: layout-area;">
		<ndd-title>
			<p slot="overline">Hoofdstuk 1</p>
			<h1>Begripsbepalingen</h1>
			<p slot="subtitle">Ingangsdatum: 1 januari 2024</p>
		</ndd-title>
	</div>
`;
MetOverlineEnOndertitel.parameters = { controls: { disable: true } };

export const MetActies = () => html`
	<div style="display: block; padding: 24px; container-type: inline-size; container-name: layout-area;">
		<ndd-title>
			<h1>Wet op de zorgtoeslag</h1>
			<ndd-button slot="actions" variant="secondary" size="sm" text="Bewerken"></ndd-button>
			<ndd-spacer slot="actions" size="8"></ndd-spacer>
			<ndd-button slot="actions" size="sm" text="Opslaan"></ndd-button>
		</ndd-title>
	</div>
`;
MetActies.parameters = { controls: { disable: true } };

export const AlleGrootten = () => html`
	<div style="display: flex; flex-direction: column; gap: 24px; padding: 24px; container-type: inline-size; container-name: layout-area;">
		${[1, 2, 3, 4, 5, 6].map(s => html`
			<ndd-title size=${s}>
				<h1>Grootte ${s}</h1>
			</ndd-title>
		`)}
	</div>
`;
AlleGrootten.parameters = { controls: { disable: true } };
