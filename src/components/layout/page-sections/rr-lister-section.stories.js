import { html } from 'lit';
import './rr-lister-section.ts';

export default {
  title: 'Components/Layout/Lister Section',
  component: 'rr-lister-section',
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
    <rr-lister-section container=${args.container}>
      ${[1, 2, 3, 4, 5, 6].map(
        (i) => html`
          <div style="padding: 24px; background: #f1f5f9; border-radius: 8px;">
            <h3 style="margin: 0 0 8px 0;">Card ${i}</h3>
            <p style="margin: 0;">Card content goes here.</p>
          </div>
        `
      )}
    </rr-lister-section>
  `,
};
