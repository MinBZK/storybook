import { html } from 'lit';
import './rr-button-bar.ts';
import '../../actions/button/rr-button.ts';

export default {
  title: 'Components/Control Groups/Button Bar',
  component: 'rr-button-bar',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1263:6841',
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Button bar size',
    },
  },
};

export const Default = {
  args: { size: 'md' },
  render: (args) => html`
    <rr-button-bar size=${args.size}>
      <rr-button size="s" variant="neutral-transparent">Action 1</rr-button>
      <rr-button size="s" variant="neutral-transparent">Action 2</rr-button>
    </rr-button-bar>
  `,
};

export const SizeSmall = {
  args: { size: 'sm' },
  render: (args) => html`
    <rr-button-bar size=${args.size}>
      <rr-button size="s" variant="neutral-transparent">Edit</rr-button>
      <rr-button size="s" variant="neutral-transparent">Delete</rr-button>
    </rr-button-bar>
  `,
};

export const WithDivider = {
  args: { size: 'md' },
  render: (args) => html`
    <rr-button-bar size=${args.size}>
      <rr-button size="s" variant="neutral-transparent">Cut</rr-button>
      <rr-button-bar-divider size=${args.size}></rr-button-bar-divider>
      <rr-button size="s" variant="neutral-transparent">Copy</rr-button>
      <rr-button-bar-divider size=${args.size}></rr-button-bar-divider>
      <rr-button size="s" variant="neutral-transparent">Paste</rr-button>
    </rr-button-bar>
  `,
};

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Our button bar (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="1263:6841" style="display: inline-block;">
        <!--
          Figma button-bar (1263:6841) component set:
          - Layout: column, gap: 16px, padding: 16px
          - Variants: size=md (44px), size=sm (32px)
          - Background: #D9DEE4
          - Border radius: 9px
          - Contains slots + dividers
        -->
        <div style="padding: 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
          <!-- size=md with slot placeholders -->
          <rr-button-bar size="md">
            <div style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); outline: 2px dashed #FF24BD; outline-offset: -2px; color: #FF24BD; font-size: 18px; font-weight: 700; display: flex; align-items: center; justify-content: center; align-self: stretch;">SLOT</div>
            <div style="width: 1px; height: 28px; background: #A9B2C0;"></div>
            <div style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); outline: 2px dashed #FF24BD; outline-offset: -2px; color: #FF24BD; font-size: 18px; font-weight: 700; display: flex; align-items: center; justify-content: center; align-self: stretch;">SLOT</div>
          </rr-button-bar>
          <!-- size=sm with slot placeholders -->
          <rr-button-bar size="sm">
            <div style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); outline: 2px dashed #FF24BD; outline-offset: -2px; color: #FF24BD; font-size: 18px; font-weight: 700; display: flex; align-items: center; justify-content: center; align-self: stretch;">SLOT</div>
            <div style="width: 1px; height: 20px; background: #A9B2C0;"></div>
            <div style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); outline: 2px dashed #FF24BD; outline-offset: -2px; color: #FF24BD; font-size: 18px; font-weight: 700; display: flex; align-items: center; justify-content: center; align-self: stretch;">SLOT</div>
          </rr-button-bar>
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
