import { html } from 'lit';
import './rr-vertical-split-view.ts';
import './rr-split-view-pane.ts';

export default {
  title: 'Components/Layout/Split View/Vertical Split View',
  component: 'rr-vertical-split-view',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=42-1054',
    },
  },
};

export const Default = {
  render: () => html`
    <rr-vertical-split-view style="height: 600px;">
      <rr-split-view-pane
        slot="top"
        style="height: 120px;"
      >
        <div style="padding: 16px; background: #f8fafc; height: 100%; box-sizing: border-box;">
          <strong>Top Pane</strong>
          <p>Toolbar, header, navigation.</p>
        </div>
      </rr-split-view-pane>

      <rr-split-view-pane slot="main">
        <div style="padding: 16px; height: 100%; box-sizing: border-box;">
          <strong>Main Pane</strong>
          <p>Primary content area.</p>
        </div>
      </rr-split-view-pane>

      <rr-split-view-pane
        slot="bottom"
        style="height: 150px;"
      >
        <div style="padding: 16px; background: #f8fafc; height: 100%; box-sizing: border-box;">
          <strong>Bottom Pane</strong>
          <p>Footer, status bar, output panel.</p>
        </div>
      </rr-split-view-pane>
    </rr-vertical-split-view>
  `,
};

export const FullPage = {
  render: () => html`
    <rr-vertical-split-view style="height: 100vh;">
      <rr-split-view-pane
        slot="top"
        style="height: 200px;"
      >
        <rr-page header-sticky>
          <div slot="header">
            <div
              style="padding: 12px 16px; background: var(--semantics-surfaces-background-color, #fff); border-bottom: 1px solid var(--semantics-dividers-color, #d9dee4);"
            >
              <strong>Voorvertoning</strong>
            </div>
          </div>
          <div style="padding: 16px;">
            <p>Preview of the current document or selection.</p>
          </div>
        </rr-page>
      </rr-split-view-pane>

      <rr-split-view-pane slot="main">
        <rr-page header-sticky>
          <div slot="header">
            <div
              style="padding: 12px 16px; background: var(--semantics-surfaces-background-color, #fff); border-bottom: 1px solid var(--semantics-dividers-color, #d9dee4);"
            >
              <strong>Editor</strong>
            </div>
          </div>
          <div style="padding: 16px;">
            ${Array(20)
              .fill(null)
              .map(
                (_, i) => html`
                  <div
                    style="padding: 16px; margin-bottom: 8px; background: #f8fafc; border-radius: 8px;"
                  >
                    Regel ${i + 1}
                  </div>
                `
              )}
          </div>
        </rr-page>
      </rr-split-view-pane>

      <rr-split-view-pane
        slot="bottom"
        style="height: 200px;"
      >
        <rr-page header-sticky>
          <div slot="header">
            <div
              style="padding: 12px 16px; background: var(--semantics-surfaces-background-color, #fff); border-bottom: 1px solid var(--semantics-dividers-color, #d9dee4);"
            >
              <strong>Uitvoer</strong>
            </div>
          </div>
          <div style="padding: 16px;">
            <pre style="font-family: monospace; font-size: 13px; margin: 0; white-space: pre-wrap;">
[INFO] Document geladen
[INFO] Validatie geslaagd
[WARN] Ongebruikte variabele op regel 12
            </pre>
          </div>
        </rr-page>
      </rr-split-view-pane>
    </rr-vertical-split-view>
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
        Vertical Split View (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="42-1054" style="display: inline-block;">
        <!--
          Figma vertical-split-view (42:1054):
          - Layout: column, justifyContent: center
          - Size: 1440px wide, hug height
          - Children: header-pane(hug) | divider(horizontal) | main-pane(974px fixed) | divider(horizontal) | footer-pane(hug)
        -->
        <rr-vertical-split-view style="width: 1440px; height: 1024px;">
          <rr-split-view-pane slot="top">
            <div style="${slotStyle}">${slotText}</div>
          </rr-split-view-pane>

          <rr-split-view-pane slot="main">
            <div style="${slotStyle}">${slotText}</div>
          </rr-split-view-pane>

          <rr-split-view-pane slot="bottom">
            <div style="${slotStyle}">${slotText}</div>
          </rr-split-view-pane>
        </rr-vertical-split-view>
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
