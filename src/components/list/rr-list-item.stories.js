import { html } from 'lit';
import './rr-list-item.js';
import '../title-cell/rr-title-cell.js';
import '../label-cell/rr-label-cell.js';

export default {
  title: 'Components/List Item',
  component: 'rr-list-item',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=957-2279',
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size of the list item',
    },
    selected: {
      control: 'boolean',
      description: 'Whether the item is selected',
    },
  },
};

export const Default = {
  args: {
    size: 'md',
    selected: false,
  },
  render: (args) => html`
    <rr-list-item
      size=${args.size}
      ?selected=${args.selected}
      style="width: 300px;"
    >
      <rr-title-cell .color=${args.selected ? 'white' : 'default'}>List item content</rr-title-cell>
    </rr-list-item>
  `,
};

export const SizeMD = {
  render: () => html`
    <rr-list-item size="md" style="width: 300px; border: 1px dashed #ccc;">
      <rr-title-cell>Medium size item</rr-title-cell>
    </rr-list-item>
  `,
};

export const SizeSM = {
  render: () => html`
    <rr-list-item size="sm" style="width: 300px; border: 1px dashed #ccc;">
      <rr-title-cell size="sm">Small size item</rr-title-cell>
    </rr-list-item>
  `,
};

export const Selected = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <rr-list-item style="width: 300px;">
        <rr-title-cell>Not selected</rr-title-cell>
      </rr-list-item>
      <rr-list-item selected style="width: 300px;">
        <rr-title-cell color="white">Selected item</rr-title-cell>
      </rr-list-item>
    </div>
  `,
};

export const WithStartAndEndSlots = {
  render: () => html`
    <rr-list-item style="width: 400px; border: 1px dashed #ccc;">
      <div slot="start" style="width: 40px; height: 40px; background: #e0e0e0; border-radius: 8px;"></div>
      <rr-title-cell>Item with start and end content</rr-title-cell>
      <div slot="end" style="padding: 0 8px; color: #666;">→</div>
    </rr-list-item>
  `,
};

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Our list items (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="957:2279" style="display: inline-block;">
        <!--
          Figma list__item (957:2279) component set:
          - Layout: column, gap: 16px, padding: 16px
          - Fixed width: 449px
          - 4 variants: size (md/sm) x is-selected (true/false)
          - MD: 12px vertical padding, SM: 8px vertical padding
        -->
        <div style="width: 449px; background: #ffffff; padding: 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px;">
          <!-- md, not selected -->
          <rr-list-item size="md">
            <div style="background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; padding: 2px 8px; text-align: center; color: #FF24BD; font-weight: 700; font-size: 18px; line-height: 1.125; width: 100%; box-sizing: border-box;">SLOT</div>
          </rr-list-item>

          <!-- md, selected -->
          <rr-list-item size="md" selected>
            <div style="background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; padding: 2px 8px; text-align: center; color: #FF24BD; font-weight: 700; font-size: 18px; line-height: 1.125; width: 100%; box-sizing: border-box;">SLOT</div>
          </rr-list-item>

          <!-- sm, not selected -->
          <rr-list-item size="sm">
            <div style="background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; padding: 2px 8px; text-align: center; color: #FF24BD; font-weight: 700; font-size: 18px; line-height: 1.125; width: 100%; box-sizing: border-box;">SLOT</div>
          </rr-list-item>

          <!-- sm, selected -->
          <rr-list-item size="sm" selected>
            <div style="background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; padding: 2px 8px; text-align: center; color: #FF24BD; font-weight: 700; font-size: 18px; line-height: 1.125; width: 100%; box-sizing: border-box;">SLOT</div>
          </rr-list-item>
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
