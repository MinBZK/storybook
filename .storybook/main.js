/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
  stories: [
    '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/docs/**/*.mdx',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-themes'
  ],
  framework: '@storybook/web-components-vite',
  staticDirs: ['../dist', '../public'],
  // dist is een staticDir, dus dit is het bestand dat consumers ook krijgen.
  managerHead: (head) =>
    `${head}<link rel="icon" type="image/svg+xml" href="./favicon.svg"><link rel="apple-touch-icon" href="./touch-icon.png">`,
};

export default config;
