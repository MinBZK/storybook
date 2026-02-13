import { html } from 'lit';
import './rr-toolbar-title-group.ts';
import '../toolbar/rr-toolbar.ts';

export default {
  title: 'Components/Control Groups/Toolbar Title Group',
  component: 'rr-toolbar-title-group',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1406:12871',
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['s', 'm'],
      description: 'Title group size',
    },
    align: {
      control: 'select',
      options: ['left', 'center'],
      description: 'Text alignment',
    },
    title: {
      control: 'text',
      description: 'Main title text',
    },
    subtitle: {
      control: 'text',
      description: 'Subtitle text',
    },
  },
};

export const Default = {
  args: { size: 'm', align: 'left', title: 'Toolbar', subtitle: 'Subtitle' },
  render: (args) => html`
    <rr-toolbar-title-group
      size=${args.size}
      align=${args.align}
      title=${args.title}
      subtitle=${args.subtitle}
    ></rr-toolbar-title-group>
  `,
};

export const Centered = {
  args: { size: 'm', align: 'center', title: 'Toolbar', subtitle: 'Subtitle' },
  render: (args) => html`
    <rr-toolbar-title-group
      size=${args.size}
      align=${args.align}
      title=${args.title}
      subtitle=${args.subtitle}
    ></rr-toolbar-title-group>
  `,
};

export const SizeSmall = {
  args: { size: 's', align: 'left', title: 'Toolbar', subtitle: 'Subtitle' },
  render: (args) => html`
    <rr-toolbar-title-group
      size=${args.size}
      align=${args.align}
      title=${args.title}
      subtitle=${args.subtitle}
    ></rr-toolbar-title-group>
  `,
};

export const TitleOnly = {
  args: { size: 'm', align: 'left', title: 'Toolbar Title', subtitle: '' },
  render: (args) => html`
    <rr-toolbar-title-group
      size=${args.size}
      align=${args.align}
      title=${args.title}
    ></rr-toolbar-title-group>
  `,
};

export const InToolbar = {
  args: { size: 'm', title: 'Document Title', subtitle: 'Last edited: Today' },
  render: (args) => html`
    <rr-toolbar size="m">
      <rr-toolbar-title-group
        slot="start"
        size=${args.size}
        title=${args.title}
        subtitle=${args.subtitle}
      ></rr-toolbar-title-group>
    </rr-toolbar>
  `,
};

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Our toolbar title group (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="1406:12871" style="display: inline-block;">
        <!--
          Figma toolbar__title-group (1406:12871) component set:
          - Layout: row, gap: 16px, padding: 16px
          - Variants: size=md/sm × text-align=left/center
          - md height: 44px, sm height: 32px
        -->
        <div style="padding: 16px; box-sizing: border-box; display: flex; flex-direction: row; gap: 16px; align-items: flex-start;">
          <!-- size=md, text-align=left -->
          <rr-toolbar-title-group size="m" align="left" title="Toolbar" subtitle="Subtitle"></rr-toolbar-title-group>
          <!-- size=md, text-align=center -->
          <rr-toolbar-title-group size="m" align="center" title="Toolbar" subtitle="Subtitle"></rr-toolbar-title-group>
          <!-- size=sm, text-align=left -->
          <rr-toolbar-title-group size="s" align="left" title="Toolbar" subtitle="Subtitle"></rr-toolbar-title-group>
          <!-- size=sm, text-align=center -->
          <rr-toolbar-title-group size="s" align="center" title="Toolbar" subtitle="Subtitle"></rr-toolbar-title-group>
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
