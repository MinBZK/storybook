import { html } from 'lit';
import './rr-simple-section.ts';
import '../../../content/rich-text/rr-rich-text.ts';

/**
 * Gebruik een simple section als bouwsteen voor paginainhoud.
 * De sectie past padding en ruimte tussen header, inhoud en footer automatisch
 * aan op basis van de beschikbare breedte via container queries — geen attribuut nodig.
 *
 * ## Gebruik
 * ```html
 * <rr-simple-section>
 *   <rr-rich-text slot="header"><h2>Sectietitel</h2></rr-rich-text>
 *   <rr-rich-text><p>Inhoud van de sectie.</p></rr-rich-text>
 *   <rr-rich-text slot="footer"><p>Voetnoot of actie.</p></rr-rich-text>
 * </rr-simple-section>
 * ```
 */
export default {
	title: 'Components/Layout/Page Sections/Simple Section',
	component: 'rr-simple-section',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/layout/page-sections/simple-section/rr-simple-section.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
};

export const Standaard = () => html`
	<rr-simple-section>
		<rr-rich-text slot="header">
			<h2>Sectietitel</h2>
		</rr-rich-text>
		<rr-rich-text>
			<p>Dit is de hoofdinhoud van de sectie. Voeg hier tekst, formulieren of andere componenten toe.</p>
			<p>De ruimte tussen header, inhoud en footer wordt bepaald door de breedte van de sectie.</p>
		</rr-rich-text>
		<rr-rich-text slot="footer">
			<p>Voetnoot of aanvullende informatie.</p>
		</rr-rich-text>
	</rr-simple-section>
`;

export const ZonderHeaderEnFooter = () => html`
	<rr-simple-section>
		<rr-rich-text>
			<p>Een sectie zonder header en footer. Alleen de hoofdinhoud wordt getoond.</p>
		</rr-rich-text>
	</rr-simple-section>
`;
ZonderHeaderEnFooter.parameters = { controls: { disable: true } };
