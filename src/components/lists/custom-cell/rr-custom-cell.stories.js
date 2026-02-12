import { html } from 'lit';
import './rr-custom-cell.js';

export default {
  title: 'Components/Lists/Custom Cell',
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
        Individual variant comparisons (Code vs Figma). Use Toggle/Overlay/Side-by-Side to compare.
      </p>

      <!-- vertical-alignment=top -->
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span style="font-size: 0.75rem; color: #64748b;">vertical-alignment: top</span>
        <ftl-holster node="1151:6203" style="display: block;">
          <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 56px; height: 24px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; box-sizing: border-box;">
            <span style="color: #FF24BD; font-weight: 700; font-size: 12px; line-height: 1; text-align: center;">SLOT</span>
          </div>
        </ftl-holster>
      </div>

      <!-- vertical-alignment=center -->
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span style="font-size: 0.75rem; color: #64748b;">vertical-alignment: center</span>
        <ftl-holster node="1151:6205" style="display: block;">
          <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 56px; height: 24px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; box-sizing: border-box;">
            <span style="color: #FF24BD; font-weight: 700; font-size: 12px; line-height: 1; text-align: center;">SLOT</span>
          </div>
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
