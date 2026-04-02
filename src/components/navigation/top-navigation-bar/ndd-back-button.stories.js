import { html } from 'lit';
import './ndd-back-button.js';

/**
 * De Back Button is een navigatieknop voor terugkeren naar de vorige pagina.
 * Onderdeel van de Top Navigation Bar component.
 *
 * ## Gebruik
 * ```html
 * <ndd-back-button href="/vorige" label="Terug"></ndd-back-button>
 * <ndd-back-button label="Terug" @click="${handleClick}"></ndd-back-button>
 * ```
 */
export default {
  title: 'Components/Navigation/Top Navigation Bar/Back Button',
  component: 'ndd-back-button',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    componentSource: {
      file: 'src/components/navigation/top-navigation-bar/ndd-back-button.js',
      repository: 'https://github.com/MinBZK/storybook',
    },
    status: {
      type: 'stable',
    },
  },
  argTypes: {
    href: {
      control: 'text',
      description: 'Link destination URL (renders as <a> if set, <button> if not)',
    },
    label: {
      control: 'text',
      description: 'Button text label',
    },
    container: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant for responsive breakpoints',
    },
  },
};

/**
 * Default back button.
 */
export const Default = {
  render: (args) => html`
    <ndd-back-button
      href=${args.href || ''}
      label=${args.label || 'Terug'}
      container=${args.container || 'md'}
    ></ndd-back-button>
  `,
  args: {
    label: 'Terug',
    container: 'm',
  },
};

/**
 * As a link (with href).
 */
export const AsLink = {
  render: () => html` <ndd-back-button href="/" label="Terug naar home"></ndd-back-button> `,
};

/**
 * As a button (no href, fires event).
 */
export const AsButton = {
  render: () => html`
    <ndd-back-button
      label="Terug"
      @back-click=${() => alert('Back button clicked!')}
    ></ndd-back-button>
  `,
};

/**
 * Custom label.
 */
export const CustomLabel = {
  render: () => html` <ndd-back-button label="Ga terug"></ndd-back-button> `,
};

/**
 * English label.
 */
export const EnglishLabel = {
  render: () => html` <ndd-back-button label="Back"></ndd-back-button> `,
};

/**
 * Small container - icon only.
 */
export const SmallContainer = {
  render: () => html` <ndd-back-button container="sm" label="Terug"></ndd-back-button> `,
};

/**
 * Large container.
 */
export const LargeContainer = {
  render: () => html` <ndd-back-button container="lg" label="Terug"></ndd-back-button> `,
};

/**
 * All sizes comparison.
 */
export const AllSizes = {
  render: () => html`
    <div style="display: flex; gap: 24px; align-items: center;">
      <div style="text-align: center;">
        <ndd-back-button container="sm" label="Terug"></ndd-back-button>
        <p style="margin: 8px 0 0; font-family: system-ui; color: var(--semantics-content-color); font-size: 12px;">
          S (icon only)
        </p>
      </div>
      <div style="text-align: center;">
        <ndd-back-button container="md" label="Terug"></ndd-back-button>
        <p style="margin: 8px 0 0; font-family: system-ui; color: var(--semantics-content-color); font-size: 12px;">
          M (default)
        </p>
      </div>
      <div style="text-align: center;">
        <ndd-back-button container="lg" label="Terug"></ndd-back-button>
        <p style="margin: 8px 0 0; font-family: system-ui; color: var(--semantics-content-color); font-size: 12px;">L</p>
      </div>
    </div>
  `,
};

/**
 * Long label.
 */
export const LongLabel = {
  render: () => html` <ndd-back-button label="Terug naar vorige pagina"></ndd-back-button> `,
};
