import { html } from 'lit';
import './rr-menu-item.ts';

/**
 * Het Menu Item is een individueel navigatie-element binnen een Menu Bar.
 * Ondersteunt selected state en kan als link of button functioneren.
 *
 * ## Gebruik
 * ```html
 * <rr-menu-item>Menu item</rr-menu-item>
 * <rr-menu-item selected>Home</rr-menu-item>
 * <rr-menu-item href="/contact">Contact</rr-menu-item>
 * ```
 */
export default {
  title: 'Components/Navigation/Menu Bar/Menu Item',
  component: 'rr-menu-item',
  tags: ['autodocs'],
  parameters: {
    componentSource: {
      file: 'src/components/navigation/menu-bar/rr-menu-item.ts',
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
