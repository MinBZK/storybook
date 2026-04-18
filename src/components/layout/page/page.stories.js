import { html } from 'lit';
import './ndd-page.ts';
import '../container/ndd-container.ts';
import '../page-sections/simple-section/ndd-simple-section.ts';
import '../../actions/button/ndd-button.ts';
import '../../layout/spacer/ndd-spacer.ts';
import '../../actions/button-group/ndd-button-group.ts';
import '../../content/rich-text/ndd-rich-text.ts';
import '../../status-and-feedback/inline-dialog/ndd-inline-dialog.ts';
import '../../navigation/top-title-bar/ndd-top-title-bar.ts';
import '../../content/title/ndd-title.ts';

/**
 * Gebruik de page-component als buitenste wrapper van een pagina.
 * De page biedt een scrollbaar hoofdgebied met optionele sticky header en footer.
 * Sticky secties hebben een doorschijnende achtergrond met een vervagend verloop
 * dat buiten de sectie uitsteekt, zodat inhoud vloeiend achter ze door scrollt.
 * De header toont het verloop pas nadat er gescrolld is.
 *
 * ## Gebruik
 * ```html
 * <ndd-page sticky-header sticky-footer>
 *   <nav slot="header">...</nav>
 *   <ndd-rich-text>...</ndd-rich-text>
 *   <div slot="footer">...</div>
 * </ndd-page>
 * ```
 */
export default {
	title: 'Components/Layout/Page',
	component: 'ndd-page',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		componentSource: {
			file: 'src/components/layout/page/ndd-page.ts',
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
	<ndd-top-title-bar
		slot="header"
		text="Paginatitel"
		back-text="Overzicht"
		collapse-anchor="page-title"
	></ndd-top-title-bar>
`;

const footer = html`
	<ndd-container padding="16">
		<ndd-button-group orientation="horizontal">
			<ndd-button variant="primary" text="Opslaan"></ndd-button>
			<ndd-button variant="secondary" text="Annuleren"></ndd-button>
		</ndd-button-group>
	</ndd-container>
`;

const content = html`
	<ndd-simple-section>
		<ndd-title id="page-title" size="2">
			<h1>Paginatitel</h1>
		</ndd-title>
		<ndd-spacer size="16"></ndd-spacer>
		<ndd-rich-text>
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
		</ndd-rich-text>
	</ndd-simple-section>
`;

export const Standaard = ({ stickyHeader, stickyFooter, background }) => html`
	<ndd-page
		?sticky-header=${stickyHeader}
		?sticky-footer=${stickyFooter}
		background=${background}
		style="height: 400px;"
	>
		${header}
		${content}
		<div slot="footer">${footer}</div>
	</ndd-page>
`;

export const StickyHeader = () => html`
	<ndd-page sticky-header style="height: 400px;">
		${header}
		${content}
		<div slot="footer">${footer}</div>
	</ndd-page>
`;
StickyHeader.parameters = { controls: { disable: true } };

export const StickyFooter = () => html`
	<ndd-page sticky-footer style="height: 400px;">
		${header}
		${content}
		<div slot="footer">${footer}</div>
	</ndd-page>
`;
StickyFooter.parameters = { controls: { disable: true } };

export const StickyBeide = () => html`
	<ndd-page sticky-header sticky-footer style="height: 400px;">
		${header}
		${content}
		<div slot="footer">${footer}</div>
	</ndd-page>
`;
StickyBeide.parameters = { controls: { disable: true } };

export const Tinted = () => html`
	<ndd-page sticky-header sticky-footer background="tinted" style="height: 400px;">
		${header}
		${content}
		<div slot="footer">${footer}</div>
	</ndd-page>
`;
Tinted.parameters = { controls: { disable: true } };

export const GecentreerdeDialoog = () => html`
	<ndd-page sticky-header sticky-footer style="height: 400px;">
		${header}
		<ndd-simple-section align="center">
			<ndd-inline-dialog
				icon-name="search"
				text="Geen resultaten"
				supporting-text="Probeer een andere zoekopdracht."
			></ndd-inline-dialog>
		</ndd-simple-section>
		<div slot="footer">${footer}</div>
	</ndd-page>
`;
GecentreerdeDialoog.parameters = { controls: { disable: true } };
