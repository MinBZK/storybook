import { html } from 'lit';
import './list-item-action.js';
import '../list-item/list-item.js';
import '../list/list.js';
import '../cells/cell/cell.js';
import '../cells/text-cell/text-cell.js';
import '../cells/spacer-cell/spacer-cell.js';
import '../cells/icon-cell/icon-cell.js';
import '../../content/icon/icon.js';
import '../../inputs/checkbox/checkbox.js';
import '../../actions/icon-button/icon-button.js';

/** Stories are flat markup, so the demo state lives here: a disclosure action
 *  flips the row's `expanded`, a checkbox action mirrors its own state onto the
 *  decorative nldd-checkbox inside it. One listener per row, and the
 *  currentTarget check keeps a nested row from toggling its ancestors too. */
const demoToggle = (e: Event) => {
	const action = (e.target as HTMLElement).closest('nldd-list-item-action');
	const row = action?.closest('nldd-list-item');
	if (!row || row !== e.currentTarget) return;
	const chevron = action!.querySelector('nldd-icon[name^="chevron"]');
	if (chevron) {
		const open = !row.hasAttribute('expanded');
		row.toggleAttribute('expanded', open);
		// With `disclosure` the component rotates the chevron from the row's state;
		// without it these stories swap the icon themselves.
		if (!action!.hasAttribute('disclosure')) {
			chevron.setAttribute('name', open ? 'chevron-down' : 'chevron-right');
			action!.toggleAttribute('expanded', open);
		}
		return;
	}
	if (action!.hasAttribute('checkbox')) {
		const box = action!.querySelector('nldd-checkbox') as (HTMLElement & { checked: boolean }) | null;
		if (box) {
			queueMicrotask(() => {
				box.checked = action!.hasAttribute('checked');
			});
		}
	}
};

export default {
	title: 'Components/Lists & Tables/List Item Action',
	component: 'nldd-list-item-action',
	tags: ['autodocs'],
	argTypes: {
		button: { control: 'boolean', description: 'Rendert de action als button' },
		href: { control: 'text', description: 'Rendert de action als link; wint van button en checkbox' },
		checkbox: { control: 'boolean', description: 'Maakt de action een role="checkbox" control' },
		checked: { control: 'boolean', description: 'Aangevinkt-status van een checkbox-action' },
		expanded: { control: 'boolean', description: 'Uitklap-status; laat weg als het action niets openklapt' },
		disabled: { control: 'boolean', description: 'Uitgeschakelde staat' },
		width: {
			control: 'select',
			options: ['fit-content', 'full'],
			description: 'full laat het action meegroeien met de rij',
			table: { defaultValue: { summary: 'fit-content' } },
		},
	},
};

export const Default = {
	args: {
		button: true,
		href: '',
		checkbox: false,
		checked: false,
		expanded: false,
		disabled: false,
		width: 'fit-content',
	},
	render: (args: Record<string, unknown>) => html`
		<nldd-list accessible-label="Voorbeeld">
			<nldd-list-item>
				<nldd-list-item-action
					?button=${args.button}
					href=${(args.href as string) || ''}
					?checkbox=${args.checkbox}
					?checked=${args.checked}
					?expanded=${args.expanded}
					?disabled=${args.disabled}
					width=${args.width as string}
				>
					<nldd-text-cell text="Segment" supporting-text="Het action draagt zijn eigen inline padding, dus de vulling houdt vanzelf ruimte om de tekst"></nldd-text-cell>
				</nldd-list-item-action>
			</nldd-list-item>
		</nldd-list>
	`,
};

/**
 * Twee onafhankelijke acties in één rij: de chevron klapt uit, de rest zet de
 * checkbox aan. Een echte `<input>` of een tweede knop binnen één actie zou
 * ongeldige HTML zijn — daarom splitsen we de rij in actions.
 *
 * De divider loopt standaard over de volle contentbreedte; markeer een cel met
 * `divider-start` of `divider-end` als hij later moet beginnen of eerder moet
 * stoppen.
 *
 * De inspringing per niveau is bewust NIET automatisch: nesting is semantiek,
 * inspringen is presentatie. Herhaal een spacer-cell per niveau, dan schaalt het
 * naar willekeurige diepte.
 */
