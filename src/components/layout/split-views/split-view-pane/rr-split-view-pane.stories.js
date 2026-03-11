import { html } from 'lit';
import './rr-split-view-pane.ts';

export default {
  title: 'Components/Layout/Split Views/Split View Pane',
  component: 'rr-split-view-pane',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
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
