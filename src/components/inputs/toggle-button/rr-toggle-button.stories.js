import { html } from 'lit';
import './rr-toggle-button.js';
import '../../content/icon/rr-icon.ts';

/**
 * De Toggle Button component is een selecteerbare knop die tussen aan/uit kan schakelen.
 * Beschikbaar als `button` (met `aria-pressed`), `checkbox` of `radio` als onderliggend element,
 * zodat de semantiek aansluit bij het gebruik.
 *
 * ## Gebruik
 * ```html
 * <rr-toggle-button>Label</rr-toggle-button>
 * <rr-toggle-button type="checkbox" selected>Geselecteerd</rr-toggle-button>
 * ```
 */
export default {
	title: 'Components/Inputs/Toggle Button',
	component: 'rr-toggle-button',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/toggle-button/rr-toggle-button.ts',
			repository: 'https://github.com/regelrecht/design-system',
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
		label: {
			control: 'text',
			description: 'Tekst van de knop',
		},
	},
	args: {
		type: 'button',
		size: 'md',
		selected: false,
		disabled: false,
		label: 'Toggle',
	},
};

const Template = (args) => html`
	<rr-toggle-button
		type=${args.type}
		size=${args.size}
		?selected=${args.selected}
		?disabled=${args.disabled}
	>${args.label}</rr-toggle-button>
`;

