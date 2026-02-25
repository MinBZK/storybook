import { html } from 'lit';
import './rr-custom-cell.js';

export default {
  title: 'Components/Lists/Custom Cell',
  component: 'rr-custom-cell',
  tags: ['autodocs'],
  parameters: {
  },
  argTypes: {
    verticalAlignment: {
      control: 'select',
      options: ['top', 'center'],
      description: 'Vertical alignment of the custom content',
    },
  },
};

export const Default = {
  args: {
    verticalAlignment: 'center',
  },
  render: (args) => html`
    <rr-custom-cell
      vertical-alignment=${args.verticalAlignment}
      style="height: 80px; border: 1px dashed #ccc;"
    >
      <div style="background: #f0f0f0; padding: 8px;">Custom content</div>
    </rr-custom-cell>
  `,
};

export const AlignmentTop = {
  render: () => html`
    <rr-custom-cell vertical-alignment="top" style="height: 80px; border: 1px dashed #ccc;">
      <div style="background: #e0f0ff; padding: 8px;">Top aligned content</div>
    </rr-custom-cell>
  `,
};

export const AlignmentCenter = {
  render: () => html`
    <rr-custom-cell vertical-alignment="center" style="height: 80px; border: 1px dashed #ccc;">
      <div style="background: #e0ffe0; padding: 8px;">Center aligned content</div>
    </rr-custom-cell>
  `,
};

export const WithFormElements = {
  render: () => html`
    <rr-custom-cell style="padding: 8px; border: 1px dashed #ccc;">
      <input type="text" placeholder="Custom input field" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
    </rr-custom-cell>
  `,
};
