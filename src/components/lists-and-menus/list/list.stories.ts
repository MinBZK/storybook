import { html, nothing, render } from 'lit';
import './list.js';
import '../list-item/list-item.js';
import '../cells/title-cell/title-cell.js';
import '../cells/text-cell/text-cell.js';
import '../cells/spacer-cell/spacer-cell.js';
import '../cells/icon-cell/icon-cell.js';
import '../cells/drag-handle-cell/drag-handle-cell.js';
import '../../content/icon/icon.js';
import '../../content/title/title.js';
import '../../content/rich-text/rich-text.js';
import '../../status-and-feedback/inline-dialog/inline-dialog.js';
import '../../actions/button/button.js';
import '../../layout/spacer/spacer.js';
import '../../layout/box/box.js';

export default {
	title: 'Components/Lists & Menus/List',
	component: 'nldd-list',
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['simple', 'box'],
			description: 'Visuele stijl: `simple` = platte strip, `box` = framed card met afgeronde hoeken en highlight ring',
			table: { defaultValue: { summary: 'simple' } },
		},
		background: {
			control: 'select',
			options: ['(default)', 'transparent', 'base', 'tinted'],
			mapping: { '(default)': undefined },
			description: 'Surface fill. Default volgt `variant` (simple → transparent, box → tinted). Zet `base` om de box op een al getinte achtergrond te plaatsen.',
			table: { defaultValue: { summary: '(default)' } },
		},
		type: {
			control: 'select',
			options: ['list', 'navigation'],
			description: 'A11y-semantiek: `list` (role="list") of `navigation` (landmark met `aria-current` op het actieve item)',
			table: { defaultValue: { summary: 'list' } },
		},
		'no-dividers': {
			control: 'boolean',
			description: 'Verbergt scheidingslijnen tussen lijstitems',
			table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
		},
		'empty-text': {
			control: 'text',
			description: 'Tekst van de standaard empty-state-dialog. Valt terug op i18n ("Geen items").',
			table: { type: { summary: 'string' } },
		},
		'empty-supporting-text': {
			control: 'text',
			description: 'Ondersteunende tekst van de standaard empty-state-dialog.',
			table: { type: { summary: 'string' } },
		},
	},
	parameters: {
		docs: {
			description: {
				component: `
**Wanneer welk \`type\`:**

- **\`list\`** (default) — semantische lijst (\`role="list"\`) zonder speciaal toetsenbordgedrag. Items kunnen individueel knoppen of links zijn. Gebruik dit voor instellingen-lijsten, data-overzichten en lijsten van kaarten.
- **\`navigation\`** — way-finding tussen pagina's of app-secties. Items zijn links of knoppen, elk afzonderlijk focusbaar via Tab. Het actieve item krijgt \`aria-current="page"\` op basis van de \`selected\`-prop. Gebruik dit voor sidebars, in-app menu's en master/detail pickers.

Selectie-state wordt **altijd door de consumer beheerd**: de lijst muteert nooit zelf \`selected\`.
				`.trim(),
			},
		},
	},
};

export const Default = {
	args: {
		variant: 'simple',
		background: undefined,
		type: 'list',
		'no-dividers': false,
		'empty-text': '',
		'empty-supporting-text': '',
	},
	render: (args: Record<string, any>) => html`
		<nldd-list
			variant=${args.variant}
			background=${args.background || nothing}
			type=${args.type}
			?no-dividers=${args['no-dividers']}
			empty-text=${args['empty-text']}
			empty-supporting-text=${args['empty-supporting-text']}
		>
			<nldd-list-item>
				<nldd-text-cell text="Item 1"></nldd-text-cell>
			</nldd-list-item>
			<nldd-list-item>
				<nldd-text-cell text="Item 2"></nldd-text-cell>
			</nldd-list-item>
			<nldd-list-item>
				<nldd-text-cell text="Item 3"></nldd-text-cell>
			</nldd-list-item>
		</nldd-list>
	`,
};

