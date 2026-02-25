import { html } from 'lit';
import './rr-rich-text.ts';

export default {
  title: 'Components/Content/Rich Text',
  component: 'rr-rich-text',
  tags: ['autodocs'],
};

export const Default = () => html`
  <rr-rich-text>
    <h3>Artikel 1. Algemene begrippen</h3>
    <p>1. In deze wet en de daarop berustende bepalingen wordt verstaan onder:</p>
    <p>a. <strong>alleenstaande:</strong> de verzekerde die geen partner heeft;</p>
    <p>b. <strong>partner:</strong> de persoon die met de verzekerde een gezamenlijke huishouding voert als bedoeld in artikel 3, tweede en derde lid, van de Wet werk en bijstand;</p>
    <p>c. <strong>berekeningsjaar:</strong> het kalenderjaar waarover de zorgtoeslag wordt berekend;</p>
  </rr-rich-text>
`;

export const SmallContainer = () => html`
  <div style="width: 393px;">
    <rr-rich-text>
      <h3>Artikel 1. Algemene begrippen</h3>
      <p>1. In deze wet en de daarop berustende bepalingen wordt verstaan onder:</p>
      <p>a. <strong>alleenstaande:</strong> de verzekerde die geen partner heeft;</p>
      <p>b. <strong>partner:</strong> de persoon die met de verzekerde een gezamenlijke huishouding voert.</p>
    </rr-rich-text>
  </div>
`;
SmallContainer.storyName = 'Small Container (393px)';

export const LargeContainer = () => html`
  <div style="width: 1200px;">
    <rr-rich-text>
      <h3>Artikel 1. Algemene begrippen</h3>
      <p>1. In deze wet en de daarop berustende bepalingen wordt verstaan onder:</p>
      <p>a. <strong>alleenstaande:</strong> de verzekerde die geen partner heeft;</p>
      <p>b. <strong>partner:</strong> de persoon die met de verzekerde een gezamenlijke huishouding voert.</p>
    </rr-rich-text>
  </div>
`;
LargeContainer.storyName = 'Large Container (1200px)';

export const AllSizes = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <p style="font-size: 0.75rem; color: #64748b; margin: 0 0 8px;">sm (&lt; 600px) — constrained to 393px</p>
      <div style="width: 393px; border: 1px dashed #cbd5e1; padding: 16px;">
        <rr-rich-text>
          <h3>Artikel 1. Algemene begrippen</h3>
          <p>1. In deze wet en de daarop berustende bepalingen wordt verstaan onder.</p>
        </rr-rich-text>
      </div>
    </div>
    <div>
      <p style="font-size: 0.75rem; color: #64748b; margin: 0 0 8px;">md (≥ 600px) — constrained to 834px</p>
      <div style="width: 834px; border: 1px dashed #cbd5e1; padding: 16px;">
        <rr-rich-text>
          <h3>Artikel 1. Algemene begrippen</h3>
          <p>1. In deze wet en de daarop berustende bepalingen wordt verstaan onder.</p>
        </rr-rich-text>
      </div>
    </div>
    <div>
      <p style="font-size: 0.75rem; color: #64748b; margin: 0 0 8px;">lg (≥ 1024px) — constrained to 1200px</p>
      <div style="width: 1200px; border: 1px dashed #cbd5e1; padding: 16px;">
        <rr-rich-text>
          <h3>Artikel 1. Algemene begrippen</h3>
          <p>1. In deze wet en de daarop berustende bepalingen wordt verstaan onder.</p>
        </rr-rich-text>
      </div>
    </div>
  </div>
`;
AllSizes.storyName = 'All Sizes (Container Query)';

