import { html } from 'lit';
import './rr-toggle-button.js';

/**
 * De Toggle Button component is een selecteerbare knop die tussen aan/uit kan schakelen.
 * Beschikbaar als `button` (met `aria-pressed`), `checkbox` of `radio` als onderliggend element,
 * zodat de semantiek aansluit bij het gebruik.
 *
 * ## Gebruik
 * ```html
 * <rr-toggle-button text="Label"></rr-toggle-button>
 * <rr-toggle-button text="Bewaren" icon="heart"></rr-toggle-button>
 * ```
 */
export default {
	title: 'Components/Inputs/Toggle Button',
	component: 'rr-toggle-button',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/toggle-button/rr-toggle-button.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		type: {
			control: 'select',
			options: ['button', 'checkbox', 'radio'],
			description: 'Onderliggend element',
			table: {
				defaultValue: { summary: 'button' },
			},
		},
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md'],
			description: 'Grootte',
			table: {
				defaultValue: { summary: 'md' },
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
		text: {
			control: 'text',
			description: 'Tekst van de knop',
		},
		icon: {
			control: 'text',
			description: 'Icoon naam voor rr-icon',
		},
	},
	args: {
		type: 'button',
		size: 'md',
		selected: false,
		disabled: false,
		text: 'Toggle',
		icon: '',
	},
};

const Template = (args) => html`
	<rr-toggle-button
		type=${args.type}
		size=${args.size}
		?selected=${args.selected}
		?disabled=${args.disabled}
		text=${args.text}
		icon=${args.icon}
	></rr-toggle-button>
`;

export const Standaard = Template.bind({});
Standaard.args = {
	text: 'Toggle button',
};
Standaard.parameters = {
	docs: {
		description: {
			story: 'Standaard toggle button met `type="button"` (de default). Gebruikt `aria-pressed` voor de geselecteerde toestand en neemt niet deel aan formulierverwerking.',
		},
	},
};


/* ============================================================
   Types
   ============================================================ */

export const AlleTypes = () => html`
	<div style="display: flex; flex-direction: column; gap: 1.5rem;">
		<div>
			<p style="font: var(--primitives-font-body-sm-regular-snug); color: var(--semantics-content-secondary-color); margin: 0 0 0.5rem;">
				type="button" (standaard) — aria-pressed, geen formulierparticipatie
			</p>
			<div style="display: flex; gap: 0.5rem;">
				<rr-toggle-button type="button" text="Voorbeeld" icon="eye"></rr-toggle-button>
				<rr-toggle-button type="button" text="Bewerken" icon="pencil" selected></rr-toggle-button>
			</div>
		</div>
		<div>
			<p style="font: var(--primitives-font-body-sm-regular-snug); color: var(--semantics-content-secondary-color); margin: 0 0 0.5rem;">
				type="checkbox" — native checkbox input, meerdere tegelijk selecteerbaar
			</p>
			<div style="display: flex; gap: 0.5rem;">
				<rr-toggle-button type="checkbox" name="filter" value="mijn-zaken" text="Mijn zaken" icon="person"></rr-toggle-button>
				<rr-toggle-button type="checkbox" name="filter" value="inbox" text="Inbox" icon="inbox" selected></rr-toggle-button>
				<rr-toggle-button type="checkbox" name="filter" value="agenda" text="Agenda" icon="calendar-event"></rr-toggle-button>
			</div>
		</div>
		<div>
			<p style="font: var(--primitives-font-body-sm-regular-snug); color: var(--semantics-content-secondary-color); margin: 0 0 0.5rem;">
				type="radio" — native radio input, wederzijdse uitsluiting via name-groep
			</p>
			<div style="display: flex; gap: 0.5rem;" role="radiogroup" aria-label="Sortering">
				<rr-toggle-button type="radio" name="sortering" value="oplopend" text="Oplopend" icon="sort-ascending"></rr-toggle-button>
				<rr-toggle-button type="radio" name="sortering" value="aflopend" text="Aflopend" icon="sort-descending" selected></rr-toggle-button>
				<rr-toggle-button type="radio" name="sortering" value="relevant" text="Relevant" icon="arrows-sort"></rr-toggle-button>
			</div>
		</div>
	</div>
`;
AlleTypes.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Overzicht van alle drie de types. Gebruik `type="button"` voor UI-acties, `type="checkbox"` voor multi-select filters en `type="radio"` voor single-select keuzes met formulierparticipatie.',
		},
	},
};


/* ============================================================
   Toestanden
   ============================================================ */

export const AlleToestanden = () => html`
	<div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
		<rr-toggle-button text="Bewaren" icon="heart"></rr-toggle-button>
		<rr-toggle-button text="Bewaard" icon="heart-filled" selected></rr-toggle-button>
		<rr-toggle-button text="Bewaren" icon="heart" disabled></rr-toggle-button>
		<rr-toggle-button text="Bewaard" icon="heart-filled" selected disabled></rr-toggle-button>
	</div>
`;
AlleToestanden.parameters = { controls: { disable: true } };


/* ============================================================
   Grootten
   ============================================================ */

