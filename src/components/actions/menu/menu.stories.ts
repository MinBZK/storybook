import { html } from 'lit';
import './menu.js';
import '../../actions/button/button.js';

export default {
	title: 'Components/Actions/Menu',
	component: 'nldd-menu',
	tags: ['autodocs'],
};

export const Default = {
	tags: ['!autodocs'],
	render: () => html`
		<nldd-button id="button-default" expandable text="Open menu"></nldd-button>
		<nldd-menu id="menu-default" anchor="button-default">
			<nldd-menu-item text="Menu item"></nldd-menu-item>
		</nldd-menu>
	`,
};

/**
 * `details` toont een secundair label rechts van het item — bijvoorbeeld de
 * huidige waarde of een aantal. Voor sneltoetsen is er het aparte
 * `shortcut`-attribuut (zie de KeyboardShortcuts-story).
 */
export const WithDetails = {
	render: () => html`
		<nldd-button id="button-details" expandable text="Voorkeuren"></nldd-button>
		<nldd-menu id="menu-details" anchor="button-details">
			<nldd-menu-item text="Taal" details="Nederlands"></nldd-menu-item>
			<nldd-menu-item text="Tijdzone" details="Amsterdam"></nldd-menu-item>
			<nldd-menu-item text="Thema" details="Systeem"></nldd-menu-item>
		</nldd-menu>
	`,
};

/**
 * Met `shortcut` toont een item zijn sneltoets als nette `<kbd>`-toetsen (via
 * nldd-keyboard-shortcut) in plaats van platte `details`-tekst. Dit is puur ter
 * weergave — het component bindt de toets niet; koppel de afhandeling zelf in je
 * applicatie. Gebruik `shortcut-mac`/`shortcut-windows`/`shortcut-linux` voor
 * platform-specifieke weergave. Op touch-only apparaten verdwijnt de hint, want
 * daar is hij niet aanroepbaar.
 */
export const KeyboardShortcuts = {
	render: () => html`
		<nldd-button id="button-shortcuts" expandable text="Bewerken"></nldd-button>
		<nldd-menu id="menu-shortcuts" anchor="button-shortcuts">
			<nldd-menu-item text="Ongedaan maken" shortcut="Ctrl+Z" shortcut-mac="Cmd+Z"></nldd-menu-item>
			<nldd-menu-item text="Knippen" shortcut="Ctrl+X" shortcut-mac="Cmd+X"></nldd-menu-item>
			<nldd-menu-item text="Kopiëren" shortcut="Ctrl+C" shortcut-mac="Cmd+C"></nldd-menu-item>
			<nldd-menu-item text="Plakken" shortcut="Ctrl+V" shortcut-mac="Cmd+V"></nldd-menu-item>
		</nldd-menu>
	`,
};

export const WithIcons = {
	render: () => html`
		<nldd-button id="button-icons" expandable text="Open menu"></nldd-button>
		<nldd-menu id="menu-icons" anchor="button-icons">
			<nldd-menu-item text="Bewerk" icon="pencil"></nldd-menu-item>
			<nldd-menu-item text="Dupliceer" icon="square-plus-on-square"></nldd-menu-item>
			<nldd-menu-divider></nldd-menu-divider>
			<nldd-menu-item destructive text="Verwijder" icon="trash"></nldd-menu-item>
		</nldd-menu>
	`,
};

/**
 * Met een `href` rendert een item als echte link (`<a>`), zodat middenklik,
 * "openen in nieuw tabblad" en "kopieer linkadres" werken. Een geselecteerd
 * link-item krijgt `aria-current="page"`. href wordt genegeerd voor
 * submenu-openers, checkbox/radio-items en uitgeschakelde items.
 */
export const Links = {
	render: () => html`
		<nldd-button id="button-links" expandable text="Account"></nldd-button>
		<nldd-menu id="menu-links" anchor="button-links">
			<nldd-menu-item text="Mijn profiel" href="#profiel" icon="user"></nldd-menu-item>
			<nldd-menu-item text="Instellingen" href="#instellingen" icon="settings"></nldd-menu-item>
			<nldd-menu-divider></nldd-menu-divider>
			<nldd-menu-item text="Uitloggen" href="#uitloggen" icon="logout"></nldd-menu-item>
		</nldd-menu>
	`,
};

