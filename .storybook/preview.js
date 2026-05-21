import '../src/assets/styles/settings.css';
import '../src/components/content/rich-text/rich-text.css';
import '../src/components/forms/form-section/form-section.css';
import '../src/components/forms/form/form.css';
import './preview.css';
import { withThemeByDataAttribute } from '@storybook/addon-themes';

/** @type { import('@storybook/web-components-vite').Preview } */
const preview = {
	decorators: [
		withThemeByDataAttribute({
			themes: {
				light: 'light',
				dark: 'dark',
			},
			defaultTheme: 'light',
			attributeName: 'data-scheme',
		}),
	],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		// The canvas background follows the surface token (see preview.css)
		// and flips with the addon-themes light/dark switch, so the manual
		// backgrounds toolbar is redundant — hide it.
		backgrounds: { disable: true },
		docs: {
			toc: true,
		},
		options: {
			storySort: {
				method: 'alphabetical',
			},
		},
	},
};

export default preview;
