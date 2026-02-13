import { html } from 'lit';
import './rr-list-item-drag-handle.js';

export default {
  title: 'Components/Lists/List Item Drag Handle',
  component: 'rr-list-item-drag-handle',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1342-3114',
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['md', 'sm'],
      description: 'Handle size',
    },
  },
};

export const Default = {
  args: {
    size: 'md',
  },
  render: (args) => html`
    <rr-list-item-drag-handle size=${args.size}></rr-list-item-drag-handle>
  `,
};

export const AllSizes = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
        <rr-list-item-drag-handle size="md"></rr-list-item-drag-handle>
        <span style="font-size: 0.75rem; color: #64748b;">MD</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
        <rr-list-item-drag-handle size="sm"></rr-list-item-drag-handle>
        <span style="font-size: 0.75rem; color: #64748b;">SM</span>
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
        Individual variant comparisons (Code vs Figma). Use Toggle/Overlay/Side-by-Side to compare.
      </p>

      <!-- size=md -->
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span style="font-size: 0.75rem; color: #64748b;">size=md</span>
        <ftl-holster node="1342:3112" style="display: inline-block;">
          <rr-list-item-drag-handle size="md"></rr-list-item-drag-handle>
        </ftl-holster>
      </div>

      <!-- size=sm -->
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span style="font-size: 0.75rem; color: #64748b;">size=sm</span>
        <ftl-holster node="1342:3113" style="display: inline-block;">
          <rr-list-item-drag-handle size="sm"></rr-list-item-drag-handle>
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
