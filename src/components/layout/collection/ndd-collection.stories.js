import { html } from 'lit';
import './ndd-collection.ts';
import '../../actions/button/ndd-button.ts';
import '../../actions/button-group/ndd-button-group.ts';
import '../../content/rich-text/ndd-rich-text.ts';
import '../../content/title/ndd-title.ts';
import '../card/ndd-card.ts';
import '../container/ndd-container.ts';
import '../spacer/ndd-spacer.ts';
import '../page/ndd-page.ts';
import '../page-sections/simple-section/ndd-simple-section.ts';

/**
 * Gebruik een collection om een verzameling items weer te geven in een grid-,
 * lijst- of horizontale scrolllay-out. De koptekst is optioneel. Bij horizontale
 * scroll worden navigatieknoppen getoond; bij grid en lijst een optionele
 * laad-meer-knop.
 *
 * ## Gebruik
 * ```html
 * <ndd-collection layout="grid">
 *   <ndd-card>...</ndd-card>
 * </ndd-collection>
 * ```
 */
export default {
	title: 'Components/Layout/Collection',
	component: 'ndd-collection',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/layout/collection/ndd-collection.ts',
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
	<ndd-title size="4"><h3>Item ${i + 1}</h3></ndd-title>
	<ndd-spacer size="4"></ndd-spacer>
	<ndd-rich-text spacing="flat">
		<p>Omschrijving van item ${i + 1}. Dit item bevat wat extra tekst om de kaart wat meer hoogte te geven en de layout beter tot zijn recht te laten komen.</p>
	</ndd-rich-text>
	<ndd-spacer size="16"></ndd-spacer>
	<ndd-button-group orientation="horizontal">
		<ndd-button variant="primary" text="Bekijk"></ndd-button>
		<ndd-button variant="secondary" text="Meer info"></ndd-button>
	</ndd-button-group>
`;

const gridItems = Array.from({ length: 12 }, (_, i) => html`
	<ndd-card>
		<ndd-container padding="16">${itemContent(i)}</ndd-container>
	</ndd-card>
`);

const listItems = Array.from({ length: 12 }, (_, i) => html`
	<ndd-card>
		<ndd-container padding="16">${itemContent(i)}</ndd-container>
	</ndd-card>
`);

const scrollItems = Array.from({ length: 12 }, (_, i) => html`
	<ndd-card>
		<ndd-container padding="16">${itemContent(i)}</ndd-container>
	</ndd-card>
`);

export const Standaard = ({ layout, showLoadMore, maxItems, lazyLoad }) => html`
	<ndd-collection
		layout=${layout}
		?show-load-more=${showLoadMore}

		max-items=${maxItems}
		?lazy-load=${lazyLoad}
	>
		${gridItems}
	</ndd-collection>
`;

export const Grid = () => html`
	<ndd-collection layout="grid" show-load-more max-items="6">
		${gridItems}
	</ndd-collection>
`;
Grid.parameters = { controls: { disable: true } };

export const GridLazyLoad = () => html`
	<ndd-collection layout="grid" show-load-more max-items="6" lazy-load>
		${gridItems}
	</ndd-collection>
`;
GridLazyLoad.parameters = { controls: { disable: true } };

export const Lijst = () => html`
	<ndd-collection layout="list" show-load-more max-items="6">
		${listItems}
	</ndd-collection>
`;
Lijst.parameters = { controls: { disable: true } };

export const HorizontaalScrollend = () => html`
	<ndd-collection layout="horizontal-scroll">
		${scrollItems}
	</ndd-collection>
`;
HorizontaalScrollend.parameters = { controls: { disable: true } };



export const InSimpleSectie = () => html`
	<ndd-page background="tinted">
		<ndd-simple-section>
			<ndd-title slot="header" size="2"><h2>Sectietitel</h2></ndd-title>
			<ndd-spacer slot="header" size="4"></ndd-spacer>
			<ndd-rich-text slot="header" spacing="flat">
				<p>Tekst boven de collectie om de uitlijning te zien.</p>
			</ndd-rich-text>
			<ndd-collection layout="horizontal-scroll">
				${scrollItems}
			</ndd-collection>
		</ndd-simple-section>
	</ndd-page>
`;
InSimpleSectie.parameters = { controls: { disable: true } };
