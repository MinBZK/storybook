/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
  stories: ['../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)', '../src/components/**/*.mdx'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-designs',
  ],
  framework: '@storybook/web-components-vite',
  staticDirs: ['../dist', '../public'],
};

export default config;
