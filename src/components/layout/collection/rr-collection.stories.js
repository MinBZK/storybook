import { html } from 'lit';
import './rr-collection.js';

export default {
  title: 'Components/Layout/Collection',
  component: 'rr-collection',
  tags: ['autodocs'],
  parameters: {
  },
  argTypes: {
    layout: {
      control: 'select',
      options: ['grid', 'list', 'horizontal-scroll'],
      description: 'Layout mode',
    },
    title: {
      control: 'text',
      description: 'Collection title',
    },
    showLoadMore: {
      control: 'boolean',
      description: 'Show load more button',
    },
    loadMoreLabel: {
      control: 'text',
      description: 'Load more button label',
    },
  },
};

const sampleItems = Array(9)
  .fill(null)
  .map(
    (_, i) => html`
      <div
        style="padding: 24px; background: #f1f5f9; border-radius: 8px; min-height: 100px; display: flex; align-items: center; justify-content: center;"
      >
        <span>Item ${i + 1}</span>
      </div>
    `
  );

export const Default = {
  args: {
    layout: 'grid',
    title: 'Collection',
    showLoadMore: true,
    loadMoreLabel: 'Load more',
  },
  render: (args) => html`
    <rr-collection
      layout=${args.layout}
      title=${args.title}
      ?show-load-more=${args.showLoadMore}
      load-more-label=${args.loadMoreLabel}
      @load-more=${() => console.log('Load more clicked')}
    >
      ${sampleItems}
    </rr-collection>
  `,
};

export const Grid = {
  args: {
    layout: 'grid',
    title: 'Grid Collection',
    showLoadMore: true,
  },
  render: (args) => html`
    <rr-collection layout="grid" title=${args.title} ?show-load-more=${args.showLoadMore}> ${sampleItems} </rr-collection>
  `,
};

export const List = {
  args: {
    layout: 'list',
    title: 'List Collection',
    showLoadMore: true,
  },
  render: (args) => html`
    <rr-collection layout="list" title=${args.title} ?show-load-more=${args.showLoadMore}>
      ${Array(5)
        .fill(null)
        .map(
          (_, i) => html`
            <div style="padding: 16px; background: #f1f5f9; border-radius: 8px;">
              <strong>List Item ${i + 1}</strong>
              <p style="margin: 8px 0 0;">Description for list item ${i + 1}</p>
            </div>
          `
        )}
    </rr-collection>
  `,
};

export const HorizontalScroll = {
  args: {
    layout: 'horizontal-scroll',
    title: 'Horizontal Scroll Collection',
    showLoadMore: false,
  },
  render: (args) => html`
    <rr-collection layout="horizontal-scroll" title=${args.title}>
      ${Array(12)
        .fill(null)
        .map(
          (_, i) => html`
            <div
              style="width: 280px; height: 200px; background: #f1f5f9; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"
            >
              <span>Card ${i + 1}</span>
            </div>
          `
        )}
    </rr-collection>
  `,
};

export const NoTitle = {
  args: {
    layout: 'grid',
    showLoadMore: false,
  },
  render: () => html` <rr-collection layout="grid"> ${sampleItems.slice(0, 6)} </rr-collection> `,
};

export const CustomHeader = {
  render: () => html`
    <rr-collection layout="grid" show-load-more>
      <div slot="header" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
        <h2 style="margin: 0;">Custom Header</h2>
        <rr-button variant="accent-transparent" size="sm">View all</rr-button>
      </div>
      ${sampleItems.slice(0, 6)}
    </rr-collection>
  `,
};
