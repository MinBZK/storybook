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
      description: 'Show logo section',
    },
    'has-menu-bar': {
      control: 'boolean',
      description: 'Show global menu bar below ribbon',
    },
    'has-title': {
      control: 'boolean',
      description: 'Show title bar section',
    },
    'has-back-button': {
      control: 'boolean',
      description: 'Show back button in title bar',
    },
    'has-global-menu': {
      control: 'boolean',
      description: 'Show global menu items in ribbon',
    },
    'has-utility-menu-bar': {
      control: 'boolean',
      description: 'Show utility menu icons',
    },
    'logo-text': {
      control: 'text',
      description: 'Logo text',
    },
    title: {
      control: 'text',
      description: 'Title text for title bar',
    },
  },
};

/**
 * Default top navigation bar with all features enabled.
 * Matches Figma top-navigation-bar component.
 */
export const Default = {
  render: (args) => `
    <rr-top-navigation-bar
      container="${args.container || 'l'}"
      ${args['has-logo'] === false ? 'has-logo="false"' : ''}
      ${args['has-menu-bar'] === false ? 'has-menu-bar="false"' : ''}
      ${args['has-title'] ? 'has-title' : ''}
      ${args['has-back-button'] ? 'has-back-button' : ''}
      ${args['has-global-menu'] === false ? 'has-global-menu="false"' : ''}
      ${args['has-utility-menu-bar'] === false ? 'has-utility-menu-bar="false"' : ''}
      logo-text="${args['logo-text'] || 'DigiD'}"
      ${args.title ? `title="${args.title}"` : ''}
    >
      <!-- Menu items IN the blue ribbon -->
      <span slot="ribbon-menu" style="color: white; padding: 8px 12px; cursor: pointer;">Home</span>
      <span slot="ribbon-menu" style="color: white; padding: 8px 12px; cursor: pointer;">Menu item</span>
      <span slot="ribbon-menu" style="color: white; padding: 8px 12px; cursor: pointer;">Menu item</span>
      <span slot="ribbon-menu" style="color: white; padding: 8px 12px; cursor: pointer;">Menu item</span>

      <!-- Optional menu bar below ribbon -->
      <rr-menu-item slot="menu-bar" selected>Home</rr-menu-item>
      <rr-menu-item slot="menu-bar">Diensten</rr-menu-item>
      <rr-menu-item slot="menu-bar">Projecten</rr-menu-item>
    </rr-top-navigation-bar>
  `,
  args: {
    container: 'l',
    'has-logo': true,
    'has-menu-bar': true,
    'has-title': false,
    'has-back-button': false,
    'has-global-menu': true,
    'has-utility-menu-bar': true,
    'logo-text': 'DigiD',
  },
};

/**
 * Navigation bar with title section visible.
 */
export const WithTitle = {
  render: () => `
    <rr-top-navigation-bar
      container="l"
      has-title
      title="Mijn overzicht"
    >
      <span slot="ribbon-menu" style="color: white; padding: 8px 12px; cursor: pointer;">Home</span>
      <span slot="ribbon-menu" style="color: white; padding: 8px 12px; cursor: pointer;">Menu item</span>
      <rr-menu-item slot="menu-bar" selected>Home</rr-menu-item>
      <rr-menu-item slot="menu-bar">Diensten</rr-menu-item>
    </rr-top-navigation-bar>
  `,
};

/**
 * Navigation bar with title and back button.
 */
export const WithTitleAndBackButton = {
  render: () => `
    <rr-top-navigation-bar
      container="l"
      has-title
      has-back-button
      title="Document details"
    >
      <span slot="ribbon-menu" style="color: white; padding: 8px 12px; cursor: pointer;">Home</span>
      <span slot="ribbon-menu" style="color: white; padding: 8px 12px; cursor: pointer;">Menu item</span>
    </rr-top-navigation-bar>
  `,
};

/**
 * Medium container size.
 */
