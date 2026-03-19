import { html } from 'lit';
import './rr-number-field.ts';

/**
 * De Number Field component is een numeriek invoerveld met decrement en increment knoppen.
 */
export default {
	title: 'Components/Inputs/Number Field',
	component: 'rr-number-field',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/number-field/rr-number-field.ts',
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
		disabled: false,
		name: '',
		hideSpinButtons: false,
		fullWidth: false,
		width: '',
	},
};

const Template = ({ value, min, max, step, disabled, name, hideSpinButtons, fullWidth, width }) => html`
	<rr-number-field
		value=${value}
		min=${min}
		max=${max}
		step=${step}
		?disabled=${disabled}
		name=${name}
		?hide-spin-buttons=${hideSpinButtons}
		?full-width=${fullWidth}
		width=${width}
	></rr-number-field>
`;

export const Standaard = Template.bind({});
Standaard.args = {};

export const AlleToestanden = () => html`
	<div style="display: flex; flex-direction: column; gap: 1rem;">
		<rr-number-field value="5" min="0" max="10"></rr-number-field>
		<rr-number-field value="0" min="0" max="10"></rr-number-field>
		<rr-number-field value="10" min="0" max="10"></rr-number-field>
		<rr-number-field value="5" min="0" max="10" disabled></rr-number-field>
		<rr-number-field value="5" min="0" max="10" hide-spin-buttons></rr-number-field>
		<rr-number-field value="5" min="0" max="10" hide-spin-buttons disabled></rr-number-field>
		<rr-number-field value="5" min="0" max="10" width="240px"></rr-number-field>
		<rr-number-field value="5" min="0" max="10" hide-spin-buttons width="240px"></rr-number-field>
		<div style="width: 400px;">
			<rr-number-field value="5" min="0" max="10" full-width></rr-number-field>
		</div>
		<div style="width: 400px;">
			<rr-number-field value="5" min="0" max="10" hide-spin-buttons full-width></rr-number-field>
		</div>
	</div>
`;
AlleToestanden.parameters = { controls: { disable: true } };
