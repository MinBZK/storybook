import { html } from 'lit';
import './ndd-divider.ts';
import '../../content/rich-text/ndd-rich-text.ts';

/**
 * Gebruik een scheidingslijn om secties van inhoud visueel van elkaar te scheiden.
 * De scheidingslijn loopt altijd horizontaal en past zich aan de breedte van zijn container aan.
 *
 * ## Gebruik
 * ```html
 * <ndd-divider></ndd-divider>
 * ```
 */
export default {
	title: 'Components/Layout/Divider',
	component: 'ndd-divider',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/layout/divider/ndd-divider.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
};

export const Standaard = () => html`
	<ndd-rich-text>
		<p>Inhoud boven de scheidingslijn.</p>
	</ndd-rich-text>
	<ndd-divider></ndd-divider>
	<ndd-rich-text>
		<p>Inhoud onder de scheidingslijn.</p>
	</ndd-rich-text>
`;
