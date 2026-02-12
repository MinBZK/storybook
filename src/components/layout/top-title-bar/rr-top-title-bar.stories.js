import { html } from 'lit';
import './rr-top-title-bar.ts';

export default {
  title: 'Components/Layout/Top Title Bar',
  component: 'rr-top-title-bar',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1048-2288',
    },
  },
  argTypes: {
    container: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Container size',
    },
    compact: {
      control: 'boolean',
      description: 'Use compact mode with title in toolbar',
    },
    toolbar: {
      control: 'select',
      options: ['default', 'custom', 'none'],
      description: 'Toolbar mode',
    },
    title: {
      control: 'text',
      description: 'Title text',
    },
    dismissLabel: {
      control: 'text',
      description: 'Dismiss button label',
    },
  },
};

export const Default = {
  args: {
    container: 'sm',
    compact: false,
    toolbar: 'default',
    title: 'Title',
    dismissLabel: 'Sluit',
  },
  render: (args) => html`
    <rr-top-title-bar
      container=${args.container}
      ?compact=${args.compact}
      toolbar=${args.toolbar}
      title=${args.title}
      dismiss-label=${args.dismissLabel}
      @dismiss=${() => console.log('Dismiss clicked')}
    ></rr-top-title-bar>
  `,
};

export const ContainerSmall = {
  args: {
    container: 'sm',
    compact: false,
    toolbar: 'default',
    title: 'Small Container Title',
  },
  render: (args) => html`
    <rr-top-title-bar container=${args.container} ?compact=${args.compact} toolbar=${args.toolbar} title=${args.title}>
    </rr-top-title-bar>
  `,
};

export const ContainerMedium = {
  args: {
    container: 'md',
    compact: false,
    toolbar: 'default',
    title: 'Medium Container Title',
  },
  render: (args) => html`
    <rr-top-title-bar container=${args.container} ?compact=${args.compact} toolbar=${args.toolbar} title=${args.title}>
    </rr-top-title-bar>
  `,
};

export const ContainerLarge = {
  args: {
    container: 'lg',
    compact: false,
    toolbar: 'default',
    title: 'Large Container Title',
  },
  render: (args) => html`
    <rr-top-title-bar container=${args.container} ?compact=${args.compact} toolbar=${args.toolbar} title=${args.title}>
    </rr-top-title-bar>
  `,
};

export const Compact = {
  args: {
    container: 'md',
    compact: true,
    toolbar: 'default',
    title: 'Compact Title',
  },
  render: (args) => html`
    <rr-top-title-bar container=${args.container} ?compact=${args.compact} toolbar=${args.toolbar} title=${args.title}>
    </rr-top-title-bar>
  `,
};

export const NoToolbar = {
  args: {
    container: 'md',
    compact: false,
    toolbar: 'none',
    title: 'Title Without Toolbar',
  },
  render: (args) => html`
    <rr-top-title-bar container=${args.container} ?compact=${args.compact} toolbar=${args.toolbar} title=${args.title}>
    </rr-top-title-bar>
  `,
};

export const CustomToolbar = {
  args: {
    container: 'md',
    compact: false,
    toolbar: 'custom',
    title: 'Custom Toolbar Title',
  },
  render: (args) => html`
    <rr-top-title-bar container=${args.container} ?compact=${args.compact} toolbar=${args.toolbar} title=${args.title}>
      <rr-button slot="toolbar-start" variant="accent-transparent">Back</rr-button>
      <rr-button slot="toolbar-end" variant="accent-transparent">Save</rr-button>
      <rr-button slot="toolbar-end" variant="accent-transparent">Close</rr-button>
    </rr-top-title-bar>
  `,
};

export const AllVariants = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <h3 style="margin: 0 0 8px 0;">Small Container (non-compact)</h3>
        <rr-top-title-bar container="sm" toolbar="default" title="Title"></rr-top-title-bar>
      </div>
      <div>
        <h3 style="margin: 0 0 8px 0;">Medium Container (non-compact)</h3>
        <rr-top-title-bar container="md" toolbar="default" title="Title"></rr-top-title-bar>
      </div>
      <div>
        <h3 style="margin: 0 0 8px 0;">Large Container (non-compact)</h3>
        <rr-top-title-bar container="lg" toolbar="default" title="Title"></rr-top-title-bar>
      </div>
      <div>
        <h3 style="margin: 0 0 8px 0;">Compact Mode</h3>
        <rr-top-title-bar container="md" compact toolbar="default" title="Title"></rr-top-title-bar>
      </div>
      <div>
        <h3 style="margin: 0 0 8px 0;">No Toolbar</h3>
        <rr-top-title-bar container="md" toolbar="none" title="Title"></rr-top-title-bar>
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
        Top Title Bar (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="1048:2288" style="display: inline-block;">
        <!--
          Figma top-title-bar (1048:2288) component set:
          - Layout: column, gap: 16px, padding: 16px
          - Variants: container (sm/md/lg) x is-compact (true/false) x top-toolbar (default/custom/none)
          - Width: 512px
        -->
        <div
          style="width: 512px; background: #ffffff; padding: 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px;"
        >
          <!-- sm, non-compact, default toolbar -->
          <rr-top-title-bar container="sm" toolbar="default" title="Title"></rr-top-title-bar>

          <!-- sm, non-compact, custom toolbar (shows slots) -->
          <rr-top-title-bar container="sm" toolbar="custom" title="Title">
            <div
              slot="toolbar-start"
              style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD;"
            >
              <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;">SLOT</span>
            </div>
            <div
              slot="toolbar-end"
              style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD;"
            >
              <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;">SLOT</span>
            </div>
          </rr-top-title-bar>

          <!-- sm, non-compact, no toolbar -->
          <rr-top-title-bar container="sm" toolbar="none" title="Title"></rr-top-title-bar>

          <!-- md, non-compact, default toolbar -->
          <rr-top-title-bar container="md" toolbar="default" title="Title"></rr-top-title-bar>

          <!-- md, non-compact, custom toolbar -->
          <rr-top-title-bar container="md" toolbar="custom" title="Title">
            <div
              slot="toolbar-start"
              style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD;"
            >
              <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;">SLOT</span>
            </div>
            <div
              slot="toolbar-end"
              style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD;"
            >
              <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;">SLOT</span>
            </div>
          </rr-top-title-bar>

          <!-- md, non-compact, no toolbar -->
          <rr-top-title-bar container="md" toolbar="none" title="Title"></rr-top-title-bar>

          <!-- lg, non-compact, default toolbar -->
          <rr-top-title-bar container="lg" toolbar="default" title="Title"></rr-top-title-bar>

          <!-- sm, compact, default toolbar -->
          <rr-top-title-bar container="sm" compact toolbar="default" title="Title"></rr-top-title-bar>

          <!-- md, compact, default toolbar -->
          <rr-top-title-bar container="md" compact toolbar="default" title="Title"></rr-top-title-bar>

          <!-- lg, compact, default toolbar -->
          <rr-top-title-bar container="lg" compact toolbar="default" title="Title"></rr-top-title-bar>
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
