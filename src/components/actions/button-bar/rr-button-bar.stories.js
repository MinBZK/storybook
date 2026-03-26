import { html } from 'lit';
import './rr-button-bar.ts';
import '../button/rr-button.ts';
import '../icon-button/rr-icon-button.ts';
import '../../content/icon/rr-icon.ts';

export default {
  title: 'Components/Actions/Button Bar',
  component: 'rr-button-bar',
  tags: ['autodocs'],
  parameters: {},
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md'],
      description: 'Button bar size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
};

export const Default = {
  args: { size: 'md', disabled: false },
  render: (args) => html`
    <rr-button-bar size=${args.size} ?disabled=${args.disabled}>
      <rr-icon-button>
        <rr-icon name="chevron-left"></rr-icon>
        Vorige
      </rr-icon-button>
      <rr-button-bar-divider></rr-button-bar-divider>
      <rr-icon-button>
        <rr-icon name="chevron-right"></rr-icon>
        Volgende
      </rr-icon-button>
    </rr-button-bar>
  `,
};

export const Sizes = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
      <rr-button-bar size="md">
        <rr-button>Bewerk</rr-button>
        <rr-button-bar-divider></rr-button-bar-divider>
        <rr-button>Dupliceer</rr-button>
        <rr-button-bar-divider></rr-button-bar-divider>
        <rr-icon-button>
          <rr-icon name="trash"></rr-icon>
          Verwijder
        </rr-icon-button>
      </rr-button-bar>
      <rr-button-bar size="sm">
        <rr-button>Bewerk</rr-button>
        <rr-button-bar-divider></rr-button-bar-divider>
        <rr-button>Dupliceer</rr-button>
        <rr-button-bar-divider></rr-button-bar-divider>
        <rr-icon-button>
          <rr-icon name="trash"></rr-icon>
          Verwijder
        </rr-icon-button>
      </rr-button-bar>
      <rr-button-bar size="xs">
        <rr-button>Bewerk</rr-button>
        <rr-button-bar-divider></rr-button-bar-divider>
        <rr-button>Dupliceer</rr-button>
        <rr-button-bar-divider></rr-button-bar-divider>
        <rr-icon-button>
          <rr-icon name="trash"></rr-icon>
          Verwijder
        </rr-icon-button>
      </rr-button-bar>
    </div>
  `,
};

export const WithoutDivider = {
  args: { size: 'md', disabled: false },
  render: (args) => html`
    <rr-button-bar size=${args.size} ?disabled=${args.disabled}>
      <rr-button>Cut</rr-button>
      <rr-button>Copy</rr-button>
      <rr-button>Paste</rr-button>
    </rr-button-bar>
  `,
};

export const Disabled = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
      <rr-button-bar size="md" disabled>
        <rr-button>Bewerk</rr-button>
        <rr-button-bar-divider></rr-button-bar-divider>
        <rr-button>Dupliceer</rr-button>
        <rr-button-bar-divider></rr-button-bar-divider>
        <rr-icon-button>
          <rr-icon name="trash"></rr-icon>
          Verwijder
        </rr-icon-button>
      </rr-button-bar>
    </div>
  `,
};
