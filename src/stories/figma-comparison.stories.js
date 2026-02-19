import { html } from 'lit';

// Import all components - use .ts for Lit components, .js for legacy
import '../components/actions/button/rr-button.ts';
import '../components/inputs/checkbox/rr-checkbox.ts';
import '../components/inputs/radio/rr-radio.ts';
import '../components/inputs/switch/rr-switch.ts';
import '../components/inputs/toggle-button/rr-toggle-button.ts';
import '../components/actions/icon-button/rr-icon-button.ts';
import '../components/navigation/menu-bar/rr-menu-bar.ts';
import '../components/navigation/menu-bar/rr-menu-item.ts';
import '../components/navigation/top-navigation-bar/rr-top-navigation-bar.ts';

/**
 * Stories for automated pixel-perfect comparison with Figma designs.
 * These stories render components in layouts matching Figma exports.
 * Used by Lost Pixel for visual regression testing against Figma baselines.
 *
 * Story naming: figma-{component}--{variant}
 * Baseline images: .lostpixel/figma-baseline/{story-id}.png
 */
export default {
  title: 'Figma Comparison',
  tags: ['!autodocs', 'figma-pixel-test'],
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: true },
  },
};

// ============================================================================
// BUTTON - Figma node: 20-27 (button-list-cell)
// ============================================================================

/**
 * Button accent-filled size M - single component for pixel comparison
 */
export const ButtonAccentFilledM = () => html`
  <div
    style="background: #ffffff; padding: 8px; display: inline-flex; align-items: center; justify-content: center;"
  >
    <rr-button variant="accent-filled" size="md">Button</rr-button>
  </div>
`;
ButtonAccentFilledM.storyName = 'button--accent-filled--m';

export const ButtonAccentFilledS = () => html`
  <div
    style="background: #ffffff; padding: 8px; display: inline-flex; align-items: center; justify-content: center;"
  >
    <rr-button variant="accent-filled" size="sm">Button</rr-button>
  </div>
`;
ButtonAccentFilledS.storyName = 'button--accent-filled--s';

export const ButtonAccentFilledXs = () => html`
  <div
    style="background: #ffffff; padding: 8px; display: inline-flex; align-items: center; justify-content: center;"
  >
    <rr-button variant="accent-filled" size="xs">Button</rr-button>
  </div>
`;
ButtonAccentFilledXs.storyName = 'button--accent-filled--xs';

export const ButtonAccentOutlinedM = () => html`
  <div
    style="background: #ffffff; padding: 8px; display: inline-flex; align-items: center; justify-content: center;"
  >
    <rr-button variant="accent-outlined" size="md">Button</rr-button>
  </div>
`;
ButtonAccentOutlinedM.storyName = 'button--accent-outlined--m';

<<<<<<< HEAD
export const ButtonAccentTintedM = () => html`
  <div
    style="background: #ffffff; padding: 8px; display: inline-flex; align-items: center; justify-content: center;"
  >
    <rr-button variant="accent-tinted" size="md">Button</rr-button>
  </div>
`;
ButtonAccentTintedM.storyName = 'button--accent-tinted--m';

=======
>>>>>>> 344317c (Removes accent-tinted buttons)
export const ButtonNeutralTintedM = () => html`
  <div
    style="background: #ffffff; padding: 8px; display: inline-flex; align-items: center; justify-content: center;"
  >
    <rr-button variant="neutral-tinted" size="md">Button</rr-button>
  </div>
`;
ButtonNeutralTintedM.storyName = 'button--neutral-tinted--m';

export const ButtonAccentTransparentM = () => html`
  <div
    style="background: #ffffff; padding: 8px; display: inline-flex; align-items: center; justify-content: center;"
  >
    <rr-button variant="accent-transparent" size="md">Button</rr-button>
  </div>
`;
ButtonAccentTransparentM.storyName = 'button--accent-transparent--m';

// ============================================================================
// CHECKBOX - Figma node: 236:41408 (checkbox-list-cell)
// Single size: 24x24px per Figma specs
// ============================================================================

export const CheckboxUnchecked = () => html`
  <div
    style="background: #ffffff; padding: 8px; display: inline-flex; align-items: center; justify-content: center;"
  >
    <rr-checkbox aria-label="Checkbox"></rr-checkbox>
  </div>
`;
CheckboxUnchecked.storyName = 'checkbox--unchecked';