/**
 * Het menu groeit standaard mee met de breedste regel — handig voor lange
 * labels — tot een maximum van `min(100vw - inset, 640px)`. Korte menu's houden
 * de minimumbreedte aan; met een expliciete `width` zet je een vaste breedte.
 */
export const BredeInhoud = {
	render: () => html`
		<nldd-button id="button-wide" expandable text="Acties"></nldd-button>
		<nldd-menu id="menu-wide" anchor="button-wide">
			<nldd-menu-item text="Document downloaden als ondertekende PDF"></nldd-menu-item>
			<nldd-menu-item text="Deel met alle medewerkers van de afdeling"></nldd-menu-item>
			<nldd-menu-item text="Archiveer en verwijder uit het overzicht"></nldd-menu-item>
		</nldd-menu>
	`,
};

/**
 * Met een expliciete `width` zet je het menu op een vaste breedte; leeg laten
 * laat het meegroeien met de inhoud (tussen een minimum en
 * `min(100vw - inset, 640px)`). Speel met de control.
 */
export const Breedte = {
	render: (args: Record<string, any>) => html`
		<nldd-button id="button-breedte" expandable text="Open menu"></nldd-button>
		<nldd-menu id="menu-breedte" anchor="button-breedte" width=${args.width}>
			<nldd-menu-item text="Nederland" value="nl"></nldd-menu-item>
			<nldd-menu-item text="België" value="be"></nldd-menu-item>
			<nldd-menu-item text="Duitsland" value="de"></nldd-menu-item>
		</nldd-menu>
	`,
	args: { width: '' },
	argTypes: {
		width: {
			control: 'text',
			description: 'Expliciete breedte (any CSS length, bv. "320px"). Leeg = mee met de inhoud.',
			table: { defaultValue: { summary: '' } },
		},
	},
};

export const WithDivider = {
	render: () => html`
		<nldd-button id="button-divider" expandable text="Open menu"></nldd-button>
		<nldd-menu id="menu-divider" anchor="button-divider">
			<nldd-menu-item text="Hernoemen" icon="write"></nldd-menu-item>
			<nldd-menu-item text="Dupliceren" icon="duplicate"></nldd-menu-item>
			<nldd-menu-divider></nldd-menu-divider>
			<nldd-menu-item text="Verwijderen" icon="delete" destructive></nldd-menu-item>
		</nldd-menu>
	`,
};

export const Checkbox = {
	render: () => html`
		<nldd-button id="button-checkbox" expandable text="Open menu"></nldd-button>
		<nldd-menu id="menu-checkbox" anchor="button-checkbox">
			<nldd-menu-item type="checkbox" text="Optie 1" selected></nldd-menu-item>
			<nldd-menu-item type="checkbox" text="Optie 2"></nldd-menu-item>
			<nldd-menu-item type="checkbox" text="Optie 3"></nldd-menu-item>
		</nldd-menu>
	`,
};

export const Radio = {
	render: () => html`
		<nldd-button id="button-radio" expandable text="Open menu"></nldd-button>
		<nldd-menu id="menu-radio" anchor="button-radio">
			<nldd-menu-item type="radio" text="Optie A" selected></nldd-menu-item>
			<nldd-menu-item type="radio" text="Optie B"></nldd-menu-item>
			<nldd-menu-item type="radio" text="Optie C"></nldd-menu-item>
		</nldd-menu>
	`,
};

