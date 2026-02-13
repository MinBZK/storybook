import { html } from 'lit';
import './rr-button-group.ts';
import '../../actions/button/rr-button.ts';

export default {
  title: 'Components/Control Groups/Button Group',
  component: 'rr-button-group',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1339:3762',
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['s', 'm'],
      description: 'Button group size',
    },
    flow: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout direction',
    },
  },
};

export const Default = {
  args: { size: 'm', flow: 'horizontal' },
  render: (args) => html`
    <rr-button-group size=${args.size} flow=${args.flow}>
      <rr-button size=${args.size} variant="accent-filled">Button</rr-button>
      <rr-button size=${args.size} variant="neutral-tinted">Button</rr-button>
    </rr-button-group>
  `,
};

export const Vertical = {
  args: { size: 'm', flow: 'vertical' },
  render: (args) => html`
    <rr-button-group size=${args.size} flow=${args.flow} style="width: 200px;">
      <rr-button size=${args.size} variant="accent-filled">Button</rr-button>
      <rr-button size=${args.size} variant="neutral-tinted">Button</rr-button>
    </rr-button-group>
  `,
};

export const SizeSmall = {
  args: { size: 's', flow: 'horizontal' },
  render: (args) => html`
    <rr-button-group size=${args.size} flow=${args.flow}>
      <rr-button size=${args.size} variant="accent-filled">Button</rr-button>
      <rr-button size=${args.size} variant="neutral-tinted">Button</rr-button>
    </rr-button-group>
  `,
};

export const MultipleButtons = {
  args: { size: 'm', flow: 'horizontal' },
  render: (args) => html`
    <rr-button-group size=${args.size} flow=${args.flow}>
      <rr-button size=${args.size} variant="accent-filled">Save</rr-button>
      <rr-button size=${args.size} variant="neutral-tinted">Cancel</rr-button>
      <rr-button size=${args.size} variant="neutral-tinted">Reset</rr-button>
    </rr-button-group>
  `,
};

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Our button group (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="1339:3762" style="display: inline-block;">
        <!--
          Figma button-group (1339:3762) component set:
          - Layout: column, gap: 16px, padding: 16px, width: 404px
          - Variants: size=md/sm × flow=vertical/horizontal
          - Variant order: md-vertical, md-horizontal, sm-vertical, sm-horizontal
        -->
        <div style="width: 404px; padding: 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px; align-items: center;">
          <!-- size=md, flow=vertical -->
          <rr-button-group size="m" flow="vertical" style="width: 100%;">
            <rr-button size="m" variant="accent-filled">Button</rr-button>
            <rr-button size="m" variant="neutral-tinted">Button</rr-button>
          </rr-button-group>
          <!-- size=md, flow=horizontal -->
          <rr-button-group size="m" flow="horizontal">
            <rr-button size="m" variant="accent-filled">Button</rr-button>
            <rr-button size="m" variant="neutral-tinted">Button</rr-button>
          </rr-button-group>
          <!-- size=sm, flow=vertical -->
          <rr-button-group size="s" flow="vertical" style="width: 100%;">
            <rr-button size="s" variant="accent-filled">Button</rr-button>
            <rr-button size="s" variant="neutral-tinted">Button</rr-button>
          </rr-button-group>
          <!-- size=sm, flow=horizontal -->
          <rr-button-group size="s" flow="horizontal">
            <rr-button size="s" variant="accent-filled">Button</rr-button>
            <rr-button size="s" variant="neutral-tinted">Button</rr-button>
          </rr-button-group>
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
FigmaComparison.parameters = { controls: { disable: true } };
