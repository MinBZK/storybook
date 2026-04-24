import { html } from 'lit';
import './radio-button-group.js';
import '../radio-button-field/radio-button-field.js';
import '../../forms/form-field/form-field.js';
/**
 * De Radio Button Group groepeert `nldd-radio-button-field` elementen, beheert
 * toetsenbordnavigatie en geeft `name` en `disabled` door aan alle velden.
 * Gebruik altijd binnen `nldd-form-field` voor het groepslabel.
 *
 * ## Gebruik
 * ```html
 * <nldd-form-field label="Kies een optie">
 *   <nldd-radio-button-group name="optie">
 *     <nldd-radio-button-field value="1" label="Optie 1"></nldd-radio-button-field>
 *     <nldd-radio-button-field value="2" label="Optie 2"></nldd-radio-button-field>
 *   </nldd-radio-button-group>
 * </nldd-form-field>
 * ```
 */
export default {
	title: 'Components/Inputs/Radio Button Group',
	component: 'nldd-radio-button-group',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/radio-button-group/radio-button-group.ts',
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
		required: {
			control: 'boolean',
			description: 'Markeert de groep als verplicht',
			table: { defaultValue: { summary: false } },
		},
		disabled: {
			control: 'boolean',
			description: 'Schakelt alle velden uit',
			table: { defaultValue: { summary: false } },
		},
	},
	args: {
		name: 'demo',
		required: false,
		disabled: false,
	},
};

const Template = ({ name, required, disabled }: Record<string, any>) => html`
	<nldd-form-field label="Kies een optie">
		<nldd-radio-button-group
			name=${name}
			?disabled=${disabled}
			?required=${required}
		>
			<nldd-radio-button-field value="1" checked label="Optie 1"></nldd-radio-button-field>
			<nldd-radio-button-field value="2" label="Optie 2"></nldd-radio-button-field>
			<nldd-radio-button-field value="3" label="Optie 3"></nldd-radio-button-field>
		</nldd-radio-button-group>
	</nldd-form-field>
`;

export const Standaard = {
	render: Template,
	args: {},
};

export const Uitgeschakeld = {
	render: Template,
	args: { disabled: true },
};

export const MetUitgeschakeldVeld = {
	render: () => html`
	<nldd-form-field label="Kies een optie">
		<nldd-radio-button-group name="demo">
			<nldd-radio-button-field value="1" checked label="Optie 1"></nldd-radio-button-field>
			<nldd-radio-button-field value="2" label="Optie 2"></nldd-radio-button-field>
			<nldd-radio-button-field value="3" label="Optie 3 (uitgeschakeld)" disabled></nldd-radio-button-field>
		</nldd-radio-button-group>
	</nldd-form-field>
`,
	parameters: { controls: { disable: true } },
};
