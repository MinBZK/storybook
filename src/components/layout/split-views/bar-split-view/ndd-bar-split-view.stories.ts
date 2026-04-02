import { html } from 'lit';
import './ndd-bar-split-view.ts';
import '../split-view-pane/ndd-split-view-pane.ts';
import '../../page/ndd-page.ts';
import '../../page-sections/simple-section/ndd-simple-section.ts';
import '../../../content/rich-text/ndd-rich-text.ts';
import '../../container/ndd-container.ts';
import '../../../actions/toolbar/ndd-toolbar.ts';
import '../../../inputs/segmented-control/ndd-segmented-control.ts';
import '../../../inputs/search-field/ndd-search-field.ts';

import '../../../lists-and-menus/menu/ndd-menu.ts';

/**
 * Gebruik een bar split view voor een verticale layout met een main-gebied en een
 * onbeperkt aantal balkpanelen. Geef elke balk een unieke slotnaam (bijv.
 * slot="toolbar", slot="status-bar"). Het main-paneel gebruikt altijd slot="main".
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
 * <ndd-bar-split-view>
 *   <ndd-split-view-pane slot="toolbar" sm-order="1" md-order="1">...</ndd-split-view-pane>
 *   <ndd-split-view-pane slot="main"    sm-order="2" md-order="2">...</ndd-split-view-pane>
 *   <ndd-split-view-pane slot="status-bar" sm-order="3" md-order="3">...</ndd-split-view-pane>
 * </ndd-bar-split-view>
 * ```
 */
export default {
	title: 'Components/Layout/Split Views/Bar Split View',
	component: 'ndd-bar-split-view',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		componentSource: {
			file: 'src/components/layout/split-views/bar-split-view/ndd-bar-split-view.ts',
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
			description:
				'Achtergrondkleur — cascade van --context-parent-background-color naar alle afstammelingen inclusief ndd-page en de fade-overlays',
			table: { defaultValue: { summary: 'inherit' } },
		},
	},
	args: {
		background: 'inherit',
	},
};

// Reusable toolbar matching the WithPriority story from ndd-toolbar
const toolbar = html`
	<ndd-container padding-inline="16" padding-block="12">
		<ndd-toolbar>
			<ndd-toolbar-item slot="start" label="Tekststijl" priority="1">
				<ndd-segmented-control type="checkbox" variant="icon" accessible-label="Tekststijl">
					<ndd-segmented-control-item
						value="vet"
						text="Vet"
						icon="bold"
					></ndd-segmented-control-item>
					<ndd-segmented-control-item
						value="cursief"
						text="Cursief"
						icon="italic"
					></ndd-segmented-control-item>
					<ndd-segmented-control-item
						value="onderstrepen"
						text="Onderstrepen"
						icon="underlined"
					></ndd-segmented-control-item>
				</ndd-segmented-control>
				<ndd-menu-item slot="overflow" text="Vet" type="checkbox"></ndd-menu-item>
				<ndd-menu-item slot="overflow" text="Cursief" type="checkbox"></ndd-menu-item>
				<ndd-menu-item slot="overflow" text="Onderstrepen" type="checkbox"></ndd-menu-item>
			</ndd-toolbar-item>
			<ndd-toolbar-item slot="start" label="Lijst" priority="2">
				<ndd-segmented-control type="radio" variant="icon" accessible-label="Lijsttype">
					<ndd-segmented-control-item
						value="none"
						text="Geen"
						icon="minus-small"
					></ndd-segmented-control-item>
					<ndd-segmented-control-item
						value="bullet"
						text="Lijst"
						icon="bullet-list"
					></ndd-segmented-control-item>
					<ndd-segmented-control-item
						value="numbered"
						text="Genummerd"
						icon="numbered-list"
					></ndd-segmented-control-item>
				</ndd-segmented-control>
				<ndd-menu-item slot="overflow" text="Geen" type="checkbox"></ndd-menu-item>
				<ndd-menu-item slot="overflow" text="Lijst" type="checkbox"></ndd-menu-item>
				<ndd-menu-item slot="overflow" text="Genummerd" type="checkbox"></ndd-menu-item>
			</ndd-toolbar-item>
			<ndd-toolbar-title-group
				slot="center"
				text="Document titel"
				subtext="Laatste wijziging: vandaag"
				align="center"
			></ndd-toolbar-title-group>
			<ndd-toolbar-item slot="end" label="Annuleer" priority="3">
				<ndd-button text="Annuleer"></ndd-button>
				<ndd-menu-item slot="overflow" text="Annuleer"></ndd-menu-item>
			</ndd-toolbar-item>
			<ndd-toolbar-item slot="end" label="Sla op" priority="10">
				<ndd-button variant="primary" text="Sla op"></ndd-button>
				<ndd-menu-item slot="overflow" text="Sla op"></ndd-menu-item>
			</ndd-toolbar-item>
		</ndd-toolbar>
	</ndd-container>
`;

