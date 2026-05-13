import { html, nothing } from 'lit';
import './full-bleed-section.js';
import '../../../content/rich-text/rich-text.js';

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
	argTypes: {
		width: {
			control: 'text',
			description: 'Body max-width: "full" removes the constraint, of een CSS length (bv. "480px") overschrijft de default max-width',
			table: { defaultValue: { summary: '' } },
		},
	},
	args: {
		width: '',
	},
};

export const Standaard = {
	render: ({ width }: Record<string, any>) => html`
		<nldd-full-bleed-section width=${width || nothing}>
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
	`,
};

export const ZonderHeaderEnFooter = {
	render: () => html`
	<nldd-full-bleed-section>
		<nldd-rich-text>
			<p>Een full bleed section zonder header en footer.</p>
		</nldd-rich-text>
	</nldd-full-bleed-section>
`,
	parameters: { controls: { disable: true } },
};
