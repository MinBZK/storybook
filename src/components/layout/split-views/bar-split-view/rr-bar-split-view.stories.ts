import { html } from 'lit';
import './rr-bar-split-view.ts';
import '../split-view-pane/rr-split-view-pane.ts';
import '../../page/rr-page.ts';
import '../../page-sections/simple-section/rr-simple-section.ts';
import '../../../content/rich-text/rr-rich-text.ts';
import '../../container/rr-container.ts';
import '../../../actions/toolbar/rr-toolbar.ts';
import '../../../inputs/segmented-control/rr-segmented-control.ts';
import '../../../inputs/search-field/rr-search-field.ts';
import '../../../content/icon/rr-icon.ts';
import '../../../lists-and-menus/menu/rr-menu.ts';

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
 * <rr-bar-split-view>
 *   <rr-split-view-pane slot="toolbar" sm-order="1" md-order="1">...</rr-split-view-pane>
 *   <rr-split-view-pane slot="main"    sm-order="2" md-order="2">...</rr-split-view-pane>
 *   <rr-split-view-pane slot="status-bar" sm-order="3" md-order="3">...</rr-split-view-pane>
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

// Reusable toolbar matching the WithPriority story from rr-toolbar
const toolbar = html`
	<rr-container
		padding-inline="16"
		padding-block="12"
	>
		<rr-toolbar>
			<rr-toolbar-item
				slot="start"
				label="Tekststijl"
				priority="1"
			>
				<rr-segmented-control
					type="checkbox"
					variant="icon"
					accessible-label="Tekststijl"
				>
					<rr-segmented-control-item value="vet">
						<rr-icon
							slot="icon"
							name="bold"
						></rr-icon>
						Vet
					</rr-segmented-control-item>
					<rr-segmented-control-item value="cursief">
						<rr-icon
							slot="icon"
							name="italic"
						></rr-icon>
						Cursief
					</rr-segmented-control-item>
					<rr-segmented-control-item value="onderstrepen">
						<rr-icon
							slot="icon"
							name="underlined"
						></rr-icon>
						Onderstrepen
					</rr-segmented-control-item>
				</rr-segmented-control>
				<rr-menu-item
					slot="overflow"
					text="Vet"
					type="checkbox"
				></rr-menu-item>
				<rr-menu-item
					slot="overflow"
					text="Cursief"
					type="checkbox"
				></rr-menu-item>
				<rr-menu-item
					slot="overflow"
					text="Onderstrepen"
					type="checkbox"
				></rr-menu-item>
			</rr-toolbar-item>
			<rr-toolbar-item
				slot="start"
				label="Lijst"
				priority="2"
			>
				<rr-segmented-control
					type="radio"
					variant="icon"
					accessible-label="Lijsttype"
				>
					<rr-segmented-control-item value="none">
						<rr-icon
							slot="icon"
							name="minus-small"
						></rr-icon>
						Geen
					</rr-segmented-control-item>
					<rr-segmented-control-item value="bullet">
						<rr-icon
							slot="icon"
							name="bullet-list"
						></rr-icon>
						Lijst
					</rr-segmented-control-item>
					<rr-segmented-control-item value="numbered">
						<rr-icon
							slot="icon"
							name="numbered-list"
						></rr-icon>
						Genummerd
					</rr-segmented-control-item>
				</rr-segmented-control>
				<rr-menu-item
					slot="overflow"
					text="Geen"
					type="checkbox"
				></rr-menu-item>
				<rr-menu-item
					slot="overflow"
					text="Lijst"
					type="checkbox"
				></rr-menu-item>
				<rr-menu-item
					slot="overflow"
					text="Genummerd"
					type="checkbox"
				></rr-menu-item>
			</rr-toolbar-item>
			<rr-toolbar-title-group
				slot="center"
				text="Document titel"
				subtext="Laatste wijziging: vandaag"
				align="center"
			></rr-toolbar-title-group>
			<rr-toolbar-item
				slot="end"
				label="Annuleer"
				priority="3"
			>
				<rr-button>Annuleer</rr-button>
				<rr-menu-item
					slot="overflow"
					text="Annuleer"
				></rr-menu-item>
			</rr-toolbar-item>
			<rr-toolbar-item
				slot="end"
				label="Sla op"
				priority="10"
			>
				<rr-button variant="primary">Sla op</rr-button>
				<rr-menu-item
					slot="overflow"
					text="Sla op"
				></rr-menu-item>
			</rr-toolbar-item>
		</rr-toolbar>
	</rr-container>
`;

// Reusable main content
const mainContent = html`
	<rr-page>
		<rr-simple-section>
			<rr-rich-text>
				<h2>Primaire inhoud</h2>
				<p>Het hoofdgebied voor bewerkbare of weer te geven inhoud.</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
				<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
				<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
				<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
				<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
			</rr-rich-text>
		</rr-simple-section>
	</rr-page>
`;

export const Standaard = (args) => html`
	<rr-bar-split-view
		style="height: 600px;"
		background=${args.background}
	>
		<rr-split-view-pane
			slot="toolbar"
			sm-order="1"
			md-order="1"
			lg-order="1"
		>
			${toolbar}
		</rr-split-view-pane>
		<rr-split-view-pane
			slot="main"
			sm-order="2"
			md-order="2"
			lg-order="2"
		>
			${mainContent}
		</rr-split-view-pane>
	</rr-bar-split-view>
`;

export const MetStatusbalk = (args) => html`
	<rr-bar-split-view
		style="height: 600px;"
		background=${args.background}
	>
		<rr-split-view-pane
			slot="toolbar"
			sm-order="1"
			md-order="1"
			lg-order="1"
		>
			${toolbar}
		</rr-split-view-pane>
		<rr-split-view-pane
			slot="main"
			sm-order="2"
			md-order="2"
			lg-order="2"
		>
			${mainContent}
		</rr-split-view-pane>
		<rr-split-view-pane
			slot="status-bar"
			sm-order="3"
			md-order="3"
			lg-order="3"
		>
			<rr-container
				padding-inline="16"
				padding-block="12"
				sm-padding-bottom="none"
			>
				<rr-toolbar>
					<rr-toolbar-item
						slot="center"
						label="Zoeken"
						min-width="240px"
						width="70%"
						priority="3"
					>
						<rr-search-field placeholder="Zoeken..."></rr-search-field>
						<rr-menu-item
							slot="overflow"
							text="Zoeken"
						></rr-menu-item>
					</rr-toolbar-item>
				</rr-toolbar>
			</rr-container>
		</rr-split-view-pane>
	</rr-bar-split-view>
`;
MetStatusbalk.parameters = { controls: { disable: true } };

// On sm: main is visible at top, toolbar moves to a bottom bar.
// On md/lg: toolbar is above main, matching DOM order.
export const WisselVolgorde = () => html`
	<rr-bar-split-view style="height: 600px;">
		<rr-split-view-pane
			slot="toolbar"
			sm-order="2"
			md-order="1"
			lg-order="1"
		>
			${toolbar}
		</rr-split-view-pane>
		<rr-split-view-pane
			slot="main"
			sm-order="1"
			md-order="2"
			lg-order="2"
		>
			<rr-page>
				<rr-simple-section>
					<rr-rich-text>
						<h2>Primaire inhoud</h2>
						<p>Op sm staat de werkbalk onderaan als overlay. Op md en lg staat hij bovenaan in de flow.</p>
					</rr-rich-text>
				</rr-simple-section>
			</rr-page>
		</rr-split-view-pane>
	</rr-bar-split-view>
`;
WisselVolgorde.parameters = { controls: { disable: true } };
