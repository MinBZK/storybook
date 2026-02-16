import { html } from 'lit';
import './rr-split-view-divider.ts';

export default {
  title: 'Components/Layout/Split View/Split View Divider',
  component: 'rr-split-view-divider',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=39-927',
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Divider orientation',
      table: {
        defaultValue: { summary: 'vertical' },
      },
    },
    hasDragHandle: {
      control: 'boolean',
      description: 'Whether to show a drag handle (future use)',
    },
  },
};

export const Vertical = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => html`
    <div style="display: flex; flex-direction: row; height: 200px;">
      <div style="flex: 1; background: #f1f5f9; display: flex; align-items: center; justify-content: center;">
        Left
      </div>
      <rr-split-view-divider orientation=${args.orientation}></rr-split-view-divider>
      <div style="flex: 1; background: #f1f5f9; display: flex; align-items: center; justify-content: center;">
        Right
      </div>
    </div>
  `,
};

export const Horizontal = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => html`
    <div style="display: flex; flex-direction: column; width: 400px;">
      <div style="height: 100px; background: #f1f5f9; display: flex; align-items: center; justify-content: center;">
        Top
      </div>
      <rr-split-view-divider orientation=${args.orientation}></rr-split-view-divider>
      <div style="height: 100px; background: #f1f5f9; display: flex; align-items: center; justify-content: center;">
        Bottom
      </div>
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
        Split View Divider variants (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="39-927" style="display: inline-block;">
        <!--
          Figma component set (39:927):
          - Layout: column, gap: 16px, padding: 16px
          - Size: 120x221
          - 4 variants: orientation x has-drag-handle
        -->
        <div
          style="width: 120px; height: 221px; padding: 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px;"
        >
          <!-- orientation=vertical, has-drag-handle=false -->
          <div style="display: flex; flex-direction: row; justify-content: center; align-items: center; flex: 1;">
            <rr-split-view-divider
              orientation="vertical"
              style="height: 100%;"
            ></rr-split-view-divider>
          </div>

          <!-- orientation=vertical, has-drag-handle=true -->
          <div style="display: flex; flex-direction: row; justify-content: center; align-items: center; flex: 1;">
            <rr-split-view-divider
              orientation="vertical"
              has-drag-handle
              style="height: 100%;"
            ></rr-split-view-divider>
          </div>

          <!-- orientation=horizontal, has-drag-handle=false -->
          <div
            style="display: flex; flex-direction: row; justify-content: center; align-items: center; align-self: stretch;"
          >
            <rr-split-view-divider
              orientation="horizontal"
              style="width: 100%;"
            ></rr-split-view-divider>
          </div>

          <!-- orientation=horizontal, has-drag-handle=true -->
          <div
            style="display: flex; flex-direction: row; justify-content: center; align-items: center; align-self: stretch;"
          >
            <rr-split-view-divider
              orientation="horizontal"
              has-drag-handle
              style="width: 100%;"
            ></rr-split-view-divider>
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
