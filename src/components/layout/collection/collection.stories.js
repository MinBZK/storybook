import { html } from 'lit';
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
 * scroll worden navigatieknoppen getoond; bij grid en lijst een optionele
 * laad-meer-knop.
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
			options: ['grid', 'list', 'horizontal-scroll'],
			description: 'Lay-outmodus',
			table: { defaultValue: { summary: 'grid' } },
		},
		showLoadMore: {
			control: 'boolean',
			description: 'Toon laad-meer-knop (alleen bij grid en list)',
			table: { defaultValue: { summary: 'false' } },
		},
		maxItems: {
			control: { type: 'number' },
			description: 'Aantal items per pagina',
			table: { defaultValue: { summary: '24' } },
		},
		lazyLoad: {
			control: 'boolean',
			description: 'Laad automatisch meer wanneer de knop zichtbaar wordt',
			table: { defaultValue: { summary: 'false' } },
		},
	},
	args: {
		layout: 'grid',
		showLoadMore: false,
		maxItems: 6,
		lazyLoad: false,
	},
};

const itemContent = (i) => html`
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

const gridItems = Array.from({ length: 12 }, (_, i) => html`
	<nldd-card>
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
		<nldd-container padding="16">${itemContent(i)}</nldd-container>
	</nldd-card>
`);

export const Standaard = ({ layout, showLoadMore, maxItems, lazyLoad }) => html`
	<nldd-collection
		layout=${layout}
		?show-load-more=${showLoadMore}

		max-items=${maxItems}
		?lazy-load=${lazyLoad}
	>
		${gridItems}
	</nldd-collection>
`;

export const Grid = () => html`
	<nldd-collection layout="grid" show-load-more max-items="6">
		${gridItems}
	</nldd-collection>
`;
Grid.parameters = { controls: { disable: true } };

export const GridLazyLoad = () => html`
	<nldd-collection layout="grid" show-load-more max-items="6" lazy-load>
		${gridItems}
	</nldd-collection>
`;
GridLazyLoad.parameters = { controls: { disable: true } };

export const Lijst = () => html`
	<nldd-collection layout="list" show-load-more max-items="6">
		${listItems}
	</nldd-collection>
`;
Lijst.parameters = { controls: { disable: true } };

export const HorizontaalScrollend = () => html`
	<nldd-collection layout="horizontal-scroll">
		${scrollItems}
	</nldd-collection>
`;
HorizontaalScrollend.parameters = { controls: { disable: true } };



export const InSimpleSectie = () => html`
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
`;
InSimpleSectie.parameters = { controls: { disable: true } };
