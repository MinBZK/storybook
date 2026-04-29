import { html } from 'lit';
import './dropdown.js';

/**
 * De Dropdown component is een visuele wrapper om een native `<select>` element.
 * Geef een native `<select>` als slotted child — de browser behoudt volledige controle
 * over formulierverwerking, toegankelijkheid en keyboard navigatie.
 */
export default {
	title: 'Components/Inputs/Dropdown',
	component: 'nldd-dropdown',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/dropdown/dropdown.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md'],
			description: 'Grootte van het veld',
			table: { defaultValue: { summary: 'md' } },
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
		disabled: {
			control: 'boolean',
			description: 'Uitgeschakelde toestand',
			table: { defaultValue: { summary: false } },
		},
		width: {
			control: 'text',
			description: 'Optionele vaste breedte (any CSS length, bv. "240px"). Leeg = stretch.',
			table: { defaultValue: { summary: '' } },
		},
	},
	args: {
		size: 'md',
		valid: false,
		invalid: false,
		disabled: false,
		width: '',
	},
};

const Template = ({ size, valid, invalid, disabled, width }: Record<string, any>) => html`
	<nldd-dropdown size=${size} ?valid=${valid} ?invalid=${invalid} ?disabled=${disabled} width=${width}>
		<select name="optie" aria-label="Selecteer een optie">
			<option value="" disabled selected>Selecteer een optie</option>
			<option value="optie-1">Optie 1</option>
			<option value="optie-2">Optie 2</option>
			<option value="optie-3">Optie 3</option>
		</select>
	</nldd-dropdown>
`;

export const Standaard = {
	render: Template,
	args: {},
};

export const AlleToestanden = {
	render: () => html`
	<div style="display: flex; flex-direction: column; gap: 1rem;">
		<nldd-dropdown size="xs">
			<select name="optie-xs" aria-label="Selecteer een optie">
				<option value="" disabled selected>Selecteer een optie</option>
				<option value="optie-1">Optie 1</option>
				<option value="optie-2">Optie 2</option>
			</select>
		</nldd-dropdown>
		<nldd-dropdown size="sm">
			<select name="optie-3" aria-label="Selecteer een optie">
				<option value="" disabled selected>Selecteer een optie</option>
				<option value="optie-1">Optie 1</option>
				<option value="optie-2">Optie 2</option>
			</select>
		</nldd-dropdown>
		<nldd-dropdown size="md">
			<select name="optie-1" aria-label="Selecteer een optie">
				<option value="" disabled selected>Selecteer een optie</option>
				<option value="optie-1">Optie 1</option>
				<option value="optie-2">Optie 2</option>
			</select>
		</nldd-dropdown>
		<nldd-dropdown size="md">
			<select name="optie-2" aria-label="Selecteer een optie">
				<option value="optie-1">Optie 1</option>
				<option value="optie-2">Optie 2</option>
			</select>
		</nldd-dropdown>
		<nldd-dropdown size="md" valid>
			<select name="optie-valid" aria-label="Selecteer een optie">
				<option value="optie-1" selected>Optie 1</option>
				<option value="optie-2">Optie 2</option>
			</select>
		</nldd-dropdown>
		<nldd-dropdown size="md" invalid>
			<select name="optie-invalid" aria-label="Selecteer een optie">
				<option value="" disabled selected>Selecteer een optie</option>
				<option value="optie-1">Optie 1</option>
			</select>
		</nldd-dropdown>
		<nldd-dropdown size="md" disabled>
			<select name="optie-4" aria-label="Selecteer een optie">
				<option value="optie-1">Optie 1</option>
				<option value="optie-2">Optie 2</option>
			</select>
		</nldd-dropdown>
		<nldd-dropdown size="md">
			<select name="optie-5" aria-label="Selecteer een categorie">
				<optgroup label="Groep A">
					<option value="a1">A1</option>
					<option value="a2">A2</option>
				</optgroup>
				<optgroup label="Groep B">
					<option value="b1">B1</option>
					<option value="b2">B2</option>
				</optgroup>
			</select>
		</nldd-dropdown>
	</div>
`,
	parameters: { controls: { disable: true } },
};
