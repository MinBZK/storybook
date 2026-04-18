import { html } from 'lit';
import './card.ts';
import '../../content/title/title.ts';
import '../../content/rich-text/rich-text.ts';
import '../../actions/button/button.ts';
import '../../actions/button-group/button-group.ts';
import '../../layout/container/container.ts';

/**
 * Een visueel afgebakende kaart met optionele header, body en footer secties.
 * De kaart heeft een elevated look als standaard. Gebruik geneste containers
 * voor padding.
 *
 * ## Gebruik
 * ```html
 * <nldd-card>
 *   <nldd-container slot="header" padding-top="16" padding-inline="16">
 *     <nldd-title><h3>Titel</h3></nldd-title>
 *   </nldd-container>
 *   <nldd-container padding="16">
 *     <p>Inhoud van de kaart.</p>
 *   </nldd-container>
 *   <nldd-container slot="footer" padding-inline="16" padding-bottom="16">
 *     <nldd-button-group orientation="horizontal">
 *       <nldd-button variant="primary" text="Actie"></nldd-button>
 *     </nldd-button-group>
 *   </nldd-container>
 * </nldd-card>
 * ```
 */
export default {
	title: 'Components/Layout/Card',
	component: 'nldd-card',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/layout/card/card.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: { type: 'experimental' },
	},
};

export const Standaard = () => html`
	<nldd-card>
		<nldd-container slot="header" padding-top="16" padding-inline="16">
			<nldd-title size="4"><h3>Kaarttitel</h3></nldd-title>
		</nldd-container>
		<nldd-container padding="16">
			<nldd-rich-text>
				<p>Dit is de inhoud van de kaart. Gebruik een card om gerelateerde informatie
				visueel te groeperen met een duidelijke structuur van header, body en footer.</p>
			</nldd-rich-text>
		</nldd-container>
		<nldd-container slot="footer" padding-inline="16" padding-bottom="16">
			<nldd-button-group orientation="horizontal">
				<nldd-button variant="primary" text="Bevestig"></nldd-button>
				<nldd-button variant="secondary" text="Annuleer"></nldd-button>
			</nldd-button-group>
		</nldd-container>
	</nldd-card>
`;

export const AlleenBody = () => html`
	<nldd-card>
		<nldd-container padding="16">
			<nldd-rich-text>
				<p>Een kaart zonder header of footer. De header- en footer-secties worden
				automatisch verborgen als er geen content in geplaatst is.</p>
			</nldd-rich-text>
		</nldd-container>
	</nldd-card>
`;

export const MetHeader = () => html`
	<nldd-card>
		<nldd-container slot="header" padding-top="16" padding-inline="16">
			<nldd-title size="4"><h3>Alleen header en body</h3></nldd-title>
		</nldd-container>
		<nldd-container padding="16">
			<nldd-rich-text>
				<p>Een kaart met header en body, zonder footer.</p>
			</nldd-rich-text>
		</nldd-container>
	</nldd-card>
`;

export const VasteHoogte = () => html`
	<nldd-card style="height: 400px;">
		<nldd-container slot="header" padding-top="16" padding-inline="16">
			<nldd-title size="4"><h3>Vaste hoogte</h3></nldd-title>
		</nldd-container>
		<nldd-container padding="16">
			<nldd-rich-text>
				<p>Bij een vaste hoogte blijft de footer altijd aan de onderkant
				dankzij flex-grow op de main sectie.</p>
			</nldd-rich-text>
		</nldd-container>
		<nldd-container slot="footer" padding-inline="16" padding-bottom="16">
			<nldd-button-group orientation="horizontal">
				<nldd-button variant="primary" text="Actie"></nldd-button>
			</nldd-button-group>
		</nldd-container>
	</nldd-card>
`;
