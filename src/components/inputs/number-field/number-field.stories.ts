import { html } from 'lit';
import './number-field.js';

/**
 * De Number Field component is een numeriek invoerveld met decrement en increment knoppen.
 */
export default {
	title: 'Components/Inputs/Number Field',
	component: 'nldd-number-field',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/number-field/number-field.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		value: {
			control: { type: 'number' },
			description: 'Huidige waarde',
			table: { defaultValue: { summary: 0 } },
		},
		min: {
			control: { type: 'number' },
			description: 'Minimale waarde',
			table: { defaultValue: { summary: '-∞' } },
		},
		max: {
			control: { type: 'number' },
			description: 'Maximale waarde',
			table: { defaultValue: { summary: '∞' } },
		},
		step: {
			control: { type: 'number' },
			description: 'Stapgrootte',
			table: { defaultValue: { summary: 1 } },
		},
		size: {
			control: 'select',
			options: ['sm', 'md'],
			description: 'Grootte van het veld',
			table: { defaultValue: { summary: 'md' } },
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
		hideSpinButtons: {
			control: 'boolean',
			name: 'hide-spin-buttons',
			description: 'Verbergt de plus- en minknoppen',
			table: { defaultValue: { summary: false } },
		},
		fullWidth: {
			control: 'boolean',
			name: 'full-width',
			description: 'Vult de volledige breedte van de container',
			table: { defaultValue: { summary: false } },
		},
		width: {
			control: 'text',
			description: 'Vaste breedte van het veld; het invoervak rekt mee',
		},
	},
	args: {
		value: 1,
		min: 0,
		max: 10,
		step: 1,
		size: 'md',
		disabled: false,
		name: '',
		hideSpinButtons: false,
		fullWidth: false,
		width: '',
	},
};

const Template = ({ value, min, max, step, size, disabled, name, hideSpinButtons, fullWidth, width }: Record<string, any>) => html`
	<nldd-number-field
		value=${value}
		min=${min}
		max=${max}
		step=${step}
		size=${size}
		?disabled=${disabled}
		name=${name}
		?hide-spin-buttons=${hideSpinButtons}
		?full-width=${fullWidth}
		width=${width}
	></nldd-number-field>
`;

export const Standaard = {
	render: Template,
	args: {},
};

export const AlleToestanden = {
	render: () => html`
	<div style="display: flex; flex-direction: column; gap: 1rem;">
		<nldd-number-field value="5" min="0" max="10" size="sm"></nldd-number-field>
		<nldd-number-field value="5" min="0" max="10" size="md"></nldd-number-field>
		<nldd-number-field value="0" min="0" max="10"></nldd-number-field>
		<nldd-number-field value="10" min="0" max="10"></nldd-number-field>
		<nldd-number-field value="5" min="0" max="10" disabled></nldd-number-field>
		<nldd-number-field value="5" min="0" max="10" hide-spin-buttons></nldd-number-field>
		<nldd-number-field value="5" min="0" max="10" hide-spin-buttons disabled></nldd-number-field>
		<nldd-number-field value="5" min="0" max="10" size="sm" hide-spin-buttons></nldd-number-field>
		<nldd-number-field value="5" min="0" max="10" width="240px"></nldd-number-field>
		<nldd-number-field value="5" min="0" max="10" hide-spin-buttons width="240px"></nldd-number-field>
		<div style="width: 400px;">
			<nldd-number-field value="5" min="0" max="10" full-width></nldd-number-field>
		</div>
		<div style="width: 400px;">
			<nldd-number-field value="5" min="0" max="10" hide-spin-buttons full-width></nldd-number-field>
		</div>
	</div>
`,
	parameters: { controls: { disable: true } },
};
