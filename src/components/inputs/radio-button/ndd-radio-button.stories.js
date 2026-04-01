import { html } from 'lit';
import './ndd-radio-button.ts';

/**
 * De Radio Button component wordt gebruikt voor exclusieve keuzes binnen een groep opties.
 * Slechts één radio button binnen een groep (met dezelfde `name`) kan tegelijkertijd geselecteerd zijn.
 *
 * ## Gebruik
 * ```html
 * <fieldset>
 *   <legend>Kies een optie</legend>
 *   <ndd-radio-button name="option" value="1">Optie 1</ndd-radio-button>
 *   <ndd-radio-button name="option" value="2">Optie 2</ndd-radio-button>
 * </fieldset>
 * ```
 */
export default {
	title: 'Components/Inputs/Radio Button',
	component: 'ndd-radio-button',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/radio-button/ndd-radio-button.ts',
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
	<ndd-radio-button
		?checked=${checked}
		?disabled=${disabled}
		name=${name}
		value=${value}
		accessible-label="Radio button"
	></ndd-radio-button>
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
			<ndd-radio-button name="groep" value="1" checked>Optie 1</ndd-radio-button>
			<ndd-radio-button name="groep" value="2">Optie 2</ndd-radio-button>
			<ndd-radio-button name="groep" value="3">Optie 3</ndd-radio-button>
			<ndd-radio-button name="groep" value="4" disabled>Optie 4 (uitgeschakeld)</ndd-radio-button>
		</div>
	</fieldset>
`;
RadioGroep.parameters = { controls: { disable: true } };

export const AlleToestanden = () => html`
	<div style="display: flex; gap: 2rem; align-items: center;">
		<ndd-radio-button accessible-label="Niet geselecteerd"></ndd-radio-button>
		<ndd-radio-button checked accessible-label="Geselecteerd"></ndd-radio-button>
		<ndd-radio-button disabled accessible-label="Uitgeschakeld"></ndd-radio-button>
		<ndd-radio-button checked disabled accessible-label="Geselecteerd en uitgeschakeld"></ndd-radio-button>
	</div>
`;
AlleToestanden.parameters = { controls: { disable: true } };
