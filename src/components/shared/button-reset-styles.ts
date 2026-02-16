import { css } from 'lit';

/**
 * Shared button reset styles for removing default browser button styling.
 * Use in components that render native <button> elements.
 *
 * Usage:
 * ```ts
 * import { buttonResetStyles } from '../shared/button-reset-styles.ts';
 *
 * static override styles = [buttonResetStyles, css`...`];
 * ```
 */
export const buttonResetStyles = css`
  button {
    appearance: none;
    border: none;
    margin: 0;
    padding: 0;
    background: none;
    font: inherit;
    cursor: pointer;
    color: inherit;
  }
`;