export const MixedIconsAndCheckable = {
	render: () => html`
		<nldd-button id="button-mixed-icons-checkable" expandable text="Open menu"></nldd-button>
		<nldd-menu id="menu-mixed-icons-checkable" anchor="button-mixed-icons-checkable">
			<nldd-menu-item type="checkbox" text="Vet" selected></nldd-menu-item>
			<nldd-menu-item type="checkbox" text="Cursief"></nldd-menu-item>
			<nldd-menu-item type="radio" text="Linksuitlijning" selected></nldd-menu-item>
			<nldd-menu-item type="radio" text="Centreren"></nldd-menu-item>
			<nldd-menu-divider></nldd-menu-divider>
			<nldd-menu-item text="Bewerk citaat" icon="text-quote"></nldd-menu-item>
			<nldd-menu-item text="Voorbeeldweergave" icon="eye"></nldd-menu-item>
			<nldd-menu-divider></nldd-menu-divider>
			<nldd-menu-item type="checkbox" text="Vet (met icoon)" icon="bold" selected></nldd-menu-item>
			<nldd-menu-item type="checkbox" text="Cursief (met icoon)" icon="italic"></nldd-menu-item>
		</nldd-menu>
	`,
	parameters: {
		docs: {
			description: {
				story: 'Mix van items met checkbox/radio en items met alleen een icoon: hun teksten lijnen uit doordat het check-cel-blok en het icoon-cel-blok dezelfde leading-breedte hebben. Items die zowel een checkbox/radio als een icoon hebben zijn extra ingesprongen — dat is bewust.',
			},
		},
	},
};

export const Disabled = {
	render: () => html`
		<nldd-button id="button-disabled" expandable text="Open menu"></nldd-button>
		<nldd-menu id="menu-disabled" anchor="button-disabled">
			<nldd-menu-item text="Bewerk"></nldd-menu-item>
			<nldd-menu-item text="Uitgeschakeld" disabled></nldd-menu-item>
			<nldd-menu-item text="Kopieer"></nldd-menu-item>
		</nldd-menu>
	`,
};

export const Destructive = {
	render: () => html`
		<nldd-button id="button-destructive" expandable text="Open menu"></nldd-button>
		<nldd-menu id="menu-destructive" anchor="button-destructive">
			<nldd-menu-item text="Bewerk" icon="pencil"></nldd-menu-item>
			<nldd-menu-item text="Dupliceer" icon="square-plus-on-square"></nldd-menu-item>
			<nldd-menu-divider></nldd-menu-divider>
			<nldd-menu-item destructive text="Verwijder" icon="trash"></nldd-menu-item>
		</nldd-menu>
	`,
	parameters: {
		docs: {
			description: {
				story: 'Markeer onomkeerbare acties als `destructive` voor een rode tekstkleur en een rode highlight-achtergrond — zodat de actie visueel afwijkt van veilige items in dezelfde menu.',
			},
		},
	},
};

export const WithGroups = {
	render: () => html`
		<nldd-button id="button-groups" expandable text="Open menu"></nldd-button>
		<nldd-menu id="menu-groups" anchor="button-groups">
			<nldd-menu-group text="Bestand">
				<nldd-menu-item text="Nieuw"></nldd-menu-item>
				<nldd-menu-item text="Open…"></nldd-menu-item>
				<nldd-menu-item text="Opslaan"></nldd-menu-item>
			</nldd-menu-group>
			<nldd-menu-group text="Bewerken">
				<nldd-menu-item text="Knip"></nldd-menu-item>
				<nldd-menu-item text="Kopieer"></nldd-menu-item>
				<nldd-menu-item text="Plak"></nldd-menu-item>
			</nldd-menu-group>
		</nldd-menu>
	`,
	parameters: {
		docs: {
			description: {
				story: 'Wrap items in `<nldd-menu-group text="…">` voor een gelabelde sectie. De groep krijgt automatisch een divider boven (behalve als het de eerste child van de menu is) en levert proper ARIA `role="group"` met `aria-labelledby` voor screen readers.',
			},
		},
	},
};

export const WithMultiLevelSubmenu = {
	render: () => html`
		<nldd-button id="button-multi-submenu" expandable text="Open menu"></nldd-button>
		<nldd-menu id="menu-multi-submenu" anchor="button-multi-submenu">
			<nldd-menu-item text="Bestand">
				<nldd-menu>
					<nldd-menu-item text="Nieuw"></nldd-menu-item>
					<nldd-menu-item text="Open recent">
						<nldd-menu>
							<nldd-menu-item text="2026-Q2.xlsx"></nldd-menu-item>
							<nldd-menu-item text="Notulen.docx"></nldd-menu-item>
							<nldd-menu-item text="Plan.pdf"></nldd-menu-item>
						</nldd-menu>
					</nldd-menu-item>
					<nldd-menu-item text="Sluiten"></nldd-menu-item>
				</nldd-menu>
			</nldd-menu-item>
			<nldd-menu-item text="Bewerken"></nldd-menu-item>
		</nldd-menu>
	`,
	parameters: {
		docs: {
			description: {
				story: 'Submenus mogen recursief geneste submenus bevatten — geen diepte-limiet. Elk niveau opent z\'n eigen popover (cascade) of stapelt op dezelfde positie (drill-in mobiel). Toetsenbord: ArrowRight opent submenu en focust eerste item, ArrowLeft of Esc gaat één niveau terug.',
			},
		},
	},
};

