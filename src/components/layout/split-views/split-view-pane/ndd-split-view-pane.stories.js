import { html } from 'lit';
import './ndd-split-view-pane.ts';
import '../navigation-split-view/ndd-navigation-split-view.ts';
import '../../page/ndd-page.ts';
import '../../page-sections/simple-section/ndd-simple-section.ts';
import '../../../content/rich-text/ndd-rich-text.ts';
import '../../../navigation/top-title-bar/ndd-top-title-bar.ts';

/**
 * Het <code>ndd-split-view-pane</code> is een eenvoudige paneel-container voor gebruik
 * binnen split views. De split view stelt automatisch <code>mode</code> en
 * <code>hide-back</code> in op basis van de beschikbare ruimte en de paneelconfiguratie.
 *
 * De consumer stelt <code>has-content</code> in en plaatst een <code>ndd-page</code>
 * met een <code>ndd-top-title-bar</code> binnenin. Wanneer <code>hide-back</code> actief is,
 * verbergt het paneel automatisch de terugknop via de <code>--context-back-button-display</code>
 * CSS-variabele.
 *
 * ## Gebruik
 * ```html
 * <ndd-split-view-pane slot="main" has-content>
 *   <ndd-page sticky-header>
 *     <ndd-top-title-bar slot="header" title="Inhoud" back-label="Terug"></ndd-top-title-bar>
 *     ...
 *   </ndd-page>
 * </ndd-split-view-pane>
 * ```
 */
export default {
	title: 'Components/Layout/Split Views/Split View Pane',
	component: 'ndd-split-view-pane',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		componentSource: {
			file: 'src/components/layout/split-views/split-view-pane/ndd-split-view-pane.ts',
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
	<ndd-navigation-split-view
		style="height: 600px;"

	>
		<ndd-split-view-pane slot="sidebar">
			<ndd-page sticky-header>
				<ndd-top-title-bar
					slot="header"
					title="Zijbalk"
				></ndd-top-title-bar>
				<ndd-simple-section>
					<ndd-rich-text>
						<h2>Navigatie</h2>
						<p>Lorem ipsum dolor sit amet.</p>
					</ndd-rich-text>
				</ndd-simple-section>
			</ndd-page>
		</ndd-split-view-pane>

		<ndd-split-view-pane slot="secondary-sidebar">
			<ndd-page sticky-header>
				<ndd-top-title-bar
					slot="header"
					title="Secundaire zijbalk"
					back-label="Zijbalk"
				></ndd-top-title-bar>
				<ndd-simple-section>
					<ndd-rich-text>
						<h2>Subnavigatie</h2>
						<p>Sed ut perspiciatis.</p>
					</ndd-rich-text>
				</ndd-simple-section>
			</ndd-page>
		</ndd-split-view-pane>

		<ndd-split-view-pane
			slot="main"
			?has-content=${hasContent}
		>
			<ndd-page sticky-header>
				<ndd-top-title-bar
					slot="header"
					title="Inhoud"
					back-label="Terug"
				></ndd-top-title-bar>
				<ndd-simple-section>
					<ndd-rich-text>
						<h2>Primaire inhoud</h2>
						<p>Verklein het venster om de modi en terugknopgedrag te zien.</p>
					</ndd-rich-text>
				</ndd-simple-section>
			</ndd-page>
		</ndd-split-view-pane>

		<ndd-split-view-pane slot="inspector">
			<ndd-page sticky-header>
				<ndd-top-title-bar
					slot="header"
					title="Inspecteur"
					dismiss-label="Sluit"
				></ndd-top-title-bar>
				<ndd-simple-section>
					<ndd-rich-text>
						<h2>Details</h2>
						<p>Eigenschappen en aanvullende informatie.</p>
					</ndd-rich-text>
				</ndd-simple-section>
			</ndd-page>
		</ndd-split-view-pane>
	</ndd-navigation-split-view>
`;
