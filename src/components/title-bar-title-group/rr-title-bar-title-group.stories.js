import { html } from 'lit';
import './rr-title-bar-title-group.js';

export default {
  title: 'Components/Title Bar Title Group',
  component: 'rr-title-bar-title-group',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=996-3541',
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Title size',
    },
  },
};

export const Default = {
  args: {
    size: 'md',
  },
  render: (args) => html` <rr-title-bar-title-group size=${args.size}>Title</rr-title-bar-title-group> `,
};

export const Small = {
  args: {
    size: 'sm',
  },
  render: (args) => html` <rr-title-bar-title-group size=${args.size}>Title</rr-title-bar-title-group> `,
};

export const Medium = {
  args: {
    size: 'md',
  },
  render: (args) => html` <rr-title-bar-title-group size=${args.size}>Title</rr-title-bar-title-group> `,
};

export const Large = {
  args: {
    size: 'lg',
  },
  render: (args) => html` <rr-title-bar-title-group size=${args.size}>Title</rr-title-bar-title-group> `,
};

export const AllSizes = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <rr-title-bar-title-group size="sm">Small Title (sm)</rr-title-bar-title-group>
      <rr-title-bar-title-group size="md">Medium Title (md)</rr-title-bar-title-group>
      <rr-title-bar-title-group size="lg">Large Title (lg)</rr-title-bar-title-group>
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
        Title Bar Title Group (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="996:3541" style="display: inline-block;">
        <!--
          Figma title-bar__title-group (996:3541) component set:
          - Layout: column, gap: 16px, padding: 16px
          - Variants: sm (23px), md (23px), lg (26px)
          - Width: 308px, Height: hug
        -->
        <div
          style="width: 308px; background: #ffffff; padding: 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px;"
        >
          <rr-title-bar-title-group size="sm">Title</rr-title-bar-title-group>
          <rr-title-bar-title-group size="md">Title</rr-title-bar-title-group>
          <rr-title-bar-title-group size="lg">Title</rr-title-bar-title-group>
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
