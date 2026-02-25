import { html } from 'lit';
import './rr-top-title-bar.ts';

export default {
  title: 'Components/Layout/Top Title Bar',
  component: 'rr-top-title-bar',
  tags: ['autodocs'],
  parameters: {
  },
  argTypes: {
    container: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Container size',
    },
    compact: {
      control: 'boolean',
      description: 'Use compact mode with title in toolbar',
    },
    toolbar: {
      control: 'select',
      options: ['default', 'custom', 'none'],
      description: 'Toolbar mode',
    },
    title: {
      control: 'text',
      description: 'Title text',
    },
    dismissLabel: {
      control: 'text',
      description: 'Dismiss button label',
    },
  },
};

export const Default = {
  args: {
    container: 'sm',
    compact: false,
    toolbar: 'default',
    title: 'Title',
    dismissLabel: 'Sluit',
  },
  render: (args) => html`
    <rr-top-title-bar
      container=${args.container}
      ?compact=${args.compact}
      toolbar=${args.toolbar}
      title=${args.title}
      dismiss-label=${args.dismissLabel}
      @dismiss=${() => console.log('Dismiss clicked')}
    ></rr-top-title-bar>
  `,
};

export const ContainerSmall = {
  args: {
    container: 'sm',
    compact: false,
    toolbar: 'default',
    title: 'Small Container Title',
  },
  render: (args) => html`
    <rr-top-title-bar container=${args.container} ?compact=${args.compact} toolbar=${args.toolbar} title=${args.title}>
    </rr-top-title-bar>
  `,
};

export const ContainerMedium = {
  args: {
    container: 'md',
    compact: false,
    toolbar: 'default',
    title: 'Medium Container Title',
  },
  render: (args) => html`
    <rr-top-title-bar container=${args.container} ?compact=${args.compact} toolbar=${args.toolbar} title=${args.title}>
    </rr-top-title-bar>
  `,
};

export const ContainerLarge = {
  args: {
    container: 'lg',
    compact: false,
    toolbar: 'default',
    title: 'Large Container Title',
  },
  render: (args) => html`
    <rr-top-title-bar container=${args.container} ?compact=${args.compact} toolbar=${args.toolbar} title=${args.title}>
    </rr-top-title-bar>
  `,
};

export const Compact = {
  args: {
    container: 'md',
    compact: true,
    toolbar: 'default',
    title: 'Compact Title',
  },
  render: (args) => html`
    <rr-top-title-bar container=${args.container} ?compact=${args.compact} toolbar=${args.toolbar} title=${args.title}>
    </rr-top-title-bar>
  `,
};

export const NoToolbar = {
  args: {
    container: 'md',
    compact: false,
    toolbar: 'none',
    title: 'Title Without Toolbar',
  },
  render: (args) => html`
    <rr-top-title-bar container=${args.container} ?compact=${args.compact} toolbar=${args.toolbar} title=${args.title}>
    </rr-top-title-bar>
  `,
};

export const CustomToolbar = {
  args: {
    container: 'md',
    compact: false,
    toolbar: 'custom',
    title: 'Custom Toolbar Title',
  },
  render: (args) => html`
    <rr-top-title-bar container=${args.container} ?compact=${args.compact} toolbar=${args.toolbar} title=${args.title}>
      <rr-button slot="toolbar-start" variant="accent-transparent">Back</rr-button>
      <rr-button slot="toolbar-end" variant="accent-transparent">Save</rr-button>
      <rr-button slot="toolbar-end" variant="accent-transparent">Close</rr-button>
    </rr-top-title-bar>
  `,
};

export const AllVariants = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <h3 style="margin: 0 0 8px 0;">Small Container (non-compact)</h3>
        <rr-top-title-bar container="sm" toolbar="default" title="Title"></rr-top-title-bar>
      </div>
      <div>
        <h3 style="margin: 0 0 8px 0;">Medium Container (non-compact)</h3>
        <rr-top-title-bar container="md" toolbar="default" title="Title"></rr-top-title-bar>
      </div>
      <div>
        <h3 style="margin: 0 0 8px 0;">Large Container (non-compact)</h3>
        <rr-top-title-bar container="lg" toolbar="default" title="Title"></rr-top-title-bar>
      </div>
      <div>
        <h3 style="margin: 0 0 8px 0;">Compact Mode</h3>
        <rr-top-title-bar container="md" compact toolbar="default" title="Title"></rr-top-title-bar>
      </div>
      <div>
        <h3 style="margin: 0 0 8px 0;">No Toolbar</h3>
        <rr-top-title-bar container="md" toolbar="none" title="Title"></rr-top-title-bar>
      </div>
    </div>
  `,
};
