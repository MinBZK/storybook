import { html } from 'lit';
import './rr-side-by-side-split-view.ts';
import '../../../layout/page/rr-page.ts';
import '../../../layout/page-sections/simple-section/rr-simple-section.ts';
import '../../../content/rich-text/rr-rich-text.ts';

/**
 * Gebruik een side-by-side split view om meerdere panelen naast elkaar te tonen,
 * elk met een eigen scrollbaar gebied. Typisch gebruikt voor editors waarbij
 * de gebruiker twee of meer weergaven tegelijk nodig heeft.
 * Panelen zijn minimaal 320px breed — panelen die niet passen worden automatisch verborgen.
 * Het aantal panelen wordt bepaald door het `panes` attribuut.
 *
 * ## Gebruik
 * ```html
 * <rr-side-by-side-split-view panes="2">
 *   <rr-page slot="pane-1">...</rr-page>
 *   <rr-page slot="pane-2">...</rr-page>
 * </rr-side-by-side-split-view>
 * ```
 */
export default {
	title: 'Components/Layout/Split Views/Side-by-Side Split View',
	component: 'rr-side-by-side-split-view',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		componentSource: {
			file: 'src/components/layout/split-views/side-by-side-split-view/rr-side-by-side-split-view.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		panes: {
			control: { type: 'number' },
			description: 'Aantal panelen',
			table: { defaultValue: { summary: '2' } },
		},
	},
	args: {
		panes: 2,
	},
};

const paneContent = (title, slot) => html`
	<rr-page sticky-header slot=${slot}>
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
`;

export const Standaard = ({ panes }) => html`
	<rr-side-by-side-split-view panes=${panes} style="height: 500px;">
		${Array.from({ length: panes }, (_, i) => paneContent(`Paneel ${i + 1}`, `pane-${i + 1}`))}
	</rr-side-by-side-split-view>
`;

export const DrieKolommen = () => html`
	<rr-side-by-side-split-view panes="3" style="height: 500px;">
		${[1, 2, 3].map(n => paneContent(`Paneel ${n}`, `pane-${n}`))}
	</rr-side-by-side-split-view>
`;
DrieKolommen.parameters = { controls: { disable: true } };
