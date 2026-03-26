import { html } from 'lit';
import './rr-full-bleed-section.ts';
import '../../../content/rich-text/rr-rich-text.ts';

/**
 * Gebruik een full bleed section voor inhoud die van rand tot rand loopt,
 * zoals achtergrondkleuren, afbeeldingen of uitgelichte blokken.
 * In tegenstelling tot de simple section heeft de full bleed section geen
 * horizontale padding — de inhoud bepaalt zelf zijn breedte.
 * Verticale padding en gap passen zich automatisch aan via container queries.
 *
 * ## Gebruik
 * ```html
 * <rr-full-bleed-section>
 *   <rr-rich-text slot="header"><h2>Sectietitel</h2></rr-rich-text>
 *   <rr-rich-text><p>Inhoud van de sectie.</p></rr-rich-text>
 * </rr-full-bleed-section>
 * ```
 */
export default {
  title: 'Components/Layout/Page Sections/Full Bleed Section',
  component: 'rr-full-bleed-section',
  tags: ['autodocs'],
  parameters: {
    componentSource: {
      file: 'src/components/layout/page-sections/full-bleed-section/rr-full-bleed-section.ts',
      repository: 'https://github.com/MinBZK/storybook',
    },
    status: {
      type: 'stable',
    },
  },
};

export const Standaard = () => html`
  <rr-full-bleed-section>
    <rr-rich-text slot="header">
      <h2>Sectietitel</h2>
    </rr-rich-text>
    <rr-rich-text>
      <p>
        Dit is de hoofdinhoud van de sectie. De inhoud loopt van rand tot rand zonder horizontale
        padding.
      </p>
      <p>
        Gebruik deze sectie voor achtergrondkleuren, afbeeldingen of andere inhoud die de volledige
        breedte beslaat.
      </p>
    </rr-rich-text>
    <rr-rich-text slot="footer">
      <p>Voetnoot of aanvullende informatie.</p>
    </rr-rich-text>
  </rr-full-bleed-section>
`;

export const ZonderHeaderEnFooter = () => html`
  <rr-full-bleed-section>
    <rr-rich-text>
      <p>Een full bleed section zonder header en footer.</p>
    </rr-rich-text>
  </rr-full-bleed-section>
`;
ZonderHeaderEnFooter.parameters = { controls: { disable: true } };
