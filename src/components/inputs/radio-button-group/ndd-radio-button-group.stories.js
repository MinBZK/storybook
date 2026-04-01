import { html } from 'lit';
import './ndd-radio-button-group.ts';
import '../radio-button-field/ndd-radio-button-field.ts';
import '../../forms/form-field/ndd-form-field.ts';
/**
 * De Radio Button Group groepeert `ndd-radio-button-field` elementen, beheert
 * toetsenbordnavigatie en geeft `name` en `disabled` door aan alle velden.
 * Gebruik altijd binnen `ndd-form-field` voor het groepslabel.
 *
 * ## Gebruik
 * ```html
 * <ndd-form-field label="Kies een optie">
 *   <ndd-radio-button-group name="optie">
 *     <ndd-radio-button-field value="1" label="Optie 1"></ndd-radio-button-field>
 *     <ndd-radio-button-field value="2" label="Optie 2"></ndd-radio-button-field>
 *   </ndd-radio-button-group>
 * </ndd-form-field>
 * ```
 */
export default {
	title: 'Components/Inputs/Radio Button Group',
	component: 'ndd-radio-button-group',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/radio-button-group/ndd-radio-button-group.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		name: {
			control: 'text',
			description: 'Naam doorgegeven aan alle velden',
		},
		disabled: {
			control: 'boolean',
			description: 'Schakelt alle velden uit',
			table: { defaultValue: { summary: false } },
		},
		required: {
			control: 'boolean',
			description: 'Markeert de groep als verplicht',
			table: { defaultValue: { summary: false } },
		},
	},
	args: {
		name: 'demo',
		disabled: false,
		required: false,
	},
};

const Template = ({ name, disabled, required }) => html`
	<ndd-form-field label="Kies een optie">
		<ndd-radio-button-group
			name=${name}
			?disabled=${disabled}
			?required=${required}
		>
			<ndd-radio-button-field value="1" checked label="Optie 1"></ndd-radio-button-field>
			<ndd-radio-button-field value="2" label="Optie 2"></ndd-radio-button-field>
			<ndd-radio-button-field value="3" label="Optie 3"></ndd-radio-button-field>
		</ndd-radio-button-group>
	</ndd-form-field>
`;

export const Standaard = Template.bind({});
Standaard.args = {};

export const Uitgeschakeld = Template.bind({});
Uitgeschakeld.args = { disabled: true };

export const MetUitgeschakeldVeld = () => html`
	<ndd-form-field label="Kies een optie">
		<ndd-radio-button-group name="demo">
			<ndd-radio-button-field value="1" checked label="Optie 1"></ndd-radio-button-field>
			<ndd-radio-button-field value="2" label="Optie 2"></ndd-radio-button-field>
			<ndd-radio-button-field value="3" label="Optie 3 (uitgeschakeld)" disabled></ndd-radio-button-field>
		</ndd-radio-button-group>
	</ndd-form-field>
`;
MetUitgeschakeldVeld.parameters = { controls: { disable: true } };
