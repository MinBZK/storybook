import { html, nothing } from 'lit';
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
import '../../components/lists/list/rr-list.ts';
import '../../components/lists/list/rr-list-item.ts';
import '../../components/lists/text-cell/rr-text-cell.ts';
import '../../components/lists/spacer-cell/rr-spacer-cell.ts';
import '../../components/lists/icon-cell/rr-icon-cell.ts';
import '../../components/lists/title-cell/rr-title-cell.ts';
import '../../components/actions/button/rr-button.ts';
import '../../components/actions/icon-button/rr-icon-button.ts';
import '../../components/inputs/search-field/rr-search-field.ts';

// -- Icons ----------------------------------------------------------

const chevronRight = html`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.5 15 12.5 10 7.5 5"/></svg>`;
const searchIcon = html`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="5"/><path d="m14 14 3 3"/></svg>`;
const personIcon = html`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="7" r="3"/><path d="M4 17c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg>`;
const plusIcon = html`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 4v12M4 10h12"/></svg>`;

// -- Sample data ----------------------------------------------------

const favorieten = [
  'Burgerlijk wetboek boek 5',
  'Wet op de zorgtoeslag',
  'Kieswet',
  'Participatiewet',
  'Zorgverzekeringswet',
  'Wet langdurige zorg',
];

const recentBekeken = [
  'Wet op de zorgtoeslag',
  'Diemen afstemmingsverordening participatiewet',
  'Kieswet',
  'Burgerlijk wetboek boek 5',
  'Participatiewet',
  'Zorgverzekeringswet',
];

// -- Reusable list fragment -----------------------------------------

const lawList = (title: string, items: string[]) => html`
  <rr-list variant="simple" title="${title}">
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

// -------------------------------------------------------------------
// Story meta
// -------------------------------------------------------------------

export default {
  title: 'Screens/Library/Home',
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: `https://www.figma.com/design/${DESIGN_FILE_ID}?node-id=1010-42147`,
    },
  },
};

// -------------------------------------------------------------------
// Small (393 × 852) — mobile, logged-in
// -------------------------------------------------------------------

export const Small = () => html`
  <div style="width: 393px; height: 852px; overflow: hidden;">
    <rr-page header-sticky footer-sticky>
      <!-- Header -->
      <div slot="header">
        <rr-top-title-bar container="sm" toolbar="custom" title="Wetten en regels">
          <rr-toolbar-title-group slot="toolbar-start" size="md" title="RegelRecht"></rr-toolbar-title-group>
          <rr-button slot="toolbar-end" variant="accent-transparent" size="md">RR Project</rr-button>
          <rr-icon-button slot="toolbar-end" variant="accent-transparent" size="md" label="Account">${personIcon}</rr-icon-button>
        </rr-top-title-bar>
      </div>

      <!-- Main content -->
      <rr-simple-section container="sm">
        ${lawList('Favorieten', favorieten)}
        <rr-spacer size="24"></rr-spacer>
        ${lawList('Recent bekeken', recentBekeken)}
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
// Medium (834 × 1194) — tablet, logged-out, split-view
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

    <!-- Horizontal divider -->
    <rr-divider orientation="horizontal"></rr-divider>

    <!-- Split-view: list pane | law page -->
    <div style="display: flex; flex: 1; min-height: 0;">
      <!-- Left column: library home list -->
      <div style="flex: 1; overflow-y: auto;">
        <rr-page header-sticky>
          <div slot="header">
            <rr-top-title-bar container="sm" toolbar="none" title="Wetten en regels"></rr-top-title-bar>
          </div>
          <rr-simple-section container="sm">
            ${lawList('Favorieten', favorieten)}
            <rr-spacer size="24"></rr-spacer>
            ${lawList('Recent bekeken', recentBekeken)}
          </rr-simple-section>
        </rr-page>
      </div>

      <!-- Vertical divider -->
      <rr-divider orientation="vertical" style="align-self: stretch;"></rr-divider>

      <!-- Right column: empty law page placeholder -->
      <div style="flex: 1; background: var(--primitives-color-white, #ffffff);"></div>
    </div>
  </div>
`;
Medium.storyName = 'Medium (834px)';

// -------------------------------------------------------------------
// Large (1440 × 1024) — desktop, logged-out, split-view
// -------------------------------------------------------------------

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

    <!-- Horizontal divider -->
    <rr-divider orientation="horizontal"></rr-divider>

    <!-- Split-view: list pane | law page -->
    <div style="display: flex; flex: 1; min-height: 0;">
      <!-- Left column: library home list -->
      <div style="width: 400px; flex-shrink: 0; overflow-y: auto;">
        <rr-simple-section container="sm">
          ${lawList('Favorieten', favorieten)}
          <rr-spacer size="24"></rr-spacer>
          ${lawList('Recent bekeken', recentBekeken)}
        </rr-simple-section>
      </div>

      <!-- Vertical divider -->
      <rr-divider orientation="vertical" style="align-self: stretch;"></rr-divider>

      <!-- Right column: empty law page placeholder -->
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
        Library Home screen compositions (Code) vs Figma design.
        Use Toggle/Overlay/Side-by-Side to compare.
      </p>

      <!-- Small (sm) -->
      <div>
        <h3 style="margin: 0 0 8px;">Small (393px) — logged-in</h3>
        <ftl-holster node="1010-20786" style="display: inline-block;">
          <div style="width: 393px; height: 852px; overflow: hidden;">
            <rr-page header-sticky footer-sticky>
              <div slot="header">
                <rr-top-title-bar container="sm" toolbar="custom" title="Wetten en regels">
                  <rr-toolbar-title-group slot="toolbar-start" size="md" title="RegelRecht"></rr-toolbar-title-group>
                  <rr-button slot="toolbar-end" variant="accent-transparent" size="md">RR Project</rr-button>
                  <rr-icon-button slot="toolbar-end" variant="accent-transparent" size="md" label="Account">${personIcon}</rr-icon-button>
                </rr-top-title-bar>
              </div>
              <rr-simple-section container="sm">
                ${lawList('Favorieten', favorieten)}
                <rr-spacer size="24"></rr-spacer>
                ${lawList('Recent bekeken', recentBekeken)}
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
