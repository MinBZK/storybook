import { html } from 'lit';
import './rr-side-by-side-split-view.ts';
import '../split-view-pane/rr-split-view-pane.ts';

export default {
  title: 'Components/Layout/Split Views/Side-by-Side Split View',
  component: 'rr-side-by-side-split-view',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = {
  render: () => html`
    <rr-side-by-side-split-view style="height: 600px;">
      <rr-split-view-pane slot="start">
        <div style="padding: 16px; height: 100%; box-sizing: border-box;">
          <strong>Start Pane</strong>
          <p>Text editor, left panel content.</p>
        </div>
      </rr-split-view-pane>

      <rr-split-view-pane slot="end">
        <div style="padding: 16px; height: 100%; box-sizing: border-box;">
          <strong>End Pane</strong>
          <p>Machine editor, right panel content.</p>
        </div>
      </rr-split-view-pane>
    </rr-side-by-side-split-view>
  `,
};

export const EditorLayout = {
  render: () => html`
    <rr-side-by-side-split-view style="height: 100vh;">
      <rr-split-view-pane slot="start">
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

      <rr-split-view-pane slot="end">
        <rr-page header-sticky>
          <div slot="header">
            <div
              style="padding: 12px 16px; background: var(--semantics-surfaces-background-color, #fff); border-bottom: 1px solid var(--semantics-dividers-color, #d9dee4);"
            >
              <strong>Machine Editor</strong>
            </div>
          </div>
          <div style="padding: 16px;">
            <pre
              style="font-family: monospace; font-size: 13px; margin: 0; white-space: pre-wrap;"
            >
IF begrip = "Onze Minister"
  THEN waarde = "Minister van VWS"
IF persoon.is_verzekerd = TRUE
  THEN ...
            </pre
            >
          </div>
        </rr-page>
      </rr-split-view-pane>
    </rr-side-by-side-split-view>
  `,
};