export const Variants = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 32px;">
			<nldd-list variant="simple">
				<nldd-list-item><nldd-text-cell text="Simple — item 1"></nldd-text-cell></nldd-list-item>
				<nldd-list-item><nldd-text-cell text="Simple — item 2"></nldd-text-cell></nldd-list-item>
				<nldd-list-item><nldd-text-cell text="Simple — item 3"></nldd-text-cell></nldd-list-item>
			</nldd-list>

			<nldd-list variant="box">
				<nldd-list-item><nldd-text-cell text="Box (default: tinted bg + highlight) — item 1"></nldd-text-cell></nldd-list-item>
				<nldd-list-item><nldd-text-cell text="Box — item 2"></nldd-text-cell></nldd-list-item>
				<nldd-list-item><nldd-text-cell text="Box — item 3"></nldd-text-cell></nldd-list-item>
			</nldd-list>

			<div style="background: var(--semantics-surfaces-tinted-background-color); padding: 24px;">
				<nldd-list variant="box" background="base">
					<nldd-list-item><nldd-text-cell text='variant="box" background="base" — item 1'></nldd-text-cell></nldd-list-item>
					<nldd-list-item><nldd-text-cell text="op een al getinte pagina — item 2"></nldd-text-cell></nldd-list-item>
					<nldd-list-item><nldd-text-cell text="item 3"></nldd-text-cell></nldd-list-item>
				</nldd-list>
			</div>
		</div>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Twee varianten: `simple` (platte strip, alleen item-scheiding) en `box` (framed card met afgeronde hoeken + highlight ring). De `background` attribute regelt de fill — default volgt de variant (`simple` → transparent, `box` → tinted). Voor "box op een getinte pagina": `variant="box" background="base"`.',
			},
		},
	},
};

export const WithMultipleColumns = {
	render: () => html`
		<nldd-list variant="box">
			<nldd-list-item type="button">
				<nldd-spacer-cell slot="start" size="12"></nldd-spacer-cell>
				<nldd-icon-cell slot="start" size="24" vertical-alignment="top">
					<nldd-icon name="calendar-event"></nldd-icon>
				</nldd-icon-cell>
				<nldd-spacer-cell slot="start" size="8"></nldd-spacer-cell>
				<nldd-text-cell text="Primaire titel" supporting-text="Ondersteunende tekst eronder"></nldd-text-cell>
				<nldd-spacer-cell></nldd-spacer-cell>
				<nldd-text-cell
					color="secondary"
					horizontal-alignment="right"
					width="fit-content"
					text="Detail"
				></nldd-text-cell>
				<nldd-spacer-cell size="8"></nldd-spacer-cell>
				<nldd-icon-cell color="secondary" size="16">
					<nldd-icon name="chevron-right"></nldd-icon>
				</nldd-icon-cell>
			</nldd-list-item>
			<nldd-list-item type="button">
				<nldd-spacer-cell slot="start" size="12"></nldd-spacer-cell>
				<nldd-icon-cell slot="start" size="24" vertical-alignment="top">
					<nldd-icon name="certificate"></nldd-icon>
				</nldd-icon-cell>
				<nldd-spacer-cell slot="start" size="8"></nldd-spacer-cell>
				<nldd-text-cell text="Andere titel" supporting-text="Meer beschrijving hier"></nldd-text-cell>
				<nldd-spacer-cell size="8"></nldd-spacer-cell>
				<nldd-text-cell
					color="secondary"
					horizontal-alignment="right"
					width="fit-content"
					text="Meer detail"
				></nldd-text-cell>
				<nldd-spacer-cell size="8"></nldd-spacer-cell>
				<nldd-icon-cell color="secondary" size="16">
					<nldd-icon name="chevron-right"></nldd-icon>
				</nldd-icon-cell>
			</nldd-list-item>
		</nldd-list>
	`,
};

export const WithInteractiveItems = {
	render: () => html`
		<nldd-list variant="box">
			<nldd-list-item type="button">
				<nldd-text-cell text="Knop-item"></nldd-text-cell>
			</nldd-list-item>
			<nldd-list-item href="/settings">
				<nldd-text-cell text="Link-item"></nldd-text-cell>
			</nldd-list-item>
			<nldd-list-item>
				<nldd-text-cell text="Niet-interactief item"></nldd-text-cell>
			</nldd-list-item>
		</nldd-list>
	`,
};

// — Type: navigation ——————————————————————————————————————————————————————————

