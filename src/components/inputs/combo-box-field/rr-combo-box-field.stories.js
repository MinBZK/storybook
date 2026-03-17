import { html } from 'lit';
import './rr-combo-box-field.ts';

/**
 * De Combo Box Field component is een tekstveld met autocomplete/dropdown functionaliteit.
 */
export default {
	title: 'Components/Inputs/Combo Box Field',
	component: 'rr-combo-box-field',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/combo-box-field/rr-combo-box-field.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		value: {
			control: 'text',
			description: 'Huidige invoerwaarde',
			table: { defaultValue: { summary: '' } },
		},
		placeholder: {
			control: 'text',
			description: 'Placeholder tekst',
			table: { defaultValue: { summary: '' } },
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
		placeholder: 'Zoek een land',
		disabled: false,
		name: '',
	},
};

const landen = [
	{ text: 'Nederland', value: 'nl' },
	{ text: 'België', value: 'be' },
	{ text: 'Duitsland', value: 'de' },
	{ text: 'Frankrijk', value: 'fr' },
	{ text: 'Verenigd Koninkrijk', value: 'uk' },
];

const Template = ({ value, placeholder, disabled, name }) => html`
	<div style="max-width: 320px;">
		<rr-combo-box-field
			value=${value}
			placeholder=${placeholder}
			?disabled=${disabled}
			name=${name}
			.options=${landen}
		></rr-combo-box-field>
	</div>
`;

export const Standaard = Template.bind({});
Standaard.args = {};

export const AlleToestanden = () => html`
	<div style="display: flex; flex-direction: column; gap: 1rem; max-width: 320px;">
		<rr-combo-box-field
			placeholder="Zoek een land"
			.options=${landen}
		></rr-combo-box-field>
		<rr-combo-box-field
			placeholder="Zoek een land"
			.options=${landen}
			disabled
		></rr-combo-box-field>
	</div>
`;
AlleToestanden.parameters = { controls: { disable: true } };
