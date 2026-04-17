import { html } from 'lit';
import './ndd-navigation-split-view.ts';
import '../../app-view/ndd-app-view.ts';
import '../../page/ndd-page.ts';
import '../../page-sections/simple-section/ndd-simple-section.ts';
import '../../../content/rich-text/ndd-rich-text.ts';
import '../../../actions/button/ndd-button.ts';
import '../../../navigation/top-title-bar/ndd-top-title-bar.ts';

/**
 * Gebruik een navigation split view voor een vierkoloms navigatiepatroon met
 * een zijbalk, secundaire zijbalk, inhoudsgebied en inspecteur.
 *
 * Gebruik <code>ndd-split-view-pane</code> als directe kinderen. De split view stelt
 * automatisch <code>hide-back</code> in op elk paneel op basis van de beschikbare ruimte.
 * Panelen worden automatisch getoond wanneer inhoud in de bijbehorende slot wordt geplaatst.
 *
 * ## Gebruik
 * ```html
 * <ndd-navigation-split-view>
 *   <ndd-split-view-pane slot="sidebar">...</ndd-split-view-pane>
 *   <ndd-split-view-pane slot="secondary-sidebar">...</ndd-split-view-pane>
 *   <ndd-split-view-pane slot="main" has-content>...</ndd-split-view-pane>
 *   <ndd-split-view-pane slot="inspector">...</ndd-split-view-pane>
 * </ndd-navigation-split-view>
 * ```
 */
export default {
	title: 'Components/Layout/Split Views/Navigation Split View',
	component: 'ndd-navigation-split-view',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		componentSource: {
			file: 'src/components/layout/split-views/navigation-split-view/ndd-navigation-split-view.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		inspectorAsSheet: {
			control: 'boolean',
			description: 'Toon de inspecteur altijd als sheet, ongeacht beschikbare ruimte',
			table: { defaultValue: { summary: 'false' } },
		},
		sidebarAsSheet: {
			control: 'boolean',
			description: 'Toon de zijbalk altijd als sheet, inhoudsgebied blijft altijd zichtbaar',
			table: { defaultValue: { summary: 'false' } },
		},
	},
	args: {
		inspectorAsSheet: false,
		sidebarAsSheet: false,
	},
};

