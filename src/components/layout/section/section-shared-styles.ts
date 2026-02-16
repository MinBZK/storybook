import { css } from 'lit';

export const sectionSharedStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    font-family: var(--rr-font-family-body);
  }

  :host([hidden]) {
    display: none;
  }

  .section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
  }

  .section__body {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .section__main {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  /* Container: SM */
  :host([container='sm']) .section {
    padding: 16px;
  }

  :host([container='sm']) .section__body {
    gap: var(--rr-section-gap, 16px);
  }

  /* Container: MD (default) */
  :host([container='md']) .section,
  :host(:not([container])) .section {
    padding: 24px 32px;
  }

  :host([container='md']) .section__body,
  :host(:not([container])) .section__body {
    gap: var(--rr-section-gap, 24px);
  }

  /* Container: LG */
  :host([container='lg']) .section {
    padding: 32px 48px;
  }

  :host([container='lg']) .section__body {
    gap: var(--rr-section-gap, 24px);
  }
`;
