import { html } from 'lit';
import './rr-split-view-pane.ts';
import '../horizontal-split-view/rr-horizontal-split-view.ts';
import '../../page/rr-page.ts';
import '../../page-sections/simple-section/rr-simple-section.ts';
import '../../../content/rich-text/rr-rich-text.ts';
import '../../../navigation/top-title-bar/rr-top-title-bar.ts';

/**
 * Het <code>rr-split-view-pane</code> is een eenvoudige paneel-container voor gebruik
 * binnen split views. De split view stelt automatisch <code>mode</code> en
 * <code>hide-back</code> in op basis van de beschikbare ruimte en de paneelconfiguratie.
 *
 * De consumer stelt <code>has-content</code> in en plaatst een <code>rr-page</code>
 * met een <code>rr-top-title-bar</code> binnenin.
 *
 * Voeg de volgende CSS toe om de terugknop te verbergen wanneer <code>hide-back</code> actief is:
 * ```css
 * rr-split-view-pane[hide-back] rr-top-title-bar {
 *   --rr-top-title-bar-back-button-display: none;
 * }
 * ```
 *
 * ## Gebruik
 * ```html
 * <rr-split-view-pane slot="main" has-content>
 *   <rr-page sticky-header>
 *     <rr-top-title-bar slot="header" title="Inhoud" back-label="Terug"></rr-top-title-bar>
 *     ...
 *   </rr-page>
 * </rr-split-view-pane>
 * ```
 */
export default {
	title: 'Components/Layout/Split Views/Split View Pane',
	component: 'rr-split-view-pane',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		componentSource: {
			file: 'src/components/layout/split-views/split-view-pane/rr-split-view-pane.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		hasContent: {
			control: 'boolean',
			description: 'Het paneel heeft inhoud',
			table: { defaultValue: { summary: 'false' } },
		},
	},
	args: {
		hasContent: true,
	},
};

export const Standaard = ({ hasContent }) => html`
	<rr-horizontal-split-view
		style="height: 600px;"

	>
		<rr-split-view-pane slot="sidebar">
			<rr-page sticky-header>
				<rr-top-title-bar
					slot="header"
					title="Zijbalk"
				></rr-top-title-bar>
				<rr-simple-section>
					<rr-rich-text>
						<h2>Navigatie</h2>
						<p>Lorem ipsum dolor sit amet.</p>
					</rr-rich-text>
				</rr-simple-section>
			</rr-page>
		</rr-split-view-pane>

		<rr-split-view-pane slot="secondary-sidebar">
			<rr-page sticky-header>
				<rr-top-title-bar
					slot="header"
					title="Secundaire zijbalk"
					back-label="Zijbalk"
				></rr-top-title-bar>
				<rr-simple-section>
					<rr-rich-text>
						<h2>Subnavigatie</h2>
						<p>Sed ut perspiciatis.</p>
					</rr-rich-text>
				</rr-simple-section>
			</rr-page>
		</rr-split-view-pane>

		<rr-split-view-pane
			slot="main"
			?has-content=${hasContent}
		>
			<rr-page sticky-header>
				<rr-top-title-bar
					slot="header"
					title="Inhoud"
					back-label="Terug"
				></rr-top-title-bar>
				<rr-simple-section>
					<rr-rich-text>
						<h2>Primaire inhoud</h2>
						<p>Verklein het venster om de modi en terugknopgedrag te zien.</p>
					</rr-rich-text>
				</rr-simple-section>
			</rr-page>
		</rr-split-view-pane>

		<rr-split-view-pane slot="inspector">
			<rr-page sticky-header>
				<rr-top-title-bar
					slot="header"
					title="Inspecteur"
					dismiss-label="Sluit"
				></rr-top-title-bar>
				<rr-simple-section>
					<rr-rich-text>
						<h2>Details</h2>
						<p>Eigenschappen en aanvullende informatie.</p>
					</rr-rich-text>
				</rr-simple-section>
			</rr-page>
		</rr-split-view-pane>
	</rr-horizontal-split-view>
`;
