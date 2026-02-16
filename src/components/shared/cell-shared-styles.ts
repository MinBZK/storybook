import { css } from 'lit';

/**
 * Shared cell alignment styles for list cell components.
 * Provides vertical-alignment (top/center) and horizontal-alignment (left/right) host selectors.
 *
 * Usage:
 * ```ts
 * import { cellSharedStyles } from '../../shared/cell-shared-styles.ts';
 *
 * static override styles = [cellSharedStyles, css`...`];
 * ```
 */
export const cellSharedStyles = css`
  :host {
    display: flex;
    flex-direction: column;
  }

  :host([hidden]) {
    display: none;
  }

  /* Vertical alignment: center (default) */
  :host([vertical-alignment='center']),
  :host(:not([vertical-alignment])) {
    justify-content: center;
  }

  /* Vertical alignment: top */
  :host([vertical-alignment='top']) {
    justify-content: flex-start;
  }

  /* Horizontal alignment: left (default) */
  :host([horizontal-alignment='left']),
  :host(:not([horizontal-alignment])) {
    align-items: flex-start;
  }

  /* Horizontal alignment: right */
  :host([horizontal-alignment='right']) {
    align-items: flex-end;
  }
`;
