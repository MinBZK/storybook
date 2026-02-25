import { html } from 'lit';
import './rr-page-sticky-area-background.js';

export default {
  title: 'Components/Layout/Page/Page Sticky Area Background',
  component: 'rr-page-sticky-area-background',
  tags: ['autodocs'],
  parameters: {
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom'],
      description: 'Position of the sticky area',
    },
    tinted: {
      control: 'boolean',
      description: 'Use tinted (gray) background',
    },
  },
};

export const Default = {
  args: {
    position: 'top',
    tinted: false,
  },
  render: (args) => html`
    <div
      style="width: 300px; height: 200px; background: linear-gradient(135deg, #ff6b6b, #4ecdc4); position: relative;"
    >
      <rr-page-sticky-area-background
        position=${args.position}
        ?tinted=${args.tinted}
        style="position: absolute; ${args.position}: 0; left: 0; right: 0;"
      ></rr-page-sticky-area-background>
    </div>
  `,
};

export const TopWhite = {
  render: () => html`
    <div
      style="width: 300px; height: 200px; background: linear-gradient(135deg, #667eea, #764ba2); position: relative;"
    >
      <rr-page-sticky-area-background
        position="top"
        style="position: absolute; top: 0; left: 0; right: 0;"
      ></rr-page-sticky-area-background>
      <p
        style="position: absolute; top: 20px; left: 20px; margin: 0; color: white; z-index: 1;"
      >
        Sticky Header Area
      </p>
    </div>
  `,
};

export const BottomWhite = {
  render: () => html`
    <div
      style="width: 300px; height: 200px; background: linear-gradient(135deg, #667eea, #764ba2); position: relative;"
    >
      <rr-page-sticky-area-background
        position="bottom"
        style="position: absolute; bottom: 0; left: 0; right: 0;"
      ></rr-page-sticky-area-background>
      <p
        style="position: absolute; bottom: 20px; left: 20px; margin: 0; color: white; z-index: 1;"
      >
        Sticky Footer Area
      </p>
    </div>
  `,
};

export const TopTinted = {
  render: () => html`
    <div
      style="width: 300px; height: 200px; background: linear-gradient(135deg, #f093fb, #f5576c); position: relative;"
    >
      <rr-page-sticky-area-background
        position="top"
        tinted
        style="position: absolute; top: 0; left: 0; right: 0;"
      ></rr-page-sticky-area-background>
    </div>
  `,
};

export const BottomTinted = {
  render: () => html`
    <div
      style="width: 300px; height: 200px; background: linear-gradient(135deg, #f093fb, #f5576c); position: relative;"
    >
      <rr-page-sticky-area-background
        position="bottom"
        tinted
        style="position: absolute; bottom: 0; left: 0; right: 0;"
      ></rr-page-sticky-area-background>
    </div>
  `,
};

export const AllVariants = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;">
      <div>
        <h4 style="margin: 0 0 8px 0;">Top - White</h4>
        <div
          style="width: 200px; height: 120px; background: linear-gradient(135deg, #667eea, #764ba2); position: relative;"
        >
          <rr-page-sticky-area-background
            position="top"
            style="position: absolute; top: 0; left: 0; right: 0;"
          ></rr-page-sticky-area-background>
        </div>
      </div>
      <div>
        <h4 style="margin: 0 0 8px 0;">Top - Tinted</h4>
        <div
          style="width: 200px; height: 120px; background: linear-gradient(135deg, #667eea, #764ba2); position: relative;"
        >
          <rr-page-sticky-area-background
            position="top"
            tinted
            style="position: absolute; top: 0; left: 0; right: 0;"
          ></rr-page-sticky-area-background>
        </div>
      </div>
      <div>
        <h4 style="margin: 0 0 8px 0;">Bottom - White</h4>
        <div
          style="width: 200px; height: 120px; background: linear-gradient(135deg, #667eea, #764ba2); position: relative;"
        >
          <rr-page-sticky-area-background
            position="bottom"
            style="position: absolute; bottom: 0; left: 0; right: 0;"
          ></rr-page-sticky-area-background>
        </div>
      </div>
      <div>
        <h4 style="margin: 0 0 8px 0;">Bottom - Tinted</h4>
        <div
          style="width: 200px; height: 120px; background: linear-gradient(135deg, #667eea, #764ba2); position: relative;"
        >
          <rr-page-sticky-area-background
            position="bottom"
            tinted
            style="position: absolute; bottom: 0; left: 0; right: 0;"
          ></rr-page-sticky-area-background>
        </div>
      </div>
    </div>
  `,
};
