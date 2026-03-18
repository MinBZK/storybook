import { html } from 'lit';
import './rr-toggle-button-group.js';
import '../toggle-button/rr-toggle-button.js';
import '../../content/icon/rr-icon.ts';

/**
 * De Toggle Button Group component groepeert `rr-toggle-button` elementen en beheert
 * selectie, toetsenbordnavigatie en de synchronisatie van `type`, `name` en `size`.
 *
 * ## Gebruik
 * ```html
 * <rr-toggle-button-group type="radio" name="weergave">
 *   <rr-toggle-button value="lijst">Lijst</rr-toggle-button>
 *   <rr-toggle-button value="kaart" selected>Kaart</rr-toggle-button>
 * </rr-toggle-button-group>
 * ```
 */
export default {
	title: 'Components/Inputs/Toggle Button Group',
	component: 'rr-toggle-button-group',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/toggle-button-group/rr-toggle-button-group.ts',
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
			description: 'Selectiemodus',
			table: {
				defaultValue: { summary: 'checkbox' },
			},
		},
		name: {
			control: 'text',
			description: 'Naam voor formulierverwerking, doorgestuurd naar alle knoppen',
		},
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md'],
			description: 'Grootte, doorgestuurd naar alle knoppen',
			table: {
				defaultValue: { summary: 'md' },
			},
		},
		disabled: {
			control: 'boolean',
			description: 'Schakelt alle knoppen uit',
			table: {
				defaultValue: { summary: false },
			},
		},
	},
	args: {
		type: 'checkbox',
		name: 'groep',
		size: 'md',
		disabled: false,
	},
};

const Template = (args) => html`
	<rr-toggle-button-group
		type=${args.type}
		name=${args.name}
		size=${args.size}
		?disabled=${args.disabled}
	>
		<rr-toggle-button value="mijn-zaken">
			<rr-icon slot="icon" name="person"></rr-icon>
			Mijn zaken
		</rr-toggle-button>
		<rr-toggle-button value="inbox" selected>
			<rr-icon slot="icon" name="inbox"></rr-icon>
			Inbox
		</rr-toggle-button>
		<rr-toggle-button value="agenda">
			<rr-icon slot="icon" name="calendar-event"></rr-icon>
			Agenda
		</rr-toggle-button>
	</rr-toggle-button-group>
`;

export const Standaard = Template.bind({});
Standaard.args = {};


/* ============================================================
   Selectiemodi
   ============================================================ */

export const TypeButton = () => html`
	<div style="display: flex; flex-direction: column; gap: 0.5rem;">
		<p style="font: var(--primitives-font-body-md-regular-snug); margin: 0;">
			Met <code>type="button"</code> beheert elke knop zijn eigen <code>aria-pressed</code> toestand onafhankelijk. Ideaal voor teksteditor-toolbars.
		</p>
		<rr-toggle-button-group type="button" aria-label="Tekst opmaken">
			<rr-toggle-button value="bold" accessible-label="Vet">
				<rr-icon slot="icon" name="bold"></rr-icon>
			</rr-toggle-button>
			<rr-toggle-button value="italic" accessible-label="Cursief" selected>
				<rr-icon slot="icon" name="italic"></rr-icon>
			</rr-toggle-button>
			<rr-toggle-button value="underlined" accessible-label="Onderstreept">
				<rr-icon slot="icon" name="underlined"></rr-icon>
			</rr-toggle-button>
			<rr-toggle-button value="bullet-list" accessible-label="Opsomming">
				<rr-icon slot="icon" name="bullet-list"></rr-icon>
			</rr-toggle-button>
			<rr-toggle-button value="numbered-list" accessible-label="Genummerde lijst">
				<rr-icon slot="icon" name="numbered-list"></rr-icon>
			</rr-toggle-button>
		</rr-toggle-button-group>
	</div>
`;
TypeButton.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: '`type="button"` — knoppen zijn onafhankelijk van elkaar en kunnen tegelijk actief zijn. De groep biedt layout en synchronisatie van `size` en `disabled`.',
		},
	},
};

export const MultiSelect = () => html`
	<div style="display: flex; flex-direction: column; gap: 0.5rem;">
		<p style="font: var(--primitives-font-body-md-regular-snug); margin: 0;">
			Met <code>type="checkbox"</code> kunnen meerdere opties tegelijk geselecteerd zijn.
		</p>
		<rr-toggle-button-group type="checkbox" name="filter" aria-label="Filters">
			<rr-toggle-button value="mijn-zaken" selected>
				<rr-icon slot="icon" name="person"></rr-icon>
				Mijn zaken
			</rr-toggle-button>
			<rr-toggle-button value="inbox">
				<rr-icon slot="icon" name="inbox"></rr-icon>
				Inbox
			</rr-toggle-button>
			<rr-toggle-button value="agenda" selected>
				<rr-icon slot="icon" name="calendar-event"></rr-icon>
				Agenda
			</rr-toggle-button>
			<rr-toggle-button value="documenten">
				<rr-icon slot="icon" name="file-text"></rr-icon>
				Documenten
			</rr-toggle-button>
		</rr-toggle-button-group>
	</div>
`;
MultiSelect.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Multi-select met `type="checkbox"`. Meerdere opties kunnen tegelijk actief zijn.',
		},
	},
};

