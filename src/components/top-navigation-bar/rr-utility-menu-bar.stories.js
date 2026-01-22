import { html } from 'lit';
import './rr-utility-menu-bar.ts';

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
      file: 'src/components/top-navigation-bar/rr-utility-menu-bar.ts',
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
  render: () => html` <rr-utility-menu-bar account-label="Mijn DigID"></rr-utility-menu-bar> `,
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
  render: () => html` <rr-utility-menu-bar no-language-switch no-account></rr-utility-menu-bar> `,
};

/**
 * Small container - text hidden, icons only.
 */
export const SmallContainer = {
  render: () => html`
    <rr-utility-menu-bar container="s" account-label="Mijn DigID"></rr-utility-menu-bar>
  `,
};

/**
 * Large container.
 */
export const LargeContainer = {
  render: () => html`
    <rr-utility-menu-bar container="l" account-label="Mijn DigID"></rr-utility-menu-bar>
  `,
};

/**
 * English language variant.
 */
export const EnglishLanguage = {
  render: () => html`
    <rr-utility-menu-bar language="EN" account-label="My Account"></rr-utility-menu-bar>
  `,
};

/**
 * With Help and Settings.
 */
export const WithHelpAndSettings = {
  render: () => html`
    <rr-utility-menu-bar has-help has-settings account-label="Mijn DigID"></rr-utility-menu-bar>
  `,
};

/**
 * All container sizes comparison.
 */
export const AllSizes = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; align-items: flex-start;">
      <div>
        <p style="margin: 0 0 8px; font-family: system-ui; color: #64748b; font-size: 12px;">
          Container S (icons only)
        </p>
        <rr-utility-menu-bar container="s" account-label="Mijn DigID"></rr-utility-menu-bar>
      </div>
      <div>
        <p style="margin: 0 0 8px; font-family: system-ui; color: #64748b; font-size: 12px;">
          Container M (default)
        </p>
        <rr-utility-menu-bar container="m" account-label="Mijn DigID"></rr-utility-menu-bar>
      </div>
      <div>
        <p style="margin: 0 0 8px; font-family: system-ui; color: #64748b; font-size: 12px;">
          Container L
        </p>
        <rr-utility-menu-bar container="l" account-label="Mijn DigID"></rr-utility-menu-bar>
      </div>
    </div>
  `,
};

/**
 * Mijn Overheid branding.
 */
export const MijnOverheidBranding = {
  render: () => html` <rr-utility-menu-bar account-label="Mijn Overheid"></rr-utility-menu-bar> `,
};

/**
 * Dropdown state control demo (aria-expanded support).
 * This demonstrates the toggleDropdown() and closeAllDropdowns() methods for WCAG compliance.
 */
export const DropdownStateDemo = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <rr-utility-menu-bar id="demo-utility-bar" account-label="Mijn DigID"></rr-utility-menu-bar>

      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button
          @click="${() => {
            const utilityBar = document.getElementById('demo-utility-bar');
            utilityBar.toggleDropdown('language', true);
          }}"
          style="padding: 8px 16px; background: #154273; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Open Language Dropdown
        </button>
        <button
          @click="${() => {
            const utilityBar = document.getElementById('demo-utility-bar');
            utilityBar.toggleDropdown('language', false);
          }}"
          style="padding: 8px 16px; background: #64748b; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Close Language Dropdown
        </button>
        <button
          @click="${() => {
            const utilityBar = document.getElementById('demo-utility-bar');
            utilityBar.toggleDropdown('account', true);
          }}"
          style="padding: 8px 16px; background: #154273; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Open Account Dropdown
        </button>
        <button
          @click="${() => {
            const utilityBar = document.getElementById('demo-utility-bar');
            utilityBar.toggleDropdown('account', false);
          }}"
          style="padding: 8px 16px; background: #64748b; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Close Account Dropdown
        </button>
        <button
          @click="${() => {
            const utilityBar = document.getElementById('demo-utility-bar');
            utilityBar.closeAllDropdowns();
          }}"
          style="padding: 8px 16px; background: #d52b1e; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Close All Dropdowns
        </button>
      </div>

      <p style="margin: 0; font-family: system-ui; color: #64748b; font-size: 14px;">
        Click the buttons above to toggle aria-expanded state on the dropdown buttons.
        This demonstrates WCAG-compliant screen reader support.
      </p>
    </div>
  `,
};
