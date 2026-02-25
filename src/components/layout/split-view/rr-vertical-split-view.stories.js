import { html } from 'lit';
import './rr-vertical-split-view.ts';
import './rr-split-view-pane.ts';

export default {
  title: 'Components/Layout/Split View/Vertical Split View',
  component: 'rr-vertical-split-view',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
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