export const CheckboxChecked = () => html`
  <div
    style="background: #ffffff; padding: 8px; display: inline-flex; align-items: center; justify-content: center;"
  >
    <rr-checkbox checked aria-label="Checkbox"></rr-checkbox>
  </div>
`;
CheckboxChecked.storyName = 'checkbox--checked';

export const CheckboxIndeterminate = () => html`
  <div
    style="background: #ffffff; padding: 8px; display: inline-flex; align-items: center; justify-content: center;"
  >
    <rr-checkbox indeterminate aria-label="Checkbox"></rr-checkbox>
  </div>
`;
CheckboxIndeterminate.storyName = 'checkbox--indeterminate';

// ============================================================================
// RADIO - Figma node: 236:41398 (radio-button-list-cell)
// ============================================================================

export const RadioUncheckedM = () => html`
  <div
    style="background: #ffffff; padding: 8px; display: inline-flex; align-items: center; justify-content: center;"
  >
    <rr-radio size="md" name="figma-radio" aria-label="Radio"></rr-radio>
  </div>
`;
RadioUncheckedM.storyName = 'radio--unchecked--m';

export const RadioCheckedM = () => html`
  <div
    style="background: #ffffff; padding: 8px; display: inline-flex; align-items: center; justify-content: center;"
  >
    <rr-radio size="md" name="figma-radio-checked" checked aria-label="Radio"></rr-radio>
  </div>
`;
RadioCheckedM.storyName = 'radio--checked--m';

export const RadioUncheckedS = () => html`
  <div
    style="background: #ffffff; padding: 8px; display: inline-flex; align-items: center; justify-content: center;"
  >
    <rr-radio size="sm" name="figma-radio-s" aria-label="Radio"></rr-radio>
  </div>
`;
RadioUncheckedS.storyName = 'radio--unchecked--s';

export const RadioCheckedS = () => html`
  <div
    style="background: #ffffff; padding: 8px; display: inline-flex; align-items: center; justify-content: center;"
  >
    <rr-radio size="sm" name="figma-radio-s-checked" checked aria-label="Radio"></rr-radio>
  </div>
`;
RadioCheckedS.storyName = 'radio--checked--s';

// ============================================================================
// SWITCH - Figma node: 236:41353 (switch-list-cell)
// ============================================================================

export const SwitchUncheckedM = () => html`
  <div
    style="background: #ffffff; padding: 8px; display: inline-flex; align-items: center; justify-content: center;"
  >
    <rr-switch size="md" aria-label="Switch"></rr-switch>
  </div>
`;
SwitchUncheckedM.storyName = 'switch--unchecked--m';

export const SwitchCheckedM = () => html`
  <div
    style="background: #ffffff; padding: 8px; display: inline-flex; align-items: center; justify-content: center;"
  >
    <rr-switch size="md" checked aria-label="Switch"></rr-switch>
  </div>
`;
SwitchCheckedM.storyName = 'switch--checked--m';

// Note: Figma design only has size M for switch, no S or XS variants

// ============================================================================
// TOGGLE BUTTON - Figma node: 309:3542 (toggle-button)
// ============================================================================

export const ToggleButtonUnselectedM = () => html`
  <div
    style="background: #ffffff; padding: 8px; display: inline-flex; align-items: center; justify-content: center;"
  >
    <rr-toggle-button size="md">Toggle</rr-toggle-button>
  </div>
`;
ToggleButtonUnselectedM.storyName = 'toggle-button--unselected--m';

export const ToggleButtonSelectedM = () => html`
  <div
    style="background: #ffffff; padding: 8px; display: inline-flex; align-items: center; justify-content: center;"
  >
    <rr-toggle-button size="md" selected>Toggle</rr-toggle-button>
  </div>
`;
ToggleButtonSelectedM.storyName = 'toggle-button--selected--m';

export const ToggleButtonUnselectedS = () => html`
  <div
    style="background: #ffffff; padding: 8px; display: inline-flex; align-items: center; justify-content: center;"
  >
    <rr-toggle-button size="sm">Toggle</rr-toggle-button>
  </div>
`;
ToggleButtonUnselectedS.storyName = 'toggle-button--unselected--s';

export const ToggleButtonSelectedS = () => html`
  <div
    style="background: #ffffff; padding: 8px; display: inline-flex; align-items: center; justify-content: center;"
  >
    <rr-toggle-button size="sm" selected>Toggle</rr-toggle-button>
  </div>
`;
ToggleButtonSelectedS.storyName = 'toggle-button--selected--s';

