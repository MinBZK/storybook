import { html } from 'lit';
import './simple-section.js';
import '../../../content/rich-text/rich-text.js';

/**
 * Gebruik een simple section als bouwsteen voor paginainhoud.
 * De sectie past padding en ruimte tussen header, inhoud en footer automatisch
 * aan op basis van de beschikbare breedte via container queries — geen attribuut nodig.
 *
 * ## Gebruik
 * ```html
 * <nldd-simple-section>
 *   <nldd-rich-text slot="header"><h2>Sectietitel</h2></nldd-rich-text>
 *   <nldd-rich-text><p>Inhoud van de sectie.</p></nldd-rich-text>
 *   <nldd-rich-text slot="footer"><p>Voetnoot of actie.</p></nldd-rich-text>
 * </nldd-simple-section>
 * ```
 */
export default {
	title: 'Components/Layout/Page Sections/Simple Section',
	component: 'nldd-simple-section',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/layout/page-sections/simple-section/simple-section.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
};

export const Standaard = () => html`
	<nldd-simple-section>
		<nldd-rich-text slot="header">
			<h2>Sectietitel</h2>
		</nldd-rich-text>
		<nldd-rich-text>
			<p>Dit is de hoofdinhoud van de sectie. Voeg hier tekst, formulieren of andere componenten toe.</p>
			<p>De ruimte tussen header, inhoud en footer wordt bepaald door de breedte van de sectie.</p>
		</nldd-rich-text>
		<nldd-rich-text slot="footer">
			<p>Voetnoot of aanvullende informatie.</p>
		</nldd-rich-text>
	</nldd-simple-section>
`;

export const ZonderHeaderEnFooter = {
	render: () => html`
	<nldd-simple-section>
		<nldd-rich-text>
			<p>Een sectie zonder header en footer. Alleen de hoofdinhoud wordt getoond.</p>
		</nldd-rich-text>
	</nldd-simple-section>
`,
	parameters: { controls: { disable: true } },
};
