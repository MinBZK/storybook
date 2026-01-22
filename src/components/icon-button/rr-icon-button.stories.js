import { html } from 'lit';
import './rr-icon-button.ts';

/**
 * De Icon Button component is een vierkante knop voor icoon-only acties.
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=240:1391)
 *
 * ## Gebruik
 * ```html
 * <rr-icon-button variant="accent-filled" size="m" aria-label="Sluiten">
 *   <svg>...</svg>
 * </rr-icon-button>
 * ```
 */
export default {
  title: 'Components/Icon Button',
  component: 'rr-icon-button',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=240:1391',
    },
    componentSource: {
      file: 'src/components/icon-button/rr-icon-button.js',
      repository: 'https://github.com/regelrecht/design-system',
    },
    status: {
      type: 'stable',
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'accent-filled',
        'accent-outlined',
        'accent-tinted',
        'neutral-tinted',
        'accent-transparent',
      ],
      description: 'Visual style variant',
      table: {
        defaultValue: { summary: 'accent-filled' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 's', 'm'],
      description: 'Button size',
      table: {
        defaultValue: { summary: 'm' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: {
        defaultValue: { summary: false },
      },
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Button type attribute',
      table: {
        defaultValue: { summary: 'button' },
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label (required for screen readers)',
    },
  },
  args: {
    variant: 'accent-filled',
    size: 'm',
    disabled: false,
    type: 'button',
    ariaLabel: 'Icon button',
  },
};

// Reusable icon SVG
const closeIcon = html`
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
`;

const searchIcon = html`
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
`;

const menuIcon = html`
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
  >
    <path d="M3 12h18M3 6h18M3 18h18" />
  </svg>
`;

const settingsIcon = html`
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 6v6M1 12h6m6 0h6" />
  </svg>
`;

const Template = ({ variant, size, disabled, type, ariaLabel }) => html`
  <rr-icon-button
    variant=${variant}
    size=${size}
    ?disabled=${disabled}
    type=${type}
    aria-label=${ariaLabel}
  >
    ${closeIcon}
  </rr-icon-button>
`;

// Primary story
export const Default = Template.bind({});
Default.args = {
  ariaLabel: 'Sluiten',
};

// All variants
export const AccentFilled = Template.bind({});
AccentFilled.args = {
  variant: 'accent-filled',
  ariaLabel: 'Accent filled',
};

export const AccentOutlined = Template.bind({});
AccentOutlined.args = {
  variant: 'accent-outlined',
  ariaLabel: 'Accent outlined',
};

export const AccentTinted = Template.bind({});
AccentTinted.args = {
  variant: 'accent-tinted',
  ariaLabel: 'Accent tinted',
};

export const NeutralTinted = Template.bind({});
NeutralTinted.args = {
  variant: 'neutral-tinted',
  ariaLabel: 'Neutral tinted',
};

export const AccentTransparent = Template.bind({});
AccentTransparent.args = {
  variant: 'accent-transparent',
  ariaLabel: 'Accent transparent',
};

// Sizes
export const ExtraSmall = Template.bind({});
ExtraSmall.args = {
  size: 'xs',
  ariaLabel: 'Extra small',
};

export const Small = Template.bind({});
Small.args = {
  size: 's',
  ariaLabel: 'Small',
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'm',
  ariaLabel: 'Medium',
};

// States
export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  ariaLabel: 'Disabled',
};

// All variants overview
export const AllVariants = () => html`
  <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
    <rr-icon-button variant="accent-filled" aria-label="Accent filled">${closeIcon}</rr-icon-button>
    <rr-icon-button variant="accent-outlined" aria-label="Accent outlined"
      >${closeIcon}</rr-icon-button
    >
    <rr-icon-button variant="accent-tinted" aria-label="Accent tinted">${closeIcon}</rr-icon-button>
    <rr-icon-button variant="neutral-tinted" aria-label="Neutral tinted"
      >${closeIcon}</rr-icon-button
    >
    <rr-icon-button variant="accent-transparent" aria-label="Accent transparent"
      >${closeIcon}</rr-icon-button
    >
  </div>
`;
AllVariants.parameters = {
  controls: { disable: true },
};

