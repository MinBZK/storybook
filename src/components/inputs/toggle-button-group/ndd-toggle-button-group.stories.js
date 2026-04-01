import { html } from 'lit';
import './ndd-toggle-button-group.js';
import '../toggle-button/ndd-toggle-button.js';

/**
 * De Toggle Button Group component groepeert `ndd-toggle-button` elementen en beheert
 * selectie, toetsenbordnavigatie en de synchronisatie van `type`, `name` en `size`.
 *
 * ## Gebruik
 * ```html
 * <ndd-toggle-button-group type="radio" name="weergave">
 *   <ndd-toggle-button value="lijst" text="Lijst"></ndd-toggle-button>
 *   <ndd-toggle-button value="kaart" text="Kaart" selected></ndd-toggle-button>
 * </ndd-toggle-button-group>
 * ```
 */
export default {
	title: 'Components/Inputs/Toggle Button Group',
	component: 'ndd-toggle-button-group',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/toggle-button-group/ndd-toggle-button-group.ts',
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
	<ndd-toggle-button-group
		type=${args.type}
		name=${args.name}
		size=${args.size}
		?disabled=${args.disabled}
	>
		<ndd-toggle-button value="mijn-zaken" text="Mijn zaken" icon="person"></ndd-toggle-button>
		<ndd-toggle-button value="inbox" text="Inbox" icon="inbox" selected></ndd-toggle-button>
		<ndd-toggle-button value="agenda" text="Agenda" icon="calendar-event"></ndd-toggle-button>
	</ndd-toggle-button-group>
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
		<ndd-toggle-button-group type="button" aria-label="Tekst opmaken">
			<ndd-toggle-button value="bold" accessible-label="Vet" icon="bold"></ndd-toggle-button>
			<ndd-toggle-button value="italic" accessible-label="Cursief" icon="italic" selected></ndd-toggle-button>
			<ndd-toggle-button value="underlined" accessible-label="Onderstreept" icon="underlined"></ndd-toggle-button>
			<ndd-toggle-button value="bullet-list" accessible-label="Opsomming" icon="bullet-list"></ndd-toggle-button>
			<ndd-toggle-button value="numbered-list" accessible-label="Genummerde lijst" icon="numbered-list"></ndd-toggle-button>
		</ndd-toggle-button-group>
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
		<ndd-toggle-button-group type="checkbox" name="filter" aria-label="Filters">
			<ndd-toggle-button value="mijn-zaken" text="Mijn zaken" icon="person" selected></ndd-toggle-button>
			<ndd-toggle-button value="inbox" text="Inbox" icon="inbox"></ndd-toggle-button>
			<ndd-toggle-button value="agenda" text="Agenda" icon="calendar-event" selected></ndd-toggle-button>
			<ndd-toggle-button value="documenten" text="Documenten" icon="file-text"></ndd-toggle-button>
		</ndd-toggle-button-group>
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
		<ndd-toggle-button-group type="radio" name="sortering" aria-label="Sortering">
			<ndd-toggle-button value="oplopend" text="Oplopend" icon="sort-ascending"></ndd-toggle-button>
			<ndd-toggle-button value="aflopend" text="Aflopend" icon="sort-descending" selected></ndd-toggle-button>
			<ndd-toggle-button value="relevant" text="Relevant" icon="arrows-sort"></ndd-toggle-button>
		</ndd-toggle-button-group>
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
		<ndd-toggle-button-group type="radio" name="sortering-xs" size="xs" aria-label="Sortering (extra klein)">
			<ndd-toggle-button value="oplopend" text="Oplopend" icon="sort-ascending"></ndd-toggle-button>
			<ndd-toggle-button value="aflopend" text="Aflopend" icon="sort-descending" selected></ndd-toggle-button>
		</ndd-toggle-button-group>
		<ndd-toggle-button-group type="radio" name="sortering-sm" size="sm" aria-label="Sortering (klein)">
			<ndd-toggle-button value="oplopend" text="Oplopend" icon="sort-ascending"></ndd-toggle-button>
			<ndd-toggle-button value="aflopend" text="Aflopend" icon="sort-descending" selected></ndd-toggle-button>
		</ndd-toggle-button-group>
		<ndd-toggle-button-group type="radio" name="sortering-md" size="md" aria-label="Sortering (middel)">
			<ndd-toggle-button value="oplopend" text="Oplopend" icon="sort-ascending"></ndd-toggle-button>
			<ndd-toggle-button value="aflopend" text="Aflopend" icon="sort-descending" selected></ndd-toggle-button>
		</ndd-toggle-button-group>
	</div>
`;
Grootten.parameters = { controls: { disable: true } };


/* ============================================================
   Uitgeschakeld
   ============================================================ */

export const Uitgeschakeld = () => html`
	<div style="display: flex; flex-direction: column; gap: 1rem;">
		<ndd-toggle-button-group type="checkbox" name="filter-uit" disabled aria-label="Filters (uitgeschakeld)">
			<ndd-toggle-button value="mijn-zaken" text="Mijn zaken" icon="person"></ndd-toggle-button>
			<ndd-toggle-button value="inbox" text="Inbox" icon="inbox" selected></ndd-toggle-button>
			<ndd-toggle-button value="agenda" text="Agenda" icon="calendar-event"></ndd-toggle-button>
		</ndd-toggle-button-group>
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
	<ndd-toggle-button-group type="radio" name="weergave" aria-label="Weergave">
		<ndd-toggle-button value="lijst" accessible-label="Lijstweergave" icon="list" selected></ndd-toggle-button>
		<ndd-toggle-button value="compact" accessible-label="Compacte weergave" icon="list-decreasing-lines"></ndd-toggle-button>
		<ndd-toggle-button value="uitgebreid" accessible-label="Uitgebreide weergave" icon="stack"></ndd-toggle-button>
	</ndd-toggle-button-group>
`;
MetIconen.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Icoon-only knoppen in een groep. Elk `ndd-toggle-button` heeft een `accessible-label`.',
		},
	},
};
