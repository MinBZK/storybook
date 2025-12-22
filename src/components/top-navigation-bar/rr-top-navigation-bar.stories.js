import './rr-top-navigation-bar.js';
import '../menu-bar/rr-menu-item.js';

export default {
  title: 'Components/Top Navigation Bar',
  component: 'rr-top-navigation-bar',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=48-2135',
    },
  },
  argTypes: {
    container: {
      control: 'select',
      options: ['s', 'm', 'l'],
      description: 'Size variant for responsive breakpoints',
    },
    'has-logo': {
      control: 'boolean',
      description: 'Show Rijksoverheid coat of arms logo',
    },
    'has-title': {
      control: 'boolean',
      description: 'Show title text below logo',
    },
    'has-menu-bar': {
      control: 'boolean',
      description: 'Show global menu bar',
    },
    'has-global-menu': {
      control: 'boolean',
      description: 'Show hamburger Menu button',
    },
    'has-utility-menu-bar': {
      control: 'boolean',
      description: 'Show Zoeken and Account buttons',
    },
    title: {
      control: 'text',
      description: 'Title text below logo',
    },
  },
};

/**
 * Default top navigation bar matching Figma design.
 * White background with centered Rijksoverheid coat of arms.
 */
export const Default = {
  render: (args) => `
    <rr-top-navigation-bar
      container="${args.container || 'm'}"
      ${args['has-logo'] === false ? 'has-logo="false"' : ''}
      ${args['has-title'] === false ? 'has-title="false"' : ''}
      ${args['has-menu-bar'] ? '' : 'has-menu-bar="false"'}
      ${args['has-global-menu'] === false ? 'has-global-menu="false"' : ''}
      ${args['has-utility-menu-bar'] === false ? 'has-utility-menu-bar="false"' : ''}
      ${args.title ? `title="${args.title}"` : ''}
    ></rr-top-navigation-bar>
  `,
  args: {
    container: 'm',
    'has-logo': true,
    'has-title': true,
    'has-menu-bar': false,
    'has-global-menu': true,
    'has-utility-menu-bar': true,
    title: 'Titel',
  },
};

/**
 * Large container size.
 */
export const LargeContainer = {
  render: () => `
    <rr-top-navigation-bar container="l" title="Titel"></rr-top-navigation-bar>
  `,
};

/**
 * Small container size (mobile).
 */
export const SmallContainer = {
  render: () => `
    <rr-top-navigation-bar container="s" title="Titel"></rr-top-navigation-bar>
  `,
};

/**
 * Without title - just logo and navigation.
 */
export const WithoutTitle = {
  render: () => `
    <rr-top-navigation-bar has-title="false"></rr-top-navigation-bar>
  `,
};

/**
 * With global menu bar for additional navigation items.
 */
export const WithMenuBar = {
  render: () => `
    <rr-top-navigation-bar title="Titel">
      <rr-menu-item slot="menu-bar" selected>Home</rr-menu-item>
      <rr-menu-item slot="menu-bar">Menu item</rr-menu-item>
      <rr-menu-item slot="menu-bar">Menu item</rr-menu-item>
      <rr-menu-item slot="menu-bar">Menu item</rr-menu-item>
    </rr-top-navigation-bar>
  `,
};

/**
 * Minimal - just the logo.
 */
export const MinimalLogo = {
  render: () => `
    <rr-top-navigation-bar
      has-title="false"
      has-global-menu="false"
      has-utility-menu-bar="false"
    ></rr-top-navigation-bar>
  `,
};

/**
 * Custom title text.
 */
export const CustomTitle = {
  render: () => `
    <rr-top-navigation-bar title="Mijn Overheid"></rr-top-navigation-bar>
  `,
};

/**
 * DigiD branding example.
 */
export const DigiDBranding = {
  render: () => `
    <rr-top-navigation-bar title="DigiD"></rr-top-navigation-bar>
  `,
};

/**
 * All container sizes comparison.
 */
export const AllStates = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <h3 style="margin: 0 0 8px; font-family: system-ui;">Container L</h3>
        <rr-top-navigation-bar container="l" title="Titel"></rr-top-navigation-bar>
      </div>
      <div>
        <h3 style="margin: 0 0 8px; font-family: system-ui;">Container M (Default)</h3>
        <rr-top-navigation-bar container="m" title="Titel"></rr-top-navigation-bar>
      </div>
      <div>
        <h3 style="margin: 0 0 8px; font-family: system-ui;">Container S</h3>
        <rr-top-navigation-bar container="s" title="Titel"></rr-top-navigation-bar>
      </div>
      <div>
        <h3 style="margin: 0 0 8px; font-family: system-ui;">With Menu Bar</h3>
        <rr-top-navigation-bar container="m" title="Titel">
          <rr-menu-item slot="menu-bar" selected>Home</rr-menu-item>
          <rr-menu-item slot="menu-bar">Menu item</rr-menu-item>
          <rr-menu-item slot="menu-bar">Menu item</rr-menu-item>
        </rr-top-navigation-bar>
      </div>
    </div>
  `,
};
