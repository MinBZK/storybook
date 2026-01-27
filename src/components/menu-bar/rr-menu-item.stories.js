import { html } from 'lit';
import './rr-menu-item.ts';

/**
 * Het Menu Item is een individueel navigatie-element binnen een Menu Bar.
 * Ondersteunt selected state en kan als link of button functioneren.
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=87-6523)
 *
 * ## Gebruik
 * ```html
 * <rr-menu-item>Menu item</rr-menu-item>
 * <rr-menu-item selected>Home</rr-menu-item>
 * <rr-menu-item href="/contact">Contact</rr-menu-item>
 * ```
 */
export default {
  title: 'Components/Menu Bar/Menu Item',
  component: 'rr-menu-item',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=87-6523',
    },
    componentSource: {
      file: 'src/components/menu-bar/rr-menu-item.ts',
      repository: 'https://github.com/regelrecht/design-system',
    },
    status: {
      type: 'stable',
    },
  },
  argTypes: {
    selected: {
      control: 'boolean',
      description: 'Whether the menu item is currently selected/active',
      table: {
        defaultValue: { summary: false },
      },
    },
    href: {
      control: 'text',
      description: 'Link destination (renders as anchor tag when set)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the menu item is disabled',
      table: {
        defaultValue: { summary: false },
      },
    },
  },
};

/**
 * Default menu item state.
 */
export const Default = {
  render: () => html`<rr-menu-item>Menu item</rr-menu-item>`,
};

/**
 * Selected/active state with underline indicator.
 */
export const Selected = {
  render: () => html`<rr-menu-item selected>Home</rr-menu-item>`,
};

/**
 * Menu item as a link.
 */
export const AsLink = {
  render: () => html`<rr-menu-item href="/contact">Contact</rr-menu-item>`,
};

/**
 * Disabled menu item.
 */
export const Disabled = {
  render: () => html`<rr-menu-item disabled>Disabled item</rr-menu-item>`,
};

/**
 * All states comparison.
 */
export const AllStates = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; background: #1e293b; padding: 1rem;">
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <span style="color: #64748b; font-size: 12px; width: 80px;">Default:</span>
        <rr-menu-item>Menu item</rr-menu-item>
      </div>
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <span style="color: #64748b; font-size: 12px; width: 80px;">Selected:</span>
        <rr-menu-item selected>Menu item</rr-menu-item>
      </div>
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <span style="color: #64748b; font-size: 12px; width: 80px;">Disabled:</span>
        <rr-menu-item disabled>Menu item</rr-menu-item>
      </div>
    </div>
  `,
  parameters: {
    controls: { disable: true },
  },
};

// Figma Comparison - visual comparison with Figma design
// Node 87:6523 = menu-bar__menu-item (individual menu item states)
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = {
  name: '🎨 Figma Comparison',
  tags: ['!autodocs', 'figma'],
  render: () => html`
    <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
          Menu item states (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
        </p>
        <ftl-holster node="87:6523" style="display: inline-block;">
          <!--
            Figma component set has 4 variants in column layout with 16px gap and 16px padding.
            Hover states cannot be rendered statically, so we show default and selected only.
            Variant order: default, hovered (skip), selected, selected+hovered (skip)
          -->
          <div style="
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            padding: 16px;
            background: #1e293b;
            --components-menu-bar-menu-item-color: #c0ccd8;
            --components-menu-bar-menu-item-is-selected-color: #7eb1e7;
            --components-menu-bar-menu-item-is-selected-indicator-color: #7eb1e7;
            --components-menu-bar-menu-item-is-hovered-indicator-color: #27333f;
          ">
            <rr-menu-item>Menu item</rr-menu-item>
            <rr-menu-item>Menu item</rr-menu-item>
            <rr-menu-item selected>Menu item</rr-menu-item>
            <rr-menu-item selected>Menu item</rr-menu-item>
          </div>
        </ftl-holster>
        <p style="font-size: 0.75rem; color: #64748b; margin-top: 0.5rem;">
          Note: Hover states in Figma cannot be rendered statically.
          <br />
          Keyboard: T (toggle) | O (overlay) | S (side-by-side)
        </p>
      </div>
    </ftl-belt>
  `,
  parameters: {
    controls: { disable: true },
  },
};
