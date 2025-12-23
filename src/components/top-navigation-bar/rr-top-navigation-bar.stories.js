import { html } from 'lit';
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
    // Main properties
    container: {
      control: 'select',
      options: ['s', 'm', 'l'],
      description: 'Size variant for responsive breakpoints',
      table: { category: 'Main' },
    },
    title: {
      control: 'text',
      description: 'Title text in navigation bar (e.g., DigID, Mijn Overheid)',
      table: { category: 'Main' },
    },
    'has-logo': {
      control: 'boolean',
      description: 'Show Rijksoverheid coat of arms logo',
      table: { category: 'Main' },
    },
    'has-title': {
      control: 'boolean',
      description: 'Show title text in nav bar',
      table: { category: 'Main' },
    },
    'has-global-menu': {
      control: 'boolean',
      description: 'Show horizontal menu items (hidden on small container)',
      table: { category: 'Main' },
    },
    'has-utility-menu-bar': {
      control: 'boolean',
      description: 'Show utility buttons (Language, Zoeken, Account)',
      table: { category: 'Main' },
    },
    'has-back-button': {
      control: 'boolean',
      description: 'Show back navigation button',
      table: { category: 'Main' },
    },

    // Logo sub-component properties
    'logo-has-wordmark': {
      control: 'boolean',
      description: 'Show wordmark text beside the logo',
      table: { category: 'Logo' },
    },
    'logo-title': {
      control: 'text',
      description: 'Logo wordmark title (e.g., Rijksoverheid)',
      table: { category: 'Logo' },
    },
    'logo-subtitle': {
      control: 'text',
      description: 'Logo wordmark subtitle',
      table: { category: 'Logo' },
    },
    'logo-supporting-text-1': {
      control: 'text',
      description: 'Logo supporting text line 1',
      table: { category: 'Logo' },
    },
    'logo-supporting-text-2': {
      control: 'text',
      description: 'Logo supporting text line 2',
      table: { category: 'Logo' },
    },

    // Utility menu bar properties
    'utility-has-language-switch': {
      control: 'boolean',
      description: 'Show language dropdown button',
      table: { category: 'Utility Menu' },
    },
    'utility-has-search': {
      control: 'boolean',
      description: 'Show search button',
      table: { category: 'Utility Menu' },
    },
    'utility-has-help': {
      control: 'boolean',
      description: 'Show help button',
      table: { category: 'Utility Menu' },
    },
    'utility-has-settings': {
      control: 'boolean',
      description: 'Show settings button',
      table: { category: 'Utility Menu' },
    },
    'utility-has-account': {
      control: 'boolean',
      description: 'Show account button',
      table: { category: 'Utility Menu' },
    },
    'utility-language': {
      control: 'text',
      description: 'Language code (e.g., NL, EN)',
      table: { category: 'Utility Menu' },
    },
    'utility-account-label': {
      control: 'text',
      description: 'Account button label (defaults to "Mijn {title}")',
      table: { category: 'Utility Menu' },
    },

    // Back button properties
    'back-href': {
      control: 'text',
      description: 'Back button link destination',
      table: { category: 'Back Button' },
    },
    'back-label': {
      control: 'text',
      description: 'Back button text label',
      table: { category: 'Back Button' },
    },
  },
};

/**
 * Default top navigation bar matching Figma design.
 * White background with centered Rijksoverheid coat of arms,
 * horizontal navigation menu, and utility buttons.
 */
