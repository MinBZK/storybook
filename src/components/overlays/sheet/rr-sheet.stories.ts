import { html } from 'lit';
import './rr-sheet.ts';
import '../../navigation/top-title-bar/rr-top-title-bar.ts';
import '../../layout/page/rr-page.ts';
import '../../actions/button/rr-button.ts';
import '../../content/rich-text/rr-rich-text.ts';

/**
 * De Sheet is een overlay-component die vanuit een zijkant of de onderkant van
 * het scherm inschuift. Hij is gebaseerd op het native `<dialog>`-element.
 */
export default {
	title: 'Components/Overlays/Sheet',
	component: 'rr-sheet',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/overlays/sheet/rr-sheet.ts',
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
	<rr-rich-text style="padding: 16px;">
		<p>Dit is de inhoud van de sheet.</p>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
		<p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
		<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
		<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.</p>
		<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa.</p>
	</rr-rich-text>
`;

const Template = (args) => html`
	<rr-button text="Open sheet" @click=${openNext}></rr-button>
	<rr-sheet placement=${args.placement} ?modeless=${args.modeless}>
		<rr-page sticky-header>
			<rr-top-title-bar
				slot="header"
				title="Sheet titel"
				dismiss-label="Sluit"
			></rr-top-title-bar>
			${pageContent}
		</rr-page>
	</rr-sheet>
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
		<rr-button text="Open sheet" @click=${openNext}></rr-button>
		<rr-sheet placement="right">
			<rr-page sticky-header>
				<rr-top-title-bar
					slot="header"
					title="Detailpagina"
					back-label="Overzicht"
					dismiss-label="Sluit"
				></rr-top-title-bar>
				${pageContent}
			</rr-page>
		</rr-sheet>
	`,
	parameters: {
		controls: { disable: true },
		docs: { description: { story: 'Sheet met terugknop in de werkbalk.' } },
	},
};

export const NietModaal = {
	render: () => html`
		<rr-button text="Open niet-modale sheet" @click=${openNext}></rr-button>
		<rr-sheet placement="right" modeless>
			<rr-page sticky-header>
				<rr-top-title-bar
					slot="header"
					title="Niet-modale sheet"
					dismiss-label="Sluit"
				></rr-top-title-bar>
				${pageContent}
			</rr-page>
		</rr-sheet>
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
		<rr-button text="Open sheet" @click=${openNext}></rr-button>
		<rr-sheet placement="right">
			<rr-page sticky-header sticky-footer>
				<rr-top-title-bar
					slot="header"
					title="Sheet met footer"
					dismiss-label="Sluit"
				></rr-top-title-bar>
				${pageContent}
				<div slot="footer" style="padding: 16px; display: flex; justify-content: flex-end; gap: 8px;">
					<rr-button variant="secondary" text="Annuleer"></rr-button>
					<rr-button variant="primary" text="Opslaan"></rr-button>
				</div>
			</rr-page>
		</rr-sheet>
	`,
	parameters: {
		controls: { disable: true },
		docs: { description: { story: 'Sheet met een sticky footer voor acties.' } },
	},
};
