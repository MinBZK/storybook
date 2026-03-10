import { html } from 'lit';
import './rr-radio-button.ts';

/**
 * De Radio Button component wordt gebruikt voor exclusieve keuzes binnen een groep opties.
 * Slechts één radio button binnen een groep (met dezelfde `name`) kan tegelijkertijd geselecteerd zijn.
 *
 * ## Gebruik
 * ```html
 * <fieldset>
 *   <legend>Kies een optie</legend>
 *   <rr-radio-button name="option" value="1">Optie 1</rr-radio-button>
 *   <rr-radio-button name="option" value="2">Optie 2</rr-radio-button>
 * </fieldset>
 * ```
 */
export default {
	title: 'Components/Inputs/Radio Button',
	component: 'rr-radio-button',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/radio-button/rr-radio-button.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		checked: {
			control: 'boolean',
			description: 'Aangevinkte toestand',
			table: { defaultValue: { summary: false } },
		},
		disabled: {
			control: 'boolean',
			description: 'Uitgeschakelde toestand',
			table: { defaultValue: { summary: false } },
		},
		name: {
			control: 'text',
			description: 'Naam voor formulierverwerking (groepeert radio buttons)',
		},
		value: {
			control: 'text',
			description: 'Waarde voor formulierverwerking',
		},
	},
	args: {
		checked: false,
		disabled: false,
		name: 'demo',
		value: 'optie-1',
	},
};

const Template = ({ checked, disabled, name, value }) => html`
	<rr-radio-button
		?checked=${checked}
		?disabled=${disabled}
		name=${name}
		value=${value}
		aria-label="Radio button"
	></rr-radio-button>
`;

export const Standaard = Template.bind({});
Standaard.args = {};

export const Geselecteerd = Template.bind({});
Geselecteerd.args = { checked: true };

export const Uitgeschakeld = Template.bind({});
Uitgeschakeld.args = { disabled: true };

export const GeselecteerdUitgeschakeld = Template.bind({});
GeselecteerdUitgeschakeld.args = { checked: true, disabled: true };

export const RadioGroep = () => html`
	<fieldset style="border: none; padding: 0; margin: 0;">
		<legend style="font-size: 16px; font-weight: 550; margin-bottom: 12px;">Kies een optie</legend>
		<div style="display: flex; flex-direction: column; gap: 12px;">
			<rr-radio-button name="groep" value="1" checked>Optie 1</rr-radio-button>
			<rr-radio-button name="groep" value="2">Optie 2</rr-radio-button>
			<rr-radio-button name="groep" value="3">Optie 3</rr-radio-button>
			<rr-radio-button name="groep" value="4" disabled>Optie 4 (uitgeschakeld)</rr-radio-button>
		</div>
	</fieldset>
`;
RadioGroep.parameters = { controls: { disable: true } };

export const AlleToestanden = () => html`
	<div style="display: flex; gap: 2rem; align-items: center;">
		<rr-radio-button aria-label="Niet geselecteerd"></rr-radio-button>
		<rr-radio-button checked aria-label="Geselecteerd"></rr-radio-button>
		<rr-radio-button disabled aria-label="Uitgeschakeld"></rr-radio-button>
		<rr-radio-button checked disabled aria-label="Geselecteerd en uitgeschakeld"></rr-radio-button>
	</div>
`;
AlleToestanden.parameters = { controls: { disable: true } };
