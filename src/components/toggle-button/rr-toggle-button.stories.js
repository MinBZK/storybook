import { html } from 'lit';
import './rr-toggle-button.js';

/**
 * De Toggle Button component is een selecteerbare button die tussen aan/uit kan schakelen.
 * Ideaal voor filtering, weergave-opties, of multi-select acties.
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=309-3542)
 *
 * ## Gebruik
 * ```html
 * <rr-toggle-button size="m">Label</rr-toggle-button>
 * <rr-toggle-button selected>Geselecteerd</rr-toggle-button>
 * ```
 */
export default {
  title: 'Components/Toggle Button',
  component: 'rr-toggle-button',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=309-3542',
    },
    componentSource: {
      file: 'src/components/toggle-button/rr-toggle-button.js',
      repository: 'https://github.com/regelrecht/design-system',
    },
    status: {
      type: 'stable',
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 's', 'm'],
      description: 'Button size',
      table: {
        defaultValue: { summary: 'm' },
      },
    },
    selected: {
      control: 'boolean',
      description: 'Selected state',
      table: {
        defaultValue: { summary: false },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: {
        defaultValue: { summary: false },
      },
    },
    label: {
      control: 'text',
      description: 'Button label text',
    },
  },
  args: {
    label: 'Toggle',
    size: 'm',
    selected: false,
    disabled: false,
  },
};

const Template = ({ label, size, selected, disabled }) => html`
  <rr-toggle-button size=${size} ?selected=${selected} ?disabled=${disabled}
    >${label}</rr-toggle-button
  >
`;

// Primary story
export const Default = Template.bind({});
Default.args = {
  label: 'Toggle Button',
};

// States
export const Selected = Template.bind({});
Selected.args = {
  label: 'Selected',
  selected: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled',
  disabled: true,
};

export const SelectedDisabled = Template.bind({});
SelectedDisabled.args = {
  label: 'Selected & Disabled',
  selected: true,
  disabled: true,
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

// Interactive example
export const Interactive = () => {
  const handleToggle = (e) => {
    console.log('Toggle button state:', e.detail);
  };

  return html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <rr-toggle-button size="m" @toggle=${handleToggle}> Click to toggle </rr-toggle-button>
      <p style="font-size: 14px; color: #64748b;">Check the console to see toggle events</p>
    </div>
  `;
};
Interactive.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Interactieve toggle button die een event dispatched bij het togglen.',
    },
  },
};

// All sizes overview
export const AllSizes = () => html`
  <div style="display: flex; gap: 1rem; align-items: center;">
    <rr-toggle-button size="xs">Extra Small</rr-toggle-button>
    <rr-toggle-button size="s">Small</rr-toggle-button>
    <rr-toggle-button size="m">Medium</rr-toggle-button>
  </div>
`;
AllSizes.parameters = {
  controls: { disable: true },
};

// All states overview
export const AllStates = () => html`
  <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
    <rr-toggle-button>Default</rr-toggle-button>
    <rr-toggle-button selected>Selected</rr-toggle-button>
    <rr-toggle-button disabled>Disabled</rr-toggle-button>
    <rr-toggle-button selected disabled>Selected & Disabled</rr-toggle-button>
  </div>
`;
AllStates.parameters = {
  controls: { disable: true },
};

// With icons
export const WithIcon = () => html`
  <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
    <rr-toggle-button size="m">
      <svg
        slot="icon"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        />
      </svg>
      Like
    </rr-toggle-button>
    <rr-toggle-button size="m" selected>
      <svg
        slot="icon"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        />
      </svg>
      Liked
    </rr-toggle-button>
    <rr-toggle-button size="m">
      <svg
        slot="icon"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
      Bookmark
    </rr-toggle-button>
    <rr-toggle-button size="m" selected>
      <svg
        slot="icon"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
      Bookmarked
    </rr-toggle-button>
  </div>
`;
WithIcon.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Toggle buttons met iconen. Gebruik de `icon` slot om een icoon toe te voegen.',
    },
  },
};

// Button group example
export const ButtonGroup = () => html`
  <div style="display: flex; gap: 0; border-radius: 7px; overflow: hidden; width: fit-content;">
    <rr-toggle-button size="m" style="border-radius: 7px 0 0 7px;">
      <svg
        slot="icon"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="18" x2="20" y2="18" />
      </svg>
    </rr-toggle-button>
    <rr-toggle-button size="m" style="border-radius: 0; margin-left: -1px;">
      <svg
        slot="icon"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    </rr-toggle-button>
    <rr-toggle-button size="m" selected style="border-radius: 0 7px 7px 0; margin-left: -1px;">
      <svg
        slot="icon"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <rect x="3" y="3" width="18" height="18" />
      </svg>
    </rr-toggle-button>
  </div>
`;
ButtonGroup.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Voorbeeld van toggle buttons gegroepeerd voor een view switcher.',
    },
  },
};

// Size matrix
export const SizeMatrix = () => html`
  <table style="border-collapse: collapse; width: 100%;">
    <thead>
      <tr>
        <th style="text-align: left; padding: 0.75rem; border-bottom: 2px solid #e2e8f0;">Size</th>
        <th style="text-align: center; padding: 0.75rem; border-bottom: 2px solid #e2e8f0;">
          Default
        </th>
        <th style="text-align: center; padding: 0.75rem; border-bottom: 2px solid #e2e8f0;">
          Selected
        </th>
        <th style="text-align: center; padding: 0.75rem; border-bottom: 2px solid #e2e8f0;">
          Disabled
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0;">xs</td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-toggle-button size="xs">Label</rr-toggle-button>
        </td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-toggle-button size="xs" selected>Label</rr-toggle-button>
        </td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-toggle-button size="xs" disabled>Label</rr-toggle-button>
        </td>
      </tr>
      <tr>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0;">s</td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-toggle-button size="s">Label</rr-toggle-button>
        </td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-toggle-button size="s" selected>Label</rr-toggle-button>
        </td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-toggle-button size="s" disabled>Label</rr-toggle-button>
        </td>
      </tr>
      <tr>
        <td style="padding: 0.75rem;">m</td>
        <td style="padding: 0.75rem; text-align: center;">
          <rr-toggle-button size="m">Label</rr-toggle-button>
        </td>
        <td style="padding: 0.75rem; text-align: center;">
          <rr-toggle-button size="m" selected>Label</rr-toggle-button>
        </td>
        <td style="padding: 0.75rem; text-align: center;">
          <rr-toggle-button size="m" disabled>Label</rr-toggle-button>
        </td>
      </tr>
    </tbody>
  </table>
`;
SizeMatrix.parameters = {
  controls: { disable: true },
};

// Figma Comparison - visual comparison with Figma design
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Our toggle buttons (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="309:3542" style="display: inline-block;">
        <!-- Figma design: 3 M-size buttons + 3 S-size buttons, with gap: 16px, padding: 16px -->
        <div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
          <!-- M size buttons (rows 1-3) -->
          <rr-toggle-button size="m">Toggle button</rr-toggle-button>
          <rr-toggle-button size="m">Toggle button</rr-toggle-button>
          <rr-toggle-button size="m" selected>Toggle button</rr-toggle-button>
          <!-- S size buttons (rows 4-6) -->
          <rr-toggle-button size="s">Toggle button</rr-toggle-button>
          <rr-toggle-button size="s">Toggle button</rr-toggle-button>
          <rr-toggle-button size="s" selected>Toggle button</rr-toggle-button>
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
