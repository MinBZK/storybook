import { html } from 'lit';
import './rr-toolbar-title-group.ts';
import '../toolbar/rr-toolbar.ts';

export default {
  title: 'Components/Control Groups/Toolbar Title Group',
  component: 'rr-toolbar-title-group',
  tags: ['autodocs'],
  parameters: {
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Title group size',
    },
    align: {
      control: 'select',
      options: ['left', 'center'],
      description: 'Text alignment',
    },
    title: {
      control: 'text',
      description: 'Main title text',
    },
    subtitle: {
      control: 'text',
      description: 'Subtitle text',
    },
  },
};

export const Default = {
  args: { size: 'md', align: 'left', title: 'Toolbar', subtitle: 'Subtitle' },
  render: (args) => html`
    <rr-toolbar-title-group
      size=${args.size}
      align=${args.align}
      title=${args.title}
      subtitle=${args.subtitle}
    ></rr-toolbar-title-group>
  `,
};

export const Centered = {
  args: { size: 'md', align: 'center', title: 'Toolbar', subtitle: 'Subtitle' },
  render: (args) => html`
    <rr-toolbar-title-group
      size=${args.size}
      align=${args.align}
      title=${args.title}
      subtitle=${args.subtitle}
    ></rr-toolbar-title-group>
  `,
};

export const SizeSmall = {
  args: { size: 'sm', align: 'left', title: 'Toolbar', subtitle: 'Subtitle' },
  render: (args) => html`
    <rr-toolbar-title-group
      size=${args.size}
      align=${args.align}
      title=${args.title}
      subtitle=${args.subtitle}
    ></rr-toolbar-title-group>
  `,
};

export const TitleOnly = {
  args: { size: 'md', align: 'left', title: 'Toolbar Title', subtitle: '' },
  render: (args) => html`
    <rr-toolbar-title-group
      size=${args.size}
      align=${args.align}
      title=${args.title}
    ></rr-toolbar-title-group>
  `,
};

export const InToolbar = {
  args: { size: 'md', title: 'Document Title', subtitle: 'Last edited: Today' },
  render: (args) => html`
    <rr-toolbar size="md">
      <rr-toolbar-title-group
        slot="start-area"
        size=${args.size}
        title=${args.title}
        subtitle=${args.subtitle}
      ></rr-toolbar-title-group>
    </rr-toolbar>
  `,
};
