import { html } from 'lit';
import './rr-one-half-one-half-section.ts';

export default {
  title: 'Components/Layout/One Half One Half Section',
  component: 'rr-one-half-one-half-section',
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
    <h2 style="margin: 0 0 8px 0;">Left Content (1/2)</h2>
    <p style="margin: 0;">This is the left half content area.</p>
  </div>
`;

const sampleAside = html`
  <div style="padding: 24px; background: #e2e8f0; border-radius: 8px;">
    <h3 style="margin: 0 0 8px 0;">Right Content (1/2)</h3>
    <p style="margin: 0;">This is the right half content area.</p>
  </div>
`;

export const Default = {
  args: {
    container: 'md',
  },
  render: (args) => html`
    <rr-one-half-one-half-section container=${args.container}>
      ${sampleContent}
      <div slot="aside">${sampleAside}</div>
    </rr-one-half-one-half-section>
  `,
};
