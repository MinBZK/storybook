import { html } from 'lit';
import './rr-divider.js';

export default {
  title: 'Components/Divider',
  component: 'rr-divider',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=39-927',
    },
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

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Our dividers (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to
        compare.
      </p>
      <ftl-holster node="39:927" style="display: inline-block;">
        <!--
          Figma split-vew__divider (39:927) component set:
          - Layout: column, gap: 16px, padding: 16px
          - Dimensions: 120x120px fixed
          - Vertical variant: fills parent height (70px after gap)
          - Horizontal variant: fills parent width (88px)
        -->
        <div
          style="width: 120px; height: 120px; padding: 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px;"
        >
          <!-- Vertical divider: fills height of its row -->
          <rr-divider orientation="vertical" style="height: 70px;"></rr-divider>
          <!-- Horizontal divider: fills width -->
          <rr-divider orientation="horizontal" style="width: 88px;"></rr-divider>
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
