/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
  stories: [
    '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/components/**/*.mdx',
    '../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-designs'
  ],
  framework: '@storybook/web-components-vite',
  staticDirs: ['../dist', '../public'],
  viteFinal: async (config) => {
    // Fix Stencil components (figma-testing-library) loading in Vite
    // These components must be excluded from optimization due to Stencil/Vite incompatibility
    config.optimizeDeps = config.optimizeDeps || {};
    config.optimizeDeps.exclude = [
      ...(config.optimizeDeps.exclude || []),
      '@cianfrani/figma-testing-library',
      '@stencil/core',
    ];
    return config;
  },
};

export default config;