export const AlleGrootten = () => html`
	<div style="display: flex; gap: 1rem; align-items: center;">
		<rr-toggle-button size="xs" text="Zoeken" icon="magnifier"></rr-toggle-button>
		<rr-toggle-button size="sm" text="Zoeken" icon="magnifier"></rr-toggle-button>
		<rr-toggle-button size="md" text="Zoeken" icon="magnifier"></rr-toggle-button>
	</div>
`;
AlleGrootten.parameters = { controls: { disable: true } };


/* ============================================================
   Met icoon
   ============================================================ */

export const MetIcoon = () => html`
	<div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
		<rr-toggle-button text="Bewaren" icon="heart"></rr-toggle-button>
		<rr-toggle-button text="Bewaard" icon="heart-filled" selected></rr-toggle-button>
		<rr-toggle-button text="Delen" icon="square-and-arrow-up"></rr-toggle-button>
		<rr-toggle-button text="Tonen" icon="eye"></rr-toggle-button>
		<rr-toggle-button text="Verborgen" icon="eye-slash" selected></rr-toggle-button>
	</div>
`;
MetIcoon.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Gebruik het `icon` attribute om een icoon toe te voegen.',
		},
	},
};

export const AlleenIcoon = () => html`
	<div style="display: flex; gap: 0.5rem; align-items: center;">
		<rr-toggle-button size="md" icon="bold" accessible-label="Vet"></rr-toggle-button>
		<rr-toggle-button size="md" icon="italic" accessible-label="Cursief" selected></rr-toggle-button>
		<rr-toggle-button size="md" icon="underlined" accessible-label="Onderstreept"></rr-toggle-button>
		<rr-toggle-button size="md" icon="bullet-list" accessible-label="Opsomming"></rr-toggle-button>
		<rr-toggle-button size="md" icon="numbered-list" accessible-label="Genummerde lijst"></rr-toggle-button>
	</div>
`;
AlleenIcoon.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Zonder tekst wordt de knop automatisch vierkant. Het `accessible-label` attribuut is verplicht voor toegankelijkheid.',
		},
	},
};


/* ============================================================
   Type: button
   ============================================================ */

export const TypeButton = () => html`
	<div style="display: flex; flex-direction: column; gap: 0.75rem;">
		<p style="font: var(--primitives-font-body-md-regular-snug); margin: 0;">
			<code>type="button"</code> is de standaard. Gebruikt <code>aria-pressed</code> voor de geselecteerde toestand en neemt niet deel aan formulierverwerking.
		</p>
		<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
			<rr-toggle-button type="button" icon="bullet-list" accessible-label="Opsomming"></rr-toggle-button>
			<rr-toggle-button type="button" icon="numbered-list" accessible-label="Genummerde lijst" selected></rr-toggle-button>
			<rr-toggle-button type="button" text="Voorbeeld" icon="eye"></rr-toggle-button>
			<rr-toggle-button type="button" text="Bewerken" icon="pencil" selected></rr-toggle-button>
		</div>
	</div>
`;
TypeButton.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: '`type="button"` (de default) — `aria-pressed` geeft de geselecteerde toestand door aan hulptechnologie.',
		},
	},
};


/* ============================================================
   Type: checkbox
   ============================================================ */

export const TypeCheckbox = () => html`
	<div style="display: flex; flex-direction: column; gap: 0.75rem;">
		<p style="font: var(--primitives-font-body-md-regular-snug); margin: 0;">
			<code>type="checkbox"</code> voor filter-chips en multi-select acties met formulierparticipatie.
		</p>
		<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
			<rr-toggle-button type="checkbox" name="filter" value="mijn-zaken" text="Mijn zaken" icon="person"></rr-toggle-button>
			<rr-toggle-button type="checkbox" name="filter" value="inbox" text="Inbox" icon="inbox" selected></rr-toggle-button>
			<rr-toggle-button type="checkbox" name="filter" value="agenda" text="Agenda" icon="calendar-event" selected></rr-toggle-button>
			<rr-toggle-button type="checkbox" name="filter" value="documenten" text="Documenten" icon="file-text"></rr-toggle-button>
		</div>
	</div>
`;
TypeCheckbox.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: '`type="checkbox"` — meerdere knoppen kunnen tegelijk geselecteerd zijn.',
		},
	},
};


/* ============================================================
   Type: radio
   ============================================================ */

export const TypeRadio = () => html`
	<div style="display: flex; flex-direction: column; gap: 0.75rem;">
		<p style="font: var(--primitives-font-body-md-regular-snug); margin: 0;">
			<code>type="radio"</code> voor single-select keuzes. Gebruik <code>rr-toggle-button-group</code> voor beheer via JavaScript.
		</p>
		<div style="display: flex; gap: 0.5rem;" role="radiogroup" aria-label="Sortering">
			<rr-toggle-button type="radio" name="sortering" value="oplopend" text="Oplopend" icon="sort-ascending"></rr-toggle-button>
			<rr-toggle-button type="radio" name="sortering" value="aflopend" text="Aflopend" icon="sort-descending" selected></rr-toggle-button>
			<rr-toggle-button type="radio" name="sortering" value="relevant" text="Relevant" icon="arrows-sort"></rr-toggle-button>
		</div>
	</div>
`;
TypeRadio.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: '`type="radio"` — native browser-gedrag zorgt voor wederzijdse uitsluiting binnen dezelfde `name`-groep.',
		},
	},
};
