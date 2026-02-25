import { html } from 'lit';
import './rr-spacer-cell.ts';

export default {
  title: 'Components/Lists/Spacer Cell',
  component: 'rr-spacer-cell',
  tags: ['autodocs'],
  parameters: {
  },
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
        'm',
        'flexible',
      ],
      description: 'Spacer size',
    },
    container: {
      control: 'select',
      options: ['s', 'm', 'l', 'all'],
      description: 'Container size for responsive sizing',
    },
  },
};

export const Default = {
  args: {
    size: '16',
    container: 'all',
  },
  render: (args) => html`
    <div
      style="display: flex; align-items: center; background: #f0f0f0; padding: 8px;"
    >
      <span>Before</span>
      <rr-spacer-cell
        size=${args.size}
        container=${args.container}
        style="background: rgba(255, 36, 189, 0.2); outline: 1px dashed #ff24bd;"
      ></rr-spacer-cell>
      <span>After</span>
    </div>
  `,
};

export const AllSizes = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start;"
    >
      ${['8', '12', '16', '24', '32', '48'].map(
        (size) => html`
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="width: 40px; font-size: 12px;">${size}px</span>
            <div
              style="display: flex; align-items: center; background: #f0f0f0;"
            >
              <span>|</span>
              <rr-spacer-cell
                size=${size}
                style="background: rgba(255, 36, 189, 0.2);"
              ></rr-spacer-cell>
              <span>|</span>
            </div>
          </div>
        `
      )}
    </div>
  `,
};