export const TreeRow = {
	name: 'Tree row (chevron + checkbox)',
	render: () => {
		// The chevron zone is one control width (44) on every row; a leaf row's
		// stand-in spacer matches it, at any depth.
		const LEAF_CHEVRON_ZONE = '44';
		const INDENT_STEP = '16';
		const cells = (label: string, count: string) => html`
			<nldd-list-item-action checkbox width="full" accessible-label=${label}>
				<nldd-cell>
					<nldd-checkbox aria-hidden="true" tabindex="-1"></nldd-checkbox>
				</nldd-cell>
				<nldd-spacer-cell size="8"></nldd-spacer-cell>
				<nldd-text-cell text=${label}></nldd-text-cell>
				<nldd-spacer-cell size="8"></nldd-spacer-cell>
				<nldd-text-cell width="fit-content" horizontal-alignment="right" color="secondary" text=${count}></nldd-text-cell>
			</nldd-list-item-action>
		`;
		const branch = (label: string, count: string, level: number, expanded: boolean, children: unknown) => html`
			<nldd-list-item slot=${level ? 'children' : ''} ?expanded=${expanded} @click=${demoToggle}>
				${Array.from({ length: level }, () => html`<nldd-spacer-cell size=${INDENT_STEP}></nldd-spacer-cell>`)}
				<nldd-list-item-action button disclosure accessible-label="${label} in- of uitklappen">
					<nldd-icon-cell size="20"><nldd-icon name="chevron-right"></nldd-icon></nldd-icon-cell>
				</nldd-list-item-action>
				${cells(label, count)}
				${children}
			</nldd-list-item>
		`;
		const leaf = (label: string, count: string, level: number) => html`
			<nldd-list-item slot="children" @click=${demoToggle}>
				${Array.from({ length: level }, () => html`<nldd-spacer-cell size=${INDENT_STEP}></nldd-spacer-cell>`)}
				<nldd-spacer-cell size=${LEAF_CHEVRON_ZONE}></nldd-spacer-cell>
				${cells(label, count)}
			</nldd-list-item>
		`;
		return html`
			<nldd-list type="tree" accessible-label="Opdrachtgevers">
				${branch('Agentschappen', '15', 0, false, leaf('Rijkswaterstaat', '15', 1))}
				${branch('Ministeries', '14', 0, true, html`
					${leaf('Ministerie van Algemene Zaken', '1', 1)}
					${branch('Ministerie van Financiën', '13', 1, true, leaf('Directoraat-generaal Belastingdienst', '13', 2))}
				`)}
			</nldd-list>
		`;
	},
};

/**
 * De rij navigeert, de knop erachter doet iets anders. Zonder actions kan dit
 * niet: een button in een link is ongeldige HTML.
 */
export const LinkWithTrailingAction = {
	name: 'Link row with a trailing action',
	render: () => html`
		<nldd-list accessible-label="Opdrachten">
			${['Modernisering Inkoop', 'Open Data Architectuur'].map(name => html`
				<nldd-list-item>
					<nldd-list-item-action href="#${name}" width="full">
						<nldd-text-cell text=${name} supporting-text="Rijkswaterstaat"></nldd-text-cell>
					</nldd-list-item-action>
					<nldd-list-item-action button accessible-label="Bewerk ${name}">
						<nldd-icon-cell size="20"><nldd-icon name="edit"></nldd-icon></nldd-icon-cell>
					</nldd-list-item-action>
					<nldd-spacer-cell size="12"></nldd-spacer-cell>
				</nldd-list-item>
			`)}
		</nldd-list>
	`,
};

