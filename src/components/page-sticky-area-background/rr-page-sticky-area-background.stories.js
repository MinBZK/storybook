import { html } from 'lit';
import './rr-page-sticky-area-background.js';

export default {
  title: 'Components/Page Sticky Area Background',
  component: 'rr-page-sticky-area-background',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1171-6495',
    },
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

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Our page sticky area backgrounds (Code) vs Figma design. Use
        Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="1171:6495" style="display: inline-block;">
        <!--
          Figma page__sticky-area-background (1171:6495) component set:
          - Layout: column, gap: 32px, padding: 16px
          - Variants: position (top/bottom) x tinted (true/false)
          - Each variant: 80px height, 414px content width
          - Total: 446px wide (414 + 32 padding)
        -->
        <div
          style="width: 446px; padding: 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 32px;"
        >
          <!-- Top, not tinted -->
          <rr-page-sticky-area-background
            position="top"
            style="width: 414px;"
          ></rr-page-sticky-area-background>
          <!-- Top, tinted -->
          <rr-page-sticky-area-background
            position="top"
            tinted
            style="width: 414px;"
          ></rr-page-sticky-area-background>
          <!-- Bottom, not tinted -->
          <rr-page-sticky-area-background
            position="bottom"
            style="width: 414px;"
          ></rr-page-sticky-area-background>
          <!-- Bottom, tinted -->
          <rr-page-sticky-area-background
            position="bottom"
            tinted
            style="width: 414px;"
          ></rr-page-sticky-area-background>
        </div>
      </ftl-holster>
      <p style="font-size: 0.75rem; color: #64748b; margin-top: 0.5rem;">
        Keyboard: T (toggle) | O (overlay) | S (side-by-side)
      </p>
    </div>
  </ftl-belt>
`;
FigmaComparison.storyName = '🎨 Figma Comparison';
FigmaComparison.tags = ['!autodocs', 'figma'];
FigmaComparison.parameters = { controls: { disable: true } };