// ============================================================================
// ICON BUTTON - Figma node: 240:1391 (icon-button-list-cell)
// ============================================================================

const PlusIcon = html`<svg
  width="1em"
  height="1em"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
>
  <path d="M12 5v14M5 12h14" />
</svg>`;

export const IconButtonAccentFilledM = () => html`
  <div
    style="background: #ffffff; padding: 8px; display: inline-flex; align-items: center; justify-content: center;"
  >
    <rr-icon-button variant="accent-filled" size="md" label="Add">${PlusIcon}</rr-icon-button>
  </div>
`;
IconButtonAccentFilledM.storyName = 'icon-button--accent-filled--m';

export const IconButtonAccentOutlinedM = () => html`
  <div
    style="background: #ffffff; padding: 8px; display: inline-flex; align-items: center; justify-content: center;"
  >
    <rr-icon-button variant="accent-outlined" size="md" label="Add">${PlusIcon}</rr-icon-button>
  </div>
`;
IconButtonAccentOutlinedM.storyName = 'icon-button--accent-outlined--m';

export const IconButtonNeutralTintedM = () => html`
  <div
    style="background: #ffffff; padding: 8px; display: inline-flex; align-items: center; justify-content: center;"
  >
    <rr-icon-button variant="neutral-tinted" size="md" label="Add">${PlusIcon}</rr-icon-button>
  </div>
`;
IconButtonNeutralTintedM.storyName = 'icon-button--neutral-tinted--m';

export const IconButtonAccentTransparentM = () => html`
  <div
    style="background: #ffffff; padding: 8px; display: inline-flex; align-items: center; justify-content: center;"
  >
    <rr-icon-button variant="accent-transparent" size="md" label="Add"
      >${PlusIcon}</rr-icon-button
    >
  </div>
`;
IconButtonAccentTransparentM.storyName = 'icon-button--accent-transparent--m';

// ============================================================================
// MENU BAR - Figma node: 48:2135 (top-navigation-bar)
// ============================================================================

export const MenuBarDefault = () => html`
  <div
    style="background: #ffffff; padding: 0; display: inline-flex; align-items: center; justify-content: center;"
  >
    <rr-menu-bar>
      <rr-menu-item>Home</rr-menu-item>
      <rr-menu-item selected>Producten</rr-menu-item>
      <rr-menu-item>Over ons</rr-menu-item>
      <rr-menu-item>Contact</rr-menu-item>
    </rr-menu-bar>
  </div>
`;
MenuBarDefault.storyName = 'menu-bar--default';

// ============================================================================
// TOP NAVIGATION BAR - Figma node: 48:2135 (top-navigation-bar)
// Full navigation bar with logo as shown in Figma
// ============================================================================

export const TopNavigationBarFull = () => html`
  <div style="background: #ffffff; width: 1280px;">
    <rr-top-navigation-bar
      logo-src="https://www.rijksoverheid.nl/binaries/content/gallery/rijksoverheid/channel-afbeeldingen/logos/logo-ro.svg"
      logo-alt="Rijksoverheid logo"
      title="RegelRecht"
    >
      <rr-menu-item slot="menu">Home</rr-menu-item>
      <rr-menu-item slot="menu" selected>Producten</rr-menu-item>
      <rr-menu-item slot="menu">Over ons</rr-menu-item>
      <rr-menu-item slot="menu">Contact</rr-menu-item>
    </rr-top-navigation-bar>
  </div>
`;
TopNavigationBarFull.storyName = 'top-navigation-bar--full';

export const TopNavigationBarMobile = () => html`
  <div style="background: #ffffff; width: 375px;">
    <rr-top-navigation-bar
      logo-src="https://www.rijksoverheid.nl/binaries/content/gallery/rijksoverheid/channel-afbeeldingen/logos/logo-ro.svg"
      logo-alt="Rijksoverheid logo"
      title="RegelRecht"
    >
      <rr-menu-item slot="menu">Home</rr-menu-item>
      <rr-menu-item slot="menu" selected>Producten</rr-menu-item>
      <rr-menu-item slot="menu">Over ons</rr-menu-item>
    </rr-top-navigation-bar>
  </div>
`;
TopNavigationBarMobile.storyName = 'top-navigation-bar--mobile';
