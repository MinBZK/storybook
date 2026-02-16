import { html } from 'lit';
import './rr-list-item-drag-handle-cell.js';
import '../list-item-drag-handle/rr-list-item-drag-handle.js';

export default {
  title: 'Components/Lists/List Item Drag Handle Cell',
  component: 'rr-list-item-drag-handle-cell',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1342-3143',
    },
  },
  argTypes: {
    verticalAlignment: {
      control: 'select',
      options: ['center', 'top'],
      description: 'Vertical alignment of the drag handle',
    },
  },
};

export const Default = {
  args: {
    verticalAlignment: 'center',
  },
  render: (args) => html`
    <rr-list-item-drag-handle-cell vertical-alignment=${args.verticalAlignment}>
      <rr-list-item-drag-handle size="md"></rr-list-item-drag-handle>
    </rr-list-item-drag-handle-cell>
  `,
};

export const VerticalTop = {
  render: () => html`
    <rr-list-item-drag-handle-cell vertical-alignment="top" style="height: 80px; border: 1px dashed #ccc;">
      <rr-list-item-drag-handle size="md"></rr-list-item-drag-handle>
    </rr-list-item-drag-handle-cell>
  `,
};

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Individual variant comparisons (Code vs Figma). Use Toggle/Overlay/Side-by-Side to compare.
      </p>

      <!-- vertical-alignment=center -->
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span style="font-size: 0.75rem; color: #64748b;">vertical-alignment=center</span>
        <ftl-holster node="1342:3144" style="display: inline-block;">
          <rr-list-item-drag-handle-cell vertical-alignment="center">
            <rr-list-item-drag-handle size="md"></rr-list-item-drag-handle>
          </rr-list-item-drag-handle-cell>
        </ftl-holster>
      </div>

      <!-- vertical-alignment=top -->
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span style="font-size: 0.75rem; color: #64748b;">vertical-alignment=top</span>
        <ftl-holster node="1342:3146" style="display: inline-block;">
          <rr-list-item-drag-handle-cell vertical-alignment="top">
            <rr-list-item-drag-handle size="md"></rr-list-item-drag-handle>
          </rr-list-item-drag-handle-cell>
        </ftl-holster>
      </div>

      <p style="font-size: 0.75rem; color: #64748b; margin-top: 0.5rem;">
        Keyboard: T (toggle) | O (overlay) | S (side-by-side)
      </p>
    </div>
  </ftl-belt>
`;
FigmaComparison.storyName = '🎨 Figma Comparison';
FigmaComparison.tags = ['!autodocs', 'figma'];
FigmaComparison.parameters = { controls: { disable: true } };
