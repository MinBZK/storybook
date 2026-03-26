import { html } from 'lit';
import './rr-document-tab-bar-item.ts';

export default {
  title: 'Components/Navigation/Document Tab Bar Item',
  component: 'rr-document-tab-bar-item',
  tags: ['autodocs'],
  parameters: {
    componentSource: {
      file: 'src/components/navigation/document-tab-bar-item/rr-document-tab-bar-item.ts',
      repository: 'https://github.com/MinBZK/storybook',
    },
    status: { type: 'stable' },
  },
  argTypes: {
    selected: { control: 'boolean', table: { defaultValue: { summary: false } } },
    disabled: { control: 'boolean', table: { defaultValue: { summary: false } } },
    subtitle: { control: 'text', table: { defaultValue: { summary: '' } } },
  },
  args: { selected: false, disabled: false, subtitle: 'Subtitle' },
};

export const Default = () => html`
  <div style="width: 225px;">
    <rr-document-tab-bar-item subtitle="Subtitle">Tab bar item</rr-document-tab-bar-item>
  </div>
`;

export const Selected = () => html`
  <div style="width: 225px;">
    <rr-document-tab-bar-item selected subtitle="Subtitle">Tab bar item</rr-document-tab-bar-item>
  </div>
`;

export const AllStates = () => html`
  <div style="display: flex; flex-direction: column; gap: 1rem; width: 225px;">
    <div>
      <h3 style="margin: 0 0 0.5rem 0; font-size: 14px; color: var(--semantics-content-color);">
        Default
      </h3>
      <rr-document-tab-bar-item subtitle="Subtitle">Tab bar item</rr-document-tab-bar-item>
    </div>
    <div>
      <h3 style="margin: 0 0 0.5rem 0; font-size: 14px; color: var(--semantics-content-color);">
        Selected
      </h3>
      <rr-document-tab-bar-item selected subtitle="Subtitle">Tab bar item</rr-document-tab-bar-item>
    </div>
  </div>
`;
AllStates.parameters = { controls: { disable: true } };
