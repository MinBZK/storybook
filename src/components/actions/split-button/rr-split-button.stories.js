import { html } from 'lit';
import './rr-split-button.ts';

export default {
  title: 'Components/Actions/Split Button',
  component: 'rr-split-button',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1304:2775',
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['s', 'm'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
};

export const Default = {
  args: { size: 'm', disabled: false },
  render: (args) => html`
    <rr-split-button
      size=${args.size}
      ?disabled=${args.disabled}
      @click=${() => console.log('Button clicked')}
      @dropdown-click=${() => console.log('Dropdown clicked')}
    >
      Split button
    </rr-split-button>
  `,
};

export const SizeSmall = {
  args: { size: 's', disabled: false },
  render: (args) => html`
    <rr-split-button
      size=${args.size}
      ?disabled=${args.disabled}
    >
      Split button
    </rr-split-button>
  `,
};

export const Disabled = {
  args: { size: 'm', disabled: true },
  render: (args) => html`
    <rr-split-button
      size=${args.size}
      ?disabled=${args.disabled}
    >
      Split button
    </rr-split-button>
  `,
};

export const AllSizes = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
      <rr-split-button size="m">Split button</rr-split-button>
      <rr-split-button size="s">Split button</rr-split-button>
    </div>
  `,
};

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Our split button (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="1304:2775" style="display: inline-block;">
        <!--
          Figma split-button (1304:2775) component set:
          - Layout: none (absolute positioning)
          - Container: 191px × 136px
          - Variants: size=md (at y=16), size=sm (at y=76)
          - Size MD: row, hug, bg #D9DEE4, border-radius 9px
          - Size SM: row, hug, bg #D9DEE4, border-radius 6px
        -->
        <div style="position: relative; width: 191px; height: 136px; background: #ffffff;">
          <!-- size=md at y=16, x=16 -->
          <rr-split-button size="m" style="position: absolute; left: 16px; top: 16px;">Split button</rr-split-button>
          <!-- size=sm at y=76, x=16 -->
          <rr-split-button size="s" style="position: absolute; left: 16px; top: 76px;">Split button</rr-split-button>
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
