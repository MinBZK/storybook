import { html, nothing } from 'lit';
import './table.js';
import '../cells/text-cell/text-cell.js';
import '../cells/cell/cell.js';
import '../../inputs/checkbox/checkbox.js';
import '../../actions/icon-button/icon-button.js';
import '../../actions/button/button.js';
import '../../status-and-feedback/inline-dialog/inline-dialog.js';

/**
 * De Table toont data in uitgelijnde kolommen. Het is altijd een box (afgeronde
 * hoeken, rand, base of tinted vulling); de inhoud wordt uitgelijnd via een CSS
 * grid + subgrid. Dividers lopen full-bleed tot de zijkanten; de inline-padding
 * zit op de rijen en springt alleen de cel-inhoud in.
 *
 * ## Kolombreedtes — één keer, zoals een HTML-tabel
 * Definieer de kolommen één keer op de table via het `columns`-attribuut: een
 * CSS grid track list, bv. `columns="minmax(200px,1fr) 120px 80px"`. Elke rij
 * gebruikt `grid-template-columns: subgrid` en lijnt zo uit op die kolommen.
 *
 * ## Rijen en cellen
 * Rijen zijn `<nldd-table-row>`-elementen; de inhoud zijn de bestaande
 * `nldd-cell`-componenten (één per kolom). Een generieke `nldd-cell` krijgt
 * automatisch `width="full"` zodat hij zijn kolom vult.
 *
 * ## Header
 * Zet één `<nldd-table-row slot="header">` in de `header`-slot. De cellen
 * worden kolomkoppen (`role="columnheader"`).
 *
 * ## Selectie & sortering
 * Bewust niet ingebouwd: voeg zelf een kolom met `nldd-cell` + `nldd-checkbox`
 * toe voor selectie, en stuur sortering aan met een externe control.
 */
export default {
	title: 'Components/Lists & Tables/Table',
	component: 'nldd-table',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/lists-and-tables/table/table.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: { type: 'beta' },
	},
	args: {
		background: 'base',
		columns: 'minmax(160px, 1fr) minmax(200px, 1fr) 120px',
		smColumns: '',
		mdColumns: '',
		lgColumns: '',
		accessibleLabel: 'Gebruikers',
		emptyText: '',
		emptySupportingText: '',
	},
	argTypes: {
		background: {
			control: 'select',
			options: ['base', 'tinted'],
			description: 'Oppervlak-vulling van de box.',
			table: { defaultValue: { summary: 'base' } },
		},
		columns: {
			control: 'text',
			description: 'CSS grid track list die de kolommen één keer definieert.',
			table: { defaultValue: { summary: '' } },
		},
		smColumns: {
			name: 'sm-columns',
			control: 'text',
			description: 'Track list als de tabel sm-breed is (≤640px); valt terug op columns.',
			table: { defaultValue: { summary: '' } },
		},
		mdColumns: {
			name: 'md-columns',
			control: 'text',
			description: 'Track list als de tabel md-breed is (641–1007px); valt terug op columns.',
			table: { defaultValue: { summary: '' } },
		},
		lgColumns: {
			name: 'lg-columns',
			control: 'text',
			description: 'Track list als de tabel lg-breed is (≥1008px); valt terug op columns.',
			table: { defaultValue: { summary: '' } },
		},
		accessibleLabel: {
			name: 'accessible-label',
			control: 'text',
			description: 'Toegankelijke naam voor de tabel.',
		},
		emptyText: {
			name: 'empty-text',
			control: 'text',
			description: 'Tekst van de standaard empty-state-dialog. Valt terug op i18n ("Geen items").',
			table: { defaultValue: { summary: '' } },
		},
		emptySupportingText: {
			name: 'empty-supporting-text',
			control: 'text',
			description: 'Ondersteunende tekst van de standaard empty-state-dialog.',
			table: { defaultValue: { summary: '' } },
		},
	},
};