export const Default = {
  render: (args) => html`
    <rr-top-navigation-bar
      container=${args.container || 'm'}
      has-logo=${args['has-logo'] === false ? 'false' : ''}
      has-title=${args['has-title'] === false ? 'false' : ''}
      has-global-menu=${args['has-global-menu'] === false ? 'false' : ''}
      has-utility-menu-bar=${args['has-utility-menu-bar'] === false ? 'false' : ''}
      ?has-back-button=${args['has-back-button']}
      title=${args.title || 'DigID'}
      ?logo-has-wordmark=${args['logo-has-wordmark']}
      logo-title=${args['logo-title'] || ''}
      logo-subtitle=${args['logo-subtitle'] || ''}
      logo-supporting-text-1=${args['logo-supporting-text-1'] || ''}
      logo-supporting-text-2=${args['logo-supporting-text-2'] || ''}
      utility-has-language-switch=${args['utility-has-language-switch'] === false ? 'false' : ''}
      utility-has-search=${args['utility-has-search'] === false ? 'false' : ''}
      ?utility-has-help=${args['utility-has-help']}
      ?utility-has-settings=${args['utility-has-settings']}
      utility-has-account=${args['utility-has-account'] === false ? 'false' : ''}
      utility-language=${args['utility-language'] || 'NL'}
      utility-account-label=${args['utility-account-label'] || ''}
      back-href=${args['back-href'] || ''}
      back-label=${args['back-label'] || 'Terug'}
    >
      <rr-menu-item slot="menu" selected>Home</rr-menu-item>
      <rr-menu-item slot="menu">Aanvragen & activeren</rr-menu-item>
      <rr-menu-item slot="menu">Manieren van inloggen</rr-menu-item>
      <rr-menu-item slot="menu">Veiligheid</rr-menu-item>
      <rr-menu-item slot="menu">Hulp</rr-menu-item>
    </rr-top-navigation-bar>
  `,
  args: {
    container: 'm',
    'has-logo': true,
    'has-title': true,
    'has-global-menu': true,
    'has-utility-menu-bar': true,
    'has-back-button': false,
    title: 'DigID',
    'logo-has-wordmark': false,
    'logo-title': '',
    'logo-subtitle': '',
    'utility-has-language-switch': true,
    'utility-has-search': true,
    'utility-has-help': false,
    'utility-has-settings': false,
    'utility-has-account': true,
    'utility-language': 'NL',
  },
};

/**
 * With logo wordmark - shows title beside the coat of arms.
 */
export const WithLogoWordmark = {
  render: () => html`
    <rr-top-navigation-bar
      title="DigID"
      logo-has-wordmark
      logo-title="Rijksoverheid"
    >
      <rr-menu-item slot="menu" selected>Home</rr-menu-item>
      <rr-menu-item slot="menu">Aanvragen & activeren</rr-menu-item>
      <rr-menu-item slot="menu">Manieren van inloggen</rr-menu-item>
    </rr-top-navigation-bar>
  `,
};

/**
 * Full logo wordmark with subtitle and supporting text.
 */
export const FullLogoWordmark = {
  render: () => html`
    <rr-top-navigation-bar
      title="DigID"
      logo-has-wordmark
      logo-title="Rijksoverheid"
      logo-subtitle="Ministerie van Binnenlandse Zaken"
      logo-supporting-text-1="en Koninkrijksrelaties"
    >
      <rr-menu-item slot="menu" selected>Home</rr-menu-item>
      <rr-menu-item slot="menu">Aanvragen & activeren</rr-menu-item>
      <rr-menu-item slot="menu">Hulp</rr-menu-item>
    </rr-top-navigation-bar>
  `,
};

/**
 * With back button - for sub-pages and flows.
 */
export const WithBackButton = {
  render: () => html`
    <rr-top-navigation-bar
      title="DigID"
      has-back-button
      back-href="/"
      back-label="Terug naar overzicht"
    >
      <rr-menu-item slot="menu">Aanvragen & activeren</rr-menu-item>
    </rr-top-navigation-bar>
  `,
};

/**
 * Large container size - desktop layout.
 */
export const LargeContainer = {
  render: () => html`
    <rr-top-navigation-bar container="l" title="DigID">
      <rr-menu-item slot="menu" selected>Home</rr-menu-item>
      <rr-menu-item slot="menu">Aanvragen & activeren</rr-menu-item>
      <rr-menu-item slot="menu">Manieren van inloggen</rr-menu-item>
      <rr-menu-item slot="menu">Veiligheid</rr-menu-item>
      <rr-menu-item slot="menu">Hulp</rr-menu-item>
    </rr-top-navigation-bar>
  `,
};

/**
 * Small container size (mobile) - menu items hidden, only utility buttons visible.
 */
