import { html } from 'lit';
import './rr-button.js';

/**
 * De Button component is het primaire interactie-element voor gebruikersacties.
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=20-27)
 *
 * ## Gebruik
 * ```html
 * <rr-button variant="accent-filled" size="m">Label</rr-button>
 * ```
 */
export default {
  title: 'Components/Button',
  component: 'rr-button',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=20-27',
    },
    componentSource: {
      file: 'src/components/button/rr-button.js',
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
    label: {
      control: 'text',
      description: 'Button label text',
    },
    hasLeadingIcon: {
      control: 'boolean',
      description: 'Whether button has a leading icon',
      table: {
        defaultValue: { summary: false },
      },
    },
    hasTrailingIcon: {
      control: 'boolean',
      description: 'Whether button has a trailing icon',
      table: {
        defaultValue: { summary: false },
      },
    },
    hasMenu: {
      control: 'boolean',
      description: 'Whether button opens a menu (shows chevron)',
      table: {
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    label: 'Button',
    variant: 'accent-filled',
    size: 'm',
    disabled: false,
    type: 'button',
    hasLeadingIcon: false,
    hasTrailingIcon: false,
    hasMenu: false,
  },
};

const Template = ({ label, variant, size, disabled, type }) => html`
  <rr-button variant=${variant} size=${size} ?disabled=${disabled} type=${type}>${label}</rr-button>
`;

// Primary story
export const Default = Template.bind({});
Default.args = {
  label: 'Primary Action',
};

// All variants
export const AccentFilled = Template.bind({});
AccentFilled.args = {
  label: 'Accent Filled',
  variant: 'accent-filled',
};

export const AccentOutlined = Template.bind({});
AccentOutlined.args = {
  label: 'Accent Outlined',
  variant: 'accent-outlined',
};

export const AccentTinted = Template.bind({});
AccentTinted.args = {
  label: 'Accent Tinted',
  variant: 'accent-tinted',
};

export const NeutralTinted = Template.bind({});
NeutralTinted.args = {
  label: 'Neutral Tinted',
  variant: 'neutral-tinted',
};

export const AccentTransparent = Template.bind({});
AccentTransparent.args = {
  label: 'Accent Transparent',
  variant: 'accent-transparent',
};

// Sizes
export const ExtraSmall = Template.bind({});
ExtraSmall.args = {
  label: 'Extra Small',
  size: 'xs',
};

export const Small = Template.bind({});
Small.args = {
  label: 'Small',
  size: 's',
};

export const Medium = Template.bind({});
Medium.args = {
  label: 'Medium',
  size: 'm',
};

// States
export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled',
  disabled: true,
};

// All variants overview
export const AllVariants = () => html`
  <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
    <rr-button variant="accent-filled">Accent Filled</rr-button>
    <rr-button variant="accent-outlined">Accent Outlined</rr-button>
    <rr-button variant="accent-tinted">Accent Tinted</rr-button>
    <rr-button variant="neutral-tinted">Neutral Tinted</rr-button>
    <rr-button variant="accent-transparent">Accent Transparent</rr-button>
  </div>
`;
AllVariants.parameters = {
  controls: { disable: true },
};

