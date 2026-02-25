import { html } from 'lit';
import './rr-button-group.ts';
import '../../actions/button/rr-button.ts';

export default {
  title: 'Components/Control Groups/Button Group',
  component: 'rr-button-group',
  tags: ['autodocs'],
  parameters: {
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Button group size',
    },
    flow: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout direction',
    },
  },
};

export const Default = {
  args: { size: 'md', flow: 'horizontal' },
  render: (args) => html`
    <rr-button-group size=${args.size} flow=${args.flow}>
      <rr-button size="md" variant="accent-filled">Button</rr-button>
      <rr-button size="md" variant="neutral-tinted">Button</rr-button>
    </rr-button-group>
  `,
};

export const Vertical = {
  args: { size: 'md', flow: 'vertical' },
  render: (args) => html`
    <rr-button-group size=${args.size} flow=${args.flow} style="width: 200px;">
      <rr-button size="md" variant="accent-filled">Button</rr-button>
      <rr-button size="md" variant="neutral-tinted">Button</rr-button>
    </rr-button-group>
  `,
};

export const SizeSmall = {
  args: { size: 'sm', flow: 'horizontal' },
  render: (args) => html`
    <rr-button-group size=${args.size} flow=${args.flow}>
      <rr-button size="sm" variant="accent-filled">Button</rr-button>
      <rr-button size="sm" variant="neutral-tinted">Button</rr-button>
    </rr-button-group>
  `,
};

export const MultipleButtons = {
  args: { size: 'md', flow: 'horizontal' },
  render: (args) => html`
    <rr-button-group size=${args.size} flow=${args.flow}>
      <rr-button size="md" variant="accent-filled">Save</rr-button>
      <rr-button size="md" variant="neutral-tinted">Cancel</rr-button>
      <rr-button size="md" variant="neutral-tinted">Reset</rr-button>
    </rr-button-group>
  `,
};
