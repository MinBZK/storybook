import { css } from 'lit';

/**
 * Shared field wrapper styles for checkbox-field, radio-button-field, and switch-field.
 * Provides common host styling, disabled opacity, and high-contrast mode support.
 *
 * Usage:
 * ```ts
 * import { fieldSharedStyles } from '../../shared/field-shared-styles.ts';
 *
 * static override styles = [fieldSharedStyles, css`...`];
 * ```
 */
export const fieldSharedStyles = css`
  :host {
    display: block;
    font-family: var(--rr-font-family-body);
  }

  :host([hidden]) {
    display: none;
  }

  /* Accessibility: High Contrast Mode */
  @media (forced-colors: active) {
    :host([disabled]) .field__label {
      opacity: 0.5 !important;
    }
  }
`;
