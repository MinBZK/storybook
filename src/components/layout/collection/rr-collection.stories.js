import { html } from 'lit';
import './rr-collection.js';

export default {
  title: 'Components/Layout/Collection',
  component: 'rr-collection',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1435-29304',
    },
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
        <rr-button variant="accent-transparent" size="s">View all</rr-button>
      </div>
      ${sampleItems.slice(0, 6)}
    </rr-collection>
  `,
};

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Collection (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="1435:29304" style="display: inline-block;">
        <!--
          Figma collection (1435:29304) component set:
          - Layout: row, gap: 16px, padding: 16px
          - Variants: layout (grid/list/horizontal-scroll)
          - Width: 2442px
        -->
        <div
          style="width: 2442px; background: #ffffff; padding: 16px; box-sizing: border-box; display: flex; flex-direction: row; gap: 16px; align-items: stretch;"
        >
          <!-- layout=grid -->
          <rr-collection layout="grid" title="Collection" show-load-more style="flex: 1;">
            ${Array(24)
              .fill(null)
              .map(
                () => html`
                  <div
                    style="padding: 2px 8px; height: 24px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; display: flex; align-items: center; justify-content: center;"
                  >
                    <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;"
                      >SLOT</span
                    >
                  </div>
                `
              )}
          </rr-collection>

          <!-- layout=list -->
          <rr-collection layout="list" title="Collection" show-load-more style="flex: 1;">
            ${Array(24)
              .fill(null)
              .map(
                () => html`
                  <div
                    style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; display: flex; align-items: center; justify-content: center;"
                  >
                    <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;"
                      >SLOT</span
                    >
                  </div>
                `
              )}
          </rr-collection>

          <!-- layout=horizontal-scroll -->
          <rr-collection layout="horizontal-scroll" title="Collection" style="flex: 1;">
            ${Array(24)
              .fill(null)
              .map(
                () => html`
                  <div
                    style="width: 280px; padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"
                  >
                    <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;"
                      >SLOT</span
                    >
                  </div>
                `
              )}
          </rr-collection>
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
