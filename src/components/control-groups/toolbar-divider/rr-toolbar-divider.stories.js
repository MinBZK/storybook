import { html } from 'lit';
import './rr-toolbar-divider.ts';
import '../toolbar/rr-toolbar.ts';
import '../../actions/button/rr-button.ts';

export default {
  title: 'Components/Control Groups/Toolbar Divider',
  component: 'rr-toolbar-divider',
  tags: ['autodocs'],
  parameters: {
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Divider size',
    },
  },
};

export const Default = {
  args: { size: 'md' },
  render: (args) => html`
    <div style="display: flex; align-items: center; gap: 8px; height: 44px;">
      <rr-button size="sm" variant="neutral">Action 1</rr-button>
      <rr-toolbar-divider size=${args.size}></rr-toolbar-divider>
      <rr-button size="sm" variant="neutral">Action 2</rr-button>
    </div>
  `,
};

export const SizeSmall = {
  args: { size: 'sm' },
  render: (args) => html`
    <div style="display: flex; align-items: center; gap: 6px; height: 32px;">
      <rr-button size="xs" variant="neutral">Edit</rr-button>
      <rr-toolbar-divider size=${args.size}></rr-toolbar-divider>
      <rr-button size="xs" variant="neutral">Delete</rr-button>
    </div>
  `,
};

export const InToolbar = {
  args: { size: 'md' },
  render: (args) => html`
    <rr-toolbar size="md">
      <rr-button slot="start-area" size="sm" variant="neutral">File</rr-button>
      <rr-toolbar-divider slot="start-area" size=${args.size}></rr-toolbar-divider>
      <rr-button slot="start-area" size="sm" variant="neutral">Edit</rr-button>
      <rr-toolbar-divider slot="start-area" size=${args.size}></rr-toolbar-divider>
      <rr-button slot="start-area" size="sm" variant="neutral">View</rr-button>
    </rr-toolbar>
  `,
};
