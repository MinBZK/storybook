import { html } from 'lit';
import { FIGMA_TOKEN, DESIGN_FILE_ID } from '../figma-config.ts';

// Component imports
import '../../components/layout/page/rr-page.ts';
import '../../components/layout/top-title-bar/rr-top-title-bar.ts';
import '../../components/layout/spacer/rr-spacer.ts';
import '../../components/layout/page-sections/rr-simple-section.ts';
import '../../components/layout/divider/rr-divider.js';
import '../../components/control-groups/toolbar/rr-toolbar.ts';
import '../../components/control-groups/toolbar-title-group/rr-toolbar-title-group.ts';
import '../../components/navigation/tab-bar/rr-tab-bar.ts';
import '../../components/navigation/tab-bar/rr-tab-bar-item.ts';
import '../../components/inputs/segmented-control/rr-segmented-control.ts';
import '../../components/inputs/segmented-control/rr-segmented-control-item.ts';
import '../../components/inputs/search-field/rr-search-field.ts';
import '../../components/lists/list/rr-list.ts';
import '../../components/lists/list/rr-list-item.ts';
import '../../components/lists/text-cell/rr-text-cell.ts';
import '../../components/lists/spacer-cell/rr-spacer-cell.ts';
import '../../components/lists/icon-cell/rr-icon-cell.ts';
import '../../components/actions/button/rr-button.ts';
import '../../components/actions/icon-button/rr-icon-button.ts';

// -- Icons ----------------------------------------------------------

const chevronRight = html`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.5 15 12.5 10 7.5 5"/></svg>`;
const chevronLeft = html`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.5 15 7.5 10 12.5 5"/></svg>`;
const searchIcon = html`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="5"/><path d="m14 14 3 3"/></svg>`;
const personIcon = html`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="7" r="3"/><path d="M4 17c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg>`;
const plusIcon = html`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 4v12M4 10h12"/></svg>`;
const moreIcon = html`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="4" cy="10" r="1.5"/><circle cx="10" cy="10" r="1.5"/><circle cx="16" cy="10" r="1.5"/></svg>`;
const bookmarkIcon = html`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3h10v14l-5-3-5 3z"/></svg>`;

// -- Sample data ----------------------------------------------------

const artikelen = [
  'Artikel 1 – Algemene begrippen',
  'Artikel 2 – Aanspraak op zorgtoeslag',
  'Artikel 3 – Hoogte zorgtoeslag',
  'Artikel 4 – Normpremie',
  'Artikel 5 – Standaardpremie',
  'Artikel 6 – Overgangsbepalingen',
  'Artikel 7 – Inwerkingtreding',
  'Artikel 8 – Citeertitel',
];

// -- List fragment --------------------------------------------------

const artikelList = (items: string[]) => html`
  <rr-list variant="simple">
    ${items.map(
      (item) => html`
        <rr-list-item size="md">
          <rr-text-cell>${item}</rr-text-cell>
          <rr-spacer-cell width="6"></rr-spacer-cell>
          <rr-icon-cell slot="end">${chevronRight}</rr-icon-cell>
        </rr-list-item>
      `,
    )}
  </rr-list>
`;

// -- Tab bar fragment -----------------------------------------------

const tabBar = () => html`
  <rr-tab-bar>
    <rr-tab-bar-item selected>Bibliotheek</rr-tab-bar-item>
    <rr-tab-bar-item>Mijn regels</rr-tab-bar-item>
  </rr-tab-bar>
`;

// -- Law page content (reusable across breakpoints) ----------------

const lawPageContent = (container: string) => html`
  <rr-top-title-bar container="${container}" toolbar="custom" title="Wet op de zorgtoeslag">
    <rr-icon-button slot="toolbar-start" variant="accent-transparent" size="md" label="Terug">${chevronLeft}</rr-icon-button>
    <rr-icon-button slot="toolbar-end" variant="accent-transparent" size="md" label="Bewaren">${bookmarkIcon}</rr-icon-button>
    <rr-icon-button slot="toolbar-end" variant="accent-transparent" size="md" label="Meer">${moreIcon}</rr-icon-button>
  </rr-top-title-bar>
`;

// -------------------------------------------------------------------
// Story meta
// -------------------------------------------------------------------

export default {
  title: 'Screens/Library/Law',
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: `https://www.figma.com/design/${DESIGN_FILE_ID}?node-id=1018-19597`,
    },
  },
};

// -------------------------------------------------------------------
// Small (393 × 852) — mobile, single page view
// -------------------------------------------------------------------

export const Small = () => html`
  <div style="width: 393px; height: 852px; overflow: hidden;">
    <rr-page header-sticky footer-sticky>
      <!-- Header -->
      <div slot="header">
        ${lawPageContent('sm')}
      </div>

      <!-- Main content: article list -->
      <rr-simple-section container="sm">
        ${artikelList(artikelen)}
      </rr-simple-section>

      <!-- Footer -->
      <div slot="footer">
        <rr-toolbar size="md">
          <div slot="start-area">
            ${tabBar()}
          </div>
          <div slot="end-area" style="display: flex; gap: 8px;">
            <rr-icon-button variant="neutral-tinted" size="lg" label="Zoeken">${searchIcon}</rr-icon-button>
            <rr-icon-button variant="neutral-tinted" size="lg" label="Nieuw">${plusIcon}</rr-icon-button>
          </div>
        </rr-toolbar>
      </div>
    </rr-page>
  </div>
`;
Small.storyName = 'Small (393px)';

