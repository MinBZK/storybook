import { html } from 'lit';
import './rr-stepper-cell.js';
import '../../inputs/stepper/rr-stepper.js';

export default {
  title: 'Components/Lists/Stepper Cell',
  component: 'rr-stepper-cell',
  tags: ['autodocs'],
  parameters: {
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
