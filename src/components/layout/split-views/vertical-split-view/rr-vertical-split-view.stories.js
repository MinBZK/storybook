import { html } from 'lit';
import './rr-vertical-split-view.ts';
import '../../../layout/page/rr-page.ts';
import '../../../layout/page-sections/simple-section/rr-simple-section.ts';
import '../../../content/rich-text/rr-rich-text.ts';

/**
 * Gebruik een vertical split view voor een drierijige layout met een koptekst,
 * inhoudsgebied en voettekst. De koptekst biedt ruimte voor tools en
 * acties; het voettekst voor uitvoer, logboeken of statusinformatie.
 * Het inhoudsgebied is altijd zichtbaar en neemt de resterende ruimte in.
 *
 * ## Gebruik
 * ```html
 * <rr-vertical-split-view>
 *   <rr-page slot="header">...</rr-page>
 *   <rr-page slot="main">...</rr-page>
 *   <rr-page slot="footer">...</rr-page>
 * </rr-vertical-split-view>
 * ```
 */
export default {
  title: 'Components/Layout/Split Views/Vertical Split View',
  component: 'rr-vertical-split-view',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    componentSource: {
      file: 'src/components/layout/split-views/vertical-split-view/rr-vertical-split-view.ts',
      repository: 'https://github.com/MinBZK/storybook',
    },
    status: {
      type: 'stable',
    },
  },
  argTypes: {
    showHeader: {
      control: 'boolean',
      description: 'Toon de koptekst',
      table: { defaultValue: { summary: 'true' } },
    },
    showFooter: {
      control: 'boolean',
      description: 'Toon het voettekst',
      table: { defaultValue: { summary: 'true' } },
    },
  },
  args: {
    showHeader: true,
    showFooter: true,
  },
};

export const Standaard = ({ showHeader, showFooter }) => html`
  <rr-vertical-split-view
    style="height: 600px;"
    ?show-header=${showHeader}
    ?show-footer=${showFooter}
  >
    <rr-page sticky-header slot="header">
      <rr-rich-text slot="header" style="padding: 16px;">
        <strong>Koptekst</strong>
      </rr-rich-text>
      <rr-simple-section>
        <rr-rich-text>
          <p>Acties, filters en tools voor het inhoudsgebied.</p>
        </rr-rich-text>
      </rr-simple-section>
    </rr-page>

    <rr-page sticky-header slot="main">
      <rr-rich-text slot="header" style="padding: 16px;">
        <strong>Inhoud</strong>
      </rr-rich-text>
      <rr-simple-section>
        <rr-rich-text>
          <h2>Primaire inhoud</h2>
          <p>Het hoofdgebied voor bewerkbare of weer te geven inhoud.</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur.
          </p>
        </rr-rich-text>
      </rr-simple-section>
    </rr-page>

    <rr-page sticky-header slot="footer">
      <rr-rich-text slot="header" style="padding: 16px;">
        <strong>Uitvoer</strong>
      </rr-rich-text>
      <rr-simple-section>
        <rr-rich-text>
          <p>Logboeken, validatieresultaten en statusinformatie.</p>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
        </rr-rich-text>
      </rr-simple-section>
    </rr-page>
  </rr-vertical-split-view>
`;