/**
 * In een `type="listbox"` lijst mag een `option` geen interactieve
 * afstammelingen hebben. Het action rendert dan als platte container: de cellen
 * blijven staan, alleen de knop verdwijnt. Er verschijnt een DEV-waarschuwing in
 * de console.
 */
export const InsideListbox = {
	name: 'In een listbox (degradeert)',
	render: () => html`
		<nldd-list type="listbox" accessible-label="Opties">
			<nldd-list-item>
				<nldd-list-item-action checkbox width="full">
					<nldd-text-cell text="Deze rij is een option, dus niet segmenteerbaar"></nldd-text-cell>
				</nldd-list-item-action>
			</nldd-list-item>
		</nldd-list>
	`,
};

/**
 * Dezelfde actions in een `variant="box"` lijst. Twee soorten ruimte die je uit
 * elkaar moet houden: de boxed variant toont altijd zijn start- en end-area met
 * een spacer van 12, en dat is de afstand van het action tot het KADER. De
 * spacers binnen het action zijn de afstand van de inhoud tot de rand van de
 * VULLING. Laat je die laatste weg, dan plakt de telling tegen de hover-vorm.
 */
export const InsideBoxedList = {
	name: 'In een boxed list',
	render: () => html`
		<nldd-list variant="box" type="tree" accessible-label="Opdrachtgevers">
			<nldd-list-item @click=${demoToggle}>
				<nldd-list-item-action button disclosure accessible-label="Agentschappen in- of uitklappen">
					<nldd-icon-cell size="20"><nldd-icon name="chevron-right"></nldd-icon></nldd-icon-cell>
				</nldd-list-item-action>
				<nldd-list-item-action checkbox width="full" accessible-label="Agentschappen">
					<nldd-cell><nldd-checkbox aria-hidden="true" tabindex="-1"></nldd-checkbox></nldd-cell>
					<nldd-spacer-cell size="8"></nldd-spacer-cell>
					<nldd-text-cell text="Agentschappen"></nldd-text-cell>
					<nldd-spacer-cell size="8"></nldd-spacer-cell>
					<nldd-text-cell width="fit-content" horizontal-alignment="right" color="secondary" text="15"></nldd-text-cell>
				</nldd-list-item-action>
				<nldd-list-item slot="children" @click=${demoToggle}>
					<nldd-spacer-cell size="16"></nldd-spacer-cell>
					<nldd-spacer-cell size="44"></nldd-spacer-cell>
					<nldd-list-item-action checkbox width="full" accessible-label="Rijkswaterstaat">
						<nldd-cell><nldd-checkbox aria-hidden="true" tabindex="-1"></nldd-checkbox></nldd-cell>
						<nldd-spacer-cell size="8"></nldd-spacer-cell>
						<nldd-text-cell text="Rijkswaterstaat"></nldd-text-cell>
						<nldd-spacer-cell size="8"></nldd-spacer-cell>
						<nldd-text-cell width="fit-content" horizontal-alignment="right" color="secondary" text="15"></nldd-text-cell>
					</nldd-list-item-action>
				</nldd-list-item>
			</nldd-list-item>
			<nldd-list-item expanded @click=${demoToggle}>
				<nldd-list-item-action button disclosure accessible-label="Ministeries in- of uitklappen">
					<nldd-icon-cell size="20"><nldd-icon name="chevron-right"></nldd-icon></nldd-icon-cell>
				</nldd-list-item-action>
				<nldd-list-item-action checkbox width="full" accessible-label="Ministeries">
					<nldd-cell><nldd-checkbox aria-hidden="true" tabindex="-1"></nldd-checkbox></nldd-cell>
					<nldd-spacer-cell size="8"></nldd-spacer-cell>
					<nldd-text-cell text="Ministeries"></nldd-text-cell>
					<nldd-spacer-cell size="8"></nldd-spacer-cell>
					<nldd-text-cell width="fit-content" horizontal-alignment="right" color="secondary" text="14"></nldd-text-cell>
				</nldd-list-item-action>
				<nldd-list-item slot="children" @click=${demoToggle}>
					<nldd-spacer-cell size="16"></nldd-spacer-cell>
					<nldd-spacer-cell size="44"></nldd-spacer-cell>
					<nldd-list-item-action checkbox width="full" accessible-label="Ministerie van Algemene Zaken">
						<nldd-cell><nldd-checkbox aria-hidden="true" tabindex="-1"></nldd-checkbox></nldd-cell>
						<nldd-spacer-cell size="8"></nldd-spacer-cell>
						<nldd-text-cell text="Ministerie van Algemene Zaken"></nldd-text-cell>
						<nldd-spacer-cell size="8"></nldd-spacer-cell>
						<nldd-text-cell width="fit-content" horizontal-alignment="right" color="secondary" text="1"></nldd-text-cell>
					</nldd-list-item-action>
				</nldd-list-item>
			</nldd-list-item>
		</nldd-list>
	`,
};

