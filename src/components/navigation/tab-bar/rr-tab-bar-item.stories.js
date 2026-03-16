import { html } from 'lit';
import './rr-tab-bar-item.ts';

export default {
  title: 'Components/Navigation/Tab Bar Item',
  component: 'rr-tab-bar-item',
  tags: ['autodocs'],
  parameters: {
    componentSource: {
      file: 'src/components/navigation/tab-bar/rr-tab-bar-item.ts',
      repository: 'https://github.com/regelrecht/design-system',
    },
    status: { type: 'stable' },
  },
  argTypes: {
    contentType: {
      control: 'select',
      options: ['text', 'icon', 'icon-with-title'],
      description: 'Content type of the tab bar item',
      table: { defaultValue: { summary: 'text' } },
    },
    selected: {
      control: 'boolean',
      description: 'Selected state',
      table: { defaultValue: { summary: false } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: { defaultValue: { summary: false } },
    },
  },
  args: {
    contentType: 'text',
    selected: false,
    disabled: false,
  },
};

const Template = ({ contentType, selected, disabled }) => html`
  <rr-tab-bar-item content-type=${contentType} ?selected=${selected} ?disabled=${disabled}>
    Tab bar item
  </rr-tab-bar-item>
`;

export const Default = Template.bind({});

export const Selected = Template.bind({});
Selected.args = { selected: true };

export const AllContentTypes = () => html`
  <div style="display: flex; gap: 1rem; align-items: center;">
    <div>
      <h3 style="margin: 0 0 0.5rem 0; font-size: 14px; color: var(--semantics-content-color);">Text</h3>
      <rr-tab-bar-item content-type="text">Tab bar item</rr-tab-bar-item>
      <rr-tab-bar-item content-type="text" selected>Tab bar item</rr-tab-bar-item>
    </div>
    <div>
      <h3 style="margin: 0 0 0.5rem 0; font-size: 14px; color: var(--semantics-content-color);">Icon</h3>
      <rr-tab-bar-item content-type="icon">
        <svg slot="icon" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="4 2"/></svg>
      </rr-tab-bar-item>
      <rr-tab-bar-item content-type="icon" selected>
        <svg slot="icon" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="4 2"/></svg>
      </rr-tab-bar-item>
    </div>
    <div>
      <h3 style="margin: 0 0 0.5rem 0; font-size: 14px; color: var(--semantics-content-color);">Icon with title</h3>
      <rr-tab-bar-item content-type="icon-with-title">
        <svg slot="icon" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="4 2"/></svg>
        Tab bar item
      </rr-tab-bar-item>
      <rr-tab-bar-item content-type="icon-with-title" selected>
        <svg slot="icon" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="4 2"/></svg>
        Tab bar item
      </rr-tab-bar-item>
    </div>
  </div>
`;
AllContentTypes.parameters = { controls: { disable: true } };
