import { html } from 'lit';
import './rr-tooltip.ts';
import './rr-tooltip-arrow.ts';

/**
 * De Tooltip component voor het tonen van informatie tekst met een pijltje.
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1398-10237)
 *
 * ## Gebruik
 * ```html
 * <rr-tooltip position="top" text="Tooltip tekst"></rr-tooltip>
 * ```
 */
export default {
  title: 'Components/Overlays/Tooltip',
  component: 'rr-tooltip',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1398-10237',
    },
    componentSource: {
      file: 'src/components/tooltip/rr-tooltip.ts',
      repository: 'https://github.com/regelrecht/design-system',
    },
    status: {
      type: 'stable',
    },
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Tooltip position',
      table: {
        defaultValue: { summary: 'top' },
      },
    },
    text: {
      control: 'text',
      description: 'Tooltip text content',
    },
  },
  args: {
    position: 'top',
    text: 'Tooltip tekst',
  },
};

const Template = ({ position, text }) => html`
  <div style="padding: 2rem; display: flex; justify-content: center;">
    <rr-tooltip position=${position} text=${text}></rr-tooltip>
  </div>
`;

// Primary story
export const Default = Template.bind({});
Default.args = {
  text: 'Dit is een tooltip',
};

// All positions
export const AllPositions = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem; align-items: center; padding: 2rem;">
    <div>
      <p style="margin: 0 0 0.5rem; font-size: 0.875rem; color: #64748b; text-align: center;">Top</p>
      <rr-tooltip position="top" text="Tooltip boven"></rr-tooltip>
    </div>
    <div style="display: flex; gap: 4rem; align-items: center;">
      <div>
        <p style="margin: 0 0 0.5rem; font-size: 0.875rem; color: #64748b; text-align: center;">Left</p>
        <rr-tooltip position="left" text="Tooltip links"></rr-tooltip>
      </div>
      <div>
        <p style="margin: 0 0 0.5rem; font-size: 0.875rem; color: #64748b; text-align: center;">Right</p>
        <rr-tooltip position="right" text="Tooltip rechts"></rr-tooltip>
      </div>
    </div>
    <div>
      <p style="margin: 0 0 0.5rem; font-size: 0.875rem; color: #64748b; text-align: center;">Bottom</p>
      <rr-tooltip position="bottom" text="Tooltip onder"></rr-tooltip>
    </div>
  </div>
`;
AllPositions.parameters = {
  controls: { disable: true },
};

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Tooltip (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="1398-10237" style="display: inline-block;">
        <div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
          <rr-tooltip position="bottom" text="Tooltip"></rr-tooltip>
          <rr-tooltip position="bottom" text="Tooltip"></rr-tooltip>
          <rr-tooltip position="bottom" text="Tooltip"></rr-tooltip>
          <rr-tooltip position="left" text="Tooltip"></rr-tooltip>
          <rr-tooltip position="left" text="Tooltip"></rr-tooltip>
          <rr-tooltip position="left" text="Tooltip"></rr-tooltip>
        </div>
      </ftl-holster>
      <p style="font-size: 0.75rem; color: #64748b; margin-top: 0.5rem;">
        Keyboard: T (toggle) | O (overlay) | S (side-by-side)
      </p>
    </div>
  </ftl-belt>
`;
FigmaComparison.storyName = 'Figma Comparison';
FigmaComparison.tags = ['!autodocs', 'figma'];
FigmaComparison.parameters = {
  controls: { disable: true },
};
