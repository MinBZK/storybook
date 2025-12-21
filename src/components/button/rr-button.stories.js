import { html } from 'lit';
import './rr-button.js';

export default {
  title: 'Components/Button',
  component: 'rr-button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['accent-filled', 'accent-outlined', 'accent-tinted', 'neutral-tinted', 'accent-transparent'],
      description: 'Visual style variant',
      table: {
        defaultValue: { summary: 'accent-filled' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 's', 'm'],
      description: 'Button size',
      table: {
        defaultValue: { summary: 'm' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: {
        defaultValue: { summary: false },
      },
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Button type attribute',
      table: {
        defaultValue: { summary: 'button' },
      },
    },
    label: {
      control: 'text',
      description: 'Button label text',
    },
  },
  args: {
    label: 'Button',
    variant: 'accent-filled',
    size: 'm',
    disabled: false,
    type: 'button',
  },
};

const Template = ({ label, variant, size, disabled, type }) => html`
  <rr-button
    variant=${variant}
    size=${size}
    ?disabled=${disabled}
    type=${type}
  >${label}</rr-button>
`;

// Primary story
export const Default = Template.bind({});
Default.args = {
  label: 'Primary Action',
};

// All variants
export const AccentFilled = Template.bind({});
AccentFilled.args = {
  label: 'Accent Filled',
  variant: 'accent-filled',
};

export const AccentOutlined = Template.bind({});
AccentOutlined.args = {
  label: 'Accent Outlined',
  variant: 'accent-outlined',
};

export const AccentTinted = Template.bind({});
AccentTinted.args = {
  label: 'Accent Tinted',
  variant: 'accent-tinted',
};

export const NeutralTinted = Template.bind({});
NeutralTinted.args = {
  label: 'Neutral Tinted',
  variant: 'neutral-tinted',
};

export const AccentTransparent = Template.bind({});
AccentTransparent.args = {
  label: 'Accent Transparent',
  variant: 'accent-transparent',
};

// Sizes
export const ExtraSmall = Template.bind({});
ExtraSmall.args = {
  label: 'Extra Small',
  size: 'xs',
};

export const Small = Template.bind({});
Small.args = {
  label: 'Small',
  size: 's',
};

export const Medium = Template.bind({});
Medium.args = {
  label: 'Medium',
  size: 'm',
};

// States
export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled',
  disabled: true,
};

// All variants overview
export const AllVariants = () => html`
  <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
    <rr-button variant="accent-filled">Accent Filled</rr-button>
    <rr-button variant="accent-outlined">Accent Outlined</rr-button>
    <rr-button variant="accent-tinted">Accent Tinted</rr-button>
    <rr-button variant="neutral-tinted">Neutral Tinted</rr-button>
    <rr-button variant="accent-transparent">Accent Transparent</rr-button>
  </div>
`;
AllVariants.parameters = {
  controls: { disable: true },
};

// All sizes overview
export const AllSizes = () => html`
  <div style="display: flex; gap: 1rem; align-items: center;">
    <rr-button size="xs">Extra Small</rr-button>
    <rr-button size="s">Small</rr-button>
    <rr-button size="m">Medium</rr-button>
  </div>
`;
AllSizes.parameters = {
  controls: { disable: true },
};

// Matrix of all combinations
export const VariantSizeMatrix = () => html`
  <table style="border-collapse: collapse; width: 100%;">
    <thead>
      <tr>
        <th style="text-align: left; padding: 0.75rem; border-bottom: 2px solid #e2e8f0;">Variant</th>
        <th style="text-align: center; padding: 0.75rem; border-bottom: 2px solid #e2e8f0;">XS</th>
        <th style="text-align: center; padding: 0.75rem; border-bottom: 2px solid #e2e8f0;">S</th>
        <th style="text-align: center; padding: 0.75rem; border-bottom: 2px solid #e2e8f0;">M</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0;">accent-filled</td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;"><rr-button variant="accent-filled" size="xs">Label</rr-button></td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;"><rr-button variant="accent-filled" size="s">Label</rr-button></td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;"><rr-button variant="accent-filled" size="m">Label</rr-button></td>
      </tr>
      <tr>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0;">accent-outlined</td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;"><rr-button variant="accent-outlined" size="xs">Label</rr-button></td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;"><rr-button variant="accent-outlined" size="s">Label</rr-button></td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;"><rr-button variant="accent-outlined" size="m">Label</rr-button></td>
      </tr>
      <tr>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0;">accent-tinted</td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;"><rr-button variant="accent-tinted" size="xs">Label</rr-button></td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;"><rr-button variant="accent-tinted" size="s">Label</rr-button></td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;"><rr-button variant="accent-tinted" size="m">Label</rr-button></td>
      </tr>
      <tr>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0;">neutral-tinted</td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;"><rr-button variant="neutral-tinted" size="xs">Label</rr-button></td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;"><rr-button variant="neutral-tinted" size="s">Label</rr-button></td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;"><rr-button variant="neutral-tinted" size="m">Label</rr-button></td>
      </tr>
      <tr>
        <td style="padding: 0.75rem;">accent-transparent</td>
        <td style="padding: 0.75rem; text-align: center;"><rr-button variant="accent-transparent" size="xs">Label</rr-button></td>
        <td style="padding: 0.75rem; text-align: center;"><rr-button variant="accent-transparent" size="s">Label</rr-button></td>
        <td style="padding: 0.75rem; text-align: center;"><rr-button variant="accent-transparent" size="m">Label</rr-button></td>
      </tr>
    </tbody>
  </table>
`;
VariantSizeMatrix.parameters = {
  controls: { disable: true },
};
