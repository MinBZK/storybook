import { html } from 'lit';
import './rr-split-view-pane.ts';

export default {
  title: 'Components/Layout/Split View/Split View Pane',
  component: 'rr-split-view-pane',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=39-944',
    },
  },
};

export const Default = {
  render: () => html`
    <rr-split-view-pane style="height: 400px; border: 1px solid #e2e8f0;">
      <div style="padding: 16px;">
        <h2 style="margin: 0 0 8px 0;">Pane Content</h2>
        <p style="margin: 0;">This is the content inside a split view pane.</p>
      </div>
    </rr-split-view-pane>
  `,
};

export const WithPage = {
  render: () => html`
    <rr-split-view-pane style="height: 400px;">
      <rr-page header-sticky>
        <div slot="header">
          <div
            style="padding: 12px 16px; background: var(--semantics-surfaces-background-color, #fff); border-bottom: 1px solid var(--semantics-dividers-color, #d9dee4);"
          >
            <strong>Header</strong>
          </div>
        </div>
        <div style="padding: 16px;">
          ${Array(20)
            .fill(null)
            .map(
              (_, i) => html`
                <p style="margin: 8px 0;">Content paragraph ${i + 1}</p>
              `
            )}
        </div>
      </rr-page>
    </rr-split-view-pane>
  `,
};

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Split View Pane (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="39-944" style="display: inline-block;">
        <rr-split-view-pane style="width: 320px; height: 320px;">
          <div
            style="padding: 2px 8px; flex: 1; background: rgba(255, 36, 189, 0.1); border: 2px dashed #FF24BD; display: flex; align-items: center; justify-content: center;"
          >
            <span
              style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;"
              >SLOT</span
            >
          </div>
        </rr-split-view-pane>
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
