import { html } from 'lit';
import './rr-tooltip-arrow.ts';

/**
 * De Tooltip Arrow sub-component voor het tonen van een driehoekig pijltje
 * als onderdeel van een tooltip.
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1398-10227)
 *
 * ## Gebruik
 * ```html
 * <rr-tooltip-arrow direction="up"></rr-tooltip-arrow>
 * ```
 */
export default {
  title: 'Components/Overlays/Tooltip Arrow',
  component: 'rr-tooltip-arrow',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1398-10227',
    },
    componentSource: {
      file: 'src/components/tooltip/rr-tooltip-arrow.ts',
      repository: 'https://github.com/regelrecht/design-system',
    },
    status: {
      type: 'stable',
    },
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['up', 'down', 'left', 'right'],
      description: 'Arrow direction',
      table: {
        defaultValue: { summary: 'up' },
      },
    },
  },
  args: {
    direction: 'up',
  },
};

const Template = ({ direction }) => html`
  <div style="padding: 2rem; display: flex; justify-content: center;">
    <rr-tooltip-arrow direction=${direction}></rr-tooltip-arrow>
  </div>
`;

// Primary story
export const Default = Template.bind({});
Default.args = {
  direction: 'up',
};

// All directions
export const AllDirections = () => html`
  <div style="display: flex; gap: 2rem; align-items: center; padding: 2rem;">
    <div style="text-align: center;">
      <p style="margin: 0 0 0.5rem; font-size: 0.75rem; color: #64748b;">Up</p>
      <rr-tooltip-arrow direction="up"></rr-tooltip-arrow>
    </div>
    <div style="text-align: center;">
      <p style="margin: 0 0 0.5rem; font-size: 0.75rem; color: #64748b;">Down</p>
      <rr-tooltip-arrow direction="down"></rr-tooltip-arrow>
    </div>
    <div style="text-align: center;">
      <p style="margin: 0 0 0.5rem; font-size: 0.75rem; color: #64748b;">Left</p>
      <rr-tooltip-arrow direction="left"></rr-tooltip-arrow>
    </div>
    <div style="text-align: center;">
      <p style="margin: 0 0 0.5rem; font-size: 0.75rem; color: #64748b;">Right</p>
      <rr-tooltip-arrow direction="right"></rr-tooltip-arrow>
    </div>
  </div>
`;
AllDirections.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'De tooltip arrow in alle vier de richtingen (up, down, left, right).',
    },
  },
};

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Tooltip Arrow (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="1398-10227" style="display: inline-block;">
        <div style="display: flex; gap: 32px; padding: 32px; align-items: center;">
          <rr-tooltip-arrow direction="up"></rr-tooltip-arrow>
          <rr-tooltip-arrow direction="down"></rr-tooltip-arrow>
          <rr-tooltip-arrow direction="left"></rr-tooltip-arrow>
          <rr-tooltip-arrow direction="right"></rr-tooltip-arrow>
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
