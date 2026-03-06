import { html } from 'lit';
import './rr-button-cell.js';
import '../../actions/button/rr-button.js';

export default {
  title: 'Components/Lists & Menus/Cells/Button Cell',
  component: 'rr-button-cell',
  tags: ['autodocs'],
  parameters: {
  },
  argTypes: {
    verticalAlignment: {
      control: 'select',
      options: ['top', 'center'],
      description: 'Vertical alignment of the button',
    },
  },
};

export const Default = {
  args: {
    verticalAlignment: 'center',
  },
  render: (args) => html`
    <rr-button-cell
      vertical-alignment=${args.verticalAlignment}
      style="height: 100px; border: 1px dashed #ccc;"
    >
      <rr-button variant="neutral-tinted">Button</rr-button>
    </rr-button-cell>
  `,
};

export const AlignmentTop = {
  render: () => html`
    <rr-button-cell vertical-alignment="top" style="height: 100px; border: 1px dashed #ccc;">
      <rr-button variant="neutral-tinted">Button</rr-button>
    </rr-button-cell>
  `,
};

export const AlignmentCenter = {
  render: () => html`
    <rr-button-cell vertical-alignment="center" style="height: 100px; border: 1px dashed #ccc;">
      <rr-button variant="neutral-tinted">Button</rr-button>
    </rr-button-cell>
  `,
};
