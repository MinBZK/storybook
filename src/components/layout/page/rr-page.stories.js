import { html } from 'lit';
import './rr-page.ts';
import '../../actions/button/rr-button.ts';
import '../../layout/spacer/rr-spacer.ts';
import '../../content/rich-text/rr-rich-text.ts';

/**
 * Gebruik de page-component als buitenste wrapper van een pagina.
 * De page biedt een scrollbaar hoofdgebied met optionele sticky header en footer.
 * Sticky secties hebben een doorschijnende achtergrond met een vervagend verloop
 * dat buiten de sectie uitsteekt, zodat inhoud vloeiend achter ze door scrollt.
 * De header toont het verloop pas nadat er gescrolld is.
 *
 * ## Gebruik
 * ```html
 * <rr-page sticky-header sticky-footer>
 *   <nav slot="header">...</nav>
 *   <rr-rich-text>...</rr-rich-text>
 *   <div slot="footer">...</div>
 * </rr-page>
 * ```
 */
export default {
	title: 'Components/Layout/Page',
	component: 'rr-page',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		componentSource: {
			file: 'src/components/layout/page/rr-page.ts',
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
		tinted: {
			control: 'boolean',
			description: 'Grijze achtergrond',
			table: { defaultValue: { summary: 'false' } },
		},
	},
	args: {
		stickyHeader: false,
		stickyFooter: false,
		tinted: false,
	},
};

const header = html`
	<rr-rich-text spacing="tight" style="padding: 16px;">
		<strong>Header</strong>
	</rr-rich-text>
`;

const footer = html`
	<div style="padding: 16px; display: flex; justify-content: flex-end;">
		<rr-button variant="secondary">Annuleren</rr-button>
		<rr-spacer size="8" direction="horizontal"></rr-spacer>
		<rr-button>Opslaan</rr-button>
	</div>
`;

const content = html`
	<rr-rich-text style="padding: 16px;">
		<h1>Paginatitel</h1>
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
	</rr-rich-text>
`;

export const Standaard = ({ stickyHeader, stickyFooter, tinted }) => html`
	<rr-page
		?sticky-header=${stickyHeader}
		?sticky-footer=${stickyFooter}
		?tinted=${tinted}
		style="height: 400px;"
	>
		<div slot="header">${header}</div>
		${content}
		<div slot="footer">${footer}</div>
	</rr-page>
`;

export const StickyHeader = () => html`
	<rr-page sticky-header style="height: 400px;">
		<div slot="header">${header}</div>
		${content}
		<div slot="footer">${footer}</div>
	</rr-page>
`;
StickyHeader.parameters = { controls: { disable: true } };

export const StickyFooter = () => html`
	<rr-page sticky-footer style="height: 400px;">
		<div slot="header">${header}</div>
		${content}
		<div slot="footer">${footer}</div>
	</rr-page>
`;
StickyFooter.parameters = { controls: { disable: true } };

export const StickyBeide = () => html`
	<rr-page sticky-header sticky-footer style="height: 400px;">
		<div slot="header">${header}</div>
		${content}
		<div slot="footer">${footer}</div>
	</rr-page>
`;
StickyBeide.parameters = { controls: { disable: true } };

export const Tinted = () => html`
	<rr-page sticky-header sticky-footer tinted style="height: 400px;">
		<div slot="header">${header}</div>
		${content}
		<div slot="footer">${footer}</div>
	</rr-page>
`;
Tinted.parameters = { controls: { disable: true } };
