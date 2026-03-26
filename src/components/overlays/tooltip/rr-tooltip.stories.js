import { html } from 'lit';
import './rr-tooltip.ts';
import './rr-tooltip-arrow.ts';

/**
 * De Tooltip component voor het tonen van informatie tekst met een pijltje.
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
    componentSource: {
      file: 'src/components/overlays/tooltip/rr-tooltip.ts',
      repository: 'https://github.com/MinBZK/storybook',
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
    'pointer-position': {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Arrow position along the tooltip edge',
      table: {
        defaultValue: { summary: 'center' },
      },
    },
    text: {
      control: 'text',
      description: 'Tooltip text content',
    },
  },
  args: {
    position: 'top',
    'pointer-position': 'center',
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
  <div
    style="display: flex; flex-direction: column; gap: 2rem; align-items: center; padding: 2rem;"
  >
    <div>
      <p
        style="margin: 0 0 0.5rem; font-size: 0.875rem; color: var(--semantics-content-color); text-align: center;"
      >
        Top
      </p>
      <rr-tooltip position="top" text="Tooltip boven"></rr-tooltip>
    </div>
    <div style="display: flex; gap: 4rem; align-items: center;">
      <div>
        <p
          style="margin: 0 0 0.5rem; font-size: 0.875rem; color: var(--semantics-content-color); text-align: center;"
        >
          Left
        </p>
        <rr-tooltip position="left" text="Tooltip links"></rr-tooltip>
      </div>
      <div>
        <p
          style="margin: 0 0 0.5rem; font-size: 0.875rem; color: var(--semantics-content-color); text-align: center;"
        >
          Right
        </p>
        <rr-tooltip position="right" text="Tooltip rechts"></rr-tooltip>
      </div>
    </div>
    <div>
      <p
        style="margin: 0 0 0.5rem; font-size: 0.875rem; color: var(--semantics-content-color); text-align: center;"
      >
        Bottom
      </p>
      <rr-tooltip position="bottom" text="Tooltip onder"></rr-tooltip>
    </div>
  </div>
`;
AllPositions.parameters = {
  controls: { disable: true },
};
