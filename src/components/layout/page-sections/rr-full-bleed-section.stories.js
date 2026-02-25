import { html } from 'lit';
import './rr-full-bleed-section.ts';

export default {
  title: 'Components/Layout/Full Bleed Section',
  component: 'rr-full-bleed-section',
  tags: ['autodocs'],
  parameters: {
  },
  argTypes: {
    container: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Container size',
    },
  },
};

export const Default = {
  args: {
    container: 'md',
  },
  render: (args) => html`
    <rr-full-bleed-section container=${args.container}>
      <div style="background: #154273; color: white; padding: 48px; text-align: center;">
        <h2 style="margin: 0 0 16px 0;">Full Bleed Section</h2>
        <p style="margin: 0;">This section extends to the full width of the container.</p>
      </div>
    </rr-full-bleed-section>
  `,
};
