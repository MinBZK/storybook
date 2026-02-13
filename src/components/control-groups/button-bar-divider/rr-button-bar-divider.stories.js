import { html } from 'lit';
import './rr-button-bar-divider.ts';
import '../button-bar/rr-button-bar.ts';
import '../../actions/button/rr-button.ts';

export default {
  title: 'Components/Control Groups/Button Bar Divider',
  component: 'rr-button-bar-divider',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1263:6851',
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['s', 'm'],
      description: 'Divider size',
    },
  },
};

export const Default = {
  args: { size: 'm' },
  render: (args) => html`
    <rr-button-bar size=${args.size}>
      <rr-button size=${args.size} variant="neutral-transparent">Cut</rr-button>
      <rr-button-bar-divider size=${args.size}></rr-button-bar-divider>
      <rr-button size=${args.size} variant="neutral-transparent">Copy</rr-button>
      <rr-button-bar-divider size=${args.size}></rr-button-bar-divider>
      <rr-button size=${args.size} variant="neutral-transparent">Paste</rr-button>
    </rr-button-bar>
  `,
};

export const SizeSmall = {
  args: { size: 's' },
  render: (args) => html`
    <rr-button-bar size=${args.size}>
      <rr-button size=${args.size} variant="neutral-transparent">Edit</rr-button>
      <rr-button-bar-divider size=${args.size}></rr-button-bar-divider>
      <rr-button size=${args.size} variant="neutral-transparent">Delete</rr-button>
    </rr-button-bar>
  `,
};

export const Standalone = {
  args: { size: 'm' },
  render: (args) => html`
    <div style="display: flex; align-items: center; gap: 8px; background: #D9DEE4; padding: 8px; border-radius: 8px;">
      <span>Item 1</span>
      <rr-button-bar-divider size=${args.size}></rr-button-bar-divider>
      <span>Item 2</span>
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
        Our button bar divider (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="1263:6851" style="display: inline-block;">
        <!--
          Figma button-bar__divider (1263:6851) component set:
          - Layout: ABSOLUTE (mode: none), 33x104px
          - size=md: at x=16 y=16, height 44px, line 1x28px #A9B2C0
          - size=sm: at x=16 y=60, height 32px, line 1x20px #A9B2C0
        -->
        <div style="position: relative; width: 33px; height: 104px;">
          <!-- size=md at x=16 y=16 -->
          <rr-button-bar-divider size="m" style="position: absolute; left: 16px; top: 16px;"></rr-button-bar-divider>
          <!-- size=sm at x=16 y=60 -->
          <rr-button-bar-divider size="s" style="position: absolute; left: 16px; top: 60px;"></rr-button-bar-divider>
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
