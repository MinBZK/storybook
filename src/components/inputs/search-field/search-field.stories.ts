import { html, nothing } from 'lit';
import './search-field.js';

/**
 * De Search Field component is een zoekveld met zoekicoon, een optionele dismiss knop
 * en een optionele zoekknop.
 */
export default {
	title: 'Components/Inputs/Search Field',
	component: 'nldd-search-field',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/search-field/search-field.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md'],
			description: 'Grootte van het veld',
			table: { defaultValue: { summary: 'md' } },
		},
		width: {
			control: 'text',
			description: 'Optionele vaste breedte (any CSS length, bv. "240px"). Leeg = stretch.',
			table: { defaultValue: { summary: '' } },
		},
		showSearchButton: {
			name: 'show-search-button',
			control: 'boolean',
			description: 'Toont een zoekknop aan de rechterkant',
			table: { defaultValue: { summary: false } },
		},
		name: {
			control: 'text',
			description: 'Naam voor formulierverwerking',
		},
		value: {
			control: 'text',
			description: 'Huidige zoekwaarde',
			table: { defaultValue: { summary: '' } },
		},
		placeholder: {
			control: 'text',
			description: 'Placeholder tekst',
			table: { defaultValue: { summary: 'Zoeken' } },
		},
		accessibleLabel: {
			name: 'accessible-label',
			control: 'text',
			description: 'Toegankelijkheidslabel voor de input. Valt automatisch terug op de placeholder als niet ingevuld.',
		},
		required: {
			control: 'boolean',
			description: 'Verplichte staat.',
			table: { defaultValue: { summary: false } },
		},
		noSpellcheck: {
			name: 'no-spellcheck',
			control: 'boolean',
			description: 'Disables browser spellchecking on the inner input',
			table: { defaultValue: { summary: false } },
		},
		invalid: {
			control: 'boolean',
			description: 'Ongeldige staat. Wordt aangekondigd met aria-invalid; er wordt niets voor getekend.',
			table: { defaultValue: { summary: false } },
		},
		disabled: {
			control: 'boolean',
			description: 'Uitgeschakelde toestand',
			table: { defaultValue: { summary: false } },
		},
		minlength: {
			control: 'number',
			description: 'Minimaal aantal tekens.',
			table: { type: { summary: 'number' }, defaultValue: { summary: '(geen)' } },
		},
		maxlength: {
			control: 'number',
			description: 'Maximaal aantal tekens.',
			table: { type: { summary: 'number' }, defaultValue: { summary: '(geen)' } },
		},
		pattern: {
			control: 'text',
			description: 'Reguliere expressie waar de waarde aan moet voldoen, als het native `pattern`.',
			table: { defaultValue: { summary: '(geen)' } },
		},

	},
	args: {
		size: 'md',
		width: '',
		showSearchButton: false,
		name: '',
		value: '',
		placeholder: 'Zoeken',
		accessibleLabel: '',
		required: false,
		noSpellcheck: false,
		invalid: false,
		disabled: false,
		minlength: null,
		maxlength: null,
		pattern: '',
	},
};

const Template = ({ size, showSearchButton, name, value, placeholder, accessibleLabel, invalid, disabled, required, noSpellcheck, width, minlength, maxlength, pattern }: Record<string, any>) => html`
	<nldd-search-field
		minlength=${minlength ?? nothing}
		maxlength=${maxlength ?? nothing}
		pattern=${pattern || nothing}
		value=${value}
		placeholder=${placeholder}
		accessible-label=${accessibleLabel}
		size=${size}
		?invalid=${invalid}
		?required=${required}
		?disabled=${disabled}
		?show-search-button=${showSearchButton}
		name=${name}
		?no-spellcheck=${noSpellcheck}
		width=${width}
	></nldd-search-field>
`;

export const Standaard = {
	render: Template,
	args: {},
};

export const MetZoekKnop = {
	render: Template,
	args: { showSearchButton: true },
};

export const AlleToestanden = {
	render: () => html`
	<div style="display: flex; flex-direction: column; gap: 1rem;">
		<nldd-search-field size="md" placeholder="Zoeken"></nldd-search-field>
		<nldd-search-field size="md" placeholder="Zoeken" value="Zoekterm"></nldd-search-field>
		<nldd-search-field size="md" placeholder="Zoeken" show-search-button></nldd-search-field>
		<nldd-search-field size="md" placeholder="Zoeken" value="Zoekterm" show-search-button></nldd-search-field>
		<nldd-search-field size="sm" placeholder="Zoeken"></nldd-search-field>
		<nldd-search-field size="sm" placeholder="Zoeken" value="Zoekterm"></nldd-search-field>
		<nldd-search-field size="sm" placeholder="Zoeken" show-search-button></nldd-search-field>
		<nldd-search-field size="sm" placeholder="Zoeken" value="Zoekterm" show-search-button></nldd-search-field>
		<nldd-search-field size="md" placeholder="Zoeken" disabled></nldd-search-field>
		<nldd-search-field size="md" placeholder="Zoeken" value="Zoekterm" disabled></nldd-search-field>
	</div>
`,
	parameters: { controls: { disable: true } },
};