// Reusable main content
const mainContent = html`
	<ndd-page>
		<ndd-simple-section>
			<ndd-rich-text>
				<h2>Primaire inhoud</h2>
				<p>Het hoofdgebied voor bewerkbare of weer te geven inhoud.</p>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua.
				</p>
				<p>
					Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
					commodo consequat.
				</p>
				<p>
					Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
					nulla pariatur.
				</p>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua.
				</p>
				<p>
					Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
					commodo consequat.
				</p>
				<p>
					Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
					nulla pariatur.
				</p>
			</ndd-rich-text>
		</ndd-simple-section>
	</ndd-page>
`;

export const Standaard = (args) => html`
	<ndd-bar-split-view style="height: 600px;" background=${args.background}>
		<ndd-split-view-pane slot="toolbar" sm-order="1" md-order="1" lg-order="1">
			${toolbar}
		</ndd-split-view-pane>
		<ndd-split-view-pane slot="main" sm-order="2" md-order="2" lg-order="2">
			${mainContent}
		</ndd-split-view-pane>
	</ndd-bar-split-view>
`;

export const MetStatusbalk = (args) => html`
	<ndd-bar-split-view style="height: 600px;" background=${args.background}>
		<ndd-split-view-pane slot="toolbar" sm-order="1" md-order="1" lg-order="1">
			${toolbar}
		</ndd-split-view-pane>
		<ndd-split-view-pane slot="main" sm-order="2" md-order="2" lg-order="2">
			${mainContent}
		</ndd-split-view-pane>
		<ndd-split-view-pane slot="status-bar" sm-order="3" md-order="3" lg-order="3">
			<ndd-container padding-inline="16" padding-block="12" sm-padding-bottom="none">
				<ndd-toolbar>
					<ndd-toolbar-item slot="center" label="Zoeken" min-width="240px" width="70%" priority="3">
						<ndd-search-field placeholder="Zoeken..."></ndd-search-field>
						<ndd-menu-item slot="overflow" text="Zoeken"></ndd-menu-item>
					</ndd-toolbar-item>
				</ndd-toolbar>
			</ndd-container>
		</ndd-split-view-pane>
	</ndd-bar-split-view>
`;
MetStatusbalk.parameters = { controls: { disable: true } };

// On sm: main is visible at top, toolbar moves to a bottom bar.
// On md/lg: toolbar is above main, matching DOM order.
export const WisselVolgorde = () => html`
	<ndd-bar-split-view style="height: 600px;">
		<ndd-split-view-pane slot="toolbar" sm-order="2" md-order="1" lg-order="1">
			${toolbar}
		</ndd-split-view-pane>
		<ndd-split-view-pane slot="main" sm-order="1" md-order="2" lg-order="2">
			<ndd-page>
				<ndd-simple-section>
					<ndd-rich-text>
						<h2>Primaire inhoud</h2>
						<p>
							Op sm staat de werkbalk onderaan als overlay. Op md en lg staat hij bovenaan in de
							flow.
						</p>
					</ndd-rich-text>
				</ndd-simple-section>
			</ndd-page>
		</ndd-split-view-pane>
	</ndd-bar-split-view>
`;
WisselVolgorde.parameters = { controls: { disable: true } };

// Toolbar only visible on md and lg; mobile bar only visible on sm.
export const ResponsieveBalken = () => html`
	<ndd-bar-split-view style="height: 600px;">
		<ndd-split-view-pane slot="toolbar" above="md" sm-order="1" md-order="1" lg-order="1">
			${toolbar}
		</ndd-split-view-pane>
		<ndd-split-view-pane slot="mobile-bar" only="sm" sm-order="3">
			<ndd-container padding-inline="16" padding-block="12" sm-padding-bottom="none">
				<ndd-toolbar>
					<ndd-toolbar-item slot="start" label="Sla op">
						<ndd-button variant="primary" text="Sla op"></ndd-button>
						<ndd-menu-item slot="overflow" text="Sla op"></ndd-menu-item>
					</ndd-toolbar-item>
					<ndd-toolbar-item slot="end" label="Annuleer">
						<ndd-button text="Annuleer"></ndd-button>
						<ndd-menu-item slot="overflow" text="Annuleer"></ndd-menu-item>
					</ndd-toolbar-item>
				</ndd-toolbar>
			</ndd-container>
		</ndd-split-view-pane>
		<ndd-split-view-pane slot="main" sm-order="2" md-order="2" lg-order="2">
			${mainContent}
		</ndd-split-view-pane>
	</ndd-bar-split-view>
`;
ResponsieveBalken.parameters = { controls: { disable: true } };
