import { html } from 'lit';
import './rr-custom-cell.js';

export default {
  title: 'Components/Custom Cell',
  component: 'rr-custom-cell',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1151-6202',
    },
  },
  argTypes: {
    verticalAlignment: {
      control: 'select',
      options: ['top', 'center'],
      description: 'Vertical alignment of the custom content',
    },
  },
};

export const Default = {
  args: {
    verticalAlignment: 'center',
  },
  render: (args) => html`
    <rr-custom-cell
      vertical-alignment=${args.verticalAlignment}
      style="height: 80px; border: 1px dashed #ccc;"
    >
      <div style="background: #f0f0f0; padding: 8px;">Custom content</div>
    </rr-custom-cell>
  `,
};

export const AlignmentTop = {
  render: () => html`
    <rr-custom-cell vertical-alignment="top" style="height: 80px; border: 1px dashed #ccc;">
      <div style="background: #e0f0ff; padding: 8px;">Top aligned content</div>
    </rr-custom-cell>
  `,
};

export const AlignmentCenter = {
  render: () => html`
    <rr-custom-cell vertical-alignment="center" style="height: 80px; border: 1px dashed #ccc;">
      <div style="background: #e0ffe0; padding: 8px;">Center aligned content</div>
    </rr-custom-cell>
  `,
};

export const WithFormElements = {
  render: () => html`
    <rr-custom-cell style="padding: 8px; border: 1px dashed #ccc;">
      <input type="text" placeholder="Custom input field" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
    </rr-custom-cell>
  `,
};

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Our custom cells (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="1151:6202" style="display: inline-block;">
        <!--
          Figma custom-cell (1151:6202) component set:
          - Layout: column, gap: 16px, padding: 16px
          - Fixed width: 88px
          - 2 variants: vertical-alignment (top/center)
          - Shows a pink SLOT placeholder in Figma
        -->
        <div style="width: 88px; background: #ffffff; padding: 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px;">
          <rr-custom-cell vertical-alignment="top">
            <div style="background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; padding: 2px 8px; text-align: center; color: #FF24BD; font-weight: 700; font-size: 18px; line-height: 1.125;">SLOT</div>
          </rr-custom-cell>
          <rr-custom-cell vertical-alignment="center">
            <div style="background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; padding: 2px 8px; text-align: center; color: #FF24BD; font-weight: 700; font-size: 18px; line-height: 1.125;">SLOT</div>
          </rr-custom-cell>
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
