import { html } from 'lit';
import './rr-checkbox.ts';

/**
 * De Checkbox component stelt gebruikers in staat om een of meerdere opties te selecteren.
 *
 * ## Gebruik
 * ```html
 * <rr-checkbox accessible-label="Ik ga akkoord"></rr-checkbox>
 * ```
 */
export default {
	title: 'Components/Inputs/Checkbox',
	component: 'rr-checkbox',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/checkbox/rr-checkbox.ts',
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
	<rr-checkbox
		?checked=${checked}
		?indeterminate=${indeterminate}
		?disabled=${disabled}
		value=${value}
		name=${name}
		accessible-label="Checkbox"
	></rr-checkbox>
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
		<rr-checkbox accessible-label="Niet aangevinkt"></rr-checkbox>
		<rr-checkbox checked accessible-label="Aangevinkt"></rr-checkbox>
		<rr-checkbox indeterminate accessible-label="Onbepaald"></rr-checkbox>
		<rr-checkbox disabled accessible-label="Uitgeschakeld"></rr-checkbox>
		<rr-checkbox checked disabled accessible-label="Aangevinkt en uitgeschakeld"></rr-checkbox>
		<rr-checkbox indeterminate disabled accessible-label="Onbepaald en uitgeschakeld"></rr-checkbox>
	</div>
`;
AlleToestanden.parameters = { controls: { disable: true } };
