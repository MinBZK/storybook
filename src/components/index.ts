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
export { RRSplitButton } from './actions/split-button/rr-split-button.ts';

// Content components
export { RRIcon } from './content/icon/rr-icon.ts';
export { RRRichText } from './content/rich-text/rr-rich-text.ts';

// Control Group components
export { RRButtonGroup } from './control-groups/button-group/rr-button-group.ts';
export { RRButtonBar } from './control-groups/button-bar/rr-button-bar.ts';
export { RRToolbar } from './control-groups/toolbar/rr-toolbar.ts';

// Forms components
export { RRFormField } from './forms/form-field/rr-form-field.ts';

// Input components
export { RRStepper } from './inputs/stepper/rr-stepper.ts';
export { RRToken } from './inputs/token/rr-token.ts';
export { RRSegmentedControl } from './inputs/segmented-control/rr-segmented-control.ts';
export { RRToggleButton } from './inputs/toggle-button/rr-toggle-button.ts';
export { RRCheckbox } from './inputs/checkbox/rr-checkbox.ts';
export { RRTextField } from './inputs/text-field/rr-text-field.ts';
export { RRPasswordField } from './inputs/password-field/rr-password-field.ts';
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

// Layout components
export { RRSpacer } from './layout/spacer/rr-spacer.ts';
export { RRDivider } from './layout/divider/rr-divider.ts';
export { RRPageStickyAreaBackground } from './layout/page/page-sticky-area-background/rr-page-sticky-area-background.ts';
export { RRBox } from './layout/box/rr-box.ts';
export { RRPage } from './layout/page/rr-page.ts';
export { RRTitleBarTitleGroup } from './layout/title-bar-title-group/rr-title-bar-title-group.ts';
export { RRTopTitleBar } from './layout/top-title-bar/rr-top-title-bar.ts';
export { RRSimpleSection } from './layout/page-sections/rr-simple-section.ts';
export { RRFullBleedSection } from './layout/page-sections/rr-full-bleed-section.ts';
export { RROneThirdTwoThirdsSection } from './layout/page-sections/rr-one-third-two-thirds-section.ts';
export { RRTwoThirdsOneThirdSection } from './layout/page-sections/rr-two-thirds-one-third-section.ts';
export { RROneHalfOneHalfSection } from './layout/page-sections/rr-one-half-one-half-section.ts';
export { RRListerSection } from './layout/page-sections/rr-lister-section.ts';
export { RRCollection } from './layout/collection/rr-collection.ts';
export { RRHorizontalSplitView } from './layout/split-view/rr-horizontal-split-view.ts';
export { RRSideBySideSplitView } from './layout/split-view/rr-side-by-side-split-view.ts';
export { RRVerticalSplitView } from './layout/split-view/rr-vertical-split-view.ts';
export { RRStackedSplitView } from './layout/split-view/rr-stacked-split-view.ts';

// List and Menu components
export { RRMenu } from './lists-and-menus/menu/rr-menu.ts';
export { RRList } from './lists-and-menus/list/rr-list.ts';

// Navigation components
export { RRTopNavigationBar } from './navigation/top-navigation-bar/rr-top-navigation-bar.ts';
export { RRMenuBar } from './navigation/menu-bar/rr-menu-bar.ts';
export { RRTabBar } from './navigation/tab-bar/rr-tab-bar.ts';
export { RRDocumentTabBar } from './navigation/document-tab-bar/rr-document-tab-bar.ts';
export { RRPagination } from './navigation/pagination/rr-pagination.ts';

// Overlay components
export { RRTooltip } from './overlays/tooltip/rr-tooltip.ts';
export { RRDialog } from './overlays/dialog/rr-dialog.ts';

// Auto-register happens on import of individual component files
