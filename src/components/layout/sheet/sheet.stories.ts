import { html } from 'lit';
import './ndd-sheet.ts';
import '../../navigation/top-title-bar/ndd-top-title-bar.ts';
import '../../layout/page/ndd-page.ts';
import '../../actions/button/ndd-button.ts';
import '../../actions/button-group/ndd-button-group.ts';
import '../../content/rich-text/ndd-rich-text.ts';
import '../../layout/page-sections/simple-section/ndd-simple-section.ts';
import '../../layout/container/ndd-container.ts';

/**
 * De Sheet is een overlay-component die vanuit een zijkant of de onderkant van
 * het scherm inschuift. Hij is gebaseerd op het native `<dialog>`-element.
 */
export default {
	title: 'Components/Layout/Sheet',
	component: 'ndd-sheet',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/layout/sheet/ndd-sheet.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: { type: 'stable' },
	},
	argTypes: {
		placement: {
			control: 'select',
			options: ['left', 'right', 'bottom'],
			description: 'Positie van de sheet',
			table: { defaultValue: { summary: 'right' } },
		},
		modeless: {
			control: 'boolean',
			description: 'Niet-modaal (geen backdrop of focusvergrendeling); standaard is de sheet modaal',
			table: { defaultValue: { summary: false } },
		},
	},
	args: { placement: 'right', modeless: false },
};

const openNext = (e) => e.currentTarget.nextElementSibling.show();

const pageContent = html`
	<ndd-simple-section>
		<ndd-rich-text>
			<p>Dit is de inhoud van de sheet.</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
			<p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
			<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
			<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.</p>
			<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa.</p>
		</ndd-rich-text>
	</ndd-simple-section>
`;

const Template = (args) => html`
	<ndd-button text="Open sheet" @click=${openNext}></ndd-button>
	<ndd-sheet placement=${args.placement} ?modeless=${args.modeless}>
		<ndd-page sticky-header>
			<ndd-top-title-bar
				slot="header"
				text="Sheet titel"
				dismiss-text="Sluit"
			></ndd-top-title-bar>
			${pageContent}
		</ndd-page>
	</ndd-sheet>
`;

export const Standaard = {
	render: Template,
	args: { placement: 'right', modeless: false },
};

export const Rechts = {
	render: Template,
	args: { placement: 'right', modeless: false },
	parameters: { controls: { disable: true } },
};

export const Links = {
	render: Template,
	args: { placement: 'left', modeless: false },
	parameters: { controls: { disable: true } },
};

export const Onder = {
	render: Template,
	args: { placement: 'bottom', modeless: false },
	parameters: { controls: { disable: true } },
};

export const MetTerugknop = {
	render: () => html`
		<ndd-button text="Open sheet" @click=${openNext}></ndd-button>
		<ndd-sheet placement="right">
			<ndd-page sticky-header>
				<ndd-top-title-bar
					slot="header"
					text="Detailpagina"
					back-text="Overzicht"
					dismiss-text="Sluit"
				></ndd-top-title-bar>
				${pageContent}
			</ndd-page>
		</ndd-sheet>
	`,
	parameters: {
		controls: { disable: true },
		docs: { description: { story: 'Sheet met terugknop in de werkbalk.' } },
	},
};

export const NietModaal = {
	render: () => html`
		<ndd-button text="Open niet-modale sheet" @click=${openNext}></ndd-button>
		<ndd-sheet placement="right" modeless>
			<ndd-page sticky-header>
				<ndd-top-title-bar
					slot="header"
					text="Niet-modale sheet"
					dismiss-text="Sluit"
				></ndd-top-title-bar>
				${pageContent}
			</ndd-page>
		</ndd-sheet>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Niet-modale sheet zonder backdrop en focusvergrendeling. Bekijk deze story in het canvas voor het juiste resultaat — in de docs-weergave kan de positie afwijken door de containerstructuur van Storybook.',
			},
		},
	},
};

export const MetStickyFooter = {
	render: () => html`
		<ndd-button text="Open sheet" @click=${openNext}></ndd-button>
		<ndd-sheet placement="right">
			<ndd-page sticky-header sticky-footer>
				<ndd-top-title-bar
					slot="header"
					text="Sheet met footer"
					dismiss-text="Sluit"
				></ndd-top-title-bar>
				${pageContent}
				<ndd-container slot="footer" padding="16">
					<ndd-button-group orientation="vertical">
						<ndd-button variant="primary" text="Opslaan" full-width></ndd-button>
						<ndd-button variant="secondary" text="Annuleer" full-width></ndd-button>
					</ndd-button-group>
				</ndd-container>
			</ndd-page>
		</ndd-sheet>
	`,
	parameters: {
		controls: { disable: true },
		docs: { description: { story: 'Sheet met een sticky footer voor acties.' } },
	},
};
