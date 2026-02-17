import { html } from 'lit';
import { FIGMA_TOKEN, DESIGN_FILE_ID } from '../figma-config.ts';

// Component imports
import '../../components/layout/page/rr-page.ts';
import '../../components/layout/spacer/rr-spacer.ts';
import '../../components/layout/divider/rr-divider.js';
import '../../components/control-groups/toolbar/rr-toolbar.ts';
import '../../components/navigation/tab-bar/rr-tab-bar.ts';
import '../../components/navigation/tab-bar/rr-tab-bar-item.ts';
import '../../components/navigation/document-tab-bar/rr-document-tab-bar.ts';
import '../../components/navigation/document-tab-bar-item/rr-document-tab-bar-item.ts';
import '../../components/layout/app-shell/rr-app-shell.ts';
import '../../components/actions/button/rr-button.ts';
import '../../components/actions/icon-button/rr-icon-button.ts';
import '../../components/inputs/search-field/rr-search-field.ts';

// -- Icons ----------------------------------------------------------

const personIcon = html`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="7" r="3"/><path d="M4 17c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg>`;
const moreIcon = html`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="4" cy="10" r="1.5"/><circle cx="10" cy="10" r="1.5"/><circle cx="16" cy="10" r="1.5"/></svg>`;

// -- Tab bar fragment -----------------------------------------------

const editorTabBar = () => html`
  <rr-tab-bar>
    <rr-tab-bar-item selected>Bibliotheek</rr-tab-bar-item>
    <rr-tab-bar-item>Editor</rr-tab-bar-item>
  </rr-tab-bar>
`;

// -- Document tabs --------------------------------------------------

const documentTabs = () => html`
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

// -------------------------------------------------------------------
// Story meta
// -------------------------------------------------------------------

export default {
  title: 'Screens/Editor',
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: `https://www.figma.com/design/${DESIGN_FILE_ID}?node-id=1-632`,
    },
  },
};

// -------------------------------------------------------------------
// Editor — populated (1440 × 1024)
// -------------------------------------------------------------------

export const Populated = () => html`
  <div style="width: 1440px; height: 1024px; overflow: hidden; display: flex; flex-direction: column;">
    <!-- Top toolbar pane -->
    <div style="padding: 12px 16px; flex-shrink: 0;">
      <rr-toolbar size="md">
        <div slot="start-area">
          ${editorTabBar()}
        </div>
        <rr-search-field size="md" placeholder="Zoeken" style="flex: 1;"></rr-search-field>
        <div slot="end-area" style="display: flex; gap: 8px;">
          <rr-button variant="neutral-tinted" size="md">RR Project</rr-button>
          <rr-icon-button variant="neutral-tinted" size="md" label="Account">${personIcon}</rr-icon-button>
        </div>
      </rr-toolbar>
    </div>

    <!-- Spacer + Document tabs -->
    <rr-spacer size="12"></rr-spacer>
    ${documentTabs()}

    <!-- Horizontal divider -->
    <rr-divider orientation="horizontal"></rr-divider>

    <!-- Split-view: text pane | machine pane -->
    <div style="display: flex; flex: 1; min-height: 0;">
      <!-- Left column: text editor -->
      <div style="flex: 1; overflow-y: auto; background: var(--primitives-color-neutral-5, #1B1E23);"></div>

      <!-- Vertical divider -->
      <rr-divider orientation="vertical" style="align-self: stretch;"></rr-divider>

      <!-- Right column: machine view -->
      <div style="flex: 1; overflow-y: auto;"></div>
    </div>
  </div>
`;
Populated.storyName = 'Populated (1440px)';

// -------------------------------------------------------------------
// Editor — empty (1440 × 1024)
// -------------------------------------------------------------------

export const Empty = () => html`
  <div style="width: 1440px; height: 1024px; overflow: hidden; display: flex; flex-direction: column;">
    <!-- Top toolbar pane -->
    <div style="padding: 12px 16px; flex-shrink: 0;">
      <rr-toolbar size="md">
        <div slot="start-area">
          ${editorTabBar()}
        </div>
        <rr-search-field size="md" placeholder="Zoeken" style="flex: 1;"></rr-search-field>
        <div slot="end-area" style="display: flex; gap: 8px;">
          <rr-button variant="neutral-tinted" size="md">RR Project</rr-button>
          <rr-icon-button variant="neutral-tinted" size="md" label="Account">${personIcon}</rr-icon-button>
        </div>
      </rr-toolbar>
    </div>

    <!-- Horizontal divider (no document tabs in empty state) -->
    <rr-divider orientation="horizontal"></rr-divider>

    <!-- Single empty pane -->
    <div style="flex: 1;"></div>
  </div>
`;
Empty.storyName = 'Empty (1440px)';

// -------------------------------------------------------------------
// Figma Comparison
// -------------------------------------------------------------------

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${DESIGN_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Editor screen compositions (Code) vs Figma design.
        Use Toggle/Overlay/Side-by-Side to compare.
      </p>

      <div>
        <h3 style="margin: 0 0 8px;">Editor — populated</h3>
        <ftl-holster node="1-632" style="display: inline-block;">
          <div style="width: 1440px; height: 1024px; overflow: hidden; display: flex; flex-direction: column;">
            <div style="padding: 12px 16px; flex-shrink: 0;">
              <rr-toolbar size="md">
                <div slot="start-area">${editorTabBar()}</div>
                <rr-search-field size="md" placeholder="Zoeken" style="flex: 1;"></rr-search-field>
                <div slot="end-area" style="display: flex; gap: 8px;">
                  <rr-button variant="neutral-tinted" size="md">RR Project</rr-button>
                  <rr-icon-button variant="neutral-tinted" size="md" label="Account">${personIcon}</rr-icon-button>
                </div>
              </rr-toolbar>
            </div>
            <rr-spacer size="12"></rr-spacer>
            ${documentTabs()}
            <rr-divider orientation="horizontal"></rr-divider>
            <div style="display: flex; flex: 1; min-height: 0;">
              <div style="flex: 1; background: var(--primitives-color-neutral-5, #1B1E23);"></div>
              <rr-divider orientation="vertical" style="align-self: stretch;"></rr-divider>
              <div style="flex: 1;"></div>
            </div>
          </div>
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