// All sizes overview
export const AllSizes = () => html`
  <div style="display: flex; gap: 1rem; align-items: center;">
    <rr-button size="xs">Extra Small</rr-button>
    <rr-button size="s">Small</rr-button>
    <rr-button size="m">Medium</rr-button>
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
          <rr-button variant="accent-filled" size="xs">Label</rr-button>
        </td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-button variant="accent-filled" size="s">Label</rr-button>
        </td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-button variant="accent-filled" size="m">Label</rr-button>
        </td>
      </tr>
      <tr>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0;">accent-outlined</td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-button variant="accent-outlined" size="xs">Label</rr-button>
        </td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-button variant="accent-outlined" size="s">Label</rr-button>
        </td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-button variant="accent-outlined" size="m">Label</rr-button>
        </td>
      </tr>
      <tr>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0;">accent-tinted</td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-button variant="accent-tinted" size="xs">Label</rr-button>
        </td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-button variant="accent-tinted" size="s">Label</rr-button>
        </td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-button variant="accent-tinted" size="m">Label</rr-button>
        </td>
      </tr>
      <tr>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0;">neutral-tinted</td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-button variant="neutral-tinted" size="xs">Label</rr-button>
        </td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-button variant="neutral-tinted" size="s">Label</rr-button>
        </td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-button variant="neutral-tinted" size="m">Label</rr-button>
        </td>
      </tr>
      <tr>
        <td style="padding: 0.75rem;">accent-transparent</td>
        <td style="padding: 0.75rem; text-align: center;">
          <rr-button variant="accent-transparent" size="xs">Label</rr-button>
        </td>
        <td style="padding: 0.75rem; text-align: center;">
          <rr-button variant="accent-transparent" size="s">Label</rr-button>
        </td>
        <td style="padding: 0.75rem; text-align: center;">
          <rr-button variant="accent-transparent" size="m">Label</rr-button>
        </td>
      </tr>
    </tbody>
  </table>
`;
VariantSizeMatrix.parameters = {
  controls: { disable: true },
};

// Icon stories
export const WithLeadingIcon = () => html`
  <rr-button variant="accent-filled" size="m" has-leading-icon>
    <svg
      slot="icon-start"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
    Download
  </rr-button>
`;
WithLeadingIcon.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story:
        'Button met een icoon aan de linkerkant. Gebruik de `has-leading-icon` attribute en plaats een icoon in de `icon-start` slot.',
    },
  },
};

export const WithTrailingIcon = () => html`
  <rr-button variant="accent-filled" size="m" has-trailing-icon>
    Volgende
    <svg
      slot="icon-end"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  </rr-button>
`;
WithTrailingIcon.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story:
        'Button met een icoon aan de rechterkant. Gebruik de `has-trailing-icon` attribute en plaats een icoon in de `icon-end` slot.',
    },
  },
};

export const WithMenu = () => html`
  <rr-button variant="accent-outlined" size="m" has-menu>
    Opties
    <svg
      slot="icon-end"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  </rr-button>
`;
WithMenu.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story:
        'Button die een menu opent. Gebruik de `has-menu` attribute om aan te geven dat deze button een dropdown menu toont.',
    },
  },
};

export const WithBothIcons = () => html`
  <rr-button variant="accent-tinted" size="m" has-leading-icon has-trailing-icon>
    <svg
      slot="icon-start"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
    Download bestand
    <svg
      slot="icon-end"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  </rr-button>
`;
WithBothIcons.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story:
        'Button met zowel een leading als trailing icoon. Combineer `has-leading-icon` en `has-trailing-icon` attributes.',
    },
  },
};

