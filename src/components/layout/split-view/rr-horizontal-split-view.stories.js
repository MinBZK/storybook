import { html } from 'lit';
import './rr-horizontal-split-view.ts';
import './rr-split-view-pane.ts';

export default {
  title: 'Components/Layout/Split View/Horizontal Split View',
  component: 'rr-horizontal-split-view',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=39-941',
    },
  },
};

export const Default = {
  render: () => html`
    <rr-horizontal-split-view style="height: 600px;">
      <rr-split-view-pane
        slot="side"
        style="width: 280px;"
      >
        <div style="padding: 16px; background: #f8fafc; height: 100%; box-sizing: border-box;">
          <strong>Side Pane</strong>
          <p>Law list, navigation, etc.</p>
        </div>
      </rr-split-view-pane>

      <rr-split-view-pane slot="main">
        <div style="padding: 16px; height: 100%; box-sizing: border-box;">
          <strong>Main Pane</strong>
          <p>Article list, primary content area.</p>
        </div>
      </rr-split-view-pane>

      <rr-split-view-pane
        slot="inspector"
        style="width: 320px;"
      >
        <div style="padding: 16px; background: #f8fafc; height: 100%; box-sizing: border-box;">
          <strong>Inspector Pane</strong>
          <p>Article detail, properties panel.</p>
        </div>
      </rr-split-view-pane>
    </rr-horizontal-split-view>
  `,
};

export const BrowserLayout = {
  render: () => html`
    <rr-horizontal-split-view style="height: 100vh;">
      <rr-split-view-pane
        slot="side"
        style="width: 300px;"
      >
        <rr-page header-sticky>
          <div slot="header">
            <div
              style="padding: 12px 16px; background: var(--semantics-surfaces-background-color, #fff); border-bottom: 1px solid var(--semantics-dividers-color, #d9dee4);"
            >
              <strong>Wetten en regels</strong>
            </div>
          </div>
          <div style="padding: 8px;">
            ${Array(30)
              .fill(null)
              .map(
                (_, i) => html`
                  <div
                    style="padding: 12px; border-bottom: 1px solid #ebeef2; cursor: pointer;"
                  >
                    Wet ${i + 1}
                  </div>
                `
              )}
          </div>
        </rr-page>
      </rr-split-view-pane>

      <rr-split-view-pane slot="main">
        <rr-page header-sticky>
          <div slot="header">
            <div
              style="padding: 12px 16px; background: var(--semantics-surfaces-background-color, #fff); border-bottom: 1px solid var(--semantics-dividers-color, #d9dee4);"
            >
              <strong>Wet op de zorgtoeslag</strong>
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
                    Artikel ${i + 1}
                  </div>
                `
              )}
          </div>
        </rr-page>
      </rr-split-view-pane>

      <rr-split-view-pane
        slot="inspector"
        style="width: 400px;"
      >
        <rr-page header-sticky footer-sticky>
          <div slot="header">
            <div
              style="padding: 12px 16px; background: var(--semantics-surfaces-background-color, #fff); border-bottom: 1px solid var(--semantics-dividers-color, #d9dee4);"
            >
              <strong>Artikel 1</strong>
            </div>
          </div>
          <div style="padding: 16px;">
            <p>
              Voor de toepassing van deze wet en de daarop berustende bepalingen wordt verstaan
              onder...
            </p>
          </div>
          <div slot="footer">
            <div
              style="padding: 12px 16px; background: var(--semantics-surfaces-background-color, #fff); border-top: 1px solid var(--semantics-dividers-color, #d9dee4); display: flex; gap: 8px;"
            >
              <button>Opslaan</button>
              <button>Annuleren</button>
            </div>
          </div>
        </rr-page>
      </rr-split-view-pane>
    </rr-horizontal-split-view>
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
        Horizontal Split View (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="39-941" style="display: inline-block;">
        <!--
          Figma horizontal-split-view (39:941):
          - Layout: row, alignItems: center
          - Size: 1440x1024
          - Children: side(fixed) | divider(1px) | main(fill) | divider(1px) | inspector(fixed)
          - Side & inspector panes: fixed width, fill height
          - Main pane: fill width, fill height
        -->
        <rr-horizontal-split-view style="width: 1440px; height: 1024px;">
          <rr-split-view-pane slot="side" style="width: 320px;">
            <div style="${slotStyle}">${slotText}</div>
          </rr-split-view-pane>

          <rr-split-view-pane slot="main">
            <div style="${slotStyle}">${slotText}</div>
          </rr-split-view-pane>

          <rr-split-view-pane slot="inspector" style="width: 320px;">
            <div style="${slotStyle}">${slotText}</div>
          </rr-split-view-pane>
        </rr-horizontal-split-view>
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
