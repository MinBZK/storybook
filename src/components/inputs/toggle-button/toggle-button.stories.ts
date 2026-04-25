import { html } from 'lit';
import './toggle-button.js';

/**
 * De Toggle Button component is een selecteerbare knop die tussen aan/uit kan schakelen.
 * Beschikbaar als `button` (met `aria-pressed`), `checkbox` of `radio` als onderliggend element,
 * zodat de semantiek aansluit bij het gebruik.
 *
 * ## Gebruik
 * ```html
 * <nldd-toggle-button text="Label"></nldd-toggle-button>
 * <nldd-toggle-button text="Bewaren" icon="heart"></nldd-toggle-button>
 * ```
 */
export default {
	title: 'Components/Inputs/Toggle Button',
	component: 'nldd-toggle-button',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/toggle-button/toggle-button.ts',
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
			description: 'Grootte',
			table: {
				defaultValue: { summary: 'md' },
			},
		},
		text: {
			control: 'text',
			description: 'Tekst van de knop',
		},
		icon: {
			control: 'text',
			description: 'Icoon naam voor nldd-icon',
		},
		type: {
			control: 'select',
			options: ['button', 'checkbox', 'radio'],
			description: 'Onderliggend element',
			table: {
				defaultValue: { summary: 'button' },
			},
		},
		selected: {
			control: 'boolean',
			description: 'Geselecteerde toestand',
			table: {
				defaultValue: { summary: false },
			},
		},
		disabled: {
			control: 'boolean',
			description: 'Uitgeschakelde toestand',
			table: {
				defaultValue: { summary: false },
			},
		},
	},
	args: {
		size: 'md',
		text: 'Toggle',
		icon: '',
		type: 'button',
		selected: false,
		disabled: false,
	},
};

const Template = (args: Record<string, any>) => html`
	<nldd-toggle-button
		type=${args.type}
		size=${args.size}
		?selected=${args.selected}
		?disabled=${args.disabled}
		text=${args.text}
		icon=${args.icon}
	></nldd-toggle-button>
`;

export const Standaard = {
	render: Template,
	args: {
		text: 'Toggle button',
	},
	parameters: {
		docs: {
			description: {
				story: 'Standaard toggle button met `type="button"` (de default). Gebruikt `aria-pressed` voor de geselecteerde toestand en neemt niet deel aan formulierverwerking.',
			},
	},
},
};


/* ============================================================
   Types
   ============================================================ */

export const AlleTypes = {
	render: () => html`
	<div style="display: flex; flex-direction: column; gap: 1.5rem;">
		<div>
			<p style="font: var(--primitives-font-body-sm-regular-snug); color: var(--semantics-content-secondary-color); margin: 0 0 0.5rem;">
				type="button" (standaard) — aria-pressed, geen formulierparticipatie
			</p>
			<div style="display: flex; gap: 0.5rem;">
				<nldd-toggle-button type="button" text="Voorbeeld" icon="eye"></nldd-toggle-button>
				<nldd-toggle-button type="button" text="Bewerken" icon="pencil" selected></nldd-toggle-button>
			</div>
		</div>
		<div>
			<p style="font: var(--primitives-font-body-sm-regular-snug); color: var(--semantics-content-secondary-color); margin: 0 0 0.5rem;">
				type="checkbox" — native checkbox input, meerdere tegelijk selecteerbaar
			</p>
			<div style="display: flex; gap: 0.5rem;">
				<nldd-toggle-button type="checkbox" name="filter" value="mijn-zaken" text="Mijn zaken" icon="person"></nldd-toggle-button>
				<nldd-toggle-button type="checkbox" name="filter" value="inbox" text="Inbox" icon="inbox" selected></nldd-toggle-button>
				<nldd-toggle-button type="checkbox" name="filter" value="agenda" text="Agenda" icon="calendar-event"></nldd-toggle-button>
			</div>
		</div>
		<div>
			<p style="font: var(--primitives-font-body-sm-regular-snug); color: var(--semantics-content-secondary-color); margin: 0 0 0.5rem;">
				type="radio" — native radio input, wederzijdse uitsluiting via name-groep
			</p>
			<div style="display: flex; gap: 0.5rem;" role="radiogroup" aria-label="Sortering">
				<nldd-toggle-button type="radio" name="sortering" value="oplopend" text="Oplopend" icon="sort-ascending"></nldd-toggle-button>
				<nldd-toggle-button type="radio" name="sortering" value="aflopend" text="Aflopend" icon="sort-descending" selected></nldd-toggle-button>
				<nldd-toggle-button type="radio" name="sortering" value="relevant" text="Relevant" icon="sort"></nldd-toggle-button>
			</div>
		</div>
	</div>
`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Overzicht van alle drie de types. Gebruik `type="button"` voor UI-acties, `type="checkbox"` voor multi-select filters en `type="radio"` voor single-select keuzes met formulierparticipatie.',
			},
	},
},
};


/* ============================================================
   Toestanden
   ============================================================ */

export const AlleToestanden = {
	render: () => html`
	<div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
		<nldd-toggle-button text="Bewaren" icon="heart"></nldd-toggle-button>
		<nldd-toggle-button text="Bewaard" icon="heart-filled" selected></nldd-toggle-button>
		<nldd-toggle-button text="Bewaren" icon="heart" disabled></nldd-toggle-button>
		<nldd-toggle-button text="Bewaard" icon="heart-filled" selected disabled></nldd-toggle-button>
	</div>
`,
	parameters: { controls: { disable: true } },
};


