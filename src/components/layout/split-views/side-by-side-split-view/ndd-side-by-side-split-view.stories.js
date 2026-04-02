import { html } from 'lit';
import './ndd-side-by-side-split-view.ts';
import '../../page/ndd-page.ts';
import '../../page-sections/simple-section/ndd-simple-section.ts';
import '../../../content/rich-text/ndd-rich-text.ts';

/**
 * Use a side-by-side split view to show multiple panes next to each other,
 * each with its own scrollable area. Typically used for editors where
 * the user needs two or more views at the same time.
 * The number of panes is set via the <code>panes</code> attribute.
 *
 * ## Gebruik
 * ```html
 * <ndd-side-by-side-split-view panes="2">
 *   <ndd-split-view-pane slot="pane-1">...</ndd-split-view-pane>
 *   <ndd-split-view-pane slot="pane-2">...</ndd-split-view-pane>
 * </ndd-side-by-side-split-view>
 * ```
 */
export default {
	title: 'Components/Layout/Split Views/Side-by-Side Split View',
	component: 'ndd-side-by-side-split-view',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		componentSource: {
			file: 'src/components/layout/split-views/side-by-side-split-view/ndd-side-by-side-split-view.ts',
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
			description: 'Tinted achtergrond — cascade van --context-parent-background-color naar alle afstammelingen inclusief ndd-page en de fade overlay',
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
	<ndd-split-view-pane slot=${slot}>
		<ndd-page sticky-header>
			<ndd-rich-text slot="header" style="padding: 16px;">
				<strong>${title}</strong>
			</ndd-rich-text>
			<ndd-simple-section>
				<ndd-rich-text>
					<h2>Sectietitel</h2>
					<p>Dit is de inhoud van ${title}. Elke pagina heeft een eigen scrollbaar gebied.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
					<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
					<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
					<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				</ndd-rich-text>
			</ndd-simple-section>
		</ndd-page>
	</ndd-split-view-pane>
`;

export const Standaard = ({ panes, background }) => html`
	<ndd-side-by-side-split-view panes=${panes} background=${background} style="height: 500px;">
		${Array.from({ length: panes }, (_, i) => paneContent(`Paneel ${i + 1}`, `pane-${i + 1}`))}
	</ndd-side-by-side-split-view>
`;

export const DrieKolommen = () => html`
	<ndd-side-by-side-split-view panes="3" style="height: 500px;">
		${[1, 2, 3].map(n => paneContent(`Paneel ${n}`, `pane-${n}`))}
	</ndd-side-by-side-split-view>
`;
DrieKolommen.parameters = { controls: { disable: true } };
