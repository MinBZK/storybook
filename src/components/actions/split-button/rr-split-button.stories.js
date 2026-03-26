import { html } from 'lit';
import './rr-split-button.ts';

/**
 * De Split Button combineert een primaire actieknop met een dropdown trigger.
 *
 * ## Gebruik
 * ```html
 * <rr-split-button>Opslaan</rr-split-button>
 * ```
 */
export default {
  title: 'Components/Actions/Split Button',
  component: 'rr-split-button',
  tags: ['autodocs'],
  parameters: {
    componentSource: {
      file: 'src/components/actions/split-button/rr-split-button.ts',
      repository: 'https://github.com/MinBZK/storybook',
    },
    status: {
      type: 'stable',
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md'],
      description: 'Button size',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: {
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    size: 'md',
    disabled: false,
  },
};

const Template = ({ size, disabled }) => html`
  <rr-split-button
    size=${size}
    ?disabled=${disabled}
    @action-click=${() => console.log('Action clicked')}
    @menu-click=${() => console.log('Menu clicked')}
  >
    Opslaan
  </rr-split-button>
`;

export const Default = Template.bind({});
Default.args = {};

// All sizes overview
export const Sizes = () => html`
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
    <rr-split-button size="md">Opslaan</rr-split-button>
    <rr-split-button size="sm">Opslaan</rr-split-button>
    <rr-split-button size="xs">Opslaan</rr-split-button>
  </div>
`;
Sizes.parameters = {
  controls: { disable: true },
};

// Disabled
export const Disabled = () => html`
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
    <rr-split-button disabled size="md">Opslaan</rr-split-button>
    <rr-split-button disabled size="sm">Opslaan</rr-split-button>
    <rr-split-button disabled size="xs">Opslaan</rr-split-button>
  </div>
`;
Disabled.parameters = {
  controls: { disable: true },
};