// All sizes overview
export const AllSizes = () => html`
  <div style="display: flex; gap: 1rem; align-items: center;">
    <rr-icon-button size="xs" aria-label="Extra small">${closeIcon}</rr-icon-button>
    <rr-icon-button size="s" aria-label="Small">${closeIcon}</rr-icon-button>
    <rr-icon-button size="m" aria-label="Medium">${closeIcon}</rr-icon-button>
  </div>
`;
AllSizes.parameters = {
  controls: { disable: true },
};

// Matrix of all combinations
export const VariantSizeMatrix = () => html`
  <table style="border-collapse: collapse; width: 100%;">
    <thead>
      <tr>
        <th style="text-align: left; padding: 0.75rem; border-bottom: 2px solid #e2e8f0;">
          Variant
        </th>
        <th style="text-align: center; padding: 0.75rem; border-bottom: 2px solid #e2e8f0;">XS</th>
        <th style="text-align: center; padding: 0.75rem; border-bottom: 2px solid #e2e8f0;">S</th>
        <th style="text-align: center; padding: 0.75rem; border-bottom: 2px solid #e2e8f0;">M</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0;">accent-filled</td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-icon-button variant="accent-filled" size="xs" aria-label="Accent filled XS"
            >${closeIcon}</rr-icon-button
          >
        </td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-icon-button variant="accent-filled" size="s" aria-label="Accent filled S"
            >${closeIcon}</rr-icon-button
          >
        </td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-icon-button variant="accent-filled" size="m" aria-label="Accent filled M"
            >${closeIcon}</rr-icon-button
          >
        </td>
      </tr>
      <tr>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0;">accent-outlined</td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-icon-button variant="accent-outlined" size="xs" aria-label="Accent outlined XS"
            >${closeIcon}</rr-icon-button
          >
        </td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-icon-button variant="accent-outlined" size="s" aria-label="Accent outlined S"
            >${closeIcon}</rr-icon-button
          >
        </td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-icon-button variant="accent-outlined" size="m" aria-label="Accent outlined M"
            >${closeIcon}</rr-icon-button
          >
        </td>
      </tr>
      <tr>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0;">accent-tinted</td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-icon-button variant="accent-tinted" size="xs" aria-label="Accent tinted XS"
            >${closeIcon}</rr-icon-button
          >
        </td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-icon-button variant="accent-tinted" size="s" aria-label="Accent tinted S"
            >${closeIcon}</rr-icon-button
          >
        </td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-icon-button variant="accent-tinted" size="m" aria-label="Accent tinted M"
            >${closeIcon}</rr-icon-button
          >
        </td>
      </tr>
      <tr>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0;">neutral-tinted</td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-icon-button variant="neutral-tinted" size="xs" aria-label="Neutral tinted XS"
            >${closeIcon}</rr-icon-button
          >
        </td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-icon-button variant="neutral-tinted" size="s" aria-label="Neutral tinted S"
            >${closeIcon}</rr-icon-button
          >
        </td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-icon-button variant="neutral-tinted" size="m" aria-label="Neutral tinted M"
            >${closeIcon}</rr-icon-button
          >
        </td>
      </tr>
      <tr>
        <td style="padding: 0.75rem;">accent-transparent</td>
        <td style="padding: 0.75rem; text-align: center;">
          <rr-icon-button variant="accent-transparent" size="xs" aria-label="Accent transparent XS"
            >${closeIcon}</rr-icon-button
          >
        </td>
        <td style="padding: 0.75rem; text-align: center;">
          <rr-icon-button variant="accent-transparent" size="s" aria-label="Accent transparent S"
            >${closeIcon}</rr-icon-button
          >
        </td>
        <td style="padding: 0.75rem; text-align: center;">
          <rr-icon-button variant="accent-transparent" size="m" aria-label="Accent transparent M"
            >${closeIcon}</rr-icon-button
          >
        </td>
      </tr>
    </tbody>
  </table>
`;
VariantSizeMatrix.parameters = {
  controls: { disable: true },
};