const Template = ({ background, columns, smColumns, mdColumns, lgColumns, accessibleLabel, emptyText, emptySupportingText }: Record<string, any>) => html`
	<nldd-table
		background=${background}
		columns=${columns}
		sm-columns=${smColumns || nothing}
		md-columns=${mdColumns || nothing}
		lg-columns=${lgColumns || nothing}
		accessible-label=${accessibleLabel}
		empty-text=${emptyText || nothing}
		empty-supporting-text=${emptySupportingText || nothing}
	>
		<nldd-table-row slot="header">
			<nldd-text-cell text="**Naam**"></nldd-text-cell>
			<nldd-text-cell text="**E-mail**"></nldd-text-cell>
			<nldd-text-cell text="**Rol**"></nldd-text-cell>
		</nldd-table-row>
		<nldd-table-row>
			<nldd-text-cell text="Eva de Vries"></nldd-text-cell>
			<nldd-text-cell text="eva@example.nl"></nldd-text-cell>
			<nldd-text-cell text="Beheerder"></nldd-text-cell>
		</nldd-table-row>
		<nldd-table-row>
			<nldd-text-cell text="Daan Jansen"></nldd-text-cell>
			<nldd-text-cell text="daan@example.nl"></nldd-text-cell>
			<nldd-text-cell text="Redacteur"></nldd-text-cell>
		</nldd-table-row>
		<nldd-table-row>
			<nldd-text-cell text="Sanne Bakker"></nldd-text-cell>
			<nldd-text-cell text="sanne@example.nl"></nldd-text-cell>
			<nldd-text-cell text="Lezer"></nldd-text-cell>
		</nldd-table-row>
	</nldd-table>
`;

export const Default = {
	render: Template,
};

export const Tinted = {
	name: 'Tinted background',
	render: Template,
	args: { background: 'tinted' },
	parameters: {
		docs: {
			description: {
				story: 'De tabel is altijd een box. Standaard is de achtergrond `base`; zet `background="tinted"` voor een getinte vulling (bijvoorbeeld op een witte pagina).',
			},
		},
	},
};

export const WithoutHeader = {
	name: 'Without header',
	render: () => html`
	<nldd-table columns="minmax(160px, 1fr) 140px" accessible-label="Instellingen">
		<nldd-table-row>
			<nldd-text-cell text="Tweefactor-authenticatie"></nldd-text-cell>
			<nldd-text-cell text="Aan"></nldd-text-cell>
		</nldd-table-row>
		<nldd-table-row>
			<nldd-text-cell text="E-mailnotificaties"></nldd-text-cell>
			<nldd-text-cell text="Uit"></nldd-text-cell>
		</nldd-table-row>
		<nldd-table-row>
			<nldd-text-cell text="Taal"></nldd-text-cell>
			<nldd-text-cell text="Nederlands"></nldd-text-cell>
		</nldd-table-row>
	</nldd-table>
`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'De header-slot is optioneel: zonder header zijn er alleen body-rijen (cellen krijgen `role="cell"`). Handig voor key-value-tabellen.',
			},
		},
	},
};

export const Alignment = {
	name: 'Column alignment',
	render: () => html`
	<nldd-table columns="minmax(160px, 1fr) 120px 100px" accessible-label="Bestellingen">
		<nldd-table-row slot="header">
			<nldd-text-cell text="**Product**"></nldd-text-cell>
			<nldd-text-cell text="**Status**"></nldd-text-cell>
			<nldd-text-cell text="**Bedrag**" horizontal-alignment="right"></nldd-text-cell>
		</nldd-table-row>
		<nldd-table-row>
			<nldd-text-cell text="Paspoort"></nldd-text-cell>
			<nldd-text-cell text="Betaald"></nldd-text-cell>
			<nldd-text-cell text="€ 75,80" horizontal-alignment="right"></nldd-text-cell>
		</nldd-table-row>
		<nldd-table-row>
			<nldd-text-cell text="Rijbewijs"></nldd-text-cell>
			<nldd-text-cell text="Open"></nldd-text-cell>
			<nldd-text-cell text="€ 41,60" horizontal-alignment="right"></nldd-text-cell>
		</nldd-table-row>
	</nldd-table>
`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Cel-uitlijning werkt per cel via `horizontal-alignment` (bv. bedragen rechts uitgelijnd). De kolombreedtes blijven gedeeld via subgrid.',
			},
		},
	},
};

