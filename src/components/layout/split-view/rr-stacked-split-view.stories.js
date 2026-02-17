import { html } from 'lit';
import './rr-stacked-split-view.ts';
import './rr-split-view-pane.ts';

export default {
  title: 'Components/Layout/Split View/Stacked Split View',
  component: 'rr-stacked-split-view',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1558-3663',
    },
  },
};

export const Default = {
  render: () => html`
    <rr-stacked-split-view style="height: 600px;">
      <rr-split-view-pane slot="top">
        <div style="padding: 16px; height: 100%; box-sizing: border-box;">
          <strong>Top Pane</strong>
          <p>Upper content area.</p>
        </div>
      </rr-split-view-pane>

      <rr-split-view-pane slot="bottom">
        <div style="padding: 16px; height: 100%; box-sizing: border-box;">
          <strong>Bottom Pane</strong>
          <p>Lower content area.</p>
        </div>
      </rr-split-view-pane>
    </rr-stacked-split-view>
  `,
};

export const FullPage = {
  render: () => html`
    <rr-stacked-split-view style="height: 100vh;">
      <rr-split-view-pane slot="top">
        <rr-page header-sticky>
          <div slot="header">
            <div
              style="padding: 12px 16px; background: var(--semantics-surfaces-background-color, #fff); border-bottom: 1px solid var(--semantics-dividers-color, #d9dee4);"
            >
              <strong>Tekst Editor</strong>
            </div>
          </div>
          <div style="padding: 16px;">
            <p>Artikel 1. Begripsbepalingen</p>
            <p>
              1. Voor de toepassing van deze wet en de daarop berustende bepalingen wordt
              verstaan onder:
            </p>
            <p>a. Onze Minister: Onze Minister van Volksgezondheid, Welzijn en Sport;</p>
            <p>b. verzekerde: degene die verzekerd is ingevolge de Zorgverzekeringswet;</p>
          </div>
        </rr-page>
      </rr-split-view-pane>

      <rr-split-view-pane slot="bottom">
        <rr-page header-sticky>
          <div slot="header">
            <div
              style="padding: 12px 16px; background: var(--semantics-surfaces-background-color, #fff); border-bottom: 1px solid var(--semantics-dividers-color, #d9dee4);"
            >
              <strong>Machine Editor</strong>
            </div>
          </div>
          <div style="padding: 16px;">
            <pre style="font-family: monospace; font-size: 13px; margin: 0; white-space: pre-wrap;">
IF begrip = "Onze Minister"
  THEN waarde = "Minister van VWS"
IF persoon.is_verzekerd = TRUE
  THEN ...
            </pre>
          </div>
        </rr-page>
      </rr-split-view-pane>
    </rr-stacked-split-view>
  `,
};

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

const slotStyle =
  'padding: 2px 8px; flex: 1; background: rgba(255, 36, 189, 0.1); border: 2px dashed #FF24BD; display: flex; align-items: center; justify-content: center;';
const slotText = html`<span
  style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;"
  >SLOT</span
>`;

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Stacked Split View (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="1558-3663" style="display: inline-block;">
        <!--
          Figma stacked-split-view (1558:3663):
          - Layout: column, justifyContent: center
          - Size: 1440x1024 fixed
          - Children: row-pane(fill) | divider(horizontal) | row-pane(fill)
          - Both panes: fill width, fill height (equal distribution)
        -->
        <rr-stacked-split-view style="width: 1440px; height: 1024px;">
          <rr-split-view-pane slot="top">
            <div style="${slotStyle}">${slotText}</div>
          </rr-split-view-pane>

          <rr-split-view-pane slot="bottom">
            <div style="${slotStyle}">${slotText}</div>
          </rr-split-view-pane>
        </rr-stacked-split-view>
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
