import { html } from 'lit';
import './rr-two-thirds-one-third-section.ts';

export default {
  title: 'Components/Layout/Page Sections/Two Thirds One Third Section',
  component: 'rr-two-thirds-one-third-section',
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

const sampleContent = html`
  <div style="padding: 24px; background: #f1f5f9; border-radius: 8px;">
    <h2 style="margin: 0 0 8px 0;">Main Content (2/3)</h2>
    <p style="margin: 0;">This is the main content area taking two thirds of the width.</p>
  </div>
`;

const sampleAside = html`
  <div style="padding: 24px; background: #e2e8f0; border-radius: 8px;">
    <h3 style="margin: 0 0 8px 0;">Aside (1/3)</h3>
    <p style="margin: 0;">This is the aside content.</p>
  </div>
`;

export const Default = {
  args: {
    container: 'md',
  },
  render: (args) => html`
    <rr-two-thirds-one-third-section container=${args.container}>
      ${sampleContent}
      <div slot="aside">${sampleAside}</div>
    </rr-two-thirds-one-third-section>
  `,
};
