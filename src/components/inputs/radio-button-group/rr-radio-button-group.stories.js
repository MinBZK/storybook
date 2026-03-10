import { html } from 'lit';
import './rr-radio-button-group.ts';
import '../radio-button-field/rr-radio-button-field.ts';
import '../../forms/form-field/rr-form-field.ts';

/**
 * De Radio Button Group groepeert `rr-radio-button-field` elementen, beheert
 * toetsenbordnavigatie en geeft `name` en `disabled` door aan alle velden.
 * Gebruik altijd binnen `rr-form-field` voor het groepslabel.
 *
 * ## Gebruik
 * ```html
 * <rr-form-field label="Kies een optie">
 *   <rr-radio-button-group name="optie">
 *     <rr-radio-button-field value="1">Optie 1</rr-radio-button-field>
 *     <rr-radio-button-field value="2">Optie 2</rr-radio-button-field>
 *   </rr-radio-button-group>
 * </rr-form-field>
 * ```
 */
export default {
	title: 'Components/Inputs/Radio Button Group',
	component: 'rr-radio-button-group',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/control-groups/radio-button-group/rr-radio-button-group.ts',
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
	<rr-form-field label="Kies een optie">
		<rr-radio-button-group
			name=${name}
			?disabled=${disabled}
			?required=${required}
		>
			<rr-radio-button-field value="1" checked>Optie 1</rr-radio-button-field>
			<rr-radio-button-field value="2">Optie 2</rr-radio-button-field>
			<rr-radio-button-field value="3">Optie 3</rr-radio-button-field>
		</rr-radio-button-group>
	</rr-form-field>
`;

export const Standaard = Template.bind({});
Standaard.args = {};

export const Uitgeschakeld = Template.bind({});
Uitgeschakeld.args = { disabled: true };

export const MetUitgeschakeldVeld = () => html`
	<rr-form-field label="Kies een optie">
		<rr-radio-button-group name="demo">
			<rr-radio-button-field value="1" checked>Optie 1</rr-radio-button-field>
			<rr-radio-button-field value="2">Optie 2</rr-radio-button-field>
			<rr-radio-button-field value="3" disabled>Optie 3 (uitgeschakeld)</rr-radio-button-field>
		</rr-radio-button-group>
	</rr-form-field>
`;
MetUitgeschakeldVeld.parameters = { controls: { disable: true } };
