import { html } from 'lit';
import './rr-horizontal-split-view.ts';
import '../split-view-pane/rr-split-view-pane.ts';
import '../../page/rr-page.ts';
import '../../page-sections/simple-section/rr-simple-section.ts';
import '../../../content/rich-text/rr-rich-text.ts';
import '../../../actions/button/rr-button.ts';
import '../../../navigation/top-title-bar/rr-top-title-bar.ts';

/**
 * Gebruik een horizontal split view voor een vierkoloms navigatiepatroon met
 * een zijbalk, secundaire zijbalk, inhoudsgebied en inspecteur.
 *
 * Gebruik <code>rr-split-view-pane</code> als directe kinderen. De split view stelt
 * automatisch <code>hide-back</code> in op elk paneel op basis van de beschikbare ruimte.
 *
 * Stel <code>max-levels</code> in om de navigatiestructuur te bepalen:
 * - <code>1</code> (standaard): alleen inhoudsgebied
 * - <code>2</code>: zijbalk + inhoudsgebied
 * - <code>3</code>: zijbalk + secundaire zijbalk + inhoudsgebied
 * - <code>&gt;3</code>: zijbalk + inhoudsgebied, consumer beheert navigatiediepte
 *
 * ## Gebruik
 * ```html
 * <rr-horizontal-split-view max-levels="3">
 *   <rr-split-view-pane slot="sidebar">...</rr-split-view-pane>
 *   <rr-split-view-pane slot="secondary-sidebar">...</rr-split-view-pane>
 *   <rr-split-view-pane slot="main" has-content>...</rr-split-view-pane>
 *   <rr-split-view-pane slot="inspector">...</rr-split-view-pane>
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
		maxLevels: {
			control: 'number',
			description: 'Aantal navigatieniveaus inclusief inhoud (1 = alleen inhoud, 2 = zijbalk + inhoud, 3 = zijbalk + secundaire zijbalk + inhoud)',
			table: { defaultValue: { summary: '1' } },
		},
		inspectorAsSheet: {
			control: 'boolean',
			description: 'Toon de inspecteur altijd als sheet, ongeacht beschikbare ruimte',
			table: { defaultValue: { summary: 'false' } },
		},
	},
	args: {
		maxLevels: 3,
		inspectorAsSheet: false,
	},
};

export const Standaard = ({ maxLevels, inspectorAsSheet }) => {
	setTimeout(() => {
		const splitView = document.getElementById('split-view-demo');
		const button = document.getElementById('inspector-toggle');
		if (!splitView || !button) return;

		const updateButton = () => {
			button.hidden = !splitView.hasAttribute('inspector-auto-hidden') && !splitView.hasAttribute('inspector-as-sheet');
		};

		updateButton();

		new MutationObserver(updateButton).observe(splitView, {
			attributes: true,
			attributeFilter: ['inspector-auto-hidden', 'inspector-as-sheet'],
		});

		button.addEventListener('click', () => splitView.showInspectorSheet());
	}, 0);

	return html`
		<rr-horizontal-split-view
			id="split-view-demo"
			style="height: 600px;"
			max-levels=${maxLevels}
			?inspector-as-sheet=${inspectorAsSheet}
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
							<p>Wetten, regelingen en andere bronnen.</p>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
		</rr-horizontal-split-view>
	`;
};
