/**
 * RegelRecht Design System Components
 *
 * Import this file to register all components:
 * import '@regelrecht/design-system';
 *
 * Or import individual components:
 * import '@regelrecht/design-system/components/actions/button';
 */

// Base component (vanilla JS)
export { RRBaseComponent } from './base/base-component.js';

// Action components
export { RRButton } from './actions/button/rr-button.ts';
export { RRIconButton } from './actions/icon-button/rr-icon-button.ts';

// Input components
export { RRStepper } from './inputs/stepper/rr-stepper.ts';
export { RRToken } from './inputs/token/rr-token.ts';
export { RRSegmentedControl } from './inputs/segmented-control/rr-segmented-control.ts';
export { RRSegmentedControlItem } from './inputs/segmented-control/rr-segmented-control-item.ts';
export { RRToggleButton } from './inputs/toggle-button/rr-toggle-button.ts';
export { RRCheckbox } from './inputs/checkbox/rr-checkbox.ts';
export { RRTextField } from './inputs/text-field/rr-text-field.ts';
export { RRNumberField } from './inputs/number-field/rr-number-field.ts';
export { RRSearchField } from './inputs/search-field/rr-search-field.ts';
export { RRDropDownField } from './inputs/drop-down-field/rr-drop-down-field.ts';
export { RRComboBoxField } from './inputs/combo-box-field/rr-combo-box-field.ts';
export { RRCheckboxField } from './inputs/checkbox-field/rr-checkbox-field.ts';
export { RRRadioButtonField } from './inputs/radio-button-field/rr-radio-button-field.ts';
export { RRSwitchField } from './inputs/switch-field/rr-switch-field.ts';
export { RRInputFieldButton } from './inputs/input-field-button/rr-input-field-button.ts';
export { RRRadio } from './inputs/radio/rr-radio.ts';
export { RRSwitch } from './inputs/switch/rr-switch.ts';

// Control group components
export { RRFormField } from './control-groups/form-field/rr-form-field.ts';

// Layout components
export { RRSpacer } from './layout/spacer/rr-spacer.ts';
export { RRDivider } from './layout/divider/rr-divider.ts';
export { RRPageStickyAreaBackground } from './layout/page/page-sticky-area-background/rr-page-sticky-area-background.ts';
export { RRBox } from './layout/box/rr-box.js';
export { RRPage } from './page/rr-page.ts';
export { RRTitleBarTitleGroup } from './title-bar-title-group/rr-title-bar-title-group.ts';
export { RRTopTitleBar } from './top-title-bar/rr-top-title-bar.ts';
export { RRSection } from './section/rr-section.ts';
export { RRCollection } from './collection/rr-collection.ts';

// Navigation components
export { RRTopNavigationBar } from './navigation/top-navigation-bar/rr-top-navigation-bar.ts';
export { RRNavLogo } from './navigation/top-navigation-bar/rr-nav-logo.ts';
export { RRBackButton } from './navigation/top-navigation-bar/rr-back-button.ts';
export { RRMenuBar } from './navigation/menu-bar/rr-menu-bar.ts';
export { RRMenuItem } from './navigation/menu-bar/rr-menu-item.ts';
export { RRUtilityMenuBar } from './navigation/top-navigation-bar/rr-utility-menu-bar.ts';

// List components
export { RRList } from './lists/list/rr-list.ts';
export { RRListItem } from './lists/list/rr-list-item.ts';
export { RRTitleCell } from './lists/title-cell/rr-title-cell.ts';
export { RRLabelCell } from './lists/label-cell/rr-label-cell.ts';
export { RRButtonCell } from './lists/button-cell/rr-button-cell.ts';
export { RRCustomCell } from './lists/custom-cell/rr-custom-cell.ts';
export { RRSpacerCell } from './lists/spacer-cell/rr-spacer-cell.ts';
export { RRTextFieldCell } from './lists/text-field-cell/rr-text-field-cell.ts';
export { RRDropDownFieldCell } from './lists/drop-down-field-cell/rr-drop-down-field-cell.ts';

// Auto-register happens on import of individual component files
