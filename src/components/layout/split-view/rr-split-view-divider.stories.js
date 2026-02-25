import { html } from 'lit';
import './rr-split-view-divider.ts';

export default {
  title: 'Components/Layout/Split View/Split View Divider',
  component: 'rr-split-view-divider',
  tags: ['autodocs'],
  parameters: {
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Divider orientation',
      table: {
        defaultValue: { summary: 'vertical' },
      },
    },
    hasDragHandle: {
      control: 'boolean',
      description: 'Whether to show a drag handle (future use)',
    },
  },
};

export const Vertical = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => html`
    <div style="display: flex; flex-direction: row; height: 200px;">
      <div style="flex: 1; background: #f1f5f9; display: flex; align-items: center; justify-content: center;">
        Left
      </div>
      <rr-split-view-divider orientation=${args.orientation}></rr-split-view-divider>
      <div style="flex: 1; background: #f1f5f9; display: flex; align-items: center; justify-content: center;">
        Right
      </div>
    </div>
  `,
};

export const Horizontal = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => html`
    <div style="display: flex; flex-direction: column; width: 400px;">
      <div style="height: 100px; background: #f1f5f9; display: flex; align-items: center; justify-content: center;">
        Top
      </div>
      <rr-split-view-divider orientation=${args.orientation}></rr-split-view-divider>
      <div style="height: 100px; background: #f1f5f9; display: flex; align-items: center; justify-content: center;">
        Bottom
      </div>
    </div>
  `,
};
