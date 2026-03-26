import { html } from 'lit';
import './rr-top-navigation-bar.ts';
import '../menu-bar/rr-menu-bar.ts';

export default {
  title: 'Components/Navigation/Top Navigation Bar',
  component: 'rr-top-navigation-bar',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    container: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant for responsive breakpoints',
      table: { category: 'Main' },
    },
    title: {
      control: 'text',
      description: 'Title text in navigation bar',
      table: { category: 'Main' },
    },
    'no-logo': {
      control: 'boolean',
      description: 'Hide the Rijksoverheid coat of arms logo',
      table: { category: 'Main' },
    },
    'no-title': {
      control: 'boolean',
      description: 'Hide the title text',
      table: { category: 'Main' },
    },
    'no-menu': {
      control: 'boolean',
      description: 'Hide the horizontal menu',
      table: { category: 'Main' },
    },
    'no-utility-bar': {
      control: 'boolean',
      description: 'Hide utility buttons',
      table: { category: 'Main' },
    },
    'has-back-button': {
      control: 'boolean',
      description: 'Show back navigation button',
      table: { category: 'Main' },
    },
    'logo-has-wordmark': {
      control: 'boolean',
      description: 'Show wordmark text beside the logo',
      table: { category: 'Logo' },
    },
    'logo-title': {
      control: 'text',
      description: 'Logo wordmark title',
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
    'utility-no-language-switch': {
      control: 'boolean',
      description: 'Hide language dropdown button',
      table: { category: 'Utility Menu' },
    },
    'utility-no-search': {
      control: 'boolean',
      description: 'Hide search button',
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
    'utility-no-account': {
      control: 'boolean',
      description: 'Hide account button',
      table: { category: 'Utility Menu' },
    },
    'utility-language': {
      control: 'text',
      description: 'Language code (e.g., NL, EN)',
      table: { category: 'Utility Menu' },
    },
    'utility-account-label': {
      control: 'text',
      description: 'Account button label',
      table: { category: 'Utility Menu' },
    },
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

export const Default = {
  render: () => html`
    <rr-top-navigation-bar title="DigID">
      <rr-menu-bar-item slot="menu" selected>Home</rr-menu-bar-item>
      <rr-menu-bar-item slot="menu">Aanvragen & activeren</rr-menu-bar-item>
      <rr-menu-bar-item slot="menu">Manieren van inloggen</rr-menu-bar-item>
      <rr-menu-bar-item slot="menu">Veiligheid</rr-menu-bar-item>
      <rr-menu-bar-item slot="menu">Hulp</rr-menu-bar-item>
    </rr-top-navigation-bar>
  `,
};

export const WithLogoWordmark = {
  render: () => html`
    <rr-top-navigation-bar title="DigID" logo-has-wordmark logo-title="Rijksoverheid">
      <rr-menu-bar-item slot="menu" selected>Home</rr-menu-bar-item>
      <rr-menu-bar-item slot="menu">Aanvragen & activeren</rr-menu-bar-item>
      <rr-menu-bar-item slot="menu">Manieren van inloggen</rr-menu-bar-item>
    </rr-top-navigation-bar>
  `,
};

export const FullLogoWordmark = {
  render: () => html`
    <rr-top-navigation-bar
      title="DigID"
      logo-has-wordmark
      logo-title="Rijksoverheid"
      logo-subtitle="Ministerie van Binnenlandse Zaken"
      logo-supporting-text-1="en Koninkrijksrelaties"
    >
      <rr-menu-bar-item slot="menu" selected>Home</rr-menu-bar-item>
      <rr-menu-bar-item slot="menu">Aanvragen & activeren</rr-menu-bar-item>
      <rr-menu-bar-item slot="menu">Hulp</rr-menu-bar-item>
    </rr-top-navigation-bar>
  `,
};

export const WithBackButton = {
  render: () => html`
    <rr-top-navigation-bar
      title="DigID"
      has-back-button
      back-href="/"
      back-label="Terug naar overzicht"
    >
      <rr-menu-bar-item slot="menu">Aanvragen & activeren</rr-menu-bar-item>
    </rr-top-navigation-bar>
  `,
};

export const LargeContainer = {
  render: () => html`
    <rr-top-navigation-bar container="lg" title="DigID">
      <rr-menu-bar-item slot="menu" selected>Home</rr-menu-bar-item>
      <rr-menu-bar-item slot="menu">Aanvragen & activeren</rr-menu-bar-item>
      <rr-menu-bar-item slot="menu">Manieren van inloggen</rr-menu-bar-item>
      <rr-menu-bar-item slot="menu">Veiligheid</rr-menu-bar-item>
      <rr-menu-bar-item slot="menu">Hulp</rr-menu-bar-item>
    </rr-top-navigation-bar>
  `,
};

export const SmallContainer = {
  render: () => html`
    <rr-top-navigation-bar container="sm" title="DigID">
      <rr-menu-bar-item slot="menu" selected>Home</rr-menu-bar-item>
      <rr-menu-bar-item slot="menu">Aanvragen & activeren</rr-menu-bar-item>
      <rr-menu-bar-item slot="menu">Manieren van inloggen</rr-menu-bar-item>
    </rr-top-navigation-bar>
  `,
};

export const WithoutTitle = {
  render: () => html`
    <rr-top-navigation-bar no-title>
      <rr-menu-bar-item slot="menu" selected>Home</rr-menu-bar-item>
      <rr-menu-bar-item slot="menu">Menu item</rr-menu-bar-item>
      <rr-menu-bar-item slot="menu">Menu item</rr-menu-bar-item>
    </rr-top-navigation-bar>
  `,
};

export const MinimalLogo = {
  render: () => html`
    <rr-top-navigation-bar no-title no-menu no-utility-bar></rr-top-navigation-bar>
  `,
};

export const MijnOverheid = {
  render: () => html`
    <rr-top-navigation-bar title="Mijn Overheid" logo-has-wordmark logo-title="Rijksoverheid">
      <rr-menu-bar-item slot="menu" selected>Overzicht</rr-menu-bar-item>
      <rr-menu-bar-item slot="menu">Berichten</rr-menu-bar-item>
      <rr-menu-bar-item slot="menu">Lopende zaken</rr-menu-bar-item>
      <rr-menu-bar-item slot="menu">Persoonlijk</rr-menu-bar-item>
    </rr-top-navigation-bar>
  `,
};

export const AllStates = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <h3 style="margin: 0 0 8px; font-family: system-ui;">Container L (Desktop)</h3>
        <rr-top-navigation-bar container="lg" title="DigID">
          <rr-menu-bar-item slot="menu" selected>Home</rr-menu-bar-item>
          <rr-menu-bar-item slot="menu">Aanvragen & activeren</rr-menu-bar-item>
          <rr-menu-bar-item slot="menu">Manieren van inloggen</rr-menu-bar-item>
          <rr-menu-bar-item slot="menu">Veiligheid</rr-menu-bar-item>
          <rr-menu-bar-item slot="menu">Hulp</rr-menu-bar-item>
        </rr-top-navigation-bar>
      </div>
      <div>
        <h3 style="margin: 0 0 8px; font-family: system-ui;">Container M (Tablet)</h3>
        <rr-top-navigation-bar container="md" title="DigID">
          <rr-menu-bar-item slot="menu" selected>Home</rr-menu-bar-item>
          <rr-menu-bar-item slot="menu">Aanvragen & activeren</rr-menu-bar-item>
          <rr-menu-bar-item slot="menu">Manieren van inloggen</rr-menu-bar-item>
          <rr-menu-bar-item slot="menu">Veiligheid</rr-menu-bar-item>
          <rr-menu-bar-item slot="menu">Hulp</rr-menu-bar-item>
        </rr-top-navigation-bar>
      </div>
      <div>
        <h3 style="margin: 0 0 8px; font-family: system-ui;">Container S (Mobile)</h3>
        <rr-top-navigation-bar container="sm" title="DigID">
          <rr-menu-bar-item slot="menu" selected>Home</rr-menu-bar-item>
          <rr-menu-bar-item slot="menu">Aanvragen & activeren</rr-menu-bar-item>
          <rr-menu-bar-item slot="menu">Manieren van inloggen</rr-menu-bar-item>
        </rr-top-navigation-bar>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } },
};
