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

// Lit + TypeScript components (continued)
export { RRRadio } from './radio/rr-radio.ts';
export { RRSwitch } from './switch/rr-switch.ts';
export { RRIconButton } from './icon-button/rr-icon-button.ts';
export { RRMenuBar } from './menu-bar/rr-menu-bar.ts';
export { RRMenuItem } from './menu-bar/rr-menu-item.ts';
export { RRUtilityMenuBar } from './top-navigation-bar/rr-utility-menu-bar.ts';

// Vanilla JS components
export { RRBox } from './box/rr-box.js';
export { RRTopNavigationBar } from './top-navigation-bar/rr-top-navigation-bar.ts';
export { RRNavLogo } from './top-navigation-bar/rr-nav-logo.ts';
export { RRBackButton } from './top-navigation-bar/rr-back-button.ts';

// Cell components
export { RRTitleCell } from './title-cell/rr-title-cell.ts';
export { RRLabelCell } from './label-cell/rr-label-cell.ts';
export { RRButtonCell } from './button-cell/rr-button-cell.ts';
export { RRCustomCell } from './custom-cell/rr-custom-cell.ts';

// List components
export { RRList } from './list/rr-list.ts';
export { RRListItem } from './list/rr-list-item.ts';

// Auto-register happens on import of individual component files
