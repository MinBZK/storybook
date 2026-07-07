import { html } from 'lit';
import './token-field.js';
import '../../actions/menu/menu.js';

/**
 * De Token Field is een multi-select invoerveld: gekozen waarden verschijnen als
 * verwijderbare tokens in een wrappende rij, gevolgd door een invoer die
 * meegroeit. Voeg een `nldd-menu` met `nldd-menu-item` elementen toe als opties
 * (net als bij de combo-box). Dit is de eerste bouwfase (frame + tokens + waarde);
 * de menu-/filterbedrading volgt.
 */
export default {
	title: 'Components/Inputs/Token Field',
	component: 'nldd-token-field',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/token-field/token-field.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: { type: 'wip' },
	},
	args: {
		values: [],
		placeholder: 'Land toevoegen…',
		type: 'text',
		autocomplete: '',
		accessibleLabel: 'Landen',
		allowCustom: false,
		valid: false,
		invalid: false,
		noSpellcheck: false,
		readonly: false,
		required: false,
		disabled: false,
	},
	argTypes: {
		values: {
			control: 'object',
			description: 'Geselecteerde token-waarden (array; zet via de `values`-property).',
			table: { defaultValue: { summary: '[]' } },
		},
		placeholder: {
			control: 'text',
			description: 'Placeholder in de invoer.',
			table: { defaultValue: { summary: '(geen)' } },
		},
		type: {
			control: 'text',
			description: 'Input-type doorgegeven aan de invoer (bijv. `email`).',
			table: { defaultValue: { summary: 'text' } },
		},
		autocomplete: {
			control: 'text',
			description: 'Autocomplete-hint doorgegeven aan de invoer.',
			table: { defaultValue: { summary: '(geen)' } },
		},
		accessibleLabel: {
			name: 'accessible-label',
			control: 'text',
			description: 'Toegankelijk label, doorgegeven als aria-label aan de invoer.',
			table: { defaultValue: { summary: '(geen)' } },
		},
		allowCustom: {
			name: 'allow-custom',
			control: 'boolean',
			description: 'Sta vrij getypte waarden toe (naast de menu-opties).',
			table: { defaultValue: { summary: 'false' } },
		},
		valid: {
			control: 'boolean',
			description: 'Markeert het veld geldig (groene rand + valid-icoon rechts).',
			table: { defaultValue: { summary: 'false' } },
		},
		invalid: {
			control: 'boolean',
			description: 'Markeert het veld ongeldig (rode rand + invalid-icoon rechts).',
			table: { defaultValue: { summary: 'false' } },
		},
		noSpellcheck: {
			name: 'no-spellcheck',
			control: 'boolean',
			description: 'Schakelt browser-spellcheck op de invoer uit.',
			table: { defaultValue: { summary: 'false' } },
		},
		readonly: {
			control: 'boolean',
			description: 'Alleen-lezen: statische tokens (geen dismiss), geen invoer/picker, read-only-oppervlak.',
			table: { defaultValue: { summary: 'false' } },
		},
		required: {
			control: 'boolean',
			description: 'Verplicht: ongeldig zolang er geen tokens zijn.',
			table: { defaultValue: { summary: 'false' } },
		},
		disabled: {
			control: 'boolean',
			description: 'Uitgeschakelde staat: tokens niet verwijderbaar, invoer dicht.',
			table: { defaultValue: { summary: 'false' } },
		},
	},
};

const options = html`
	<nldd-menu variant="listbox">
		<nldd-menu-item value="nl" text="Nederland"></nldd-menu-item>
		<nldd-menu-item value="be" text="België"></nldd-menu-item>
		<nldd-menu-item value="de" text="Duitsland"></nldd-menu-item>
		<nldd-menu-item value="fr" text="Frankrijk"></nldd-menu-item>
	</nldd-menu>
`;

const render = (args: Record<string, unknown>) => html`
	<nldd-token-field
		.values=${(args.values as string[]) ?? []}
		placeholder=${(args.placeholder as string) ?? ''}
		type=${(args.type as string) ?? 'text'}
		autocomplete=${(args.autocomplete as string) ?? ''}
		accessible-label=${(args.accessibleLabel as string) ?? ''}
		?allow-custom=${args.allowCustom}
		?valid=${args.valid}
		?invalid=${args.invalid}
		?no-spellcheck=${args.noSpellcheck}
		?readonly=${args.readonly}
		?required=${args.required}
		?disabled=${args.disabled}
	>${options}</nldd-token-field>
`;

export const Empty = { args: { placeholder: 'Land toevoegen…', values: [] }, render };
export const WithTokens = { args: { values: ['nl', 'be', 'de'] }, render };
export const Invalid = { args: { values: ['nl'], invalid: true }, render };

export const Readonly = { args: { values: ['nl', 'be'], readonly: true }, render };

/**
 * Vrije invoer zonder opties-menu: `allow-custom` aan en geen slotted `nldd-menu`.
 * Handig voor bijvoorbeeld meerdere e-mailadressen (`type="email"`). Typ een waarde
 * en bevestig met Enter of een komma; een komma splitst ook geplakte, kommagescheiden
 * invoer.
 */
export const CustomValues = {
	args: {
		placeholder: 'E-mailadres toevoegen…',
		type: 'email',
		autocomplete: 'email',
		accessibleLabel: 'E-mailadressen',
		allowCustom: true,
		values: ['ada@example.com'],
	},
	render: (args: Record<string, unknown>) => html`
		<nldd-token-field
			.values=${(args.values as string[]) ?? []}
			placeholder=${(args.placeholder as string) ?? ''}
			type=${(args.type as string) ?? 'text'}
			autocomplete=${(args.autocomplete as string) ?? ''}
			accessible-label=${(args.accessibleLabel as string) ?? ''}
			?allow-custom=${args.allowCustom}
			?valid=${args.valid}
			?invalid=${args.invalid}
			?no-spellcheck=${args.noSpellcheck}
			?disabled=${args.disabled}
		></nldd-token-field>
	`,
};
