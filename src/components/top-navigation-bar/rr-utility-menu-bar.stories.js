import { html } from 'lit';
import './rr-utility-menu-bar.js';

/**
 * De Utility Menu Bar bevat secundaire navigatie-elementen zoals taalkeuze, zoeken en account.
 * Onderdeel van de Top Navigation Bar component.
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=48-2135)
 *
 * ## Gebruik
 * ```html
 * <rr-utility-menu-bar
 *   has-language-switch
 *   has-search
 *   has-account
 * ></rr-utility-menu-bar>
 * ```
 */
export default {
  title: 'Components/Top Navigation Bar/Utility Menu Bar',
  component: 'rr-utility-menu-bar',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=48-2135',
    },
    componentSource: {
      file: 'src/components/top-navigation-bar/rr-utility-menu-bar.js',
      repository: 'https://github.com/regelrecht/design-system',
    },
    status: {
      type: 'stable',
    },
  },
  argTypes: {
    container: {
      control: 'select',
      options: ['s', 'm', 'l'],
      description: 'Size variant for responsive breakpoints',
    },
    'no-language-switch': {
      control: 'boolean',
      description: 'Hide language dropdown button',
    },
    'no-search': {
      control: 'boolean',
      description: 'Hide search button',
    },
    'no-account': {
      control: 'boolean',
      description: 'Hide account button',
    },
    'has-help': {
      control: 'boolean',
      description: 'Show help button',
    },
    'has-settings': {
      control: 'boolean',
      description: 'Show settings button',
    },
    language: {
      control: 'text',
      description: 'Current language code',
    },
    'account-label': {
      control: 'text',
      description: 'Account button label text',
    },
  },
};

/**
 * Default utility menu bar with Language, Search, and Account buttons.
 */
export const Default = {
  render: () => html`
    <rr-utility-menu-bar account-label="Mijn DigID"></rr-utility-menu-bar>
  `,
};

/**
 * All buttons visible.
 */
export const AllButtons = {
  render: () => html`
    <rr-utility-menu-bar
      has-language-switch
      has-search
      has-help
      has-settings
      has-account
      account-label="Mijn Account"
    ></rr-utility-menu-bar>
  `,
};

/**
 * Minimal - only search.
 */
export const SearchOnly = {
  render: () => html`
    <rr-utility-menu-bar no-language-switch no-account></rr-utility-menu-bar>
  `,
};

/**
 * Small container - text hidden, icons only.
 */
export const SmallContainer = {
  render: () => html`
    <rr-utility-menu-bar
      container="s"
      account-label="Mijn DigID"
    ></rr-utility-menu-bar>
  `,
};

/**
 * Large container.
 */
export const LargeContainer = {
  render: () => html`
    <rr-utility-menu-bar
      container="l"
      account-label="Mijn DigID"
    ></rr-utility-menu-bar>
  `,
};

/**
 * English language variant.
 */
export const EnglishLanguage = {
  render: () => html`
    <rr-utility-menu-bar
      language="EN"
      account-label="My Account"
    ></rr-utility-menu-bar>
  `,
};

/**
 * With Help and Settings.
 */
export const WithHelpAndSettings = {
  render: () => html`
    <rr-utility-menu-bar
      has-help
      has-settings
      account-label="Mijn DigID"
    ></rr-utility-menu-bar>
  `,
};

/**
 * All container sizes comparison.
 */
export const AllSizes = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; align-items: flex-start;">
      <div>
        <p style="margin: 0 0 8px; font-family: system-ui; color: #64748b; font-size: 12px;">Container S (icons only)</p>
        <rr-utility-menu-bar container="s" account-label="Mijn DigID"></rr-utility-menu-bar>
      </div>
      <div>
        <p style="margin: 0 0 8px; font-family: system-ui; color: #64748b; font-size: 12px;">Container M (default)</p>
        <rr-utility-menu-bar container="m" account-label="Mijn DigID"></rr-utility-menu-bar>
      </div>
      <div>
        <p style="margin: 0 0 8px; font-family: system-ui; color: #64748b; font-size: 12px;">Container L</p>
        <rr-utility-menu-bar container="l" account-label="Mijn DigID"></rr-utility-menu-bar>
      </div>
    </div>
  `,
};

/**
 * Mijn Overheid branding.
 */
export const MijnOverheidBranding = {
  render: () => html`
    <rr-utility-menu-bar
      account-label="Mijn Overheid"
    ></rr-utility-menu-bar>
  `,
};
