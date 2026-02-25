import { html } from 'lit';
import './rr-divider.js';

export default {
  title: 'Components/Layout/Divider',
  component: 'rr-divider',
  tags: ['autodocs'],
  parameters: {
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Divider orientation',
    },
  },
};

export const Default = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => html`
    <div style="width: 200px;">
      <rr-divider orientation=${args.orientation}></rr-divider>
    </div>
  `,
};

export const Horizontal = {
  render: () => html`
    <div style="width: 300px;">
      <p style="margin: 0 0 16px 0;">Content above</p>
      <rr-divider orientation="horizontal"></rr-divider>
      <p style="margin: 16px 0 0 0;">Content below</p>
    </div>
  `,
};

export const Vertical = {
  render: () => html`
    <div style="display: flex; align-items: center; height: 100px;">
      <span>Left</span>
      <rr-divider
        orientation="vertical"
        style="height: 50px; margin: 0 16px;"
      ></rr-divider>
      <span>Right</span>
    </div>
  `,
};

export const AllOrientations = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <h4 style="margin: 0 0 8px 0;">Horizontal</h4>
        <div style="width: 200px;">
          <rr-divider orientation="horizontal"></rr-divider>
        </div>
      </div>
      <div>
        <h4 style="margin: 0 0 8px 0;">Vertical</h4>
        <div style="display: flex; align-items: center; height: 60px;">
          <span>A</span>
          <rr-divider
            orientation="vertical"
            style="height: 40px; margin: 0 12px;"
          ></rr-divider>
          <span>B</span>
        </div>
      </div>
    </div>
  `,
};
