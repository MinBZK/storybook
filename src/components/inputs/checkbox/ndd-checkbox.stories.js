import { html } from 'lit';
import './ndd-checkbox.ts';

/**
 * De Checkbox component stelt gebruikers in staat om een of meerdere opties te selecteren.
 *
 * ## Gebruik
 * ```html
 * <ndd-checkbox accessible-label="Ik ga akkoord"></ndd-checkbox>
 * ```
 */
export default {
	title: 'Components/Inputs/Checkbox',
	component: 'ndd-checkbox',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/checkbox/ndd-checkbox.ts',
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
		name: '',
	},
};

const Template = ({ checked, indeterminate, disabled, value, name }) => html`
	<ndd-checkbox
		?checked=${checked}
		?indeterminate=${indeterminate}
		?disabled=${disabled}
		value=${value}
		name=${name}
		accessible-label="Checkbox"
	></ndd-checkbox>
`;

export const Standaard = Template.bind({});
Standaard.args = {};

export const Aangevinkt = Template.bind({});
Aangevinkt.args = { checked: true };

export const Onbepaald = Template.bind({});
Onbepaald.args = { indeterminate: true };

export const Uitgeschakeld = Template.bind({});
Uitgeschakeld.args = { disabled: true };

export const AangevinktUitgeschakeld = Template.bind({});
AangevinktUitgeschakeld.args = { checked: true, disabled: true };

export const AlleToestanden = () => html`
	<div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap;">
		<ndd-checkbox accessible-label="Niet aangevinkt"></ndd-checkbox>
		<ndd-checkbox checked accessible-label="Aangevinkt"></ndd-checkbox>
		<ndd-checkbox indeterminate accessible-label="Onbepaald"></ndd-checkbox>
		<ndd-checkbox disabled accessible-label="Uitgeschakeld"></ndd-checkbox>
		<ndd-checkbox checked disabled accessible-label="Aangevinkt en uitgeschakeld"></ndd-checkbox>
		<ndd-checkbox
			indeterminate
			disabled
			accessible-label="Onbepaald en uitgeschakeld"
		></ndd-checkbox>
	</div>
`;
AlleToestanden.parameters = { controls: { disable: true } };
