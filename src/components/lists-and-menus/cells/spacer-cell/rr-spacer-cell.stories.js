import { html } from 'lit';
import './rr-spacer-cell.ts';

export default {
  title: 'Components/Lists & Menus/Cells/Spacer Cell',
  component: 'rr-spacer-cell',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: [
        '2',
        '4',
        '6',
        '8',
        '10',
        '12',
        '16',
        '20',
        '24',
        '28',
        '32',
        '40',
        '44',
        '48',
        '56',
        '64',
        '80',
        '96',
        'flexible',
      ],
      description: 'Spacer size in pixels, or "flexible" to fill remaining space',
    },
  },
};

const debugStyle = 'background: rgba(255, 36, 189, 0.2); outline: 1px dashed #ff24bd;';
const containerStyle = 'display: flex; align-items: center; background: #f0f0f0; padding: 8px;';

export const Default = {
  args: { size: '16' },
  render: (args) => html`
    <div style=${containerStyle}>
      <span>Voor</span>
      <rr-spacer-cell size=${args.size} style=${debugStyle}></rr-spacer-cell>
      <span>Na</span>
    </div>
  `,
};

export const Flexible = {
  render: () => html`
    <div style="${containerStyle} width: 400px;">
      <span>Links</span>
      <rr-spacer-cell size="flexible" style=${debugStyle}></rr-spacer-cell>
      <span>Rechts</span>
    </div>
  `,
};

export const AllFixedSizes = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start;">
      ${[
        '2',
        '4',
        '6',
        '8',
        '10',
        '12',
        '16',
        '20',
        '24',
        '28',
        '32',
        '40',
        '44',
        '48',
        '56',
        '64',
        '80',
        '96',
      ].map(
        (size) => html`
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="width: 40px; font-size: 12px; color: var(--semantics-content-color);"
              >${size}px</span
            >
            <div style=${containerStyle}>
              <span>|</span>
              <rr-spacer-cell size=${size} style=${debugStyle}></rr-spacer-cell>
              <span>|</span>
            </div>
          </div>
        `
      )}
    </div>
  `,
};
