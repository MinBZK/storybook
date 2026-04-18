import { html } from 'lit';
import './checkbox-field.ts';

/**
 * De Checkbox Field component is een checkbox met een inline label voor gebruik in formulieren.
 */
export default {
	title: 'Components/Inputs/Checkbox Field',
	component: 'nldd-checkbox-field',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/checkbox-field/checkbox-field.ts',
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
		indeterminate: {
			control: 'boolean',
			description: 'Onbepaalde toestand (gedeeltelijk geselecteerd)',
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
			table: { defaultValue: { summary: 'on' } },
		},
		name: {
			control: 'text',
			description: 'Naam voor formulierverwerking',
		},
	},
	args: {
		label: 'Checkbox field',
		checked: false,
		indeterminate: false,
		disabled: false,
		value: 'on',
	},
};

const Template = ({ label, checked, indeterminate, disabled, value }) => html`
	<nldd-checkbox-field
		label=${label}
		?checked=${checked}
		?indeterminate=${indeterminate}
		?disabled=${disabled}
		value=${value}
	></nldd-checkbox-field>
`;

export const Standaard = Template.bind({});
Standaard.args = {};

export const AlleToestanden = () => html`
	<div style="display: flex; flex-direction: column; gap: 0.5rem;">
		<nldd-checkbox-field label="Niet aangevinkt" value="1"></nldd-checkbox-field>
		<nldd-checkbox-field label="Aangevinkt" value="2" checked></nldd-checkbox-field>
		<nldd-checkbox-field label="Onbepaald" value="3" indeterminate></nldd-checkbox-field>
		<nldd-checkbox-field label="Uitgeschakeld" value="4" disabled></nldd-checkbox-field>
		<nldd-checkbox-field label="Aangevinkt en uitgeschakeld" value="5" checked disabled></nldd-checkbox-field>
		<nldd-checkbox-field label="Onbepaald en uitgeschakeld" value="6" indeterminate disabled></nldd-checkbox-field>
	</div>
`;
AlleToestanden.parameters = { controls: { disable: true } };
