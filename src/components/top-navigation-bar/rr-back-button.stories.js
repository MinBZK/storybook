import { html } from 'lit';
import './rr-back-button.js';

/**
 * De Back Button is een navigatieknop voor terugkeren naar de vorige pagina.
 * Onderdeel van de Top Navigation Bar component.
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=48-2135)
 *
 * ## Gebruik
 * ```html
 * <rr-back-button href="/vorige" label="Terug"></rr-back-button>
 * <rr-back-button label="Terug" @click="${handleClick}"></rr-back-button>
 * ```
 */
export default {
  title: 'Components/Top Navigation Bar/Back Button',
  component: 'rr-back-button',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=48-2135',
    },
    componentSource: {
      file: 'src/components/top-navigation-bar/rr-back-button.js',
      repository: 'https://github.com/regelrecht/design-system',
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
      options: ['s', 'm', 'l'],
      description: 'Size variant for responsive breakpoints',
    },
  },
};

/**
 * Default back button.
 */
export const Default = {
  render: (args) => html`
    <rr-back-button
      href=${args.href || ''}
      label=${args.label || 'Terug'}
      container=${args.container || 'm'}
    ></rr-back-button>
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
  render: () => html` <rr-back-button href="/" label="Terug naar home"></rr-back-button> `,
};

/**
 * As a button (no href, fires event).
 */
export const AsButton = {
  render: () => html`
    <rr-back-button
      label="Terug"
      @back-click=${() => alert('Back button clicked!')}
    ></rr-back-button>
  `,
};

/**
 * Custom label.
 */
export const CustomLabel = {
  render: () => html` <rr-back-button label="Ga terug"></rr-back-button> `,
};

/**
 * English label.
 */
export const EnglishLabel = {
  render: () => html` <rr-back-button label="Back"></rr-back-button> `,
};

/**
 * Small container - icon only.
 */
export const SmallContainer = {
  render: () => html` <rr-back-button container="s" label="Terug"></rr-back-button> `,
};

/**
 * Large container.
 */
export const LargeContainer = {
  render: () => html` <rr-back-button container="l" label="Terug"></rr-back-button> `,
};

/**
 * All sizes comparison.
 */
export const AllSizes = {
  render: () => html`
    <div style="display: flex; gap: 24px; align-items: center;">
      <div style="text-align: center;">
        <rr-back-button container="s" label="Terug"></rr-back-button>
        <p style="margin: 8px 0 0; font-family: system-ui; color: #64748b; font-size: 12px;">
          S (icon only)
        </p>
      </div>
      <div style="text-align: center;">
        <rr-back-button container="m" label="Terug"></rr-back-button>
        <p style="margin: 8px 0 0; font-family: system-ui; color: #64748b; font-size: 12px;">
          M (default)
        </p>
      </div>
      <div style="text-align: center;">
        <rr-back-button container="l" label="Terug"></rr-back-button>
        <p style="margin: 8px 0 0; font-family: system-ui; color: #64748b; font-size: 12px;">L</p>
      </div>
    </div>
  `,
};

/**
 * Long label.
 */
export const LongLabel = {
  render: () => html` <rr-back-button label="Terug naar vorige pagina"></rr-back-button> `,
};