export const WithSelectionColumn = {
	name: 'Selection column (checkbox)',
	render: () => html`
	<nldd-table columns="40px minmax(160px, 1fr) 120px" accessible-label="Gebruikers met selectie">
		<nldd-table-row slot="header">
			<nldd-cell horizontal-alignment="center"><nldd-checkbox accessible-label="Selecteer alles"></nldd-checkbox></nldd-cell>
			<nldd-text-cell text="**Naam**"></nldd-text-cell>
			<nldd-text-cell text="**Rol**"></nldd-text-cell>
		</nldd-table-row>
		<nldd-table-row selected>
			<nldd-cell horizontal-alignment="center"><nldd-checkbox checked accessible-label="Selecteer Eva de Vries"></nldd-checkbox></nldd-cell>
			<nldd-text-cell text="Eva de Vries"></nldd-text-cell>
			<nldd-text-cell text="Beheerder"></nldd-text-cell>
		</nldd-table-row>
		<nldd-table-row>
			<nldd-cell horizontal-alignment="center"><nldd-checkbox accessible-label="Selecteer Daan Jansen"></nldd-checkbox></nldd-cell>
			<nldd-text-cell text="Daan Jansen"></nldd-text-cell>
			<nldd-text-cell text="Redacteur"></nldd-text-cell>
		</nldd-table-row>
	</nldd-table>
`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Rij-selectie is consumer-driven: voeg een kolom toe met een `nldd-cell` + `nldd-checkbox`. Markeer de geselecteerde rij met het `selected`-attribuut (zelfde behandeling als `nldd-list-item[selected]`).',
			},
		},
	},
};

export const SelectedRow = {
	name: 'Selected row',
	render: () => html`
	<nldd-table columns="minmax(160px, 1fr) 120px" accessible-label="Gebruikers met selectie">
		<nldd-table-row slot="header">
			<nldd-text-cell text="**Naam**"></nldd-text-cell>
			<nldd-text-cell text="**Rol**"></nldd-text-cell>
		</nldd-table-row>
		<nldd-table-row>
			<nldd-text-cell text="Eva de Vries"></nldd-text-cell>
			<nldd-text-cell text="Beheerder"></nldd-text-cell>
		</nldd-table-row>
		<nldd-table-row selected>
			<nldd-text-cell text="Daan Jansen"></nldd-text-cell>
			<nldd-text-cell text="Redacteur"></nldd-text-cell>
		</nldd-table-row>
		<nldd-table-row>
			<nldd-text-cell text="Sanne Bakker"></nldd-text-cell>
			<nldd-text-cell text="Lezer"></nldd-text-cell>
		</nldd-table-row>
	</nldd-table>
`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Markeer een rij met het `selected`-attribuut. De tint loopt full-bleed door tot de tabelranden (hoeken volgen de box) — zelfde behandeling als `nldd-list-item[selected]`.',
			},
		},
	},
};

