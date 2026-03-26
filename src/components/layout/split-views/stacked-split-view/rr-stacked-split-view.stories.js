import { html } from 'lit';
import './rr-stacked-split-view.ts';
import '../../page/rr-page.ts';
import '../../page-sections/simple-section/rr-simple-section.ts';
import '../../../content/rich-text/rr-rich-text.ts';

/**
 * Use a stacked split view to show multiple panes stacked vertically,
 * each with its own scrollable area. Typically used for editors where
 * the user needs two or more views above each other.
 * The number of panes is set via the <code>panes</code> attribute.
 *
 * ## Gebruik
 * ```html
 * <rr-stacked-split-view panes="2">
 *   <rr-split-view-pane slot="pane-1">...</rr-split-view-pane>
 *   <rr-split-view-pane slot="pane-2">...</rr-split-view-pane>
 * </rr-stacked-split-view>
 * ```
 */
export default {
	title: 'Components/Layout/Split Views/Stacked Split View',
	component: 'rr-stacked-split-view',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		componentSource: {
			file: 'src/components/layout/split-views/stacked-split-view/rr-stacked-split-view.ts',
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
			description: 'Tinted achtergrond — cascade van --context-parent-background-color naar alle afstammelingen inclusief rr-page en de fade overlay',
			table: { defaultValue: { summary: 'inherit' } },
		},
		panes: {
			control: { type: 'number' },
			description: 'Aantal panelen',
			table: { defaultValue: { summary: '2' } },
		},
	},
	args: {
		background: 'inherit',
		panes: 2,
	},
};

const paneContent = (title, slot) => html`
	<rr-split-view-pane slot=${slot}>
		<rr-page sticky-header>
			<rr-rich-text slot="header" style="padding: 16px;">
				<strong>${title}</strong>
			</rr-rich-text>
			<rr-simple-section>
				<rr-rich-text>
					<h2>Sectietitel</h2>
					<p>Dit is de inhoud van ${title}. Elke pagina heeft een eigen scrollbaar gebied.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
					<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
					<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
					<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				</rr-rich-text>
			</rr-simple-section>
		</rr-page>
	</rr-split-view-pane>
`;

export const Standaard = ({ panes, background }) => html`
	<rr-stacked-split-view panes=${panes} background=${background} style="height: 640px;">
		${Array.from({ length: panes }, (_, i) => paneContent(`Paneel ${i + 1}`, `pane-${i + 1}`))}
	</rr-stacked-split-view>
`;

export const DrieRijen = () => html`
	<rr-stacked-split-view panes="3" style="height: 900px;">
		${[1, 2, 3].map(n => paneContent(`Paneel ${n}`, `pane-${n}`))}
	</rr-stacked-split-view>
`;
DrieRijen.parameters = { controls: { disable: true } };
