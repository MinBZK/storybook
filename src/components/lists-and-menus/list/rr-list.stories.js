import { html } from 'lit';
import './rr-list.js';
import './rr-list-item.js';
import '../cells/title-cell/rr-title-cell.js';
import '../cells/label-cell/rr-label-cell.js';

export default {
  title: 'Components/Lists & Menus/List',
  component: 'rr-list',
  tags: ['autodocs'],
  parameters: {
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
