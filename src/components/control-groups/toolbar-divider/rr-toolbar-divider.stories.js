import { html } from 'lit';
import './rr-toolbar-divider.ts';
import '../toolbar/rr-toolbar.ts';
import '../../actions/button/rr-button.ts';

export default {
  title: 'Components/Control Groups/Toolbar Divider',
  component: 'rr-toolbar-divider',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1356:13969',
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Divider size',
    },
  },
};

export const Default = {
  args: { size: 'md' },
  render: (args) => html`
    <div style="display: flex; align-items: center; gap: 8px; height: 44px;">
      <rr-button size="sm" variant="neutral">Action 1</rr-button>
      <rr-toolbar-divider size=${args.size}></rr-toolbar-divider>
      <rr-button size="sm" variant="neutral">Action 2</rr-button>
    </div>
  `,
};

export const SizeSmall = {
  args: { size: 'sm' },
  render: (args) => html`
    <div style="display: flex; align-items: center; gap: 6px; height: 32px;">
      <rr-button size="xs" variant="neutral">Edit</rr-button>
      <rr-toolbar-divider size=${args.size}></rr-toolbar-divider>
      <rr-button size="xs" variant="neutral">Delete</rr-button>
    </div>
  `,
};

export const InToolbar = {
  args: { size: 'md' },
  render: (args) => html`
    <rr-toolbar size="md">
      <rr-button slot="start-area" size="sm" variant="neutral">File</rr-button>
      <rr-toolbar-divider slot="start-area" size=${args.size}></rr-toolbar-divider>
      <rr-button slot="start-area" size="sm" variant="neutral">Edit</rr-button>
      <rr-toolbar-divider slot="start-area" size=${args.size}></rr-toolbar-divider>
      <rr-button slot="start-area" size="sm" variant="neutral">View</rr-button>
    </rr-toolbar>
  `,
};

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Our toolbar divider (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="1356:13969" style="display: inline-block;">
        <!--
          Figma toolbar__divider (1356:13969) component set:
          - Layout: row, gap: 16px, padding: 16px
          - Variants: size=md (44px total), size=sm (32px total)
          - size=md: padding 5px 0, line 1x34px
          - size=sm: padding 3px 0, line 1x26px
        -->
        <div style="padding: 16px; box-sizing: border-box; display: flex; flex-direction: row; gap: 16px; align-items: stretch; height: 76px;">
          <!-- Size M: 5px padding top/bottom + 34px line = 44px total -->
          <rr-toolbar-divider size="md"></rr-toolbar-divider>
          <!-- Size S: 3px padding top/bottom + 26px line = 32px total -->
          <rr-toolbar-divider size="sm"></rr-toolbar-divider>
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
