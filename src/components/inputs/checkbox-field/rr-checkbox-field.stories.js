import { html } from 'lit';
import './rr-checkbox-field.ts';

/**
 * De Checkbox Field component is een checkbox met een inline label voor gebruik in formulieren.
 */
export default {
	title: 'Components/Inputs/Checkbox Field',
	component: 'rr-checkbox-field',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/checkbox-field/rr-checkbox-field.ts',
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
		checked: false,
		indeterminate: false,
		disabled: false,
		value: 'on',
	},
};

const Template = ({ checked, indeterminate, disabled, value }) => html`
	<rr-checkbox-field
		?checked=${checked}
		?indeterminate=${indeterminate}
		?disabled=${disabled}
		value=${value}
	>Checkbox field</rr-checkbox-field>
`;

export const Standaard = Template.bind({});
Standaard.args = {};

export const AlleToestanden = () => html`
	<div style="display: flex; flex-direction: column; gap: 0.5rem;">
		<rr-checkbox-field value="1">Niet aangevinkt</rr-checkbox-field>
		<rr-checkbox-field value="2" checked>Aangevinkt</rr-checkbox-field>
		<rr-checkbox-field value="3" indeterminate>Onbepaald</rr-checkbox-field>
		<rr-checkbox-field value="4" disabled>Uitgeschakeld</rr-checkbox-field>
		<rr-checkbox-field value="5" checked disabled>Aangevinkt en uitgeschakeld</rr-checkbox-field>
		<rr-checkbox-field value="6" indeterminate disabled>Onbepaald en uitgeschakeld</rr-checkbox-field>
	</div>
`;
AlleToestanden.parameters = { controls: { disable: true } };
