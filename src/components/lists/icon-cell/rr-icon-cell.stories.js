import { html } from 'lit';
import './rr-icon-cell.js';

const placeholderIcon = (size = 24) => html`
  <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 1}" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/>
  </svg>
`;

export default {
  title: 'Components/Lists/Icon Cell',
  component: 'rr-icon-cell',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=236-41365',
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['16', '20', '24', '32'],
      description: 'Icon size in pixels',
    },
    verticalAlignment: {
      control: 'select',
      options: ['center', 'top'],
      description: 'Vertical alignment of the icon',
    },
  },
};

export const Default = {
  args: {
    size: '24',
    verticalAlignment: 'center',
  },
  render: (args) => html`
    <rr-icon-cell
      size=${args.size}
      vertical-alignment=${args.verticalAlignment}
    >
      ${placeholderIcon(Number(args.size))}
    </rr-icon-cell>
  `,
};

export const AllSizes = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <rr-icon-cell size="16">${placeholderIcon(16)}</rr-icon-cell>
      <rr-icon-cell size="20">${placeholderIcon(20)}</rr-icon-cell>
      <rr-icon-cell size="24">${placeholderIcon(24)}</rr-icon-cell>
      <rr-icon-cell size="32">${placeholderIcon(32)}</rr-icon-cell>
    </div>
  `,
};

export const VerticalTop = {
  render: () => html`
    <rr-icon-cell vertical-alignment="top" size="24" style="height: 80px; border: 1px dashed #ccc;">
      ${placeholderIcon(24)}
    </rr-icon-cell>
  `,
};

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Individual variant comparisons (Code vs Figma). Use Toggle/Overlay/Side-by-Side to compare.
      </p>

      <!-- size=32 / center -->
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span style="font-size: 0.75rem; color: #64748b;">size=32 / center</span>
        <ftl-holster node="236:41368" style="display: inline-block;">
          <rr-icon-cell size="32" vertical-alignment="center">${placeholderIcon(32)}</rr-icon-cell>
        </ftl-holster>
      </div>

      <!-- size=32 / top -->
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span style="font-size: 0.75rem; color: #64748b;">size=32 / top</span>
        <ftl-holster node="236:41366" style="display: inline-block;">
          <rr-icon-cell size="32" vertical-alignment="top">${placeholderIcon(32)}</rr-icon-cell>
        </ftl-holster>
      </div>

      <!-- size=24 / center -->
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span style="font-size: 0.75rem; color: #64748b;">size=24 / center</span>
        <ftl-holster node="236:41372" style="display: inline-block;">
          <rr-icon-cell size="24" vertical-alignment="center">${placeholderIcon(24)}</rr-icon-cell>
        </ftl-holster>
      </div>

      <!-- size=20 / center -->
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span style="font-size: 0.75rem; color: #64748b;">size=20 / center</span>
        <ftl-holster node="236:41376" style="display: inline-block;">
          <rr-icon-cell size="20" vertical-alignment="center">${placeholderIcon(20)}</rr-icon-cell>
        </ftl-holster>
      </div>

      <!-- size=16 / center -->
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span style="font-size: 0.75rem; color: #64748b;">size=16 / center</span>
        <ftl-holster node="236:41380" style="display: inline-block;">
          <rr-icon-cell size="16" vertical-alignment="center">${placeholderIcon(16)}</rr-icon-cell>
        </ftl-holster>
      </div>

      <p style="font-size: 0.75rem; color: #64748b; margin-top: 0.5rem;">
        Keyboard: T (toggle) | O (overlay) | S (side-by-side)
      </p>
    </div>
  </ftl-belt>
`;
FigmaComparison.storyName = '🎨 Figma Comparison';
FigmaComparison.tags = ['!autodocs', 'figma'];
FigmaComparison.parameters = { controls: { disable: true } };
