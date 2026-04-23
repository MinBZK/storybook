import { html } from 'lit';
import './divider.js';
import '../../content/rich-text/rich-text.js';

/**
 * Gebruik een scheidingslijn om secties van inhoud visueel van elkaar te scheiden.
 * De scheidingslijn loopt altijd horizontaal en past zich aan de breedte van zijn container aan.
 *
 * ## Gebruik
 * ```html
 * <nldd-divider></nldd-divider>
 * ```
 */
export default {
	title: 'Components/Layout/Divider',
	component: 'nldd-divider',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/layout/divider/divider.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
};

export const Standaard = () => html`
	<nldd-rich-text>
		<p>Inhoud boven de scheidingslijn.</p>
	</nldd-rich-text>
	<nldd-divider></nldd-divider>
	<nldd-rich-text>
		<p>Inhoud onder de scheidingslijn.</p>
	</nldd-rich-text>
`;
