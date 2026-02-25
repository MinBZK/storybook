import { html } from 'lit';
import './rr-horizontal-split-view.ts';
import './rr-split-view-pane.ts';

export default {
  title: 'Components/Layout/Split View/Horizontal Split View',
  component: 'rr-horizontal-split-view',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
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

