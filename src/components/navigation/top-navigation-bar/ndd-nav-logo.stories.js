import { html } from 'lit';
import './ndd-nav-logo.js';

/**
 * De Nav Logo component toont het Rijkswapen logo met optionele titel en subtitel.
 * Onderdeel van de Top Navigation Bar component.
 *
 * ## Gebruik
 * ```html
 * <ndd-nav-logo title="Rijksoverheid"></ndd-nav-logo>
 * <ndd-nav-logo title="DigID" subtitle="Mijn DigiD" has-wordmark></ndd-nav-logo>
 * ```
 */
export default {
  title: 'Components/Navigation/Top Navigation Bar/Logo',
  component: 'ndd-nav-logo',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    componentSource: {
      file: 'src/components/navigation/top-navigation-bar/ndd-nav-logo.js',
      repository: 'https://github.com/MinBZK/storybook',
    },
    status: {
      type: 'stable',
    },
  },
  argTypes: {
    container: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
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
    <ndd-nav-logo
      container=${args.container || 'md'}
      ?has-wordmark=${args['has-wordmark']}
      title=${args.title || ''}
      subtitle=${args.subtitle || ''}
      supporting-text-1=${args['supporting-text-1'] || ''}
      supporting-text-2=${args['supporting-text-2'] || ''}
    ></ndd-nav-logo>
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
  render: () => html` <ndd-nav-logo has-wordmark title="Rijksoverheid"></ndd-nav-logo> `,
};

/**
 * Logo with title and subtitle.
 */
export const WithTitleAndSubtitle = {
  render: () => html`
    <ndd-nav-logo
      has-wordmark
      title="Rijksoverheid"
      subtitle="Ministerie van Binnenlandse Zaken"
    ></ndd-nav-logo>
  `,
};

/**
 * Full wordmark with all text fields.
 */
export const FullWordmark = {
  render: () => html`
    <ndd-nav-logo
      has-wordmark
      title="Rijksoverheid"
      subtitle="Ministerie van Binnenlandse Zaken"
      supporting-text-1="en Koninkrijksrelaties"
      supporting-text-2=""
    ></ndd-nav-logo>
  `,
};

/**
 * DigID branding example.
 */
export const DigIDBranding = {
  render: () => html` <ndd-nav-logo has-wordmark title="DigID"></ndd-nav-logo> `,
};

/**
 * Mijn Overheid branding example.
 */
export const MijnOverheidBranding = {
  render: () => html` <ndd-nav-logo has-wordmark title="Mijn Overheid"></ndd-nav-logo> `,
};

/**
 * Small container size.
 */
export const SmallContainer = {
  render: () => html` <ndd-nav-logo container="sm" has-wordmark title="DigID"></ndd-nav-logo> `,
};

/**
 * Large container size.
 */
export const LargeContainer = {
  render: () => html` <ndd-nav-logo container="lg" has-wordmark title="DigID"></ndd-nav-logo> `,
};

/**
 * All container sizes comparison.
 */
export const AllSizes = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px; align-items: flex-start;">
      <div>
        <p style="margin: 0 0 8px; font-family: system-ui; color: var(--semantics-content-color); font-size: 12px;">
          Container S
        </p>
        <ndd-nav-logo container="sm" has-wordmark title="DigID"></ndd-nav-logo>
      </div>
      <div>
        <p style="margin: 0 0 8px; font-family: system-ui; color: var(--semantics-content-color); font-size: 12px;">
          Container M (default)
        </p>
        <ndd-nav-logo container="md" has-wordmark title="DigID"></ndd-nav-logo>
      </div>
      <div>
        <p style="margin: 0 0 8px; font-family: system-ui; color: var(--semantics-content-color); font-size: 12px;">
          Container L
        </p>
        <ndd-nav-logo container="lg" has-wordmark title="DigID"></ndd-nav-logo>
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
        <ndd-nav-logo container="sm"></ndd-nav-logo>
        <p style="margin: 8px 0 0; font-family: system-ui; color: var(--semantics-content-color); font-size: 12px;">S</p>
      </div>
      <div style="text-align: center;">
        <ndd-nav-logo container="md"></ndd-nav-logo>
        <p style="margin: 8px 0 0; font-family: system-ui; color: var(--semantics-content-color); font-size: 12px;">M</p>
      </div>
      <div style="text-align: center;">
        <ndd-nav-logo container="lg"></ndd-nav-logo>
        <p style="margin: 8px 0 0; font-family: system-ui; color: var(--semantics-content-color); font-size: 12px;">L</p>
      </div>
    </div>
  `,
};