// -------------------------------------------------------------------
// Medium (834 × 1194) — tablet, 2-pane split
// -------------------------------------------------------------------

export const Medium = () => html`
  <div style="width: 834px; height: 1194px; overflow: hidden; display: flex; flex-direction: column;">
    <!-- Top toolbar pane -->
    <div style="padding: 12px 16px; flex-shrink: 0;">
      <rr-toolbar size="md">
        <div slot="start-area">
          ${tabBar()}
        </div>
        <div slot="end-area" style="display: flex; gap: 8px;">
          <rr-button variant="neutral-tinted" size="md">${searchIcon} Zoeken</rr-button>
          <rr-button variant="neutral-tinted" size="md">${personIcon} Inloggen</rr-button>
        </div>
      </rr-toolbar>
    </div>

    <rr-divider orientation="horizontal"></rr-divider>

    <!-- Split-view: law list | article (empty) -->
    <div style="display: flex; flex: 1; min-height: 0;">
      <!-- Left: law page -->
      <div style="flex: 1; overflow-y: auto;">
        <rr-page header-sticky>
          <div slot="header">
            ${lawPageContent('sm')}
          </div>
          <rr-simple-section container="sm">
            ${artikelList(artikelen)}
          </rr-simple-section>
        </rr-page>
      </div>

      <rr-divider orientation="vertical" style="align-self: stretch;"></rr-divider>

      <!-- Right: article placeholder -->
      <div style="flex: 1; background: var(--primitives-color-white, #ffffff);"></div>
    </div>
  </div>
`;
Medium.storyName = 'Medium (834px)';

// -------------------------------------------------------------------
// Large (1440 × 1024) — desktop, 3-pane split
// -------------------------------------------------------------------

const homeListItems = [
  'Burgerlijk wetboek boek 5',
  'Wet op de zorgtoeslag',
  'Kieswet',
  'Participatiewet',
  'Zorgverzekeringswet',
  'Wet langdurige zorg',
];

const homeList = () => html`
  <rr-list variant="simple" title="Favorieten">
    ${homeListItems.map(
      (item) => html`
        <rr-list-item size="md">
          <rr-text-cell>${item}</rr-text-cell>
          <rr-spacer-cell width="6"></rr-spacer-cell>
          <rr-icon-cell slot="end">${chevronRight}</rr-icon-cell>
        </rr-list-item>
      `,
    )}
  </rr-list>
`;

export const Large = () => html`
  <div style="width: 1440px; height: 1024px; overflow: hidden; display: flex; flex-direction: column;">
    <!-- Top toolbar pane -->
    <div style="padding: 12px 16px; flex-shrink: 0;">
      <rr-toolbar size="md">
        <div slot="start-area">
          ${tabBar()}
        </div>
        <rr-search-field size="md" placeholder="Zoeken" style="flex: 1;"></rr-search-field>
        <div slot="end-area">
          <rr-button variant="neutral-tinted" size="md">${personIcon} Inloggen</rr-button>
        </div>
      </rr-toolbar>
    </div>

    <rr-divider orientation="horizontal"></rr-divider>

    <!-- 3-pane split: home | law | article -->
    <div style="display: flex; flex: 1; min-height: 0;">
      <!-- Left: home list -->
      <div style="width: 300px; flex-shrink: 0; overflow-y: auto;">
        <rr-simple-section container="sm">
          ${homeList()}
        </rr-simple-section>
      </div>

      <rr-divider orientation="vertical" style="align-self: stretch;"></rr-divider>

      <!-- Center: law page -->
      <div style="width: 400px; flex-shrink: 0; overflow-y: auto;">
        <rr-page header-sticky>
          <div slot="header">
            ${lawPageContent('sm')}
          </div>
          <rr-simple-section container="sm">
            ${artikelList(artikelen)}
          </rr-simple-section>
        </rr-page>
      </div>

      <rr-divider orientation="vertical" style="align-self: stretch;"></rr-divider>

      <!-- Right: article placeholder -->
      <div style="flex: 1; background: var(--primitives-color-white, #ffffff);"></div>
    </div>
  </div>
`;
Large.storyName = 'Large (1440px)';

// -------------------------------------------------------------------
// Figma Comparison
// -------------------------------------------------------------------

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${DESIGN_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Library Law screen compositions (Code) vs Figma design.
        Use Toggle/Overlay/Side-by-Side to compare.
      </p>

      <div>
        <h3 style="margin: 0 0 8px;">Small (393px)</h3>
        <ftl-holster node="1018-19597" style="display: inline-block;">
          <div style="width: 393px; height: 852px; overflow: hidden;">
            <rr-page header-sticky footer-sticky>
              <div slot="header">${lawPageContent('sm')}</div>
              <rr-simple-section container="sm">
                ${artikelList(artikelen)}
              </rr-simple-section>
              <div slot="footer">
                <rr-toolbar size="md">
                  <div slot="start-area">${tabBar()}</div>
                  <div slot="end-area" style="display: flex; gap: 8px;">
                    <rr-icon-button variant="neutral-tinted" size="lg" label="Zoeken">${searchIcon}</rr-icon-button>
                    <rr-icon-button variant="neutral-tinted" size="lg" label="Nieuw">${plusIcon}</rr-icon-button>
                  </div>
                </rr-toolbar>
              </div>
            </rr-page>
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
