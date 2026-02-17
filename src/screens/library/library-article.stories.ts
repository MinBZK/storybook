import { html } from 'lit';
import { FIGMA_TOKEN, DESIGN_FILE_ID } from '../figma-config.ts';

// Component imports
import '../../components/layout/page/rr-page.ts';
import '../../components/layout/top-title-bar/rr-top-title-bar.ts';
import '../../components/layout/spacer/rr-spacer.ts';
import '../../components/layout/page-sections/rr-simple-section.ts';
import '../../components/layout/divider/rr-divider.js';
import '../../components/control-groups/toolbar/rr-toolbar.ts';
import '../../components/navigation/tab-bar/rr-tab-bar.ts';
import '../../components/navigation/tab-bar/rr-tab-bar-item.ts';
import '../../components/inputs/segmented-control/rr-segmented-control.ts';
import '../../components/inputs/segmented-control/rr-segmented-control-item.ts';
import '../../components/content/rich-text-heading/rr-rich-text-heading.ts';
import '../../components/content/rich-text/rr-rich-text.ts';
import '../../components/actions/button/rr-button.ts';
import '../../components/actions/icon-button/rr-icon-button.ts';

// -- Icons ----------------------------------------------------------

const chevronLeft = html`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.5 15 7.5 10 12.5 5"/></svg>`;
const searchIcon = html`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="5"/><path d="m14 14 3 3"/></svg>`;
const plusIcon = html`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 4v12M4 10h12"/></svg>`;
const moreIcon = html`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="4" cy="10" r="1.5"/><circle cx="10" cy="10" r="1.5"/><circle cx="16" cy="10" r="1.5"/></svg>`;
const bookmarkIcon = html`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3h10v14l-5-3-5 3z"/></svg>`;

// -- Tab bar fragment -----------------------------------------------

const tabBar = () => html`
  <rr-tab-bar>
    <rr-tab-bar-item selected>Bibliotheek</rr-tab-bar-item>
    <rr-tab-bar-item>Mijn regels</rr-tab-bar-item>
  </rr-tab-bar>
`;

// -- Article header (shared) ----------------------------------------

const articleHeader = (container: string) => html`
  <rr-top-title-bar container="${container}" toolbar="custom" title="Artikel 1">
    <rr-icon-button slot="toolbar-start" variant="accent-transparent" size="md" label="Terug">${chevronLeft}</rr-icon-button>
    <rr-icon-button slot="toolbar-end" variant="accent-transparent" size="md" label="Bewaren">${bookmarkIcon}</rr-icon-button>
    <rr-icon-button slot="toolbar-end" variant="accent-transparent" size="md" label="Meer">${moreIcon}</rr-icon-button>
  </rr-top-title-bar>
`;

// -- Article text content -------------------------------------------

const articleText = (container: string) => html`
  <rr-simple-section container="${container}">
    <rr-rich-text container="${container}">
      <rr-rich-text-heading level="3" container="${container}">Artikel 1. Algemene begrippen</rr-rich-text-heading>
      <p>1. In deze wet en de daarop berustende bepalingen wordt verstaan onder:</p>
      <p>a. <strong>alleenstaande:</strong> de verzekerde die geen partner heeft;</p>
      <p>b. <strong>partner:</strong> de persoon die met de verzekerde een gezamenlijke huishouding voert
        als bedoeld in artikel 3, tweede en derde lid, van de Wet werk en bijstand;</p>
      <p>c. <strong>berekeningsjaar:</strong> het kalenderjaar waarover de zorgtoeslag wordt berekend;</p>
      <p>d. <strong>normpremie:</strong> de normpremie, bedoeld in artikel 4;</p>
      <p>e. <strong>standaardpremie:</strong> de standaardpremie, bedoeld in artikel 5.</p>
    </rr-rich-text>
  </rr-simple-section>
`;

// -- Machine content placeholder ------------------------------------

const machineContent = (container: string) => html`
  <rr-simple-section container="${container}">
    <div style="display: flex; flex-direction: column; gap: 16px; align-items: center; justify-content: center; min-height: 400px; opacity: 0.5;">
      <svg viewBox="0 0 64 64" width="64" height="64" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="8" y="8" width="48" height="48" rx="4"/>
        <path d="M8 24h48M24 24v32"/>
        <circle cx="16" cy="16" r="3"/>
        <circle cx="40" cy="40" r="6"/>
        <path d="M36 40h8M40 36v8"/>
      </svg>
      <p style="margin: 0; text-align: center; color: var(--semantics-content-secondary-color, #64748b);">
        Machine-leesbare weergave<br/>
        <small>(beslisboom / stroomdiagram)</small>
      </p>
    </div>
  </rr-simple-section>
`;

// -------------------------------------------------------------------
// Story meta
// -------------------------------------------------------------------

export default {
  title: 'Screens/Library/Article',
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: `https://www.figma.com/design/${DESIGN_FILE_ID}?node-id=1047-74088`,
    },
  },
};

// -------------------------------------------------------------------
// Small — text view (393 × 852)
// -------------------------------------------------------------------

export const SmallText = () => html`
  <div style="width: 393px; height: 852px; overflow: hidden;">
    <rr-page header-sticky footer-sticky>
      <div slot="header">
        ${articleHeader('sm')}
      </div>

      ${articleText('sm')}

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
`;
SmallText.storyName = 'Small — Text (393px)';

// -------------------------------------------------------------------
// Small — machine view (393 × 852)
// -------------------------------------------------------------------

export const SmallMachine = () => html`
  <div style="width: 393px; height: 852px; overflow: hidden;">
    <rr-page header-sticky footer-sticky>
      <div slot="header">
        ${articleHeader('sm')}
      </div>

      ${machineContent('sm')}

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
`;
SmallMachine.storyName = 'Small — Machine (393px)';

// -------------------------------------------------------------------
// Figma Comparison
// -------------------------------------------------------------------

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${DESIGN_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Library Article screen compositions (Code) vs Figma design.
        Use Toggle/Overlay/Side-by-Side to compare.
      </p>

      <div>
        <h3 style="margin: 0 0 8px;">Small — Text (393px)</h3>
        <ftl-holster node="1047-74088" style="display: inline-block;">
          <div style="width: 393px; height: 852px; overflow: hidden;">
            <rr-page header-sticky footer-sticky>
              <div slot="header">${articleHeader('sm')}</div>
              ${articleText('sm')}
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

      <div>
        <h3 style="margin: 0 0 8px;">Small — Machine (393px)</h3>
        <ftl-holster node="1047-75237" style="display: inline-block;">
          <div style="width: 393px; height: 852px; overflow: hidden;">
            <rr-page header-sticky footer-sticky>
              <div slot="header">${articleHeader('sm')}</div>
              ${machineContent('sm')}
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
