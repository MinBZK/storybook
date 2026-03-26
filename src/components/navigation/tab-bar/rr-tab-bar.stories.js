import { html } from 'lit';
import './rr-tab-bar.ts';
import './rr-tab-bar-item.ts';

export default {
  title: 'Components/Navigation/Tab Bar',
  component: 'rr-tab-bar',
  tags: ['autodocs'],
  parameters: {
    componentSource: {
      file: 'src/components/navigation/tab-bar/rr-tab-bar.ts',
      repository: 'https://github.com/MinBZK/storybook',
    },
    status: { type: 'stable' },
  },
};

export const Default = () => html`
  <rr-tab-bar>
    <rr-tab-bar-item selected>Tab bar item</rr-tab-bar-item>
    <rr-tab-bar-item>Tab bar item</rr-tab-bar-item>
    <rr-tab-bar-item>Tab bar item</rr-tab-bar-item>
  </rr-tab-bar>
`;

export const WithIcons = () => html`
  <rr-tab-bar>
    <rr-tab-bar-item content-type="icon-with-title" selected>
      <svg slot="icon" viewBox="0 0 24 24" fill="currentColor">
        <circle
          cx="12"
          cy="12"
          r="8"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          stroke-dasharray="4 2"
        />
      </svg>
      Home
    </rr-tab-bar-item>
    <rr-tab-bar-item content-type="icon-with-title">
      <svg slot="icon" viewBox="0 0 24 24" fill="currentColor">
        <circle
          cx="12"
          cy="12"
          r="8"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          stroke-dasharray="4 2"
        />
      </svg>
      Zoeken
    </rr-tab-bar-item>
    <rr-tab-bar-item content-type="icon-with-title">
      <svg slot="icon" viewBox="0 0 24 24" fill="currentColor">
        <circle
          cx="12"
          cy="12"
          r="8"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          stroke-dasharray="4 2"
        />
      </svg>
      Profiel
    </rr-tab-bar-item>
  </rr-tab-bar>
`;
WithIcons.parameters = { controls: { disable: true } };
