import { html } from 'lit';
import './rr-drop-down-field.ts';

/**
 * De Drop Down Field component is een select/dropdown veld.
 * Gebruik native `<option>` elementen als children, net als een gewone `<select>`.
 */
export default {
	title: 'Components/Inputs/Drop Down Field',
	component: 'rr-drop-down-field',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/drop-down-field/rr-drop-down-field.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		value: {
			control: 'text',
			description: 'Geselecteerde waarde',
			table: { defaultValue: { summary: '' } },
		},
		size: {
			control: 'select',
			options: ['sm', 'md'],
			description: 'Grootte van het veld',
			table: { defaultValue: { summary: 'md' } },
		},
		disabled: {
			control: 'boolean',
			description: 'Uitgeschakelde toestand',
			table: { defaultValue: { summary: false } },
		},
		name: {
			control: 'text',
			description: 'Naam voor formulierverwerking',
		},
	},
	args: {
		value: '',
		size: 'md',
		disabled: false,
		name: '',
	},
};

const Template = ({ value, size, disabled, name }) => html`
	<rr-drop-down-field
		value=${value}
		size=${size}
		?disabled=${disabled}
		name=${name}
	>
		<option value="" disabled selected>Selecteer een optie</option>
		<option value="optie-1">Optie 1</option>
		<option value="optie-2">Optie 2</option>
		<option value="optie-3">Optie 3</option>
	</rr-drop-down-field>
`;

export const Standaard = Template.bind({});
Standaard.args = {};

export const AlleToestanden = () => html`
	<div style="display: flex; flex-direction: column; gap: 1rem;">
		<rr-drop-down-field size="md">
			<option value="" disabled selected>Selecteer een optie</option>
			<option value="optie-1">Optie 1</option>
			<option value="optie-2">Optie 2</option>
		</rr-drop-down-field>
		<rr-drop-down-field size="md" value="optie-1">
			<option value="optie-1">Optie 1</option>
			<option value="optie-2">Optie 2</option>
		</rr-drop-down-field>
		<rr-drop-down-field size="sm">
			<option value="" disabled selected>Selecteer een optie</option>
			<option value="optie-1">Optie 1</option>
			<option value="optie-2">Optie 2</option>
		</rr-drop-down-field>
		<rr-drop-down-field size="md" value="optie-1" disabled>
			<option value="optie-1">Optie 1</option>
			<option value="optie-2">Optie 2</option>
		</rr-drop-down-field>
	</div>
`;
AlleToestanden.parameters = { controls: { disable: true } };
