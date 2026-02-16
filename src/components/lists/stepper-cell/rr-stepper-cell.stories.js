import { html } from 'lit';
import './rr-stepper-cell.js';
import '../../inputs/stepper/rr-stepper.js';

export default {
  title: 'Components/Lists/Stepper Cell',
  component: 'rr-stepper-cell',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=236-41344',
    },
  },
  argTypes: {
    verticalAlignment: {
      control: 'select',
      options: ['center', 'top'],
      description: 'Vertical alignment of the stepper',
    },
  },
};

export const Default = {
  args: {
    verticalAlignment: 'center',
  },
  render: (args) => html`
    <rr-stepper-cell vertical-alignment=${args.verticalAlignment}>
      <rr-stepper size="md" value="0" min="0" max="10"></rr-stepper>
    </rr-stepper-cell>
  `,
};

export const VerticalTop = {
  render: () => html`
    <rr-stepper-cell vertical-alignment="top" style="height: 80px; border: 1px dashed #ccc;">
      <rr-stepper size="md" value="5" min="0" max="10"></rr-stepper>
    </rr-stepper-cell>
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
        <ftl-holster node="236:41349" style="display: inline-block;">
          <rr-stepper-cell vertical-alignment="center">
            <rr-stepper size="md" value="0" min="0" max="10"></rr-stepper>
          </rr-stepper-cell>
        </ftl-holster>
      </div>

      <!-- vertical-alignment=top -->
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span style="font-size: 0.75rem; color: #64748b;">vertical-alignment=top</span>
        <ftl-holster node="236:41351" style="display: inline-block;">
          <rr-stepper-cell vertical-alignment="top">
            <rr-stepper size="md" value="0" min="0" max="10"></rr-stepper>
          </rr-stepper-cell>
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
