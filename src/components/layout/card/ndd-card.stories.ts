import { html } from 'lit';
import './ndd-card.ts';
import '../../content/title/ndd-title.ts';
import '../../content/rich-text/ndd-rich-text.ts';
import '../../actions/button/ndd-button.ts';
import '../../actions/button-group/ndd-button-group.ts';
import '../../layout/container/ndd-container.ts';

/**
 * Een visueel afgebakende kaart met optionele header, body en footer secties.
 * De kaart heeft een elevated look als standaard. Gebruik geneste containers
 * voor padding.
 *
 * ## Gebruik
 * ```html
 * <ndd-card>
 *   <ndd-container slot="header" padding-top="16" padding-inline="16">
 *     <ndd-title><h3>Titel</h3></ndd-title>
 *   </ndd-container>
 *   <ndd-container padding="16">
 *     <p>Inhoud van de kaart.</p>
 *   </ndd-container>
 *   <ndd-container slot="footer" padding-inline="16" padding-bottom="16">
 *     <ndd-button-group orientation="horizontal">
 *       <ndd-button variant="primary" text="Actie"></ndd-button>
 *     </ndd-button-group>
 *   </ndd-container>
 * </ndd-card>
 * ```
 */
export default {
	title: 'Components/Layout/Card',
	component: 'ndd-card',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/layout/card/ndd-card.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: { type: 'experimental' },
	},
};

export const Standaard = () => html`
	<ndd-card>
		<ndd-container slot="header" padding-top="16" padding-inline="16">
			<ndd-title size="4"><h3>Kaarttitel</h3></ndd-title>
		</ndd-container>
		<ndd-container padding="16">
			<ndd-rich-text>
				<p>Dit is de inhoud van de kaart. Gebruik een card om gerelateerde informatie
				visueel te groeperen met een duidelijke structuur van header, body en footer.</p>
			</ndd-rich-text>
		</ndd-container>
		<ndd-container slot="footer" padding-inline="16" padding-bottom="16">
			<ndd-button-group orientation="horizontal">
				<ndd-button variant="primary" text="Bevestig"></ndd-button>
				<ndd-button variant="secondary" text="Annuleer"></ndd-button>
			</ndd-button-group>
		</ndd-container>
	</ndd-card>
`;

export const AlleenBody = () => html`
	<ndd-card>
		<ndd-container padding="16">
			<ndd-rich-text>
				<p>Een kaart zonder header of footer. De header- en footer-secties worden
				automatisch verborgen als er geen content in geplaatst is.</p>
			</ndd-rich-text>
		</ndd-container>
	</ndd-card>
`;

export const MetHeader = () => html`
	<ndd-card>
		<ndd-container slot="header" padding-top="16" padding-inline="16">
			<ndd-title size="4"><h3>Alleen header en body</h3></ndd-title>
		</ndd-container>
		<ndd-container padding="16">
			<ndd-rich-text>
				<p>Een kaart met header en body, zonder footer.</p>
			</ndd-rich-text>
		</ndd-container>
	</ndd-card>
`;

export const VasteHoogte = () => html`
	<ndd-card style="height: 400px;">
		<ndd-container slot="header" padding-top="16" padding-inline="16">
			<ndd-title size="4"><h3>Vaste hoogte</h3></ndd-title>
		</ndd-container>
		<ndd-container padding="16">
			<ndd-rich-text>
				<p>Bij een vaste hoogte blijft de footer altijd aan de onderkant
				dankzij flex-grow op de main sectie.</p>
			</ndd-rich-text>
		</ndd-container>
		<ndd-container slot="footer" padding-inline="16" padding-bottom="16">
			<ndd-button-group orientation="horizontal">
				<ndd-button variant="primary" text="Actie"></ndd-button>
			</ndd-button-group>
		</ndd-container>
	</ndd-card>
`;
