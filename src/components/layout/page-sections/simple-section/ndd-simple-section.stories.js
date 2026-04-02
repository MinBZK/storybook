import { html } from 'lit';
import './ndd-simple-section.ts';
import '../../../content/rich-text/ndd-rich-text.ts';

/**
 * Gebruik een simple section als bouwsteen voor paginainhoud.
 * De sectie past padding en ruimte tussen header, inhoud en footer automatisch
 * aan op basis van de beschikbare breedte via container queries — geen attribuut nodig.
 *
 * ## Gebruik
 * ```html
 * <ndd-simple-section>
 *   <ndd-rich-text slot="header"><h2>Sectietitel</h2></ndd-rich-text>
 *   <ndd-rich-text><p>Inhoud van de sectie.</p></ndd-rich-text>
 *   <ndd-rich-text slot="footer"><p>Voetnoot of actie.</p></ndd-rich-text>
 * </ndd-simple-section>
 * ```
 */
export default {
	title: 'Components/Layout/Page Sections/Simple Section',
	component: 'ndd-simple-section',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/layout/page-sections/simple-section/ndd-simple-section.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
};

export const Standaard = () => html`
	<ndd-simple-section>
		<ndd-rich-text slot="header">
			<h2>Sectietitel</h2>
		</ndd-rich-text>
		<ndd-rich-text>
			<p>
				Dit is de hoofdinhoud van de sectie. Voeg hier tekst, formulieren of andere componenten toe.
			</p>
			<p>De ruimte tussen header, inhoud en footer wordt bepaald door de breedte van de sectie.</p>
		</ndd-rich-text>
		<ndd-rich-text slot="footer">
			<p>Voetnoot of aanvullende informatie.</p>
		</ndd-rich-text>
	</ndd-simple-section>
`;

export const ZonderHeaderEnFooter = () => html`
	<ndd-simple-section>
		<ndd-rich-text>
			<p>Een sectie zonder header en footer. Alleen de hoofdinhoud wordt getoond.</p>
		</ndd-rich-text>
	</ndd-simple-section>
`;
ZonderHeaderEnFooter.parameters = { controls: { disable: true } };
