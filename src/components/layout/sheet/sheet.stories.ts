import { html } from 'lit';
import './sheet.js';
import '../../navigation/top-title-bar/top-title-bar.js';
import '../../layout/page/page.js';
import '../../actions/button/button.js';
import '../../actions/button-group/button-group.js';
import '../../content/rich-text/rich-text.js';
import '../../layout/page-sections/simple-section/simple-section.js';
import '../../layout/container/container.js';

/**
 * De Sheet is een overlay-component die vanuit een zijkant of de onderkant van
 * het scherm inschuift. Hij is gebaseerd op het native `<dialog>`-element.
 */
export default {
	title: 'Components/Layout/Sheet',
	component: 'nldd-sheet',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/layout/sheet/sheet.ts',
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
		width: {
			control: 'text',
			description: 'Breedte van side sheets (left/right) als CSS length, bv. `480px` of `32rem`. Genegeerd op sm en voor `placement="bottom"`. Geclamped op `100vw - 2 * inset`.',
		},
		height: {
			control: 'text',
			description: 'Hoogte van bottom sheets (en van elke sheet op sm). `full` (default), `fit-content`, of een CSS length/percentage zoals `50dvh`, `480px`, `50%`. Geclamped op `100dvh - top-inset`. Genegeerd voor side sheets op md+.',
		},
		accessibleLabel: {
			name: 'accessible-label',
			control: 'text',
			description: 'Toegankelijk label voor screen readers (aria-label van de dialog)',
		},
	},
	args: { placement: 'right', width: '', height: '', accessibleLabel: '' },
};

const openNext = (e: Record<string, any>) => e.currentTarget.nextElementSibling.show();

const pageContent = html`
	<nldd-simple-section>
		<nldd-rich-text>
			<p>Dit is de inhoud van de sheet.</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
			<p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
			<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
			<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.</p>
			<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa.</p>
		</nldd-rich-text>
	</nldd-simple-section>
`;

const Template = (args: Record<string, any>) => html`
	<nldd-button text="Open sheet" @click=${openNext}></nldd-button>
	<nldd-sheet
		placement=${args.placement}
		width=${args.width || ''}
		height=${args.height || ''}
		accessible-label=${args.accessibleLabel || ''}
	>
		<nldd-page sticky-header>
			<nldd-top-title-bar
				slot="header"
				text="Sheet titel"
				dismiss-text="Sluit"
			></nldd-top-title-bar>
			${pageContent}
		</nldd-page>
	</nldd-sheet>
`;

export const Standaard = {
	render: Template,
	args: { placement: 'right' },
};

export const Rechts = {
	render: Template,
	args: { placement: 'right' },
	parameters: { controls: { disable: true } },
};

export const Links = {
	render: Template,
	args: { placement: 'left' },
	parameters: { controls: { disable: true } },
};

export const Onder = {
	render: Template,
	args: { placement: 'bottom' },
	parameters: { controls: { disable: true } },
};

export const MetTerugknop = {
	render: () => html`
		<nldd-button text="Open sheet" @click=${openNext}></nldd-button>
		<nldd-sheet placement="right">
			<nldd-page sticky-header>
				<nldd-top-title-bar
					slot="header"
					text="Detailpagina"
					back-text="Overzicht"
					dismiss-text="Sluit"
				></nldd-top-title-bar>
				${pageContent}
			</nldd-page>
		</nldd-sheet>
	`,
	parameters: {
		controls: { disable: true },
		docs: { description: { story: 'Sheet met terugknop in de werkbalk.' } },
	},
};


export const MetStickyFooter = {
	render: () => html`
		<nldd-button text="Open sheet" @click=${openNext}></nldd-button>
		<nldd-sheet placement="right">
			<nldd-page sticky-header sticky-footer>
				<nldd-top-title-bar
					slot="header"
					text="Sheet met footer"
					dismiss-text="Sluit"
				></nldd-top-title-bar>
				${pageContent}
				<nldd-container slot="footer" padding="16">
					<nldd-button-group orientation="vertical">
						<nldd-button variant="primary" text="Opslaan" width="full"></nldd-button>
						<nldd-button variant="secondary" text="Annuleer" width="full"></nldd-button>
					</nldd-button-group>
				</nldd-container>
			</nldd-page>
		</nldd-sheet>
	`,
	parameters: {
		controls: { disable: true },
		docs: { description: { story: 'Sheet met een sticky footer voor acties.' } },
	},
};