export const Standaard = ({ inspectorAsSheet, sidebarAsSheet }) => {
	customElements.whenDefined('ndd-navigation-split-view').then(() => {
		const splitView = document.getElementById('split-view-demo');
		const inspectorButton = document.getElementById('inspector-toggle');
		const navButton = document.getElementById('sidebar-toggle');
		if (!splitView) return;

		const updateInspectorButton = () => {
			if (inspectorButton) {
				inspectorButton.hidden = !splitView.hasAttribute('inspector-auto-hidden') && !splitView.hasAttribute('inspector-as-sheet');
			}
		};

		const updateNavButton = () => {
			if (navButton) {
				navButton.hidden = !splitView.hasAttribute('sidebar-as-sheet');
			}
		};

		updateInspectorButton();
		updateNavButton();

		new MutationObserver(() => { updateInspectorButton(); updateNavButton(); }).observe(splitView, {
			attributes: true,
			attributeFilter: ['inspector-auto-hidden', 'inspector-as-sheet', 'sidebar-as-sheet'],
		});

		inspectorButton?.addEventListener('click', () => splitView.showInspectorSheet());
		navButton?.addEventListener('click', () => splitView.showSidebarSheet());
	});

	return html`
		<ndd-navigation-split-view
			id="split-view-demo"
			style="height: 600px;"
			?inspector-as-sheet=${inspectorAsSheet}
			?sidebar-as-sheet=${sidebarAsSheet}
		>
			<ndd-split-view-pane slot="sidebar">
				<ndd-page sticky-header>
					<ndd-top-title-bar
						slot="header"
						text="Zijbalk"
						dismiss-text="Sluit"
					></ndd-top-title-bar>
					<ndd-simple-section>
						<ndd-rich-text>
							<h2>Navigatie</h2>
							<p>Wetten, regelingen en andere bronnen.</p>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
							<p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
							<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
							<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
							<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
							<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
							<p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
							<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.</p>
							<p>Et harum quidem rerum facilis est et expedita distinctio.</p>
							<p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet.</p>
						</ndd-rich-text>
					</ndd-simple-section>
				</ndd-page>
			</ndd-split-view-pane>

			<ndd-split-view-pane slot="secondary-sidebar" has-content>
				<ndd-page sticky-header>
					<ndd-top-title-bar
						slot="header"
						text="Secundaire zijbalk"
						back-text="Zijbalk"
						dismiss-text="Sluit"
					></ndd-top-title-bar>
					<ndd-simple-section>
						<ndd-rich-text>
							<h2>Subnavigatie</h2>
							<p>Artikelen, hoofdstukken of andere subitems.</p>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</p>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
							<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
							<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
							<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
							<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
							<p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.</p>
							<p>At vero eos et accusamus et iusto odio dignissimos ducimus.</p>
						</ndd-rich-text>
					</ndd-simple-section>
				</ndd-page>
			</ndd-split-view-pane>

			<ndd-split-view-pane slot="main" has-content>
				<ndd-page sticky-header>
					<ndd-top-title-bar
						slot="header"
						text="Inhoud"
						back-text="Terug"
					>
						<ndd-button
							id="sidebar-toggle"
							slot="toolbar"
							variant="accent-transparent"
							text="Navigatie"
						></ndd-button>
						<ndd-button
							id="inspector-toggle"
							slot="toolbar"
							variant="accent-transparent"
							text="Inspecteur"
						></ndd-button>
					</ndd-top-title-bar>
					<ndd-simple-section>
						<ndd-rich-text>
							<h2>Primaire inhoud</h2>
							<p>Artikelen, artikellijsten en primaire weergave.</p>
							<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
							<p>Verklein het venster om de terugknopgedrag te zien.</p>
						</ndd-rich-text>
					</ndd-simple-section>
				</ndd-page>
			</ndd-split-view-pane>

			<ndd-split-view-pane slot="inspector">
				<ndd-page sticky-header>
					<ndd-top-title-bar
						slot="header"
						text="Inspecteur"
						dismiss-text="Sluit"
					></ndd-top-title-bar>
					<ndd-simple-section>
						<ndd-rich-text>
							<h2>Details</h2>
							<p>Eigenschappen en aanvullende informatie over de selectie.</p>
							<p>Excepteur sint occaecat cupidatat non proident.</p>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
							<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
							<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
							<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
							<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
							<p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
							<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.</p>
							<p>Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio.</p>
							<p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates.</p>
						</ndd-rich-text>
					</ndd-simple-section>
				</ndd-page>
			</ndd-split-view-pane>
		</ndd-navigation-split-view>
	`;
};

/**
 * Split views can be nested. Here a bar split view is placed inside
 * the main pane of a navigation split view, creating an editor-like layout
 * with a sidebar, an editor area, and an output panel below it.
 */
export const GenestdeSplitView = () => html`
	<ndd-navigation-split-view
		style="height: 600px;"
	>
		<ndd-split-view-pane slot="sidebar">
			<ndd-page sticky-header>
				<ndd-top-title-bar
					slot="header"
					text="Zijbalk"
					dismiss-text="Sluit"
				></ndd-top-title-bar>
				<ndd-simple-section>
					<ndd-rich-text>
						<h2>Navigatie</h2>
						<p>Wetten, regelingen en andere bronnen.</p>
					</ndd-rich-text>
				</ndd-simple-section>
			</ndd-page>
		</ndd-split-view-pane>

		<ndd-split-view-pane slot="main" has-content>
			<ndd-bar-split-view>
				<ndd-split-view-pane slot="main">
					<ndd-page sticky-header>
						<ndd-top-title-bar
							slot="header"
							text="Inhoud"
							back-text="Terug"
						></ndd-top-title-bar>
						<ndd-simple-section>
							<ndd-rich-text>
								<h2>Primaire inhoud</h2>
								<p>Het hoofdgebied voor bewerkbare of weer te geven inhoud.</p>
								<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
							</ndd-rich-text>
						</ndd-simple-section>
					</ndd-page>
				</ndd-split-view-pane>
				<ndd-split-view-pane slot="secondary-bar">
					<ndd-container padding="16">
						<ndd-button variant="primary" full-width text="Secondaire balk"></ndd-button>
					</ndd-container>
				</ndd-split-view-pane>
			</ndd-bar-split-view>
		</ndd-split-view-pane>
	</ndd-navigation-split-view>
`;
GenestdeSplitView.parameters = { controls: { disable: true } };
