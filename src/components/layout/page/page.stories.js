import { html } from 'lit';
import './page.ts';
import '../container/container.ts';
import '../page-sections/simple-section/simple-section.ts';
import '../../actions/button/button.ts';
import '../../layout/spacer/spacer.ts';
import '../../actions/button-group/button-group.ts';
import '../../content/rich-text/rich-text.ts';
import '../../status-and-feedback/inline-dialog/inline-dialog.ts';
import '../../navigation/top-title-bar/top-title-bar.ts';
import '../../content/title/title.ts';

/**
 * Gebruik de page-component als buitenste wrapper van een pagina.
 * De page biedt een scrollbaar hoofdgebied met optionele sticky header en footer.
 * Sticky secties hebben een doorschijnende achtergrond met een vervagend verloop
 * dat buiten de sectie uitsteekt, zodat inhoud vloeiend achter ze door scrollt.
 * De header toont het verloop pas nadat er gescrolld is.
 *
 * ## Gebruik
 * ```html
 * <nldd-page sticky-header sticky-footer>
 *   <nav slot="header">...</nav>
 *   <nldd-rich-text>...</nldd-rich-text>
 *   <div slot="footer">...</div>
 * </nldd-page>
 * ```
 */
export default {
	title: 'Components/Layout/Page',
	component: 'nldd-page',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		componentSource: {
			file: 'src/components/layout/page/page.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		stickyHeader: {
			control: 'boolean',
			description: 'Sticky header',
			table: { defaultValue: { summary: 'false' } },
		},
		stickyFooter: {
			control: 'boolean',
			description: 'Sticky footer',
			table: { defaultValue: { summary: 'false' } },
		},
		background: {
			control: { type: 'select' },
			options: ['inherit', 'default', 'tinted'],
			description: 'Grijze achtergrond',
			table: { defaultValue: { summary: 'false' } },
		},
	},
	args: {
		stickyHeader: false,
		stickyFooter: false,
		background: 'inherit',
	},
};

const header = html`
	<nldd-top-title-bar
		slot="header"
		text="Paginatitel"
		back-text="Overzicht"
		collapse-anchor="page-title"
	></nldd-top-title-bar>
`;

const footer = html`
	<nldd-container padding="16">
		<nldd-button-group orientation="horizontal">
			<nldd-button variant="primary" text="Opslaan"></nldd-button>
			<nldd-button variant="secondary" text="Annuleren"></nldd-button>
		</nldd-button-group>
	</nldd-container>
`;

const content = html`
	<nldd-simple-section>
		<nldd-title id="page-title" size="2">
			<h1>Paginatitel</h1>
		</nldd-title>
		<nldd-spacer size="16"></nldd-spacer>
		<nldd-rich-text>
			<p>
				Dit is het scrollbare hoofdgebied van de pagina. Voeg hier de inhoud van de pagina toe.
				Wanneer de inhoud langer is dan de viewport, wordt het gebied scrollbaar.
			</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
			<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
			<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
			<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
			<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
			<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
			<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
			<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
		</nldd-rich-text>
	</nldd-simple-section>
`;

export const Standaard = ({ stickyHeader, stickyFooter, background }) => html`
	<nldd-page
		?sticky-header=${stickyHeader}
		?sticky-footer=${stickyFooter}
		background=${background}
		style="height: 400px;"
	>
		${header}
		${content}
		<div slot="footer">${footer}</div>
	</nldd-page>
`;

export const StickyHeader = () => html`
	<nldd-page sticky-header style="height: 400px;">
		${header}
		${content}
		<div slot="footer">${footer}</div>
	</nldd-page>
`;
StickyHeader.parameters = { controls: { disable: true } };

export const StickyFooter = () => html`
	<nldd-page sticky-footer style="height: 400px;">
		${header}
		${content}
		<div slot="footer">${footer}</div>
	</nldd-page>
`;
StickyFooter.parameters = { controls: { disable: true } };

export const StickyBeide = () => html`
	<nldd-page sticky-header sticky-footer style="height: 400px;">
		${header}
		${content}
		<div slot="footer">${footer}</div>
	</nldd-page>
`;
StickyBeide.parameters = { controls: { disable: true } };

export const Tinted = () => html`
	<nldd-page sticky-header sticky-footer background="tinted" style="height: 400px;">
		${header}
		${content}
		<div slot="footer">${footer}</div>
	</nldd-page>
`;
Tinted.parameters = { controls: { disable: true } };

export const GecentreerdeDialoog = () => html`
	<nldd-page sticky-header sticky-footer style="height: 400px;">
		${header}
		<nldd-simple-section align="center">
			<nldd-inline-dialog
				icon-name="search"
				text="Geen resultaten"
				supporting-text="Probeer een andere zoekopdracht."
			></nldd-inline-dialog>
		</nldd-simple-section>
		<div slot="footer">${footer}</div>
	</nldd-page>
`;
GecentreerdeDialoog.parameters = { controls: { disable: true } };
