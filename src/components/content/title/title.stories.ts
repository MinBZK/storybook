import { html } from 'lit';
import './title.js';
import '../../actions/button/button.js';
import '../../layout/spacer/spacer.js';

/**
 * Gebruik een title bar om een paginatitel of sectietitel te tonen met
 * optionele overline, ondertitel en acties. Geef een h1–h6 element mee
 * voor de juiste semantische structuur.
 *
 * ## Gebruik
 * ```html
 * <nldd-title size="3">
 *   <p slot="overline">Overline</p>
 *   <h1>Paginatitel</h1>
 *   <p slot="subtitle">Ondertitel</p>
 *   <nldd-button slot="actions" text="Actie"></nldd-button>
 * </nldd-title>
 * ```
 */
export default {
	title: 'Components/Content/Title',
	component: 'nldd-title',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/content/title/title.ts',
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

export const Standaard = ({ size }: Record<string, any>) => html`
	<div style="display: block; padding: 24px; container-type: inline-size; container-name: layout-container;">
		<nldd-title size=${size}>
			<h1>Paginatitel</h1>
			<nldd-button slot="actions" variant="secondary" size="sm" text="Actie"></nldd-button>
		</nldd-title>
	</div>
`;

export const MetOverline = {
	render: () => html`
	<div style="display: block; padding: 24px; container-type: inline-size; container-name: layout-container;">
		<nldd-title>
			<p slot="overline">Wet op de zorgtoeslag</p>
			<h1>Artikel 1</h1>
		</nldd-title>
	</div>
`,
	parameters: { controls: { disable: true } },
};

export const MetOndertitel = {
	render: () => html`
	<div style="display: block; padding: 24px; container-type: inline-size; container-name: layout-container;">
		<nldd-title>
			<h1>Wet op de zorgtoeslag</h1>
			<p slot="subtitle">Laatste wijziging: 1 januari 2024</p>
		</nldd-title>
	</div>
`,
	parameters: { controls: { disable: true } },
};

export const MetOverlineEnOndertitel = {
	render: () => html`
	<div style="display: block; padding: 24px; container-type: inline-size; container-name: layout-container;">
		<nldd-title>
			<p slot="overline">Hoofdstuk 1</p>
			<h1>Begripsbepalingen</h1>
			<p slot="subtitle">Ingangsdatum: 1 januari 2024</p>
		</nldd-title>
	</div>
`,
	parameters: { controls: { disable: true } },
};

export const MetActies = {
	render: () => html`
	<div style="display: block; padding: 24px; container-type: inline-size; container-name: layout-container;">
		<nldd-title>
			<h1>Wet op de zorgtoeslag</h1>
			<nldd-button slot="actions" variant="secondary" size="sm" text="Bewerken"></nldd-button>
			<nldd-spacer slot="actions" size="8"></nldd-spacer>
			<nldd-button slot="actions" size="sm" text="Opslaan"></nldd-button>
		</nldd-title>
	</div>
`,
	parameters: { controls: { disable: true } },
};

export const AlleGrootten = {
	render: () => html`
	<div style="display: flex; flex-direction: column; gap: 24px; padding: 24px; container-type: inline-size; container-name: layout-container;">
		${[1, 2, 3, 4, 5, 6].map(s => html`
			<nldd-title size=${s}>
				<h1>Grootte ${s}</h1>
			</nldd-title>
		`)}
	</div>
`,
	parameters: { controls: { disable: true } },
};
