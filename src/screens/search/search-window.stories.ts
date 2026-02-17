import { html } from 'lit';
import { FIGMA_TOKEN, DESIGN_FILE_ID } from '../figma-config.ts';

// Component imports
import '../../components/layout/page-sections/rr-simple-section.ts';
import '../../components/layout/divider/rr-divider.js';
import '../../components/inputs/search-field/rr-search-field.ts';
import '../../components/lists/list/rr-list.ts';
import '../../components/lists/list/rr-list-item.ts';
import '../../components/lists/title-cell/rr-title-cell.ts';
import '../../components/actions/button/rr-button.ts';

// -- Sample data ----------------------------------------------------

const searchResults = [
  'Wet op de zorgtoeslag',
  'Zorgverzekeringswet',
  'Wet langdurige zorg',
  'Participatiewet',
  'Kieswet',
  'Burgerlijk wetboek boek 5',
  'Diemen afstemmingsverordening',
  'Wet werk en bijstand',
  'Algemene wet bestuursrecht',
  'Grondwet',
  'Wet minimumloon',
  'Arbeidsomstandighedenwet',
];

// -- Filter buttons -------------------------------------------------

const filterButtons = () => html`
  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <rr-button variant="neutral-tinted" size="sm">Alle ministeries</rr-button>
    <rr-button variant="neutral-tinted" size="sm">Alle regelgeving</rr-button>
    <rr-button variant="neutral-tinted" size="sm">Alle onderdelen</rr-button>
    <rr-button variant="neutral-tinted" size="sm">Alle periodes</rr-button>
  </div>
`;

// -------------------------------------------------------------------
// Story meta
// -------------------------------------------------------------------

export default {
  title: 'Screens/Search',
  tags: ['!autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: `https://www.figma.com/design/${DESIGN_FILE_ID}?node-id=676-15112`,
    },
  },
};

// -------------------------------------------------------------------
// Search Window — with results
// -------------------------------------------------------------------

export const WithResults = () => html`
  <div style="width: 800px; display: flex; flex-direction: column; border-radius: 12px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);">
    <!-- Header (dark) -->
    <div style="padding: 16px; display: flex; flex-direction: column; gap: 8px;">
      <div style="display: flex; gap: 8px; align-items: center;">
        <rr-search-field size="md" placeholder="Zoeken" style="flex: 1;"></rr-search-field>
        <rr-button variant="neutral-tinted" size="md">Sluit</rr-button>
      </div>
      ${filterButtons()}
    </div>

    <!-- Results (light) -->
    <div style="height: 480px; overflow-y: auto; background: var(--primitives-color-white, #ffffff);">
      <rr-simple-section container="sm">
        <rr-list variant="simple">
          ${searchResults.map(
            (item) => html`
              <rr-list-item size="md">
                <rr-title-cell>${item}</rr-title-cell>
              </rr-list-item>
            `,
          )}
        </rr-list>
      </rr-simple-section>
    </div>
  </div>
`;
WithResults.storyName = 'With Results';

// -------------------------------------------------------------------
// Search Window — no results
// -------------------------------------------------------------------

export const NoResults = () => html`
  <div style="width: 800px; display: flex; flex-direction: column; border-radius: 12px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);">
    <!-- Header (dark) -->
    <div style="padding: 16px; display: flex; flex-direction: column; gap: 8px;">
      <div style="display: flex; gap: 8px; align-items: center;">
        <rr-search-field size="md" placeholder="Zoeken" style="flex: 1;"></rr-search-field>
        <rr-button variant="neutral-tinted" size="md">Sluit</rr-button>
      </div>
      ${filterButtons()}
    </div>

    <!-- Empty state -->
    <div style="height: 480px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--primitives-color-white, #ffffff);">
      <p style="margin: 0; font-weight: 600; font-size: 1.125rem;">Geen resultaten gevonden</p>
      <p style="margin: 4px 0 0; color: var(--semantics-content-secondary-color, #64748b);">Pas je zoektermen of voorkeuren aan</p>
    </div>
  </div>
`;
NoResults.storyName = 'No Results';

// -------------------------------------------------------------------
// Search Window — header only (collapsed)
// -------------------------------------------------------------------

export const HeaderOnly = () => html`
  <div style="width: 800px; display: flex; flex-direction: column; border-radius: 12px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);">
    <div style="padding: 16px; display: flex; flex-direction: column; gap: 8px;">
      <div style="display: flex; gap: 8px; align-items: center;">
        <rr-search-field size="md" placeholder="Zoeken" style="flex: 1;"></rr-search-field>
        <rr-button variant="neutral-tinted" size="md">Sluit</rr-button>
      </div>
      ${filterButtons()}
    </div>
  </div>
`;
HeaderOnly.storyName = 'Header Only';

// -------------------------------------------------------------------
// Figma Comparison
// -------------------------------------------------------------------

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${DESIGN_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Search Window (Code) vs Figma design.
        Use Toggle/Overlay/Side-by-Side to compare.
      </p>

      <div>
        <h3 style="margin: 0 0 8px;">Search Window — with results</h3>
        <ftl-holster node="676-15112" style="display: inline-block;">
          <div style="width: 800px; display: flex; flex-direction: column; border-radius: 12px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);">
            <div style="padding: 16px; display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; gap: 8px; align-items: center;">
                <rr-search-field size="md" placeholder="Zoeken" style="flex: 1;"></rr-search-field>
                <rr-button variant="neutral-tinted" size="md">Sluit</rr-button>
              </div>
              ${filterButtons()}
            </div>
            <div style="height: 480px; overflow-y: auto; background: var(--primitives-color-white, #ffffff);">
              <rr-simple-section container="sm">
                <rr-list variant="simple">
                  ${searchResults.map(
                    (item) => html`
                      <rr-list-item size="md">
                        <rr-title-cell>${item}</rr-title-cell>
                      </rr-list-item>
                    `,
                  )}
                </rr-list>
              </rr-simple-section>
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
