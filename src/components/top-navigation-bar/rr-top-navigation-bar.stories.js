import { html } from 'lit';
import './rr-top-navigation-bar.js';
import '../menu-bar/rr-menu-item.js';

/**
 * De Top Navigation Bar is de primaire navigatiecomponent voor Rijksoverheid websites.
 * Combineert logo, titel, horizontale menunavigatie en utility knoppen (taal, zoeken, account).
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=48-2135)
 *
 * ## Gebruik
 * ```html
 * <rr-top-navigation-bar title="DigID">
 *   <rr-menu-item slot="menu" selected>Home</rr-menu-item>
 *   <rr-menu-item slot="menu" href="/aanvragen">Aanvragen</rr-menu-item>
 * </rr-top-navigation-bar>
 * ```
 *
 * Verberg onderdelen met `no-*` attributen:
 * ```html
 * <rr-top-navigation-bar title="DigID" no-menu no-utility-bar>
 * </rr-top-navigation-bar>
 * ```
 */
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
    componentSource: {
      file: 'src/components/top-navigation-bar/rr-top-navigation-bar.js',
      repository: 'https://github.com/regelrecht/design-system',
    },
    status: {
      type: 'stable',
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
      description: 'Hide utility buttons (Language, Zoeken, Account)',
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
 * With logo wordmark - shows title beside the coat of arms.
 */
export const WithLogoWordmark = {
  render: () => html`
    <rr-top-navigation-bar title="DigID" logo-has-wordmark logo-title="Rijksoverheid">
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
    <rr-top-navigation-bar no-title>
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
    <rr-top-navigation-bar no-title no-menu no-utility-bar></rr-top-navigation-bar>
  `,
};

/**
 * Mijn Overheid branding example.
 */
export const MijnOverheid = {
  render: () => html`
    <rr-top-navigation-bar title="Mijn Overheid" logo-has-wordmark logo-title="Rijksoverheid">
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
        <h3 style="margin: 0 0 8px; font-family: system-ui;">
          Container S (Mobile) - Menu items hidden
        </h3>
        <rr-top-navigation-bar container="s" title="DigID">
          <rr-menu-item slot="menu" selected>Home</rr-menu-item>
          <rr-menu-item slot="menu">Aanvragen & activeren</rr-menu-item>
          <rr-menu-item slot="menu">Manieren van inloggen</rr-menu-item>
        </rr-top-navigation-bar>
      </div>
    </div>
  `,
};

/**
 * Figma Comparison - pixel-perfect overlay comparison with Figma design.
 */
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = {
  name: '🎨 Figma Comparison',
  tags: ['!autodocs', 'figma'],
  render: () => html`
    <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h3 style="margin: 0 0 1rem 0; font-size: 1rem; color: #475569;">
            Top Navigation Bar - Default
          </h3>
          <ftl-holster node="48:2135" style="display: block; width: 100%;">
            <rr-top-navigation-bar title="DigID">
              <rr-menu-item slot="menu" selected>Home</rr-menu-item>
              <rr-menu-item slot="menu">Aanvragen & activeren</rr-menu-item>
              <rr-menu-item slot="menu">Manieren van inloggen</rr-menu-item>
              <rr-menu-item slot="menu">Veiligheid</rr-menu-item>
              <rr-menu-item slot="menu">Hulp</rr-menu-item>
            </rr-top-navigation-bar>
          </ftl-holster>
        </div>
        <p style="font-size: 0.875rem; color: #64748b; margin-top: 1rem;">
          Click on the component to toggle between your implementation and the Figma design overlay.
          Use keyboard shortcuts: T (toggle), O (overlay), S (side-by-side).
        </p>
      </div>
    </ftl-belt>
  `,
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Pixel-perfect vergelijking met Figma design. Klik op de component om te wisselen tussen implementatie en Figma overlay.',
      },
    },
  },
};
