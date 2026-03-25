import { html } from 'lit';
import './rr-bar-split-view.ts';
import '../split-view-pane/rr-split-view-pane.ts';
import '../../container/rr-container.ts';
import '../../page/rr-page.ts';
import '../../page-sections/simple-section/rr-simple-section.ts';
import '../../../content/rich-text/rr-rich-text.ts';
import '../../../inputs/search-field/rr-search-field.ts';

/**
 * Use a bar split view for a vertical layout with a primary bar, main content area,
 * and secondary bar. The primary bar provides space for tools and actions;
 * the secondary bar for output, logs, status, or bottom navigation.
 * The main area is always visible. Bars are shown automatically when
 * content is slotted into them.
 *
 * ## Gebruik
 * ```html
 * <rr-bar-split-view>
 *   <rr-split-view-pane slot="primary-bar">...</rr-split-view-pane>
 *   <rr-split-view-pane slot="main">...</rr-split-view-pane>
 *   <rr-split-view-pane slot="secondary-bar">...</rr-split-view-pane>
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
			description: 'Tinted achtergrond — cascade van --background-color naar alle afstammelingen inclusief rr-page en de fade overlay',
			table: { defaultValue: { summary: 'inherit' } },
		},
	},
	args: {
		background: 'inherit',
	},
};

export const Standaard = ({ background }) => html`
	<rr-bar-split-view style="height: 600px;" background=${background}>
		<rr-split-view-pane slot="primary-bar">
			<rr-container padding-inline="16" padding-block="12">
				<rr-button variant="primary" full-width>Primaire balk</rr-button>
			</rr-container>
		</rr-split-view-pane>
		<rr-split-view-pane slot="main">
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
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
						<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
						<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
					</rr-rich-text>
				</rr-simple-section>
			</rr-page>
		</rr-split-view-pane>
		<rr-split-view-pane slot="secondary-bar">
			<rr-container padding-inline="16" padding-block="12" sm-padding-bottom="none">
				<rr-search-field placeholder="Secundaire balk"></rr-search-field>
			</rr-container>
		</rr-split-view-pane>
	</rr-bar-split-view>
`;

export const AlleenPrimaireBalk = () => html`
	<rr-bar-split-view style="height: 600px;">
		<rr-split-view-pane slot="primary-bar" background="tinted">
			<rr-container padding="12">
				<rr-button variant="primary" full-width>Primary bar</rr-button>
			</rr-container>
		</rr-split-view-pane>
		<rr-split-view-pane slot="main">
			<rr-page>
				<rr-simple-section>
					<rr-rich-text>
						<h2>Primaire inhoud</h2>
						<p>Geen secundaire balk — secondary-bar slot is leeg.</p>
					</rr-rich-text>
				</rr-simple-section>
			</rr-page>
		</rr-split-view-pane>
	</rr-bar-split-view>
`;
AlleenPrimaireBalk.parameters = { controls: { disable: true } };
