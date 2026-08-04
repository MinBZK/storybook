import { html, nothing } from 'lit';
import './time-field.ts';
import '../../forms/form-field/form-field.ts';

export default {
	title: 'Components/Inputs/Time Field',
	component: 'nldd-time-field',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/time-field/time-field.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: { type: 'stable' },
	},
	args: {
		size: 'md',
		width: '',
		value: '09:30',
		placeholder: '',
		min: '',
		max: '',
		step: 1,
		accessibleLabel: '',
		valid: false,
		invalid: false,
		readonly: false,
		disabled: false,
		required: false,
		name: '',
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md'],
			description: 'Componentmaat',
			table: { defaultValue: { summary: 'md' } },
		},
		width: {
			control: 'text',
			description: "Breedte: 'full' of een eigen CSS-lengte. Leeg is precies breed genoeg voor een tijd.",
			table: { defaultValue: { summary: '(geen)' } },
		},
		value: {
			control: 'text',
			description: 'De tijd als HH:mm (24-uurs)',
			table: { defaultValue: { summary: '(geen)' } },
		},
		placeholder: {
			control: 'text',
			description: 'Placeholdertekst',
			table: { defaultValue: { summary: '(geen)' } },
		},
		min: {
			control: 'text',
			description: 'Vroegst toegestane tijd; tevens de basis waarvandaan step telt',
			table: { defaultValue: { summary: '(geen)' } },
		},
		max: {
			control: 'text',
			description: 'Laatst toegestane tijd',
			table: { defaultValue: { summary: '(geen)' } },
		},
		step: {
			control: 'number',
			description: 'Minutenstap: bepaalt het afronden en hoe ver de pijltjestoetsen verspringen',
			table: { defaultValue: { summary: '1' } },
		},
		accessibleLabel: {
			name: 'accessible-label',
			control: 'text',
			description: 'Toegankelijk label voor de interne input',
			table: { defaultValue: { summary: '(geen)' } },
		},
		valid: {
			control: 'boolean',
			description: 'Markeert het veld als geldig',
			table: { defaultValue: { summary: false } },
		},
		invalid: {
			control: 'boolean',
			description: 'Markeert het veld als ongeldig',
			table: { defaultValue: { summary: false } },
		},
		readonly: {
			control: 'boolean',
			description: 'Alleen-lezen staat',
			table: { defaultValue: { summary: false } },
		},
		disabled: {
			control: 'boolean',
			description: 'Uitgeschakelde staat',
			table: { defaultValue: { summary: false } },
		},
		required: {
			control: 'boolean',
			description: 'Verplichte staat',
			table: { defaultValue: { summary: false } },
		},
		name: {
			control: 'text',
			description: 'Naam voor formulierverzending',
			table: { defaultValue: { summary: '(geen)' } },
		},
	},
};

const Template = ({
	size,
	width,
	value,
	placeholder,
	min,
	max,
	step,
	accessibleLabel,
	valid,
	invalid,
	readonly,
	disabled,
	required,
	name,
}: Record<string, any>) => html`
	<nldd-time-field
		size=${size || nothing}
		width=${width || nothing}
		value=${value || nothing}
		placeholder=${placeholder || nothing}
		min=${min || nothing}
		max=${max || nothing}
		step=${step || nothing}
		accessible-label=${accessibleLabel || nothing}
		?valid=${valid}
		?invalid=${invalid}
		?readonly=${readonly}
		?disabled=${disabled}
		?required=${required}
		name=${name || nothing}
	></nldd-time-field>
`;

export const Standaard = Template.bind({});

export const Kwartieren = () => html`
	<p>Stap 15: bij verlaten van het veld rondt de invoer af op het dichtstbijzijnde kwartier, en de pijltjestoetsen verspringen met een kwartier.</p>
	<nldd-time-field
		step="15"
		accessible-label="Starttijd"
	></nldd-time-field>
`;

export const StapVanafMin = () => html`
	<p>De stap telt vanaf <code>min</code>, dus deze reeks loopt 09:07, 09:22, 09:37.</p>
	<nldd-time-field
		min="09:07"
		step="15"
		accessible-label="Vertrektijd"
	></nldd-time-field>
`;

export const Kantooruren = () => html`
	<p>Buiten <code>min</code> en <code>max</code> blijft de getypte tekst staan, maar de waarde is leeg.</p>
	<nldd-time-field
		min="09:00"
		max="17:00"
		step="30"
		accessible-label="Afspraak"
	></nldd-time-field>
`;

export const InEenFormField = () => html`
	<nldd-form-field
		label="Starttijd"
		supporting-label="Bijvoorbeeld 9:30 of 930"
	>
		<nldd-time-field step="5"></nldd-time-field>
	</nldd-form-field>
`;

export const Maten = () => html`
	<div style="display: flex; gap: 16px; align-items: flex-start;">
		<nldd-time-field size="sm" value="09:30" accessible-label="Klein"></nldd-time-field>
		<nldd-time-field size="md" value="09:30" accessible-label="Middel"></nldd-time-field>
	</div>
`;

export const Staten = () => html`
	<div style="display: flex; gap: 16px; align-items: flex-start; flex-wrap: wrap;">
		<nldd-time-field value="09:30" valid accessible-label="Geldig"></nldd-time-field>
		<nldd-time-field value="25:99" invalid accessible-label="Ongeldig"></nldd-time-field>
		<nldd-time-field value="09:30" readonly accessible-label="Alleen lezen"></nldd-time-field>
		<nldd-time-field value="09:30" disabled accessible-label="Uitgeschakeld"></nldd-time-field>
	</div>
`;
