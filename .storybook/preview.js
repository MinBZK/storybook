import '../src/assets/css/fonts.css';
import '../src/assets/css/settings.css';
import { withThemeByDataAttribute } from '@storybook/addon-themes';

// Figma Testing Library for pixel-perfect comparison
import { defineCustomElements } from '@cianfrani/figma-testing-library/loader';

// Initialize Figma Testing Library web components
if (typeof window !== 'undefined') {
	defineCustomElements(window);
}

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
