import { html } from 'lit';
import './rr-bar-split-view.ts';
import '../split-view-pane/rr-split-view-pane.ts';
import '../../container/rr-container.ts';
import '../../page/rr-page.ts';
import '../../page-sections/simple-section/rr-simple-section.ts';
import '../../../content/rich-text/rr-rich-text.ts';
import '../../../inputs/search-field/rr-search-field.ts';

/**
 * Gebruik een bar split view voor een verticale layout met een main-gebied en een
 * onbeperkt aantal balkpanelen. Geef elke balk een unieke slotnaam (bijv.
 * slot="toolbar", slot="status"). Het main-paneel gebruikt altijd slot="main".
 *
 * Balken zijn zichtbaar zodra er inhoud in hun slot staat. Op sm-viewports
 * worden balken absoluut over het main-gebied gepositioneerd; op md en lg staan
 * alle panelen in de flow met een scheiding ertussen.
 *
 * Gebruik sm-order, md-order en lg-order om de volgorde per breekpunt te bepalen.
 * Zonder orderattributen wordt DOM-volgorde gebruikt.
 *
 * ## Gebruik
 * ```html
 * <rr-bar-split-view>
 *   <rr-split-view-pane slot="toolbar" sm-order="1" md-order="1">...</rr-split-view-pane>
 *   <rr-split-view-pane slot="main"    sm-order="2" md-order="2">...</rr-split-view-pane>
 *   <rr-split-view-pane slot="status"  sm-order="3" md-order="3">...</rr-split-view-pane>
 * </rr-bar-split-view>
 * ```
 */
export default {
	title: 'Components/Layout/Split Views/Bar Split View',
	component: 'rr-bar-split-view',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		componentSource: {
			file: 'src/components/layout/split-views/bar-split-view/rr-bar-split-view.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		background: {
			control: { type: 'select' },
			options: ['inherit', 'default', 'tinted'],
			description: 'Achtergrondkleur — cascade van --context-parent-background-color naar alle afstammelingen inclusief rr-page en de fade-overlays',
			table: { defaultValue: { summary: 'inherit' } },
		},
	},
	args: {
		background: 'inherit',
	},
};

export const Standaard = (args) => html`
	<rr-bar-split-view style="height: 600px;" background=${args.background}>
		<rr-split-view-pane slot="toolbar"
			sm-order="1"
			md-order="1"
			lg-order="1">
			<rr-container padding-inline="16" padding-block="12">
				<rr-button variant="primary" full-width>Werkbalk</rr-button>
			</rr-container>
		</rr-split-view-pane>
		<rr-split-view-pane slot="main"
			sm-order="2"
			md-order="2"
			lg-order="2">
			<rr-page sticky-header>
				<rr-rich-text slot="header" style="padding: 16px;">
					<strong>Inhoud</strong>
				</rr-rich-text>
				<rr-simple-section>
					<rr-rich-text>
						<h2>Primaire inhoud</h2>
						<p>Het hoofdgebied voor bewerkbare of weer te geven inhoud.</p>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
						<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
						<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
					</rr-rich-text>
				</rr-simple-section>
			</rr-page>
		</rr-split-view-pane>
		<rr-split-view-pane slot="status"
			sm-order="3"
			md-order="3"
			lg-order="3">
			<rr-container padding-inline="16" padding-block="12" sm-padding-bottom="none">
				<rr-search-field placeholder="Statusbalk"></rr-search-field>
			</rr-container>
		</rr-split-view-pane>
	</rr-bar-split-view>
`;

export const AlleenWerkbalk = () => html`
	<rr-bar-split-view style="height: 600px;">
		<rr-split-view-pane slot="toolbar" background="tinted">
			<rr-container padding="12">
				<rr-button variant="primary" full-width>Werkbalk</rr-button>
			</rr-container>
		</rr-split-view-pane>
		<rr-split-view-pane slot="main">
			<rr-page>
				<rr-simple-section>
					<rr-rich-text>
						<h2>Primaire inhoud</h2>
						<p>Geen statusbalk — het status-slot is leeg.</p>
					</rr-rich-text>
				</rr-simple-section>
			</rr-page>
		</rr-split-view-pane>
	</rr-bar-split-view>
`;
AlleenWerkbalk.parameters = { controls: { disable: true } };

// On sm: main is visible at top, toolbar moves to a bottom bar.
// On md/lg: toolbar is above main, status is below, matching DOM order.
export const WisselVolgorde = () => html`
	<rr-bar-split-view style="height: 600px;">
		<rr-split-view-pane slot="toolbar"
			sm-order="2"
			md-order="1"
			lg-order="1">
			<rr-container padding-inline="16" padding-block="12">
				<rr-button variant="primary" full-width>Werkbalk (sm: onderaan, md/lg: bovenaan)</rr-button>
			</rr-container>
		</rr-split-view-pane>
		<rr-split-view-pane slot="main"
			sm-order="1"
			md-order="2"
			lg-order="2">
			<rr-page>
				<rr-simple-section>
					<rr-rich-text>
						<h2>Primaire inhoud</h2>
						<p>Op sm staat de werkbalk onderaan als overlay. Op md en lg staat hij bovenaan in de flow.</p>
					</rr-rich-text>
				</rr-simple-section>
			</rr-page>
		</rr-split-view-pane>
		<rr-split-view-pane slot="status"
			sm-order="3"
			md-order="3"
			lg-order="3">
			<rr-container padding-inline="16" padding-block="12" sm-padding-bottom="none">
				<rr-search-field placeholder="Statusbalk"></rr-search-field>
			</rr-container>
		</rr-split-view-pane>
	</rr-bar-split-view>
`;
WisselVolgorde.parameters = { controls: { disable: true } };
