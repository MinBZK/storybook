import { html } from 'lit';
import './rr-switch-field.ts';

/**
 * De Switch Field component is een switch toggle met een inline label voor gebruik in formulieren.
 */
export default {
	title: 'Components/Inputs/Switch Field',
	component: 'rr-switch-field',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/switch-field/rr-switch-field.ts',
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
			table: { defaultValue: { summary: 'on' } },
		},
		name: {
			control: 'text',
			description: 'Naam voor formulierverwerking',
		},
	},
	args: {
		label: 'Switch field',
		checked: false,
		disabled: false,
		value: 'on',
	},
};

const Template = ({ label, checked, disabled, value }) => html`
	<rr-switch-field
		label=${label}
		?checked=${checked}
		?disabled=${disabled}
		value=${value}
	></rr-switch-field>
`;

export const Standaard = Template.bind({});
Standaard.args = {};

export const AlleToestanden = () => html`
	<div style="display: flex; flex-direction: column; gap: 0.5rem;">
		<rr-switch-field label="Niet aan" value="1"></rr-switch-field>
		<rr-switch-field label="Aan" value="2" checked></rr-switch-field>
		<rr-switch-field label="Uitgeschakeld" value="3" disabled></rr-switch-field>
		<rr-switch-field label="Aan en uitgeschakeld" value="4" checked disabled></rr-switch-field>
	</div>
`;
AlleToestanden.parameters = { controls: { disable: true } };