/**
 * Een echte boom: `nldd-list type="tree"` met kindrijen in `slot="children"`.
 * De nesting IS de hiërarchie — `aria-level`, `aria-posinset` en `aria-setsize`
 * worden er door hulpsoftware uit afgeleid en staan dus nergens in de markup.
 *
 * `expanded` staat één keer, op de rij: het stuurt zowel de zichtbaarheid van de
 * groep als de `aria-expanded` van de chevron, doordat die met `disclosure` is
 * gemarkeerd. Inspringen blijft handwerk — herhaal een spacer-cell per niveau.
 */
export const NestedTree = {
	name: 'Geneste boom (type="tree")',
	render: () => {
		const branch = (label: string, level: number, expanded: boolean, children: unknown) => html`
			<nldd-list-item slot=${level ? 'children' : ''} ?expanded=${expanded} @click=${demoToggle}>
				${Array.from({ length: level }, () => html`<nldd-spacer-cell size="16"></nldd-spacer-cell>`)}
				<nldd-list-item-action button disclosure accessible-label="${label} in- of uitklappen">
					<nldd-icon-cell size="20"><nldd-icon name="chevron-right"></nldd-icon></nldd-icon-cell>
				</nldd-list-item-action>
				<nldd-list-item-action checkbox width="full" accessible-label=${label}>
					<nldd-cell><nldd-checkbox aria-hidden="true" tabindex="-1"></nldd-checkbox></nldd-cell>
					<nldd-spacer-cell size="8"></nldd-spacer-cell>
					<nldd-text-cell text=${label}></nldd-text-cell>
					
				</nldd-list-item-action>
				${children}
			</nldd-list-item>
		`;
		const leaf = (label: string, level: number) => html`
			<nldd-list-item slot="children" @click=${demoToggle}>
				${Array.from({ length: level }, () => html`<nldd-spacer-cell size="16"></nldd-spacer-cell>`)}
				<nldd-spacer-cell size="44"></nldd-spacer-cell>
				<nldd-list-item-action checkbox width="full" accessible-label=${label}>
					<nldd-cell><nldd-checkbox aria-hidden="true" tabindex="-1"></nldd-checkbox></nldd-cell>
					<nldd-spacer-cell size="8"></nldd-spacer-cell>
					<nldd-text-cell text=${label}></nldd-text-cell>
					
				</nldd-list-item-action>
			</nldd-list-item>
		`;
		return html`
			<nldd-list type="tree" accessible-label="Opdrachtgevers">
				${branch('Agentschappen', 0, false, leaf('Rijkswaterstaat', 1))}
				${branch('Ministeries', 0, true, html`
					${leaf('Ministerie van Algemene Zaken', 1)}
					${branch('Ministerie van Financiën', 1, true, leaf('Directoraat-generaal Belastingdienst', 2))}
				`)}
			</nldd-list>
		`;
	},
};
