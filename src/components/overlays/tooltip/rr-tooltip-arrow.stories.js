import { html } from 'lit';
import './rr-tooltip-arrow.ts';

/**
 * De Tooltip Arrow sub-component voor het tonen van een driehoekig pijltje
 * als onderdeel van een tooltip.
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
    componentSource: {
      file: 'src/components/overlays/tooltip/rr-tooltip-arrow.ts',
      repository: 'https://github.com/MinBZK/storybook',
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
      <p style="margin: 0 0 0.5rem; font-size: 0.75rem; color: var(--semantics-content-color);">
        Up
      </p>
      <rr-tooltip-arrow direction="up"></rr-tooltip-arrow>
    </div>
    <div style="text-align: center;">
      <p style="margin: 0 0 0.5rem; font-size: 0.75rem; color: var(--semantics-content-color);">
        Down
      </p>
      <rr-tooltip-arrow direction="down"></rr-tooltip-arrow>
    </div>
    <div style="text-align: center;">
      <p style="margin: 0 0 0.5rem; font-size: 0.75rem; color: var(--semantics-content-color);">
        Left
      </p>
      <rr-tooltip-arrow direction="left"></rr-tooltip-arrow>
    </div>
    <div style="text-align: center;">
      <p style="margin: 0 0 0.5rem; font-size: 0.75rem; color: var(--semantics-content-color);">
        Right
      </p>
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
