import { html } from 'lit';
import './rr-navigation-split-view.ts';
import '../../app-view/rr-app-view.ts';
import '../../page/rr-page.ts';
import '../../page-sections/simple-section/rr-simple-section.ts';
import '../../../content/rich-text/rr-rich-text.ts';
import '../../../actions/button/rr-button.ts';
import '../../../navigation/top-title-bar/rr-top-title-bar.ts';

/**
 * Gebruik een navigation split view voor een vierkoloms navigatiepatroon met
 * een zijbalk, secundaire zijbalk, inhoudsgebied en inspecteur.
 *
 * Gebruik <code>rr-split-view-pane</code> als directe kinderen. De split view stelt
 * automatisch <code>hide-back</code> in op elk paneel op basis van de beschikbare ruimte.
 * Panelen worden automatisch getoond wanneer inhoud in de bijbehorende slot wordt geplaatst.
 *
 * ## Gebruik
 * ```html
 * <rr-navigation-split-view>
 *   <rr-split-view-pane slot="sidebar">...</rr-split-view-pane>
 *   <rr-split-view-pane slot="secondary-sidebar">...</rr-split-view-pane>
 *   <rr-split-view-pane slot="main" has-content>...</rr-split-view-pane>
 *   <rr-split-view-pane slot="inspector">...</rr-split-view-pane>
 * </rr-navigation-split-view>
 * ```
 */
export default {
	title: 'Components/Layout/Split Views/Navigation Split View',
	component: 'rr-navigation-split-view',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		componentSource: {
			file: 'src/components/layout/split-views/navigation-split-view/rr-navigation-split-view.ts',
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
	setTimeout(() => {
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
	}, 0);

	return html`
		<rr-navigation-split-view
			id="split-view-demo"
			style="height: 600px;"
			?inspector-as-sheet=${inspectorAsSheet}
			?sidebar-as-sheet=${sidebarAsSheet}
		>
			<rr-split-view-pane slot="sidebar">
				<rr-page sticky-header>
					<rr-top-title-bar
						slot="header"
						title="Zijbalk"
						dismiss-label="Sluit"
					></rr-top-title-bar>
					<rr-simple-section>
						<rr-rich-text>
							<h2>Navigatie</h2>
							<p>Wetten, regelingen en andere bronnen.</p>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</rr-rich-text>
					</rr-simple-section>
				</rr-page>
			</rr-split-view-pane>

			<rr-split-view-pane slot="secondary-sidebar" has-content>
				<rr-page sticky-header>
					<rr-top-title-bar
						slot="header"
						title="Secundaire zijbalk"
						back-label="Zijbalk"
						dismiss-label="Sluit"
					></rr-top-title-bar>
					<rr-simple-section>
						<rr-rich-text>
							<h2>Subnavigatie</h2>
							<p>Artikelen, hoofdstukken of andere subitems.</p>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</p>
						</rr-rich-text>
					</rr-simple-section>
				</rr-page>
			</rr-split-view-pane>

			<rr-split-view-pane slot="main" has-content>
				<rr-page sticky-header>
					<rr-top-title-bar
						slot="header"
						title="Inhoud"
						back-label="Terug"
					>
						<rr-button
							id="sidebar-toggle"
							slot="toolbar"
							variant="accent-transparent"
						>
							Navigatie
						</rr-button>
						<rr-button
							id="inspector-toggle"
							slot="toolbar"
							variant="accent-transparent"
						>
							Inspecteur
						</rr-button>
					</rr-top-title-bar>
					<rr-simple-section>
						<rr-rich-text>
							<h2>Primaire inhoud</h2>
							<p>Artikelen, artikellijsten en primaire weergave.</p>
							<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
							<p>Verklein het venster om de terugknopgedrag te zien.</p>
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
							<p>Eigenschappen en aanvullende informatie over de selectie.</p>
							<p>Excepteur sint occaecat cupidatat non proident.</p>
						</rr-rich-text>
					</rr-simple-section>
				</rr-page>
			</rr-split-view-pane>
		</rr-navigation-split-view>
	`;
};

/**
 * Split views can be nested. Here a bar split view is placed inside
 * the main pane of a navigation split view, creating an editor-like layout
 * with a sidebar, an editor area, and an output panel below it.
 */
export const GenestdeSplitView = () => html`
	<rr-navigation-split-view
		style="height: 600px;"
	>
		<rr-split-view-pane slot="sidebar">
			<rr-page sticky-header>
				<rr-top-title-bar
					slot="header"
					title="Zijbalk"
					dismiss-label="Sluit"
				></rr-top-title-bar>
				<rr-simple-section>
					<rr-rich-text>
						<h2>Navigatie</h2>
						<p>Wetten, regelingen en andere bronnen.</p>
					</rr-rich-text>
				</rr-simple-section>
			</rr-page>
		</rr-split-view-pane>

		<rr-split-view-pane slot="main" has-content>
			<rr-bar-split-view>
				<rr-split-view-pane slot="main">
					<rr-page sticky-header>
						<rr-top-title-bar
							slot="header"
							title="Inhoud"
							back-label="Terug"
						></rr-top-title-bar>
						<rr-simple-section>
							<rr-rich-text>
								<h2>Primaire inhoud</h2>
								<p>Het hoofdgebied voor bewerkbare of weer te geven inhoud.</p>
								<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
							</rr-rich-text>
						</rr-simple-section>
					</rr-page>
				</rr-split-view-pane>

				<rr-split-view-pane slot="secondary-bar">
					<rr-page sticky-header>
						<rr-top-title-bar
							slot="header"
							title="Uitvoer"
						></rr-top-title-bar>
						<rr-simple-section>
							<rr-rich-text>
								<p>Logboeken, validatieresultaten en statusinformatie.</p>
							</rr-rich-text>
						</rr-simple-section>
					</rr-page>
				</rr-split-view-pane>
			</rr-bar-split-view>
		</rr-split-view-pane>
	</rr-navigation-split-view>
`;
GenestdeSplitView.parameters = { controls: { disable: true } };
