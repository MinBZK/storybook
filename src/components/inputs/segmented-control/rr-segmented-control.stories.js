import { html } from 'lit';
import './rr-segmented-control.ts';
import './rr-segmented-control-item.ts';

/**
 * De Segmented Control component is een horizontale groep van wederzijds exclusieve opties.
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=336-2899)
 *
 * ## Gebruik
 * ```html
 * <rr-segmented-control value="option1">
 *   <rr-segmented-control-item value="option1">Optie 1</rr-segmented-control-item>
 *   <rr-segmented-control-item value="option2">Optie 2</rr-segmented-control-item>
 *   <rr-segmented-control-item value="option3">Optie 3</rr-segmented-control-item>
 * </rr-segmented-control>
 * ```
 */
export default {
  title: 'Components/Inputs/Segmented Control',
  component: 'rr-segmented-control',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=336-2899',
    },
  },
  argTypes: {
    value: {
      control: 'select',
      options: ['option1', 'option2', 'option3'],
      description: 'Currently selected value',
    },
    size: {
      control: 'select',
      options: ['s', 'm'],
      description: 'Control size',
      table: { defaultValue: { summary: 'm' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: { defaultValue: { summary: false } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the control should take full width',
      table: { defaultValue: { summary: false } },
    },
  },
  args: {
    value: 'option1',
    size: 'm',
    disabled: false,
    fullWidth: false,
  },
};

const Template = ({ value, size, disabled, fullWidth }) => html`
  <rr-segmented-control
    value=${value}
    size=${size}
    ?disabled=${disabled}
    ?full-width=${fullWidth}
    @change=${(e) => console.log('Changed:', e.detail)}
  >
    <rr-segmented-control-item value="option1">Optie 1</rr-segmented-control-item>
    <rr-segmented-control-item value="option2">Optie 2</rr-segmented-control-item>
    <rr-segmented-control-item value="option3">Optie 3</rr-segmented-control-item>
  </rr-segmented-control>
`;

export const Default = Template.bind({});
Default.args = {};

export const Small = Template.bind({});
Small.args = { size: 's' };

export const Medium = Template.bind({});
Medium.args = { size: 'm' };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };

export const FullWidth = Template.bind({});
FullWidth.args = { fullWidth: true };
FullWidth.decorators = [
  (Story) => html`<div style="width: 400px;">${Story()}</div>`,
];

// All sizes comparison
export const AllSizes = () => html`
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <span style="font-size: 14px; color: #64748b;">Small</span>
      <rr-segmented-control size="s" value="option1">
        <rr-segmented-control-item value="option1">Optie 1</rr-segmented-control-item>
        <rr-segmented-control-item value="option2">Optie 2</rr-segmented-control-item>
        <rr-segmented-control-item value="option3">Optie 3</rr-segmented-control-item>
      </rr-segmented-control>
    </div>
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <span style="font-size: 14px; color: #64748b;">Medium</span>
      <rr-segmented-control size="m" value="option1">
        <rr-segmented-control-item value="option1">Optie 1</rr-segmented-control-item>
        <rr-segmented-control-item value="option2">Optie 2</rr-segmented-control-item>
        <rr-segmented-control-item value="option3">Optie 3</rr-segmented-control-item>
      </rr-segmented-control>
    </div>
  </div>
`;
AllSizes.parameters = { controls: { disable: true } };

// Two items
export const TwoItems = () => html`
  <rr-segmented-control value="yes">
    <rr-segmented-control-item value="yes">Ja</rr-segmented-control-item>
    <rr-segmented-control-item value="no">Nee</rr-segmented-control-item>
  </rr-segmented-control>
`;
TwoItems.parameters = { controls: { disable: true } };

// View mode example
export const ViewModeExample = () => html`
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <rr-segmented-control value="list" @change=${(e) => console.log('View:', e.detail.value)}>
      <rr-segmented-control-item value="list">Lijst</rr-segmented-control-item>
      <rr-segmented-control-item value="grid">Raster</rr-segmented-control-item>
      <rr-segmented-control-item value="table">Tabel</rr-segmented-control-item>
    </rr-segmented-control>
    <p style="font-size: 14px; color: #64748b; margin: 0;">
      Klik op een optie om de weergave te wijzigen (check console)
    </p>
  </div>
`;
ViewModeExample.parameters = { controls: { disable: true } };

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Our segmented control (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="336:2899" style="display: inline-block;">
        <!--
          Figma segmented-control (336:2899) component set:
          - Layout: column, gap: 16px, padding: 16px
          - Variants: md text, sm text, md icons, sm icons
          - Width: 349px (fills for text variants)
        -->
        <div
          style="display: flex; flex-direction: column; gap: 16px; padding: 16px; background: #ffffff; width: 349px; box-sizing: border-box; align-items: flex-start;"
        >
          <!-- md text (full-width, no selection - Figma shows all items unselected) -->
          <rr-segmented-control size="m" full-width style="width: 100%;">
            <rr-segmented-control-item value="option1">Item</rr-segmented-control-item>
            <rr-segmented-control-item value="option2">Item</rr-segmented-control-item>
            <rr-segmented-control-item value="option3">Item</rr-segmented-control-item>
          </rr-segmented-control>
          <!-- sm text (full-width, no selection) -->
          <rr-segmented-control size="s" full-width style="width: 100%;">
            <rr-segmented-control-item value="option1">Item</rr-segmented-control-item>
            <rr-segmented-control-item value="option2">Item</rr-segmented-control-item>
            <rr-segmented-control-item value="option3">Item</rr-segmented-control-item>
          </rr-segmented-control>
          <!-- md icons (hug content, no selection) -->
          <rr-segmented-control size="m">
            <rr-segmented-control-item value="option1" content-type="icon">
              <svg slot="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4 2">
                <circle cx="12" cy="12" r="9"/>
              </svg>
            </rr-segmented-control-item>
            <rr-segmented-control-item value="option2" content-type="icon">
              <svg slot="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4 2">
                <circle cx="12" cy="12" r="9"/>
              </svg>
            </rr-segmented-control-item>
            <rr-segmented-control-item value="option3" content-type="icon">
              <svg slot="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4 2">
                <circle cx="12" cy="12" r="9"/>
              </svg>
            </rr-segmented-control-item>
          </rr-segmented-control>
          <!-- sm icons (hug content, no selection) -->
          <rr-segmented-control size="s">
            <rr-segmented-control-item value="option1" content-type="icon">
              <svg slot="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4 2">
                <circle cx="12" cy="12" r="9"/>
              </svg>
            </rr-segmented-control-item>
            <rr-segmented-control-item value="option2" content-type="icon">
              <svg slot="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4 2">
                <circle cx="12" cy="12" r="9"/>
              </svg>
            </rr-segmented-control-item>
            <rr-segmented-control-item value="option3" content-type="icon">
              <svg slot="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4 2">
                <circle cx="12" cy="12" r="9"/>
              </svg>
            </rr-segmented-control-item>
          </rr-segmented-control>
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
