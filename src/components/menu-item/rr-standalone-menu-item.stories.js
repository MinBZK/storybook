import { html } from 'lit';
import './rr-standalone-menu-item.ts';

/**
 * De Standalone Menu Item component voor dropdown menu's en context menu's.
 * Verschilt van rr-menu-item dat in rr-menu-bar wordt gebruikt.
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=331-1456)
 *
 * ## Gebruik
 * ```html
 * <rr-standalone-menu-item>Menu optie</rr-standalone-menu-item>
 * ```
 */
export default {
  title: 'Components/Navigation/Menu Item',
  component: 'rr-standalone-menu-item',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=331-1456',
    },
    componentSource: {
      file: 'src/components/menu-item/rr-standalone-menu-item.ts',
      repository: 'https://github.com/regelrecht/design-system',
    },
    status: {
      type: 'stable',
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'danger'],
      description: 'Visual style variant',
      table: {
        defaultValue: { summary: 'neutral' },
      },
    },
    selected: {
      control: 'boolean',
      description: 'Whether the item is selected (shows checkmark)',
      table: {
        defaultValue: { summary: false },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: {
        defaultValue: { summary: false },
      },
    },
    hasSubmenu: {
      control: 'boolean',
      description: 'Whether item opens a submenu (shows chevron-right)',
      table: {
        defaultValue: { summary: false },
      },
    },
    label: {
      control: 'text',
      description: 'Menu item text',
    },
  },
  args: {
    variant: 'neutral',
    selected: false,
    disabled: false,
    hasSubmenu: false,
    label: 'Menu item',
  },
};

const Template = ({ variant, selected, disabled, hasSubmenu, label }) => html`
  <div style="width: 250px;">
    <rr-standalone-menu-item
      variant=${variant}
      ?selected=${selected}
      ?disabled=${disabled}
      ?has-submenu=${hasSubmenu}
    >
      ${label}
    </rr-standalone-menu-item>
  </div>
`;

// Default story
export const Default = Template.bind({});
Default.args = {
  label: 'Menu optie',
};

// Danger style
export const DangerStyle = Template.bind({});
DangerStyle.args = {
  label: 'Verwijderen',
  variant: 'danger',
};

// Selected
export const Selected = Template.bind({});
Selected.args = {
  label: 'Geselecteerd item',
  selected: true,
};

// With submenu
export const WithSubmenu = Template.bind({});
WithSubmenu.args = {
  label: 'Meer opties',
  hasSubmenu: true,
};

// All states overview
export const AllStates = () => html`
  <div
    style="width: 250px; display: flex; flex-direction: column; gap: 2px; padding: 4px; background: white; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.1);"
  >
    <rr-standalone-menu-item>Default item</rr-standalone-menu-item>
    <rr-standalone-menu-item selected>Geselecteerd item</rr-standalone-menu-item>
    <rr-standalone-menu-item variant="danger">Verwijderen</rr-standalone-menu-item>
    <rr-standalone-menu-item has-submenu>Meer opties</rr-standalone-menu-item>
    <rr-standalone-menu-item disabled>Uitgeschakeld</rr-standalone-menu-item>
    <rr-standalone-menu-item>
      <svg
        slot="icon-start"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
        ></path>
        <path
          d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
        ></path>
      </svg>
      Met icoon
    </rr-standalone-menu-item>
    <rr-standalone-menu-item selected has-submenu>
      <svg
        slot="icon-start"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path
          d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
        ></path>
      </svg>
      Alle opties
    </rr-standalone-menu-item>
  </div>
`;
AllStates.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story:
        'Overzicht van alle menu item varianten: default, selected, danger, submenu, disabled en met iconen.',
    },
  },
};

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Standalone Menu Item (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side
        to compare.
      </p>
      <ftl-holster node="331-1456" style="display: inline-block;">
        <div
          style="width: 410px; display: flex; flex-direction: column; padding: 16px;"
        >
          <!-- neutral, not-selected, not-hovered -->
          <rr-standalone-menu-item>Text cell</rr-standalone-menu-item>
          <!-- spacer for: neutral, not-selected, hovered -->
          <div style="height: 39px;" aria-hidden="true"></div>
          <!-- neutral, selected, not-hovered (Figma shows no visual difference) -->
          <rr-standalone-menu-item>Text cell</rr-standalone-menu-item>
          <!-- spacer for: neutral, selected, hovered -->
          <div style="height: 39px;" aria-hidden="true"></div>
          <!-- danger, not-selected, not-hovered -->
          <rr-standalone-menu-item variant="danger">Text cell</rr-standalone-menu-item>
          <!-- spacer for: danger, not-selected, hovered -->
          <div style="height: 39px;" aria-hidden="true"></div>
          <!-- danger, selected, not-hovered (Figma shows no visual difference) -->
          <rr-standalone-menu-item variant="danger">Text cell</rr-standalone-menu-item>
          <!-- spacer for: danger, selected, hovered -->
          <div style="height: 39px;" aria-hidden="true"></div>
        </div>
      </ftl-holster>
      <p style="font-size: 0.75rem; color: #64748b; margin-top: 0.5rem;">
        Keyboard: T (toggle) | O (overlay) | S (side-by-side)
      </p>
    </div>
  </ftl-belt>
`;
FigmaComparison.storyName = 'Figma Comparison';
FigmaComparison.tags = ['!autodocs', 'figma'];
FigmaComparison.parameters = {
  controls: { disable: true },
};
