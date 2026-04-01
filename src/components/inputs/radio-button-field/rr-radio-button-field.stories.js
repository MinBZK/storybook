import { html } from 'lit';
import './rr-radio-button-field.ts';

/**
 * De Radio Button Field component is een radio button met een inline label.
 * Gebruik binnen `rr-radio-button-group` voor toetsenbordnavigatie en groepssemantiek.
 */
export default {
	title: 'Components/Inputs/Radio Button Field',
	component: 'rr-radio-button-field',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/radio-button-field/rr-radio-button-field.ts',
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
	<rr-radio-button-field
		label=${label}
		?checked=${checked}
		?disabled=${disabled}
		value=${value}
	></rr-radio-button-field>
`;

export const Standaard = Template.bind({});
Standaard.args = {};

export const AlleToestanden = () => html`
	<div style="display: flex; flex-direction: column; gap: 0.5rem;">
		<rr-radio-button-field label="Niet geselecteerd" value="1"></rr-radio-button-field>
		<rr-radio-button-field label="Geselecteerd" value="2" checked></rr-radio-button-field>
		<rr-radio-button-field label="Uitgeschakeld" value="3" disabled></rr-radio-button-field>
		<rr-radio-button-field label="Geselecteerd en uitgeschakeld" value="4" checked disabled></rr-radio-button-field>
	</div>
`;
AlleToestanden.parameters = { controls: { disable: true } };