export const MediumContainer = {
  render: () => `
    <rr-top-navigation-bar container="m">
      <span slot="ribbon-menu" style="color: white; padding: 8px 12px; cursor: pointer;">Titel</span>
      <span slot="ribbon-menu" style="color: white; padding: 8px 12px; cursor: pointer;">Menu item</span>
      <span slot="ribbon-menu" style="color: white; padding: 8px 12px; cursor: pointer;">Menu item</span>
      <rr-menu-item slot="menu-bar" selected>Home</rr-menu-item>
      <rr-menu-item slot="menu-bar">Menu item</rr-menu-item>
    </rr-top-navigation-bar>
  `,
};

/**
 * Small container size (mobile).
 */
export const SmallContainer = {
  render: () => `
    <rr-top-navigation-bar container="s">
      <span slot="ribbon-menu" style="color: white; padding: 8px 12px; cursor: pointer;">Home</span>
      <rr-menu-item slot="menu-bar" selected>Home</rr-menu-item>
    </rr-top-navigation-bar>
  `,
};

/**
 * Minimal navigation with just logo and utility menu.
 */
export const MinimalNavigation = {
  render: () => `
    <rr-top-navigation-bar
      container="l"
      has-menu-bar="false"
      has-global-menu="false"
    >
    </rr-top-navigation-bar>
  `,
};

/**
 * Navigation without utility menu.
 */
export const WithoutUtilityMenu = {
  render: () => `
    <rr-top-navigation-bar
      container="l"
      has-utility-menu-bar="false"
    >
      <span slot="ribbon-menu" style="color: white; padding: 8px 12px; cursor: pointer;">Home</span>
      <span slot="ribbon-menu" style="color: white; padding: 8px 12px; cursor: pointer;">Menu item</span>
      <rr-menu-item slot="menu-bar" selected>Home</rr-menu-item>
      <rr-menu-item slot="menu-bar">Diensten</rr-menu-item>
    </rr-top-navigation-bar>
  `,
};

/**
 * Rijksoverheid branded navigation.
 */
export const RijksoverheidBranding = {
  render: () => `
    <rr-top-navigation-bar
      container="l"
      logo-text="Rijksoverheid"
      has-title
      title="Mijn Rijksoverheid"
    >
      <span slot="ribbon-menu" style="color: white; padding: 8px 12px; cursor: pointer;">Home</span>
      <span slot="ribbon-menu" style="color: white; padding: 8px 12px; cursor: pointer;">Documenten</span>
      <span slot="ribbon-menu" style="color: white; padding: 8px 12px; cursor: pointer;">Berichten</span>
      <rr-menu-item slot="menu-bar" selected>Home</rr-menu-item>
      <rr-menu-item slot="menu-bar">Documenten</rr-menu-item>
    </rr-top-navigation-bar>
  `,
};

/**
 * All states overview.
 */
export const AllStates = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <h3 style="margin: 0 0 8px; font-family: system-ui;">Default (Large)</h3>
        <rr-top-navigation-bar container="l">
          <span slot="ribbon-menu" style="color: white; padding: 8px 12px;">Home</span>
          <span slot="ribbon-menu" style="color: white; padding: 8px 12px;">Menu item</span>
          <rr-menu-item slot="menu-bar" selected>Home</rr-menu-item>
          <rr-menu-item slot="menu-bar">Diensten</rr-menu-item>
        </rr-top-navigation-bar>
      </div>

      <div>
        <h3 style="margin: 0 0 8px; font-family: system-ui;">With Title</h3>
        <rr-top-navigation-bar container="l" has-title title="Overzicht">
          <span slot="ribbon-menu" style="color: white; padding: 8px 12px;">Home</span>
          <rr-menu-item slot="menu-bar" selected>Home</rr-menu-item>
        </rr-top-navigation-bar>
      </div>

      <div>
        <h3 style="margin: 0 0 8px; font-family: system-ui;">With Back Button</h3>
        <rr-top-navigation-bar container="l" has-title has-back-button title="Details">
          <span slot="ribbon-menu" style="color: white; padding: 8px 12px;">Home</span>
        </rr-top-navigation-bar>
      </div>

      <div>
        <h3 style="margin: 0 0 8px; font-family: system-ui;">Minimal</h3>
        <rr-top-navigation-bar container="l" has-menu-bar="false" has-global-menu="false">
        </rr-top-navigation-bar>
      </div>
    </div>
  `,
};
