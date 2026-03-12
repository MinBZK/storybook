import { css } from 'lit';

export const styles = css`

  /* # Host */

  :host {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: fit-content;
	cursor: grab;
  }

  :host([hidden]) {
	display: none;
  }

  :host(:active) {
	cursor: grabbing;
  }


  /* # Control */

  .drag-handle-cell__control {
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--semantics-grab-handles-background-color);
	border-radius: 6px;
  }

  /* Size: MD (default) - 32x44 */
  :host([size="md"]) .drag-handle-cell__control,
  :host(:not([size])) .drag-handle-cell__control {
	width: 32px;
	height: 44px;
  }

  /* Size: SM - 24x32 */
  :host([size="sm"]) .drag-handle-cell__control {
	width: 24px;
	height: 32px;
  }

  .drag-handle-cell__control-grip {
	display: block;
	color: var(--semantics-grab-handles-grip-color);
  }
`;