export const WithSubmenu = {
	render: () => html`
		<nldd-button id="button-submenu" expandable text="Open menu"></nldd-button>
		<nldd-menu id="menu-submenu" anchor="button-submenu">
			<nldd-menu-item text="Nieuw"></nldd-menu-item>
			<nldd-menu-item text="Open recent">
				<nldd-menu>
					<nldd-menu-item text="2026-Q2.xlsx"></nldd-menu-item>
					<nldd-menu-item text="Notulen.docx"></nldd-menu-item>
					<nldd-menu-item text="Plan.pdf"></nldd-menu-item>
				</nldd-menu>
			</nldd-menu-item>
			<nldd-menu-item text="Exporteer">
				<nldd-menu>
					<nldd-menu-item text="Als PDF"></nldd-menu-item>
					<nldd-menu-item text="Als CSV"></nldd-menu-item>
					<nldd-menu-item text="Als Excel"></nldd-menu-item>
				</nldd-menu>
			</nldd-menu-item>
			<nldd-menu-divider></nldd-menu-divider>
			<nldd-menu-item text="Sluiten"></nldd-menu-item>
		</nldd-menu>
	`,
	parameters: {
		docs: {
			description: {
				story: 'Wrap een `<nldd-menu>` in een `<nldd-menu-item>` om er een submenu van te maken. Het item krijgt automatisch een chevron-rechts indicator en `aria-haspopup="menu"`. Klik op het item opent het submenu naast de parent (cascade). Een item is óf een actie óf een submenu-opener — geen beide. Selectie van een item ergens in de keten sluit alle popovers tegelijk.',
			},
		},
	},
};

export const DebugSafeTriangle = {
	render: () => html`
		<nldd-button id="button-debug-triangle" expandable text="Open menu"></nldd-button>
		<nldd-menu id="menu-debug-triangle" anchor="button-debug-triangle" debug-safe-triangle>
			<nldd-menu-item text="Nieuw"></nldd-menu-item>
			<nldd-menu-item text="Open recent">
				<nldd-menu debug-safe-triangle>
					<nldd-menu-item text="2026-Q2.xlsx"></nldd-menu-item>
					<nldd-menu-item text="Notulen.docx"></nldd-menu-item>
					<nldd-menu-item text="Plan.pdf"></nldd-menu-item>
				</nldd-menu>
			</nldd-menu-item>
			<nldd-menu-item text="Sluiten"></nldd-menu-item>
		</nldd-menu>
	`,
	parameters: {
		docs: {
			description: {
				story: 'Schakel het `debug-safe-triangle` attribuut aan om de safe triangle als translucent roze overlay te visualiseren. Handig voor debugging en het tunen van padding-waardes — niet voor productie.',
			},
		},
	},
};

export const MixedFlatAndGroups = {
	render: () => html`
		<nldd-button id="button-mixed" expandable text="Open menu"></nldd-button>
		<nldd-menu id="menu-mixed" anchor="button-mixed">
			<nldd-menu-item text="Recent geopend"></nldd-menu-item>
			<nldd-menu-group text="Mappen">
				<nldd-menu-item text="Documenten" icon="folder"></nldd-menu-item>
				<nldd-menu-item text="Downloads" icon="folder"></nldd-menu-item>
			</nldd-menu-group>
			<nldd-menu-divider></nldd-menu-divider>
			<nldd-menu-item text="Sluiten"></nldd-menu-item>
		</nldd-menu>
	`,
	parameters: {
		docs: {
			description: {
				story: 'Flat items en groups kunnen door elkaar gebruikt worden. Een expliciete `<nldd-menu-divider>` direct vóór een groep wordt automatisch verborgen — de groep heeft al z\'n eigen divider boven.',
			},
		},
	},
};
