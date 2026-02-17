import { html } from 'lit';
import './rr-app-shell.ts';

export default {
  title: 'Layout/App Shell',
  component: 'rr-app-shell',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = () => html`
  <rr-app-shell>
    <div slot="header" style="padding: 16px; background: var(--primitives-color-neutral-100); border-bottom: 1px solid var(--primitives-color-neutral-200);">
      Header slot
    </div>
    <div style="padding: 24px;">
      <h2 style="margin: 0 0 16px;">Main content</h2>
      <p>This content is scrollable when it overflows the viewport.</p>
      ${Array.from({ length: 20 }, (_, i) => html`<p>Content line ${i + 1}</p>`)}
    </div>
    <div slot="footer" style="padding: 16px; background: var(--primitives-color-neutral-100); border-top: 1px solid var(--primitives-color-neutral-200);">
      Footer slot
    </div>
  </rr-app-shell>
`;

export const HeaderOnly = () => html`
  <rr-app-shell>
    <div slot="header" style="padding: 16px; background: var(--primitives-color-neutral-100); border-bottom: 1px solid var(--primitives-color-neutral-200);">
      Header only — no footer
    </div>
    <div style="padding: 24px;">
      <p>Main content area fills the remaining space.</p>
    </div>
  </rr-app-shell>
`;
