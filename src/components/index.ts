/**
 * RegelRecht Design System Components
 *
 * Import this file to register all components:
 * import '@regelrecht/design-system';
 *
 * Or import individual components:
 * import '@regelrecht/design-system/components/button';
 */

// Base component (vanilla JS)
export { RRBaseComponent } from './base/base-component.js';

// Lit + TypeScript components
export { RRToggleButton } from './toggle-button/rr-toggle-button.ts';
export { RRButton } from './button/rr-button.ts';
export { RRCheckbox } from './checkbox/rr-checkbox.ts';

// Vanilla JS components
export { RRBox } from './box/rr-box.js';
export { RRRadio } from './radio/rr-radio.js';
export { RRSwitch } from './switch/rr-switch.js';
export { RRIconButton } from './icon-button/rr-icon-button.js';
export { RRMenuBar } from './menu-bar/rr-menu-bar.js';
export { RRMenuItem } from './menu-bar/rr-menu-item.js';
export { RRTopNavigationBar } from './top-navigation-bar/rr-top-navigation-bar.js';
export { RRNavLogo } from './top-navigation-bar/rr-nav-logo.ts';
export { RRUtilityMenuBar } from './top-navigation-bar/rr-utility-menu-bar.js';
export { RRBackButton } from './top-navigation-bar/rr-back-button.ts';

// Auto-register happens on import of individual component files
