import { html } from 'lit';
import './rr-simple-section.ts';

export default {
  title: 'Components/Layout/Page Sections/Simple Section',
  component: 'rr-simple-section',
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
    <h2 style="margin: 0 0 8px 0;">Section Content</h2>
    <p style="margin: 0;">This is the main content area of the section.</p>
  </div>
`;

export const Default = {
  args: {
    container: 'md',
  },
  render: (args) => html`
    <rr-simple-section container=${args.container}> ${sampleContent} </rr-simple-section>
  `,
};

export const AllContainerSizes = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px; background: #e2e8f0; padding: 16px;">
      <div>
        <h3 style="margin: 0 0 8px 16px;">Small Container (sm)</h3>
        <rr-simple-section container="sm" style="background: white;">
          <div style="padding: 24px; background: #f1f5f9;">Content with sm padding (16px)</div>
        </rr-simple-section>
      </div>
      <div>
        <h3 style="margin: 0 0 8px 32px;">Medium Container (md)</h3>
        <rr-simple-section container="md" style="background: white;">
          <div style="padding: 24px; background: #f1f5f9;">Content with md padding (24px 32px)</div>
        </rr-simple-section>
      </div>
      <div>
        <h3 style="margin: 0 0 8px 48px;">Large Container (lg)</h3>
        <rr-simple-section container="lg" style="background: white;">
          <div style="padding: 24px; background: #f1f5f9;">Content with lg padding (32px 48px)</div>
        </rr-simple-section>
      </div>
    </div>
  `,
};
