import { html } from 'lit';
import './ndd-collection.ts';
import '../../content/rich-text/ndd-rich-text.ts';
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

const gridItems = Array.from({ length: 12 }, (_, i) => html`
	<div style="padding: 24px; background: var(--primitives-color-neutral-150); border-radius: 8px; min-height: 120px;">
		<ndd-rich-text size="flat">
			<h3>Item ${i + 1}</h3>
			<p>Omschrijving van item ${i + 1}.</p>
		</ndd-rich-text>
	</div>
`);

const listItems = Array.from({ length: 12 }, (_, i) => html`
	<div style="padding: 16px; background: var(--primitives-color-neutral-150); border-radius: 8px;">
		<ndd-rich-text size="flat">
			<h3>Item ${i + 1}</h3>
			<p>Omschrijving van item ${i + 1}.</p>
		</ndd-rich-text>
	</div>
`);

const scrollItems = Array.from({ length: 12 }, (_, i) => html`
	<div style="width: 280px; min-height: 200px; padding: 24px; background: var(--primitives-color-neutral-150); border-radius: 8px; flex-shrink: 0; box-sizing: border-box;">
		<ndd-rich-text size="flat">
			<h3>Item ${i + 1}</h3>
			<p>Omschrijving van item ${i + 1}.</p>
		</ndd-rich-text>
	</div>
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
	<ndd-page background="tinted" style="height: 500px;">
		<ndd-simple-section>
			<ndd-rich-text size="flat">
				<h2>Sectietitel</h2>
				<p>Tekst boven de collectie om de uitlijning te zien.</p>
			</ndd-rich-text>
			<ndd-collection layout="horizontal-scroll">
				${scrollItems}
			</ndd-collection>
		</ndd-simple-section>
	</ndd-page>
`;
InSimpleSectie.parameters = { controls: { disable: true } };
