import { html } from 'lit';
import './rr-document-tab-bar.ts';
import '../document-tab-bar-item/rr-document-tab-bar-item.ts';
import '../../actions/icon-button/rr-icon-button.ts';

const moreIcon = html`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="4" cy="10" r="1.5"/><circle cx="10" cy="10" r="1.5"/><circle cx="16" cy="10" r="1.5"/></svg>`;
const plusIcon = html`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 4v12M4 10h12"/></svg>`;

export default {
  title: 'Components/Navigation/Document Tab Bar',
  component: 'rr-document-tab-bar',
  tags: ['autodocs'],
};

export const Default = () => html`
  <rr-document-tab-bar>
    <rr-document-tab-bar-item selected subtitle="Wet op de Zorgtoeslag">Artikel 2</rr-document-tab-bar-item>
    <rr-document-tab-bar-item subtitle="Zorgverzekeringswet">Artikel 1</rr-document-tab-bar-item>
    <rr-document-tab-bar-item subtitle="Zorgverzekeringswet">Artikel 68b</rr-document-tab-bar-item>
    <rr-icon-button slot="end" variant="neutral-tinted" size="md" label="Meer">${moreIcon}</rr-icon-button>
    <rr-icon-button slot="end" variant="neutral-tinted" size="md" label="Nieuw">${plusIcon}</rr-icon-button>
  </rr-document-tab-bar>
`;

export const ManyTabs = () => html`
  <rr-document-tab-bar>
    <rr-document-tab-bar-item selected subtitle="Wet op de Zorgtoeslag">Artikel 2</rr-document-tab-bar-item>
    <rr-document-tab-bar-item subtitle="Zorgverzekeringswet">Artikel 1</rr-document-tab-bar-item>
    <rr-document-tab-bar-item subtitle="Zorgverzekeringswet">Artikel 68b</rr-document-tab-bar-item>
    <rr-document-tab-bar-item subtitle="Zorgverzekeringswet">Artikel 69</rr-document-tab-bar-item>
    <rr-document-tab-bar-item subtitle="Zorgverzekeringswet">Artikel 24</rr-document-tab-bar-item>
    <rr-document-tab-bar-item subtitle="WML">Artikel 8</rr-document-tab-bar-item>
    <rr-icon-button slot="end" variant="neutral-tinted" size="md" label="Meer">${moreIcon}</rr-icon-button>
  </rr-document-tab-bar>
`;

// -- Figma Comparison --

const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3 style="margin: 0 0 8px;">Document Tab Bar</h3>
        <ftl-holster node="39-857" style="display: inline-block;">
          <rr-document-tab-bar>
            <rr-document-tab-bar-item selected subtitle="Wet op de Zorgtoeslag">Artikel 2</rr-document-tab-bar-item>
            <rr-document-tab-bar-item subtitle="Zorgverzekeringswet">Artikel 1</rr-document-tab-bar-item>
            <rr-document-tab-bar-item subtitle="Zorgverzekeringswet">Artikel 68b</rr-document-tab-bar-item>
            <rr-document-tab-bar-item subtitle="Zorgverzekeringswet">Artikel 69</rr-document-tab-bar-item>
            <rr-document-tab-bar-item subtitle="Zorgverzekeringswet">Artikel 24</rr-document-tab-bar-item>
            <rr-document-tab-bar-item subtitle="WML">Artikel 8</rr-document-tab-bar-item>
            <rr-icon-button slot="end" variant="neutral-tinted" size="md" label="Meer">${moreIcon}</rr-icon-button>
          </rr-document-tab-bar>
        </ftl-holster>
      </div>

      <p style="font-size: 0.75rem; color: #64748b; margin-top: 0.5rem;">
        Keyboard: T (toggle) | O (overlay) | S (side-by-side)
      </p>
    </div>
  </ftl-belt>
`;
FigmaComparison.storyName = 'Figma Comparison';
FigmaComparison.tags = ['!autodocs', 'figma'];
FigmaComparison.parameters = { controls: { disable: true } };
