import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './rr-container.ts';
import '../../content/rich-text/rr-rich-text.ts';

/**
 * Gebruik een container om padding toe te voegen aan inhoud.
 * Padding kan worden ingesteld voor alle zijden tegelijk, per as (inline/block),
 * of per individuele zijde (top, right, bottom, left).
 * Specifiekere instellingen hebben voorrang: zijden > as > alle zijden.
 *
 * ## Gebruik
 * ```html
 * <rr-container padding="16">
 *   <rr-rich-text><p>Inhoud met padding aan alle zijden.</p></rr-rich-text>
 * </rr-container>
 * ```
 */
export default {
  title: 'Components/Layout/Container',
  component: 'rr-container',
  tags: ['autodocs'],
  parameters: {
    componentSource: {
      file: 'src/components/layout/container/rr-container.ts',
      repository: 'https://github.com/MinBZK/storybook',
    },
    status: {
      type: 'stable',
    },
  },
  argTypes: {
    padding: {
      control: 'select',
      options: [
        'none',
        'md',
        '2',
        '4',
        '6',
        '8',
        '10',
        '12',
        '16',
        '20',
        '24',
        '28',
        '32',
        '40',
        '44',
        '48',
        '56',
        '64',
        '80',
        '96',
      ],
      description: 'Padding voor alle zijden',
    },
    paddingInline: {
      control: 'select',
      options: [
        'none',
        'md',
        '2',
        '4',
        '6',
        '8',
        '10',
        '12',
        '16',
        '20',
        '24',
        '28',
        '32',
        '40',
        '44',
        '48',
        '56',
        '64',
        '80',
        '96',
      ],
      description: 'Padding voor links en rechts',
    },
    paddingBlock: {
      control: 'select',
      options: [
        'none',
        'md',
        '2',
        '4',
        '6',
        '8',
        '10',
        '12',
        '16',
        '20',
        '24',
        '28',
        '32',
        '40',
        '44',
        '48',
        '56',
        '64',
        '80',
        '96',
      ],
      description: 'Padding voor boven en onder',
    },
    paddingTop: {
      control: 'select',
      options: [
        'none',
        'md',
        '2',
        '4',
        '6',
        '8',
        '10',
        '12',
        '16',
        '20',
        '24',
        '28',
        '32',
        '40',
        '44',
        '48',
        '56',
        '64',
        '80',
        '96',
      ],
      description: 'Padding voor boven',
    },
    paddingRight: {
      control: 'select',
      options: [
        'none',
        'md',
        '2',
        '4',
        '6',
        '8',
        '10',
        '12',
        '16',
        '20',
        '24',
        '28',
        '32',
        '40',
        '44',
        '48',
        '56',
        '64',
        '80',
        '96',
      ],
      description: 'Padding voor rechts',
    },
    paddingBottom: {
      control: 'select',
      options: [
        'none',
        'md',
        '2',
        '4',
        '6',
        '8',
        '10',
        '12',
        '16',
        '20',
        '24',
        '28',
        '32',
        '40',
        '44',
        '48',
        '56',
        '64',
        '80',
        '96',
      ],
      description: 'Padding voor onder',
    },
    paddingLeft: {
      control: 'select',
      options: [
        'none',
        'md',
        '2',
        '4',
        '6',
        '8',
        '10',
        '12',
        '16',
        '20',
        '24',
        '28',
        '32',
        '40',
        '44',
        '48',
        '56',
        '64',
        '80',
        '96',
      ],
      description: 'Padding voor links',
    },
  },
};

export const Standaard = {
  args: {
    padding: '16',
  },
  render: (args) => html`
    <rr-container
      padding=${ifDefined(args.padding)}
      padding-inline=${ifDefined(args.paddingInline)}
      padding-block=${ifDefined(args.paddingBlock)}
      padding-top=${ifDefined(args.paddingTop)}
      padding-right=${ifDefined(args.paddingRight)}
      padding-bottom=${ifDefined(args.paddingBottom)}
      padding-left=${ifDefined(args.paddingLeft)}
      style="outline: 1px dashed var(--color-neutral-400);"
    >
      <rr-rich-text><p>Inhoud van de container.</p></rr-rich-text>
    </rr-container>
  `,
};

export const PaddingAlleZijden = () => html`
  <rr-container padding="24" style="outline: 1px dashed var(--color-neutral-400);">
    <rr-rich-text><p>Padding aan alle zijden.</p></rr-rich-text>
  </rr-container>
`;
PaddingAlleZijden.storyName = 'Padding — alle zijden';

export const PaddingInline = () => html`
  <rr-container padding-inline="32" style="outline: 1px dashed var(--color-neutral-400);">
    <rr-rich-text><p>Padding links en rechts.</p></rr-rich-text>
  </rr-container>
`;
PaddingInline.storyName = 'Padding — inline (links/rechts)';

export const PaddingBlock = () => html`
  <rr-container padding-block="32" style="outline: 1px dashed var(--color-neutral-400);">
    <rr-rich-text><p>Padding boven en onder.</p></rr-rich-text>
  </rr-container>
`;
PaddingBlock.storyName = 'Padding — block (boven/onder)';

export const PaddingIndividueel = () => html`
  <rr-container
    padding-top="8"
    padding-right="32"
    padding-bottom="16"
    padding-left="64"
    style="outline: 1px dashed var(--color-neutral-400);"
  >
    <rr-rich-text><p>Individuele padding: top=8 right=32 bottom=16 left=64.</p></rr-rich-text>
  </rr-container>
`;
PaddingIndividueel.storyName = 'Padding — individuele zijden';

export const PaddingCombinatie = () => html`
  <rr-container
    padding="16"
    padding-inline="32"
    style="outline: 1px dashed var(--color-neutral-400);"
  >
    <rr-rich-text
      ><p>padding="16" overschreven door padding-inline="32" voor links en rechts.</p></rr-rich-text
    >
  </rr-container>
`;
PaddingCombinatie.storyName = 'Padding — combinatie (specificiteit)';

export const GeenPadding = () => html`
  <rr-container padding="none" style="outline: 1px dashed var(--color-neutral-400);">
    <rr-rich-text><p>Geen padding.</p></rr-rich-text>
  </rr-container>
`;
GeenPadding.storyName = 'Geen padding';
