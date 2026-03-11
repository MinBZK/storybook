import { html } from 'lit';
import './rr-collection.ts';
import '../../content/rich-text/rr-rich-text.ts';
import '../page/rr-page.ts';
import '../page-sections/simple-section/rr-simple-section.ts';

/**
 * Gebruik een collection om een verzameling items weer te geven in een grid-,
 * lijst- of horizontale scrolllay-out. De koptekst is optioneel. Bij horizontale
 * scroll worden navigatieknoppen getoond; bij grid en lijst een optionele
 * laad-meer-knop.
 *
 * ## Gebruik
 * ```html
 * <rr-collection layout="grid">
 *   <rr-card>...</rr-card>
 * </rr-collection>
 * ```
 */
export default {
	title: 'Components/Layout/Collection',
	component: 'rr-collection',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/layout/collection/rr-collection.ts',
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
		loadMoreLabel: {
			control: { type: 'text' },
			description: 'Label voor de laad-meer-knop',
			table: { defaultValue: { summary: 'Toon meer' } },
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
		loadMoreLabel: 'Toon meer',
		maxItems: 6,
		lazyLoad: false,
	},
};

const gridItems = Array.from({ length: 12 }, (_, i) => html`
	<div style="padding: 24px; background: #ccc; border-radius: 8px; min-height: 120px; min-width:280px;">
		<rr-rich-text size="flat">
			<h3>Item ${i + 1}</h3>
			<p>Omschrijving van item ${i + 1}.</p>
		</rr-rich-text>
	</div>
`);

const listItems = Array.from({ length: 12 }, (_, i) => html`
	<div style="padding: 16px; background: #ccc; border-radius: 8px;">
		<rr-rich-text size="flat">
			<h3>Item ${i + 1}</h3>
			<p>Omschrijving van item ${i + 1}.</p>
		</rr-rich-text>
	</div>
`);

const scrollItems = Array.from({ length: 12 }, (_, i) => html`
	<div style="width: 280px; min-height: 200px; padding: 24px; background: #ccc; border-radius: 8px; flex-shrink: 0; box-sizing: border-box;">
		<rr-rich-text size="flat">
			<h3>Item ${i + 1}</h3>
			<p>Omschrijving van item ${i + 1}.</p>
		</rr-rich-text>
	</div>
`);

export const Standaard = ({ layout, showLoadMore, loadMoreLabel, maxItems, lazyLoad }) => html`
	<rr-collection
		layout=${layout}
		?show-load-more=${showLoadMore}
		load-more-label=${loadMoreLabel}
		max-items=${maxItems}
		?lazy-load=${lazyLoad}
	>
		${gridItems}
	</rr-collection>
`;

export const Grid = () => html`
	<rr-collection layout="grid" show-load-more max-items="6">
		${gridItems}
	</rr-collection>
`;
Grid.parameters = { controls: { disable: true } };

export const GridLazyLoad = () => html`
	<rr-collection layout="grid" show-load-more max-items="6" lazy-load>
		${gridItems}
	</rr-collection>
`;
GridLazyLoad.parameters = { controls: { disable: true } };

export const Lijst = () => html`
	<rr-collection layout="list" show-load-more max-items="6">
		${listItems}
	</rr-collection>
`;
Lijst.parameters = { controls: { disable: true } };

export const HorizontaalScrollend = () => html`
	<rr-collection layout="horizontal-scroll">
		${scrollItems}
	</rr-collection>
`;
HorizontaalScrollend.parameters = { controls: { disable: true } };



export const InSimpleSectie = () => html`
	<rr-page tinted style="height: 500px;">
		<rr-simple-section>
			<rr-rich-text size="flat">
				<h2>Sectietitel</h2>
				<p>Tekst boven de collectie om de uitlijning te zien.</p>
			</rr-rich-text>
			<rr-collection layout="horizontal-scroll">
				${scrollItems}
			</rr-collection>
		</rr-simple-section>
	</rr-page>
`;
InSimpleSectie.parameters = { controls: { disable: true } };
