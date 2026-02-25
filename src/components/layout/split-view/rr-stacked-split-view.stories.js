import { html } from 'lit';
import './rr-stacked-split-view.ts';
import './rr-split-view-pane.ts';

export default {
  title: 'Components/Layout/Split View/Stacked Split View',
  component: 'rr-stacked-split-view',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
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

