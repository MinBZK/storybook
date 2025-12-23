import '../src/fonts/fonts.css';
import '../dist/css/tokens.css';

/** @type { import('@storybook/web-components-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'tinted', value: 'var(--semantics-views-tinted-background-color, #f1f5f9)' },
        { name: 'dark', value: 'var(--primitives-color-accent-100, #154273)' },
      ],
    },
    docs: {
      toc: true,
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Introduction',
          'Components',
          [
            'Box',
            'Button',
            'Checkbox',
            'Icon Button',
            'Menu Bar',
            'Radio Button',
            'Switch',
            'Toggle Button',
            'Top Navigation Bar',
            ['Docs', '*', 'Back Button', 'Logo', 'Utility Menu Bar'],
            '*',
          ],
          '*',
        ],
      },
    },
  },
};

export default preview;
