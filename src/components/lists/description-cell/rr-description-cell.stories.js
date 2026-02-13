import { html } from 'lit';
import './rr-description-cell.js';

export default {
  title: 'Components/Lists/Description Cell',
  component: 'rr-description-cell',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=236-41321',
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The title/label text displayed above the description',
    },
  },
};

export const Default = {
  args: {
    label: 'Description cell',
  },
  render: (args) => html`
    <rr-description-cell label=${args.label}>
      Common uses for this component are to implement a glossary or to display metadata.
    </rr-description-cell>
  `,
};

export const CustomContent = {
  render: () => html`
    <rr-description-cell label="Description cell">
      <div style="padding: 8px; background: #f0f0f0; border-radius: 4px;">
        Custom slotted content
      </div>
    </rr-description-cell>
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

      <!-- has-custom-description=false -->
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span style="font-size: 0.75rem; color: #64748b;">has-custom-description=false</span>
        <ftl-holster node="236:41322" style="display: inline-block;">
          <rr-description-cell label="Description cell">Common uses for this component are to implement a glossary or to display metadata.</rr-description-cell>
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
