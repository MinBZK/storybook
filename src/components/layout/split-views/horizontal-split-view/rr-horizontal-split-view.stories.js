import { html } from 'lit';
import './rr-horizontal-split-view.ts';
import '../../../layout/page/rr-page.ts';
import '../../../layout/page-sections/simple-section/rr-simple-section.ts';
import '../../../content/rich-text/rr-rich-text.ts';

/**
 * Gebruik een horizontal split view voor een driekoloms navigatiepatroon met
 * een zijbalk, inhoudsgebied en inspecteur. De zijbalk en inspecteur hebben
 * een vaste breedte; het inhoudsgebied neemt de resterende ruimte in.
 * Panelen zijn minimaal 320px breed; panelen die niet passen worden automatisch verborgen.
 *
 * ## Gebruik
 * ```html
 * <rr-horizontal-split-view>
 *   <rr-page slot="sidebar">...</rr-page>
 *   <rr-page slot="main">...</rr-page>
 *   <rr-page slot="inspector">...</rr-page>
 * </rr-horizontal-split-view>
 * ```
 */
export default {
	title: 'Components/Layout/Split Views/Horizontal Split View',
	component: 'rr-horizontal-split-view',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		componentSource: {
			file: 'src/components/layout/split-views/horizontal-split-view/rr-horizontal-split-view.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		showSidebar: {
			control: 'boolean',
			description: 'Toon de zijbalk',
			table: { defaultValue: { summary: 'true' } },
		},
		showInspector: {
			control: 'boolean',
			description: 'Toon de inspecteur',
			table: { defaultValue: { summary: 'true' } },
		},
	},
	args: {
		showSidebar: true,
		showInspector: true,
	},
};

export const Standaard = ({ showSidebar, showInspector }) => html`
	<rr-horizontal-split-view
		style="height: 600px;"
		?show-sidebar=${showSidebar}
		?show-inspector=${showInspector}
	>
		<rr-page sticky-header slot="sidebar">
			<rr-rich-text slot="header" style="padding: 16px;">
				<strong>Zijbalk</strong>
			</rr-rich-text>
			<rr-simple-section>
				<rr-rich-text>
					<h2>Navigatie</h2>
					<p>Wetten, regelingen en andere bronnen.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				</rr-rich-text>
			</rr-simple-section>
		</rr-page>

		<rr-page sticky-header slot="main">
			<rr-rich-text slot="header" style="padding: 16px;">
				<strong>Inhoud</strong>
			</rr-rich-text>
			<rr-simple-section>
				<rr-rich-text>
					<h2>Primaire inhoud</h2>
					<p>Artikelen, artikellijsten en primaire weergave.</p>
					<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
					<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
				</rr-rich-text>
			</rr-simple-section>
		</rr-page>

		<rr-page sticky-header slot="inspector">
			<rr-rich-text slot="header" style="padding: 16px;">
				<strong>Inspecteur</strong>
			</rr-rich-text>
			<rr-simple-section>
				<rr-rich-text>
					<h2>Details</h2>
					<p>Eigenschappen en aanvullende informatie over de selectie.</p>
					<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				</rr-rich-text>
			</rr-simple-section>
		</rr-page>
	</rr-horizontal-split-view>
`;
