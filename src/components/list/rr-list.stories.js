import { html } from 'lit';
import './rr-list.js';
import './rr-list-item.js';
import '../title-cell/rr-title-cell.js';
import '../label-cell/rr-label-cell.js';

export default {
  title: 'Components/List',
  component: 'rr-list',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1044-2275',
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['simple', 'box', 'box-on-tint'],
      description: 'Visual style of the list',
    },
  },
};

export const Default = {
  args: {
    variant: 'simple',
  },
  render: (args) => html`
    <rr-list variant=${args.variant} style="width: 300px;">
      <rr-list-item>
        <rr-title-cell>Item 1</rr-title-cell>
      </rr-list-item>
      <rr-list-item>
        <rr-title-cell>Item 2</rr-title-cell>
      </rr-list-item>
      <rr-list-item>
        <rr-title-cell>Item 3</rr-title-cell>
      </rr-list-item>
    </rr-list>
  `,
};

export const VariantSimple = {
  render: () => html`
    <rr-list variant="simple" style="width: 300px;">
      <rr-list-item>
        <rr-title-cell>Simple list item 1</rr-title-cell>
      </rr-list-item>
      <rr-list-item>
        <rr-title-cell>Simple list item 2</rr-title-cell>
      </rr-list-item>
      <rr-list-item>
        <rr-title-cell>Simple list item 3</rr-title-cell>
      </rr-list-item>
    </rr-list>
  `,
};

export const VariantBox = {
  render: () => html`
    <rr-list variant="box" style="width: 300px;">
      <rr-list-item>
        <rr-title-cell>Box list item 1</rr-title-cell>
      </rr-list-item>
      <rr-list-item>
        <rr-title-cell>Box list item 2</rr-title-cell>
      </rr-list-item>
      <rr-list-item>
        <rr-title-cell>Box list item 3</rr-title-cell>
      </rr-list-item>
    </rr-list>
  `,
};

export const VariantBoxOnTint = {
  render: () => html`
    <div style="background: #f1f5f9; padding: 24px;">
      <rr-list variant="box-on-tint" style="width: 300px;">
        <rr-list-item>
          <rr-title-cell>Box-on-tint item 1</rr-title-cell>
        </rr-list-item>
        <rr-list-item>
          <rr-title-cell>Box-on-tint item 2</rr-title-cell>
        </rr-list-item>
        <rr-list-item>
          <rr-title-cell>Box-on-tint item 3</rr-title-cell>
        </rr-list-item>
      </rr-list>
    </div>
  `,
};

export const WithSelection = {
  render: () => html`
    <rr-list variant="simple" style="width: 300px;">
      <rr-list-item>
        <rr-title-cell>Not selected</rr-title-cell>
      </rr-list-item>
      <rr-list-item selected>
        <rr-title-cell color="white">Selected item</rr-title-cell>
      </rr-list-item>
      <rr-list-item>
        <rr-title-cell>Not selected</rr-title-cell>
      </rr-list-item>
    </rr-list>
  `,
};

export const SizeSmall = {
  render: () => html`
    <rr-list variant="simple" style="width: 300px;">
      <rr-list-item size="sm">
        <rr-title-cell size="sm">Small item 1</rr-title-cell>
      </rr-list-item>
      <rr-list-item size="sm">
        <rr-title-cell size="sm">Small item 2</rr-title-cell>
      </rr-list-item>
      <rr-list-item size="sm">
        <rr-title-cell size="sm">Small item 3</rr-title-cell>
      </rr-list-item>
    </rr-list>
  `,
};

export const WithTitleAndLabel = {
  render: () => html`
    <rr-list variant="box" style="width: 300px;">
      <rr-list-item>
        <div style="display: flex; flex-direction: column; gap: 4px; width: 100%;">
          <rr-title-cell>Primary title</rr-title-cell>
          <rr-label-cell>Secondary label text</rr-label-cell>
        </div>
      </rr-list-item>
      <rr-list-item>
        <div style="display: flex; flex-direction: column; gap: 4px; width: 100%;">
          <rr-title-cell>Another title</rr-title-cell>
          <rr-label-cell>More description here</rr-label-cell>
        </div>
      </rr-list-item>
    </rr-list>
  `,
};

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Individual variant comparisons (Code vs Figma). Use Toggle/Overlay/Side-by-Side to compare.
      </p>

      <!-- style=simple -->
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span style="font-size: 0.75rem; color: #64748b;">style: simple</span>
        <ftl-holster node="1044:2273" style="display: inline-block;">
          <rr-list variant="simple">
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; box-sizing: border-box;">
              <span style="color: #FF24BD; font-weight: 700; font-size: 18px; line-height: 1.125; text-align: center; width: 100%;">SLOT</span>
            </div>
          </rr-list>
        </ftl-holster>
      </div>

      <!-- style=box -->
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span style="font-size: 0.75rem; color: #64748b;">style: box</span>
        <ftl-holster node="1044:2276" style="display: inline-block;">
          <rr-list variant="box">
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; box-sizing: border-box;">
              <span style="color: #FF24BD; font-weight: 700; font-size: 18px; line-height: 1.125; text-align: center; width: 100%;">SLOT</span>
            </div>
          </rr-list>
        </ftl-holster>
      </div>

      <!-- style=box-on-tint -->
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span style="font-size: 0.75rem; color: #64748b;">style: box-on-tint</span>
        <ftl-holster node="1045:2284" style="display: inline-block;">
          <rr-list variant="box-on-tint">
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; box-sizing: border-box;">
              <span style="color: #FF24BD; font-weight: 700; font-size: 18px; line-height: 1.125; text-align: center; width: 100%;">SLOT</span>
            </div>
          </rr-list>
        </ftl-holster>
      </div>

      <p style="font-size: 0.75rem; color: #64748b; margin-top: 0.5rem;">
        Keyboard: T (toggle) | O (overlay) | S (side-by-side)
      </p>
    </div>
  </ftl-belt>
`;
FigmaComparison.storyName = '🎨 Figma Comparison';
FigmaComparison.tags = ['!autodocs', 'figma'];
FigmaComparison.parameters = { controls: { disable: true } };