export const Standaard = Template.bind({});
Standaard.args = {
	label: 'Toggle button',
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
				<rr-toggle-button type="button">
					<rr-icon slot="icon" name="eye"></rr-icon>
					Voorbeeld
				</rr-toggle-button>
				<rr-toggle-button type="button" selected>
					<rr-icon slot="icon" name="pencil"></rr-icon>
					Bewerken
				</rr-toggle-button>
			</div>
		</div>
		<div>
			<p style="font: var(--primitives-font-body-sm-regular-snug); color: var(--semantics-content-secondary-color); margin: 0 0 0.5rem;">
				type="checkbox" — native checkbox input, meerdere tegelijk selecteerbaar
			</p>
			<div style="display: flex; gap: 0.5rem;">
				<rr-toggle-button type="checkbox" name="filter" value="mijn-zaken">
					<rr-icon slot="icon" name="person"></rr-icon>
					Mijn zaken
				</rr-toggle-button>
				<rr-toggle-button type="checkbox" name="filter" value="inbox" selected>
					<rr-icon slot="icon" name="inbox"></rr-icon>
					Inbox
				</rr-toggle-button>
				<rr-toggle-button type="checkbox" name="filter" value="agenda">
					<rr-icon slot="icon" name="calendar-event"></rr-icon>
					Agenda
				</rr-toggle-button>
			</div>
		</div>
		<div>
			<p style="font: var(--primitives-font-body-sm-regular-snug); color: var(--semantics-content-secondary-color); margin: 0 0 0.5rem;">
				type="radio" — native radio input, wederzijdse uitsluiting via name-groep
			</p>
			<div style="display: flex; gap: 0.5rem;" role="radiogroup" aria-label="Sortering">
				<rr-toggle-button type="radio" name="sortering" value="oplopend">
					<rr-icon slot="icon" name="sort-ascending"></rr-icon>
					Oplopend
				</rr-toggle-button>
				<rr-toggle-button type="radio" name="sortering" value="aflopend" selected>
					<rr-icon slot="icon" name="sort-descending"></rr-icon>
					Aflopend
				</rr-toggle-button>
				<rr-toggle-button type="radio" name="sortering" value="relevant">
					<rr-icon slot="icon" name="arrows-sort"></rr-icon>
					Relevant
				</rr-toggle-button>
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
		<rr-toggle-button>
			<rr-icon slot="icon" name="heart"></rr-icon>
			Bewaren
		</rr-toggle-button>
		<rr-toggle-button selected>
			<rr-icon slot="icon" name="heart-filled"></rr-icon>
			Bewaard
		</rr-toggle-button>
		<rr-toggle-button disabled>
			<rr-icon slot="icon" name="heart"></rr-icon>
			Bewaren
		</rr-toggle-button>
		<rr-toggle-button selected disabled>
			<rr-icon slot="icon" name="heart-filled"></rr-icon>
			Bewaard
		</rr-toggle-button>
	</div>
`;
AlleToestanden.parameters = { controls: { disable: true } };


/* ============================================================
   Grootten
   ============================================================ */

export const AlleGrootten = () => html`
	<div style="display: flex; gap: 1rem; align-items: center;">
		<rr-toggle-button size="xs">
			<rr-icon slot="icon" name="magnifier"></rr-icon>
			Zoeken
		</rr-toggle-button>
		<rr-toggle-button size="sm">
			<rr-icon slot="icon" name="magnifier"></rr-icon>
			Zoeken
		</rr-toggle-button>
		<rr-toggle-button size="md">
			<rr-icon slot="icon" name="magnifier"></rr-icon>
			Zoeken
		</rr-toggle-button>
	</div>
`;
AlleGrootten.parameters = { controls: { disable: true } };


/* ============================================================
   Met icoon
   ============================================================ */

export const MetIcoon = () => html`
	<div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
		<rr-toggle-button>
			<rr-icon slot="icon" name="heart"></rr-icon>
			Bewaren
		</rr-toggle-button>
		<rr-toggle-button selected>
			<rr-icon slot="icon" name="heart-filled"></rr-icon>
			Bewaard
		</rr-toggle-button>
		<rr-toggle-button>
			<rr-icon slot="icon" name="square-and-arrow-up"></rr-icon>
			Delen
		</rr-toggle-button>
		<rr-toggle-button>
			<rr-icon slot="icon" name="eye"></rr-icon>
			Tonen
		</rr-toggle-button>
		<rr-toggle-button selected>
			<rr-icon slot="icon" name="eye-slash"></rr-icon>
			Verborgen
		</rr-toggle-button>
	</div>
`;
MetIcoon.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Gebruik de `icon` slot voor een icoon vóór de tekst.',
		},
	},
};

export const AlleenIcoon = () => html`
	<div style="display: flex; gap: 0.5rem; align-items: center;">
		<rr-toggle-button size="md" accessible-label="Vet">
			<rr-icon slot="icon" name="bold"></rr-icon>
		</rr-toggle-button>
		<rr-toggle-button size="md" selected accessible-label="Cursief">
			<rr-icon slot="icon" name="italic"></rr-icon>
		</rr-toggle-button>
		<rr-toggle-button size="md" accessible-label="Onderstreept">
			<rr-icon slot="icon" name="underlined"></rr-icon>
		</rr-toggle-button>
		<rr-toggle-button size="md" accessible-label="Opsomming">
			<rr-icon slot="icon" name="bullet-list"></rr-icon>
		</rr-toggle-button>
		<rr-toggle-button size="md" accessible-label="Genummerde lijst">
			<rr-icon slot="icon" name="numbered-list"></rr-icon>
		</rr-toggle-button>
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
			<rr-toggle-button type="button" accessible-label="Opsomming">
				<rr-icon slot="icon" name="bullet-list"></rr-icon>
			</rr-toggle-button>
			<rr-toggle-button type="button" selected accessible-label="Genummerde lijst">
				<rr-icon slot="icon" name="numbered-list"></rr-icon>
			</rr-toggle-button>
			<rr-toggle-button type="button">
				<rr-icon slot="icon" name="eye"></rr-icon>
				Voorbeeld
			</rr-toggle-button>
			<rr-toggle-button type="button" selected>
				<rr-icon slot="icon" name="pencil"></rr-icon>
				Bewerken
			</rr-toggle-button>
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
			<rr-toggle-button type="checkbox" name="filter" value="mijn-zaken">
				<rr-icon slot="icon" name="person"></rr-icon>
				Mijn zaken
			</rr-toggle-button>
			<rr-toggle-button type="checkbox" name="filter" value="inbox" selected>
				<rr-icon slot="icon" name="inbox"></rr-icon>
				Inbox
			</rr-toggle-button>
			<rr-toggle-button type="checkbox" name="filter" value="agenda" selected>
				<rr-icon slot="icon" name="calendar-event"></rr-icon>
				Agenda
			</rr-toggle-button>
			<rr-toggle-button type="checkbox" name="filter" value="documenten">
				<rr-icon slot="icon" name="file-text"></rr-icon>
				Documenten
			</rr-toggle-button>
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
			<rr-toggle-button type="radio" name="sortering" value="oplopend">
				<rr-icon slot="icon" name="sort-ascending"></rr-icon>
				Oplopend
			</rr-toggle-button>
			<rr-toggle-button type="radio" name="sortering" value="aflopend" selected>
				<rr-icon slot="icon" name="sort-descending"></rr-icon>
				Aflopend
			</rr-toggle-button>
			<rr-toggle-button type="radio" name="sortering" value="relevant">
				<rr-icon slot="icon" name="arrows-sort"></rr-icon>
				Relevant
			</rr-toggle-button>
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
