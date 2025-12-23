import { html } from 'lit';
import './rr-nav-logo.js';

export default {
  title: 'Components/Top Navigation Bar/Logo',
  component: 'rr-nav-logo',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
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
    'has-wordmark': {
      control: 'boolean',
      description: 'Show wordmark text beside the logo',
    },
    title: {
      control: 'text',
      description: 'Main title text (e.g., Rijksoverheid, DigID)',
    },
    subtitle: {
      control: 'text',
      description: 'Subtitle text below the title',
    },
    'supporting-text-1': {
      control: 'text',
      description: 'First supporting text line',
    },
    'supporting-text-2': {
      control: 'text',
      description: 'Second supporting text line',
    },
  },
};

/**
 * Default logo - just the Rijkswapen (coat of arms) without wordmark.
 */
export const Default = {
  render: (args) => html`
    <rr-nav-logo
      container=${args.container || 'm'}
      ?has-wordmark=${args['has-wordmark']}
      title=${args.title || ''}
      subtitle=${args.subtitle || ''}
      supporting-text-1=${args['supporting-text-1'] || ''}
      supporting-text-2=${args['supporting-text-2'] || ''}
    ></rr-nav-logo>
  `,
  args: {
    container: 'm',
    'has-wordmark': false,
  },
};

/**
 * Logo with title wordmark - typical usage for branded applications.
 */
export const WithTitle = {
  render: () => html`
    <rr-nav-logo
      has-wordmark
      title="Rijksoverheid"
    ></rr-nav-logo>
  `,
};

/**
 * Logo with title and subtitle.
 */
export const WithTitleAndSubtitle = {
  render: () => html`
    <rr-nav-logo
      has-wordmark
      title="Rijksoverheid"
      subtitle="Ministerie van Binnenlandse Zaken"
    ></rr-nav-logo>
  `,
};

/**
 * Full wordmark with all text fields.
 */
export const FullWordmark = {
  render: () => html`
    <rr-nav-logo
      has-wordmark
      title="Rijksoverheid"
      subtitle="Ministerie van Binnenlandse Zaken"
      supporting-text-1="en Koninkrijksrelaties"
      supporting-text-2=""
    ></rr-nav-logo>
  `,
};

/**
 * DigID branding example.
 */
export const DigIDBranding = {
  render: () => html`
    <rr-nav-logo
      has-wordmark
      title="DigID"
    ></rr-nav-logo>
  `,
};

/**
 * Mijn Overheid branding example.
 */
export const MijnOverheidBranding = {
  render: () => html`
    <rr-nav-logo
      has-wordmark
      title="Mijn Overheid"
    ></rr-nav-logo>
  `,
};

/**
 * Small container size.
 */
export const SmallContainer = {
  render: () => html`
    <rr-nav-logo
      container="s"
      has-wordmark
      title="DigID"
    ></rr-nav-logo>
  `,
};

/**
 * Large container size.
 */
export const LargeContainer = {
  render: () => html`
    <rr-nav-logo
      container="l"
      has-wordmark
      title="DigID"
    ></rr-nav-logo>
  `,
};

/**
 * All container sizes comparison.
 */
export const AllSizes = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px; align-items: flex-start;">
      <div>
        <p style="margin: 0 0 8px; font-family: system-ui; color: #64748b; font-size: 12px;">Container S</p>
        <rr-nav-logo container="s" has-wordmark title="DigID"></rr-nav-logo>
      </div>
      <div>
        <p style="margin: 0 0 8px; font-family: system-ui; color: #64748b; font-size: 12px;">Container M (default)</p>
        <rr-nav-logo container="m" has-wordmark title="DigID"></rr-nav-logo>
      </div>
      <div>
        <p style="margin: 0 0 8px; font-family: system-ui; color: #64748b; font-size: 12px;">Container L</p>
        <rr-nav-logo container="l" has-wordmark title="DigID"></rr-nav-logo>
      </div>
    </div>
  `,
};

/**
 * Logo only variants (no wordmark).
 */
export const LogoOnlyAllSizes = {
  render: () => html`
    <div style="display: flex; gap: 32px; align-items: flex-end;">
      <div style="text-align: center;">
        <rr-nav-logo container="s"></rr-nav-logo>
        <p style="margin: 8px 0 0; font-family: system-ui; color: #64748b; font-size: 12px;">S</p>
      </div>
      <div style="text-align: center;">
        <rr-nav-logo container="m"></rr-nav-logo>
        <p style="margin: 8px 0 0; font-family: system-ui; color: #64748b; font-size: 12px;">M</p>
      </div>
      <div style="text-align: center;">
        <rr-nav-logo container="l"></rr-nav-logo>
        <p style="margin: 8px 0 0; font-family: system-ui; color: #64748b; font-size: 12px;">L</p>
      </div>
    </div>
  `,
};
