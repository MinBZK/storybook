import { html } from 'lit';
import './rr-document-tab-bar-item.ts';

export default {
  title: 'Components/Navigation/Document Tab Bar Item',
  component: 'rr-document-tab-bar-item',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=38-784',
    },
    componentSource: {
      file: 'src/components/navigation/document-tab-bar-item/rr-document-tab-bar-item.ts',
      repository: 'https://github.com/regelrecht/design-system',
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
      <h3 style="margin: 0 0 0.5rem 0; font-size: 14px; color: #64748b;">Default</h3>
      <rr-document-tab-bar-item subtitle="Subtitle">Tab bar item</rr-document-tab-bar-item>
    </div>
    <div>
      <h3 style="margin: 0 0 0.5rem 0; font-size: 14px; color: #64748b;">Selected</h3>
      <rr-document-tab-bar-item selected subtitle="Subtitle">Tab bar item</rr-document-tab-bar-item>
    </div>
  </div>
`;
AllStates.parameters = { controls: { disable: true } };

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Document tab bar items (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="38:784" style="display: inline-block;">
        <div style="display: flex; flex-direction: column; gap: 16px; padding: 16px; width: 225px;">
          <rr-document-tab-bar-item subtitle="Subtitle">Tab bar item</rr-document-tab-bar-item>
          <rr-document-tab-bar-item subtitle="Subtitle">Tab bar item</rr-document-tab-bar-item>
          <rr-document-tab-bar-item selected subtitle="Subtitle">Tab bar item</rr-document-tab-bar-item>
        </div>
      </ftl-holster>
      <p style="font-size: 0.75rem; color: #64748b; margin-top: 0.5rem;">
        Keyboard: T (toggle) | O (overlay) | S (side-by-side)
      </p>
    </div>
  </ftl-belt>
`;
FigmaComparison.storyName = '🎨 Figma Comparison';
FigmaComparison.tags = ['!autodocs', 'figma'];
FigmaComparison.parameters = { controls: { disable: true } };
