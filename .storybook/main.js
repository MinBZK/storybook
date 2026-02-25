/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
  stories: [
    '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-themes'
  ],
  framework: '@storybook/web-components-vite',
  staticDirs: ['../dist', '../public'],
};

export default config;