export const WithActionsColumn = {
	name: 'Actions column',
	render: () => html`
	<nldd-table columns="minmax(160px, 1fr) minmax(200px, 1fr) 56px" accessible-label="Documenten">
		<nldd-table-row slot="header">
			<nldd-text-cell text="**Titel**"></nldd-text-cell>
			<nldd-text-cell text="**Eigenaar**"></nldd-text-cell>
			<nldd-cell></nldd-cell>
		</nldd-table-row>
		<nldd-table-row>
			<nldd-text-cell text="Jaarverslag 2025"></nldd-text-cell>
			<nldd-text-cell text="Eva de Vries"></nldd-text-cell>
			<nldd-cell horizontal-alignment="center"><nldd-icon-button size="sm" icon="download" text="Download"></nldd-icon-button></nldd-cell>
		</nldd-table-row>
		<nldd-table-row>
			<nldd-text-cell text="Begroting Q1"></nldd-text-cell>
			<nldd-text-cell text="Daan Jansen"></nldd-text-cell>
			<nldd-cell horizontal-alignment="center"><nldd-icon-button size="sm" icon="download" text="Download"></nldd-icon-button></nldd-cell>
		</nldd-table-row>
	</nldd-table>
`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Hergebruik bestaande componenten in cellen, bv. een `nldd-icon-button` in een smalle actiekolom.',
			},
		},
	},
};

export const HorizontalScroll = {
	name: 'Responsive: horizontal scroll',
	render: () => {
		const rows = () => html`
			<nldd-table-row slot="header">
				<nldd-text-cell text="**Naam**"></nldd-text-cell>
				<nldd-text-cell text="**E-mail**"></nldd-text-cell>
				<nldd-text-cell text="**Rol**"></nldd-text-cell>
				<nldd-text-cell text="**Afdeling**"></nldd-text-cell>
				<nldd-text-cell text="**Status**"></nldd-text-cell>
			</nldd-table-row>
			<nldd-table-row>
				<nldd-text-cell text="Eva de Vries"></nldd-text-cell>
				<nldd-text-cell text="eva@example.nl"></nldd-text-cell>
				<nldd-text-cell text="Beheerder"></nldd-text-cell>
				<nldd-text-cell text="Beleid"></nldd-text-cell>
				<nldd-text-cell text="Actief"></nldd-text-cell>
			</nldd-table-row>
			<nldd-table-row selected>
				<nldd-text-cell text="Daan Jansen"></nldd-text-cell>
				<nldd-text-cell text="daan@example.nl"></nldd-text-cell>
				<nldd-text-cell text="Redacteur"></nldd-text-cell>
				<nldd-text-cell text="Communicatie"></nldd-text-cell>
				<nldd-text-cell text="Actief"></nldd-text-cell>
			</nldd-table-row>`;
		return html`
			<div style="max-width: 460px;">
				<nldd-table columns="180px 220px 140px 160px 120px" accessible-label="Brede tabel die horizontaal scrollt">
					${rows()}
				</nldd-table>
			</div>
		`;
	},
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Laag 1 — horizontaal scrollen: de tabel is zelf een horizontale scroll-container. Geef kolommen een vaste/min-breedte; past de tabel niet, dan scrollt hij en wordt hij focusbaar (toetsenbord kan pannen). Wil je niet scrollen? Verberg kolommen met `hide-below`.',
			},
		},
	},
};

