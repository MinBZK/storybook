import { html } from 'lit';
import './ndd-app-view.ts';
import '../split-views/navigation-split-view/ndd-navigation-split-view.ts';
import '../page/ndd-page.ts';
import '../page-sections/simple-section/ndd-simple-section.ts';
import '../container/ndd-container.ts';
import '../../content/rich-text/ndd-rich-text.ts';

/**
 * De <code>ndd-app-view</code> is de verplichte root shell van elke Nederlandse Digitale Dienst applicatie.
 * Hij bevat altijd een split view of een <code>ndd-page</code> als directe inhoud.
 *
 * ## Gebruik
 * ```html
 * <ndd-app-view>
 *   <ndd-navigation-split-view>...</ndd-navigation-split-view>
 * </ndd-app-view>
 * ```
 */
export default {
	title: 'Components/Layout/App View',
	component: 'ndd-app-view',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		componentSource: {
			file: 'src/components/layout/app-view/ndd-app-view.ts',
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
			description: 'Tinted achtergrond — cascade van --context-parent-background-color naar alle afstammelingen',
			table: { defaultValue: { summary: 'default' } },
		},
	},
	args: {
		background: 'default',
	},
};

export const MetHorizontalSplitView = ({ background }: { background: string }) => html`
	<ndd-app-view style="height: 600px;" background=${background}>
		<ndd-navigation-split-view>
			<ndd-page sticky-header slot="sidebar">
				<ndd-container slot="header" padding="16">
					<ndd-rich-text>
						<strong>Zijbalk</strong>
					</ndd-rich-text>
				</ndd-container>
				<ndd-simple-section>
					<ndd-rich-text>
						<h2>Navigatie</h2>
						<p>Wetten, regelingen en andere bronnen.</p>
					</ndd-rich-text>
				</ndd-simple-section>
			</ndd-page>

			<ndd-page sticky-header slot="secondary-sidebar">
				<ndd-container slot="header" padding="16">
					<ndd-rich-text>
						<strong>Secundaire zijbalk</strong>
					</ndd-rich-text>
				</ndd-container>
				<ndd-simple-section>
					<ndd-rich-text>
						<h2>Subnavigatie</h2>
						<p>Artikelen, hoofdstukken of andere subitems.</p>
					</ndd-rich-text>
				</ndd-simple-section>
			</ndd-page>

			<ndd-page sticky-header slot="main">
				<ndd-container slot="header" padding="16">
					<ndd-rich-text>
						<strong>Inhoud</strong>
					</ndd-rich-text>
				</ndd-container>
				<ndd-simple-section>
					<ndd-rich-text>
						<h2>Primaire inhoud</h2>
						<p>Artikelen, artikellijsten en primaire weergave.</p>
					</ndd-rich-text>
				</ndd-simple-section>
			</ndd-page>

			<ndd-page sticky-header slot="inspector">
				<ndd-container slot="header" padding="16">
					<ndd-rich-text>
						<strong>Inspecteur</strong>
					</ndd-rich-text>
				</ndd-container>
				<ndd-simple-section>
					<ndd-rich-text>
						<h2>Details</h2>
						<p>Eigenschappen en aanvullende informatie over de selectie.</p>
					</ndd-rich-text>
				</ndd-simple-section>
			</ndd-page>
		</ndd-navigation-split-view>
	</ndd-app-view>
`;

export const MetPagina = () => html`
	<ndd-app-view style="height: 600px;">
		<ndd-page sticky-header>
			<ndd-container slot="header" padding="16">
				<ndd-rich-text>
					<strong>Pagina</strong>
				</ndd-rich-text>
			</ndd-container>
			<ndd-simple-section>
				<ndd-rich-text>
					<h2>Inhoud</h2>
					<p>Een enkelvoudige pagina zonder split view.</p>
				</ndd-rich-text>
			</ndd-simple-section>
		</ndd-page>
	</ndd-app-view>
`;

/**
 * Elk split-view-paneel kan een eigen achtergrondkleur hebben.
 * Het instellen van tinted op een paneel laat --context-parent-background-color alleen
 * doorwerken naar de afstammelingen van dat paneel. Naburige panelen blijven ongewijzigd.
 */
export const TintedPerPaneel = () => html`
	<ndd-app-view style="height: 600px;">
		<ndd-navigation-split-view>
			<ndd-page sticky-header slot="sidebar" background="tinted">
				<ndd-container slot="header" padding="16">
					<ndd-rich-text>
						<strong>Zijbalk (tinted)</strong>
					</ndd-rich-text>
				</ndd-container>
				<ndd-simple-section>
					<ndd-rich-text>
						<h2>Navigatie</h2>
						<p>Deze zijbalk heeft een tinted achtergrond.</p>
					</ndd-rich-text>
				</ndd-simple-section>
			</ndd-page>

			<ndd-page sticky-header slot="main">
				<ndd-container slot="header" padding="16">
					<ndd-rich-text>
						<strong>Inhoud (normaal)</strong>
					</ndd-rich-text>
				</ndd-container>
				<ndd-simple-section>
					<ndd-rich-text>
						<h2>Primaire inhoud</h2>
						<p>Dit paneel heeft een normale achtergrond.</p>
					</ndd-rich-text>
				</ndd-simple-section>
			</ndd-page>
		</ndd-navigation-split-view>
	</ndd-app-view>
`;
TintedPerPaneel.parameters = { controls: { disable: true } };