export const IconVariants = () => html`
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <rr-button variant="accent-filled" has-leading-icon>
        <svg
          slot="icon-start"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
        </svg>
        Accent Filled
      </rr-button>
      <rr-button variant="accent-outlined" has-leading-icon>
        <svg
          slot="icon-start"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
        </svg>
        Accent Outlined
      </rr-button>
      <rr-button variant="accent-tinted" has-leading-icon>
        <svg
          slot="icon-start"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
        </svg>
        Accent Tinted
      </rr-button>
      <rr-button variant="neutral-tinted" has-leading-icon>
        <svg
          slot="icon-start"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
        </svg>
        Neutral Tinted
      </rr-button>
      <rr-button variant="accent-transparent" has-leading-icon>
        <svg
          slot="icon-start"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
        </svg>
        Accent Transparent
      </rr-button>
    </div>
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <rr-button variant="accent-filled" has-trailing-icon>
        Volgende
        <svg
          slot="icon-end"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </rr-button>
      <rr-button variant="accent-outlined" has-trailing-icon>
        Volgende
        <svg
          slot="icon-end"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </rr-button>
      <rr-button variant="accent-tinted" has-trailing-icon>
        Volgende
        <svg
          slot="icon-end"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </rr-button>
      <rr-button variant="neutral-tinted" has-trailing-icon>
        Volgende
        <svg
          slot="icon-end"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </rr-button>
      <rr-button variant="accent-transparent" has-trailing-icon>
        Volgende
        <svg
          slot="icon-end"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </rr-button>
    </div>
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <rr-button variant="accent-filled" has-menu>
        Menu
        <svg
          slot="icon-end"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </rr-button>
      <rr-button variant="accent-outlined" has-menu>
        Menu
        <svg
          slot="icon-end"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </rr-button>
      <rr-button variant="accent-tinted" has-menu>
        Menu
        <svg
          slot="icon-end"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </rr-button>
      <rr-button variant="neutral-tinted" has-menu>
        Menu
        <svg
          slot="icon-end"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </rr-button>
      <rr-button variant="accent-transparent" has-menu>
        Menu
        <svg
          slot="icon-end"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </rr-button>
    </div>
  </div>
`;
IconVariants.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Overzicht van buttons met iconen in alle beschikbare varianten.',
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
        Our buttons (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="20-27" style="display: inline-block;">
        <!-- 6 columns × 5 rows grid matching Figma button-list-cell layout exactly -->
        <!-- Columns: accent-filled, accent-outlined, accent-filled, accent-transparent, accent-tinted, neutral-tinted -->
        <!-- Rows: Size M (2 rows), Size S (2 rows), Size XS (1 row) pattern -->
        <div style="display: flex; flex-direction: column; gap: 8px; padding: 16px;">
          <!-- Row 1: Size M -->
          <div style="display: flex; gap: 8px; align-items: center;">
            <rr-button variant="accent-filled" size="m">Button</rr-button>
            <rr-button variant="accent-outlined" size="m">Button</rr-button>
            <rr-button variant="accent-filled" size="m">Button</rr-button>
            <rr-button variant="accent-transparent" size="m">Button</rr-button>
            <rr-button variant="accent-tinted" size="m">Button</rr-button>
            <rr-button variant="neutral-tinted" size="m">Button</rr-button>
          </div>
          <!-- Row 2: Size M repeat -->
          <div style="display: flex; gap: 8px; align-items: center;">
            <rr-button variant="accent-filled" size="m">Button</rr-button>
            <rr-button variant="accent-outlined" size="m">Button</rr-button>
            <rr-button variant="accent-filled" size="m">Button</rr-button>
            <rr-button variant="accent-transparent" size="m">Button</rr-button>
            <rr-button variant="accent-tinted" size="m">Button</rr-button>
            <rr-button variant="neutral-tinted" size="m">Button</rr-button>
          </div>
          <!-- Row 3: Size S -->
          <div style="display: flex; gap: 8px; align-items: center;">
            <rr-button variant="accent-filled" size="s">Button</rr-button>
            <rr-button variant="accent-outlined" size="s">Button</rr-button>
            <rr-button variant="accent-filled" size="s">Button</rr-button>
            <rr-button variant="accent-transparent" size="s">Button</rr-button>
            <rr-button variant="accent-tinted" size="s">Button</rr-button>
            <rr-button variant="neutral-tinted" size="s">Button</rr-button>
          </div>
          <!-- Row 4: Size S repeat -->
          <div style="display: flex; gap: 8px; align-items: center;">
            <rr-button variant="accent-filled" size="s">Button</rr-button>
            <rr-button variant="accent-outlined" size="s">Button</rr-button>
            <rr-button variant="accent-filled" size="s">Button</rr-button>
            <rr-button variant="accent-transparent" size="s">Button</rr-button>
            <rr-button variant="accent-tinted" size="s">Button</rr-button>
            <rr-button variant="neutral-tinted" size="s">Button</rr-button>
          </div>
          <!-- Row 5: Size XS -->
          <div style="display: flex; gap: 8px; align-items: center;">
            <rr-button variant="accent-filled" size="xs">Button</rr-button>
            <rr-button variant="accent-outlined" size="xs">Button</rr-button>
            <rr-button variant="accent-filled" size="xs">Button</rr-button>
            <rr-button variant="accent-transparent" size="xs">Button</rr-button>
            <rr-button variant="accent-tinted" size="xs">Button</rr-button>
            <rr-button variant="neutral-tinted" size="xs">Button</rr-button>
          </div>
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
