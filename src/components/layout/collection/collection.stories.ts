import { html, nothing } from 'lit';
import './collection.js';
import '../../actions/button/button.js';
import '../../actions/button-group/button-group.js';
import '../../content/rich-text/rich-text.js';
import '../../content/title/title.js';
import '../card/card.js';
import '../container/container.js';
import '../spacer/spacer.js';
import '../page/page.js';
import '../page-sections/simple-section/simple-section.js';

/**
 * Gebruik een collection om een verzameling items weer te geven in een grid-,
 * lijst- of horizontale scrolllay-out. De koptekst is optioneel. Bij horizontale
 * scroll verschijnen navigatieknoppen (en een fade aan de randen) zodra de items
 * niet meer in de container passen; bij grid en lijst een optionele laad-meer-knop.
 *
 * ## Gebruik
 * ```html
 * <nldd-collection layout="grid">
 *   <nldd-card>...</nldd-card>
 * </nldd-collection>
 * ```
 */
export default {
	title: 'Components/Layout/Collection',
	component: 'nldd-collection',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/layout/collection/collection.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		layout: {
			control: { type: 'select' },
			options: ['grid', 'stack', 'horizontal-scroll'],
			description: 'Lay-outmodus',
			table: { defaultValue: { summary: 'grid' } },
		},
		showLoadMore: {
			name: 'show-load-more',
			control: 'boolean',
			description: 'Toon laad-meer-knop (alleen bij grid en stack)',
			table: { defaultValue: { summary: 'false' } },
		},
		lazyLoad: {
			name: 'lazy-load',
			control: 'boolean',
			description: 'Laad automatisch meer wanneer de knop zichtbaar wordt',
			table: { defaultValue: { summary: 'false' } },
		},
		maxItems: {
			name: 'max-items',
			control: { type: 'number' },
			description: 'Aantal items per pagina',
			table: { defaultValue: { summary: '24' } },
		},
		itemWidth: {
			name: 'item-width',
			control: 'text',
			description: 'Gewenste breedte per item (bv. "280px", "20rem"). Bij grid wordt deze breedte geclamped op de container-breedte om horizontale overflow te voorkomen.',
			table: { defaultValue: { summary: '280px' } },
		},
	},
	args: {
		layout: 'grid',
		showLoadMore: false,
		lazyLoad: false,
		maxItems: 6,
		itemWidth: '',
	},
};

const itemContent = (i: any) => html`
	<nldd-title size="4"><h3>Item ${i + 1}</h3></nldd-title>
	<nldd-spacer size="4"></nldd-spacer>
	<nldd-rich-text spacing="flat">
		<p>Omschrijving van item ${i + 1}. Dit item bevat wat extra tekst om de kaart wat meer hoogte te geven en de layout beter tot zijn recht te laten komen.</p>
	</nldd-rich-text>
	<nldd-spacer size="16"></nldd-spacer>
	<nldd-button-group orientation="horizontal">
		<nldd-button variant="primary" text="Bekijk"></nldd-button>
		<nldd-button variant="secondary" text="Meer info"></nldd-button>
	</nldd-button-group>
`;

const gradientPairs: [string, string][] = [
	['1b5fa8', '00a3a3'],
	['4338ca', '2563eb'],
	['0d9488', '16a34a'],
	['ea580c', 'dc2626'],
	['7c3aed', 'db2777'],
	['0891b2', '4f46e5'],
];

const gradientImage = (i: number) => {
	const [from, to] = gradientPairs[i % gradientPairs.length];
	const src = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='480' height='200'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%23${from}'/><stop offset='1' stop-color='%23${to}'/></linearGradient></defs><rect width='480' height='200' fill='url(%23g)'/></svg>`;
	return html`
		<img
			slot="header"
			src=${src}
			alt=""
			style="display: block; width: 100%; height: auto;"
		>
	`;
};

const gridItems = Array.from({ length: 12 }, (_, i) => html`
	<nldd-card>
		${gradientImage(i)}
		<nldd-container padding="16">${itemContent(i)}</nldd-container>
	</nldd-card>
`);

const listItems = Array.from({ length: 12 }, (_, i) => html`
	<nldd-card>
		<nldd-container padding="16">${itemContent(i)}</nldd-container>
	</nldd-card>
`);

const scrollItems = Array.from({ length: 12 }, (_, i) => html`
	<nldd-card>
		${gradientImage(i)}
		<nldd-container padding="16">${itemContent(i)}</nldd-container>
	</nldd-card>
`);

export const Standaard = ({ layout, showLoadMore, lazyLoad, maxItems, itemWidth }: Record<string, any>) => html`
	<nldd-collection
		layout=${layout}
		?show-load-more=${showLoadMore}
		max-items=${maxItems}
		?lazy-load=${lazyLoad}
		item-width=${itemWidth || nothing}
	>
		${listItems}
	</nldd-collection>
`;

export const Grid = {
	render: () => html`
	<nldd-collection layout="grid" show-load-more max-items="6">
		${gridItems}
	</nldd-collection>
`,
	parameters: { controls: { disable: true } },
};

export const GridLazyLoad = {
	render: () => html`
	<nldd-collection layout="grid" show-load-more max-items="6" lazy-load>
		${gridItems}
	</nldd-collection>
`,
	parameters: { controls: { disable: true } },
};

export const Stapel = {
	render: () => html`
	<nldd-collection layout="stack" show-load-more max-items="6">
		${listItems}
	</nldd-collection>
`,
	parameters: { controls: { disable: true } },
};

export const HorizontaalScrollend = {
	render: () => html`
	<nldd-collection layout="horizontal-scroll">
		${scrollItems}
	</nldd-collection>
`,
	parameters: { controls: { disable: true } },
};

/**
 * Passen alle items samen binnen de container, dan is er niets te scrollen:
 * geen navigatieknoppen en geen fade. De items vullen de volle breedte.
 */
export const HorizontaalPassend = {
	render: () => html`
	<nldd-collection layout="horizontal-scroll">
		${scrollItems.slice(0, 2)}
	</nldd-collection>
`,
	parameters: { controls: { disable: true } },
};



export const InSimpleSectie = {
	render: () => html`
	<nldd-page background="tinted">
		<nldd-simple-section>
			<nldd-title slot="header" size="2"><h2>Sectietitel</h2></nldd-title>
			<nldd-spacer slot="header" size="4"></nldd-spacer>
			<nldd-rich-text slot="header" spacing="flat">
				<p>Tekst boven de collectie om de uitlijning te zien.</p>
			</nldd-rich-text>
			<nldd-collection layout="horizontal-scroll">
				${scrollItems}
			</nldd-collection>
		</nldd-simple-section>
	</nldd-page>
`,
	parameters: { controls: { disable: true } },
};
