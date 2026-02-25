import { html } from 'lit';
import './rr-description-cell.js';

export default {
  title: 'Components/Lists/Description Cell',
  component: 'rr-description-cell',
  tags: ['autodocs'],
  parameters: {
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The title/label text displayed above the description',
    },
  },
};

export const Default = {
  args: {
    label: 'Description cell',
  },
  render: (args) => html`
    <rr-description-cell label=${args.label}>
      Common uses for this component are to implement a glossary or to display metadata.
    </rr-description-cell>
  `,
};

export const CustomContent = {
  render: () => html`
    <rr-description-cell label="Description cell">
      <div style="padding: 8px; background: #f0f0f0; border-radius: 4px;">
        Custom slotted content
      </div>
    </rr-description-cell>
  `,
};
