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
        Our lists (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="1044:2275" style="display: inline-block;">
        <!--
          Figma list (1044:2275) component set:
          - Layout: column, gap: 16px, padding: 16px
          - Fixed width: 272px
          - Shows: selected item, box variant, box-on-tint variant
        -->
        <div style="width: 272px; background: #ffffff; padding: 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px;">
          <!-- selected item (matches Figma first row) -->
          <rr-list variant="simple">
            <rr-list-item selected>
              <div style="background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; padding: 2px 8px; text-align: center; color: #FF24BD; font-weight: 700; font-size: 18px; line-height: 1.125; width: 100%; box-sizing: border-box;">SLOT</div>
            </rr-list-item>
          </rr-list>

          <!-- box variant -->
          <rr-list variant="box">
            <rr-list-item>
              <div style="background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; padding: 2px 8px; text-align: center; color: #FF24BD; font-weight: 700; font-size: 18px; line-height: 1.125; width: 100%; box-sizing: border-box;">SLOT</div>
            </rr-list-item>
          </rr-list>

          <!-- box-on-tint variant -->
          <rr-list variant="box-on-tint">
            <rr-list-item>
              <div style="background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; padding: 2px 8px; text-align: center; color: #FF24BD; font-weight: 700; font-size: 18px; line-height: 1.125; width: 100%; box-sizing: border-box;">SLOT</div>
            </rr-list-item>
          </rr-list>
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
