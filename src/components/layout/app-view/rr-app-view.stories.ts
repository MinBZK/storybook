import { html } from 'lit';
import './rr-app-view.ts';
import '../split-views/navigation-split-view/rr-navigation-split-view.ts';
import '../page/rr-page.ts';
import '../page-sections/simple-section/rr-simple-section.ts';
import '../../content/rich-text/rr-rich-text.ts';

/**
 * De <code>rr-app-view</code> is de verplichte root shell van elke RegelRecht applicatie.
 * Hij bevat altijd een split view of een <code>rr-page</code> als directe inhoud.
 *
 * ## Gebruik
 * ```html
 * <rr-app-view>
 *   <rr-navigation-split-view>...</rr-navigation-split-view>
 * </rr-app-view>
 * ```
 */
export default {
	title: 'Components/Layout/App View',
	component: 'rr-app-view',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		componentSource: {
			file: 'src/components/layout/app-view/rr-app-view.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		background: {
			control: { type: 'select' },
			options: ['default', 'tinted'],
			description: 'Tinted achtergrond — cascade van --context-background-color naar alle afstammelingen',
			table: { defaultValue: { summary: 'default' } },
		},
	},
	args: {
		background: 'default',
	},
};

export const MetHorizontalSplitView = ({ background }) => html`
	<rr-app-view style="height: 600px;" background=${background}>
		<rr-navigation-split-view>
			<rr-page sticky-header slot="sidebar">
				<rr-rich-text slot="header" style="padding: 16px;">
					<strong>Zijbalk</strong>
				</rr-rich-text>
				<rr-simple-section>
					<rr-rich-text>
						<h2>Navigatie</h2>
						<p>Wetten, regelingen en andere bronnen.</p>
					</rr-rich-text>
				</rr-simple-section>
			</rr-page>

			<rr-page sticky-header slot="secondary-sidebar">
				<rr-rich-text slot="header" style="padding: 16px;">
					<strong>Secundaire zijbalk</strong>
				</rr-rich-text>
				<rr-simple-section>
					<rr-rich-text>
						<h2>Subnavigatie</h2>
						<p>Artikelen, hoofdstukken of andere subitems.</p>
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
					</rr-rich-text>
				</rr-simple-section>
			</rr-page>
		</rr-navigation-split-view>
	</rr-app-view>
`;

export const MetPagina = () => html`
	<rr-app-view style="height: 600px;">
		<rr-page sticky-header>
			<rr-rich-text slot="header" style="padding: 16px;">
				<strong>Pagina</strong>
			</rr-rich-text>
			<rr-simple-section>
				<rr-rich-text>
					<h2>Inhoud</h2>
					<p>Een enkelvoudige pagina zonder split view.</p>
				</rr-rich-text>
			</rr-simple-section>
		</rr-page>
	</rr-app-view>
`;

/**
 * Each split view pane can have its own background color independently.
 * Setting tinted on a pane cascades --context-background-color only to that pane's descendants.
 * Sibling panes remain unaffected.
 */
export const TintedPerPaneel = () => html`
	<rr-app-view style="height: 600px;">
		<rr-navigation-split-view>
			<rr-page sticky-header slot="sidebar" background="tinted">
				<rr-rich-text slot="header" style="padding: 16px;">
					<strong>Zijbalk (tinted)</strong>
				</rr-rich-text>
				<rr-simple-section>
					<rr-rich-text>
						<h2>Navigatie</h2>
						<p>Deze zijbalk heeft een tinted achtergrond.</p>
					</rr-rich-text>
				</rr-simple-section>
			</rr-page>

			<rr-page sticky-header slot="main">
				<rr-rich-text slot="header" style="padding: 16px;">
					<strong>Inhoud (normaal)</strong>
				</rr-rich-text>
				<rr-simple-section>
					<rr-rich-text>
						<h2>Primaire inhoud</h2>
						<p>Dit paneel heeft een normale achtergrond.</p>
					</rr-rich-text>
				</rr-simple-section>
			</rr-page>
		</rr-navigation-split-view>
	</rr-app-view>
`;
TintedPerPaneel.parameters = { controls: { disable: true } };
