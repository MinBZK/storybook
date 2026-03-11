import { html } from 'lit';
import './rr-title-bar.ts';
import '../../actions/button/rr-button.ts';
import '../spacer/rr-spacer.ts';

/**
 * Gebruik een title bar om een paginatitel of sectietitel te tonen met
 * optionele overline, ondertitel en acties. Pas het koptekstniveau aan voor
 * de juiste semantische structuur zonder de visuele stijl te wijzigen.
 *
 * ## Gebruik
 * ```html
 * <rr-title-bar level="1" size="3" overline="Overline" subtitle="Ondertitel">
 *   Paginatitel
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
		level: {
			control: { type: 'select' },
			options: [1, 2, 3, 4, 5, 6],
			description: 'Koptekstniveau (semantisch)',
			table: { defaultValue: { summary: '1' } },
		},
		size: {
			control: { type: 'select' },
			options: [1, 2, 3, 4, 5, 6],
			description: 'Visuele grootte van de titel',
			table: { defaultValue: { summary: '3' } },
		},
		overline: {
			control: { type: 'text' },
			description: 'Optionele overline boven de titel',
		},
		subtitle: {
			control: { type: 'text' },
			description: 'Optionele ondertitel onder de titel',
		},
	},
	args: {
		level: 1,
		size: 3,
		overline: '',
		subtitle: '',
	},
};

export const Standaard = ({ level, size, overline, subtitle }) => html`
	<rr-title-bar
		level=${level}
		size=${size}
		overline=${overline}
		subtitle=${subtitle}
		style="padding: 24px;"
	>
		Paginatitel
		<rr-button slot="actions" variant="secondary" size="sm">Actie</rr-button>
	</rr-title-bar>
`;

export const MetOverline = () => html`
	<rr-title-bar overline="Wet op de zorgtoeslag" style="padding: 24px;">
		Artikel 1
	</rr-title-bar>
`;
MetOverline.parameters = { controls: { disable: true } };

export const MetOndertitel = () => html`
	<rr-title-bar subtitle="Laatste wijziging: 1 januari 2024" style="padding: 24px;">
		Wet op de zorgtoeslag
	</rr-title-bar>
`;
MetOndertitel.parameters = { controls: { disable: true } };

export const MetOverlineEnOndertitel = () => html`
	<rr-title-bar
		overline="Hoofdstuk 1"
		subtitle="Ingangsdatum: 1 januari 2024"
		style="padding: 24px;"
	>
		Begripsbepalingen
	</rr-title-bar>
`;
MetOverlineEnOndertitel.parameters = { controls: { disable: true } };

export const MetActies = () => html`
	<rr-title-bar style="padding: 24px;">
		Wet op de zorgtoeslag
		<rr-button slot="actions" variant="secondary" size="sm">Bewerken</rr-button>
		<rr-spacer slot="actions" size="8"></rr-spacer>
		<rr-button slot="actions" size="sm">Opslaan</rr-button>
	</rr-title-bar>
`;
MetActies.parameters = { controls: { disable: true } };

export const AlleGrootten = () => html`
	<div style="display: flex; flex-direction: column; gap: 24px; padding: 24px;">
		${[1, 2, 3, 4, 5, 6].map(s => html`
			<rr-title-bar size=${s}>Grootte ${s}</rr-title-bar>
		`)}
	</div>
`;
AlleGrootten.parameters = { controls: { disable: true } };
