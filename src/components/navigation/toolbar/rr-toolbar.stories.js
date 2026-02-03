import { html } from 'lit';
import './rr-toolbar.ts';
import '../../actions/button/rr-button.ts';

export default {
  title: 'Components/Navigation/Toolbar',
  component: 'rr-toolbar',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1380:3538',
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['s', 'm'],
      description: 'Toolbar size',
    },
  },
};

export const Default = {
  args: { size: 'm' },
  render: (args) => html`
    <rr-toolbar size=${args.size}>
      <rr-button slot="start" size="s" variant="neutral">Action 1</rr-button>
      <rr-button slot="start" size="s" variant="neutral">Action 2</rr-button>
      <span>Center Content</span>
      <rr-button slot="end" size="s" variant="accent">Save</rr-button>
    </rr-toolbar>
  `,
};

export const SizeSmall = {
  args: { size: 's' },
  render: (args) => html`
    <rr-toolbar size=${args.size}>
      <rr-button slot="start" size="xs" variant="neutral">Edit</rr-button>
      <span>Title</span>
      <rr-button slot="end" size="xs" variant="accent">Done</rr-button>
    </rr-toolbar>
  `,
};

export const StartOnly = {
  args: { size: 'm' },
  render: (args) => html`
    <rr-toolbar size=${args.size}>
      <rr-button slot="start" size="s" variant="neutral">File</rr-button>
      <rr-button slot="start" size="s" variant="neutral">Edit</rr-button>
      <rr-button slot="start" size="s" variant="neutral">View</rr-button>
    </rr-toolbar>
  `,
};

export const EndOnly = {
  args: { size: 'm' },
  render: (args) => html`
    <rr-toolbar size=${args.size}>
      <rr-button slot="end" size="s" variant="neutral">Cancel</rr-button>
      <rr-button slot="end" size="s" variant="accent">Submit</rr-button>
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
        Our toolbar (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="1380:3538" style="display: inline-block;">
        <!--
          Figma toolbar (1380:3538) component set:
          - Layout: column, gap: 16px, padding: 16px
          - Each toolbar: row, justify-content: space-between, alignItems: center
          - Size MD: 496x48, Size SM: 376x36
          - SLOT placeholders: same size within each row
        -->
        <div style="padding: 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
          <!-- Size MD: 496x48 with 3 equal SLOT placeholders -->
          <div style="width: 496px; height: 48px; display: flex; flex-direction: row; justify-content: space-between; align-items: center; border: 1px dashed #8A38F5;">
            <div style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; color: #FF24BD; font-size: 18px; font-weight: 700; display: flex; align-items: center; justify-content: center;">SLOT</div>
            <div style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; color: #FF24BD; font-size: 18px; font-weight: 700; display: flex; align-items: center; justify-content: center;">SLOT</div>
            <div style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; color: #FF24BD; font-size: 18px; font-weight: 700; display: flex; align-items: center; justify-content: center;">SLOT</div>
          </div>
          <!-- Size SM: 376x36 with 3 equal SLOT placeholders -->
          <div style="width: 376px; height: 36px; display: flex; flex-direction: row; justify-content: space-between; align-items: center; border: 1px dashed #8A38F5;">
            <div style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; color: #FF24BD; font-size: 18px; font-weight: 700; display: flex; align-items: center; justify-content: center;">SLOT</div>
            <div style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; color: #FF24BD; font-size: 18px; font-weight: 700; display: flex; align-items: center; justify-content: center;">SLOT</div>
            <div style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; color: #FF24BD; font-size: 18px; font-weight: 700; display: flex; align-items: center; justify-content: center;">SLOT</div>
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
FigmaComparison.parameters = { controls: { disable: true } };
