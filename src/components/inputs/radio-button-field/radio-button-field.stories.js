import { html } from 'lit';
import './radio-button-field.ts';

/**
 * De Radio Button Field component is een radio button met een inline label.
 * Gebruik binnen `nldd-radio-button-group` voor toetsenbordnavigatie en groepssemantiek.
 */
export default {
	title: 'Components/Inputs/Radio Button Field',
	component: 'nldd-radio-button-field',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/radio-button-field/radio-button-field.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		label: {
			control: 'text',
			description: 'Label tekst',
		},
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
		value: {
			control: 'text',
			description: 'Waarde voor formulierverwerking',
		},
	},
	args: {
		label: 'Radio button field',
		checked: false,
		disabled: false,
		value: 'optie-1',
	},
};

const Template = ({ label, checked, disabled, value }) => html`
	<nldd-radio-button-field
		label=${label}
		?checked=${checked}
		?disabled=${disabled}
		value=${value}
	></nldd-radio-button-field>
`;

export const Standaard = Template.bind({});
Standaard.args = {};

export const AlleToestanden = () => html`
	<div style="display: flex; flex-direction: column; gap: 0.5rem;">
		<nldd-radio-button-field label="Niet geselecteerd" value="1"></nldd-radio-button-field>
		<nldd-radio-button-field label="Geselecteerd" value="2" checked></nldd-radio-button-field>
		<nldd-radio-button-field label="Uitgeschakeld" value="3" disabled></nldd-radio-button-field>
		<nldd-radio-button-field label="Geselecteerd en uitgeschakeld" value="4" checked disabled></nldd-radio-button-field>
	</div>
`;
AlleToestanden.parameters = { controls: { disable: true } };