export const TypeNavigation = {
	render: () => {
		const onClick = (e: Record<string, any>) => {
			const item = e.target.closest('nldd-list-item');
			if (!item) return;
			e.preventDefault();
			const list = item.closest('nldd-list');
			list.querySelectorAll('nldd-list-item').forEach((i: any) => i.removeAttribute('selected'));
			item.setAttribute('selected', '');
		};
		return html`
			<nldd-list type="navigation" variant="box" aria-label="Hoofdmenu" @click=${onClick}>
				<nldd-list-item href="#dashboard"><nldd-text-cell text="Dashboard"></nldd-text-cell></nldd-list-item>
				<nldd-list-item href="#aanvragen" selected><nldd-text-cell text="Aanvragen"></nldd-text-cell></nldd-list-item>
				<nldd-list-item href="#meldingen"><nldd-text-cell text="Meldingen"></nldd-text-cell></nldd-list-item>
				<nldd-list-item href="#instellingen"><nldd-text-cell text="Instellingen"></nldd-text-cell></nldd-list-item>
			</nldd-list>
		`;
	},
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Navigation-landmark. Items zijn links (of knoppen), elk afzonderlijk tab-focusbaar. Het actieve item krijgt `aria-current="page"` via `selected`. De host krijgt `role="navigation"` en een standaard `aria-label="Navigatie"` (te overschrijven via `aria-label`).',
			},
		},
	},
};


// — Reorderable ———————————————————————————————————————————————————————————————

export const ReorderableList = {
	// Imperative render is intentional: the nldd-reorder handler needs to mutate
	// the DOM in-place to demonstrate actual reordering. A standard Storybook
	// render function cannot do this because Lit templates are stateless.
	render: () => {
		const onReorder = (e: Record<string, any>) => {
			const list = e.currentTarget;
			const { fromIndex, toIndex } = e.detail;
			const items = [...list.querySelectorAll('nldd-list-item')];
			const moved = items[fromIndex];
			if (toIndex === 0) {
				items[0].before(moved);
			} else {
				const ref = items.filter((_, i) => i !== fromIndex)[toIndex - 1];
				ref.after(moved);
			}
		};

		const labels = ['Aardappelen', 'Broccoli', 'Courgette', 'Doperwten', 'Erwten'];

		const el = document.createElement('div');
		render(html`
			<nldd-list variant="box" reorderable @nldd-reorder=${onReorder}>
				${labels.map((label) => html`
					<nldd-list-item>
						<nldd-spacer-cell slot="start" size="8"></nldd-spacer-cell>
						<nldd-drag-handle-cell size="sm" slot="start" reorderable-only></nldd-drag-handle-cell>
						<nldd-spacer-cell slot="start" reorderable-only size="8"></nldd-spacer-cell>
						<nldd-text-cell text="${label}"></nldd-text-cell>
					</nldd-list-item>
				`)}
			</nldd-list>
		`, el);
		return el;
	},
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Zet `reorderable` op een lijst van type default om drag-and-keyboard reorder te activeren. De lijst dispatcht `nldd-reorder` met `{ fromIndex, toIndex }` — de consumer is verantwoordelijk voor het muteren van de DOM (of het datamodel).',
			},
		},
	},
};


// — Header & footer ———————————————————————————————————————————————————————————

export const WithHeaderAndFooter = {
	render: () => html`
		<div style="container-type: inline-size; container-name: layout-container;">
			<nldd-list variant="box">
				<nldd-title slot="header" size="4">
					<h5>Meldingen</h5>
				</nldd-title>
				<nldd-list-item>
					<nldd-text-cell text="Meldingen toestaan"></nldd-text-cell>
				</nldd-list-item>
				<nldd-list-item>
					<nldd-text-cell text="Geluiden"></nldd-text-cell>
				</nldd-list-item>
				<nldd-list-item>
					<nldd-text-cell text="Badges"></nldd-text-cell>
				</nldd-list-item>
				<nldd-rich-text slot="footer">
					<p>Meldingen worden alleen verstuurd wanneer de app actief is op je apparaat.</p>
				</nldd-rich-text>
			</nldd-list>
		</div>
	`,
};


// — Empty slot ————————————————————————————————————————————————————————————————

export const EmptyDefault = {
	render: () => html`
		<nldd-list variant="box"></nldd-list>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Standaard rendert een lege lijst een default `nldd-inline-dialog` met i18n-tekst ("Geen items"). Geen configuratie nodig.',
			},
		},
	},
};

export const EmptyWithAttributes = {
	render: () => html`
		<nldd-list
			variant="box"
			empty-text="Niets gevonden"
			empty-supporting-text="Probeer een andere zoekterm."
		></nldd-list>
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
	render: () => html`
		<nldd-list variant="box">
			<nldd-inline-dialog
				slot="empty"
				icon="search"
				text="Geen resultaten"
				supporting-text="Pas de filters aan of probeer een andere zoekterm."
			>
				<nldd-button slot="actions" variant="neutral-tinted" text="Filters wissen"></nldd-button>
			</nldd-inline-dialog>
		</nldd-list>
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