export const SingleSelect = () => html`
	<div style="display: flex; flex-direction: column; gap: 0.5rem;">
		<p style="font: var(--primitives-font-body-md-regular-snug); margin: 0;">
			Met <code>type="radio"</code> kan slechts één optie tegelijk geselecteerd zijn.
			Navigeer met de pijltoetsen.
		</p>
		<rr-toggle-button-group type="radio" name="sortering" aria-label="Sortering">
			<rr-toggle-button value="oplopend">
				<rr-icon slot="icon" name="sort-ascending"></rr-icon>
				Oplopend
			</rr-toggle-button>
			<rr-toggle-button value="aflopend" selected>
				<rr-icon slot="icon" name="sort-descending"></rr-icon>
				Aflopend
			</rr-toggle-button>
			<rr-toggle-button value="relevant">
				<rr-icon slot="icon" name="arrows-sort"></rr-icon>
				Relevant
			</rr-toggle-button>
		</rr-toggle-button-group>
	</div>
`;
SingleSelect.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Single-select met `type="radio"`. Pijltoetsen navigeren tussen opties en selecteren tegelijk.',
		},
	},
};


/* ============================================================
   Grootten
   ============================================================ */

export const Grootten = () => html`
	<div style="display: flex; flex-direction: column; gap: 1rem;">
		<rr-toggle-button-group type="radio" name="sortering-xs" size="xs" aria-label="Sortering (extra klein)">
			<rr-toggle-button value="oplopend">
				<rr-icon slot="icon" name="sort-ascending"></rr-icon>
				Oplopend
			</rr-toggle-button>
			<rr-toggle-button value="aflopend" selected>
				<rr-icon slot="icon" name="sort-descending"></rr-icon>
				Aflopend
			</rr-toggle-button>
		</rr-toggle-button-group>
		<rr-toggle-button-group type="radio" name="sortering-sm" size="sm" aria-label="Sortering (klein)">
			<rr-toggle-button value="oplopend">
				<rr-icon slot="icon" name="sort-ascending"></rr-icon>
				Oplopend
			</rr-toggle-button>
			<rr-toggle-button value="aflopend" selected>
				<rr-icon slot="icon" name="sort-descending"></rr-icon>
				Aflopend
			</rr-toggle-button>
		</rr-toggle-button-group>
		<rr-toggle-button-group type="radio" name="sortering-md" size="md" aria-label="Sortering (middel)">
			<rr-toggle-button value="oplopend">
				<rr-icon slot="icon" name="sort-ascending"></rr-icon>
				Oplopend
			</rr-toggle-button>
			<rr-toggle-button value="aflopend" selected>
				<rr-icon slot="icon" name="sort-descending"></rr-icon>
				Aflopend
			</rr-toggle-button>
		</rr-toggle-button-group>
	</div>
`;
Grootten.parameters = { controls: { disable: true } };


/* ============================================================
   Uitgeschakeld
   ============================================================ */

export const Uitgeschakeld = () => html`
	<div style="display: flex; flex-direction: column; gap: 1rem;">
		<rr-toggle-button-group type="checkbox" name="filter-uit" disabled aria-label="Filters (uitgeschakeld)">
			<rr-toggle-button value="mijn-zaken">
				<rr-icon slot="icon" name="person"></rr-icon>
				Mijn zaken
			</rr-toggle-button>
			<rr-toggle-button value="inbox" selected>
				<rr-icon slot="icon" name="inbox"></rr-icon>
				Inbox
			</rr-toggle-button>
			<rr-toggle-button value="agenda">
				<rr-icon slot="icon" name="calendar-event"></rr-icon>
				Agenda
			</rr-toggle-button>
		</rr-toggle-button-group>
	</div>
`;
Uitgeschakeld.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Het `disabled` attribuut op de groep schakelt alle knoppen tegelijk uit. Knoppen die al individueel uitgeschakeld waren, worden niet opnieuw ingeschakeld wanneer de groep weer actief wordt.',
		},
	},
};


/* ============================================================
   Met iconen (icon-only)
   ============================================================ */

export const MetIconen = () => html`
	<rr-toggle-button-group type="radio" name="weergave" aria-label="Weergave">
		<rr-toggle-button value="lijst" accessible-label="Lijstweergave" selected>
			<rr-icon slot="icon" name="list"></rr-icon>
		</rr-toggle-button>
		<rr-toggle-button value="compact" accessible-label="Compacte weergave">
			<rr-icon slot="icon" name="list-decreasing-lines"></rr-icon>
		</rr-toggle-button>
		<rr-toggle-button value="uitgebreid" accessible-label="Uitgebreide weergave">
			<rr-icon slot="icon" name="stack"></rr-icon>
		</rr-toggle-button>
	</rr-toggle-button-group>
`;
MetIconen.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Icoon-only knoppen in een groep. Elk `rr-toggle-button` heeft een `accessible-label`.',
		},
	},
};
