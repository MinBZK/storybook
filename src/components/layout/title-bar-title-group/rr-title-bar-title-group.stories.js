import { html } from 'lit';
import './rr-title-bar-title-group.js';

export default {
  title: 'Components/Layout/Title Bar Title Group',
  component: 'rr-title-bar-title-group',
  tags: ['autodocs'],
  parameters: {
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Title size',
    },
  },
};

export const Default = {
  args: {
    size: 'md',
  },
  render: (args) => html` <rr-title-bar-title-group size=${args.size}>Title</rr-title-bar-title-group> `,
};

export const Small = {
  args: {
    size: 'sm',
  },
  render: (args) => html` <rr-title-bar-title-group size=${args.size}>Title</rr-title-bar-title-group> `,
};

export const Medium = {
  args: {
    size: 'md',
  },
  render: (args) => html` <rr-title-bar-title-group size=${args.size}>Title</rr-title-bar-title-group> `,
};

export const Large = {
  args: {
    size: 'lg',
  },
  render: (args) => html` <rr-title-bar-title-group size=${args.size}>Title</rr-title-bar-title-group> `,
};

export const AllSizes = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <rr-title-bar-title-group size="sm">Small Title (sm)</rr-title-bar-title-group>
      <rr-title-bar-title-group size="md">Medium Title (md)</rr-title-bar-title-group>
      <rr-title-bar-title-group size="lg">Large Title (lg)</rr-title-bar-title-group>
    </div>
  `,
};