export const ResponsiveColumns = {
	name: 'Responsive: drop columns at breakpoints',
	render: () => {
		const header = () => html`
			<nldd-table-row slot="header">
				<nldd-text-cell text="**Naam**"></nldd-text-cell>
				<nldd-text-cell text="**E-mail**" hide-below="lg"></nldd-text-cell>
				<nldd-text-cell text="**Rol**" hide-below="md"></nldd-text-cell>
				<nldd-text-cell text="**Status**"></nldd-text-cell>
			</nldd-table-row>`;
		const body = () => html`
			<nldd-table-row>
				<nldd-text-cell text="Eva de Vries"></nldd-text-cell>
				<nldd-text-cell text="eva@example.nl" hide-below="lg"></nldd-text-cell>
				<nldd-text-cell text="Beheerder" hide-below="md"></nldd-text-cell>
				<nldd-text-cell text="Actief"></nldd-text-cell>
			</nldd-table-row>
			<nldd-table-row>
				<nldd-text-cell text="Daan Jansen"></nldd-text-cell>
				<nldd-text-cell text="daan@example.nl" hide-below="lg"></nldd-text-cell>
				<nldd-text-cell text="Redacteur" hide-below="md"></nldd-text-cell>
				<nldd-text-cell text="Actief"></nldd-text-cell>
			</nldd-table-row>`;
		const table = (width: string, label: string) => html`
			<div>
				<p style="margin: 0 0 4px; font: var(--primitives-font-body-sm-regular-flat); color: var(--semantics-content-secondary-color);">${label}</p>
				<div style="width: ${width};">
					<nldd-table
						columns="minmax(160px,1fr) 1fr 140px 120px"
						md-columns="minmax(160px,1fr) 140px 120px"
						sm-columns="minmax(160px,1fr) 120px"
						accessible-label=${'Gebruikers ' + label}
					>${header()}${body()}</nldd-table>
				</div>
			</div>`;
		return html`
			<div style="display: flex; flex-direction: column; gap: 24px;">
				${table('1100px', 'lg (≥1008px): alle kolommen')}
				${table('800px', 'md (641–1007px): E-mail weg')}
				${table('320px', 'sm (≤640px): E-mail + Rol weg')}
			</div>
		`;
	},
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Laag 2 — kolommen droppen: geef `sm-columns`/`md-columns`/`lg-columns` (kortere track-lijsten) en verberg de gedropte cellen met `hide-below` op dezelfde breakpoints. De tabel kiest zijn track-lijst o.b.v. de eigen breedte (standaard sm/md/lg). Hier op vaste breedtes getoond; in de praktijk reageert het op de container.',
			},
		},
	},
};

// — Empty state ——————————————————————————————————————————————————————————————

const emptyHeader = () => html`
	<nldd-table-row slot="header">
		<nldd-text-cell text="**Naam**"></nldd-text-cell>
		<nldd-text-cell text="**E-mail**"></nldd-text-cell>
		<nldd-text-cell text="**Rol**"></nldd-text-cell>
	</nldd-table-row>`;

export const EmptyDefault = {
	name: 'Empty: default dialog',
	render: () => html`
		<nldd-table columns="minmax(160px, 1fr) minmax(200px, 1fr) 120px" accessible-label="Gebruikers">
			${emptyHeader()}
		</nldd-table>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Heeft de tabel geen zichtbare body-rijen, dan toont hij een standaard `nldd-inline-dialog` met i18n-tekst ("Geen items"). De header wordt in de lege staat verborgen, zodat alleen de melding zichtbaar is. Geen configuratie nodig.',
			},
		},
	},
};

export const EmptyWithAttributes = {
	name: 'Empty: aangepaste tekst',
	render: () => html`
		<nldd-table
			columns="minmax(160px, 1fr) minmax(200px, 1fr) 120px"
			accessible-label="Gebruikers"
			empty-text="Niets gevonden"
			empty-supporting-text="Pas de filters aan of probeer een andere zoekterm."
		>
			${emptyHeader()}
		</nldd-table>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Gebruik `empty-text` en `empty-supporting-text` om de standaard dialog aan te passen zonder markup te schrijven. Voor rijkere inhoud (icoon, action buttons, alert-variant) slot een complete `nldd-inline-dialog`.',
			},
		},
	},
};

export const EmptySlotOverride = {
	name: 'Empty: slot override',
	render: () => html`
		<nldd-table columns="minmax(160px, 1fr) minmax(200px, 1fr) 120px" accessible-label="Gebruikers">
			${emptyHeader()}
			<nldd-inline-dialog
				slot="empty"
				icon="search"
				text="Geen resultaten"
				supporting-text="Pas de filters aan of probeer een andere zoekterm."
			>
				<nldd-button slot="actions" variant="neutral-tinted" text="Filters wissen"></nldd-button>
			</nldd-inline-dialog>
		</nldd-table>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Inhoud in `[slot=empty]` vervangt de standaard dialog volledig — gebruik je eigen icoon, kop, ondersteunende tekst of action buttons.',
			},
		},
	},
};