// Different icons
export const DifferentIcons = () => html`
  <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
    <rr-icon-button variant="accent-filled" aria-label="Sluiten">${closeIcon}</rr-icon-button>
    <rr-icon-button variant="accent-filled" aria-label="Zoeken">${searchIcon}</rr-icon-button>
    <rr-icon-button variant="accent-filled" aria-label="Menu">${menuIcon}</rr-icon-button>
    <rr-icon-button variant="accent-filled" aria-label="Instellingen"
      >${settingsIcon}</rr-icon-button
    >
  </div>
`;
DifferentIcons.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story:
        'Icon buttons met verschillende iconen. Zorg altijd voor een duidelijke `aria-label` voor toegankelijkheid.',
    },
  },
};

// Icon button groups
export const IconButtonGroups = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">Toolbar acties</h3>
      <div style="display: flex; gap: 0.5rem;">
        <rr-icon-button variant="accent-transparent" aria-label="Menu">${menuIcon}</rr-icon-button>
        <rr-icon-button variant="accent-transparent" aria-label="Zoeken"
          >${searchIcon}</rr-icon-button
        >
        <rr-icon-button variant="accent-transparent" aria-label="Instellingen"
          >${settingsIcon}</rr-icon-button
        >
        <rr-icon-button variant="accent-transparent" aria-label="Sluiten"
          >${closeIcon}</rr-icon-button
        >
      </div>
    </div>
    <div>
      <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">Dialog knoppen</h3>
      <div style="display: flex; gap: 0.5rem;">
        <rr-icon-button variant="neutral-tinted" size="s" aria-label="Sluiten"
          >${closeIcon}</rr-icon-button
        >
        <rr-icon-button variant="neutral-tinted" size="s" aria-label="Instellingen"
          >${settingsIcon}</rr-icon-button
        >
      </div>
    </div>
    <div>
      <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">Primaire acties</h3>
      <div style="display: flex; gap: 0.5rem;">
        <rr-icon-button variant="accent-filled" aria-label="Zoeken">${searchIcon}</rr-icon-button>
        <rr-icon-button variant="accent-outlined" aria-label="Menu">${menuIcon}</rr-icon-button>
      </div>
    </div>
  </div>
`;
IconButtonGroups.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Voorbeelden van icon button groepen in verschillende contexten.',
    },
  },
};

// Figma Comparison - visual comparison with Figma design
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Our icon buttons (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="240:1391" style="display: inline-block;">
        <!-- Figma icon-button-list-cell: 6 buttons vertical (2 XS, 2 S, 2 M), gap: 16px, padding: 16px -->
        <div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
          <rr-icon-button variant="accent-filled" size="xs" aria-label="XS icon button"
            >${settingsIcon}</rr-icon-button
          >
          <rr-icon-button variant="accent-filled" size="xs" aria-label="XS icon button"
            >${settingsIcon}</rr-icon-button
          >
          <rr-icon-button variant="accent-filled" size="s" aria-label="S icon button"
            >${settingsIcon}</rr-icon-button
          >
          <rr-icon-button variant="accent-filled" size="s" aria-label="S icon button"
            >${settingsIcon}</rr-icon-button
          >
          <rr-icon-button variant="accent-filled" size="m" aria-label="M icon button"
            >${settingsIcon}</rr-icon-button
          >
          <rr-icon-button variant="accent-filled" size="m" aria-label="M icon button"
            >${settingsIcon}</rr-icon-button
          >
        </div>
      </ftl-holster>
      <p style="font-size: 0.75rem; color: #64748b; margin-top: 0.5rem;">
        Keyboard: T (toggle) | O (overlay) | S (side-by-side)
      </p>
    </div>
  </ftl-belt>
`;
FigmaComparison.storyName = '🎨 Figma Comparison';
FigmaComparison.tags = ['!autodocs', 'figma'];
FigmaComparison.parameters = {
  controls: { disable: true },
};