/* ============================================================
   Grootten
   ============================================================ */

export const AlleGrootten = {
	render: () => html`
	<div style="display: flex; gap: 1rem; align-items: center;">
		<nldd-toggle-button size="xs" text="Zoeken" icon="search"></nldd-toggle-button>
		<nldd-toggle-button size="sm" text="Zoeken" icon="search"></nldd-toggle-button>
		<nldd-toggle-button size="md" text="Zoeken" icon="search"></nldd-toggle-button>
	</div>
`,
	parameters: { controls: { disable: true } },
};


/* ============================================================
   Met icoon
   ============================================================ */

export const MetIcoon = {
	render: () => html`
	<div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
		<nldd-toggle-button text="Bewaren" icon="heart"></nldd-toggle-button>
		<nldd-toggle-button text="Bewaard" icon="heart-filled" selected></nldd-toggle-button>
		<nldd-toggle-button text="Delen" icon="share"></nldd-toggle-button>
		<nldd-toggle-button text="Tonen" icon="eye"></nldd-toggle-button>
		<nldd-toggle-button text="Verborgen" icon="eye-slash" selected></nldd-toggle-button>
	</div>
`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Gebruik het `icon` attribute om een icoon toe te voegen.',
			},
	},
},
};

export const AlleenIcoon = {
	render: () => html`
	<div style="display: flex; gap: 0.5rem; align-items: center;">
		<nldd-toggle-button size="md" icon="bold" accessible-label="Vet"></nldd-toggle-button>
		<nldd-toggle-button size="md" icon="italic" accessible-label="Cursief" selected></nldd-toggle-button>
		<nldd-toggle-button size="md" icon="underlined" accessible-label="Onderstreept"></nldd-toggle-button>
		<nldd-toggle-button size="md" icon="bullet-list" accessible-label="Opsomming"></nldd-toggle-button>
		<nldd-toggle-button size="md" icon="numbered-list" accessible-label="Genummerde lijst"></nldd-toggle-button>
	</div>
`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Zonder tekst wordt de knop automatisch vierkant. Het `accessible-label` attribuut is verplicht voor toegankelijkheid.',
			},
	},
},
};


/* ============================================================
   Type: button
   ============================================================ */

export const TypeButton = {
	render: () => html`
	<div style="display: flex; flex-direction: column; gap: 0.75rem;">
		<p style="font: var(--primitives-font-body-md-regular-snug); margin: 0;">
			<code>type="button"</code> is de standaard. Gebruikt <code>aria-pressed</code> voor de geselecteerde toestand en neemt niet deel aan formulierverwerking.
		</p>
		<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
			<nldd-toggle-button type="button" icon="bullet-list" accessible-label="Opsomming"></nldd-toggle-button>
			<nldd-toggle-button type="button" icon="numbered-list" accessible-label="Genummerde lijst" selected></nldd-toggle-button>
			<nldd-toggle-button type="button" text="Voorbeeld" icon="eye"></nldd-toggle-button>
			<nldd-toggle-button type="button" text="Bewerken" icon="pencil" selected></nldd-toggle-button>
		</div>
	</div>
`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: '`type="button"` (de default) — `aria-pressed` geeft de geselecteerde toestand door aan hulptechnologie.',
			},
	},
},
};


/* ============================================================
   Type: checkbox
   ============================================================ */

export const TypeCheckbox = {
	render: () => html`
	<div style="display: flex; flex-direction: column; gap: 0.75rem;">
		<p style="font: var(--primitives-font-body-md-regular-snug); margin: 0;">
			<code>type="checkbox"</code> voor filter-chips en multi-select acties met formulierparticipatie.
		</p>
		<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
			<nldd-toggle-button type="checkbox" name="filter" value="mijn-zaken" text="Mijn zaken" icon="person"></nldd-toggle-button>
			<nldd-toggle-button type="checkbox" name="filter" value="inbox" text="Inbox" icon="inbox" selected></nldd-toggle-button>
			<nldd-toggle-button type="checkbox" name="filter" value="agenda" text="Agenda" icon="calendar-event" selected></nldd-toggle-button>
			<nldd-toggle-button type="checkbox" name="filter" value="documenten" text="Documenten" icon="file-text"></nldd-toggle-button>
		</div>
	</div>
`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: '`type="checkbox"` — meerdere knoppen kunnen tegelijk geselecteerd zijn.',
			},
	},
},
};


/* ============================================================
   Type: radio
   ============================================================ */

export const TypeRadio = {
	render: () => html`
	<div style="display: flex; flex-direction: column; gap: 0.75rem;">
		<p style="font: var(--primitives-font-body-md-regular-snug); margin: 0;">
			<code>type="radio"</code> voor single-select keuzes. Gebruik <code>nldd-toggle-button-group</code> voor beheer via JavaScript.
		</p>
		<div style="display: flex; gap: 0.5rem;" role="radiogroup" aria-label="Sortering">
			<nldd-toggle-button type="radio" name="sortering" value="oplopend" text="Oplopend" icon="sort-ascending"></nldd-toggle-button>
			<nldd-toggle-button type="radio" name="sortering" value="aflopend" text="Aflopend" icon="sort-descending" selected></nldd-toggle-button>
			<nldd-toggle-button type="radio" name="sortering" value="relevant" text="Relevant" icon="sort"></nldd-toggle-button>
		</div>
	</div>
`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: '`type="radio"` — native browser-gedrag zorgt voor wederzijdse uitsluiting binnen dezelfde `name`-groep.',
			},
	},
},
};
