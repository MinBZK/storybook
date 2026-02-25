import { html } from 'lit';
import './rr-toolbar.ts';
import '../../actions/button/rr-button.ts';

export default {
  title: 'Components/Control Groups/Toolbar',
  component: 'rr-toolbar',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Toolbar size',
    },
  },
};

export const Default = {
  args: { size: 'md' },
  render: (args) => html`
    <rr-toolbar size=${args.size}>
      <rr-button slot="start-area" size="sm" variant="neutral">Action 1</rr-button>
      <rr-button slot="start-area" size="sm" variant="neutral">Action 2</rr-button>
      <span>Center Content</span>
      <rr-button slot="end-area" size="sm" variant="accent">Save</rr-button>
    </rr-toolbar>
  `,
};

export const SizeSmall = {
  args: { size: 'sm' },
  render: (args) => html`
    <rr-toolbar size=${args.size}>
      <rr-button slot="start-area" size="xs" variant="neutral">Edit</rr-button>
      <span>Title</span>
      <rr-button slot="end-area" size="xs" variant="accent">Done</rr-button>
    </rr-toolbar>
  `,
};

export const StartOnly = {
  args: { size: 'md' },
  render: (args) => html`
    <rr-toolbar size=${args.size}>
      <rr-button slot="start-area" size="sm" variant="neutral">File</rr-button>
      <rr-button slot="start-area" size="sm" variant="neutral">Edit</rr-button>
      <rr-button slot="start-area" size="sm" variant="neutral">View</rr-button>
    </rr-toolbar>
  `,
};

export const EndOnly = {
  args: { size: 'md' },
  render: (args) => html`
    <rr-toolbar size=${args.size}>
      <rr-button slot="end-area" size="sm" variant="neutral">Cancel</rr-button>
      <rr-button slot="end-area" size="sm" variant="accent">Submit</rr-button>
    </rr-toolbar>
  `,
};