export const SmallContainer = {
  render: () => html`
    <rr-top-navigation-bar container="s" title="DigID">
      <rr-menu-item slot="menu" selected>Home</rr-menu-item>
      <rr-menu-item slot="menu">Aanvragen & activeren</rr-menu-item>
      <rr-menu-item slot="menu">Manieren van inloggen</rr-menu-item>
    </rr-top-navigation-bar>
  `,
};

/**
 * Without title - just logo and navigation.
 */
export const WithoutTitle = {
  render: () => html`
    <rr-top-navigation-bar has-title="false">
      <rr-menu-item slot="menu" selected>Home</rr-menu-item>
      <rr-menu-item slot="menu">Menu item</rr-menu-item>
      <rr-menu-item slot="menu">Menu item</rr-menu-item>
    </rr-top-navigation-bar>
  `,
};

/**
 * Minimal - just the logo.
 */
export const MinimalLogo = {
  render: () => html`
    <rr-top-navigation-bar
      has-title="false"
      has-global-menu="false"
      has-utility-menu-bar="false"
    ></rr-top-navigation-bar>
  `,
};

/**
 * Mijn Overheid branding example.
 */
export const MijnOverheid = {
  render: () => html`
    <rr-top-navigation-bar
      title="Mijn Overheid"
      logo-has-wordmark
      logo-title="Rijksoverheid"
    >
      <rr-menu-item slot="menu" selected>Overzicht</rr-menu-item>
      <rr-menu-item slot="menu">Berichten</rr-menu-item>
      <rr-menu-item slot="menu">Lopende zaken</rr-menu-item>
      <rr-menu-item slot="menu">Persoonlijk</rr-menu-item>
    </rr-top-navigation-bar>
  `,
};

/**
 * DigiD branding example matching Figma.
 */
export const DigiDBranding = {
  render: () => html`
    <rr-top-navigation-bar title="DigID">
      <rr-menu-item slot="menu" selected>Home</rr-menu-item>
      <rr-menu-item slot="menu">Aanvragen & activeren</rr-menu-item>
      <rr-menu-item slot="menu">Manieren van inloggen</rr-menu-item>
      <rr-menu-item slot="menu">Veiligheid</rr-menu-item>
      <rr-menu-item slot="menu">Hulp</rr-menu-item>
    </rr-top-navigation-bar>
  `,
};

/**
 * All container sizes comparison.
 */
export const AllStates = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <h3 style="margin: 0 0 8px; font-family: system-ui;">Container L (Desktop)</h3>
        <rr-top-navigation-bar container="l" title="DigID">
          <rr-menu-item slot="menu" selected>Home</rr-menu-item>
          <rr-menu-item slot="menu">Aanvragen & activeren</rr-menu-item>
          <rr-menu-item slot="menu">Manieren van inloggen</rr-menu-item>
          <rr-menu-item slot="menu">Veiligheid</rr-menu-item>
          <rr-menu-item slot="menu">Hulp</rr-menu-item>
        </rr-top-navigation-bar>
      </div>
      <div>
        <h3 style="margin: 0 0 8px; font-family: system-ui;">Container M (Tablet)</h3>
        <rr-top-navigation-bar container="m" title="DigID">
          <rr-menu-item slot="menu" selected>Home</rr-menu-item>
          <rr-menu-item slot="menu">Aanvragen & activeren</rr-menu-item>
          <rr-menu-item slot="menu">Manieren van inloggen</rr-menu-item>
          <rr-menu-item slot="menu">Veiligheid</rr-menu-item>
          <rr-menu-item slot="menu">Hulp</rr-menu-item>
        </rr-top-navigation-bar>
      </div>
      <div>
        <h3 style="margin: 0 0 8px; font-family: system-ui;">Container S (Mobile) - Menu items hidden</h3>
        <rr-top-navigation-bar container="s" title="DigID">
          <rr-menu-item slot="menu" selected>Home</rr-menu-item>
          <rr-menu-item slot="menu">Aanvragen & activeren</rr-menu-item>
          <rr-menu-item slot="menu">Manieren van inloggen</rr-menu-item>
        </rr-top-navigation-bar>
      </div>
    </div>
  `,
};
