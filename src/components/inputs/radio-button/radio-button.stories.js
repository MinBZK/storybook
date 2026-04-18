import { html } from 'lit';
import './radio-button.ts';

/**
 * De Radio Button component wordt gebruikt voor exclusieve keuzes binnen een groep opties.
 * Slechts één radio button binnen een groep (met dezelfde `name`) kan tegelijkertijd geselecteerd zijn.
 *
 * ## Gebruik
 * ```html
 * <fieldset>
 *   <legend>Kies een optie</legend>
 *   <nldd-radio-button name="option" value="1">Optie 1</nldd-radio-button>
 *   <nldd-radio-button name="option" value="2">Optie 2</nldd-radio-button>
 * </fieldset>
 * ```
 */
export default {
	title: 'Components/Inputs/Radio Button',
	component: 'nldd-radio-button',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/radio-button/radio-button.ts',
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
	<nldd-radio-button
		?checked=${checked}
		?disabled=${disabled}
		name=${name}
		value=${value}
		accessible-label="Radio button"
	></nldd-radio-button>
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
			<nldd-radio-button name="groep" value="1" checked>Optie 1</nldd-radio-button>
			<nldd-radio-button name="groep" value="2">Optie 2</nldd-radio-button>
			<nldd-radio-button name="groep" value="3">Optie 3</nldd-radio-button>
			<nldd-radio-button name="groep" value="4" disabled>Optie 4 (uitgeschakeld)</nldd-radio-button>
		</div>
	</fieldset>
`;
RadioGroep.parameters = { controls: { disable: true } };

export const AlleToestanden = () => html`
	<div style="display: flex; gap: 2rem; align-items: center;">
		<nldd-radio-button accessible-label="Niet geselecteerd"></nldd-radio-button>
		<nldd-radio-button checked accessible-label="Geselecteerd"></nldd-radio-button>
		<nldd-radio-button disabled accessible-label="Uitgeschakeld"></nldd-radio-button>
		<nldd-radio-button checked disabled accessible-label="Geselecteerd en uitgeschakeld"></nldd-radio-button>
	</div>
`;
AlleToestanden.parameters = { controls: { disable: true } };
