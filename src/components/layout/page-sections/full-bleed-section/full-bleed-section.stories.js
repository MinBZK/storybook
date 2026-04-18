import { html } from 'lit';
import './full-bleed-section.ts';
import '../../../content/rich-text/rich-text.ts';

/**
 * Gebruik een full bleed section voor inhoud die van rand tot rand loopt,
 * zoals achtergrondkleuren, afbeeldingen of uitgelichte blokken.
 * In tegenstelling tot de simple section heeft de full bleed section geen
 * horizontale padding — de inhoud bepaalt zelf zijn breedte.
 * Verticale padding en gap passen zich automatisch aan via container queries.
 *
 * ## Gebruik
 * ```html
 * <nldd-full-bleed-section>
 *   <nldd-rich-text slot="header"><h2>Sectietitel</h2></nldd-rich-text>
 *   <nldd-rich-text><p>Inhoud van de sectie.</p></nldd-rich-text>
 * </nldd-full-bleed-section>
 * ```
 */
export default {
	title: 'Components/Layout/Page Sections/Full Bleed Section',
	component: 'nldd-full-bleed-section',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/layout/page-sections/full-bleed-section/full-bleed-section.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
};

export const Standaard = () => html`
	<nldd-full-bleed-section>
		<nldd-rich-text slot="header">
			<h2>Sectietitel</h2>
		</nldd-rich-text>
		<nldd-rich-text>
			<p>Dit is de hoofdinhoud van de sectie. De inhoud loopt van rand tot rand zonder horizontale padding.</p>
			<p>Gebruik deze sectie voor achtergrondkleuren, afbeeldingen of andere inhoud die de volledige breedte beslaat.</p>
		</nldd-rich-text>
		<nldd-rich-text slot="footer">
			<p>Voetnoot of aanvullende informatie.</p>
		</nldd-rich-text>
	</nldd-full-bleed-section>
`;

export const ZonderHeaderEnFooter = () => html`
	<nldd-full-bleed-section>
		<nldd-rich-text>
			<p>Een full bleed section zonder header en footer.</p>
		</nldd-rich-text>
	</nldd-full-bleed-section>
`;
ZonderHeaderEnFooter.parameters = { controls: { disable: true } };
